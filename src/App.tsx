/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ViewMode } from './types/agent';
import { Navbar } from './components/Navbar';
import { BookViewer } from './components/BookViewer';
import { AgentSimulator } from './components/AgentSimulator';
import { RepoGenerator } from './components/RepoGenerator';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { CodeExplorer } from './components/CodeExplorer';
import { LivePlayground } from './components/LivePlayground';
import { PRODUCTION_REPOSITORIES } from './data/repositoriesData';
import JSZip from 'jszip';
import { Terminal, Github, BookOpen, ExternalLink, Sparkles } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('book');

  const handleQuickDownload = async () => {
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
    } catch (e) {
      console.error('Download error:', e);
      setCurrentView('repos');
    }
  };

  const handleGoToSimulator = (prompt?: string) => {
    setCurrentView('simulator');
  };

  const handleExploreCode = (filename?: string) => {
    setCurrentView('code');
  };

  return (
    <div className="min-h-screen bg-[#070A11] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onViewChange={setCurrentView}
        onQuickDownload={handleQuickDownload}
      />

      {/* Main View Display */}
      <main className="flex-1 pb-16">
        {currentView === 'book' && (
          <BookViewer
            onGoToSimulator={handleGoToSimulator}
            onExploreCode={handleExploreCode}
          />
        )}
        {currentView === 'simulator' && <AgentSimulator />}
        {currentView === 'repos' && <RepoGenerator />}
        {currentView === 'code' && <CodeExplorer />}
        {currentView === 'comparison' && <ComparisonMatrix />}
        {currentView === 'live' && <LivePlayground />}
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
              onClick={() => setCurrentView('book')}
              className="hover:text-cyan-400 transition"
            >
              The Book (18 Ch)
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={() => setCurrentView('simulator')}
              className="hover:text-cyan-400 transition"
            >
              Agent Simulator
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={() => setCurrentView('repos')}
              className="hover:text-cyan-400 transition"
            >
              Production Repos
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={() => setCurrentView('comparison')}
              className="hover:text-cyan-400 transition"
            >
              Claude vs Gemini
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
