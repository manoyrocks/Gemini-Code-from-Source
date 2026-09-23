import React from 'react';
import { ViewMode } from '../types/agent';
import { BookOpen, Play, FolderGit2, Code2, Scale, Terminal, Sparkles, Cpu } from 'lucide-react';

interface NavbarProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  onQuickDownload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange, onQuickDownload }) => {
  const navItems: { id: ViewMode; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'book', label: 'The Architecture Book', icon: <BookOpen className="w-4 h-4" />, badge: '18 Ch' },
    { id: 'simulator', label: 'Agent Loop Simulator', icon: <Play className="w-4 h-4" />, badge: 'Interactive' },
    { id: 'repos', label: 'Production Repos', icon: <FolderGit2 className="w-4 h-4" />, badge: '4 Stacks' },
    { id: 'code', label: 'Source Explorer', icon: <Code2 className="w-4 h-4" /> },
    { id: 'comparison', label: 'Claude vs Gemini', icon: <Scale className="w-4 h-4" /> },
    { id: 'live', label: 'Live Testbed', icon: <Cpu className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0B0F17]/95 backdrop-blur-md border-b border-[#1E293B] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div
            onClick={() => onViewChange('book')}
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

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const active = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    active
                      ? 'bg-blue-600/15 text-cyan-300 border border-blue-500/30 shadow-sm shadow-blue-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                        active
                          ? 'bg-cyan-500/20 text-cyan-300'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onQuickDownload}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-indigo-600/25 transition active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
              <span className="hidden sm:inline">Export CLI Repo</span>
              <span className="sm:hidden">Export</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-800 overflow-x-auto space-x-1">
          {navItems.map((item) => (
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
        </div>
      </div>
    </header>
  );
};
