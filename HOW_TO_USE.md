# Gemini Code from Source: How-To-Use Guide & User Manual

A step-by-step user guide for navigating, interacting with, developing, and deploying **Gemini Code from Source**.

---

## Table of Contents
1. [Getting Started (Quick Start)](#1-getting-started-quick-start)
2. [Module-by-Module Walkthrough](#2-module-by-module-walkthrough)
3. [Deploying to GitHub Pages](#3-deploying-to-github-pages)
4. [Local Development Guide](#4-local-development-guide)
5. [Frequently Asked Questions & Troubleshooting](#5-frequently-asked-questions--troubleshooting)

---

## 1. Getting Started (Quick Start)

### App Interface Overview
- **Top Navigation Bar**: Switch directly between modules, change color themes, or trigger deployment.
- **Bottom Module Navigation Footer**: Move forward through the curriculum from Module 1 (GenAI 101) through Module 12 (Docs & Guides).
- **Theme Selector**: Toggle between Dark, Bark, Light, Ambient, Emerald, and Rose color palettes at any time.

---

## 2. Module-by-Module Walkthrough

### Module 1: GenAI 101 & Search vs Gemini Chat
- **What to do**: Click the prompt pills (e.g., *"How does inverted indexing differ from semantic latent embeddings?"*) to see side-by-side responses.
- **Inspect Models**: Scroll to the Gemini Models Showcase to compare context lengths (up to 2M tokens) and benchmark evaluations across the model lineup.

### Module 2: Gemini Spark Work
- **What to do**: Review autonomous Cloud Worker pipelines and explore Standing Directives that enforce enterprise governance without fine-tuning models.

### Module 3: Gemini AI Studio
- **What to do**: Switch between the Web applet preview and the Native Android mobile simulator. Examine how structured JSON schemas produce deterministic function outputs.

### Module 4: Agentic AI
- **What to do**: Study Antigravity multi-agent orchestration and test the Deep Research synthesis pipeline with citation validation.

### Module 5: Autonomous Coding Agent (18 Chapters)
- **What to do**: Select any chapter from the sidebar, read the architectural analysis, study the production code implementations, and test your knowledge with the interactive multiple-choice quiz.

### Module 6: ReAct Agent Loop Simulator
- **What to do**: Select a scenario (e.g. *Refactor Authentication System*) and click **"Next Step"** to step through the agent's internal cycle:
  `Thought -> Tool Execution -> Observation -> Reflection`.

### Module 7: Production Starter Repositories
- **What to do**: Choose an architecture (CLI, VS Code Extension, MCP Server, or Microservice), inspect the project directory tree, and click **"Download Complete Project (.zip)"** for an immediate local boilerplate.

### Module 8: AI Software Engineer Interview Lab
- **What to do**: Choose an algorithmic challenge (e.g. *Vector Cosine Similarity* or *Sliding Attention Window*). Write or modify code in the interactive editor and click **"Run Tests"** to execute against live automated unit test assertions.

### Module 11: Live Interactive Testbed
- **What to do**: Select a prompt preset or type a custom prompt. Adjust the temperature slider and observe live streamed token generation from Gemini models.

### Module 12: Docs & Guides
- **What to do**: Search through system manuals, explore step-by-step instructions, and copy production code snippets with 1-click.

---

## 3. Deploying to GitHub Pages

### Method A: In-App 1-Click Deployment (Easiest)
1. Open your repository on GitHub:
   [https://github.com/manoyrocks/Gemini-Code-from-Source](https://github.com/manoyrocks/Gemini-Code-from-Source)
2. Go to **Settings** $\rightarrow$ **Pages**.
3. Under **Build and deployment** $\rightarrow$ **Source**, change from *Deploy from a branch* to **GitHub Actions**.
4. In the app's top header, click **"Deploy to GitHub Pages"**.
5. Generate a token at [GitHub Token Settings](https://github.com/settings/tokens/new?scopes=repo) with the `repo` scope.
6. Paste your token and click **"Push to GitHub & Deploy to GitHub Pages"**.
7. Your app will automatically build and publish to:
   **`https://manoyrocks.github.io/Gemini-Code-from-Source/`**

---

### Method B: Deploy from Your Local Computer
1. In the app header, click **"Export Project (.zip)"** to download the complete codebase.
2. Extract the archive into a folder on your computer.
3. Open your terminal in the extracted directory and run:
   ```bash
   git push origin main
   ```
4. GitHub Actions will automatically trigger, build the Vite app, and publish it to GitHub Pages.

---

## 4. Local Development Guide

### Prerequisites
- Node.js 20+ installed on your computer.
- A free Google AI Studio Gemini API key from [ai.google.dev](https://ai.google.dev).

### Setup Steps
```bash
# 1. Clone the repository
git clone https://github.com/manoyrocks/Gemini-Code-from-Source.git
cd Gemini-Code-from-Source

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Open .env and set: GEMINI_API_KEY=your_actual_gemini_api_key

# 4. Start the development server
npm run dev

# 5. Open your browser
# Navigate to http://localhost:3000
```

### Production Build
```bash
# Build production bundle with Vite
npm run build

# Preview production build locally
npm run preview
```

---

## 5. Frequently Asked Questions & Troubleshooting

#### Q: How do I get a Gemini API key?
Visit [https://aistudio.google.com/](https://aistudio.google.com/), click **"Get API key"**, create a key in a new or existing Google Cloud project, and add it to your `.env` file.

#### Q: Why did Git prompt for authentication in the terminal?
GitHub removed password support in 2021. Always use a Personal Access Token (PAT) with `repo` permissions or an SSH key for HTTPS Git operations.

#### Q: Can I run this without an active backend server?
Yes! The entire application is built as a responsive client-side React SPA with relative asset paths. It runs completely offline or on static hosting providers like GitHub Pages, Cloudflare Pages, Netlify, or Vercel.
