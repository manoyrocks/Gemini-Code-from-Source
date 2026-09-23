import React, { useState, useEffect } from 'react';
import { AgentStep } from '../types/agent';
import {
  Play,
  Pause,
  RotateCcw,
  StepForward,
  Cpu,
  Terminal,
  FileCode,
  CheckCircle,
  AlertCircle,
  Database,
  Layers,
  Sparkles,
  ArrowRight,
  Code2,
} from 'lucide-react';

interface Scenario {
  id: string;
  name: string;
  category: string;
  initialPrompt: string;
  steps: AgentStep[];
}

const PRESET_SCENARIOS: Scenario[] = [
  {
    id: 'auth-jwt-bug',
    name: 'Fix JWT Token Expiration Bug (auth.controller.ts)',
    category: 'Backend Security',
    initialPrompt:
      'Our auth test in tests/auth.test.ts is failing with "TokenExpiredError: jwt expired immediately". Inspect the auth controller and fix the token expiration parameter.',
    steps: [
      {
        stepNumber: 1,
        type: 'user_prompt',
        title: 'Developer Directive Ingestion',
        description: 'User commands the agent to resolve a failing JWT token expiration issue.',
        durationMs: 50,
        tokens: { promptTokens: 1420, cachedTokens: 0, candidateTokens: 0, totalTokens: 1420 },
        payload: {
          prompt:
            'Our auth test in tests/auth.test.ts is failing with "TokenExpiredError: jwt expired immediately". Inspect the auth controller and fix the token expiration parameter.',
        },
      },
      {
        stepNumber: 2,
        type: 'model_call',
        title: 'Context Cache Preload & First Turn Evaluation',
        description:
          'Agent consults Gemini 3.8 Flash with tool declarations. Gemini decides to reproduce the failure by running tests first.',
        durationMs: 420,
        tokens: { promptTokens: 3820, cachedTokens: 2800, candidateTokens: 64, totalTokens: 3884 },
        payload: {
          model: 'gemini-3.8-flash',
          cachedContent: 'cachedContents/gemini-code-auth-repo',
          functionCalls: [
            {
              name: 'run_command',
              args: { command: 'npm test tests/auth.test.ts' },
            },
          ],
        },
      },
      {
        stepNumber: 3,
        type: 'tool_execution',
        title: 'Sandbox Tool Execution: run_command',
        description: 'Sandbox runner executes the test suite. Jest reports a test failure.',
        durationMs: 780,
        payload: {
          command: 'npm test tests/auth.test.ts',
          exitCode: 1,
          stdout: `FAIL tests/auth.test.ts
  ✕ should issue valid token with 1 hour expiration (45ms)
    TokenExpiredError: jwt expired immediately. Expected expiresIn to be '1h' but received '1s'.
    at Object.<anonymous> (tests/auth.test.ts:24:11)`,
        },
      },
      {
        stepNumber: 4,
        type: 'tool_response',
        title: 'Inject FunctionResponse & Next Step',
        description:
          'Agent receives test failure stdout. Model diagnoses that auth.controller.ts erroneously passes "1s" instead of "1h". Emits view_file.',
        durationMs: 390,
        tokens: { promptTokens: 4120, cachedTokens: 3200, candidateTokens: 52, totalTokens: 4172 },
        payload: {
          functionCalls: [
            {
              name: 'view_file',
              args: { filePath: 'src/controllers/auth.controller.ts', startLine: 18, endLine: 35 },
            },
          ],
        },
      },
      {
        stepNumber: 5,
        type: 'tool_execution',
        title: 'Sandbox Tool Execution: view_file',
        description: 'Read file lines 18-35 to capture exact surrounding context.',
        durationMs: 120,
        payload: {
          lines: `18: export async function generateAuthToken(user: UserProfile) {
19:   const payload = { sub: user.id, email: user.email, role: user.role };
20:   return jwt.sign(payload, process.env.JWT_SECRET!, {
21:     expiresIn: '1s', // BUG: accidentally typed '1s' instead of '1h'
22:     issuer: 'gemini-auth-service',
23:   });
24: }`,
        },
      },
      {
        stepNumber: 6,
        type: 'patch_apply',
        title: 'Surgical Diff Generation: edit_file',
        description:
          'Gemini emits edit_file with precise targetContent and replacementContent. Patcher verifies single occurrence and applies diff.',
        durationMs: 310,
        tokens: { promptTokens: 4410, cachedTokens: 3500, candidateTokens: 88, totalTokens: 4498 },
        diff: {
          file: 'src/controllers/auth.controller.ts',
          original: `    expiresIn: '1s', // BUG: accidentally typed '1s' instead of '1h'`,
          modified: `    expiresIn: '1h', // Corrected to 1 hour expiration`,
        },
        payload: {
          targetContent: `    expiresIn: '1s', // BUG: accidentally typed '1s' instead of '1h'`,
          replacementContent: `    expiresIn: '1h', // Corrected to 1 hour expiration`,
        },
      },
      {
        stepNumber: 7,
        type: 'tool_execution',
        title: 'Re-run Tests in Sandbox for Verification',
        description: 'Agent proactively re-executes tests to verify that the patch resolved the bug.',
        durationMs: 820,
        payload: {
          command: 'npm test tests/auth.test.ts',
          exitCode: 0,
          stdout: `PASS tests/auth.test.ts
  ✓ should issue valid token with 1 hour expiration (12ms)
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total`,
        },
      },
      {
        stepNumber: 8,
        type: 'final_answer',
        title: 'Task Completion & Architectural Summary',
        description: 'Gemini confirms fix, provides verification proof, and closes the agent loop.',
        durationMs: 250,
        tokens: { promptTokens: 4720, cachedTokens: 3800, candidateTokens: 140, totalTokens: 4860 },
        payload: {
          finalAnswer:
            'Resolved the JWT token expiration bug in `src/controllers/auth.controller.ts`. The `expiresIn` parameter was mistakenly set to `"1s"` instead of `"1h"`. Verified by re-running the test suite with `npm test tests/auth.test.ts` (1 passed, exit code 0).',
        },
      },
    ],
  },
  {
    id: 'tailwind-css-layout',
    name: 'Multimodal CSS Flexbox Regression Repair',
    category: 'Frontend / Multimodal',
    initialPrompt:
      'The navigation header buttons are wrapping awkwardly and clipping offscreen on mobile viewports. Fix the layout in src/components/Header.tsx.',
    steps: [
      {
        stepNumber: 1,
        type: 'user_prompt',
        title: 'Ingest UI Screenshot & Directive',
        description:
          'Developer provides prompt with inline base64 image of clipped mobile navigation bar.',
        durationMs: 60,
        tokens: { promptTokens: 2540, cachedTokens: 0, candidateTokens: 0, totalTokens: 2540 },
        payload: {
          hasMultimodalImage: true,
          mimeType: 'image/png',
          prompt: 'Fix the mobile header buttons clipping in src/components/Header.tsx.',
        },
      },
      {
        stepNumber: 2,
        type: 'model_call',
        title: 'Multimodal Vision Localization',
        description:
          'Gemini vision processes the layout error and requests Header.tsx via view_file.',
        durationMs: 460,
        tokens: { promptTokens: 3600, cachedTokens: 1800, candidateTokens: 48, totalTokens: 3648 },
        payload: {
          functionCalls: [{ name: 'view_file', args: { filePath: 'src/components/Header.tsx' } }],
        },
      },
      {
        stepNumber: 3,
        type: 'patch_apply',
        title: 'Apply Responsive Flexbox Patch',
        description:
          'Agent converts rigid width classes to responsive flex-wrap and hidden sm:block.',
        durationMs: 290,
        diff: {
          file: 'src/components/Header.tsx',
          original: `<div className="flex w-[800px] justify-between">`,
          modified: `<div className="flex flex-wrap w-full max-w-7xl justify-between px-4">`,
        },
      },
      {
        stepNumber: 4,
        type: 'final_answer',
        title: 'Visual Regression Resolved',
        description: 'Agent confirms header flex container now fluidly scales across mobile viewports.',
        durationMs: 190,
        payload: {
          finalAnswer:
            'Fixed the header clipping by removing the rigid fixed `w-[800px]` width in `src/components/Header.tsx` and replacing it with responsive `w-full max-w-7xl px-4 flex-wrap`.',
        },
      },
    ],
  },
];

