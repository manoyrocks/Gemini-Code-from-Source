import React, { useState } from 'react';
import {
  GEMINI_AI_STUDIO_CONTENT,
  AIStudioAppProject
} from '../data/geminiAIStudioData';
import {
  Smartphone,
  Tablet,
  Globe,
  Layers,
  Sparkles,
  Code2,
  CheckCircle,
  Copy,
  ExternalLink,
  ChevronRight,
  Terminal,
  Cpu,
  RefreshCw,
  Box,
  Monitor,
  Maximize2,
  Sliders,
  Play,
  RotateCcw,
  ArrowRight
} from 'lucide-react';

export interface GeminiAIStudioProps {
  onProceedNext?: () => void;
}

export const GeminiAIStudio: React.FC<GeminiAIStudioProps> = ({ onProceedNext }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'simulator' | 'architectures'>('simulator');
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    GEMINI_AI_STUDIO_CONTENT.projects[0].id
  );
  const [selectedFileIdx, setSelectedFileIdx] = useState<number>(0);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [activeOrientation, setActiveOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [simulatedActionCount, setSimulatedActionCount] = useState<number>(0);

  const selectedProject =
    GEMINI_AI_STUDIO_CONTENT.projects.find((p) => p.id === selectedProjectId) ||
    GEMINI_AI_STUDIO_CONTENT.projects[0];

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const getPlatformIcon = (deviceType: 'web' | 'mobile' | 'tablet' | string) => {
    switch (deviceType) {
      case 'mobile':
        return <Smartphone className="w-5 h-5 text-emerald-400" />;
      case 'tablet':
        return <Tablet className="w-5 h-5 text-blue-400" />;
      case 'web':
      default:
        return <Globe className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0D1527] via-[#0B1120] to-[#120B24] border border-cyan-500/20 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Module 3 · Gemini AI Studio
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5" />
              Web + Native Android Apps
            </span>
            <a
              href={GEMINI_AI_STUDIO_CONTENT.header.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition-colors ml-auto"
            >
              <span>aistudio.google.com/apps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <span>{GEMINI_AI_STUDIO_CONTENT.header.title}</span>
            </h1>

            {onProceedNext && (
              <button
                onClick={onProceedNext}
                className="inline-flex items-center space-x-2.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-emerald-300 hover:to-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition active:scale-95 cursor-pointer shrink-0 self-start md:self-center group"
              >
                <span>Proceed to next module --&gt;</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            )}
          </div>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
            {GEMINI_AI_STUDIO_CONTENT.header.description}
          </p>

          {/* Metric Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
            {GEMINI_AI_STUDIO_CONTENT.header.metrics.map((m, idx) => (
              <div key={idx} className="bg-slate-900/60 rounded-xl p-3.5 border border-slate-800">
                <div className="text-xs text-slate-400">{m.label}</div>
                <div className="text-sm font-semibold text-cyan-300 mt-1">{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'simulator'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Play className="w-4 h-4" />
          Interactive App Builder & Emulator
        </button>

        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'overview'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Box className="w-4 h-4" />
          AI Studio Architecture & Capabilities
        </button>

        <button
          onClick={() => setActiveTab('architectures')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'architectures'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Layers className="w-4 h-4" />
          Android & Web Foundations Guide
        </button>
      </div>

      {/* TAB 1: INTERACTIVE APP BUILDER & EMULATOR */}
      {activeTab === 'simulator' && (
        <div className="space-y-6">
          {/* Project Selector Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {GEMINI_AI_STUDIO_CONTENT.projects.map((proj) => {
              const isSelected = proj.id === selectedProjectId;
              return (
                <button
                  key={proj.id}
                  onClick={() => {
                    setSelectedProjectId(proj.id);
                    setSelectedFileIdx(0);
                    setActiveOrientation(proj.deviceType === 'tablet' ? 'landscape' : 'portrait');
                  }}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500/60 ring-1 ring-cyan-500/30 shadow-lg'
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getPlatformIcon(proj.deviceType)}
                      <span className="text-xs font-semibold text-slate-300">
                        {proj.deviceType.toUpperCase()}
                      </span>
                    </div>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    )}
                  </div>
                  <div className="font-bold text-white text-base leading-snug">{proj.name}</div>
                  <div className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {proj.targetPlatform}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Project Details Banner */}
          <div className="bg-[#0B111E] rounded-xl border border-slate-800 p-5 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <div className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">
                  {selectedProject.targetPlatform}
                </div>
                <h2 className="text-xl font-bold text-white mt-0.5">{selectedProject.name}</h2>
                <p className="text-sm text-slate-300 mt-1">{selectedProject.description}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {selectedProject.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs rounded-md bg-slate-800/90 text-cyan-300 border border-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Prompt Prompting Box */}
            <div className="bg-slate-950/70 rounded-lg p-3.5 border border-slate-800 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
              <div className="space-y-1 text-xs">
                <div className="text-slate-400 font-mono">User Specification Prompt (to Gemini):</div>
                <div className="text-slate-200 italic font-sans leading-relaxed">
                  "{selectedProject.userPrompt}"
                </div>
              </div>
            </div>
          </div>

          {/* Main Dual-View: Device Emulator + Live Source Tree */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Device Cloud Emulator (5 Cols) */}
            <div className="lg:col-span-5 bg-[#0B0F19] rounded-2xl border border-slate-800 p-4 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                    Cloud Device Emulator
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {selectedProject.deviceType === 'tablet' && (
                    <button
                      onClick={() =>
                        setActiveOrientation((prev) =>
                          prev === 'landscape' ? 'portrait' : 'landscape'
                        )
                      }
                      className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1 border border-slate-700"
                      title="Rotate Tablet"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>{activeOrientation}</span>
                    </button>
                  )}
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    60 FPS Stream
                  </span>
                </div>
              </div>

              {/* Physical Frame Simulation */}
              <div className="flex justify-center p-2">
                <div
                  className={`relative bg-slate-950 border-[6px] border-slate-800 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ${
                    selectedProject.deviceType === 'mobile'
                      ? 'w-[320px] min-h-[580px]'
                      : selectedProject.deviceType === 'tablet'
                      ? activeOrientation === 'landscape'
                        ? 'w-full min-h-[420px]'
                        : 'w-[380px] min-h-[540px]'
                      : 'w-full min-h-[460px]'
                  }`}
                >
                  {/* Status Bar */}
                  <div className="bg-slate-900 px-4 py-1.5 flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800/80">
                    <span className="font-semibold text-slate-300">9:41 AM</span>
                    <span className="text-[10px] text-cyan-400 truncate max-w-[170px]">
                      {selectedProject.emulatorPreview.statusBadge}
                    </span>
                    <span>100% ⚡</span>
                  </div>

                  {/* App Screen Content */}
                  <div className="p-4 space-y-4">
                    {/* App Header */}
                    <div className="border-b border-slate-800 pb-3">
                      <div className="text-sm font-bold text-white flex items-center justify-between">
                        <span>{selectedProject.emulatorPreview.screenTitle}</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {selectedProject.emulatorPreview.simulatedUI.subText}
                      </div>
                    </div>

                    {/* Metrics Strip */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(selectedProject.emulatorPreview.primaryMetrics).map(
                        ([key, val], idx) => (
                          <div
                            key={idx}
                            className="bg-slate-900/90 rounded-lg p-2 border border-slate-800/80"
                          >
                            <div className="text-[10px] text-slate-400 truncate">{key}</div>
                            <div className="font-semibold text-cyan-300 text-xs mt-0.5 truncate">
                              {val}
                            </div>
                          </div>
                        )
                      )}
                    </div>

                    {/* Interactive List / Grid */}
                    <div className="space-y-2.5">
                      <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                        <span>{selectedProject.emulatorPreview.simulatedUI.headerText}</span>
                        <span className="text-[10px] text-slate-400">
                          Interactive ({simulatedActionCount} clicks)
                        </span>
                      </div>

                      {selectedProject.emulatorPreview.simulatedUI.items.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => setSimulatedActionCount((c) => c + 1)}
                          className="group p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer shadow-sm"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="font-medium text-xs text-white group-hover:text-cyan-200">
                              {item.title}
                            </div>
                            {item.value && (
                              <span className="text-[11px] font-mono font-semibold text-emerald-400 shrink-0">
                                {item.value}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                            {item.subtitle}
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/50">
                              {item.tag}
                            </span>
                            <span className="text-[10px] text-slate-400 group-hover:text-cyan-300">
                              Tap to inspect →
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action Bar Simulation */}
                    <div className="pt-2">
                      <button
                        onClick={() => setSimulatedActionCount((c) => c + 1)}
                        className="w-full py-2 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        Trigger Gemini Multimodal Inference
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Code Generator & Source Explorer (7 Cols) */}
            <div className="lg:col-span-7 bg-[#0B0F19] rounded-2xl border border-slate-800 p-5 shadow-xl space-y-4">
              {/* File Selector Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                    Generated Native Source Tree
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                  {selectedProject.sourceTree.map((file, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedFileIdx(idx)}
                      className={`text-xs px-3 py-1.5 rounded-md font-mono transition-all ${
                        selectedFileIdx === idx
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {file.filename.split('/').pop()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active File Context */}
              {selectedProject.sourceTree[selectedFileIdx] && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                    <div>
                      <div className="text-xs font-mono text-cyan-300">
                        {selectedProject.sourceTree[selectedFileIdx].filename}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {selectedProject.sourceTree[selectedFileIdx].description}
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        handleCopyCode(selectedProject.sourceTree[selectedFileIdx].code)
                      }
                      className="px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1.5 border border-slate-700 transition-colors"
                    >
                      {copiedCode ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-300 font-semibold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Code Block */}
                  <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-[#070A11]">
                    <div className="absolute top-2.5 right-3 text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-400">
                      {selectedProject.sourceTree[selectedFileIdx].language}
                    </div>
                    <pre className="p-4 text-xs font-mono leading-relaxed text-slate-300 overflow-x-auto max-h-[460px] scrollbar-thin scrollbar-thumb-slate-700">
                      <code>{selectedProject.sourceTree[selectedFileIdx].code}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* Key Features List */}
              <div className="pt-2 border-t border-slate-800">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wide mb-2">
                  Built-in Production Guarantees
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  {selectedProject.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 p-2 rounded-lg bg-slate-900/40 border border-slate-800/60"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                      <span className="text-slate-300">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ARCHITECTURE & CAPABILITIES */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GEMINI_AI_STUDIO_CONTENT.coreCapabilities.map((cap) => (
              <div
                key={cap.id}
                className="bg-[#0B111E] rounded-xl border border-slate-800 p-6 space-y-4 hover:border-cyan-500/40 transition-all shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      {cap.icon === 'Sparkles' && <Sparkles className="w-5 h-5" />}
                      {cap.icon === 'Smartphone' && <Smartphone className="w-5 h-5" />}
                      {cap.icon === 'Tablet' && <Tablet className="w-5 h-5" />}
                      {cap.icon === 'Cloud' && <Globe className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">{cap.title}</h3>
                      <span className="text-xs text-cyan-400">{cap.badge}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">{cap.summary}</p>

                <div className="space-y-2 text-xs pt-3 border-t border-slate-800/80">
                  <div>
                    <span className="text-slate-400 font-semibold">Engine & Tech: </span>
                    <span className="text-slate-200">{cap.techStack}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold">Production Standard: </span>
                    <span className="text-slate-200">{cap.productionReadiness}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Workflow Diagram */}
          <div className="bg-[#0B0F19] rounded-2xl border border-slate-800 p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-cyan-400" />
              End-to-End Gemini AI Studio Lifecycle
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-cyan-400">01. NATURAL LANGUAGE BRIEF</div>
                <div className="text-sm font-semibold text-white">Prompt Specification</div>
                <p className="text-xs text-slate-400">
                  User provides product requirements, screen wireframe descriptions, or domain API needs.
                </p>
              </div>

              <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-cyan-400">02. GEMINI CODING ENGINE</div>
                <div className="text-sm font-semibold text-white">Full-Stack Synthesis</div>
                <p className="text-xs text-slate-400">
                  Synthesizes clean Kotlin/Compose architecture or React/TypeScript server routes with zero placeholders.
                </p>
              </div>

              <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-cyan-400">03. CLOUD CONTAINER EMULATOR</div>
                <div className="text-sm font-semibold text-white">Instant In-Browser Test</div>
                <p className="text-xs text-slate-400">
                  Compiles APK or boots Vite server in seconds with interactive touch, camera, and sensor emulation.
                </p>
              </div>

              <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-cyan-400">04. ONE-CLICK PRODUCTION</div>
                <div className="text-sm font-semibold text-white">Play Store & Cloud Run</div>
                <p className="text-xs text-slate-400">
                  Download source ZIP, build signed release APK/AAB bundle, or launch to serverless Google Cloud Run.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FOUNDATIONS GUIDE */}
      {activeTab === 'architectures' && (
        <div className="space-y-6">
          <div className="bg-[#0B111E] rounded-xl border border-slate-800 p-6 space-y-5">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-emerald-400" />
              Android Engineering Principles in Gemini AI Studio
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              When generating Android applications, Gemini AI Studio adheres to the official Google Android Architecture Guide (MAD - Modern Android Development):
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-900/80 rounded-lg p-4 border border-slate-800 space-y-2">
                <div className="font-bold text-white text-sm">UI Layer (Declarative Compose)</div>
                <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                  <li>Pure Jetpack Compose 1.7+ without XML layouts</li>
                  <li>State hoisting with immutable Data Classes</li>
                  <li>Material Design 3 with Dynamic Theming</li>
                  <li>Navigation Suite Scaffold for responsive layout</li>
                </ul>
              </div>

              <div className="bg-slate-900/80 rounded-lg p-4 border border-slate-800 space-y-2">
                <div className="font-bold text-white text-sm">ViewModel & StateFlow Layer</div>
                <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                  <li>MVI / Unidirectional Data Flow (UDF)</li>
                  <li>Coroutines StateFlow with `collectAsStateWithLifecycle`</li>
                  <li>Lifecycle-aware coroutine scopes (`viewModelScope`)</li>
                  <li>Separation of transient UI state vs persistent domain state</li>
                </ul>
              </div>

              <div className="bg-slate-900/80 rounded-lg p-4 border border-slate-800 space-y-2">
                <div className="font-bold text-white text-sm">Data & AI Layer</div>
                <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                  <li>Official `@google/genai` & Google AI Client SDK</li>
                  <li>Structured JSON output enforcement for zero parsing errors</li>
                  <li>Local SQLite caching via Room Database with Flow streams</li>
                  <li>CameraX integration with ImageAnalysis analyzers</li>
                </ul>
              </div>
            </div>

            {/* Tablet & Adaptive Section */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Tablet className="w-4 h-4 text-blue-400" />
                Adaptive Android Tablet & Foldable Best Practices
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Gemini automatically incorporates <code className="text-cyan-300">WindowWidthSizeClass</code> checks. When the viewport transitions from Compact (&lt;600dp, phone portrait) to Expanded (&ge;840dp, tablet landscape / desktop), the scaffold seamlessly switches from BottomNavigation to NavigationRail, and unfolds single-pane navigation into canonical dual-pane <code className="text-cyan-300">ListDetailPaneScaffold</code>.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
