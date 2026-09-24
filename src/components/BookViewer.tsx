import React, { useState, useMemo } from 'react';
import { Chapter } from '../types/agent';
import { CHAPTERS_DATA, PARTS_INFO } from '../data/chaptersData';
import {
  Search,
  BookOpen,
  Clock,
  CheckCircle2,
  Copy,
  Check,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  GitBranch,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface BookViewerProps {
  onGoToSimulator: (prompt?: string) => void;
  onExploreCode: (filename?: string) => void;
}

export const BookViewer: React.FC<BookViewerProps> = ({ onGoToSimulator, onExploreCode }) => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>('ch-1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Filtered chapters based on search query
  const filteredChapters = useMemo(() => {
    if (!searchQuery.trim()) return CHAPTERS_DATA;
    const q = searchQuery.toLowerCase();
    return CHAPTERS_DATA.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.content.toLowerCase().includes(q) ||
        c.claudeEquivalentTopic.toLowerCase().includes(q) ||
        c.applyThis.some((item) => item.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const currentChapter = useMemo(() => {
    return CHAPTERS_DATA.find((c) => c.id === selectedChapterId) || CHAPTERS_DATA[0];
  }, [selectedChapterId]);

  const currentIndex = CHAPTERS_DATA.findIndex((c) => c.id === currentChapter.id);
  const prevChapter = currentIndex > 0 ? CHAPTERS_DATA[currentIndex - 1] : null;
  const nextChapter = currentIndex < CHAPTERS_DATA.length - 1 ? CHAPTERS_DATA[currentIndex + 1] : null;

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-[#0F172A] to-[#0A0E1A] border border-slate-800 p-6 sm:p-8 mb-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Gemini Code From Source
          </h1>
          <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
            The definitive technical treatise and engineering guide across 18 comprehensive chapters.
            This guide documents how an autonomous terminal coding agent is engineered directly from the official{' '}
            <code className="text-cyan-300 font-mono text-xs bg-slate-800/80 px-1.5 py-0.5 rounded">@google/genai</code> SDK,
            Context Caching, Tool Calling, and Multimodal Live APIs.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                const element = document.getElementById('architecture-book-reader');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/20 transition active:scale-95 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Launch Autonomous Coding Agent</span>
            </button>
            <button
              onClick={() => onGoToSimulator('Fix failing auth tests in src/auth.test.ts')}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white shadow-lg shadow-cyan-500/20 transition active:scale-95 cursor-pointer"
            >
              <span>Launch Live Agent Simulator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center space-x-4 text-xs font-mono text-slate-400">
              <span className="flex items-center space-x-1">
                <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                <span>18 Chapters</span>
              </span>
              <span className="flex items-center space-x-1">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>7 Parts</span>
              </span>
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>~3.5h Full Read</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div id="architecture-book-reader" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Chapters Navigation & Search */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 sticky top-20 shadow-xl max-h-[calc(100vh-6rem)] overflow-y-auto">
            {/* Search Input */}
            <div className="relative mb-4">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search chapters, APIs, patterns..."
                className="w-full bg-[#0B0F17] border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
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

            {/* Chapters Tree by Parts */}
            <div className="space-y-4">
              {searchQuery ? (
                <div className="space-y-1">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 px-2 mb-2">
                    Found {filteredChapters.length} matching chapters
                  </p>
                  {filteredChapters.map((chapter) => (
                    <button
                      key={chapter.id}
                      onClick={() => setSelectedChapterId(chapter.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs transition flex items-start space-x-2 ${
                        selectedChapterId === chapter.id
                          ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/30'
                          : 'text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      <span className="font-mono text-slate-400 text-[10px] mt-0.5">
                        Ch.{chapter.chapterNumber}
                      </span>
                      <span className="font-medium line-clamp-1 flex-1">{chapter.title}</span>
                    </button>
                  ))}
                </div>
              ) : (
                PARTS_INFO.map((part) => (
                  <div key={part.number} className="border-b border-slate-800/80 pb-3 last:border-b-0">
                    <div className="px-2 py-1 flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                        Part {part.number}: {part.title}
                      </span>
                    </div>
                    <div className="mt-1 space-y-0.5">
                      {part.chapters.map((ch) => {
                        const active = selectedChapterId === ch.id;
                        return (
                          <button
                            key={ch.id}
                            onClick={() => setSelectedChapterId(ch.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs transition flex items-start space-x-2.5 ${
                              active
                                ? 'bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-cyan-300 border border-cyan-500/30 font-medium'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                            }`}
                          >
                            <span
                              className={`text-[10px] font-mono px-1 rounded ${
                                active ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {ch.chapterNumber}
                            </span>
                            <span className="line-clamp-1 flex-1 text-left">{ch.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Chapter Detail Content */}
        <div className="lg:col-span-8">
          <article className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            {/* Chapter Header */}
            <div className="border-b border-slate-800 pb-6 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono font-medium text-cyan-400 px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50">
                  Part {currentChapter.partNumber} · Chapter {currentChapter.chapterNumber}
                </span>
                <span className="text-xs text-slate-400 flex items-center space-x-1.5 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{currentChapter.readingTimeMinutes} min read</span>
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {currentChapter.title}
              </h2>
              <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                {currentChapter.summary}
              </p>

              {/* Claude Equivalent Banner */}
              <div className="mt-4 p-3 rounded-xl bg-slate-900/90 border border-indigo-500/20 flex items-start space-x-3">
                <div className="p-1 rounded bg-indigo-500/10 text-indigo-400 mt-0.5">
                  <GitBranch className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase text-indigo-300 font-semibold tracking-wider">
                    Architecture Reference Mapping
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    {currentChapter.claudeEquivalentTopic}
                  </div>
                </div>
              </div>

              {/* Key Gemini SDK APIs used */}
              <div className="mt-4 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-slate-400 font-mono mr-1">Key Gemini APIs:</span>
                {currentChapter.keyGeminiSdkApis.map((api) => (
                  <span
                    key={api}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-cyan-300 border border-blue-500/20"
                  >
                    {api}
                  </span>
                ))}
              </div>
            </div>

            {/* "Apply This" Architectural Heuristics */}
            <div className="mb-8 bg-gradient-to-br from-blue-950/40 via-indigo-950/30 to-[#0F172A] border border-blue-500/20 rounded-xl p-5">
              <div className="flex items-center space-x-2 text-cyan-300 font-semibold text-xs font-mono uppercase tracking-wider mb-3">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Apply This: Architectural Heuristics</span>
              </div>
              <ul className="space-y-2">
                {currentChapter.applyThis.map((rule, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Narrative Content */}
            <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-4">
              {currentChapter.content
                .trim()
                .split('\n\n')
                .map((paragraph, i) => {
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3
                        key={i}
                        className="text-lg sm:text-xl font-bold text-white pt-4 pb-1 border-b border-slate-800"
                      >
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('```')) {
                    const lines = paragraph.split('\n');
                    const code = lines.slice(1, -1).join('\n');
                    return (
                      <pre
                        key={i}
                        className="bg-[#0B0F17] p-4 rounded-xl text-xs font-mono text-cyan-200 overflow-x-auto border border-slate-800 my-4"
                      >
                        <code>{code}</code>
                      </pre>
                    );
                  }
                  return <p key={i}>{paragraph}</p>;
                })}
            </div>

            {/* Mermaid Diagram Render Box */}
            {currentChapter.mermaidDiagram && (
              <div className="my-8">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span className="flex items-center space-x-1.5">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span>Architectural Flow Diagram</span>
                  </span>
                  <span className="text-[10px] text-slate-500">Mermaid Native Specification</span>
                </div>
                <div className="bg-[#0B0F17] border border-slate-800 rounded-xl p-4 overflow-x-auto">
                  <pre className="text-[11px] font-mono text-cyan-300/90 whitespace-pre leading-relaxed">
                    {currentChapter.mermaidDiagram}
                  </pre>
                </div>
              </div>
            )}

            {/* Code Snippets Section */}
            {currentChapter.codeSnippets && currentChapter.codeSnippets.length > 0 && (
              <div className="mt-8 space-y-6">
                <h4 className="text-base font-bold text-white flex items-center space-x-2">
                  <span>Engineered Implementation Code</span>
                </h4>
                {currentChapter.codeSnippets.map((snippet, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl overflow-hidden border border-slate-800 bg-[#0B0F17]"
                  >
                    <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/80 border-b border-slate-800 text-xs">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-cyan-300 font-medium">
                          {snippet.filename}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          ({snippet.language})
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopyCode(snippet.code, idx)}
                        className="flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono transition"
                      >
                        {copiedIndex === idx ? (
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
                    <div className="p-2 text-[11px] text-slate-400 bg-slate-950/40 px-4 border-b border-slate-800/40">
                      {snippet.description}
                    </div>
                    <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed max-h-96">
                      <code>{snippet.code}</code>
                    </pre>
                  </div>
                ))}
              </div>
            )}

            {/* Navigation Footer Prev / Next */}
            <div className="mt-10 pt-6 border-t border-slate-800 flex items-center justify-between">
              {prevChapter ? (
                <button
                  onClick={() => setSelectedChapterId(prevChapter.id)}
                  className="flex items-center space-x-2 text-xs font-medium text-slate-300 hover:text-white group px-3 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition"
                >
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
                  <div className="text-left">
                    <div className="text-[10px] text-slate-400">Previous Chapter</div>
                    <div className="font-semibold line-clamp-1">Ch.{prevChapter.chapterNumber}: {prevChapter.title}</div>
                  </div>
                </button>
              ) : <div />}

              {nextChapter && (
                <button
                  onClick={() => setSelectedChapterId(nextChapter.id)}
                  className="flex items-center space-x-2 text-xs font-medium text-slate-300 hover:text-white group px-3 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition"
                >
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400">Next Chapter</div>
                    <div className="font-semibold line-clamp-1">Ch.{nextChapter.chapterNumber}: {nextChapter.title}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
                </button>
              )}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};
