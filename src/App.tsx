/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ViewMode, ThemeId } from './types/agent';
import { Navbar } from './components/Navbar';
import { BookViewer } from './components/BookViewer';
import { AgentSimulator } from './components/AgentSimulator';
import { RepoGenerator } from './components/RepoGenerator';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { CodeExplorer } from './components/CodeExplorer';
import { LivePlayground } from './components/LivePlayground';
import { AISoftwareEngineerRepo } from './components/AISoftwareEngineerRepo';
import { GenAI101 } from './components/GenAI101';
import { GeminiSparkWork } from './components/GeminiSparkWork';
import { GeminiAIStudio } from './components/GeminiAiStudio';
import { AgenticAI } from './components/AgenticAI';
import { AppDocumentation } from './components/AppDocumentation';
import { ModuleNavigationFooter, APP_MODULE_SEQUENCE } from './components/ModuleNavigationFooter';
import { GitHubDeployModal } from './components/GitHubDeployModal';
import { PRODUCTION_REPOSITORIES } from './data/repositoriesData';
import JSZip from 'jszip';
import {
  Terminal,
  Github,
  BookOpen,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Loader2,
  FolderGit2
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('genai-101');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportSuccess, setExportSuccess] = useState<boolean>(false);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState<boolean>(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeId>(() => {
    try {
      const saved = localStorage.getItem('gemini_code_theme') as ThemeId;
      if (
        saved &&
        ['dark', 'bark', 'light', 'ambient', 'light-green', 'light-pink'].includes(saved)
      ) {
        return saved;
      }
    } catch (e) {
      // ignore
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    try {
      localStorage.setItem('gemini_code_theme', currentTheme);
    } catch (e) {
      // ignore
    }
  }, [currentTheme]);

  const handleQuickDownload = async () => {
    if (isExporting) return;
    setIsExporting(true);
    setExportSuccess(false);
    const cliRepo = PRODUCTION_REPOSITORIES[0];
    try {
      const zip = new JSZip();
      const folder = zip.folder(cliRepo.name);
      cliRepo.files.forEach((f) => {
        folder?.file(f.path, f.content);
      });
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${cliRepo.name}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 4000);
    } catch (e) {
      console.error('Download error:', e);
      setCurrentView('repos');
    } finally {
      setIsExporting(false);
    }
  };

  const handleGoToSimulator = (prompt?: string) => {
    setCurrentView('simulator');
  };

  const handleExploreCode = (filename?: string) => {
    setCurrentView('code');
  };

  const handleProceedToNext = (fromView: ViewMode) => {
    const idx = APP_MODULE_SEQUENCE.findIndex((m) => m.id === fromView);
    if (idx === -1 || idx === APP_MODULE_SEQUENCE.length - 1) {
      setCurrentView('genai-101');
    } else {
      setCurrentView(APP_MODULE_SEQUENCE[idx + 1].id);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      data-theme={currentTheme}
      className="min-h-screen bg-[#070A11] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200 transition-colors duration-200"
    >
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onViewChange={setCurrentView}
        onQuickDownload={handleQuickDownload}
        onOpenDeployModal={() => setIsDeployModalOpen(true)}
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
      />

      {/* GitHub Pages Deploy Modal */}
      <GitHubDeployModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
        onQuickDownload={handleQuickDownload}
      />

      {/* Main View Display */}
      <main className="flex-1 pb-16">
        {currentView === 'genai-101' && (
          <GenAI101
            onProceedNext={() => handleProceedToNext('genai-101')}
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
        {currentView === 'gemini-spark' && (
          <GeminiSparkWork
            onProceedNext={() => handleProceedToNext('gemini-spark')}
          />
        )}
        {currentView === 'gemini-ai-studio' && (
          <GeminiAIStudio
            onProceedNext={() => handleProceedToNext('gemini-ai-studio')}
          />
        )}
        {currentView === 'agentic-ai' && (
          <AgenticAI
            onProceedNext={() => handleProceedToNext('agentic-ai')}
          />
        )}
        {currentView === 'book' && (
          <BookViewer
            onGoToSimulator={handleGoToSimulator}
            onExploreCode={handleExploreCode}
          />
        )}
        {currentView === 'ai-softeng' && <AISoftwareEngineerRepo />}
        {currentView === 'simulator' && <AgentSimulator />}
        {currentView === 'repos' && <RepoGenerator />}
        {currentView === 'code' && <CodeExplorer />}
        {currentView === 'comparison' && <ComparisonMatrix />}
        {currentView === 'live' && <LivePlayground />}
        {currentView === 'docs' && (
          <AppDocumentation
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenDeployModal={() => setIsDeployModalOpen(true)}
          />
        )}

        {/* Universal Module Progression Card on EVERY module */}
        <ModuleNavigationFooter
          currentView={currentView}
          onNavigate={(view) => {
            setCurrentView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#0B0F17] py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-slate-900 font-bold text-xs">
              G
            </div>
            <div>
              <div className="font-semibold text-slate-200">Gemini Code From Source</div>
              <div className="text-[11px] text-slate-400">
                Autonomous Coding Agent Engineering based on official Google Gemini documentation & @google/genai SDK.
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono">
            <button
              onClick={() => setCurrentView('genai-101')}
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition cursor-pointer"
            >
              GenAI 101
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={() => setCurrentView('gemini-spark')}
              className="text-amber-300 hover:text-amber-200 font-semibold transition cursor-pointer"
            >
              Gemini Spark Work
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={() => setCurrentView('gemini-ai-studio')}
              className="text-purple-300 hover:text-purple-200 font-semibold transition cursor-pointer"
            >
              Gemini AI Studio
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={() => setCurrentView('agentic-ai')}
              className="text-emerald-300 hover:text-emerald-200 font-semibold transition cursor-pointer"
            >
              Agentic AI
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={() => setCurrentView('book')}
              className="hover:text-cyan-400 transition cursor-pointer"
            >
              Autonomous Coding Agent (18 Ch)
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={() => setCurrentView('simulator')}
              className="hover:text-cyan-400 transition cursor-pointer"
            >
              Agent Simulator
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={() => setCurrentView('repos')}
              className="hover:text-cyan-400 transition cursor-pointer"
            >
              Production Repos
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={() => setCurrentView('ai-softeng')}
              className="text-emerald-400 hover:text-emerald-300 font-semibold transition cursor-pointer"
            >
              AI SoftEng Repo (Interview Prep)
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={() => setCurrentView('comparison')}
              className="hover:text-cyan-400 transition cursor-pointer"
            >
              Claude vs Gemini
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={() => {
                setCurrentView('docs');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition cursor-pointer"
            >
              Docs &amp; Guides
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Bottom-Right Corner Action: Export CLI Repo */}
      <aside aria-label="Export CLI Repository" className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2 pointer-events-auto">
        {exportSuccess && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-200 bg-emerald-950/95 border border-emerald-500/50 text-emerald-200 px-3.5 py-2 rounded-xl shadow-xl backdrop-blur-md text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Downloaded <strong>gemini-code-cli.zip</strong>!</span>
          </div>
        )}

        <div className="flex items-stretch bg-[#0c1220]/95 backdrop-blur-md border border-cyan-500/40 hover:border-cyan-400/70 rounded-2xl shadow-2xl shadow-black/80 transition-all duration-200 group overflow-hidden p-1 gap-1">
          <button
            onClick={handleQuickDownload}
            disabled={isExporting}
            className="flex items-center space-x-2.5 px-4 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-500 active:scale-95 shadow-md shadow-blue-600/30 transition-all cursor-pointer disabled:opacity-70 disabled:cursor-wait"
            title="Download gemini-code-cli.zip directly"
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 text-cyan-200 animate-spin shrink-0" />
            ) : (
              <Sparkles className="w-4 h-4 text-cyan-200 group-hover:rotate-12 transition-transform shrink-0" />
            )}
            <div className="flex flex-col items-start text-left leading-tight">
              <div className="flex items-center space-x-1.5 font-bold tracking-tight text-white text-xs">
                <span>Export CLI Repo</span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-400/25 text-cyan-200 border border-cyan-400/30">
                  .ZIP
                </span>
              </div>
              <span className="text-[10px] text-cyan-200/70 font-normal">
                {isExporting ? 'Packaging sources...' : 'gemini-code-cli • Node 20+'}
              </span>
            </div>
          </button>

          <button
            onClick={() => setCurrentView('repos')}
            className="flex items-center justify-center px-2.5 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-slate-800/80 transition-colors"
            title="Browse all production repositories in detail"
          >
            <FolderGit2 className="w-4 h-4" />
          </button>
        </div>
      </aside>
    </div>
  );
}
