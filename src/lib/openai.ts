import OpenAI from "openai";
import "@logseq/libs";
import { backOff } from "exponential-backoff";

export interface OpenAIOptions {
  apiKey: string;
  deploymentName: string;
  temperature?: number;
  maxTokens?: number;
  useBuiltinPrompts?: boolean;
  chatPrompt: string;
  replacePrompt: string;
  apiVersion?: string;
  resourceName?: string;
  injectPrefix?: string;
}

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

function buildInputMessages(prompt: string, input: string): { role: string; content: string }[] {
  if (input) {
    input = input
      .split('\n')
      .filter(line => !line.trim().startsWith('logseq.'))
      .join('\n')
      .trim();
  }

  const inputMessages: { role: string; content: string }[] = [{ role: "user", content: input }];
  inputMessages.unshift({ role: "system", content: prompt });

  return inputMessages;
}

function createRequestBody(
  inputMessages: { role: string; content: string }[], 
  options: OpenAIOptions, 
  isStream = false
) {
  return JSON.stringify({
    messages: inputMessages,
    temperature: options.temperature,
    max_tokens: options.maxTokens,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    ...(isStream && { stream: true }),
  });
}

function handleApiError(e: any): never {
  if (e?.response?.data?.error) {
    console.error(e?.response?.data?.error);
    throw new Error(e?.response?.data?.error?.message);
  } else {
    throw e;
  }
}

function extractContentFromResponse(choices: any): string | null {
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
}

export async function openAI(
  prompt: string,
  input: string,
  openAiOptions: OpenAIOptions
): Promise<string | null> {

  try {
    const inputMessages = buildInputMessages(prompt, input);
    const url = getAzureUrl(openAiOptions);
    
    const response = await backOff(
      () => fetch(url, {
        method: 'POST',
        headers: {
          'api-key': openAiOptions.apiKey,
          'Content-Type': 'application/json',
        },
        body: createRequestBody(inputMessages, openAiOptions),
      }),
      retryOptions
    );

    if (!response.ok) {
      throw new Error(`Error in chat completion: ${response.statusText}`);
    }

    const result = await response.json();
    return extractContentFromResponse(result.choices);
  } catch (e: any) {
    handleApiError(e);
  }
}

export async function openAIWithStream(
  prompt: string,
  input: string,
  openAiOptions: OpenAIOptions,
  onContent: (content: string) => void,
  onStop: () => void
): Promise<string | null> {
  try {
    const inputMessages = buildInputMessages(prompt, input);
    const url = getAzureUrl(openAiOptions);
    
    const response = await backOff(
      () => fetch(url, {
        method: 'POST',
        headers: {
          'api-key': openAiOptions.apiKey,
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream',
        },
        body: createRequestBody(inputMessages, openAiOptions, true),
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
    return extractContentFromResponse(choices);
  } catch (e: any) {
    handleApiError(e);
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
