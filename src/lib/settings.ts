import { SettingSchemaDesc } from "@logseq/libs/dist/LSPlugin";
import { OpenAIOptions } from "./openai";

export const settingsSchema: SettingSchemaDesc[] = [
  {
    key: "azureApiKey",
    type: "string",
    default: "",
    title: "Azure OpenAI API Key",
    description:
      "Your Azure OpenAI API key. You can get this from your Azure OpenAI resource.",
  },
  {
    key: "azureResourceName",
    type: "string",
    default: "",
    title: "Azure OpenAI Resource Name",
    description:
      "Your Azure OpenAI resource name. This is the subdomain of your Azure OpenAI endpoint.",
  },
  {
    key: "azureDeploymentName",
    type: "string",
    default: "gpt-4.1",
    title: "Azure OpenAI Deployment Name",
    description: "The name of your Azure OpenAI deployment.",
  },
  {
    key: "azureApiVersion",
    type: "string",
    default: "2025-01-01-preview",
    title: "Azure OpenAI API Version",
    description: "The API version to use for Azure OpenAI requests.",
  },
  {
    key: "chatPrompt",
    type: "string",
    default:
      "Do not refer to yourself in your answers. Do not say as an AI language model...",
    title: "Chat Prompt",
    description:
      "Initial message that tells the model how to answer. See Azure OpenAI documentation for more info.",
  },
  {
    key: "replacePrompt",
    type: "string",
    default:
      "Please improve and rewrite the following text. Make it clearer, more concise, and better structured while maintaining the original meaning:",
    title: "Replace Prompt",
    description:
      "Initial message for gpt-replace-block function. This prompt will be used when replacing block content.",
  },
  {
    key: "openAITemperature",
    type: "number",
    default: 1.0,
    title: "Temperature",
    description:
      "The temperature controls how much randomness is in the output.<br/>" +
      "You can set a different temperature in your own prompt templates by adding a 'prompt-template' property to the block.",
  },
  {
    key: "openAIMaxTokens",
    type: "number",
    default: 32000,
    title: "Max Tokens",
    description:
      "The maximum amount of tokens to generate. Tokens can be words or just chunks of characters. The number of tokens processed in a given API request depends on the length of both your inputs and outputs. As a rough rule of thumb, 1 token is approximately 4 characters or 0.75 words for English text. One limitation to keep in mind is that your text prompt and generated completion combined must be no more than the model's maximum context length.",
  },
  {
    key: "useBuiltinPrompts",
    type: "boolean",
    default: true,
    title: "Use Built-in Prompts",
    description:
      "Enable the use of built-in prompt templates.",
  },
  {
    key: "injectPrefix",
    type: "string",
    default: "",
    title: "Output prefix",
    description:
      "Prepends the output with this string. Such as a tag like [[gpt]] or markdown like > to blockquote. Add a space at the end if you want a space between the prefix and the output or \\n for a linebreak.",
  },
  {
    key: "shortcutBlock",
    type: "string",
    default: "mod+j",
    title: "Keyboard Shortcut for /gpt-block",
    description: "",
  },
  {
    key: "popupShortcut",
    type: "string",
    default: "mod+g",
    title: "Keyboard Shortcut for /gpt popup",
    description: "",
  },
  {
    key: "shortcutReplaceBlock",
    type: "string",
    default: "mod+t",
    title: "Keyboard Shortcut for /gpt-replace-block",
    description: "",
  },
];

function unescapeNewlines(s: string) {
  return s.replace(/\\n/g, "\n");
}

export function getOpenaiSettings(): OpenAIOptions {
  const apiKey = logseq.settings!["azureApiKey"] as string;
  const deploymentName = logseq.settings!["azureDeploymentName"] as string;
  const resourceName = logseq.settings!["azureResourceName"] as string;
  const injectPrefix = unescapeNewlines(logseq.settings!["injectPrefix"] as string);
  const temperature = Number.parseFloat(logseq.settings!["openAITemperature"] as string);
  const maxTokens = Number.parseInt(logseq.settings!["openAIMaxTokens"] as string);
  const chatPrompt = logseq.settings!["chatPrompt"] as string;
  const replacePrompt = logseq.settings!["replacePrompt"] as string;
  const apiVersion = logseq.settings!["azureApiVersion"] as string;
  const useBuiltinPrompts = logseq.settings!["useBuiltinPrompts"] as boolean;
  
  const OpenAIDefaults = (apiKey: string): OpenAIOptions => ({
    apiKey,
    deploymentName: "gpt-4.1",
    temperature: 1.0,
    maxTokens: 1000,
    useBuiltinPrompts: true,
    apiVersion: '2025-01-01-preview',
    resourceName: '',
    chatPrompt: '',
    replacePrompt: '',
  });

  return {...OpenAIDefaults, ...{
    apiKey,
    deploymentName,
    resourceName,
    temperature,
    maxTokens,
    injectPrefix,
    chatPrompt,
    replacePrompt,
    apiVersion,
    useBuiltinPrompts,
  }};
}
