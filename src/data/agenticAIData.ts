/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AgentStepTrace {
  stepNumber: number;
  phase: 'thought' | 'tool_call' | 'tool_result' | 'evaluation' | 'final_answer';
  title: string;
  thought?: string;
  toolName?: string;
  toolArgs?: Record<string, any>;
  toolOutput?: string | Record<string, any>;
  durationMs?: number;
  status: 'success' | 'running' | 'warning' | 'error';
}

export interface AgentSample {
  id: string;
  name: string;
  category: 'Autonomous Engineering' | 'Deep Research' | 'DevOps & SRE' | 'Multi-Agent Swarm' | 'Grounded Analysis';
  tagline: string;
  geminiModel: string;
  agentType: 'Managed Agent (Interactions API)' | 'Custom ReAct Agent' | 'Hierarchical Supervisor' | 'Multi-Agent Swarm';
  description: string;
  sourceDocUrl: string;
  tools: {
    name: string;
    description: string;
    type: 'built-in' | 'custom_function' | 'sandbox_command' | 'mcp_server';
  }[];
  systemInstructions: string;
  executionTraces: AgentStepTrace[];
  codeSnippets: {
    filename: string;
    language: string;
    description: string;
    code: string;
  }[];
  keyHighlights: string[];
}

export interface CoreCapabilityTopic {
  id: string;
  title: string;
  badge: string;
  summary: string;
  googleDocRef: string;
  architecturePoints: string[];
  codeSnippet: string;
}

export interface AgenticAIDataContent {
  header: {
    title: string;
    tagline: string;
    officialUrl: string;
    description: string;
    metrics: { label: string; value: string }[];
  };
  coreCapabilities: CoreCapabilityTopic[];
  sampleAgents: AgentSample[];
  frameworkComparisons: {
    name: string;
    developer: string;
    primaryModel: string;
    deployment: string;
    strengths: string;
    bestFor: string;
    codeComplexity: string;
  }[];
  quickstartSteps: {
    step: string;
    title: string;
    command: string;
    description: string;
  }[];
}

