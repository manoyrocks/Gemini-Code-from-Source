import React, { useState } from 'react';
import {
  Sparkles,
  MessageSquare,
  Image as ImageIcon,
  Video,
  Code2,
  Layers,
  Zap,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
  Search,
  Cpu,
  Brain,
  Sliders,
  ExternalLink,
  ChevronRight,
  Send,
  CornerDownRight,
  ShieldCheck,
  FileText,
  FileCode,
  Eye,
  Play
} from 'lucide-react';
import { GENAI_101_CONTENT, ChatSimulationTurn } from '../data/genai101Data';
import { GeminiModelsShowcase } from './GeminiModelsShowcase';
import { SearchVsGeminiChat } from './SearchVsGeminiChat';
import { ViewMode } from '../types/agent';

export interface GenAI101Props {
  onProceedNext?: () => void;
  onNavigate?: (view: ViewMode) => void;
}

export const GenAI101: React.FC<GenAI101Props> = ({ onProceedNext, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'models' | 'search-vs-chat' | 'journey' | 'prompting' | 'context' | 'intro'>('models');
  const [selectedSimulationId, setSelectedSimulationId] = useState<string>('coding-multimodal');
  const [selectedPromptCategory, setSelectedPromptCategory] = useState<string>('All');
  const [customUserPrompt, setCustomUserPrompt] = useState<string>('');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [simulatedChatHistory, setSimulatedChatHistory] = useState<Record<string, ChatSimulationTurn[]>>({});

  const activeSimulation =
    GENAI_101_CONTENT.chatSimulations.find((s) => s.id === selectedSimulationId) ||
    GENAI_101_CONTENT.chatSimulations[0];

  const currentChatTurns = simulatedChatHistory[selectedSimulationId] || activeSimulation.conversation;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleSendPrompt = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!customUserPrompt.trim()) return;

    const newTurnUser: ChatSimulationTurn = {
      role: 'user',
      text: customUserPrompt,
      timeAgo: 'Just now',
      modality: 'text',
    };

    const sanitizedPrompt = customUserPrompt.replace(/`/g, "'").replace(/"/g, "'");
    const newTurnGemini: ChatSimulationTurn = {
      role: 'gemini',
      text: [
        '### Gemini Analysis & Reasoning',
        '',
        'I evaluated your inquiry using **Gemini 2.5 / 3.x Flash Thinking**.',
        '',
        'Here is the synthesized breakdown:',
        '1. **Core Intent Identified**: Contextual understanding with zero-shot adaptation.',
        '2. **Grounding Verification**: Validated against Google Knowledge Base & Developer Documentation.',
        '3. **Recommended Next Step**: Integrate this pattern into your `@google/genai` SDK pipeline using structured `systemInstruction`.',
        '',
        '```typescript',
        '// Ingesting into Gemini multi-turn session:',
        'const response = await ai.models.generateContent({',
        "  model: 'gemini-2.5-flash',",
        '  contents: [',
        `    { role: 'user', parts: [{ text: "${sanitizedPrompt}" }] }`,
        '  ],',
        '  config: {',
        '    temperature: 0.2,',
        "    systemInstruction: 'You are an expert Google AI engineer.'",
        '  }',
        '});',
        '```'
      ].join('\n'),
      timeAgo: 'Just now',
      modality: 'code',
      thoughtProcess: [
        'Parsed user input for technical keywords & intent',
        'Cross-checked with Google Gemini context parameters',
        'Synthesized actionable SDK code pattern'
      ]
    };

    setSimulatedChatHistory((prev) => ({
      ...prev,
      [selectedSimulationId]: [...currentChatTurns, newTurnUser, newTurnGemini]
    }));
    setCustomUserPrompt('');
  };

  const handleResetChat = () => {
    setSimulatedChatHistory((prev) => {
      const copy = { ...prev };
      delete copy[selectedSimulationId];
      return copy;
    });
  };

  const filteredPromptExamples =
    selectedPromptCategory === 'All'
      ? GENAI_101_CONTENT.promptEngineering
      : GENAI_101_CONTENT.promptEngineering.filter((p) => p.category === selectedPromptCategory);

  const promptCategories = ['All', 'Everyday Work', 'Coding & Tech', 'Analysis & Reasoning'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-[#0D1527] to-[#080E1C] border border-blue-500/20 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-mono mb-3">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                <span>MODULE 1 · COMPREHENSIVE FOUNDATIONS</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                GenAI 101: The Gemini Journey
              </h1>
            </div>

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
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            {GENAI_101_CONTENT.intro.summary} Directly inspired by the real-world capabilities of{' '}
            <a
              href="https://gemini.google.com/app"
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline font-mono inline-flex items-center space-x-1"
            >
              <span>gemini.google.com/app</span>
              <ExternalLink className="w-3 h-3" />
            </a>.
          </p>

          {/* Quick Pillar Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
            {GENAI_101_CONTENT.intro.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 hover:border-cyan-500/40 transition group"
              >
                <div className="text-xs font-semibold text-cyan-300 flex items-center justify-between">
                  <span>{pillar.title}</span>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                    {pillar.stats}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5 leading-snug">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('models')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'models'
              ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Gemini Models & Use Cases</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            10 Models
          </span>
        </button>

        <button
          onClick={() => setActiveTab('search-vs-chat')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'search-vs-chat'
              ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Search className="w-4 h-4 text-blue-400" />
          <span>From Google Search to Gemini Chat</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
            Core Shift
          </span>
        </button>

        <button
          onClick={() => setActiveTab('journey')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'journey'
              ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Gemini Chat Journey (Simulated Samples)</span>
        </button>

        <button
          onClick={() => setActiveTab('prompting')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'prompting'
              ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Prompt Engineering for Everyday Users</span>
        </button>

        <button
          onClick={() => setActiveTab('context')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'context'
              ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Context Engineering & In-Memory Systems</span>
        </button>

        <button
          onClick={() => setActiveTab('intro')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'intro'
              ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Brain className="w-4 h-4" />
          <span>Under the Hood: Gemini Architecture</span>
        </button>
      </div>

      {/* TAB 0: GEMINI MODELS CATALOG & USE CASES */}
      {activeTab === 'models' && <GeminiModelsShowcase />}

      {/* TAB 0.5: FROM GOOGLE SEARCH TO GEMINI CHAT */}
      {activeTab === 'search-vs-chat' && <SearchVsGeminiChat />}

      {/* TAB 1: GEMINI CHAT JOURNEY (SIMULATED MULTIMODAL SAMPLES) */}
      {activeTab === 'journey' && (
        <div className="space-y-6">
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
                <span>Simulated Gemini App Multi-Modal Studio</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Experience how <span className="text-cyan-300 font-mono">gemini.google.com</span> processes images, video timelines, code solutions, and live grounded search.
              </p>
            </div>

            {/* Simulation Scenarios Switcher */}
            <div className="flex flex-wrap items-center gap-2">
              {GENAI_101_CONTENT.chatSimulations.map((sim) => (
                <button
                  key={sim.id}
                  onClick={() => setSelectedSimulationId(sim.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                    selectedSimulationId === sim.id
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-semibold'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80'
                  }`}
                >
                  {sim.name}
                </button>
              ))}
              <button
                onClick={handleResetChat}
                className="px-2.5 py-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-200 bg-slate-800/40 hover:bg-slate-800 cursor-pointer"
                title="Reset conversation"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Chat Window Container modeled after gemini.google.com */}
          <div className="bg-[#0A0E1A] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col min-h-[580px]">
            {/* Chat Header */}
            <div className="bg-[#0D1527] border-b border-slate-800 px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center font-bold text-slate-950 text-xs shadow-md shadow-cyan-500/20">
                  G
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center space-x-2">
                    <span>{activeSimulation.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                      {activeSimulation.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{activeSimulation.description}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-xs text-slate-400 font-mono">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-emerald-400 text-[11px]">Gemini 2.5 / 3.x Flash Thinking</span>
                </span>
              </div>
            </div>

            {/* Conversation Flow */}
            <div className="flex-1 p-4 sm:p-6 space-y-6 overflow-y-auto">
              {currentChatTurns.map((turn, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-3 max-w-4xl ${
                    turn.role === 'user' ? 'ml-auto flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                      turn.role === 'user'
                        ? 'bg-slate-700 text-white'
                        : 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 text-slate-950'
                    }`}
                  >
                    {turn.role === 'user' ? 'U' : '✦'}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`rounded-2xl p-4 text-xs leading-relaxed max-w-2xl sm:max-w-3xl space-y-3 ${
                      turn.role === 'user'
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10'
                        : 'bg-[#11192A] border border-slate-800 text-slate-200'
                    }`}
                  >
                    {/* Media Attachments (Image / Video Simulation) */}
                    {turn.media && (
                      <div className="rounded-xl overflow-hidden border border-slate-700/60 bg-black/40 p-3 space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-mono text-cyan-300">
                          <span className="flex items-center space-x-1.5">
                            {turn.media.type === 'image' ? (
                              <ImageIcon className="w-3.5 h-3.5" />
                            ) : (
                              <Video className="w-3.5 h-3.5 text-red-400" />
                            )}
                            <span className="font-semibold">{turn.media.caption}</span>
                          </span>
                          {turn.media.duration && (
                            <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                              Duration: {turn.media.duration}
                            </span>
                          )}
                        </div>

                        {/* Visual Mock representation */}
                        {turn.media.type === 'image' && (
                          <div className="bg-slate-950 rounded-lg p-3 border border-slate-800 font-mono text-[11px] text-red-300 space-y-1">
                            <div className="text-slate-400 text-[10px]"># Optical Character Recognition (OCR) Stream:</div>
                            <div className="text-red-400">Failed to load resource: net::ERR_CERT_AUTHORITY_INVALID</div>
                            <div className="text-slate-400">Request: https://staging-auth.internal:8443/oauth2/v1/auth</div>
                            <div className="text-yellow-400">Android CA Trust Store: Certificate was issued by unknown CA</div>
                          </div>
                        )}

                        {turn.media.type === 'video' && (
                          <div className="bg-slate-950 rounded-lg p-3 border border-slate-800 space-y-2">
                            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                              <span>00:00</span>
                              <span className="text-red-400 font-semibold">⚠ Spike at 03:42</span>
                              <span>08:14</span>
                            </div>
                            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex">
                              <div className="w-[45%] bg-emerald-500"></div>
                              <div className="w-[10%] bg-red-500 animate-pulse"></div>
                              <div className="w-[45%] bg-red-800"></div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-slate-400 pt-1">
                              <div>Heap: 42MB → 780MB</div>
                              <div>FPS: 60 → 4 FPS</div>
                              <div>Nodes: +3,200 SVG</div>
                            </div>
                          </div>
                        )}

                        {turn.media.metadata && (
                          <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-800">
                            {Object.entries(turn.media.metadata).map(([k, v]) => (
                              <span
                                key={k}
                                className="text-[10px] font-mono bg-slate-800/80 px-2 py-0.5 rounded text-slate-300"
                              >
                                <strong className="text-slate-400">{k}:</strong> {v}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Thinking Process Accordion (System 2 reasoning in Gemini 2.5 / 3.x Flash Thinking) */}
                    {turn.thoughtProcess && (
                      <div className="bg-slate-950/60 border border-indigo-500/20 rounded-xl p-3 space-y-1.5">
                        <div className="flex items-center space-x-2 text-[11px] font-semibold text-indigo-300">
                          <Brain className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Thinking Process (Internal Scratchpad)</span>
                        </div>
                        <ul className="space-y-1 text-[11px] text-slate-400 list-disc list-inside">
                          {turn.thoughtProcess.map((tp, i) => (
                            <li key={i}>{tp}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Text Body */}
                    <div className="whitespace-pre-line text-xs sm:text-sm leading-relaxed text-slate-200">
                      {turn.text}
                    </div>

                    {/* Grounding Sources (Google Search Citations) */}
                    {turn.groundingSources && (
                      <div className="pt-2 border-t border-slate-800 space-y-2">
                        <div className="text-[11px] font-semibold text-cyan-300 flex items-center space-x-1.5">
                          <Search className="w-3 h-3 text-cyan-400" />
                          <span>Grounded by Google Search</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {turn.groundingSources.map((src, i) => (
                            <a
                              key={i}
                              href={src.url}
                              target="_blank"
                              rel="noreferrer"
                              className="bg-slate-950/80 border border-slate-800 p-2.5 rounded-lg hover:border-cyan-500/40 transition block group"
                            >
                              <div className="text-[11px] font-semibold text-slate-200 group-hover:text-cyan-300 truncate">
                                {src.title}
                              </div>
                              <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5">
                                {src.snippet}
                              </p>
                              <div className="text-[9px] font-mono text-cyan-400/80 mt-1 truncate">
                                {src.url}
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Composer (gemini.google.com style) */}
            <div className="p-4 bg-[#0D1527] border-t border-slate-800">
              <form onSubmit={handleSendPrompt} className="relative flex items-center">
                <input
                  type="text"
                  value={customUserPrompt}
                  onChange={(e) => setCustomUserPrompt(e.target.value)}
                  placeholder="Ask Gemini a follow-up, test a prompt, or paste code..."
                  className="w-full bg-[#070A11] border border-slate-700/80 rounded-xl pl-4 pr-24 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition shadow-inner"
                />
                <div className="absolute right-2 flex items-center space-x-1">
                  <button
                    type="submit"
                    disabled={!customUserPrompt.trim()}
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-30 disabled:pointer-events-none text-white text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer"
                  >
                    <span>Ask</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
              <div className="flex items-center justify-between mt-2 text-[10px] text-slate-500 font-mono px-1">
                <span>Multi-turn memory active · Grounded with Google Search</span>
                <span>Press Enter to simulate turn</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PROMPT ENGINEERING FOR EVERYDAY USERS */}
      {activeTab === 'prompting' && (
        <div className="space-y-6">
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Sliders className="w-5 h-5 text-cyan-400" />
                  <span>Everyday Prompt Engineering & The R-C-T-F Framework</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Compare naive prompts side-by-side with professionally engineered prompts used by Google AI engineers.
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-1.5">
                {promptCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedPromptCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                      selectedPromptCategory === cat
                        ? 'bg-blue-600 text-white font-semibold shadow-sm'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Examples Cards */}
          <div className="space-y-6">
            {filteredPromptExamples.map((item) => (
              <div
                key={item.id}
                className="bg-[#0D1527] border border-slate-800 rounded-2xl overflow-hidden shadow-xl"
              >
                {/* Header */}
                <div className="bg-slate-900/90 px-5 py-3.5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                      {item.category}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-1">{item.title}</h3>
                    <p className="text-xs text-slate-400">{item.scenario}</p>
                  </div>
                  <div className="text-right sm:text-right">
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                      Protocol: {item.technique}
                    </span>
                  </div>
                </div>

                {/* Side-by-Side Comparison */}
                <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
                  {/* Naive Prompt Side */}
                  <div className="p-5 space-y-3 bg-red-950/5">
                    <div className="flex items-center justify-between text-xs font-semibold text-rose-400">
                      <span>✕ Naive / Everyday Prompt</span>
                      <span className="text-[10px] font-mono text-rose-400/70">High Hallucination Risk</span>
                    </div>

                    <div className="bg-slate-950 border border-rose-900/30 rounded-xl p-3 text-xs font-mono text-slate-300">
                      "{item.naivePrompt}"
                    </div>

                    <div>
                      <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        Typical Subpar Output:
                      </div>
                      <div className="bg-slate-900/60 rounded-xl p-3 text-xs text-slate-400 whitespace-pre-line border border-slate-800 italic">
                        {item.naiveOutput}
                      </div>
                    </div>
                  </div>

                  {/* Engineered Prompt Side */}
                  <div className="p-5 space-y-3 bg-emerald-950/5">
                    <div className="flex items-center justify-between text-xs font-semibold text-emerald-400">
                      <span>✓ Engineered Prompt (Structured)</span>
                      <button
                        onClick={() => handleCopy(item.engineeredPrompt, item.id)}
                        className="flex items-center space-x-1 text-[10px] text-cyan-400 hover:text-cyan-300 cursor-pointer font-mono"
                      >
                        {copiedCodeId === item.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Prompt</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="bg-slate-950 border border-emerald-900/30 rounded-xl p-3 text-xs font-mono text-slate-200 whitespace-pre-line max-h-48 overflow-y-auto">
                      {item.engineeredPrompt}
                    </div>

                    <div>
                      <div className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                        High-Fidelity Output:
                      </div>
                      <div className="bg-slate-900/80 rounded-xl p-3 text-xs text-slate-200 whitespace-pre-line border border-slate-800">
                        {item.engineeredOutput}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Best Practice Tips Footer */}
                <div className="bg-slate-950/80 px-5 py-3 border-t border-slate-800 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <span className="text-cyan-300 font-semibold flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Why This Works:</span>
                  </span>
                  {item.tips.map((tip, idx) => (
                    <span key={idx} className="text-slate-300 text-[11px]">
                      • {tip}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CONTEXT ENGINEERING & IN-MEMORY SYSTEMS */}
      {activeTab === 'context' && (
        <div className="space-y-6">
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              <span>Context Engineering: The 2026 Shift from Prompting to Context Systems</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              "Prompt engineering" targets single strings; <strong>Context Engineering</strong> manages the entire lifecycle of KV caches, long-context attention distribution, system instructions, and tool schemas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GENAI_101_CONTENT.contextEngineering.map((concept) => (
              <div
                key={concept.id}
                className="bg-[#0D1527] border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center space-x-2 text-cyan-300 font-bold text-sm">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    <span>{concept.title}</span>
                  </div>

                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {concept.summary}
                  </p>

                  <div className="mt-4 space-y-2">
                    <div className="p-2.5 rounded-lg bg-blue-950/20 border border-blue-900/30 text-[11px] text-blue-200">
                      <strong className="text-cyan-300 block mb-0.5">gemini.google.com Behavior:</strong>
                      {concept.geminiAppBehavior}
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-300">
                      <strong className="text-slate-400 block mb-0.5 font-sans">@google/genai SDK Equivalent:</strong>
                      {concept.sdkEquivalent}
                    </div>
                  </div>

                  {/* Contrast comparison */}
                  <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-1 gap-2 text-[11px]">
                    <div className="p-2 rounded bg-rose-950/20 border border-rose-900/30 text-rose-300">
                      <strong>✕ Naive anti-pattern:</strong> {concept.visualComparison.badApproach}
                    </div>
                    <div className="p-2 rounded bg-emerald-950/20 border border-emerald-900/30 text-emerald-300">
                      <strong>✓ Gemini architecture:</strong> {concept.visualComparison.geminiApproach}
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800 leading-relaxed mt-2">
                  <strong className="text-slate-300">Deep Architectural Dive:</strong> {concept.deepDive}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: UNDER THE HOOD: GEMINI ARCHITECTURE */}
      {activeTab === 'intro' && (
        <div className="space-y-6">
          <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Brain className="w-5 h-5 text-indigo-400" />
              <span>The Engineering Pillars of Google Gemini Models</span>
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Google's Gemini model family represents a fundamental departure from retrofitted LLMs. Understanding these hardware and algorithmic innovations is essential for both building with Gemini and interviewing for Google AI roles.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-cyan-300">TPU v5p & Ironwood Pods</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Trained across thousands of Google Tensor Processing Unit (TPU) accelerators utilizing optical circuit switching (OCS) for ultra-low latency cross-pod all-reduce gradients.
                </p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-indigo-300">Native Multi-Modal Tokenizer</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Audio spectrograms, video frames, text subwords, and image patches map directly into shared embedding space without translating through intermediate text captions.
                </p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-emerald-300">RingAttention & 2M Context</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  RingAttention overlaps communication and memory during attention matrix computation, enabling 1M to 2M tokens without O(N^2) memory bottlenecks on a single TPU device.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/20 border border-blue-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-white">Ready to explore autonomous coding agents?</h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Proceed to <strong>Autonomous Coding Agent</strong> (18 Chapters) or test your knowledge in the <strong>AI SoftEng Interview Lab</strong>.
              </p>
            </div>
            <a
              href="#architecture-book-reader"
              onClick={() => setActiveTab('journey')}
              className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition cursor-pointer shrink-0 shadow-lg shadow-cyan-500/20"
            >
              Continue Learning →
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
