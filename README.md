<p align="center">
  <a href="" rel="noopener">
 <img width=400px height=200px src="./docs/openai.webp" alt="Project logo"></a>
 <img width=200px height=200px src="./docs/logseq.png" alt="Project logo"></a>
</p>

<h3 align="center">logseq-plugin-azure-openai</h3>

<div align="center">

[![Release](https://img.shields.io/github/v/release/haha1903/logseq-plugin-azure-openai)](https://github.com/haha1903/logseq-plugin-azure-openai/releases)
[![GitHub Issues](https://img.shields.io/github/issues/haha1903/logseq-plugin-azure-openai.svg)](https://github.com/haha1903/logseq-plugin-azure-openai/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/haha1903/logseq-plugin-azure-openai.svg)](https://github.com/haha1903/logseq-plugin-azure-openai/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> A plugin for Azure OpenAI AI assisted note taking in Logseq. Uses Azure OpenAI's GPT-4.1 model by default.
    <br>
</p>

---

## Acknowledgments

This project is based on the excellent work by [@briansunter](https://github.com/briansunter) and his project [logseq-plugin-gpt3-openai](https://github.com/briansunter/logseq-plugin-gpt3-openai). We have modified and optimized it specifically for Azure OpenAI services.

Special thanks to **Brian Sunter** for his outstanding contribution to the Logseq community!

---

# Usage

##  `gpt`

To bring up the gpt popup, use the keyboard shortcut `cmd+g` (or `ctrl+g` on Windows/Linux), or select `gpt` from the block or slash menu.

If you are currently in a block, the plugin will use the text in the block as input to the prompt.

You can click and drag or shift+click to select multiple blocks to use as input to the prompt.

If you are not in a block, the plugin won't add any additional input text to your prompt, and will append the results of the prompt to the bottom of the page.

After selecting the prompt and generating a response, a preview of the response will be shown in the popup with **markdown rendering support**. The preview offers two view modes:
- **Preview Mode**: Renders markdown with proper formatting, headers, lists, code blocks, and tables
- **Raw Mode**: Shows the raw markdown text for editing or copying

You can click the `Insert` button or press the enter key to insert the response into the page.

You can also click the `Replace` button to replace the selected block with the response.

Additionally, you can use the `Replace by Selected` button to replace only the text you have selected in the preview area, giving you more precise control over what content to insert.

If you don't like the response, you can click the `Regenerate` button to generate a new response.

### Custom prompts
After you open the popup, you can write any text you want to use as the prompt.

For example you can write `create flashcards based on the following text:` and the plugin will generate flashcards for you to study.

### Built-in prompt templates
There are a number of built in prompt templates that you can use to generate text. These are useful for generating outlines, summaries, and other tasks.

#### Most important ideas
Extract the most important ideas from your text.

#### Common Objections  
Generate common objections to arguments in your text.

#### Ask questions
Generate questions based on your text content.

### User prompt templates
You can also create your own custom prompt templates.
To do this, you create a block with the `prompt-template::` property. The template will be added to the list of templates in the gpt popup.

The `prompt-template::` property is the name of the prompt template.

In a block nested underneath the template block, create a code block in triple backticks with the language set to `prompt`. The text in the code block will be used as the prompt. Make sure the code block is in its own block indented underneath the template block.

For example, you can create a template like this:

<pre>
- # Student Teacher Dialog
  prompt-template:: Student Teacher Dialog
	- ```prompt
	    Rewrite text as a dialog between a teacher and a student:
	  ```
</pre>

### Replace
To replace the selected block with the generated text, click the `Replace` button.

### Replace by Selected
The `Replace by Selected` button allows you to replace only the text you have selected in the preview area. This feature provides fine-grained control over which parts of the AI response you want to insert into your document. Simply:
1. Select the desired text in the preview area (works in both Preview and Raw modes)
2. Click the `Replace by Selected` button
3. Only the selected portion will replace your original content

### Regenerate
If you don't like the output of the prompt, you can click the `Regenerate` button to generate a new response. Sometimes the first response is not the best, but the second or third response can be better.

## `gpt-block`

Type `/gpt-block` in a block or select `gpt-block` from the block menu.

`gpt-block` will send the block to Azure OpenAI's GPT API and append the response underneath the block with streaming output.

#### Ask questions
You can use this command to ask questions about the content in your block.

## `gpt-replace-block`

Type `/gpt-replace-block` in a block or select `gpt-replace-block` from the block menu, or use the configurable keyboard shortcut.

`gpt-replace-block` will send the block to Azure OpenAI's GPT API and replace the current block content with the AI response. This command has its own **configurable prompt setting**, allowing you to customize the AI behavior specifically for block replacement operations.

#### Use Cases
- Refining and improving existing text
- Correcting grammar and style
- Translating content
- Reformatting text according to specific requirements

### `gpt-page`

Type `/gpt-page` in a block or select `gpt-page` from the block menu.

`gpt-page` will send the entire page to Azure OpenAI's GPT API and append the response to the bottom of the page with streaming output.

#### Select Multiple Blocks
You can click and drag or shift+click to select multiple blocks to use as input to the prompt.

### Azure OpenAI Guidance
You can adjust the `Chat Prompt` setting to adjust how Azure OpenAI should respond to your input. By default, the setting is set to `Do not refer to yourself in your answers. Do not say as an AI language model...` to prevent the model from including unnecessary text in the response.

You can add guidance such as "respond in chinese" or "respond in spanish" to the prompt to get the model to respond in a different language.

### Inject Prefix

Allows you to inject a prefix into the Azure OpenAI output before it is inserted into the block, such as a [[azure-ai]] tag or markdown formatting like `>` for a blockquote. This is useful for identifying blocks that were generated by Azure OpenAI.

Use the `Output prefix` options in the setting to set the prefix. You can add a space or `\n` newline to separate the prefix from the generated text.

## About <a name = "about"></a>

`logseq-plugin-azure-openai` allows users to generate human-like text using Azure OpenAI within the LogSeq editor.

Write a prompt in a block, then run the `/gpt` command via the slash or block menu. The plugin will generate an Azure OpenAI response and insert it below. It removes leading and trailing whitespace from the prompt.

## Getting Started <a name = "getting_started"></a>

### Prerequisites

- You need an Azure OpenAI resource with a deployed model
- An API key from your Azure OpenAI resource
- Your Azure OpenAI resource name
- Your Azure OpenAI deployment name

### Configuration

After installing the plugin, you need to configure the following settings:

- **Azure OpenAI API Key**: Your Azure OpenAI API key from your Azure portal
- **Azure OpenAI Resource Name**: The subdomain of your Azure OpenAI endpoint (e.g., if your endpoint is `https://myresource.openai.azure.com/`, then your resource name is `myresource`)
- **Azure OpenAI Deployment Name**: The name of your model deployment (default: `gpt-4.1`)
- **Azure OpenAI API Version**: The API version to use (default: `2025-01-01-preview`)

### Model Support

The plugin is configured to work with Azure OpenAI's GPT models. The default deployment name is set to `gpt-4.1`, but you can change this to match your Azure OpenAI deployment.

### Installing

Download the plugin in the Logseq marketplace by searching for `azure openai`.

## ⚠️ Warning ⚠️

Azure OpenAI has limitations. It sometimes produces output that is subtly wrong or misleading. Don't rely on its output without verifying it yourself. Use it with caution.

## Example Use Cases <a name = "examples"></a>

### Summarizing or explaining a block of text
Use the built-in "Summarize" template or create a custom prompt like "Summarize the following text:"

### Creating bullet point outlines for a given topic
Use prompts like "Create an outline for:" followed by your topic.

### Creating study plan for a given topic
Ask "Create a study plan for learning:" followed by your subject.

### Write a travel itinerary
Use prompts like "Create a travel itinerary for a trip to:"

### Explain how to do something
Ask "How do I:" followed by your question.

### Parse tabular data from plain english
Convert unstructured data into tables by prompting "Convert the following to a table:"

- Generate code to do a given task
- Correct grammar
- Translate into other languages
- Classification and keyword tagging of text
- Generate lists of given topics
  - `List 10 top selling science fiction books`
- Write about a given topic
  - `Write a tagline for an ice cream shop.`
- Answer Questions
  - `Q: How does a telescope work?`

## Settings <a name = "settings"></a>

The plugin provides several configurable settings:

- **Azure OpenAI API Key**: Your Azure OpenAI API key
- **Azure OpenAI Resource Name**: Your Azure resource name
- **Azure OpenAI Deployment Name**: Your model deployment name (default: gpt-4.1)
- **Azure OpenAI API Version**: API version (default: 2025-01-01-preview)
- **Chat Prompt**: System prompt to guide the model's behavior
- **Temperature**: Controls randomness in output (0.0 to 2.0)
- **Max Tokens**: Maximum number of tokens to generate
- **Output prefix**: Text to prepend to generated content
- **Replace Block Prompt**: Custom prompt specifically for the `gpt-replace-block` command
- **Keyboard Shortcuts**: Customizable shortcuts for different commands (including `gpt-replace-block`)

## FAQ <a name = "faq"></a>

### What is Azure OpenAI?

Azure OpenAI Service provides REST API access to OpenAI's powerful language models including GPT-4, GPT-3.5-turbo, and the Codex series. It's Microsoft's cloud-based implementation of OpenAI models with enterprise-grade security and compliance.

### Errors

#### Azure OpenAI Quota Reached

Your Azure OpenAI resource has reached its quota limit. Check your Azure portal for usage and quotas.

#### `Azure OpenAI Rate Limited`

Azure OpenAI has limits on how often you can call the API. If you get this error, you'll need to wait a bit before trying again. Check your Azure OpenAI resource for rate limits.

#### `Model not available`

You may have mistyped the deployment name, or your Azure OpenAI resource doesn't have the specified model deployed.

### Debugging

- Open the developer tools (Menu -> View -> Toggle Developer tools)
- Check the console logs for error messages
- Verify your Azure OpenAI configuration in the plugin settings
- Ensure your Azure OpenAI resource is properly deployed and accessible

## 💻 Local Development

This enables the local dev server with hot reloading, via the logseq vite plugin.

```bash
pnpm i
pnpm run dev
```

### Prod build

First run `pnpm i` and `pnpm run build`

Open LogSeq

Go to Settings > Turn on Developer Mode

This will bring up the "Plugins" entry in three dots more menu list on the top right of the header bar. Go to Plugins page, and you will get a button with the `Load unpacked plugin` label. Select the root folder of this plugin repo.

Make sure you configure your Azure OpenAI settings as described above.

## Build <a name="usage"></a>

```bash
pnpm run build
```

## 🚀 Deployment <a name = "deployment"></a>

Creates a build using semantic release when a commit is pushed with a smart commit message.

## Built Using <a name = "built_using"></a>

- [LogSeq](https://logseq.com/) - Privacy-first, open-source knowledge base that works on top of local plain-text Markdown and Org-mode files
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Azure OpenAI](https://azure.microsoft.com/en-us/products/ai-services/openai-service) - Microsoft's cloud-based OpenAI service

## Contributing <a name = "contributing"></a>

Do you have a bug or idea? I would love to hear from you! [Open a GitHub issue here.](https://github.com/logseq-plugin-azure-openai/issues/new)

PRs welcome. [Open an issue](https://github.com/logseq-plugin-azure-openai/issues/new) to discuss first if possible.

## Authors <a name = "authors"></a>

- [@Peter C](https://github.com/peter-c) - Author

## Acknowledgements <a name = "acknowledgement"></a>

- [Azure OpenAI Service](https://azure.microsoft.com/en-us/products/ai-services/openai-service)
- [OpenAI](https://openai.com/) for the underlying models
- [LogSeq](https://logseq.com/) for the excellent note-taking platform
