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

## 📚 Table of Contents

- [🚀 Quick Start](#-quick-start)
- [💡 Features](#-features)
- [📖 Usage Guide](#-usage-guide)
  - [`gpt` Command](#gpt)
  - [`gpt-block` Command](#gpt-block)
  - [`gpt-replace-block` Command](#gpt-replace-block)
  - [`gpt-page` Command](#gpt-page)
- [⚙️ Configuration](#️-configuration)
- [📝 Examples](#-examples)
- [❓ FAQ & Troubleshooting](#-faq--troubleshooting)
- [🛠️ Development](#️-development)
- [🤝 Contributing](#-contributing)

---

## 🚀 Quick Start

### Step 1: Install the Plugin
Download the plugin in the Logseq marketplace by searching for `azure openai`.

### Step 2: Get Azure OpenAI Credentials
You'll need:
- An Azure OpenAI resource with a deployed model
- API key from your Azure OpenAI resource
- Your Azure OpenAI resource name
- Your Azure OpenAI deployment name

### Step 3: Configure the Plugin
1. Go to Logseq Settings → Plugins → Azure OpenAI
2. Fill in the required fields:
   ```
   Azure OpenAI API Key: your-api-key-here
   Resource Name: myresource (from https://myresource.openai.azure.com/)
   Deployment Name: gpt-4 (your deployed model name)
   API Version: 2025-01-01-preview (default)
   ```

### Step 4: Start Using
- Press `Cmd+G` (Mac) or `Ctrl+G` (Windows/Linux) to open the GPT popup
- Or type `/gpt` in any block

**⚠️ Important**: Always verify AI-generated content before using it. Azure OpenAI can sometimes produce subtly incorrect information.

---

## 💡 Features

- **🎯 Smart Context Awareness**: Automatically uses selected blocks as context for AI prompts
- **📝 Multiple Output Options**: Insert, replace, or selectively replace generated content
- **🎨 Rich Preview**: Markdown rendering with preview and raw modes
- **⚡ Streaming Responses**: Real-time AI response generation
- **🔧 Custom Templates**: Create and use your own prompt templates
- **🌐 Multi-language Support**: Configure AI to respond in different languages
- **🎛️ Flexible Commands**: Block-level, page-level, and replacement operations
- **🔒 Enterprise Ready**: Built for Azure OpenAI with enterprise security

---

## 📖 Usage Guide

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

## ⚙️ Configuration

### Azure OpenAI Setup Guide

#### Step 1: Create Azure OpenAI Resource
1. Go to [Azure Portal](https://portal.azure.com)
2. Create a new Azure OpenAI resource
3. Deploy a model (recommended: GPT-4 or GPT-3.5-turbo)
4. Note down your:
   - **API Key** (found in Keys and Endpoint section)
   - **Endpoint URL** (e.g., `https://myresource.openai.azure.com/`)
   - **Deployment Name** (the name you gave to your deployed model)

#### Step 2: Plugin Configuration
Navigate to: **Logseq Settings → Plugins → Azure OpenAI**

| Setting | Description | Example |
|---------|-------------|---------|
| **API Key** | Your Azure OpenAI API key | `abc123...` |
| **Resource Name** | Subdomain from your endpoint URL | `myresource` |
| **Deployment Name** | Your model deployment name | `gpt-4` |
| **API Version** | Azure OpenAI API version | `2025-01-01-preview` |
| **Temperature** | Response creativity (0.0-2.0) | `0.7` |
| **Max Tokens** | Maximum response length | `2000` |

#### Step 3: Verify Setup
1. Open any Logseq page
2. Press `Cmd+G` (Mac) or `Ctrl+G` (Windows/Linux)
3. Type a simple prompt like "Hello, can you help me?"
4. If configured correctly, you should see an AI response

### Supported Models
- GPT-4 (recommended)
- GPT-4 Turbo
- GPT-3.5-turbo
- Any Azure OpenAI deployed model

## ⚠️ Warning ⚠️

Azure OpenAI has limitations. It sometimes produces output that is subtly wrong or misleading. Don't rely on its output without verifying it yourself. Use it with caution.

## 📝 Examples

### 📚 Academic & Learning
- **Summarize**: `Summarize the following text in 3 bullet points:`
- **Study Plans**: `Create a 4-week study plan for learning Python programming`
- **Flashcards**: `Create flashcards for the following content:`
- **Q&A Generation**: `Generate 5 study questions based on this text:`

### 💼 Professional & Productivity
- **Meeting Notes**: `Convert these meeting notes into action items:`
- **Email Drafts**: `Write a professional email about:`
- **Project Planning**: `Create a project timeline for:`
- **Documentation**: `Write technical documentation for this code:`

### ✍️ Writing & Content
- **Grammar Check**: `Improve the grammar and clarity of this text:`
- **Translation**: `Translate the following to Spanish:`
- **Tone Adjustment**: `Rewrite this in a more formal tone:`
- **Content Ideas**: `Generate 10 blog post ideas about:`

### 🔍 Analysis & Research
- **Data Tables**: `Convert this unstructured data into a table:`
- **Key Points**: `Extract the most important ideas from:`
- **Objections**: `List potential objections to these arguments:`
- **Comparisons**: `Compare and contrast these concepts:`

### 💻 Development & Technical
- **Code Generation**: `Write a Python function that:`
- **Code Review**: `Review this code and suggest improvements:`
- **Documentation**: `Write API documentation for:`
- **Debugging**: `Help me debug this error:`

### 🎯 Quick Examples
```
List 10 innovative startup ideas in renewable energy
Write a compelling tagline for a plant-based restaurant
Explain quantum computing to a 12-year-old
Create a workout plan for busy professionals
```

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

## ❓ FAQ & Troubleshooting

### General Questions

#### What is Azure OpenAI?
Azure OpenAI Service provides REST API access to OpenAI's powerful language models including GPT-4, GPT-3.5-turbo, and the Codex series. It's Microsoft's cloud-based implementation of OpenAI models with enterprise-grade security and compliance.

#### How is this different from regular OpenAI?
- **Enterprise Security**: Better data protection and compliance
- **Regional Availability**: Deploy in specific Azure regions
- **SLA Guarantees**: Enterprise-grade service level agreements
- **Integration**: Seamless integration with other Azure services

#### What models are supported?
All Azure OpenAI deployed models including:
- GPT-4 (recommended)
- GPT-4 Turbo
- GPT-3.5-turbo
- Future Azure OpenAI models

### Common Issues & Solutions

#### ❌ "Invalid API Key" Error
**Symptoms**: Plugin doesn't respond or shows authentication error
**Solutions**:
1. Verify your API key in Azure Portal → OpenAI → Keys and Endpoint
2. Make sure you copied the entire key without extra spaces
3. Try regenerating the key in Azure Portal

#### ❌ "Model not available" Error
**Symptoms**: Error message about model not found
**Solutions**:
1. Check your deployment name in Azure Portal → OpenAI → Deployments
2. Ensure the model is successfully deployed (status: Succeeded)
3. Verify the deployment name matches exactly (case-sensitive)

#### ❌ "Azure OpenAI Rate Limited"
**Symptoms**: Requests failing with rate limit messages
**Solutions**:
1. Wait 1-2 minutes before trying again
2. Check your quota usage in Azure Portal
3. Consider upgrading your Azure OpenAI tier
4. Reduce request frequency

#### ❌ "Azure OpenAI Quota Reached"
**Symptoms**: No responses generated, quota error messages
**Solutions**:
1. Check usage in Azure Portal → OpenAI → Quotas
2. Wait for quota reset (usually monthly)
3. Request quota increase in Azure Portal
4. Consider multiple Azure regions

#### ❌ Plugin Not Responding
**Symptoms**: No popup appears or commands don't work
**Solutions**:
1. Restart Logseq
2. Disable and re-enable the plugin
3. Check if plugin is properly installed and enabled
4. Verify keyboard shortcuts in settings

### Performance Optimization

#### Making Responses Faster
- Use shorter prompts when possible
- Reduce max tokens setting for quicker responses
- Consider using GPT-3.5-turbo for faster (but less capable) responses

#### Reducing Costs
- Set appropriate max tokens limits
- Use temperature settings wisely (lower = more deterministic, less creative)
- Monitor usage in Azure Portal regularly

### Debugging Steps

1. **Check Console Logs**:
   - Open Developer Tools: `Menu → View → Toggle Developer Tools`
   - Look for error messages in the Console tab

2. **Verify Configuration**:
   - Settings → Plugins → Azure OpenAI
   - Test with a simple prompt

3. **Test Azure Connection**:
   - Use Azure Portal to test your endpoint directly
   - Verify your resource is active and deployed

4. **Common Configuration Mistakes**:
   ```
   ❌ Wrong: https://myresource.openai.azure.com/
   ✅ Correct: myresource
   
   ❌ Wrong: gpt-4-32k (if not deployed)
   ✅ Correct: gpt-4 (your actual deployment name)
   ```

### Need More Help?

1. 📖 Check the [Azure OpenAI Documentation](https://docs.microsoft.com/en-us/azure/cognitive-services/openai/)
2. 🐛 [Open an Issue](https://github.com/haha1903/logseq-plugin-azure-openai/issues) with:
   - Your configuration (without API key)
   - Error messages from console
   - Steps to reproduce the problem
3. 💬 Join the Logseq Discord community for general help

## 🛠️ Development

### Prerequisites
- Node.js 16+
- pnpm (recommended) or npm
- Logseq installed

### Local Development Setup

1. **Clone and Install**
   ```bash
   git clone https://github.com/haha1903/logseq-plugin-azure-openai.git
   cd logseq-plugin-azure-openai
   pnpm install
   ```

2. **Start Development Server**
   ```bash
   pnpm run dev
   ```
   This enables hot reloading via the Logseq Vite plugin.

3. **Load in Logseq**
   - Open Logseq
   - Go to Settings → Turn on Developer Mode
   - Navigate to Plugins → Load unpacked plugin
   - Select the root folder of this plugin repo
   - Configure your Azure OpenAI settings

### Building for Production

```bash
pnpm run build
```

### Project Structure
```
├── src/
│   ├── components/     # UI components
│   ├── services/       # Azure OpenAI integration
│   ├── types/          # TypeScript types
│   └── utils/          # Helper functions
├── public/             # Static assets
└── dist/              # Built plugin files
```

### Tech Stack
- **🌐 Frontend**: TypeScript, React, Vite
- **🎨 UI**: Tailwind CSS, Radix UI components
- **🔧 Build**: Vite, ESBuild
- **📱 Platform**: Logseq Plugin API
- **☁️ API**: Azure OpenAI REST API

### Deployment
Automatic deployment via GitHub Actions using semantic-release when commits follow conventional commit format.

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Reporting Issues
🐛 [Open an issue](https://github.com/haha1903/logseq-plugin-azure-openai/issues/new) with:
- Clear description of the problem
- Steps to reproduce
- Your environment (OS, Logseq version, plugin version)
- Console error messages (if any)

### Submitting PRs
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes with clear commit messages
4. Add tests if applicable
5. Ensure code passes linting: `pnpm run lint`
6. Submit a pull request

### Development Guidelines
- Follow TypeScript best practices
- Use functional components and hooks
- Write clear, descriptive commit messages
- Add JSDoc comments for complex functions
- Test your changes thoroughly

## 👥 Authors & Contributors

- **[@haha1903](https://github.com/haha1903)** - Original Azure OpenAI adaptation
- **[@briansunter](https://github.com/briansunter)** - Original GPT-3 plugin foundation

## 🙏 Acknowledgements

- **[Brian Sunter](https://github.com/briansunter)** - For the excellent [logseq-plugin-gpt3-openai](https://github.com/briansunter/logseq-plugin-gpt3-openai) foundation
- **[Azure OpenAI Service](https://azure.microsoft.com/en-us/products/ai-services/openai-service)** - For enterprise-grade AI services
- **[OpenAI](https://openai.com/)** - For the underlying language models
- **[Logseq](https://logseq.com/)** - For the amazing note-taking platform
- **The Logseq Community** - For continuous feedback and support
