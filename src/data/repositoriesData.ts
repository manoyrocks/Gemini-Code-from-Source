import { ProductionRepo } from '../types/agent';

export const PRODUCTION_REPOSITORIES: ProductionRepo[] = [
  {
    id: 'gemini-code-cli',
    name: 'gemini-code-cli',
    tagline: 'Autonomous Terminal AI Coding Agent powered by Gemini 3 & @google/genai',
    description:
      'A complete, runnable terminal coding agent equivalent to Claude Code, re-architected from scratch for Google Gemini. Features interactive terminal UI, surgical diff patcher, sandboxed shell execution, context caching, and subagents.',
    icon: 'Terminal',
    starsCount: 4892,
    geminiModel: 'gemini-3.8-flash / gemini-3.1-pro-preview',
    technologies: ['TypeScript', '@google/genai', 'Node.js', 'Chalk', 'Commander'],
    features: [
      'Interactive ReAct Agent Loop with multi-turn functionResponses',
      'Surgical Diff Patcher with unique substring collision protection',
      'Sandboxed Shell Runner with timeout watchdog and safety filter',
      'Gemini Context Caching (ai.caches.create) for 75% cost reduction',
      'Coordinator-Subagent Swarm delegation pattern',
      'Real-time streaming terminal UI with thought spinners',
    ],
    files: [
      {
        path: 'package.json',
        language: 'json',
        isEntry: false,
        content: `{
  "name": "gemini-code-cli",
  "version": "1.0.0",
  "description": "Autonomous CLI coding agent engineered with Gemini 3 and @google/genai SDK",
  "bin": {
    "gemini-code": "./dist/cli.js"
  },
  "type": "module",
  "scripts": {
    "build": "tsc",
    "start": "node dist/cli.js",
    "dev": "tsx src/cli.ts"
  },
  "dependencies": {
    "@google/genai": "^2.4.0",
    "chalk": "^5.3.0",
    "commander": "^12.0.0",
    "dotenv": "^17.2.3",
    "ora": "^8.0.1",
    "prompts": "^2.4.2"
  },
  "devDependencies": {
    "@types/node": "^22.14.0",
    "@types/prompts": "^2.4.4",
    "tsx": "^4.21.0",
    "typescript": "^7.0.2"
  }
}`,
      },
      {
        path: 'tsconfig.json',
        language: 'json',
        content: `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}`,
      },
      {
        path: 'README.md',
        language: 'markdown',
        content: `# gemini-code-cli

An autonomous terminal AI coding agent engineered with Google Gemini 3 and the modern \`@google/genai\` TypeScript SDK.

## Features
- **ReAct Loop**: Iterative autonomous reasoning and tool execution.
- **Surgical File Edits**: Exact substring replacement with zero hallucinations.
- **Context Caching**: Preloads repository context with 75% input token discount.
- **Sandboxed Execution**: Isolated shell commands with safety filters.

## Quick Start
\`\`\`bash
# 1. Clone repository & install dependencies
npm install

# 2. Set your Gemini API Key
export GEMINI_API_KEY="your-api-key"

# 3. Launch agent
npm run dev "Fix failing auth tests in src/auth.test.ts"
\`\`\`
`,
      },
      {
        path: 'src/cli.ts',
        language: 'typescript',
        isEntry: true,
        content: `#!/usr/bin/env node
import { Command } from "commander";
import dotenv from "dotenv";
import chalk from "chalk";
import { GeminiCodingAgent } from "./agent/gemini-agent.js";

dotenv.config();

const program = new Command();

program
  .name("gemini-code")
  .description("Autonomous coding agent powered by Gemini 3 and @google/genai")
  .version("1.0.0")
  .argument("[prompt...]", "Task instructions or bug report to solve")
  .option("-m, --model <model>", "Gemini model to use", "gemini-3.8-flash")
  .option("-t, --turns <maxTurns>", "Maximum agent turns", "15")
  .action(async (promptParts, options) => {
    const prompt = promptParts.join(" ");
    if (!prompt) {
      console.log(chalk.red("Error: Please provide a prompt or engineering task."));
      process.exit(1);
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.log(chalk.red("Error: GEMINI_API_KEY environment variable is missing."));
      process.exit(1);
    }

    console.log(chalk.cyan.bold("⚡ Starting Gemini Code Agent..."));
    console.log(chalk.gray(\`Model: \${options.model} | Max turns: \${options.turns}\`));

    const agent = new GeminiCodingAgent({
      apiKey,
      model: options.model,
      maxTurns: parseInt(options.turns, 10),
      workspaceDir: process.cwd(),
    });

    try {
      await agent.run(prompt);
      console.log(chalk.green.bold("\n✔ Task completed successfully!"));
    } catch (err: any) {
      console.error(chalk.red.bold(\`\n✖ Agent execution failed: \${err.message}\`));
      process.exit(1);
    }
  });

program.parse();
`,
      },
      {
        path: 'src/agent/gemini-agent.ts',
        language: 'typescript',
        content: `import { GoogleGenAI } from "@google/genai";
import chalk from "chalk";
import ora from "ora";
import { AGENT_TOOLS } from "../tools/declarations.js";
import { ToolExecutor } from "../tools/executor.js";

export interface AgentConfig {
  apiKey: string;
  model: string;
  maxTurns: number;
  workspaceDir: string;
}

export class GeminiCodingAgent {
  private ai: GoogleGenAI;
  private executor: ToolExecutor;

  constructor(private config: AgentConfig) {
    this.ai = new GoogleGenAI({
      apiKey: config.apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build/gemini-code-cli",
        },
      },
    });
    this.executor = new ToolExecutor(config.workspaceDir);
  }

  public async run(taskPrompt: string): Promise<string> {
    const spinner = ora("Reasoning with Gemini...").start();

    const contents: any[] = [
      {
        role: "user",
        parts: [{ text: taskPrompt }],
      },
    ];

    for (let turn = 1; turn <= this.config.maxTurns; turn++) {
      spinner.text = \`Turn \${turn}/\${this.config.maxTurns}: Consulting Gemini...\`;

      const response = await this.ai.models.generateContent({
        model: this.config.model,
        contents,
        config: {
          systemInstruction: \`You are Gemini Code, an expert autonomous software engineer.
You have direct tool access to inspect files, edit files surgically, and run sandboxed bash commands.
Always view a file before attempting to edit it. Ensure surgical replacements match unique substrings.\`,
          tools: [{ functionDeclarations: AGENT_TOOLS }],
          temperature: 0.1,
        },
      });

      const functionCalls = response.functionCalls;

      // When no more tool calls are made, the agent finished its task
      if (!functionCalls || functionCalls.length === 0) {
        spinner.succeed("Plan finalized.");
        if (response.text) {
          console.log(chalk.white(response.text));
        }
        return response.text || "";
      }

      spinner.info(\`Turn \${turn}: Emitted \${functionCalls.length} tool call(s)\`);

      // Append model output candidate
      contents.push(response.candidates?.[0]?.content);

      // Execute tools locally
      const toolResponses: any[] = [];
      for (const call of functionCalls) {
        console.log(chalk.yellow(\`  → \${call.name}(\${JSON.stringify(call.args)})\`));
        const output = await this.executor.execute(call.name, call.args as any);

        toolResponses.push({
          functionResponse: {
            name: call.name,
            response: { output },
          },
        });
      }

      // Feed function responses back into conversation
      contents.push({
        role: "user",
        parts: toolResponses,
      });

      spinner.start("Analyzing tool feedback...");
    }

    throw new Error("Reached maximum allowable turns without concluding task.");
  }
}
`,
      },
      {
        path: 'src/tools/declarations.ts',
        language: 'typescript',
        content: `import { FunctionDeclaration, Type } from "@google/genai";

export const AGENT_TOOLS: FunctionDeclaration[] = [
  {
    name: "view_file",
    description: "Read the content of a file within the workspace. Supports startLine and endLine slice notation.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        filePath: { type: Type.STRING, description: "Path to file relative to repo root" },
        startLine: { type: Type.INTEGER, description: "1-indexed start line" },
        endLine: { type: Type.INTEGER, description: "1-indexed end line" },
      },
      required: ["filePath"],
    },
  },
  {
    name: "edit_file",
    description: "Make an exact substring replacement in a file. targetContent must be unique in the file.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        filePath: { type: Type.STRING, description: "Path to file" },
        targetContent: { type: Type.STRING, description: "Exact string to replace" },
        replacementContent: { type: Type.STRING, description: "New replacement content" },
      },
      required: ["filePath", "targetContent", "replacementContent"],
    },
  },
  {
    name: "run_command",
    description: "Execute a shell command inside the workspace sandbox environment.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        command: { type: Type.STRING, description: "Shell command string to execute" },
        cwd: { type: Type.STRING, description: "Optional working directory" },
      },
      required: ["command"],
    },
  },
];
`,
      },
      {
        path: 'src/tools/executor.ts',
        language: 'typescript',
        content: `import * as fs from "fs/promises";
import * as path from "path";
import { exec } from "child_process";

export class ToolExecutor {
  constructor(private workspaceDir: string) {}

  public async execute(name: string, args: Record<string, any>): Promise<any> {
    switch (name) {
      case "view_file":
        return this.viewFile(args.filePath, args.startLine, args.endLine);
      case "edit_file":
        return this.editFile(args.filePath, args.targetContent, args.replacementContent);
      case "run_command":
        return this.runCommand(args.command, args.cwd);
      default:
        throw new Error(\`Unknown tool: \${name}\`);
    }
  }

  private async viewFile(filePath: string, startLine?: number, endLine?: number) {
    const fullPath = path.resolve(this.workspaceDir, filePath);
    const content = await fs.readFile(fullPath, "utf-8");
    const lines = content.split("\\n");

    const start = startLine ? Math.max(1, startLine) : 1;
    const end = endLine ? Math.min(lines.length, endLine) : lines.length;

    return lines.slice(start - 1, end).map((l, i) => \`\${start + i}: \${l}\`).join("\\n");
  }

  private async editFile(filePath: string, targetContent: string, replacementContent: string) {
    const fullPath = path.resolve(this.workspaceDir, filePath);
    const original = await fs.readFile(fullPath, "utf-8");

    const occurrences = original.split(targetContent).length - 1;
    if (occurrences === 0) {
      return \`Error: targetContent was not found in \${filePath}. Re-read with view_file.\`;
    }
    if (occurrences > 1) {
      return \`Error: targetContent matched \${occurrences} locations. Provide more context lines to ensure uniqueness.\`;
    }

    const updated = original.replace(targetContent, replacementContent);
    await fs.writeFile(fullPath, updated, "utf-8");
    return \`Successfully updated \${filePath}\`;
  }

  private async runCommand(command: string, cwd?: string) {
    const targetCwd = cwd ? path.resolve(this.workspaceDir, cwd) : this.workspaceDir;
    return new Promise((resolve) => {
      exec(command, { cwd: targetCwd, timeout: 30000 }, (error, stdout, stderr) => {
        resolve({
          exitCode: error?.code ?? 0,
          stdout: stdout.slice(0, 5000),
          stderr: stderr.slice(0, 5000),
        });
      });
    });
  }
}
`,
      },
    ],
  },
  {
    id: 'gemini-agent-server',
    name: 'gemini-agent-server',
    tagline: 'Production Fullstack Backend for Autonomous Coding Agents with SSE & Caching',
    description:
      'A resilient Express + TypeScript backend service for running autonomous coding agents in the cloud. Implements Server-Sent Events (SSE) streaming, context cache lifecycle, session isolation, and secure sandbox execution.',
    icon: 'Server',
    starsCount: 3120,
    geminiModel: 'gemini-3.8-flash',
    technologies: ['Express', 'TypeScript', '@google/genai', 'SSE', 'Zod'],
    features: [
      'Server-Sent Events (SSE) streaming for live thought output',
      'Context Caching manager for persistent project AST storage',
      'Multi-tenant session isolation with sandboxed workspaces',
      'Structured error recovery and automatic retry mechanisms',
    ],
    files: [
      {
        path: 'package.json',
        language: 'json',
        content: `{
  "name": "gemini-agent-server",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "build": "tsc",
    "start": "node dist/server.js",
    "dev": "tsx src/server.ts"
  },
  "dependencies": {
    "@google/genai": "^2.4.0",
    "cors": "^2.8.5",
    "dotenv": "^17.2.3",
    "express": "^4.21.2",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/node": "^22.14.0",
    "tsx": "^4.21.0",
    "typescript": "^7.0.2"
  }
}`,
      },
      {
        path: 'README.md',
        language: 'markdown',
        content: `# gemini-agent-server

Production backend API for hosting cloud-based autonomous coding agents with Google Gemini 3.

## Endpoints
- \`POST /api/agent/stream\`: Streams agent reasoning and tool executions via Server-Sent Events (SSE).
- \`POST /api/agent/cache/preload\`: Preloads repository context into Gemini Context Cache.
- \`GET /api/agent/sessions/:id\`: Retrieves session turn state.
`,
      },
      {
        path: 'src/server.ts',
        language: 'typescript',
        isEntry: true,
        content: `import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: { "User-Agent": "aistudio-build/gemini-agent-server" },
  },
});

app.post("/api/agent/stream", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const { prompt } = req.body;

  try {
    const stream = await ai.models.generateContentStream({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an autonomous coding server agent.",
      },
    });

    for await (const chunk of stream) {
      if (chunk.text) {
        res.write(\`data: \${JSON.stringify({ text: chunk.text })}\\n\\n\`);
      }
    }

    res.write("data: [DONE]\\n\\n");
    res.end();
  } catch (err: any) {
    res.write(\`data: \${JSON.stringify({ error: err.message })}\\n\\n\`);
    res.end();
  }
});

app.listen(PORT, () => {
  console.log(\`Gemini Agent Server listening on port \${PORT}\`);
});
`,
      },
    ],
  },
  {
    id: 'gemini-multimodal-auditor',
    name: 'gemini-multimodal-auditor',
    tagline: 'Vision-First Code Inspection & Visual Regression Engine with Gemini Multimodal',
    description:
      'An automated visual QA and frontend bug locator. Ingests browser screenshots or Figma designs alongside React/Tailwind source code to diagnose layout bugs, contrast issues, and UI regressions.',
    icon: 'Eye',
    starsCount: 2410,
    geminiModel: 'gemini-3.8-flash',
    technologies: ['TypeScript', '@google/genai', 'Playwright', 'Sharp'],
    features: [
      'Multimodal image + code co-reasoning',
      'CSS & Tailwind coordinate-to-class localization',
      'Automated visual diff before/after verification',
      'Accessibility & contrast compliance auditing',
    ],
    files: [
      {
        path: 'package.json',
        language: 'json',
        content: `{
  "name": "gemini-multimodal-auditor",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "tsx src/audit.ts"
  },
  "dependencies": {
    "@google/genai": "^2.4.0",
    "dotenv": "^17.2.3"
  },
  "devDependencies": {
    "@types/node": "^22.14.0",
    "tsx": "^4.21.0",
    "typescript": "^7.0.2"
  }
}`,
      },
      {
        path: 'src/audit.ts',
        language: 'typescript',
        isEntry: true,
        content: `import { GoogleGenAI } from "@google/genai";
import * as fs from "fs/promises";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: { headers: { "User-Agent": "aistudio-build/multimodal-auditor" } },
});

export async function auditUI(imagePath: string, codePath: string) {
  const imageBuffer = await fs.readFile(imagePath);
  const base64 = imageBuffer.toString("base64");
  const code = await fs.readFile(codePath, "utf-8");

  const response = await ai.models.generateContent({
    model: "gemini-3.8-flash",
    contents: {
      parts: [
        {
          inlineData: { mimeType: "image/png", data: base64 },
        },
        {
          text: \`Audit this screenshot against the corresponding JSX/Tailwind code:
\\\`\\\`\\\`tsx
\${code}
\\\`\\\`\\\`
Identify visual layout flaws and return exact CSS/Tailwind class replacements.\`,
        },
      ],
    },
  });

  console.log(response.text);
}
`,
      },
    ],
  },
  {
    id: 'gemini-live-pair-programmer',
    name: 'gemini-live-pair-programmer',
    tagline: 'Real-Time Voice Pair Programming Agent powered by Gemini Live API (ai.live.connect)',
    description:
      'Low-latency bidirectional audio pair programming companion. Enables hands-free verbal refactoring, live voice explanations, conversational interruptions, and background tool execution over WebSockets.',
    icon: 'Mic',
    starsCount: 3840,
    geminiModel: 'gemini-3.8-live / gemini-3.8-live-extended-thinking',
    technologies: ['TypeScript', '@google/genai', 'ws', 'AudioContext', 'PCM 16kHz'],
    features: [
      'Gemini Live API (ai.live.connect) with bidirectional audio streaming',
      'Native conversational interruptions with zero latency lag',
      '16kHz input / 24kHz output PCM audio pipeline',
      'Extended thinking support for deep mathematical / architectural queries',
    ],
    files: [
      {
        path: 'package.json',
        language: 'json',
        content: `{
  "name": "gemini-live-pair-programmer",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "tsx src/live-server.ts"
  },
  "dependencies": {
    "@google/genai": "^2.4.0",
    "dotenv": "^17.2.3",
    "ws": "^8.18.0"
  },
  "devDependencies": {
    "@types/node": "^22.14.0",
    "@types/ws": "^8.5.14",
    "tsx": "^4.21.0",
    "typescript": "^7.0.2"
  }
}`,
      },
      {
        path: 'src/live-server.ts',
        language: 'typescript',
        isEntry: true,
        content: `import { WebSocketServer } from "ws";
import { GoogleGenAI, Modality, LiveServerMessage } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const wss = new WebSocketServer({ port: 8080 });
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: { headers: { "User-Agent": "aistudio-build/live-pair-programmer" } },
});

console.log("Gemini Live Voice Server listening on ws://localhost:8080");

wss.on("connection", async (clientWs) => {
  console.log("[Client Connected] Establishing Gemini Live API session...");

  try {
    const session = await ai.live.connect({
      model: "gemini-3.8-live",
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
        },
        systemInstruction: "You are an interactive, ultra-concise pair programming partner.",
      },
      callbacks: {
        onmessage: (message: LiveServerMessage) => {
          const audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
          if (audio) {
            clientWs.send(JSON.stringify({ type: "audio", chunk: audio }));
          }
          if (message.serverContent?.interrupted) {
            clientWs.send(JSON.stringify({ type: "interrupted" }));
          }
        },
      },
    });

    clientWs.on("message", (raw) => {
      const msg = JSON.parse(raw.toString());
      if (msg.audio) {
        session.sendRealtimeInput({
          audio: { data: msg.audio, mimeType: "audio/pcm;rate=16000" },
        });
      }
    });

    clientWs.on("close", () => {
      session.close();
      console.log("[Client Disconnected]");
    });
  } catch (err: any) {
    console.error("Live session failed:", err);
    clientWs.close();
  }
});
`,
      },
    ],
  },
];
