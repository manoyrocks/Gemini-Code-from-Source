import React from 'react';
import { ViewMode } from '../types/agent';
import { Sparkles, ArrowRight, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

export interface ModuleStep {
  id: ViewMode;
  moduleNumber: number;
  name: string;
  shortName: string;
  badge: string;
  tagline: string;
}

export const APP_MODULE_SEQUENCE: ModuleStep[] = [
  {
    id: 'genai-101',
    moduleNumber: 1,
    name: 'GenAI 101: The Gemini Journey',
    shortName: 'GenAI 101',
    badge: 'Module 1',
    tagline: 'Gemini Chat Journey, Models Catalog & Search vs Chat'
  },
  {
    id: 'gemini-spark',
    moduleNumber: 2,
    name: 'Gemini Spark Work',
    shortName: 'Spark Work',
    badge: 'Module 2',
    tagline: 'Autonomous Workspace Agent, Cloud Workers & Standing Directives'
  },
  {
    id: 'gemini-ai-studio',
    moduleNumber: 3,
    name: 'Gemini AI Studio',
    shortName: 'AI Studio',
    badge: 'Module 3',
    tagline: 'Web & Native Android Apps Dev with Live Cloud Emulation'
  },
  {
    id: 'agentic-ai',
    moduleNumber: 4,
    name: 'Agentic AI',
    shortName: 'Agentic AI',
    badge: 'Module 4',
    tagline: 'Antigravity, Deep Research & Sample Multi-Agent Workflows'
  },
  {
    id: 'book',
    moduleNumber: 5,
    name: 'Autonomous Coding Agent (18 Ch)',
    shortName: 'Agent Book',
    badge: 'Module 5',
    tagline: 'Deep technical treatise on autonomous agent engineering'
  },
  {
    id: 'simulator',
    moduleNumber: 6,
    name: 'Agent Loop Simulator',
    shortName: 'Simulator',
    badge: 'Module 6',
    tagline: 'Interactive execution sandbox for ReAct loops & tool calling'
  },
  {
    id: 'repos',
    moduleNumber: 7,
    name: 'Production Repos',
    shortName: 'Repos',
    badge: 'Module 7',
    tagline: 'Production-ready CLI, Extension, MCP Server & Microservices'
  },
  {
    id: 'ai-softeng',
    moduleNumber: 8,
    name: 'AI Software Engineer Lab',
    shortName: 'SoftEng Lab',
    badge: 'Module 8',
    tagline: 'Google AI Software Engineer technical interview prep & live lab'
  },
  {
    id: 'code',
    moduleNumber: 9,
    name: 'Source Explorer',
    shortName: 'Source Explorer',
    badge: 'Module 9',
    tagline: 'Deep-dive into architectural files, schemas & contracts'
  },
  {
    id: 'comparison',
    moduleNumber: 10,
    name: 'Claude vs Gemini Matrix',
    shortName: 'SDK Comparison',
    badge: 'Module 10',
    tagline: 'Head-to-head architectural matrix & SDK feature comparison'
  },
  {
    id: 'live',
    moduleNumber: 11,
    name: 'Live Playground',
    shortName: 'Live Playground',
    badge: 'Module 11',
    tagline: 'Interactive playground & live agent testbed'
  },
  {
    id: 'docs',
    moduleNumber: 12,
    name: 'Docs & How-to Guides',
    shortName: 'Docs & Guides',
    badge: 'Module 12',
    tagline: 'Complete system manual, walkthroughs, API reference & deployment guides'
  }
];

interface ModuleNavigationFooterProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
}

export const ModuleNavigationFooter: React.FC<ModuleNavigationFooterProps> = ({
  currentView,
  onNavigate
}) => {
  const currentIndex = APP_MODULE_SEQUENCE.findIndex((m) => m.id === currentView);
  const currentStep = currentIndex !== -1 ? APP_MODULE_SEQUENCE[currentIndex] : APP_MODULE_SEQUENCE[0];
  const isLastModule = currentIndex === APP_MODULE_SEQUENCE.length - 1;

  const nextStep = isLastModule
    ? APP_MODULE_SEQUENCE[0] // loops to genai-101
    : APP_MODULE_SEQUENCE[currentIndex + 1];

  const handleProceed = () => {
    onNavigate(nextStep.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-[#0D182E] to-slate-900 border-2 border-cyan-500/40 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2.5">
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider font-semibold">
                {currentStep.badge} of {APP_MODULE_SEQUENCE.length} Completed
              </span>
              <span className="text-xs text-slate-400 font-mono">·</span>
              <span className="text-xs text-slate-300 font-mono font-medium">
                {currentStep.name}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              {isLastModule ? (
                <span>Completed All Modules! Return to Foundation</span>
              ) : (
                <span>Up Next: {nextStep.name}</span>
              )}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isLastModule
                ? 'You have completed the entire 11-module curriculum. Restart your journey at GenAI 101 or explore any module directly below.'
                : nextStep.tagline}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={handleProceed}
              className={`inline-flex items-center justify-center space-x-3 px-6 py-3.5 rounded-xl font-extrabold text-sm shadow-xl transition active:scale-95 cursor-pointer group ${
                isLastModule
                  ? 'bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 hover:from-emerald-300 hover:to-cyan-400 text-slate-950 shadow-emerald-500/20'
                  : 'bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 shadow-cyan-500/25'
              }`}
            >
              <span>
                {isLastModule
                  ? 'Proceed to GenAI 101 module -->'
                  : 'Proceed to next module -->'}
              </span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Mini Module Progress Track */}
        <div className="relative z-10 pt-5 mt-5 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-mono text-[11px]">Curriculum Roadmap</span>
            <span className="font-mono text-[11px] text-cyan-400">
              Module {currentStep.moduleNumber} / {APP_MODULE_SEQUENCE.length}
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {APP_MODULE_SEQUENCE.map((m, idx) => {
              const isCurrent = m.id === currentView;
              const isPast = m.moduleNumber < currentStep.moduleNumber;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    onNavigate(m.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-mono whitespace-nowrap transition cursor-pointer flex items-center space-x-1.5 border ${
                    isCurrent
                      ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-sm'
                      : isPast
                      ? 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
                      : 'bg-slate-950/60 text-slate-400 border-slate-800/80 hover:text-slate-300'
                  }`}
                  title={m.name}
                >
                  <span>{m.moduleNumber}.</span>
                  <span>{m.shortName}</span>
                  {isPast && <CheckCircle2 className="w-3 h-3 text-emerald-400 ml-0.5" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
