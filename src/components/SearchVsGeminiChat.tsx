import React, { useState } from 'react';
import {
  Search,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Zap,
  Globe,
  ExternalLink,
  Code2,
  Copy,
  Check,
  Brain,
  Layers,
  FileText,
  HelpCircle,
  Clock,
  Shuffle,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Database,
  RefreshCw,
  Cpu
} from 'lucide-react';
import {
  SEARCH_VS_CHAT_PIPELINE,
  SEARCH_VS_CHAT_SAMPLES,
  SearchVsChatComparisonSample
} from '../data/searchVsChatData';

export const SearchVsGeminiChat: React.FC = () => {
  const [selectedSampleId, setSelectedSampleId] = useState<string>('sample-debugging');
  const [activePipelineStage, setActivePipelineStage] = useState<number>(0);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const selectedSample: SearchVsChatComparisonSample =
    SEARCH_VS_CHAT_SAMPLES.find((s) => s.id === selectedSampleId) || SEARCH_VS_CHAT_SAMPLES[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-[#0B1528] to-[#080E1A] border border-cyan-500/20 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Paradigm Shift: From Index Retrieval to Cognitive Synthesis</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            From Google Search to Gemini Chat
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            For over two decades, computing relied on <strong className="text-white">Information Retrieval</strong>: indexing static pages created by others and forcing you, the user, to act as the cognitive synthesis engine. <strong className="text-cyan-400">Gemini Chat</strong> transforms this into <strong className="text-white">Generative Intelligence</strong>: accepting unstructured multimodal nuance, executing live reasoning, and synthesizing bespoke solutions directly for your unique constraints.
          </p>

          {/* Quick Metrics of the Shift */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80">
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <div className="text-[11px] font-mono text-slate-400 uppercase">Input Paradigm</div>
              <div className="text-sm font-bold text-white mt-0.5">Keywords → Conversational Intent</div>
              <div className="text-[11px] text-slate-400 mt-1">From Boolean operators to full code repositories and PDFs</div>
            </div>

            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <div className="text-[11px] font-mono text-slate-400 uppercase">Processing Engine</div>
              <div className="text-sm font-bold text-cyan-300 mt-0.5">Inverted Index → 1M Neural Attention</div>
              <div className="text-[11px] text-slate-400 mt-1">From static page ranking to deep contextual reasoning & live tools</div>
            </div>

            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <div className="text-[11px] font-mono text-slate-400 uppercase">Output Delivery</div>
              <div className="text-sm font-bold text-emerald-300 mt-0.5">10 Blue Links → Finished Artifacts</div>
              <div className="text-[11px] text-slate-400 mt-1">From tab-juggling to drop-in code patches and tailored answers</div>
            </div>
          </div>
        </div>
      </div>

      {/* The 4-Stage Input-to-Output Architecture Breakdown */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              <span>Input-to-Output Pipeline Breakdown</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Step through each phase of the journey to understand how the mechanical architecture differs under the hood.
            </p>
          </div>

          <div className="flex items-center space-x-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800 self-start">
            {SEARCH_VS_CHAT_PIPELINE.map((p, idx) => (
              <button
                key={p.stage}
                onClick={() => setActivePipelineStage(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activePipelineStage === idx
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                Stage {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Pipeline Stage Card */}
        {(() => {
          const currentStage = SEARCH_VS_CHAT_PIPELINE[activePipelineStage];
          return (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                    {currentStage.stage}
                  </span>
                  <span className="text-sm font-semibold text-white">Architectural Contrast</span>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  Phase {activePipelineStage + 1} of 4
                </span>
              </div>

              {/* Side-by-Side Comparison of this Stage */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Google Search Side */}
                <div className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-5 space-y-3 relative">
                  <div className="flex items-center space-x-2 text-slate-300 font-semibold text-sm">
                    <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                      <Search className="w-4 h-4" />
                    </div>
                    <span>Google Search: {currentStage.googleSearchApproach.title}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentStage.googleSearchApproach.description}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold">
                      Key Characteristics:
                    </div>
                    {currentStage.googleSearchApproach.characteristics.map((c, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-slate-400">
                        <span className="text-blue-400 font-bold">•</span>
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded-lg">
                    <span className="font-semibold text-slate-300">Mental Analogy: </span>
                    {currentStage.googleSearchApproach.analogy}
                  </div>
                </div>

                {/* Gemini Chat Side */}
                <div className="bg-slate-950/70 border border-cyan-500/30 rounded-xl p-5 space-y-3 relative shadow-lg shadow-cyan-500/5">
                  <div className="flex items-center space-x-2 text-cyan-300 font-semibold text-sm">
                    <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <span>Gemini Chat: {currentStage.geminiChatApproach.title}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentStage.geminiChatApproach.description}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold">
                      Key Characteristics:
                    </div>
                    {currentStage.geminiChatApproach.characteristics.map((c, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-cyan-500/20 text-[11px] text-slate-300 bg-cyan-950/20 p-2.5 rounded-lg border border-cyan-500/20">
                    <span className="font-semibold text-cyan-300">Mental Analogy: </span>
                    {currentStage.geminiChatApproach.analogy}
                  </div>
                </div>
              </div>

              {/* Bottom Stage Takeaway */}
              <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/20 flex items-center space-x-3 text-xs">
                <Lightbulb className="w-4 h-4 text-cyan-300 shrink-0" />
                <div className="text-slate-300">
                  <strong className="text-cyan-300 font-semibold">Key Takeaway: </strong>
                  {currentStage.keyTakeaway}
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Interactive Side-by-Side Comparison Samples */}
      <div className="space-y-5">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center space-x-2">
            <Shuffle className="w-5 h-5 text-cyan-400" />
            <span>Side-by-Side Real World Comparison Samples</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Select an everyday scenario to see the exact contrast in input query, processing mechanics, and delivered output.
          </p>
        </div>

        {/* Sample Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {SEARCH_VS_CHAT_SAMPLES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => setSelectedSampleId(sample.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center space-x-2 ${
                selectedSampleId === sample.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              <span>{sample.title}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                  selectedSampleId === sample.id
                    ? 'bg-slate-950/20 text-slate-950'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {sample.category}
              </span>
            </button>
          ))}
        </div>

        {/* The Selected Sample Comparison Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          {/* Header & Goal */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-[11px] font-mono uppercase text-cyan-400 font-semibold tracking-wider">
                User Real-World Objective
              </div>
              <div className="text-sm sm:text-base font-bold text-white mt-0.5">
                {selectedSample.userGoal}
              </div>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 self-start sm:self-auto shrink-0">
              {selectedSample.category}
            </span>
          </div>

          {/* Deep Side-by-Side Visual */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* GOOGLE SEARCH COLUMN */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xs">
                      G
                    </div>
                    <span className="text-sm font-bold text-slate-200">Google Search Experience</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    Index & Retrieval
                  </span>
                </div>

                {/* 1. Input */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold">
                    1. Input: Keyword String
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs font-mono text-cyan-300 flex items-center space-x-2">
                    <Search className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="truncate">{selectedSample.googleSearch.typicalInput}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 space-y-0.5 pt-1">
                    {selectedSample.googleSearch.inputCharacteristics.map((ic, i) => (
                      <div key={i} className="flex items-center space-x-1.5">
                        <span className="text-slate-500">•</span>
                        <span>{ic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Processing */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold">
                    2. Engine Processing
                  </div>
                  <p className="text-xs text-slate-300 bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/60 leading-relaxed">
                    {selectedSample.googleSearch.processingMechanism}
                  </p>
                </div>

                {/* 3. Output Simulation (SERP) */}
                <div className="space-y-2">
                  <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold">
                    3. Delivered Output (SERP)
                  </div>

                  <div className="bg-[#0D1117] border border-slate-800 rounded-xl p-3.5 space-y-3 text-xs">
                    {/* Featured Snippet if present */}
                    {selectedSample.googleSearch.rawOutputSimulation.featuredSnippet && (
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-700/60 space-y-1">
                        <div className="text-[10px] uppercase font-mono text-slate-400">
                          Featured Snippet (Partial)
                        </div>
                        <p className="text-xs text-slate-300 italic">
                          &quot;{selectedSample.googleSearch.rawOutputSimulation.featuredSnippet}&quot;
                        </p>
                      </div>
                    )}

                    {/* Results list */}
                    <div className="space-y-2.5">
                      {selectedSample.googleSearch.rawOutputSimulation.organicResults.map((res, i) => (
                        <div key={i} className="space-y-0.5">
                          <div className="flex items-center space-x-1.5">
                            {res.sponsored && (
                              <span className="text-[9px] font-bold px-1.5 py-0.2 bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
                                Sponsored Ad
                              </span>
                            )}
                            <div className="text-xs font-semibold text-blue-400 hover:underline cursor-pointer truncate">
                              {res.title}
                            </div>
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono truncate">{res.url}</div>
                          <p className="text-[11px] text-slate-400 leading-snug">{res.snippet}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Friction & Burden */}
              <div className="pt-3 border-t border-slate-800/80 space-y-2 mt-4">
                <div className="flex items-start space-x-2 text-xs text-amber-300 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Human Cognitive Burden: </span>
                    <span className="text-slate-300">{selectedSample.googleSearch.userEffortRequired}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* GEMINI CHAT COLUMN */}
            <div className="bg-slate-950 border border-cyan-500/40 rounded-xl p-5 space-y-4 flex flex-col justify-between shadow-xl shadow-cyan-500/5 ring-1 ring-cyan-500/20">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center text-slate-950 font-bold text-xs">
                      ✦
                    </div>
                    <span className="text-sm font-bold text-cyan-300">Gemini Chat Experience</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    Generative Synthesis
                  </span>
                </div>

                {/* 1. Input */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-mono uppercase text-cyan-400 font-semibold">
                    1. Input: Natural Context & Direct Artifacts
                  </div>
                  <pre className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-36">
                    <code>{selectedSample.geminiChat.typicalInput}</code>
                  </pre>
                  <div className="text-[11px] text-slate-300 space-y-0.5 pt-1">
                    {selectedSample.geminiChat.inputCharacteristics.map((ic, i) => (
                      <div key={i} className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span>{ic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Processing */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-mono uppercase text-cyan-400 font-semibold">
                    2. Engine Processing
                  </div>
                  <p className="text-xs text-slate-300 bg-cyan-950/20 p-2.5 rounded-lg border border-cyan-500/20 leading-relaxed">
                    {selectedSample.geminiChat.processingMechanism}
                  </p>
                </div>

                {/* 3. Output Synthesis */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-[11px] font-mono uppercase text-cyan-400 font-semibold">
                      3. Direct Synthesized Solution
                    </div>
                    <button
                      onClick={() => handleCopy(selectedSample.geminiChat.synthesizedResponse, selectedSample.id)}
                      className="flex items-center space-x-1 text-[11px] font-mono text-slate-400 hover:text-white transition cursor-pointer"
                    >
                      {copiedCodeId === selectedSample.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="bg-[#0B101D] border border-cyan-500/30 rounded-xl p-3.5 text-xs text-slate-200 font-mono overflow-x-auto max-h-64 whitespace-pre-wrap leading-relaxed">
                    {selectedSample.geminiChat.synthesizedResponse}
                  </div>
                </div>

                {/* Multi-Turn Follow-Up Advantage */}
                {selectedSample.geminiChat.followUpTurn && (
                  <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-1.5 text-xs">
                    <div className="text-[10px] font-mono uppercase text-purple-400 font-semibold flex items-center space-x-1">
                      <RefreshCw className="w-3 h-3" />
                      <span>Follow-up Turn (Dialogue Memory)</span>
                    </div>
                    <div className="text-slate-300 font-mono text-[11px]">
                      <span className="text-cyan-400">User: </span>
                      &quot;{selectedSample.geminiChat.followUpTurn.userFollowUp}&quot;
                    </div>
                    <div className="text-slate-400 text-[11px]">
                      <span className="text-emerald-400">Gemini: </span>
                      {selectedSample.geminiChat.followUpTurn.geminiFollowUpResponse}
                    </div>
                  </div>
                )}
              </div>

              {/* Key Advantage */}
              <div className="pt-3 border-t border-cyan-500/20 space-y-2 mt-4">
                <div className="flex items-start space-x-2 text-xs text-emerald-300 bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Gemini Advantage: </span>
                    <span className="text-slate-300">{selectedSample.geminiChat.keyAdvantage}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Unified Future: Gemini with Google Search Grounding */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0A1628] to-slate-900 border border-blue-500/30 rounded-2xl p-6 sm:p-7 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>The Best of Both Worlds: Search Grounding</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              How Gemini Integrates Google Search via Tool Calling
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              Gemini doesn&apos;t discard Google Search—it uses Google Search as a real-time retrieval instrument. When your prompt touches fresh events, breaking stock prices, or new API releases, Gemini dynamically queries Google Search under the hood, verifies facts, and cites clickable source chips with zero hallucination.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl font-mono text-xs text-cyan-300 shrink-0 self-start md:self-center">
            <div className="text-[10px] text-slate-400 mb-1">// Official SDK Grounding Config</div>
            <div>tools: [&#123; googleSearch: &#123;&#125; &#125;]</div>
          </div>
        </div>
      </div>
    </div>
  );
};
