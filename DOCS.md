# Gemini Code from Source: Technical Documentation & Architecture Manual

Comprehensive architectural documentation, SDK reference, component tree, and engineering manual for **Gemini Code from Source**.

---

## 1. System Overview

**Gemini Code from Source** is an interactive, multi-module learning laboratory and production sandbox for building autonomous coding agents, multi-modal systems, and enterprise productivity engines using Google Gemini and the modern `@google/genai` TypeScript SDK.

### Primary Objectives
- **First-Principles Education**: Deconstruct modern LLMs, reasoning traces, ReAct execution loops, and attention mechanics.
- **Interactive Simulation**: Step through an autonomous agent's ReAct cycle (`Thought -> Action -> Observation -> Memory Reflection`) with real-time browser sandbox tools.
- **Enterprise Ready Repositories**: Generate and export production-ready full-stack repositories (CLI, Extension, MCP Server, Microservice) in 1-click ZIP packages.
- **Engineering Interview Preparation**: Practice LeetCode-style AI algorithms and Google AI System Design challenges with automated in-browser execution.
- **Automated CI/CD**: Deploy directly to GitHub Pages via an automated GitHub Actions pipeline.

---

## 2. Tech Stack & Dependencies

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | React 18 & TypeScript | Component architecture, state management, and type safety |
| **Build & Bundler** | Vite 8 | Ultra-fast HMR and optimized production bundle |
| **Styling Engine** | Tailwind CSS 4 | Zero-runtime modern utility styling with multi-theme support |
| **GenAI SDK** | `@google/genai` | Modern official Google GenAI TypeScript SDK |
| **Icons & Visuals** | Lucide React | Clean, responsive SVG icon set |
| **Client Compression** | JSZip | In-browser ZIP archive generation for offline repo exports |
| **Backend / Proxy** | Express & Node.js (v20+) | API key proxying, streaming handler, and git automation |
| **CI/CD Pipeline** | GitHub Actions | Automated build, artifact generation, and Pages deployment |

---