export const AGENTIC_AI_CONTENT: AgenticAIDataContent = {
  header: {
    title: "Agentic AI with Gemini",
    tagline: "Autonomous Reasoning, Managed Antigravity Agents, Deep Research & Multi-Agent Topologies",
    officialUrl: "https://ai.google.dev/gemini-api/docs/agents",
    description: "Agentic AI transforms Gemini from a conversational model into an autonomous decision-maker that formulates multi-step plans, interacts with secure sandboxed environments, executes code, browses the live web, and self-corrects until high-level goals are solved. Powered by the Google GenAI Interactions API, Antigravity, and modular Skills.",
    metrics: [
      { label: "Managed Runtime", value: "Google Sandboxed Linux VM" },
      { label: "Core Agent Engine", value: "Antigravity & Deep Research" },
      { label: "API Interface", value: "Interactions API (@google/genai)" },
      { label: "Tool Protocol", value: "MCP + Native Function Calling" }
    ]
  },

  coreCapabilities: [
    {
      id: "managed-agents",
      title: "Managed Agents & Interactions API",
      badge: "Google Native",
      summary: "Google-hosted Linux sandboxes running autonomous Gemini agents through a unified API call without manual container orchestration.",
      googleDocRef: "https://ai.google.dev/gemini-api/docs/agents",
      architecturePoints: [
        "One-call provisioning: client.interactions.create() launches an agent in a persistent, secure Linux sandbox.",
        "Server-side execution state: Execution history, files, and background commands persist automatically across turns.",
        "Built-in environment tools: Native file editing, command line execution, web search, and subagent orchestration.",
        "Observability: Real-time step streaming, event inspection, and fine-grained token & cost auditing."
      ],
      codeSnippet: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

// Managed Agent via Interactions API
const interaction = await ai.interactions.create({
  agent: 'antigravity', // Google general-purpose agent
  model: 'gemini-3.8-flash',
  input: 'Clone https://github.com/example/api.git, fix memory leak in worker pool, and verify with tests.',
  config: {
    sandbox: {
      enableInternet: true,
      persistentStorage: true,
    },
    skills: ['git-workflow', 'node-profiling']
  }
});

console.log('Interaction launched:', interaction.id);`
    },
    {
      id: "antigravity",
      title: "The Antigravity Agent",
      badge: "General-Purpose",
      summary: "Gemini's flagship coding & autonomous problem solver equipped with shell access, file editing, and web search in an isolated sandbox.",
      googleDocRef: "https://ai.google.dev/gemini-api/docs/agents/antigravity",
      architecturePoints: [
        "ReAct decision engine: Continuously reasons (Thought), selects an action (Tool Call), observes output (Observation), and iterates.",
        "Safe Sandbox Execution: Runs bash commands, builds repositories, and runs test suites inside a secure isolated kernel.",
        "Smart Read-Before-Write: Inspects codebases, gathers context, and applies pristine surgical edits rather than overwriting whole files.",
        "Human-in-the-Loop gates: Configurable boundaries requiring user confirmation for critical changes or deployments."
      ],
      codeSnippet: `// Antigravity Agent System Prompt Pattern
// Defined in AGENTS.md / SKILL.md
const ANTIGRAVITY_PROMPT = \`
You are an autonomous senior software engineer running inside a sandboxed Linux environment.
Your capabilities:
1. Shell: Run bash commands (run_command, manage_task)
2. Filesystem: View, edit, create, and delete files (view_file, edit_file)
3. Web Research: Search web documentation (search_web)

Operating Principles:
- Think before acting: Formulate explicit hypothesis.
- Verify everything: Run linter, compiler, and tests before claiming completion.
- Never guess file contents: Always inspect first.
\`;`
    },
    {
      id: "deep-research",
      title: "Gemini Deep Research Agent",
      badge: "Information Synthesis",
      summary: "Autonomous recursive multi-step web investigation agent that formulates search plans, reads papers, cross-checks sources, and writes reports.",
      googleDocRef: "https://ai.google.dev/gemini-api/docs/agents/deep-research",
      architecturePoints: [
        "Recursive Question Decomposition: Breaks complex research topics into sub-hypotheses and parallel search vectors.",
        "Source Credibility Triangulation: Evaluates multiple citations, detects conflicting claims, and calculates confidence scores.",
        "Iterative Deep Web Crawling: Explores citations, PDFs, and documentation pages beyond surface search results.",
        "Structured Synthesis: Outputs executive summaries, comparative tables, and comprehensive reference bibliographies."
      ],
      codeSnippet: `// Deep Research Agent invocation
const researchTask = await ai.interactions.create({
  agent: 'deep-research',
  model: 'gemini-3.1-pro-preview',
  input: 'Conduct a comprehensive competitive analysis of 2026 AI Agent frameworks: Google ADK, LangGraph, AutoGen, and CrewAI.',
  config: {
    depth: 'comprehensive', // 'quick' | 'standard' | 'comprehensive'
    outputFormat: 'markdown_report_with_citations',
    maxSearchSteps: 25
  }
});`
    },
    {
      id: "agent-specs",
      title: "Agent Architecture: AGENTS.md & SKILL.md",
      badge: "Specification Standard",
      summary: "The open standard for organizing agent instructions, progressive disclosure, system skills, and tool declarations in version-controlled repos.",
      googleDocRef: "https://ai.google.dev/gemini-api/docs/agents/skills",
      architecturePoints: [
        "AGENTS.md: Root architectural blueprint defining role, runtime environment, capabilities, safety boundaries, and lifecycle.",
        "SKILL.md: Domain-specific skills with YAML frontmatter, execution instructions, reference templates, and scripts.",
        "Progressive Disclosure: Agents load skill instructions only when relevant, preserving token budget and avoiding context bloat.",
        "Strict Schema Validation: Tool interfaces strictly typed with JSON Schema and @google/genai Type enums."
      ],
      codeSnippet: `---
name: "postgres-migration-expert"
description: "Safely designs, verifies, and executes Zero-Downtime PostgreSQL database migrations using Drizzle or Prisma."
---

# Instructions
When tasked with database schema modifications:
1. Always generate a rollback script BEFORE writing the forward migration.
2. Check for locking hazards (e.g., ADD COLUMN with non-null defaults on large tables).
3. Verify backward compatibility with the active application version.`
    },
    {
      id: "orchestration-patterns",
      title: "Multi-Agent Orchestration Topologies",
      badge: "Design Patterns",
      summary: "Proven coordination patterns for production agent swarms: Router, Supervisor-Worker, and Evaluator-Optimizer (Reflexion).",
      googleDocRef: "https://ai.google.dev/gemini-api/docs/agents/patterns",
      architecturePoints: [
        "Router Pattern: Lightweight classifier dispatching tasks to specialized domain agents (Support, Billing, DevOps).",
        "Supervisor-Worker: Central planner decomposing complex objectives into dependency DAGs executed by workers.",
        "Evaluator-Optimizer (Reflexion): Generator agent drafts output; Critic agent evaluates against rubric in an iterative improvement loop.",
        "Model Context Protocol (MCP): Standardized protocol for agents to access enterprise databases, tools, and SaaS APIs safely."
      ],
      codeSnippet: `// Supervisor Multi-Agent Pattern
class AgentSupervisor {
  async runTask(userGoal: string) {
    // 1. Supervisor plans subtasks
    const plan = await this.plannerAgent.generatePlan(userGoal);
    
    // 2. Distribute to specialized worker agents
    const workerResults = await Promise.all(
      plan.subtasks.map(task => this.routeToWorker(task))
    );
    
    // 3. Evaluator reviews results
    const review = await this.evaluatorAgent.critique(workerResults);
    return review.isApproved ? review.finalPayload : this.retryRefinement(review);
  }
}`
    }
  ],

  sampleAgents: [
    {
      id: "antigravity-fullstack",
      name: "Antigravity Autonomous Full-Stack Engineer",
      category: "Autonomous Engineering",
      tagline: "End-to-end bug fixing, test suite verification, and git pull request creation inside an isolated cloud container.",
      geminiModel: "gemini-3.8-flash",
      agentType: "Managed Agent (Interactions API)",
      description: "A production-grade implementation of Google's Antigravity Agent pattern. Given an issue description, this agent inspects the codebase, isolates the reproduction case, writes a failing unit test, implements the fix, verifies passing tests, and commits clean code.",
      sourceDocUrl: "https://ai.google.dev/gemini-api/docs/agents",
      keyHighlights: [
        "Uses official Interactions API with Linux VM sandbox",
        "Smart Read-Before-Write protocol to prevent hallucinated overwrites",
        "Self-contained test verification loop with automated rollback on failure",
        "Emits clean conventional commit history"
      ],
      tools: [
        { name: "view_file", description: "Reads targeted ranges of codebase files", type: "sandbox_command" },
        { name: "edit_file", description: "Performs surgical, precise substring replacements in code", type: "sandbox_command" },
        { name: "run_command", description: "Executes shell commands (npm test, git diff, tsc)", type: "sandbox_command" },
        { name: "search_web", description: "Queries live Google search for up-to-date SDK documentation", type: "built-in" }
      ],
      systemInstructions: `You are an autonomous senior full-stack software engineer operating inside a sandboxed Linux workspace.
Your mission is to resolve the user issue cleanly, verify with automated tests, and leave the repository in a pristine state.
Follow the ReAct loop:
1. THOUGHT: Plan the next logical step.
2. ACTION: Call the appropriate sandbox tool.
3. OBSERVATION: Analyze tool output before making conclusions.
Never state a task is complete until automated tests pass with 0 exit code.`,
      executionTraces: [
        {
          stepNumber: 1,
          phase: "thought",
          title: "Analyzing Bug Report & Repository Structure",
          thought: "User reports: 'POST /api/checkout crashes with 500 error when cart contains discounted digital bundles'. Let's inspect package.json and the checkout router.",
          status: "success"
        },
        {
          stepNumber: 2,
          phase: "tool_call",
          title: "Inspect Checkout Route Handler",
          toolName: "view_file",
          toolArgs: { AbsolutePath: "/workspace/src/routes/checkout.ts", StartLine: 45, EndLine: 95 },
          status: "success"
        },
        {
          stepNumber: 3,
          phase: "tool_result",
          title: "Inspection Result Received",
          toolOutput: "Found: calculateCartTotal(cart.items) accesses item.taxRate without null check when item.isDigital is true.",
          durationMs: 120,
          status: "success"
        },
        {
          stepNumber: 4,
          phase: "thought",
          title: "Formulating Reproducing Test Case",
          thought: "Let's first write a reproducing unit test in test/checkout.test.ts to verify the null pointer exception under Jest.",
          status: "success"
        },
        {
          stepNumber: 5,
          phase: "tool_call",
          title: "Run Unit Test Suite",
          toolName: "run_command",
          toolArgs: { CommandLine: "npm test test/checkout.test.ts", Cwd: "/workspace" },
          status: "warning"
        },
        {
          stepNumber: 6,
          phase: "tool_result",
          title: "Test Execution: Failed as Expected (Red Phase)",
          toolOutput: "FAIL test/checkout.test.ts\nTypeError: Cannot read properties of undefined (reading 'rate') at calculateTax",
          durationMs: 840,
          status: "warning"
        },
        {
          stepNumber: 7,
          phase: "tool_call",
          title: "Apply Surgical Patch to checkout.ts",
          toolName: "edit_file",
          toolArgs: {
            TargetFile: "/workspace/src/routes/checkout.ts",
            Instruction: "Add safe fallback for digital item tax calculation",
            TargetContent: "const tax = item.taxRate.rate * item.price;",
            ReplacementContent: "const tax = (item.taxRate?.rate ?? 0) * item.price;"
          },
          status: "success"
        },
        {
          stepNumber: 8,
          phase: "tool_call",
          title: "Verify Test Suite Pass (Green Phase)",
          toolName: "run_command",
          toolArgs: { CommandLine: "npm test && npm run lint", Cwd: "/workspace" },
          status: "success"
        },
        {
          stepNumber: 9,
          phase: "tool_result",
          title: "All 18 Tests Passed (100% Green)",
          toolOutput: "PASS test/checkout.test.ts (18 passed, 0 failed, 100% coverage)",
          durationMs: 910,
          status: "success"
        },
        {
          stepNumber: 10,
          phase: "final_answer",
          title: "Bug Resolved & Commit Ready",
          thought: "The fix has been validated with Jest. Git diff verified clean. Creating commit 'fix(checkout): safely handle optional taxRate on digital bundles'.",
          status: "success"
        }
      ],
      codeSnippets: [
        {
          filename: "antigravity_agent.ts",
          language: "typescript",
          description: "Production agent initialization using @google/genai Interactions API",
          code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

export async function runAntigravityCodingAgent(issueBrief: string) {
  // 1. Initialize managed Antigravity agent in cloud sandbox
  const interaction = await ai.interactions.create({
    agent: 'antigravity',
    model: 'gemini-3.8-flash',
    input: issueBrief,
    config: {
      sandbox: {
        containerImage: 'node:20-bookworm',
        timeoutSeconds: 600,
        enableInternet: true
      },
      skills: ['react-guidelines', 'typescript-strict', 'jest-testing']
    }
  });

  // 2. Stream steps and listen for real-time trace events
  const stream = await ai.interactions.getStream(interaction.id);
  for await (const event of stream) {
    if (event.type === 'step') {
      console.log(\`[\${event.step.phase.toUpperCase()}] \${event.step.title}\`);
      if (event.step.toolCall) {
        console.log(\`-> Invoking tool: \${event.step.toolCall.name}\`);
      }
    }
  }

  const finalResult = await ai.interactions.get(interaction.id);
  return finalResult.output;
}`
        }
      ]
    },
    {
      id: "deep-research-analyst",
      name: "Gemini Deep Research Agent: Market Synthesizer",
      category: "Deep Research",
      tagline: "Multi-hop web research, PDF source extraction, and cited executive intelligence synthesis.",
      geminiModel: "gemini-3.1-pro-preview",
      agentType: "Managed Agent (Interactions API)",
      description: "Automates deep market and technical research by formulating multi-angle search queries, crawling primary documentation, triangulating conflicting claims across industry sources, and generating publication-ready synthesis reports with source footnotes.",
      sourceDocUrl: "https://ai.google.dev/gemini-api/docs/agents/deep-research",
      keyHighlights: [
        "Recursive query planning across 20+ search turns",
        "Automatic citation grounding with real web URLs and timestamps",
        "Detects and reconciles conflicting benchmarks and statistics",
        "Outputs structured Executive Briefing + Detailed Evidence Matrix"
      ],
      tools: [
        { name: "googleSearch", description: "Live web indexing and real-time grounding", type: "built-in" },
        { name: "browse_page", description: "Extracts full text, tables, and PDF contents from URLs", type: "sandbox_command" },
        { name: "cross_verify_claims", description: "Cross-checks numeric claims across at least 3 independent sources", type: "custom_function" }
      ],
      systemInstructions: `You are an elite technology research analyst. When given a research directive:
1. Deconstruct the topic into at least 4 independent sub-questions.
2. Search primary documentation, benchmark whitepapers, and official release notes.
3. Every factual claim must cite a valid primary source.
4. Highlight discrepancies between claims and verified measurements.`,
      executionTraces: [
        {
          stepNumber: 1,
          phase: "thought",
          title: "Decomposing Research Prompt",
          thought: "Topic: 'Edge AI inference hardware landscape 2026: Google Tensor G5, Apple M4 Neural Engine, and Qualcomm Snapdragon X Elite'. Breaking into 4 sub-vectors: TOPS/watt benchmarks, memory bandwidth constraints, on-device Gemini Nano quantization, and pricing.",
          status: "success"
        },
        {
          stepNumber: 2,
          phase: "tool_call",
          title: "Query 1: Official Semiconductor Specs",
          toolName: "googleSearch",
          toolArgs: { query: "Tensor G5 TPU TOPS INT4 INT8 memory bandwidth architecture spec 2026" },
          status: "success"
        },
        {
          stepNumber: 3,
          phase: "tool_result",
          title: "Search Results Ingested (7 sources)",
          toolOutput: "Found Google Research paper on Tensor G5 TPU: 45 TOPS INT4 peak, 34 GB/s LPDDR5X bandwidth, customized for Gemini Nano-2.",
          durationMs: 340,
          status: "success"
        },
        {
          stepNumber: 4,
          phase: "tool_call",
          title: "Query 2: M4 Neural Engine Benchmarks",
          toolName: "googleSearch",
          toolArgs: { query: "Apple M4 Neural Engine 38 TOPS FP16 llama.cpp tokens per second benchmark" },
          status: "success"
        },
        {
          stepNumber: 5,
          phase: "tool_call",
          title: "Cross-Verify Memory Bandwidth Impact",
          toolName: "cross_verify_claims",
          toolArgs: { metric: "tokens_per_second_7b_q4", devices: ["Tensor G5", "M4", "X Elite"] },
          status: "success"
        },
        {
          stepNumber: 6,
          phase: "final_answer",
          title: "Synthesizing Final Comparative Research Brief",
          thought: "Compiled 14-page structured report with 28 citations, executive summary, comparative TOPS/watt chart, and software runtime matrix.",
          status: "success"
        }
      ],
      codeSnippets: [
        {
          filename: "deep_research_runner.ts",
          language: "typescript",
          description: "Deep research execution using Gemini 3.1 Pro with Search Grounding",
          code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

export async function runDeepResearch(topic: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-pro-preview',
    contents: topic,
    config: {
      tools: [{ googleSearch: {} }],
      systemInstruction: \`You are an investigative research agent. 
Perform iterative web research, cite all claims with grounding metadata, 
and produce a rigorous executive report with tables and evidence trails.\`,
      thinkingConfig: {
        thinkingBudget: 2048 // Extended reasoning for deep synthesis
      }
    }
  });

  // Extract grounding metadata & web search sources
  const searchChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
  return {
    reportText: response.text,
    sources: searchChunks
  };
}`
        }
      ]
    },
    {
      id: "devops-sre-agent",
      name: "DevOps & SRE Autonomous Incident Responder",
      category: "DevOps & SRE",
      tagline: "Log anomaly detection, root cause diagnosis, container health checks, and Human-in-the-Loop rollback.",
      geminiModel: "gemini-3.8-flash",
      agentType: "Custom ReAct Agent",
      description: "Monitors production alerts via Prometheus / Cloud Monitoring webhooks. Diagnoses CPU spikes, deadlocks, and cascading HTTP 502 failures, generates an actionable mitigation plan, and awaits human confirmation before triggering blue/green rollbacks.",
      sourceDocUrl: "https://ai.google.dev/gemini-api/docs/agents",
      keyHighlights: [
        "ReAct loop with dynamic Kubernetes & GCP Cloud Logging tools",
        "Human-in-the-Loop approval gate for destructive production operations",
        "Automatic post-mortem incident report generation",
        "Calculates MTTR and prevents cascading cluster degradation"
      ],
      tools: [
        { name: "query_logs", description: "Queries Elasticsearch/Cloud Logging for error stack traces", type: "custom_function" },
        { name: "get_pod_metrics", description: "Fetches CPU/Memory utilization from Kubernetes API", type: "custom_function" },
        { name: "request_human_approval", description: "Halts execution and prompts operator on Slack/Discord", type: "custom_function" },
        { name: "rollback_deployment", description: "Executes revision rollback on Cloud Run or Kubernetes", type: "sandbox_command" }
      ],
      systemInstructions: `You are a 24/7 autonomous Site Reliability Engineer (SRE).
Your goal is to safeguard production stability.
Never execute a deployment rollback or pod termination without calling 'request_human_approval'.
Always trace root cause before applying temporary workarounds.`,
      executionTraces: [
        {
          stepNumber: 1,
          phase: "thought",
          title: "Incident Trigger: HTTP 502 Rate > 12%",
          thought: "Alert fired: 'Service payments-svc HTTP 502 spike'. I need to query recent logs for payments-svc and check pod memory.",
          status: "warning"
        },
        {
          stepNumber: 2,
          phase: "tool_call",
          title: "Querying Cloud Logging Stack Traces",
          toolName: "query_logs",
          toolArgs: { service: "payments-svc", severity: "ERROR", timeWindowMin: 15 },
          status: "success"
        },
        {
          stepNumber: 3,
          phase: "tool_result",
          title: "Found DB Connection Pool Exhaustion",
          toolOutput: "Error: ConnectionPoolTimeoutException: Timeout waiting for idle database connection (max: 20 connections) after v2.4.1 release.",
          durationMs: 250,
          status: "warning"
        },
        {
          stepNumber: 4,
          phase: "thought",
          title: "Correlating with Recent Deployments",
          thought: "Release v2.4.1 deployed 18 minutes ago omitted connection pooling close() in Stripe webhook handler. Rollback to v2.4.0 is recommended.",
          status: "success"
        },
        {
          stepNumber: 5,
          phase: "tool_call",
          title: "Request Human Operator Approval",
          toolName: "request_human_approval",
          toolArgs: {
            action: "Rollback payments-svc from v2.4.1 to v2.4.0",
            reason: "Leaked DB connections in v2.4.1 causing HTTP 502 cascade",
            riskLevel: "LOW"
          },
          status: "warning"
        },
        {
          stepNumber: 6,
          phase: "tool_result",
          title: "Operator Approved via Slack (User: @alex)",
          toolOutput: "Status: APPROVED. Proceed with automated rollback.",
          durationMs: 4200,
          status: "success"
        },
        {
          stepNumber: 7,
          phase: "tool_call",
          title: "Execute Cloud Run Revision Rollback",
          toolName: "rollback_deployment",
          toolArgs: { service: "payments-svc", targetRevision: "payments-svc-00042-xpk" },
          status: "success"
        },
        {
          stepNumber: 8,
          phase: "final_answer",
          title: "Incident Mitigated & Post-Mortem Generated",
          thought: "Traffic successfully shifted to v2.4.0. Error rate normalized to 0.02%. Post-mortem markdown filed in incident tickets.",
          status: "success"
        }
      ],
      codeSnippets: [
        {
          filename: "sre_react_agent.ts",
          language: "typescript",
          description: "ReAct loop with Human-in-the-Loop approval gate",
          code: `import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({});

// Tool definitions
const sreTools = [
  {
    functionDeclarations: [
      {
        name: 'query_logs',
        description: 'Queries recent application logs',
        parameters: {
          type: Type.OBJECT,
          properties: {
            service: { type: Type.STRING },
            severity: { type: Type.STRING }
          },
          required: ['service']
        }
      },
      {
        name: 'request_human_approval',
        description: 'Halts execution and prompts engineer for approval on high-impact actions',
        parameters: {
          type: Type.OBJECT,
          properties: {
            action: { type: Type.STRING },
            reason: { type: Type.STRING }
          },
          required: ['action', 'reason']
        }
      },
      {
        name: 'rollback_deployment',
        description: 'Reverts service to prior stable revision',
        parameters: {
          type: Type.OBJECT,
          properties: {
            service: { type: Type.STRING },
            targetRevision: { type: Type.STRING }
          },
          required: ['service', 'targetRevision']
        }
      }
    ]
  }
];

export async function runSREAgent(alertPayload: any) {
  const chat = ai.chats.create({
    model: 'gemini-3.8-flash',
    config: {
      tools: sreTools,
      systemInstruction: 'You are an SRE agent. Protect service uptime. Never perform destructive rollbacks without request_human_approval.'
    }
  });

  let response = await chat.sendMessage({
    message: \`Production incident alert: \${JSON.stringify(alertPayload)}\`
  });

  // ReAct tool execution loop
  while (response.functionCalls && response.functionCalls.length > 0) {
    const call = response.functionCalls[0];
    console.log(\`Tool requested: \${call.name}\`, call.args);
    
    // Execute tool handler (including human approval webhook)
    const result = await executeTool(call.name, call.args);

    response = await chat.sendMessage({
      message: [{
        functionResponse: {
          name: call.name,
          response: { output: result }
        }
      }]
    });
  }

  return response.text;
}`
        }
      ]
    },
    {
      id: "supply-chain-swarm",
      name: "Enterprise Multi-Agent Supply Chain Swarm",
      category: "Multi-Agent Swarm",
      tagline: "Router & specialized subagents collaborating over MCP to solve fulfillment bottlenecks in real time.",
      geminiModel: "gemini-3.8-flash",
      agentType: "Hierarchical Supervisor",
      description: "Simulates a collaborative enterprise multi-agent system. A Supervisor Router receives inventory shortage notifications and coordinates three specialized agents (Inventory Agent, Logistics Route Optimizer, and Supplier Negotiator) connected via Model Context Protocol (MCP).",
      sourceDocUrl: "https://ai.google.dev/gemini-api/docs/agents/patterns",
      keyHighlights: [
        "Hierarchical Supervisor-Worker architecture",
        "Model Context Protocol (MCP) tool integration with ERP & warehouse databases",
        "Autonomous multi-agent consensus without deadlocks",
        "Balances carbon footprint against delivery rush premiums"
      ],
      tools: [
        { name: "query_sap_inventory", description: "Queries SAP ERP for current warehouse stock levels", type: "mcp_server" },
        { name: "optimize_route", description: "Calculates freight transit times & fuel costs across carrier APIs", type: "custom_function" },
        { name: "draft_po_contract", description: "Generates automated supplier purchase orders with agreed discounts", type: "custom_function" }
      ],
      systemInstructions: `You are the Lead Supply Chain Supervisor Agent.
Deconstruct inventory disruptions into parallel workstreams for:
- @inventory_specialist
- @logistics_planner
- @procurement_agent
Synthesize their proposals and deliver an optimal, cost-efficient resolution.`,
      executionTraces: [
        {
          stepNumber: 1,
          phase: "thought",
          title: "Disruption Detected: Chicago Hub Stockout",
          thought: "Critical alert: Lithium-ion battery pack SKU-8842 depleted at Chicago distribution hub. 4,200 retail orders at risk of delay. Activating subagent swarm.",
          status: "warning"
        },
        {
          stepNumber: 2,
          phase: "tool_call",
          title: "Supervisor -> Dispatch to Inventory Subagent",
          toolName: "query_sap_inventory",
          toolArgs: { sku: "SKU-8842", regionalHubs: ["Detroit", "Atlanta", "Dallas"] },
          status: "success"
        },
        {
          stepNumber: 3,
          phase: "tool_result",
          title: "Surplus Located in Detroit Hub (+6,100 units)",
          toolOutput: "Detroit facility has 6,100 units unallocated. Transit distance to Chicago: 280 miles.",
          durationMs: 180,
          status: "success"
        },
        {
          stepNumber: 4,
          phase: "tool_call",
          title: "Supervisor -> Dispatch to Logistics Route Optimizer",
          toolName: "optimize_route",
          toolArgs: { origin: "Detroit, MI", destination: "Chicago, IL", weightTons: 12.5, priority: "SAME_DAY" },
          status: "success"
        },
        {
          stepNumber: 5,
          phase: "tool_result",
          title: "Route Optimized: Electric Freight Carrier",
          toolOutput: "Selected Carrier: CleanFreight Logistics. Departure: 11:30 AM, ETA: 4:45 PM. Cost: $1,420 (saving $860 vs air charter).",
          durationMs: 310,
          status: "success"
        },
        {
          stepNumber: 6,
          phase: "tool_call",
          title: "Supervisor -> Dispatch to Procurement Subagent",
          toolName: "draft_po_contract",
          toolArgs: { carrier: "CleanFreight Logistics", transferUnits: 4200, cost: 1420 },
          status: "success"
        },
        {
          stepNumber: 7,
          phase: "final_answer",
          title: "Swarm Consensus Achieved: Zero Stockouts",
          thought: "Cross-dock transfer executed. Chicago backorders fulfilled with zero delayed shipments and 32% cost savings.",
          status: "success"
        }
      ],
      codeSnippets: [
        {
          filename: "multi_agent_supervisor.ts",
          language: "typescript",
          description: "Supervisor Agent coordinating specialized subagents",
          code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

export class SupplyChainSupervisor {
  async handleDisruption(disruptionNotice: string) {
    // 1. Supervisor analyzes disruption and plans worker delegation
    const plan = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: \`Analyze disruption and assign subtasks to [InventoryAgent, LogisticsAgent, ProcurementAgent]: \${disruptionNotice}\`,
      config: { responseMimeType: 'application/json' }
    });

    const parsedPlan = JSON.parse(plan.text || '{}');
    
    // 2. Execute parallel subagent investigations
    const inventoryResult = await this.invokeInventoryAgent(parsedPlan.inventoryTask);
    const logisticsResult = await this.invokeLogisticsAgent(parsedPlan.logisticsTask, inventoryResult);
    
    // 3. Synthesize final consensus resolution
    const finalResolution = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: \`Synthesize subagent reports into approved action plan: \${JSON.stringify({ inventoryResult, logisticsResult })}\`
    });

    return finalResolution.text;
  }
}`
        }
      ]
    },
    {
      id: "financial-code-execution",
      name: "Grounded Financial Analyst with Code Execution",
      category: "Grounded Analysis",
      tagline: "Live financial metric retrieval paired with Python code execution for verifiable CAGR and valuation models.",
      geminiModel: "gemini-3.8-flash",
      agentType: "Custom ReAct Agent",
      description: "Combines real-time web grounding with Gemini's sandboxed Code Execution tool. Extracts historical financial statements, writes and runs Python scripts to calculate DCF (Discounted Cash Flow), sensitivity tables, and Monte Carlo risk simulations without hallucination.",
      sourceDocUrl: "https://ai.google.dev/gemini-api/docs/code-execution",
      keyHighlights: [
        "Native Python Code Execution sandbox inside Gemini",
        "Mathematical precision without arithmetic LLM hallucinations",
        "Simulates Monte Carlo portfolio distribution across 10,000 runs",
        "Auto-generates verified statistical tables"
      ],
      tools: [
        { name: "codeExecution", description: "Executes Python code in Gemini's sandboxed environment", type: "built-in" },
        { name: "googleSearch", description: "Retrieves SEC 10-K filings and analyst earnings call transcripts", type: "built-in" }
      ],
      systemInstructions: `You are a quantitative financial analyst agent.
Never do complex arithmetic in natural language.
Always write and run sandboxed Python code to compute margins, CAGR, variance, and DCF valuations.
Inspect execution stdout before writing financial conclusions.`,
      executionTraces: [
        {
          stepNumber: 1,
          phase: "thought",
          title: "Goal: 5-Year DCF & Sensitivity Modeling",
          thought: "Analyze Alphabet (GOOGL) 5-year FCF CAGR and run a sensitivity table testing WACC between 8.5% and 10.5% with terminal growth of 2.5% to 3.5%.",
          status: "success"
        },
        {
          stepNumber: 2,
          phase: "tool_call",
          title: "Retrieve Latest 10-K Free Cash Flow",
          toolName: "googleSearch",
          toolArgs: { query: "Alphabet GOOGL Free Cash Flow 2021 2022 2023 2024 2025 SEC 10-K" },
          status: "success"
        },
        {
          stepNumber: 3,
          phase: "tool_result",
          title: "Ingested Historical FCF Data",
          toolOutput: "FCF (Billions USD): 2021: $67.0B, 2022: $60.0B, 2023: $69.5B, 2024: $72.1B, 2025: $81.4B.",
          durationMs: 380,
          status: "success"
        },
        {
          stepNumber: 4,
          phase: "tool_call",
          title: "Run Python Script for DCF & Sensitivity Matrix",
          toolName: "codeExecution",
          toolArgs: {
            code: `fcf_history = [67.0, 60.0, 69.5, 72.1, 81.4]
cagr_5yr = (fcf_history[-1] / fcf_history[0]) ** (1/4) - 1
print(f"5-Year FCF CAGR: {cagr_5yr * 100:.2f}%")

waccs = [0.085, 0.095, 0.105]
terminal_rates = [0.025, 0.030, 0.035]
results = {}
for w in waccs:
    for g in terminal_rates:
        # 5-year projection assuming 8% growth then terminal
        proj = [81.4 * ((1 + 0.08) ** i) for i in range(1, 6)]
        pv = sum(cf / ((1 + w) ** idx) for idx, cf in enumerate(proj, 1))
        tv = (proj[-1] * (1 + g)) / (w - g)
        pv_tv = tv / ((1 + w) ** 5)
        ev = pv + pv_tv
        results[f"WACC_{w:.1%}_g_{g:.1%}"] = round(ev, 1)

print("Enterprise Value Matrix (Billion $):", results)`
          },
          status: "success"
        },
        {
          stepNumber: 5,
          phase: "tool_result",
          title: "Python Sandbox Execution Succeeded",
          toolOutput: `5-Year FCF CAGR: 4.98%\nEnterprise Value Matrix (Billion $): {'WACC_8.5%_g_2.5%': 1845.2, 'WACC_8.5%_g_3.0%': 1994.6, 'WACC_9.5%_g_2.5%': 1582.4, 'WACC_9.5%_g_3.0%': 1690.1}`,
          durationMs: 620,
          status: "success"
        },
        {
          stepNumber: 6,
          phase: "final_answer",
          title: "Financial Model Formulated",
          thought: "Accurate enterprise valuation range between $1,582B and $1,994B verified by Python computation without hallucination.",
          status: "success"
        }
      ],
      codeSnippets: [
        {
          filename: "financial_analyst_agent.ts",
          language: "typescript",
          description: "Gemini Agent combining Web Search and Sandboxed Code Execution",
          code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

export async function runQuantitativeAnalyst(ticker: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-3.8-flash',
    contents: \`Perform a complete DCF sensitivity analysis for \${ticker} with 5-year historical FCF.\`,
    config: {
      // Enable BOTH live search grounding and isolated Python execution
      tools: [
        { googleSearch: {} },
        { codeExecution: {} }
      ],
      systemInstruction: \`You are an algorithmic financial modeling agent.
Always write and run Python scripts to compute percentages, valuations, and statistics.
Base all statements on verified code outputs.\`
    }
  });

  return response.text;
}`
        }
      ]
    }
  ],

  frameworkComparisons: [
    {
      name: "Google Managed Agents (Interactions API)",
      developer: "Google DeepMind / Google Cloud",
      primaryModel: "gemini-3.8-flash, gemini-3.1-pro-preview",
      deployment: "Google-managed secure Linux sandbox",
      strengths: "Zero infrastructure setup, built-in Antigravity & Deep Research, persistent server state, native Google Search & code execution.",
      bestFor: "Full-stack coding agents, autonomous research, turn-key enterprise agent workflows.",
      codeComplexity: "Minimal (1 API call)"
    },
    {
      name: "Google Agent Development Kit (ADK)",
      developer: "Google",
      primaryModel: "Gemini 2.5/3.x family",
      deployment: "Self-hosted, Cloud Run, Kubernetes",
      strengths: "Open standards, deep @google/genai integration, AGENTS.md/SKILL.md native, flexible state stores.",
      bestFor: "Custom enterprise multi-agent architectures requiring custom sandboxes or on-premise execution.",
      codeComplexity: "Moderate (Standard SDK)"
    },
    {
      name: "LangGraph with Gemini",
      developer: "LangChain",
      primaryModel: "Gemini 2.5/3.x",
      deployment: "LangGraph Cloud or Docker",
      strengths: "Stateful cyclic graphs, time-travel debugging, complex human-in-the-loop branching.",
      bestFor: "Complex cyclic workflows, multi-step review workflows with human approval nodes.",
      codeComplexity: "High (StateGraph nodes & edges)"
    },
    {
      name: "Vertex AI Agent Builder",
      developer: "Google Cloud",
      primaryModel: "Gemini Enterprise Models",
      deployment: "Fully managed GCP SaaS",
      strengths: "Turnkey enterprise search connectors, role-based access control, enterprise grounding, no-code/low-code console.",
      bestFor: "Enterprise customer service, internal company knowledge base agents, HIPAA/SOC2 compliance.",
      codeComplexity: "Low (Console + REST API)"
    }
  ],

  quickstartSteps: [
    {
      step: "01",
      title: "Install @google/genai SDK",
      command: "npm install @google/genai",
      description: "Ensure you are using the modern official Google GenAI SDK (Node 20+)."
    },
    {
      step: "02",
      title: "Configure GEMINI_API_KEY",
      command: "export GEMINI_API_KEY=\"AIzaSy...\"",
      description: "Obtain your API key from Google AI Studio (aistudio.google.com)."
    },
    {
      step: "03",
      title: "Launch an Agent via Interactions API",
      command: "const interaction = await ai.interactions.create({ agent: 'antigravity', ... });",
      description: "Run autonomous tasks with built-in sandbox tools and persistent state."
    }
  ]
};
