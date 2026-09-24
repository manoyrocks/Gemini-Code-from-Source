/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  AGENTIC_AI_CONTENT,
  AgentSample,
  AgentStepTrace
} from '../data/agenticAIData';
import {
  Bot,
  Sparkles,
  ExternalLink,
  Cpu,
  Layers,
  Terminal,
  Play,
  RotateCcw,
  CheckCircle2,
  Copy,
  Check,
  ChevronRight,
  Search,
  Code2,
  Server,
  Network,
  ShieldCheck,
  ArrowRight,
  Database,
  FastForward,
  Wrench,
  AlertTriangle,
  FileCode,
  Globe
} from 'lucide-react';

export interface AgenticAIProps {
  onProceedNext?: () => void;
}

export const AgenticAI: React.FC<AgenticAIProps> = ({ onProceedNext }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'simulator' | 'samples' | 'frameworks'>('simulator');
  const [selectedAgentId, setSelectedAgentId] = useState<string>(AGENTIC_AI_CONTENT.sampleAgents[0].id);
  const [activeTraceStepIndex, setActiveTraceStepIndex] = useState<number>(0);
  const [isPlayingSimulation, setIsPlayingSimulation] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeCodeFileIdx, setActiveCodeFileIdx] = useState<number>(0);

  const selectedAgent: AgentSample =
    AGENTIC_AI_CONTENT.sampleAgents.find((a) => a.id === selectedAgentId) ||
    AGENTIC_AI_CONTENT.sampleAgents[0];

  // Auto-play simulation effect
  useEffect(() => {
    let timer: any;
    if (isPlayingSimulation) {
      if (activeTraceStepIndex < selectedAgent.executionTraces.length - 1) {
        timer = setTimeout(() => {
          setActiveTraceStepIndex((prev) => prev + 1);
        }, 1400);
      } else {
        setIsPlayingSimulation(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isPlayingSimulation, activeTraceStepIndex, selectedAgent.executionTraces.length]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const currentStep = selectedAgent.executionTraces[activeTraceStepIndex] || selectedAgent.executionTraces[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-100">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#081525] via-[#0B1220] to-[#140D24] border border-cyan-500/20 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5" />
              Module 4 · Agentic AI
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Official Google GenAI Documentation
            </span>
            <a
              href={AGENTIC_AI_CONTENT.header.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition-colors ml-auto group"
            >
              <span className="group-hover:underline">ai.google.dev/gemini-api/docs/agents</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <span>{AGENTIC_AI_CONTENT.header.title}</span>
            </h1>

            {onProceedNext && (
              <button
                onClick={onProceedNext}
                className="inline-flex items-center space-x-2.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition active:scale-95 cursor-pointer shrink-0 self-start md:self-center group"
              >
                <span>Proceed to next module --&gt;</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            )}
          </div>

          <p className="text-slate-300 text-sm sm:text-base max-w-4xl leading-relaxed">
            {AGENTIC_AI_CONTENT.header.description}
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3">
            {AGENTIC_AI_CONTENT.header.metrics.map((m, idx) => (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 backdrop-blur-sm"
              >
                <div className="text-[11px] font-medium text-slate-400">{m.label}</div>
                <div className="text-xs sm:text-sm font-bold text-cyan-200 truncate mt-0.5">
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-800 space-x-2 sm:space-x-4 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex items-center space-x-2 py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition whitespace-nowrap cursor-pointer ${
            activeTab === 'simulator'
              ? 'border-emerald-400 text-emerald-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Play className="w-4 h-4 text-emerald-400" />
          <span>Interactive Agent Simulator & Traces</span>
        </button>

        <button
          onClick={() => setActiveTab('samples')}
          className={`flex items-center space-x-2 py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition whitespace-nowrap cursor-pointer ${
            activeTab === 'samples'
              ? 'border-cyan-400 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Code2 className="w-4 h-4 text-cyan-400" />
          <span>5 Production Gemini Agent Samples</span>
        </button>

        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center space-x-2 py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition whitespace-nowrap cursor-pointer ${
            activeTab === 'overview'
              ? 'border-indigo-400 text-indigo-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4 text-indigo-400" />
          <span>Google Docs: Architecture & Skills</span>
        </button>

        <button
          onClick={() => setActiveTab('frameworks')}
          className={`flex items-center space-x-2 py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition whitespace-nowrap cursor-pointer ${
            activeTab === 'frameworks'
              ? 'border-purple-400 text-purple-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Network className="w-4 h-4 text-purple-400" />
          <span>Multi-Agent Topologies & Framework Matrix</span>
        </button>
      </div>

      {/* TAB 1: INTERACTIVE AGENT SIMULATOR & STEP-BY-STEP TRACES */}
      {activeTab === 'simulator' && (
        <div className="space-y-6">
          {/* Agent Selection Pill Bar */}
          <div className="flex items-center justify-between flex-wrap gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Select Gemini Agent to Simulate:
              </div>
              <div className="text-sm font-bold text-white mt-0.5 flex items-center gap-2">
                <span>{selectedAgent.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {selectedAgent.geminiModel}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {AGENTIC_AI_CONTENT.sampleAgents.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => {
                    setSelectedAgentId(agent.id);
                    setActiveTraceStepIndex(0);
                    setIsPlayingSimulation(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    selectedAgentId === agent.id
                      ? 'bg-emerald-600 text-white font-semibold shadow-md shadow-emerald-600/30'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {agent.name.split(':')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Simulator Main Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Trace Step Timeline */}
            <div className="lg:col-span-5 bg-slate-900/80 rounded-2xl border border-slate-800 p-5 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Step-by-Step ReAct Trace
                    </span>
                  </div>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                    Step {activeTraceStepIndex + 1} of {selectedAgent.executionTraces.length}
                  </span>
                </div>

                {/* Step List */}
                <div className="space-y-2 mt-4 max-h-[460px] overflow-y-auto pr-1">
                  {selectedAgent.executionTraces.map((step, idx) => {
                    const isActive = idx === activeTraceStepIndex;
                    const isCompleted = idx < activeTraceStepIndex;

                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setActiveTraceStepIndex(idx);
                          setIsPlayingSimulation(false);
                        }}
                        className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-start space-x-3 ${
                          isActive
                            ? 'bg-slate-800/90 border-emerald-500/60 ring-1 ring-emerald-500/30 shadow-md'
                            : isCompleted
                            ? 'bg-slate-900/40 border-slate-800/60 hover:bg-slate-800/50 text-slate-300'
                            : 'bg-slate-900/20 border-slate-800/30 text-slate-500 hover:text-slate-400'
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                            isActive
                              ? 'bg-emerald-500 text-slate-950'
                              : isCompleted
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-slate-800 text-slate-500'
                          }`}
                        >
                          {isCompleted ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-semibold truncate text-white">
                              {step.title}
                            </span>
                            <span
                              className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-mono ${
                                step.phase === 'thought'
                                  ? 'bg-blue-500/20 text-blue-300'
                                  : step.phase === 'tool_call'
                                  ? 'bg-amber-500/20 text-amber-300'
                                  : step.phase === 'tool_result'
                                  ? 'bg-purple-500/20 text-purple-300'
                                  : 'bg-emerald-500/20 text-emerald-300'
                              }`}
                            >
                              {step.phase.replace('_', ' ')}
                            </span>
                          </div>
                          {step.toolName && (
                            <div className="text-[11px] font-mono text-cyan-300/80 mt-1 truncate">
                              &gt; {step.toolName}()
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Simulation Player Controls */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsPlayingSimulation(!isPlayingSimulation)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition active:scale-95 cursor-pointer shadow-md shadow-emerald-600/30"
                  >
                    {isPlayingSimulation ? (
                      <>
                        <span className="w-2 h-2 rounded-sm bg-white animate-pulse" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Auto Play</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      if (activeTraceStepIndex < selectedAgent.executionTraces.length - 1) {
                        setActiveTraceStepIndex((prev) => prev + 1);
                      }
                    }}
                    disabled={activeTraceStepIndex >= selectedAgent.executionTraces.length - 1}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition disabled:opacity-40 cursor-pointer"
                  >
                    <span>Next</span>
                    <FastForward className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => {
                    setActiveTraceStepIndex(0);
                    setIsPlayingSimulation(false);
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition cursor-pointer"
                  title="Reset to Step 1"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: Execution Terminal & Tool State Inspector */}
            <div className="lg:col-span-7 bg-[#090D16] rounded-2xl border border-slate-800 p-5 space-y-5 flex flex-col justify-between">
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Sandbox State & Tool Inspector
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[11px] font-mono text-emerald-400">Sandbox Active</span>
                  </div>
                </div>

                {/* Current Active Step Details */}
                <div className="space-y-4 mt-4">
                  {/* Step Title & Phase */}
                  <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-cyan-300 uppercase tracking-wide">
                        Phase: {currentStep.phase.replace('_', ' ')}
                      </span>
                      {currentStep.durationMs && (
                        <span className="text-[11px] font-mono text-slate-400">
                          ⏱ {currentStep.durationMs}ms latency
                        </span>
                      )}
                    </div>
                    <div className="text-base font-bold text-white">{currentStep.title}</div>
                  </div>

                  {/* Thought / Reasoning */}
                  {currentStep.thought && (
                    <div className="bg-blue-950/30 border border-blue-500/30 p-4 rounded-xl space-y-2">
                      <div className="text-xs font-semibold text-blue-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                        <span>Gemini Internal Reasoning (Thought / Hypothesis):</span>
                      </div>
                      <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed italic">
                        &ldquo;{currentStep.thought}&rdquo;
                      </p>
                    </div>
                  )}

                  {/* Tool Call Invocation */}
                  {currentStep.toolName && (
                    <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden">
                      <div className="px-4 py-2 bg-slate-800/70 border-b border-slate-700/80 flex items-center justify-between">
                        <span className="text-xs font-mono text-amber-300 flex items-center gap-1.5">
                          <Wrench className="w-3.5 h-3.5 text-amber-400" />
                          <span>Tool Invocation: {currentStep.toolName}</span>
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">JSON Parameters</span>
                      </div>
                      <pre className="p-4 text-xs font-mono text-amber-200/90 overflow-x-auto bg-[#070A11]">
                        {JSON.stringify(currentStep.toolArgs, null, 2)}
                      </pre>
                    </div>
                  )}

                  {/* Tool Result / Sandbox Observation */}
                  {currentStep.toolOutput && (
                    <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden">
                      <div className="px-4 py-2 bg-slate-800/70 border-b border-slate-700/80 flex items-center justify-between">
                        <span className="text-xs font-mono text-emerald-300 flex items-center gap-1.5">
                          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Observation / Output Stream</span>
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">Stdout / Exit 0</span>
                      </div>
                      <pre className="p-4 text-xs font-mono text-emerald-200/90 overflow-x-auto whitespace-pre-wrap bg-[#070A11] max-h-52">
                        {typeof currentStep.toolOutput === 'string'
                          ? currentStep.toolOutput
                          : JSON.stringify(currentStep.toolOutput, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </div>

              {/* Agent Tools Available in this environment */}
              <div className="pt-3 border-t border-slate-800/80">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Tools Available to this Agent:
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedAgent.tools.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-800/80 text-cyan-300 border border-slate-700/70"
                      title={t.description}
                    >
                      {t.name}()
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 5 PRODUCTION GEMINI AGENT SAMPLES (DETAILED REPOS & CODE) */}
      {activeTab === 'samples' && (
        <div className="space-y-6">
          {/* Agent Category Selector Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {AGENTIC_AI_CONTENT.sampleAgents.map((agent) => {
              const isSelected = agent.id === selectedAgentId;
              return (
                <button
                  key={agent.id}
                  onClick={() => {
                    setSelectedAgentId(agent.id);
                    setActiveCodeFileIdx(0);
                  }}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500/60 ring-1 ring-cyan-500/30 shadow-lg'
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider mb-1">
                    {agent.category}
                  </div>
                  <div className="font-bold text-white text-sm leading-snug line-clamp-2">
                    {agent.name}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-2 flex items-center justify-between">
                    <span>{agent.geminiModel}</span>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Selected Sample Display */}
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {selectedAgent.agentType}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Model: {selectedAgent.geminiModel}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white mt-1.5">{selectedAgent.name}</h2>
                <p className="text-slate-300 text-sm mt-1 max-w-3xl">
                  {selectedAgent.description}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setActiveTab('simulator');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2 transition active:scale-95 shadow-md shadow-emerald-600/25 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Test in Simulator</span>
                </button>
                <a
                  href={selectedAgent.sourceDocUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition"
                  title="View Official Documentation"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {selectedAgent.keyHighlights.map((h, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/90 flex items-start space-x-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-200 leading-snug">{h}</span>
                </div>
              ))}
            </div>

            {/* System Instructions / Prompt Engineering Card */}
            <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  Agent System Instruction Blueprint
                </span>
                <button
                  onClick={() => handleCopy(selectedAgent.systemInstructions, 'prompt')}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition"
                >
                  {copiedCode === 'prompt' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied Prompt</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Instructions</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="text-xs font-mono text-slate-300 p-3 bg-[#070A11] rounded-lg border border-slate-800/80 overflow-x-auto whitespace-pre-wrap">
                {selectedAgent.systemInstructions}
              </pre>
            </div>

            {/* Full Runnable Code Snippets */}
            <div className="rounded-xl border border-slate-800 overflow-hidden bg-[#070A11]">
              <div className="px-4 py-3 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileCode className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold font-mono text-white">
                    {selectedAgent.codeSnippets[activeCodeFileIdx]?.filename || 'agent.ts'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    (@google/genai TypeScript SDK)
                  </span>
                </div>

                <button
                  onClick={() =>
                    handleCopy(
                      selectedAgent.codeSnippets[activeCodeFileIdx]?.code || '',
                      'snippet'
                    )
                  }
                  className="px-3 py-1 rounded-md text-xs font-medium bg-slate-700/80 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition"
                >
                  {copiedCode === 'snippet' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied Code</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-5 text-xs font-mono text-cyan-100/90 overflow-x-auto leading-relaxed bg-[#070A11]">
                {selectedAgent.codeSnippets[activeCodeFileIdx]?.code}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GOOGLE DOCS ARCHITECTURE & SKILLS STANDARD */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Official Google Docs Intro */}
          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Bot className="w-5 h-5 text-emerald-400" />
              <span>Google GenAI Official Agent Specifications</span>
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed max-w-4xl">
              According to the official Google Gemini documentation (
              <a
                href="https://ai.google.dev/gemini-api/docs/agents"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 underline hover:text-cyan-300"
              >
                ai.google.dev/gemini-api/docs/agents
              </a>
              ), an agent is an autonomous system that uses Gemini as its reasoning engine to perceive its environment, formulate multi-step plans, call tools (file edits, bash execution, web search), and execute actions within a secure Google-hosted Linux sandbox.
            </p>
          </div>

          {/* 5 Core Capabilities Sections */}
          <div className="space-y-6">
            {AGENTIC_AI_CONTENT.coreCapabilities.map((cap) => (
              <div
                key={cap.id}
                className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-4 hover:border-slate-700 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-bold text-white">{cap.title}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {cap.badge}
                    </span>
                  </div>
                  <a
                    href={cap.googleDocRef}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition"
                  >
                    <span>View Docs</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <p className="text-sm text-slate-300">{cap.summary}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Points */}
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Architectural Pillars:
                    </div>
                    <ul className="space-y-2">
                      {cap.architecturePoints.map((pt, i) => (
                        <li key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                          <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Code Sample */}
                  <div className="bg-[#070A11] rounded-xl border border-slate-800 p-4 font-mono text-xs text-cyan-200 overflow-x-auto max-h-56">
                    <pre>{cap.codeSnippet}</pre>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quickstart 3 Steps */}
          <div className="bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-purple-950/40 border border-indigo-500/30 p-6 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Get Started with Gemini Agents in 3 Steps</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {AGENTIC_AI_CONTENT.quickstartSteps.map((s, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2"
                >
                  <div className="text-2xl font-black text-indigo-400 font-mono">{s.step}</div>
                  <div className="font-bold text-white text-sm">{s.title}</div>
                  <p className="text-xs text-slate-400">{s.description}</p>
                  <div className="bg-slate-950 px-2.5 py-1.5 rounded text-[11px] font-mono text-cyan-300 border border-slate-800/80">
                    {s.command}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: MULTI-AGENT TOPOLOGIES & FRAMEWORK MATRIX */}
      {activeTab === 'frameworks' && (
        <div className="space-y-8">
          {/* Topologies Explained */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                <Network className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">1. Router / Triage Agent</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                A lightweight classifier model receives user prompts and assigns them dynamically to specialized domain subagents (e.g. Code Agent, DB Agent, Compliance Agent).
              </p>
              <div className="text-[11px] font-mono text-cyan-400 bg-slate-950 p-2 rounded border border-slate-800">
                User &rarr; Router &rarr; [Specialist A | Specialist B]
              </div>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">2. Supervisor / Orchestrator</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Central planner decomposes complex tasks into DAGs of dependencies, executes workers in parallel or sequence, and synthesizes intermediate outputs into a coherent result.
              </p>
              <div className="text-[11px] font-mono text-purple-300 bg-slate-950 p-2 rounded border border-slate-800">
                Supervisor &rarr; Plan DAG &rarr; Execute Workers &rarr; Synthesize
              </div>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <RotateCcw className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">3. Evaluator-Optimizer (Reflexion)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                A Generator agent drafts an implementation. A Critic/Evaluator agent executes unit tests or linter checks. If failed, it loops back with structured feedback until solved.
              </p>
              <div className="text-[11px] font-mono text-emerald-400 bg-slate-950 p-2 rounded border border-slate-800">
                Generator &rarr; Critic Review &rarr; (Pass ? Done : Refine Loop)
              </div>
            </div>
          </div>

          {/* Framework Comparison Matrix */}
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">
                  Agent Frameworks & Runtime Ecosystem Comparison
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  How Google Managed Agents compare to custom ADK, LangGraph, and Vertex AI Agent Builder
                </p>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-lg border border-cyan-500/30">
                2026 Landscape
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 uppercase tracking-wider font-mono">
                  <tr>
                    <th className="py-3.5 px-4 font-semibold">Framework</th>
                    <th className="py-3.5 px-4 font-semibold">Deployment & Sandbox</th>
                    <th className="py-3.5 px-4 font-semibold">Key Strengths</th>
                    <th className="py-3.5 px-4 font-semibold">Best Suited For</th>
                    <th className="py-3.5 px-4 font-semibold">Code Complexity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {AGENTIC_AI_CONTENT.frameworkComparisons.map((fc, idx) => (
                    <tr key={idx} className="hover:bg-slate-850/50 transition">
                      <td className="py-4 px-4 font-bold text-white flex flex-col">
                        <span>{fc.name}</span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          {fc.developer}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-mono text-cyan-300">
                        {fc.deployment}
                      </td>
                      <td className="py-4 px-4 text-slate-300 max-w-xs">
                        {fc.strengths}
                      </td>
                      <td className="py-4 px-4 text-slate-200">
                        {fc.bestFor}
                      </td>
                      <td className="py-4 px-4 font-mono font-semibold text-emerald-400">
                        {fc.codeComplexity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
