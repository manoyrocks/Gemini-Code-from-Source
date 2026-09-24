import React, { useState, useRef, useEffect } from 'react';
import { ViewMode, ThemeId } from '../types/agent';
import { ThemeSelector } from './ThemeSelector';
import {
  BookOpen,
  Play,
  FolderGit2,
  Code2,
  Scale,
  Terminal,
  Sparkles,
  Cpu,
  ChevronDown,
  Layers,
  CheckCircle2,
  ExternalLink,
  Zap,
  Smartphone,
  Bot,
  Rocket
} from 'lucide-react';

interface NavbarProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  onQuickDownload?: () => void;
  onOpenDeployModal?: () => void;
  currentTheme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
}

interface DropdownModule {
  id: ViewMode;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onViewChange,
  onQuickDownload,
  onOpenDeployModal,
  currentTheme,
  onThemeChange,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside or escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Modules grouped under the dropdown (with GenAI 101 as 1st module, followed by Gemini Spark Work)
  const dropdownModules: DropdownModule[] = [
    {
      id: 'genai-101',
      label: 'GenAI 101',
      sublabel: 'Gemini Chat Journey (Chat/Image/Video), Prompt & Context Engineering',
      icon: <Sparkles className="w-4 h-4 text-cyan-300" />,
      badge: 'Start Here',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    },
    {
      id: 'gemini-spark',
      label: 'Gemini Spark Work',
      sublabel: 'Autonomous Workspace Agent, 24/7 Cloud Workers & Standing Directives',
      icon: <Zap className="w-4 h-4 text-amber-400" />,
      badge: 'Workspace Agent',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
    {
      id: 'gemini-ai-studio',
      label: 'Gemini AI Studio',
      sublabel: 'Web & Native Android Apps Dev (Mobile, Tablet, Web) with Live Cloud Emulation',
      icon: <Smartphone className="w-4 h-4 text-emerald-400" />,
      badge: 'Apps Builder',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    },
    {
      id: 'agentic-ai',
      label: 'Agentic AI',
      sublabel: 'Google GenAI Docs, Antigravity, Deep Research & Sample Gemini Agents',
      icon: <Bot className="w-4 h-4 text-cyan-300" />,
      badge: '4th Module',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    },
    {
      id: 'book',
      label: 'Autonomous Coding Agent',
      sublabel: '18 Chapters technical treatise on autonomous agent engineering & architecture',
      icon: <BookOpen className="w-4 h-4 text-blue-400" />,
      badge: '18 Ch',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    },
    {
      id: 'simulator',
      label: 'Agent Loop Simulator',
      sublabel: 'Simulate autonomous thinking, function calling & patch loops',
      icon: <Play className="w-4 h-4 text-cyan-400" />,
      badge: 'Interactive',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    },
    {
      id: 'repos',
      label: 'Production Repos',
      sublabel: 'Production-ready CLI, Extension, MCP Server & Microservices',
      icon: <FolderGit2 className="w-4 h-4 text-amber-400" />,
      badge: '4 Stacks',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
    {
      id: 'ai-softeng',
      label: 'AI SoftEng Repo',
      sublabel: 'Google AI Software Engineer technical interview prep & live coding lab',
      icon: <Sparkles className="w-4 h-4 text-emerald-400" />,
      badge: 'Interview',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    },
    {
      id: 'code',
      label: 'Source Explorer',
      sublabel: 'Deep-dive into architectural files, schemas & type contracts',
      icon: <Code2 className="w-4 h-4 text-indigo-400" />,
      badge: 'Source Code',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    },
    {
      id: 'comparison',
      label: 'Claude vs Gemini',
      sublabel: 'Head-to-head architectural matrix & SDK feature comparison',
      icon: <Scale className="w-4 h-4 text-purple-400" />,
      badge: 'SDK Comparison',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    },
    {
      id: 'docs',
      label: 'Docs & How-to Guides',
      sublabel: 'Complete system manual, walkthroughs, API reference & deployment guides',
      icon: <BookOpen className="w-4 h-4 text-cyan-300" />,
      badge: 'User Manual',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    },
  ];

  // Active item in the dropdown if currently selected
  const activeDropdownModule = dropdownModules.find((m) => m.id === currentView);
  const isDropdownActive = Boolean(activeDropdownModule);

  const handleSelectModule = (view: ViewMode) => {
    onViewChange(view);
    setDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B0F17]/95 backdrop-blur-md border-b border-[#1E293B] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div
            onClick={() => onViewChange('genai-101')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition">
              <div className="w-full h-full bg-[#0B0F17] rounded-lg flex items-center justify-center">
                <Terminal className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
                  Gemini Code
                </span>
                <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-cyan-400 border border-blue-500/20">
                  from source
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                Architectural Blueprint & Production Repositories for Autonomous Agents
              </p>
            </div>
          </div>

          {/* Navigation with Dropdown Menu */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-3">
            {/* Top Main Menu: Dropdown containing modules from 'The Architecture Book' to 'Claude vs Gemini' */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                  isDropdownActive
                    ? 'bg-blue-600/20 text-cyan-300 border-blue-500/40 shadow-sm shadow-blue-500/20'
                    : 'text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800/60 border-slate-700/60'
                }`}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                <span className="flex items-center space-x-1.5">
                  <span>Modules</span>
                  {activeDropdownModule && (
                    <span className="text-slate-400 font-normal hidden lg:inline">
                      ({activeDropdownModule.label})
                    </span>
                  )}
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full font-mono bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                  {dropdownModules.length}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                    dropdownOpen ? 'rotate-180 text-cyan-400' : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu Overlay Panel */}
              {dropdownOpen && (
                <div className="absolute left-0 mt-2 w-80 lg:w-96 rounded-xl bg-[#0F172A] border border-slate-700/80 shadow-2xl shadow-black/80 z-50 overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3.5 py-2.5 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-300 uppercase tracking-wider text-[10px]">
                      Modules Catalog
                    </span>
                    <span className="text-slate-500 font-mono text-[10px]">GenAI 101 → Claude vs Gemini</span>
                  </div>

                  <div className="p-1.5 max-h-[75vh] overflow-y-auto divide-y divide-slate-800/40">
                    {dropdownModules.map((module) => {
                      const isSelected = currentView === module.id;
                      return (
                        <button
                          key={module.id}
                          onClick={() => handleSelectModule(module.id)}
                          className={`w-full text-left p-2.5 rounded-lg flex items-start space-x-3 transition-colors ${
                            isSelected
                              ? 'bg-blue-600/15 border border-blue-500/30 text-white'
                              : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
                          }`}
                        >
                          <div
                            className={`p-2 rounded-lg mt-0.5 ${
                              isSelected
                                ? 'bg-blue-500/20 border border-blue-500/40'
                                : 'bg-slate-800 border border-slate-700/60'
                            }`}
                          >
                            {module.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span
                                className={`text-xs font-semibold truncate ${
                                  isSelected ? 'text-cyan-300' : 'text-slate-200'
                                }`}
                              >
                                {module.label}
                              </span>
                              {module.badge && (
                                <span
                                  className={`text-[9px] px-1.5 py-0.2 rounded font-mono border ${
                                    module.badgeColor || 'bg-slate-800 text-slate-400 border-slate-700'
                                  }`}
                                >
                                  {module.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 leading-tight mt-0.5 line-clamp-2">
                              {module.sublabel}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-2.5 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center space-x-1.5">
                      <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Gemini 3.8 Flash & @google/genai SDK</span>
                    </span>
                    <button
                      onClick={() => handleSelectModule('ai-softeng')}
                      className="text-emerald-400 hover:text-emerald-300 font-medium cursor-pointer"
                    >
                      Interview Lab →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Link: Live Testbed */}
            <button
              onClick={() => onViewChange('live')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentView === 'live'
                  ? 'bg-blue-600/15 text-cyan-300 border border-blue-500/30 shadow-sm shadow-blue-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Live Testbed</span>
            </button>
          </nav>

          {/* Right Action: Docs link & Color Theme Selector at top right corner */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* In-App System Manual & How-to Guides */}
            <button
              onClick={() => onViewChange('docs')}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                currentView === 'docs'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60'
              }`}
              title="Application Documentation & How-to Guides"
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">User Guides</span>
              <span className="sm:hidden">Guides</span>
            </button>

            <a
              href="https://ai.google.dev/gemini-api/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition"
              title="Official Google GenAI SDK Documentation"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              <span>Google GenAI Docs</span>
            </a>

            {/* Deploy to GitHub Pages Modal Trigger */}
            {onOpenDeployModal && (
              <button
                onClick={onOpenDeployModal}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-sm shadow-cyan-500/25 border border-cyan-400/30 transition cursor-pointer"
                title="Deploy repository to GitHub Pages"
              >
                <Rocket className="w-3.5 h-3.5 text-white animate-pulse" />
                <span className="hidden sm:inline">Deploy to GitHub Pages</span>
                <span className="sm:hidden">Deploy</span>
              </button>
            )}

            {/* Color Themes Selector at the top right corner */}
            <ThemeSelector
              currentTheme={currentTheme}
              onThemeChange={onThemeChange}
            />
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-800 overflow-x-auto space-x-1">
          {dropdownModules.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex flex-col items-center py-1 px-2 text-[10px] whitespace-nowrap rounded ${
                currentView === item.id ? 'text-cyan-400 font-semibold' : 'text-slate-400'
              }`}
            >
              {item.icon}
              <span className="mt-0.5">{item.label.split(' ')[0]}</span>
            </button>
          ))}
          <button
            onClick={() => onViewChange('live')}
            className={`flex flex-col items-center py-1 px-2 text-[10px] whitespace-nowrap rounded ${
              currentView === 'live' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span className="mt-0.5">Live</span>
          </button>
        </div>
      </div>
    </header>
  );
};
