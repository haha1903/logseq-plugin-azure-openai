import OpenAI from "openai";
import "@logseq/libs";
import { backOff } from "exponential-backoff";

export interface OpenAIOptions {
  apiKey: string;
  deploymentName: string;
  temperature?: number;
  maxTokens?: number;
  chatPrompt?: string;
  apiVersion?: string;
  resourceName?: string;
}

const OpenAIDefaults = (apiKey: string): OpenAIOptions => ({
  apiKey,
  deploymentName: "gpt-4.1",
  temperature: 1.0,
  maxTokens: 1000,
  apiVersion: '2025-01-01-preview',
  resourceName: ''
});

const retryOptions = {
  numOfAttempts: 7,
  retry: (err: any) => {
    if (err instanceof TypeError && err.message === 'Failed to fetch') {
      console.warn('retrying due to network error', err);
      return true;
    }

    if (!err.response || !err.response.data || !err.response.data.error) {
      return false;
    }
    if (err.response.status === 429) {
      const errorType = err.response.data.error.type;
      if (errorType === "insufficient_quota") {
        return false;
      }
      console.warn("Rate limit exceeded. Retrying...");
      return true;
    }
    if (err.response.status >= 500) {
      return true;
    }

    return false;
  },
};

function getAzureUrl(options: OpenAIOptions): string {
  return `https://${options.resourceName}.openai.azure.com/openai/deployments/${options.deploymentName}/chat/completions?api-version=${options.apiVersion}`;
}

export async function openAI(
  input: string,
  openAiOptions: OpenAIOptions
): Promise<string | null> {
  const options = { ...OpenAIDefaults(openAiOptions.apiKey), ...openAiOptions };

  try {
    const inputMessages: { role: string; content: string }[] = [{ role: "user", content: input }];
    if (openAiOptions.chatPrompt && openAiOptions.chatPrompt.length > 0) {
      inputMessages.unshift({ role: "system", content: openAiOptions.chatPrompt });
    }

    const url = getAzureUrl(options);
    console.log(url);
    const response = await backOff(
      () => fetch(url, {
        method: 'POST',
        headers: {
          'api-key': options.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: inputMessages,
          temperature: options.temperature,
          max_tokens: options.maxTokens,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        }),
      }),
      retryOptions
    );

    if (!response.ok) {
      throw new Error(`Error in chat completion: ${response.statusText}`);
    }

    const result = await response.json();
    const choices = result.choices;
    if (
      choices &&
      choices[0] &&
      choices[0].message &&
      choices[0].message.content &&
      choices[0].message.content.length > 0
    ) {
      return trimLeadingWhitespace(choices[0].message.content);
    }
    return null;
  } catch (e: any) {
    if (e?.response?.data?.error) {
      console.error(e?.response?.data?.error);
      throw new Error(e?.response?.data?.error?.message);
    } else {
      throw e;
    }
  }
}

export async function openAIWithStream(
  input: string,
  openAiOptions: OpenAIOptions,
  onContent: (content: string) => void,
  onStop: () => void
): Promise<string | null> {
  const options = { ...OpenAIDefaults(openAiOptions.apiKey), ...openAiOptions };

  try {
    const inputMessages: { role: string; content: string }[] = [{ role: "user", content: input }];
    if (openAiOptions.chatPrompt && openAiOptions.chatPrompt.length > 0) {
      inputMessages.unshift({ role: "system", content: openAiOptions.chatPrompt });
    }

    const url = getAzureUrl(options);
    const response = await backOff(
      () => fetch(url, {
        method: 'POST',
        headers: {
          'api-key': options.apiKey,
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream',
        },
        body: JSON.stringify({
          messages: inputMessages,
          temperature: options.temperature,
          max_tokens: options.maxTokens,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
          stream: true,
        }),
      }).then((response) => {
        if (response.ok && response.body) {
          const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
          let result = "";
          const readStream = (): any =>
            reader.read().then(({ value, done }) => {
              if (done) {
                reader.cancel();
                onStop();
                return Promise.resolve({ choices: [{ message: { content: result } }] });
              }

              const data = getDataFromStreamValue(value);
              if (!data || !data[0]) {
                return readStream();
              }

              let res = "";
              for (let i = 0; i < data.length; i++) {
                res += data[i].choices[0]?.delta?.content || "";
              }
              result += res;
              onContent(res);
              return readStream();
            });
          return readStream();
        } else {
          return Promise.reject(response);
        }
      }),
      retryOptions
    );

    const choices = (response as OpenAI.Chat.Completions.ChatCompletion)?.choices;
    if (
      choices &&
      choices[0] &&
      choices[0].message &&
      choices[0].message.content &&
      choices[0].message.content.length > 0
    ) {
      return trimLeadingWhitespace(choices[0].message.content);
    }
    return null;
  } catch (e: any) {
    if (e?.response?.data?.error) {
      console.error(e?.response?.data?.error);
      throw new Error(e?.response?.data?.error?.message);
    } else {
      throw e;
    }
  }
}

function getDataFromStreamValue(value: string) {
  const matches = [...value.split("data:")];
  return matches
    .filter(content => content.trim().length > 0 && !content.trim().includes("[DONE]"))
    .map(match => {
      try {
        return JSON.parse(match);
      } catch (e) {
        return null;
      }
    });
}

function trimLeadingWhitespace(s: string): string {
  return s.replace(/^\s+/, "");
}
