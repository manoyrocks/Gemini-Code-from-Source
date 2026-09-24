import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Search,
  ExternalLink,
  Copy,
  Check,
  Zap,
  Brain,
  Layers,
  Cpu,
  Eye,
  Radio,
  Music,
  Video,
  Database,
  Code2,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  Filter,
  Flame
} from 'lucide-react';
import { GEMINI_MODELS_DATA } from '../data/geminiModelsData';
import { GeminiModelSpec } from '../data/genai101Data';

export const GeminiModelsShowcase: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedModelId, setSelectedModelId] = useState<string>('gemini-3-8-flash');
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);

  const categories = [
    { id: 'All', label: 'All Models', count: GEMINI_MODELS_DATA.length },
    { id: 'Flagship & Reasoning', label: 'Flagship & Reasoning', count: 2 },
    { id: 'High Volume & Speed', label: 'High Volume & Speed', count: 1 },
    { id: 'Vision & Image', label: 'Vision & Image', count: 1 },
    { id: 'Real-Time Audio & Voice', label: 'Real-Time Audio & Voice', count: 3 },
    { id: 'Video & Music', label: 'Video & Music', count: 2 },
    { id: 'Embeddings', label: 'Embeddings', count: 1 },
  ];

  const filteredModels = useMemo(() => {
    return GEMINI_MODELS_DATA.filter((model) => {
      const matchesCategory = selectedCategory === 'All' || model.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        model.name.toLowerCase().includes(q) ||
        model.modelCode.toLowerCase().includes(q) ||
        (model.alias && model.alias.toLowerCase().includes(q)) ||
        model.description.toLowerCase().includes(q) ||
        model.bestFor.toLowerCase().includes(q) ||
        model.useCases.some(
          (u) =>
            u.scenario.toLowerCase().includes(q) ||
            u.industry.toLowerCase().includes(q) ||
            u.whyThisModel.toLowerCase().includes(q)
        );
      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  const selectedModel = useMemo(() => {
    return (
      GEMINI_MODELS_DATA.find((m) => m.id === selectedModelId) ||
      filteredModels[0] ||
      GEMINI_MODELS_DATA[0]
    );
  }, [selectedModelId, filteredModels]);

  const handleCopyCode = (snippet: string, id: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedSnippetId(id);
    setTimeout(() => setCopiedSnippetId(null), 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Flagship & Reasoning':
        return <Brain className="w-4 h-4 text-purple-400" />;
      case 'High Volume & Speed':
        return <Zap className="w-4 h-4 text-cyan-400" />;
      case 'Vision & Image':
        return <Eye className="w-4 h-4 text-pink-400" />;
      case 'Real-Time Audio & Voice':
        return <Radio className="w-4 h-4 text-amber-400" />;
      case 'Video & Music':
        return <Video className="w-4 h-4 text-rose-400" />;
      case 'Embeddings':
        return <Database className="w-4 h-4 text-teal-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Official Documentation Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-[#0E1726] to-[#0A0F1D] border border-cyan-500/20 p-6 sm:p-7 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Official Reference: ai.google.dev/gemini-api/docs/models</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Google Gemini Models & Comprehensive Use Cases
            </h2>
            <p className="mt-2 text-slate-300 text-xs sm:text-sm leading-relaxed">
              Google’s Gemini model family is architected for native multimodality, massive 1-million-token context windows,
              sub-second time-to-first-token, and dedicated media generation. Explore technical specs, token boundaries,
              industry use cases, and official <code className="text-cyan-300 font-mono text-xs bg-slate-800/90 px-1 py-0.5 rounded">@google/genai</code> code implementations.
            </p>
          </div>

          <a
            href="https://ai.google.dev/gemini-api/docs/models"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start lg:self-center inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition active:scale-95 cursor-pointer shrink-0"
          >
            <span>Open Google Models Docs</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Quick Family Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800/80 text-xs">
          <div className="bg-slate-900/60 rounded-lg p-2.5 border border-slate-800">
            <div className="text-slate-400 text-[11px]">Context Window</div>
            <div className="text-white font-bold font-mono text-sm mt-0.5">1,048,576 Tokens</div>
            <div className="text-[10px] text-cyan-400">~1hr video / 700k words</div>
          </div>
          <div className="bg-slate-900/60 rounded-lg p-2.5 border border-slate-800">
            <div className="text-slate-400 text-[11px]">Output Tokens</div>
            <div className="text-white font-bold font-mono text-sm mt-0.5">65,536 Tokens</div>
            <div className="text-[10px] text-purple-400">Long-form code synthesis</div>
          </div>
          <div className="bg-slate-900/60 rounded-lg p-2.5 border border-slate-800">
            <div className="text-slate-400 text-[11px]">Input Modalities</div>
            <div className="text-white font-bold font-mono text-sm mt-0.5">Text, Audio, Video, Img</div>
            <div className="text-[10px] text-emerald-400">Natively multimodal</div>
          </div>
          <div className="bg-slate-900/60 rounded-lg p-2.5 border border-slate-800">
            <div className="text-slate-400 text-[11px]">Context Caching</div>
            <div className="text-white font-bold font-mono text-sm mt-0.5">ai.caches API</div>
            <div className="text-[10px] text-amber-400">75% cost discount</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Category Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer flex items-center space-x-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/20'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === cat.id ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px] shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search model, code, or use case..."
            className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 focus:border-cyan-500 focus:outline-none text-xs text-white placeholder:text-slate-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Main Split View: Left List of Models, Right Selected Model Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Model Cards List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
            Available Models ({filteredModels.length})
          </div>

          {filteredModels.length === 0 ? (
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-8 text-center text-slate-400 text-xs">
              No Gemini models match &quot;{searchQuery}&quot;. Try clearing your search or category filter.
            </div>
          ) : (
            filteredModels.map((model) => {
              const isSelected = selectedModel.id === model.id;
              return (
                <div
                  key={model.id}
                  onClick={() => setSelectedModelId(model.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-left relative ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/30'
                      : 'bg-slate-900/50 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
                        {getCategoryIcon(model.category)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white flex items-center space-x-1.5">
                          <span>{model.name}</span>
                        </div>
                        <div className="text-[11px] font-mono text-cyan-400 mt-0.5">
                          {model.modelCode}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full border whitespace-nowrap ${model.badgeColor}`}
                    >
                      {model.badge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mt-2.5 line-clamp-2 leading-relaxed">
                    {model.description}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-mono text-[10px]">
                      Ctx: {model.contextWindow.input.split(' ')[0]}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        model.pricingTier === 'Paid Key Required'
                          ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                          : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                      }`}
                    >
                      {model.pricingTier}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: In-Depth Model Specification & Use Cases */}
        <div className="lg:col-span-7">
          <div className="sticky top-20 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center space-x-2">
                  <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${selectedModel.badgeColor}`}>
                    {selectedModel.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">·</span>
                  <span className="text-xs font-mono text-slate-400">{selectedModel.pricingTier}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  {selectedModel.name}
                </h3>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <code className="text-xs font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-800/50 px-2 py-0.5 rounded">
                    model: &apos;{selectedModel.modelCode}&apos;
                  </code>
                  {selectedModel.alias && (
                    <span className="text-[11px] text-slate-400 font-mono">
                      alias: <span className="text-slate-300">&apos;{selectedModel.alias}&apos;</span>
                    </span>
                  )}
                </div>
              </div>

              <a
                href={selectedModel.officialDocsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition self-start sm:self-auto cursor-pointer"
              >
                <span>Docs</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Description & Best For */}
            <div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedModel.description}
              </p>
              <div className="mt-3 p-3 rounded-xl bg-blue-950/20 border border-blue-500/20 text-xs">
                <span className="text-cyan-400 font-bold">Best For: </span>
                <span className="text-slate-300">{selectedModel.bestFor}</span>
              </div>
            </div>

            {/* Context & Modalities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5">
                <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold mb-1">
                  Context Window
                </div>
                <div className="text-xs text-white font-mono space-y-1">
                  <div>
                    <span className="text-slate-400">Input:</span> {selectedModel.contextWindow.input}
                  </div>
                  <div>
                    <span className="text-slate-400">Output:</span> {selectedModel.contextWindow.output}
                  </div>
                </div>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5">
                <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold mb-1">
                  Modalities
                </div>
                <div className="text-xs text-slate-300 space-y-1">
                  <div>
                    <span className="text-slate-400 font-mono">In: </span>
                    {selectedModel.supportedModalities.input.map((m) => (
                      <span key={m} className="inline-block px-1.5 py-0.2 mr-1 bg-slate-800 rounded text-[10px] text-slate-300">
                        {m}
                      </span>
                    ))}
                  </div>
                  <div>
                    <span className="text-slate-400 font-mono">Out: </span>
                    {selectedModel.supportedModalities.output.map((m) => (
                      <span key={m} className="inline-block px-1.5 py-0.2 mr-1 bg-cyan-950/60 text-cyan-300 rounded text-[10px] border border-cyan-800/40">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Capabilities */}
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Engineered Capabilities</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedModel.detailedCapabilities.map((cap, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300 bg-slate-950/40 p-2 rounded-lg border border-slate-800/80">
                    <span className="text-cyan-400 font-bold mt-0.5">•</span>
                    <span className="leading-snug">{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* In-Depth Real World Use Cases */}
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center space-x-1.5">
                <Layers className="w-4 h-4 text-blue-400" />
                <span>Detailed Use Cases & Industrial Applications</span>
              </div>
              <div className="space-y-3">
                {selectedModel.useCases.map((uc, idx) => (
                  <div key={idx} className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-cyan-300">
                        {uc.scenario}
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        {uc.industry}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <span className="text-slate-400 font-semibold">Why this model: </span>
                      {uc.whyThisModel}
                    </p>
                    <div className="bg-slate-900/90 border border-slate-800/80 rounded-lg p-2.5 font-mono text-[11px] text-slate-300 whitespace-pre-line leading-relaxed">
                      {uc.exampleInputOutput}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Snippet */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <span>SDK Implementation (@google/genai)</span>
                </div>
                <button
                  onClick={() => handleCopyCode(selectedModel.sdkSnippet, selectedModel.id)}
                  className="flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                >
                  {copiedSnippetId === selectedModel.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 overflow-x-auto text-[11px] font-mono text-cyan-300/90 leading-relaxed max-h-56">
                <code>{selectedModel.sdkSnippet}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Model Selection Decision Matrix & Guide */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <Brain className="w-5 h-5 text-purple-400" />
          <span>Model Selection Guide: Which Gemini Model Fits Your Need?</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Google recommends following an efficiency-first tiering pattern: deploy <strong>Gemini 3.8 Flash</strong> for 90% of autonomous tool loops, chat, and document tasks; escalate to <strong>Gemini 3.1 Pro</strong> for frontier reasoning and complex code refactoring; use <strong>Gemini 3.1 Flash-Lite</strong> for mass classification; and leverage specialized models for image, audio streaming, transcription, and video synthesis.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 space-y-1">
            <div className="text-xs font-bold text-emerald-300 flex items-center space-x-1.5">
              <span>Standard Dev & Autonomous Agents</span>
            </div>
            <div className="text-sm font-mono font-bold text-white">gemini-3.8-flash</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Default choice. High throughput, low latency, native function calling, and 1M token context.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 space-y-1">
            <div className="text-xs font-bold text-purple-300 flex items-center space-x-1.5">
              <span>Complex Math, STEM & Architecture</span>
            </div>
            <div className="text-sm font-mono font-bold text-white">gemini-3.1-pro-preview</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Maximum reasoning depth. Multi-hop problem solving, exhaustive code analysis, and supervisory orchestration.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 space-y-1">
            <div className="text-xs font-bold text-cyan-300 flex items-center space-x-1.5">
              <span>High Volume, Triage & Classification</span>
            </div>
            <div className="text-sm font-mono font-bold text-white">gemini-3.1-flash-lite</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Ultra-low token cost and millisecond time-to-first-token. Ideal for query routing and data scraping.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 space-y-1">
            <div className="text-xs font-bold text-pink-300 flex items-center space-x-1.5">
              <span>High-Res Image Generation & Inpainting</span>
            </div>
            <div className="text-sm font-mono font-bold text-white">gemini-3.1-flash-image</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Synthesizes 512px to 4K images, UI mockups, and enables multi-turn conversational image editing.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 space-y-1">
            <div className="text-xs font-bold text-amber-300 flex items-center space-x-1.5">
              <span>Real-Time Conversational Voice & Video</span>
            </div>
            <div className="text-sm font-mono font-bold text-white">gemini-3.8-live</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Live API WebSocket stream with sub-500ms voice turnaround, natural speech interruptions, and webcam input.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 space-y-1">
            <div className="text-xs font-bold text-teal-300 flex items-center space-x-1.5">
              <span>Vector Search & Enterprise RAG</span>
            </div>
            <div className="text-sm font-mono font-bold text-white">gemini-embedding-2-preview</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Dense multimodal embeddings with Matryoshka dimension truncation (768 to 3072) for code & documents.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
