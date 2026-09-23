import React, { useState } from 'react';
import { FileCode, Folder, Copy, Check, Sparkles, Terminal, Code2 } from 'lucide-react';

interface EngineFile {
  path: string;
  name: string;
  category: string;
  description: string;
  content: string;
}

const ENGINE_FILES: EngineFile[] = [
  {
    path: 'src/agent/agent-loop.ts',
    name: 'agent-loop.ts',
    category: 'Core Agent Loop',
    description: 'The central ReAct loop managing turn state, functionCalls dispatch, and tool responses.',
    content: `/**
 * Core Agent ReAct Loop for Gemini Code
 * Engineered with @google/genai SDK
 */
import { GoogleGenAI, FunctionDeclaration } from "@google/genai";
import { ToolExecutor } from "../tools/sandbox.js";

export interface AgentRunOptions {
  model?: string;
  maxTurns?: number;
  systemInstruction?: string;
}

export async function runAgentLoop(
  ai: GoogleGenAI,
  prompt: string,
  tools: FunctionDeclaration[],
  executor: ToolExecutor,
  options: AgentRunOptions = {}
) {
  const model = options.model || "gemini-3.8-flash";
  const maxTurns = options.maxTurns || 15;

  const contents: any[] = [
    {
      role: "user",
      parts: [{ text: prompt }],
    },
  ];

  for (let turn = 1; turn <= maxTurns; turn++) {
    console.log(\`[Loop] Executing turn \${turn}/\${maxTurns} with \${model}\`);

    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction: options.systemInstruction ||
          "You are Gemini Code, an autonomous coding agent. Use tools to inspect files, edit code surgically, and run tests.",
        tools: [{ functionDeclarations: tools }],
        temperature: 0.1,
      },
    });

    const functionCalls = response.functionCalls;

    // Concluded task
    if (!functionCalls || functionCalls.length === 0) {
      return {
        success: true,
        turns: turn,
        answer: response.text || "Task finished.",
        usage: response.usageMetadata,
      };
    }

    // Append model turn to conversation
    contents.push(response.candidates?.[0]?.content);

    // Execute tools and accumulate functionResponses
    const toolResponses: any[] = [];
    for (const call of functionCalls) {
      const output = await executor.execute(call.name, call.args as Record<string, any>);
      toolResponses.push({
        functionResponse: {
          name: call.name,
          response: { output },
        },
      });
    }

    // Inject tool results back to the model
    contents.push({
      role: "user",
      parts: toolResponses,
    });
  }

  throw new Error("Maximum agent turns exceeded.");
}
`,
  },
  {
    path: 'src/tools/declarations.ts',
    name: 'declarations.ts',
    category: 'Tool Schemas',
    description: 'Strict TypeScript tool declarations using Type from @google/genai.',
    content: `/**
 * Strict Tool Declarations for Gemini Code
 */
import { FunctionDeclaration, Type } from "@google/genai";

export const TOOL_DECLARATIONS: FunctionDeclaration[] = [
  {
    name: "view_file",
    description: "Read lines of a file within the workspace using slice notation.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        filePath: { type: Type.STRING, description: "Relative file path" },
        startLine: { type: Type.INTEGER, description: "1-indexed start line" },
        endLine: { type: Type.INTEGER, description: "1-indexed end line" },
      },
      required: ["filePath"],
    },
  },
  {
    name: "edit_file",
    description: "Perform an exact surgical substring replacement in a file.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        filePath: { type: Type.STRING, description: "Relative file path" },
        targetContent: { type: Type.STRING, description: "Exact character sequence to replace" },
        replacementContent: { type: Type.STRING, description: "New replacement content" },
      },
      required: ["filePath", "targetContent", "replacementContent"],
    },
  },
  {
    name: "run_command",
    description: "Execute a sandboxed shell command inside the workspace.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        command: { type: Type.STRING, description: "Shell command line string" },
        cwd: { type: Type.STRING, description: "Optional working directory" },
      },
      required: ["command"],
    },
  },
];
`,
  },
  {
    path: 'src/tools/patcher.ts',
    name: 'patcher.ts',
    category: 'Surgical Diff Engine',
    description: 'Collision-free surgical diff patcher enforcing unique target content matches.',
    content: `/**
 * Atomic Surgical Diff Patcher
 */
import * as fs from "fs/promises";
import * as path from "path";

export async function applySurgicalPatch(
  workspaceDir: string,
  filePath: string,
  targetContent: string,
  replacementContent: string
) {
  const fullPath = path.resolve(workspaceDir, filePath);
  const original = await fs.readFile(fullPath, "utf-8");

  const occurrences = original.split(targetContent).length - 1;

  if (occurrences === 0) {
    throw new Error(\`Target content not found in \${filePath}. Re-read with view_file.\`);
  }

  if (occurrences > 1) {
    throw new Error(\`Target content matched \${occurrences} locations. Provide more surrounding context.\`);
  }

  const updated = original.replace(targetContent, replacementContent);
  await fs.writeFile(fullPath, updated, "utf-8");

  return \`Successfully patched \${filePath}\`;
}
`,
  },
  {
    path: 'src/cache/context-cache-manager.ts',
    name: 'context-cache-manager.ts',
    category: 'Context Caching',
    description: 'Gemini explicit context caching (ai.caches.create) for persistent repository indexes.',
    content: `/**
 * Gemini Context Cache Manager
 * Preloads repository ASTs and file indexes with 75% token discount
 */
import { GoogleGenAI } from "@google/genai";

export class ContextCacheManager {
  private cacheName: string | null = null;

  constructor(private ai: GoogleGenAI) {}

  public async createRepoCache(
    model: string,
    repoDump: string,
    ttlSeconds = 7200
  ): Promise<string> {
    const cache = await this.ai.caches.create({
      model,
      config: {
        displayName: "gemini-code-workspace-cache",
        ttl: \`\${ttlSeconds}s\`,
        contents: [
          {
            role: "user",
            parts: [{ text: repoDump }],
          },
        ],
      },
    });

    this.cacheName = cache.name;
    return cache.name;
  }

  public getCacheConfig() {
    if (!this.cacheName) return {};
    return { cachedContent: this.cacheName };
  }
}
`,
  },
  {
    path: 'src/live/pair-programming.ts',
    name: 'pair-programming.ts',
    category: 'Gemini Live API',
    description: 'Low-latency real-time voice pairing over WebSockets using ai.live.connect.',
    content: `/**
 * Real-Time Voice Pair Programming via Gemini Live API
 */
import { GoogleGenAI, Modality } from "@google/genai";

export async function startLiveSession(ai: GoogleGenAI, onAudioChunk: (chunk: string) => void) {
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
      onmessage: (msg) => {
        const audio = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
        if (audio) onAudioChunk(audio);
      },
    },
  });

  return session;
}
`,
  },
];