export const AgentSimulator: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('auth-jwt-bug');
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [inspectTab, setInspectTab] = useState<'visual' | 'json'>('visual');

  const currentScenario =
    PRESET_SCENARIOS.find((s) => s.id === selectedScenarioId) || PRESET_SCENARIOS[0];
  const steps = currentScenario.steps;
  const currentStep = steps[currentStepIdx] || steps[0];

  // Auto-play timer
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      if (currentStepIdx < steps.length - 1) {
        timer = setTimeout(() => {
          setCurrentStepIdx((prev) => prev + 1);
        }, 1800);
      } else {
        setIsPlaying(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIdx, steps.length]);

  const handleScenarioChange = (id: string) => {
    setSelectedScenarioId(id);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  const handleReset = () => {
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  const handleStepForward = () => {
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx((prev) => prev + 1);
    }
  };

  const totalTokens = currentStep.tokens?.totalTokens || 0;
  const cachedTokens = currentStep.tokens?.cachedTokens || 0;
  const cacheHitPercent = totalTokens > 0 ? Math.round((cachedTokens / totalTokens) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Simulator Header */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 mb-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>Interactive Agent Loop Playground</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Gemini Agent Loop Simulator
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Step through autonomous multi-turn ReAct cycles: Prompt → Gemini SDK → Tool Call → Local Sandbox → Surgical Diff → Verification.
            </p>
          </div>

          {/* Scenario Picker */}
          <div className="flex items-center space-x-3">
            <label className="text-xs font-mono text-slate-400 hidden sm:inline">Scenario:</label>
            <select
              value={selectedScenarioId}
              onChange={(e) => handleScenarioChange(e.target.value)}
              className="bg-[#0B0F17] border border-slate-700 text-xs text-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-500"
            >
              {PRESET_SCENARIOS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.category})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800">
          <div className="bg-[#0B0F17] p-3 rounded-xl border border-slate-800/80">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Agent Turn State</div>
            <div className="text-sm font-bold text-white mt-1 font-mono">
              Step {currentStepIdx + 1} of {steps.length}
            </div>
          </div>
          <div className="bg-[#0B0F17] p-3 rounded-xl border border-slate-800/80">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Context Tokens</div>
            <div className="text-sm font-bold text-cyan-400 mt-1 font-mono">
              {totalTokens.toLocaleString()} tokens
            </div>
          </div>
          <div className="bg-[#0B0F17] p-3 rounded-xl border border-slate-800/80">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Context Cache Hit</div>
            <div className="text-sm font-bold text-emerald-400 mt-1 font-mono">
              {cacheHitPercent}% ({cachedTokens.toLocaleString()} cached)
            </div>
          </div>
          <div className="bg-[#0B0F17] p-3 rounded-xl border border-slate-800/80">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Gemini Model</div>
            <div className="text-sm font-bold text-indigo-300 mt-1 font-mono truncate">
              gemini-3.8-flash
            </div>
          </div>
        </div>
      </div>

      {/* Simulator Controls & Main Playground */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Step Timeline */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-mono font-semibold uppercase text-slate-400 tracking-wider">
                Execution Timeline
              </h3>
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`p-1.5 rounded-lg text-xs font-medium transition flex items-center space-x-1 ${
                    isPlaying
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-blue-600/20 text-cyan-300 border border-blue-500/30 hover:bg-blue-600/30'
                  }`}
                  title={isPlaying ? 'Pause' : 'Auto Play'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span className="text-[11px] font-mono">{isPlaying ? 'Pause' : 'Auto Play'}</span>
                </button>
                <button
                  onClick={handleStepForward}
                  disabled={currentStepIdx >= steps.length - 1}
                  className="p-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:text-white disabled:opacity-40 transition"
                  title="Next Step"
                >
                  <StepForward className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-400 hover:text-white transition"
                  title="Reset"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Stepper list */}
            <div className="space-y-2">
              {steps.map((step, idx) => {
                const isCurrent = idx === currentStepIdx;
                const isPassed = idx < currentStepIdx;

                let icon = <Cpu className="w-3.5 h-3.5" />;
                if (step.type === 'user_prompt') icon = <Sparkles className="w-3.5 h-3.5 text-blue-400" />;
                if (step.type === 'tool_execution') icon = <Terminal className="w-3.5 h-3.5 text-amber-400" />;
                if (step.type === 'patch_apply') icon = <FileCode className="w-3.5 h-3.5 text-cyan-400" />;
                if (step.type === 'final_answer') icon = <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />;

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setCurrentStepIdx(idx);
                      setIsPlaying(false);
                    }}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition flex items-start space-x-3 ${
                      isCurrent
                        ? 'bg-blue-600/15 border-cyan-500/50 text-white shadow-md shadow-blue-500/10'
                        : isPassed
                        ? 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/40'
                        : 'bg-slate-900/30 border-slate-900 text-slate-500'
                    }`}
                  >
                    <div
                      className={`p-1.5 rounded-lg shrink-0 ${
                        isCurrent
                          ? 'bg-cyan-500/20 text-cyan-300'
                          : isPassed
                          ? 'bg-slate-800 text-slate-400'
                          : 'bg-slate-900 text-slate-600'
                      }`}
                    >
                      {icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold truncate">{step.title}</span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {step.durationMs}ms
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Step Inspector & Diff Viewer */}
        <div className="lg:col-span-7">
          <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl">
            {/* View Tabs */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setInspectTab('visual')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono transition ${
                    inspectTab === 'visual'
                      ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Visual Trace
                </button>
                <button
                  onClick={() => setInspectTab('json')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono transition ${
                    inspectTab === 'json'
                      ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  SDK Payload (JSON)
                </button>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Action: <span className="text-cyan-300">{currentStep.type}</span>
              </span>
            </div>

            {inspectTab === 'visual' ? (
              <div className="space-y-4">
                {/* Step Detail Card */}
                <div className="p-4 rounded-xl bg-[#0B0F17] border border-slate-800">
                  <div className="text-sm font-bold text-white">{currentStep.title}</div>
                  <p className="text-xs text-slate-300 mt-1">{currentStep.description}</p>
                </div>

                {/* Diff Viewer if present */}
                {currentStep.diff && (
                  <div className="rounded-xl overflow-hidden border border-slate-800">
                    <div className="bg-slate-900 px-4 py-2 text-xs font-mono text-cyan-300 border-b border-slate-800 flex items-center justify-between">
                      <span className="flex items-center space-x-2">
                        <FileCode className="w-3.5 h-3.5" />
                        <span>Surgical Diff: {currentStep.diff.file}</span>
                      </span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                        Collision-free
                      </span>
                    </div>
                    <div className="p-4 bg-[#0B0F17] font-mono text-xs space-y-1">
                      <div className="text-rose-400 bg-rose-950/30 px-2 py-1 rounded border-l-2 border-rose-500 line-through">
                        - {currentStep.diff.original}
                      </div>
                      <div className="text-emerald-400 bg-emerald-950/30 px-2 py-1 rounded border-l-2 border-emerald-500 font-semibold">
                        + {currentStep.diff.modified}
                      </div>
                    </div>
                  </div>
                )}

                {/* Command Output if present */}
                {currentStep.payload?.command && (
                  <div className="rounded-xl overflow-hidden border border-slate-800">
                    <div className="bg-slate-900 px-4 py-2 text-xs font-mono text-amber-300 border-b border-slate-800 flex items-center space-x-2">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Sandbox Bash Execution: {currentStep.payload.command}</span>
                    </div>
                    <pre className="p-4 bg-[#0B0F17] font-mono text-xs text-slate-300 overflow-x-auto">
                      <code>{currentStep.payload.stdout}</code>
                    </pre>
                  </div>
                )}

                {/* Final Answer Banner if present */}
                {currentStep.payload?.finalAnswer && (
                  <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/30">
                    <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs font-mono mb-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Task Completed Successfully</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed font-sans">
                      {currentStep.payload.finalAnswer}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-xl overflow-hidden border border-slate-800">
                <div className="bg-slate-900 px-4 py-2 text-xs font-mono text-slate-400 border-b border-slate-800">
                  GenerateContentParameters / Response Payload
                </div>
                <pre className="p-4 bg-[#0B0F17] font-mono text-xs text-cyan-200 overflow-x-auto max-h-96">
                  <code>{JSON.stringify(currentStep, null, 2)}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
