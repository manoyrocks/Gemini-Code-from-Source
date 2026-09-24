import React, { useState, useMemo } from 'react';
import { ViewMode } from '../types/agent';
import {
  BookOpen,
  Search,
  Rocket,
  Compass,
  Code2,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  Bot,
  Zap,
  Github,
  CheckCircle2,
  Copy,
  Check,
  ChevronRight,
  ExternalLink,
  HelpCircle,
  Download,
  Flame,
  Key,
  Globe,
  Settings,
  ShieldCheck,
  Workflow,
  ArrowRight,
  FileText,
  Boxes,
  Play
} from 'lucide-react';

interface AppDocumentationProps {
  onNavigate: (view: ViewMode) => void;
  onOpenDeployModal?: () => void;
}

interface DocSection {
  id: string;
  category: 'getting-started' | 'how-to-use' | 'architecture' | 'deployment' | 'faq';
  title: string;
  summary: string;
  badge?: string;
  relatedModule?: ViewMode;
  content: {
    overview: string;
    keyFeatures?: string[];
    steps?: { step: number; title: string; desc: string; code?: string }[];
    codeSnippets?: { title: string; lang: string; code: string }[];
    proTips?: string[];
    faqs?: { q: string; a: string }[];
  };
}

export const AppDocumentation: React.FC<AppDocumentationProps> = ({
  onNavigate,
  onOpenDeployModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const docSections: DocSection[] = useMemo(
    () => [
      {
        id: 'quickstart',
        category: 'getting-started',
        title: '3-Minute Quickstart Guide',
        summary: 'Everything you need to understand, run, and master the Gemini Code from Source platform.',
        badge: 'Essential',
        content: {
          overview:
            'Gemini Code from Source is an interactive technical masterclass and live laboratory for engineering modern autonomous AI agents, multi-modal pipelines, and enterprise systems using Google Gemini and the official @google/genai TypeScript SDK.',
          keyFeatures: [
            '12 self-contained interactive learning modules and execution sandboxes',
            'Full ReAct loop simulator with live tool-calling and step-by-step memory inspections',
            '18-chapter autonomous coding agent comprehensive engineering book',
            'Google AI Software Engineer technical interview preparation & live algorithmic runner',
            'One-click GitHub Pages automated CI/CD deployment via GitHub Actions'
          ],
          steps: [
            {
              step: 1,
              title: 'Explore GenAI 101 & Architecture Evolution',
              desc: 'Learn the architectural paradigm shift from traditional Google Search (inverted index & PageRank) to Gemini Chat (transformer autoregression, pre-training, RLHF, and real-time grounding).',
            },
            {
              step: 2,
              title: 'Test Autonomous Agent ReAct Loop',
              desc: 'Open the Agent Simulator (Module 6) to watch how an agent reasons with Thought -> Action -> Observation -> Final Answer loops with real browser tools.',
            },
            {
              step: 3,
              title: 'Experiment in the Live Testbed',
              desc: 'Run real Gemini 3.8-Flash queries, adjust temperature and top-p parameters, and inspect token generation in real time.',
            },
            {
              step: 4,
              title: 'Export Production Repositories & Deploy',
              desc: 'Download full-stack production repositories or deploy this live masterclass directly to your own GitHub Pages in 1 click.',
            }
          ],
          proTips: [
            'Use the Module Navigation Footer at the bottom of any screen to advance sequentially through all 12 modules.',
            'Switch color themes anytime via the palette dropdown in the top-right header (Dark, Bark, Light, Ambient, Emerald, Rose).'
          ]
        }
      },
      {
        id: 'guide-genai-101',
        category: 'how-to-use',
        title: 'Module 1: GenAI 101 & Search vs Gemini Chat',
        summary: 'Foundational concepts, LLM pipeline anatomy, token dynamics, and Google Search vs Gemini comparisons.',
        relatedModule: 'genai-101',
        badge: 'Module 1',
        content: {
          overview:
            'This module demystifies Large Language Models from first principles. It includes an interactive architectural comparison between classical Information Retrieval (Google Search) and Generative Autoregressive Transformers (Gemini Chat), alongside the complete Gemini model lineup.',
          keyFeatures: [
            'Interactive comparison table contrasting Inverted Indexes vs Latent Semantic Embeddings',
            'Visual architectural pipelines showing crawling/indexing vs pre-training & grounding',
            'Interactive sample query tests demonstrating the exact differences in response mechanics',
            'Comprehensive Gemini Model Catalog (Gemini 2.5 Pro, 2.5 Flash, 2.5 Flash-Lite, 2.0 Flash Thinking, and Embedding models)'
          ],
          steps: [
            {
              step: 1,
              title: 'Navigate to GenAI 101',
              desc: 'Click "GenAI 101" in the top navigation bar or select Module 1.',
            },
            {
              step: 2,
              title: 'Interact with Search vs Gemini Chat',
              desc: 'Click on pre-built prompts (e.g., "Compare React vs Vue for high-scale enterprise" or "Debug memory leak in Node.js") to see side-by-side search results vs generative synthetic answers.',
            },
            {
              step: 3,
              title: 'Filter Models Catalog',
              desc: 'Browse capabilities, context limits (up to 2M tokens), benchmarks, and target use-cases for every production model.',
            }
          ]
        }
      },
      {
        id: 'guide-gemini-spark',
        category: 'how-to-use',
        title: 'Module 2: Gemini Spark Work & Workspace Agents',
        summary: 'Autonomous workspace assistance, Cloud Workers, standing directives, and background productivity agents.',
        relatedModule: 'gemini-spark',
        badge: 'Module 2',
        content: {
          overview:
            'Gemini Spark Work explores autonomous enterprise agents that operate across Google Workspace documents, sheets, emails, and calendar schedules with persistent standing directives.',
          keyFeatures: [
            'Autonomous Cloud Worker task lifecycle (Queued -> In-Progress -> Validated -> Delivered)',
            'Standing Directives engine for continuous policy enforcement and automated triaging',
            'Multi-modal document synthesis across Drive, Docs, and Gmail with privacy controls'
          ],
          steps: [
            {
              step: 1,
              title: 'Inspect Standing Directives',
              desc: 'Review operational rules that configure agent behavior without retraining models.',
            },
            {
              step: 2,
              title: 'Launch a Cloud Worker Simulator',
              desc: 'Observe how tasks are decomposed into sub-tasks and executed asynchronously.',
            }
          ]
        }
      },
      {
        id: 'guide-ai-studio',
        category: 'how-to-use',
        title: 'Module 3: Gemini AI Studio (Web & Native Android)',
        summary: 'Rapid prototyping, system instructions, structured output schemas, and native Android emulation.',
        relatedModule: 'gemini-ai-studio',
        badge: 'Module 3',
        content: {
          overview:
            'Google AI Studio is the premier developer console for prototyping with Gemini models. This module includes real-time emulation of web applets and native Android Jetpack Compose implementations.',
          keyFeatures: [
            'Interactive parameter tuning: Temperature, Top-K, Top-P, and Safety Thresholds',
            'Live preview simulator for Web applications and Native Android mobile experiences',
            'Production JSON Schema generation for reliable function calling'
          ],
          steps: [
            {
              step: 1,
              title: 'Toggle Web & Android Emulators',
              desc: 'Switch between responsive web application preview and mobile Android phone mockup.',
            },
            {
              step: 2,
              title: 'Inspect Prompt Templates',
              desc: 'Examine system instructions, zero-shot/few-shot exemplars, and structured response schemas.',
            }
          ]
        }
      },
      {
        id: 'guide-agentic-ai',
        category: 'how-to-use',
        title: 'Module 4: Agentic AI & Deep Research Workflows',
        summary: 'Autonomous ReAct patterns, Antigravity multi-agent systems, and Deep Research synthesis.',
        relatedModule: 'agentic-ai',
        badge: 'Module 4',
        content: {
          overview:
            'Move beyond single-turn chat into multi-step agentic systems that plan, verify, decompose complex goals, search authoritative sources, and execute verified actions.',
          keyFeatures: [
            'Antigravity multi-agent orchestration architecture',
            'Deep Research synthesis pipeline with source verification and fact-checking',
            'Human-in-the-Loop (HITL) approval gates for critical actions'
          ]
        }
      },
      {
        id: 'guide-book',
        category: 'how-to-use',
        title: 'Module 5: Autonomous Coding Agent (18 Chapters)',
        summary: 'The complete technical book on designing, building, and deploying production autonomous coding agents.',
        relatedModule: 'book',
        badge: 'Module 5',
        content: {
          overview:
            'An 18-chapter master treatise covering tokenizer mechanics, context-compression algorithms, dynamic prompt compaction, tree-of-thought exploration, sandbox security, AST manipulation, and self-healing test runners.',
          keyFeatures: [
            'Full chapter reading experience with interactive syntax-highlighted code',
            'Interactive comprehension quizzes at the end of each chapter',
            'Production architectural diagrams and implementation blueprints'
          ],
          steps: [
            {
              step: 1,
              title: 'Select Chapter from Index',
              desc: 'Navigate chapters ranging from Chapter 1 (Foundations) to Chapter 18 (Future Paradigms).',
            },
            {
              step: 2,
              title: 'Read Treatise & Code Explanations',
              desc: 'Study real-world TypeScript, Python, and AST manipulation patterns.',
            },
            {
              step: 3,
              title: 'Take Chapter Quiz',
              desc: 'Verify understanding with interactive multiple-choice checkpoints.',
            }
          ]
        }
      },
      {
        id: 'guide-simulator',
        category: 'how-to-use',
        title: 'Module 6: ReAct Agent Loop Simulator',
        summary: 'Step-by-step interactive debugger for agent thought processes, tool executions, and memory updates.',
        relatedModule: 'simulator',
        badge: 'Module 6',
        content: {
          overview:
            'The Agent Simulator exposes the internal clockwork of autonomous agents. Select from pre-loaded scenarios (e.g., "Refactor legacy authentication" or "Fix memory leak") and advance step-by-step.',
          keyFeatures: [
            'Step-by-step replay: inspect Thought, Action (Tool Call), Observation (Output), and Reflection',
            'Live tool call inspection with arguments and return payload visualization',
            'Working Memory & Context Window visualization bar'
          ],
          steps: [
            {
              step: 1,
              title: 'Choose a Scenario',
              desc: 'Select a coding task or enter your own custom user prompt.',
            },
            {
              step: 2,
              title: 'Step Through the ReAct Loop',
              desc: 'Use "Next Step" to advance through the agent decision cycle or "Run All" for automated execution.',
            },
            {
              step: 3,
              title: 'Inspect Tool Outputs',
              desc: 'Examine the simulated terminal, file system modifications, and AST linter feedback.',
            }
          ]
        }
      },
      {
        id: 'guide-repos',
        category: 'how-to-use',
        title: 'Module 7: Production Repositories & One-Click ZIPs',
        summary: 'Download complete, deployable starter repositories with full-stack TypeScript, Docker, and GitHub Actions.',
        relatedModule: 'repos',
        badge: 'Module 7',
        content: {
          overview:
            'Instantly download complete repositories tailored for specific production archetypes: Autonomous Coding CLI, VS Code Extension, Model Context Protocol (MCP) Server, and Enterprise Agent Microservice.',
          keyFeatures: [
            'In-browser ZIP file generator powered by JSZip: zero server dependency for downloads',
            'Complete file tree inspection before downloading',
            'Pre-configured with modern @google/genai SDK, ESLint, TypeScript, and Dockerfile'
          ],
          steps: [
            {
              step: 1,
              title: 'Select a Repository Archetype',
              desc: 'Choose between CLI Agent, VS Code Plugin, MCP Server, or Microservice.',
            },
            {
              step: 2,
              title: 'Browse File Tree',
              desc: 'Click on individual files (e.g., package.json, agent.ts, Dockerfile) to review the code.',
            },
            {
              step: 3,
              title: 'Download .zip Archive',
              desc: 'Click "Download Complete Project (.zip)" to save the entire repo ready for npm install.',
            }
          ]
        }
      },
      {
        id: 'guide-softeng',
        category: 'how-to-use',
        title: 'Module 8: AI Software Engineer Interview Prep Lab',
        summary: 'Interactive coding challenges, algorithmic sandboxes, and Google AI system design interviews.',
        relatedModule: 'ai-softeng',
        badge: 'Module 8',
        content: {
          overview:
            'A comprehensive interview preparation platform tailored for Google AI Software Engineer roles (L4/L5/L6), featuring LeetCode-style AI algorithms and interactive large-scale system design architectures.',
          keyFeatures: [
            'In-browser JavaScript/TypeScript execution sandbox with automated unit test assertions',
            'Algorithmic challenges: Vector search k-NN, Attention score computations, Sliding Context Windows, LRU Semantic Caches',
            'System Design deep-dives: 100K QPS LLM Gateway, Real-time RAG Streaming, Speculative Decoding pipelines',
            'Google Interviewer rubric criteria: Problem Deconstruction, Big-O Complexity, Scalability bottlenecks'
          ],
          steps: [
            {
              step: 1,
              title: 'Pick a Challenge',
              desc: 'Select an algorithm from the sidebar categorized by difficulty (Medium, Hard, Expert).',
            },
            {
              step: 2,
              title: 'Code Your Solution',
              desc: 'Edit the starter code in the built-in Monaco-style editor or view the reference solution.',
            },
            {
              step: 3,
              title: 'Run Test Cases',
              desc: 'Click "Run Tests" to execute against hidden and visible test assertions in real time.',
            }
          ]
        }
      },
      {
        id: 'guide-live',
        category: 'how-to-use',
        title: 'Module 11: Live Gemini Interactive Testbed',
        summary: 'Direct connection to Google Gemini models with parameter tuning, system instructions, and token metrics.',
        relatedModule: 'live',
        badge: 'Module 11',
        content: {
          overview:
            'Test real-time generation using live Google Gemini models (`gemini-3.8-flash` and `gemini-2.5-flash`). Tune parameters, provide system prompts, and inspect generation latency and token usage.',
          keyFeatures: [
            'Real-time streaming generation using modern @google/genai SDK',
            'Configurable system instructions and temperature/top-p sliders',
            'Response metrics: character count, estimated tokens, round-trip latency'
          ],
          steps: [
            {
              step: 1,
              title: 'Enter Prompt or Select Template',
              desc: 'Choose from pre-crafted prompt presets (e.g. Code Refactor, Function Calling, System Architect) or type freely.',
            },
            {
              step: 2,
              title: 'Adjust Parameters',
              desc: 'Modify Temperature (0.0 for deterministic code, 0.7+ for creative synthesis) and Top-P.',
            },
            {
              step: 3,
              title: 'Send & Stream Response',
              desc: 'Click "Execute Prompt" to receive the streamed generation directly from Gemini.',
            }
          ]
        }
      },
      {
        id: 'guide-deployment',
        category: 'deployment',
        title: 'Deploying to GitHub Pages (CI/CD)',
        summary: 'Automated 1-click deployment, GitHub Actions pipeline, and custom repository hosting.',
        badge: 'DevOps',
        content: {
          overview:
            'The project includes an enterprise-grade GitHub Actions CI/CD workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys your Vite single-page app to GitHub Pages upon every git push.',
          keyFeatures: [
            'Zero server hosting costs via GitHub Pages static hosting',
            'Automatic relative asset resolution (`base: \'./\'`) in vite.config.ts',
            'In-app "Deploy to GitHub Pages" modal with direct token push support',
            'Automated production build validation with Vite and TypeScript'
          ],
          steps: [
            {
              step: 1,
              title: 'Enable GitHub Actions in GitHub Settings',
              desc: 'Open your GitHub repository -> Settings -> Pages. Under "Build and deployment -> Source", choose "GitHub Actions".',
            },
            {
              step: 2,
              title: 'Trigger Deploy via In-App Modal or Git Push',
              desc: 'Click "Deploy to GitHub Pages" in the top header, paste a GitHub token (with `repo` scope), and submit. Or push from your terminal: `git push origin main`.',
              code: 'git push origin main'
            },
            {
              step: 3,
              title: 'View Live Site',
              desc: 'GitHub Actions builds the bundle in ~45 seconds and deploys to https://<username>.github.io/<repo-name>/!',
            }
          ],
          codeSnippets: [
            {
              title: '.github/workflows/deploy.yml (Workflow snippet)',
              lang: 'yaml',
              code: `name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/deploy-pages@v4`
            }
          ]
        }
      },
      {
        id: 'guide-architecture',
        category: 'architecture',
        title: 'Application Architecture & Tech Stack',
        summary: 'Complete technical breakdown of frontend components, backend proxy, and SDK patterns.',
        badge: 'Architecture',
        content: {
          overview:
            'Built with a high-performance modern web stack featuring React 18, TypeScript, Vite, Tailwind CSS, Lucide icons, JSZip, and the official Google GenAI SDK (@google/genai).',
          keyFeatures: [
            'Pure client-side execution capability: runs as a high-speed static SPA on GitHub Pages',
            'Optional full-stack Express server for server-side Gemini API proxying and git push operations',
            'Zero external UI component bloat: hand-crafted accessible components with dark/light theme engines',
            'Type-safe contracts across agent definitions, simulation scenarios, and interview challenges'
          ],
          codeSnippets: [
            {
              title: 'Official @google/genai SDK Integration Pattern',
              lang: 'typescript',
              code: `import { GoogleGenAI } from '@google/genai';

// Initialize with API key (defaults to process.env.GEMINI_API_KEY)
const ai = new GoogleGenAI({});

// Streaming text generation with Gemini 3.8-Flash
const response = await ai.models.generateContentStream({
  model: 'gemini-3.8-flash',
  contents: 'Design an autonomous agent memory architecture',
  config: {
    systemInstruction: 'You are a Principal AI Software Engineer.',
    temperature: 0.2,
    maxOutputTokens: 2048,
  }
});

for await (const chunk of response) {
  process.stdout.write(chunk.text || '');
}`
            }
          ]
        }
      },
      {
        id: 'faq-section',
        category: 'faq',
        title: 'Frequently Asked Questions & Troubleshooting',
        summary: 'Answers to common questions about API keys, tokens, deployment errors, and local development.',
        badge: 'Support',
        content: {
          overview: 'Find quick solutions to common issues when developing or deploying the application.',
          faqs: [
            {
              q: 'Do I need a paid Google Cloud account to use the Gemini API?',
              a: 'No! Google AI Studio provides a generous free tier for developers with free RPM (requests per minute) quotas on Gemini 2.5 Flash and Gemini 3.8 Flash models. You can generate a free API key at ai.google.dev in under a minute.'
            },
            {
              q: 'Why did "git push origin main" fail with "could not read Username"?',
              a: 'GitHub discontinued password authentication for Git HTTPS pushes in 2021. When running inside headless cloud environments, Git cannot open an interactive login popup. You can use the in-app "Deploy to GitHub Pages" button with a Personal Access Token (PAT) with `repo` scope, or run `git push origin main` from your local terminal where your computer remembers your GitHub credentials.'
            },
            {
              q: 'Does this app work when deployed to GitHub Pages without a backend server?',
              a: 'Yes! The entire UI, interactive book chapters, agent simulator, interview coding sandboxes, and repository ZIP exporter are 100% client-side. When deployed statically on GitHub Pages, the app functions flawlessly. For live Gemini API calls, you can configure your API key or proxy via Cloud Functions / Vercel.'
            },
            {
              q: 'How do I run this app locally on my computer?',
              a: 'Download the ZIP archive using "Export Project (.zip)" or clone the repository. Run `npm install`, set your `GEMINI_API_KEY` in `.env`, and run `npm run dev`. Your local app will open on `http://localhost:3000`.'
            },
            {
              q: 'How do I customize or add new chapters to the Autonomous Coding Agent Book?',
              a: 'Open `src/data/chaptersData.ts`. Each chapter is defined with structured JSON containing titles, subtitles, technical sections, quizzes, and code blocks. Add your new content there and it instantly appears in Module 5.'
            }
          ]
        }
      }
    ],
    []
  );

  const categories = [
    { id: 'all', label: 'All Documentation', icon: BookOpen },
    { id: 'getting-started', label: 'Getting Started', icon: Compass },
    { id: 'how-to-use', label: 'How-to Guides (Modules 1-12)', icon: Workflow },
    { id: 'architecture', label: 'Architecture & SDK', icon: Layers },
    { id: 'deployment', label: 'Deployment & CI/CD', icon: Rocket },
    { id: 'faq', label: 'FAQ & Troubleshooting', icon: HelpCircle },
  ];

  const filteredSections = useMemo(() => {
    return docSections.filter((section) => {
      const matchesCategory =
        activeCategory === 'all' || section.category === activeCategory;

      if (!searchQuery.trim()) return matchesCategory;

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        section.title.toLowerCase().includes(q) ||
        section.summary.toLowerCase().includes(q) ||
        section.content.overview.toLowerCase().includes(q) ||
        section.content.keyFeatures?.some((f) => f.toLowerCase().includes(q)) ||
        section.content.faqs?.some(
          (faq) => faq.q.toLowerCase().includes(q) || faq.a.toLowerCase().includes(q)
        );

      return matchesCategory && matchesSearch;
    });
  }, [docSections, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Hero Header Banner */}
      <div className="relative border-b border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 overflow-hidden">
        {/* Subtle Background Glows */}
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-32 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 relative">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium tracking-wide">
                <FileText className="w-3.5 h-3.5" />
                SYSTEM MANUAL & TECHNICAL GUIDES
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                Documentation &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">How-to-Use Guides</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Comprehensive step-by-step guides, module architectural walkthroughs, Google GenAI SDK patterns, and deployment manuals for the Gemini Code from Source platform.
              </p>
            </div>

            {/* Quick Actions Card */}
            <div className="flex flex-wrap sm:flex-nowrap gap-2.5 shrink-0">
              {onOpenDeployModal && (
                <button
                  onClick={onOpenDeployModal}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs transition shadow-lg shadow-cyan-500/20 cursor-pointer"
                >
                  <Rocket className="w-4 h-4" />
                  <span>Deploy to GitHub Pages</span>
                </button>
              )}
              <a
                href="https://github.com/manoyrocks/Gemini-Code-from-Source"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-medium text-xs transition"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Real-time Search Input */}
          <div className="mt-8 relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides, modules, CLI commands, SDK code, or FAQs..."
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition shadow-inner font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar Category Filter */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-3.5 space-y-1 backdrop-blur-sm sticky top-20">
              <div className="px-3 py-2 text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Documentation Categories
              </div>
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                const count =
                  cat.id === 'all'
                    ? docSections.length
                    : docSections.filter((s) => s.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                      isActive
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                      <span>{cat.label}</span>
                    </div>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full font-mono ${
                        isActive
                          ? 'bg-cyan-500/20 text-cyan-300'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}

              {/* Quick Module Jump Links */}
              <div className="pt-4 mt-4 border-t border-slate-800 px-3">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2.5">
                  Direct Module Launcher
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                  <button
                    onClick={() => onNavigate('genai-101')}
                    className="text-left px-2 py-1.5 rounded-lg bg-slate-950/60 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 transition truncate"
                  >
                    1. GenAI 101
                  </button>
                  <button
                    onClick={() => onNavigate('gemini-spark')}
                    className="text-left px-2 py-1.5 rounded-lg bg-slate-950/60 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 transition truncate"
                  >
                    2. Spark Work
                  </button>
                  <button
                    onClick={() => onNavigate('gemini-ai-studio')}
                    className="text-left px-2 py-1.5 rounded-lg bg-slate-950/60 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 transition truncate"
                  >
                    3. AI Studio
                  </button>
                  <button
                    onClick={() => onNavigate('agentic-ai')}
                    className="text-left px-2 py-1.5 rounded-lg bg-slate-950/60 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 transition truncate"
                  >
                    4. Agentic AI
                  </button>
                  <button
                    onClick={() => onNavigate('book')}
                    className="text-left px-2 py-1.5 rounded-lg bg-slate-950/60 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 transition truncate"
                  >
                    5. Agent Book
                  </button>
                  <button
                    onClick={() => onNavigate('simulator')}
                    className="text-left px-2 py-1.5 rounded-lg bg-slate-950/60 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 transition truncate"
                  >
                    6. Simulator
                  </button>
                  <button
                    onClick={() => onNavigate('repos')}
                    className="text-left px-2 py-1.5 rounded-lg bg-slate-950/60 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 transition truncate"
                  >
                    7. Repos
                  </button>
                  <button
                    onClick={() => onNavigate('ai-softeng')}
                    className="text-left px-2 py-1.5 rounded-lg bg-slate-950/60 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 transition truncate"
                  >
                    8. SoftEng Lab
                  </button>
                  <button
                    onClick={() => onNavigate('code')}
                    className="text-left px-2 py-1.5 rounded-lg bg-slate-950/60 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 transition truncate"
                  >
                    9. Source Code
                  </button>
                  <button
                    onClick={() => onNavigate('comparison')}
                    className="text-left px-2 py-1.5 rounded-lg bg-slate-950/60 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 transition truncate"
                  >
                    10. Comparison
                  </button>
                  <button
                    onClick={() => onNavigate('live')}
                    className="text-left px-2 py-1.5 rounded-lg bg-slate-950/60 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 transition truncate"
                  >
                    11. Live Testbed
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content Column */}
          <div className="lg:col-span-3 space-y-8">
            {filteredSections.length === 0 ? (
              <div className="p-12 text-center bg-slate-900/50 border border-slate-800 rounded-2xl space-y-3">
                <HelpCircle className="w-10 h-10 text-slate-500 mx-auto" />
                <h3 className="text-base font-semibold text-slate-200">No matching documentation found</h3>
                <p className="text-xs text-slate-400">
                  Try adjusting your search query or clear the filter to see all guides.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-medium transition"
                >
                  Reset Search & Filters
                </button>
              </div>
            ) : (
              filteredSections.map((section) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm hover:border-slate-700/80 transition"
                >
                  {/* Section Title & Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800/80 pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                          {section.title}
                        </h2>
                        {section.badge && (
                          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[11px] font-mono font-medium">
                            {section.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-400">{section.summary}</p>
                    </div>

                    {/* Launch Live Module Button */}
                    {section.relatedModule && (
                      <button
                        onClick={() => onNavigate(section.relatedModule!)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/40 text-xs font-semibold transition shrink-0 self-start sm:self-auto cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-cyan-300" />
                        <span>Open {section.badge}</span>
                      </button>
                    )}
                  </div>

                  {/* Overview Text */}
                  <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {section.content.overview}
                  </div>

                  {/* Key Features Bullet List */}
                  {section.content.keyFeatures && (
                    <div className="space-y-2.5 bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                        Key Capabilities & Learning Outcomes
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {section.content.keyFeatures.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step by Step Execution Instructions */}
                  {section.content.steps && (
                    <div className="space-y-3">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                        Step-by-Step Instructions
                      </div>
                      <div className="space-y-3">
                        {section.content.steps.map((step) => (
                          <div
                            key={step.step}
                            className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/60"
                          >
                            <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                              {step.step}
                            </div>
                            <div className="space-y-1 flex-1">
                              <h4 className="text-xs font-semibold text-slate-200">
                                {step.title}
                              </h4>
                              <p className="text-xs text-slate-400 leading-relaxed">
                                {step.desc}
                              </p>
                              {step.code && (
                                <div className="mt-2 flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-cyan-300">
                                  <span>{step.code}</span>
                                  <button
                                    onClick={() => copyToClipboard(step.code!, `${section.id}-step-${step.step}`)}
                                    className="text-slate-400 hover:text-white transition"
                                  >
                                    {copiedSnippet === `${section.id}-step-${step.step}` ? (
                                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    ) : (
                                      <Copy className="w-3.5 h-3.5" />
                                    )}
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Code Snippets */}
                  {section.content.codeSnippets && (
                    <div className="space-y-3">
                      {section.content.codeSnippets.map((snip, sIdx) => (
                        <div
                          key={sIdx}
                          className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden"
                        >
                          <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-slate-800 text-xs">
                            <span className="font-mono text-slate-300 font-medium">{snip.title}</span>
                            <button
                              onClick={() => copyToClipboard(snip.code, `${section.id}-snip-${sIdx}`)}
                              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition font-mono text-[11px]"
                            >
                              {copiedSnippet === `${section.id}-snip-${sIdx}` ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  <span className="text-emerald-400">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                          <pre className="p-4 text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                            {snip.code}
                          </pre>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Pro Tips */}
                  {section.content.proTips && (
                    <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200/90 space-y-1.5">
                      <div className="font-semibold flex items-center gap-1.5 text-amber-300">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Pro Tips & Best Practices</span>
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1">
                        {section.content.proTips.map((tip, tIdx) => (
                          <li key={tIdx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Accordion FAQs */}
                  {section.content.faqs && (
                    <div className="space-y-2.5">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                        Common Questions & Direct Answers
                      </div>
                      {section.content.faqs.map((faq, fIdx) => {
                        const isOpen = expandedFaq === `${section.id}-${fIdx}`;
                        return (
                          <div
                            key={fIdx}
                            className="rounded-xl bg-slate-950/60 border border-slate-800/80 overflow-hidden"
                          >
                            <button
                              onClick={() => setExpandedFaq(isOpen ? null : `${section.id}-${fIdx}`)}
                              className="w-full flex items-center justify-between p-4 text-left text-xs font-semibold text-slate-200 hover:text-white transition cursor-pointer"
                            >
                              <span className="flex items-center gap-2">
                                <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                                {faq.q}
                              </span>
                              <ChevronRight
                                className={`w-4 h-4 text-slate-400 transition-transform ${
                                  isOpen ? 'rotate-90 text-cyan-400' : ''
                                }`}
                              />
                            </button>
                            {isOpen && (
                              <div className="px-4 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/50">
                                {faq.a}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