export const CodeExplorer: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const file = ENGINE_FILES[selectedIdx];

  const handleCopy = () => {
    navigator.clipboard.writeText(file.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 sm:p-8 mb-6 shadow-xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
          <Code2 className="w-3.5 h-3.5" />
          <span>Core Agent Source Code</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Engineered Engine Source Code
        </h2>
        <p className="mt-2 text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
          Browse the pristine TypeScript source implementation of the Gemini Code agent engine: from the core ReAct loop to surgical diff patchers, Gemini Context Caching, and the Live Voice API.
        </p>
      </div>

      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 min-h-[550px]">
        {/* Left Column: File Tree */}
        <div className="md:col-span-4 border-r border-slate-800 bg-[#0B0F17] p-4">
          <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold px-2 mb-3 flex items-center space-x-1.5">
            <Folder className="w-3.5 h-3.5 text-blue-400" />
            <span>gemini-code / engine source</span>
          </div>

          <div className="space-y-1.5">
            {ENGINE_FILES.map((f, idx) => {
              const active = idx === selectedIdx;
              return (
                <button
                  key={f.path}
                  onClick={() => setSelectedIdx(idx)}
                  className={`w-full text-left p-3 rounded-xl transition flex flex-col ${
                    active
                      ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold">{f.name}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      {f.category}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 line-clamp-1 mt-1">
                    {f.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Code Editor View */}
        <div className="md:col-span-8 bg-[#0B0F17] flex flex-col">
          <div className="flex items-center justify-between px-5 py-3 bg-slate-900 border-b border-slate-800">
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-300">
              <FileCode className="w-4 h-4 text-cyan-400" />
              <span>{file.path}</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 text-xs font-mono text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy File</span>
                </>
              )}
            </button>
          </div>

          <pre className="p-5 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed flex-1 max-h-[600px]">
            <code>{file.content}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
