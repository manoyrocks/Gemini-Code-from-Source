import React, { useState, useMemo } from 'react';
import { COMPARISON_DATA } from '../data/comparisonData';
import { ComparisonItem } from '../types/agent';
import {
  Scale,
  Search,
  Sparkles,
  Layers,
  Cpu,
  CheckCircle2,
  Clock,
  Zap,
  ArrowRight,
} from 'lucide-react';

export const ComparisonMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Loop', 'Tools', 'Memory & Cache', 'Multimodal', 'Reasoning'];

  const filteredItems = useMemo(() => {
    return COMPARISON_DATA.filter((item) => {
      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        item.dimension.toLowerCase().includes(q) ||
        item.claudeCodeApproach.toLowerCase().includes(q) ||
        item.geminiCodeApproach.toLowerCase().includes(q) ||
        item.geminiAdvantage.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 sm:p-8 mb-8 shadow-xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-mono mb-3">
          <Scale className="w-3.5 h-3.5" />
          <span>Architectural Deep Dive: Claude Code vs. Gemini Code</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          How Claude Code Was Engineered vs. How Gemini Code Is Engineered
        </h2>
        <p className="mt-2 text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
          A side-by-side technical evaluation of modern autonomous coding agent architectural patterns
          compared to our autonomous agent engineered using Google Gemini 3 and the modern{' '}
          <code className="text-cyan-300 font-mono text-xs bg-slate-800 px-1 py-0.5 rounded">@google/genai</code> SDK.
        </p>

        {/* 3 Core Architectural Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-800">
          <div className="bg-[#0B0F17] p-4 rounded-xl border border-slate-800">
            <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-semibold mb-1">
              <Zap className="w-4 h-4" />
              <span>Context Capacity</span>
            </div>
            <div className="text-sm font-bold text-white">1M-2M Tokens vs 200k</div>
            <p className="text-[11px] text-slate-400 mt-1">
              Gemini native million-token context eliminates aggressive early history truncation, allowing entire codebases to stay live in memory.
            </p>
          </div>

          <div className="bg-[#0B0F17] p-4 rounded-xl border border-slate-800">
            <div className="flex items-center space-x-2 text-indigo-400 font-mono text-xs font-semibold mb-1">
              <Clock className="w-4 h-4" />
              <span>Explicit Context Cache</span>
            </div>
            <div className="text-sm font-bold text-white">Configurable TTL vs 5-Min</div>
            <p className="text-[11px] text-slate-400 mt-1">
              Gemini <code className="text-cyan-300">ai.caches.create</code> allows explicit session TTLs (e.g. 2 hours) with 75% cost discount, surviving developer idle pauses.
            </p>
          </div>

          <div className="bg-[#0B0F17] p-4 rounded-xl border border-slate-800">
            <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs font-semibold mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Multimodal Live Audio</span>
            </div>
            <div className="text-sm font-bold text-white">Live Voice Pairing API</div>
            <p className="text-[11px] text-slate-400 mt-1">
              Gemini Live API (<code className="text-cyan-300">ai.live.connect</code>) enables real-time bidirectional voice pair programming over WebSockets.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
                selectedCategory === cat
                  ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/30 font-semibold'
                  : 'bg-[#0F172A] border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search comparison matrix..."
            className="w-full bg-[#0F172A] border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Comparison Cards / Table */}
      <div className="space-y-4">
        {filteredItems.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-slate-700 transition"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-white tracking-tight">
                  {item.dimension}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  {item.category}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Claude Column */}
              <div className="bg-[#0B0F17] p-4 rounded-xl border border-slate-800/80">
                <div className="text-[11px] font-mono uppercase text-indigo-400 font-semibold mb-2">
                  Claude Code Architecture (Anthropic Docs)
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {item.claudeCodeApproach}
                </p>
                <div className="mt-3 pt-2 border-t border-slate-800/60 text-[10px] font-mono text-slate-400">
                  Ref: {item.claudeDocsReference}
                </div>
              </div>

              {/* Gemini Column */}
              <div className="bg-[#0B0F17] p-4 rounded-xl border border-blue-500/20">
                <div className="text-[11px] font-mono uppercase text-cyan-400 font-semibold mb-2 flex items-center justify-between">
                  <span>Gemini Code Architecture (@google/genai)</span>
                  <span className="text-[9px] bg-cyan-500/10 text-cyan-300 px-1.5 py-0.5 rounded">
                    Engineered Here
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  {item.geminiCodeApproach}
                </p>
                <div className="mt-3 pt-2 border-t border-slate-800/60 text-[10px] font-mono text-cyan-400">
                  SDK: {item.geminiDocsReference}
                </div>
              </div>
            </div>

            {/* Gemini Architectural Advantage Callout */}
            <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-blue-950/40 to-slate-900 border border-blue-500/20 flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-200">
                <strong className="text-cyan-300 font-mono">Gemini Architectural Advantage: </strong>
                {item.geminiAdvantage}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