## 3. Directory Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated GitHub Pages CI/CD workflow
├── src/
│   ├── components/
│   │   ├── AISoftwareEngineerRepo.tsx  # Module 8: Google AI Software Engineer Interview Lab
│   │   ├── AgentSimulator.tsx          # Module 6: ReAct Agent Loop Debugger & Simulator
│   │   ├── AgenticAI.tsx               # Module 4: Antigravity & Deep Research workflows
│   │   ├── AppDocumentation.tsx        # Module 12: In-App System Manual & How-to Guides
│   │   ├── BookViewer.tsx              # Module 5: 18-Chapter Autonomous Coding Agent Book
│   │   ├── CodeExplorer.tsx            # Module 9: Source Code Explorer & Architectural Files
│   │   ├── ComparisonMatrix.tsx        # Module 10: Claude vs Gemini Head-to-Head Matrix
│   │   ├── GeminiAiStudio.tsx          # Module 3: Google AI Studio Web & Android Emulators
│   │   ├── GeminiModelsShowcase.tsx    # Module 1 submodule: Comprehensive Models Catalog
│   │   ├── GeminiSparkWork.tsx         # Module 2: Autonomous Workspace Agent & Cloud Workers
│   │   ├── GenAI101.tsx                # Module 1: Foundational GenAI & Search vs Chat
│   │   ├── GitHubDeployModal.tsx       # 1-Click GitHub Pages Deploy Dialog with Token Input
│   │   ├── LivePlayground.tsx          # Module 11: Real-time Gemini Streaming Testbed
│   │   ├── ModuleNavigationFooter.tsx  # Universal bottom step-by-step module navigation
│   │   ├── Navbar.tsx                  # Global responsive header navigation & theme switcher
│   │   ├── RepoGenerator.tsx           # Module 7: Production Starter Repo ZIP Generator
│   │   ├── SearchVsGeminiChat.tsx      # Module 1 submodule: Inverted Index vs Generative LLM
│   │   └── ThemeSelector.tsx           # Multi-palette theme selector (Dark, Bark, Light, etc.)
│   ├── data/
│   │   ├── chaptersData.ts             # 18 Chapters content, quizzes, and code blueprints
│   │   ├── interviewChallenges.ts      # LeetCode-style AI algorithms with test runners
│   │   ├── repositoriesData.ts         # Full file trees for downloadable starter repositories
│   │   └── systemDesignTopics.ts       # Google L4/L5/L6 AI System Design architectures
│   ├── types/
│   │   └── agent.ts                    # TypeScript types for views, themes, challenges, steps
│   ├── App.tsx                         # Root app orchestrator, state management, modal manager
│   ├── index.css                       # Global Tailwind CSS imports & theme CSS variables
│   └── main.tsx                        # React DOM client entry point
├── server.ts                           # Express server: Gemini API proxy & /api/git-push route
├── vite.config.ts                      # Relative base './' configuration for GitHub Pages
├── package.json                        # Dependencies, scripts, and build definitions
├── DOCS.md                             # This documentation manual
└── HOW_TO_USE.md                       # Step-by-step user and contributor guide
```

---

## 4. Architectural Modules Deep-Dive

### Module 1: GenAI 101 & Search vs Gemini Chat
- **Search vs Gemini Chat Pipeline**: Compares classical Information Retrieval (Crawling -> Parsing -> Inverted Index -> PageRank) against Generative Transformers (Pre-training -> Self-Attention -> Autoregression -> Real-time Search Grounding).
- **Gemini Model Lineup**: Detailed hardware specs, token windows (up to 2,000,000 tokens), benchmark ratings, and sweet-spot use cases for Gemini 2.5 Pro, 2.5 Flash, 2.5 Flash-Lite, and 2.0 Flash Thinking.

### Module 2: Gemini Spark Work
- **Autonomous Cloud Workers**: Explores asynchronous background task workers executing across Google Workspace with status telemetry.
- **Standing Directives**: Teaches persistent policy guardrails that dictate agent constraints across organizational data boundaries.

### Module 3: Gemini AI Studio
- **Dual Runtime Emulation**: Real-time simulation of web single-page apps alongside native Android Jetpack Compose implementations.
- **Structured Schema Generator**: Enforces type-safe function declarations using `@google/genai` `Type.OBJECT` and `Type.STRING`.

### Module 4: Agentic AI
- **Antigravity Multi-Agent Orchestration**: Inter-agent message buses, task handoffs, and verification agents.
- **Deep Research Pipeline**: Autonomous source synthesis, cross-citation validation, and hallucination reduction.

### Module 5: Autonomous Coding Agent Book (18 Chapters)
- Comprehensive 18-chapter curriculum spanning agent architectures, token dynamics, AST refactoring, dynamic prompt compression, and self-correcting unit test loops.

### Module 6: ReAct Agent Loop Simulator
- Visualizes the classic `Thought -> Action -> Observation -> Reflection` cycle.
- Inspects real-time working memory and token context consumption as tasks progress.

### Module 7: Production Starter Repositories
- Complete downloadable boilerplates (TypeScript CLI, VS Code Extension, MCP Server, Microservice).
- Built-in in-browser ZIP generator powered by `JSZip`.

### Module 8: AI Software Engineer Interview Lab
- LeetCode-style AI algorithms (Vector Cosine Similarity, Multi-Head Attention, Semantic Caching).
- Real-time in-browser JavaScript evaluation sandbox with pass/fail test assertions.
- Google AI System Design architectures (100K QPS Gateways, Real-time RAG).

### Module 11: Live Interactive Testbed
- Direct interaction with live Gemini models (`gemini-3.8-flash`, `gemini-2.5-flash`).
- Parameter sliders for Temperature, Top-P, and System Instructions.

### Module 12: Documentation & How-To Guides
- Comprehensive in-app documentation with real-time search, category filtering, step-by-step instructions, and direct module launchers.

---

## 5. Official `@google/genai` TypeScript SDK Integration

The project standardizes on the modern `@google/genai` library:

```typescript
import { GoogleGenAI, Type } from '@google/genai';

// 1. Initialize client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// 2. Structured Function Calling declaration
const weatherTool = {
  name: 'getWeather',
  description: 'Retrieve current meteorological metrics for a city',
  parameters: {
    type: Type.OBJECT,
    properties: {
      location: { type: Type.STRING, description: 'City and state/country' },
      unit: { type: Type.STRING, enum: ['celsius', 'fahrenheit'] }
    },
    required: ['location']
  }
};

// 3. Streaming generation with model fallback
const responseStream = await ai.models.generateContentStream({
  model: 'gemini-3.8-flash',
  contents: 'Plan a safe autonomous deployment for cloud services',
  config: {
    systemInstruction: 'You are an autonomous Site Reliability Engineering agent.',
    temperature: 0.2,
    tools: [{ functionDeclarations: [weatherTool] }]
  }
});
```

---

## 6. Security & Sensitive Information Handling

- **Zero Hardcoded Secrets**: Secrets and API keys are strictly forbidden in client-side code and version control.
- **Server-Side Token Sanitization**: The `/api/git-push` endpoint strips and scrubs authentication tokens from error logs before responding to clients.
- **Safe Static Deployment**: When deployed to GitHub Pages, the app operates as a secure client-side single-page app without exposing private credentials.
