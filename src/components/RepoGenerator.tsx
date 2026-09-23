import React, { useState } from 'react';
import { PRODUCTION_REPOSITORIES } from '../data/repositoriesData';
import { ProductionRepo, RepoFile } from '../types/agent';
import JSZip from 'jszip';
import {
  Download,
  Terminal,
  Server,
  Eye,
  Mic,
  Check,
  Copy,
  Folder,
  FileCode,
  Sparkles,
  Settings2,
  ExternalLink,
  Code2,
} from 'lucide-react';

export const RepoGenerator: React.FC = () => {
  const [selectedRepoId, setSelectedRepoId] = useState<string>('gemini-code-cli');
  const [selectedFileIdx, setSelectedFileIdx] = useState<number>(0);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [copiedFile, setCopiedFile] = useState<boolean>(false);

  // Custom Repo Configurator States
  const [showConfigurator, setShowConfigurator] = useState<boolean>(false);
  const [customStack, setCustomStack] = useState<'cli' | 'server' | 'hybrid'>('cli');
  const [customModel, setCustomModel] = useState<string>('gemini-3.8-flash');
  const [includeCaching, setIncludeCaching] = useState<boolean>(true);
  const [includeSubagents, setIncludeSubagents] = useState<boolean>(true);
  const [includeLiveAudio, setIncludeLiveAudio] = useState<boolean>(false);
  const [customName, setCustomName] = useState<string>('my-gemini-agent');

  const currentRepo =
    PRODUCTION_REPOSITORIES.find((r) => r.id === selectedRepoId) || PRODUCTION_REPOSITORIES[0];
  const currentFile: RepoFile = currentRepo.files[selectedFileIdx] || currentRepo.files[0];

  // Download complete repo as .zip file
  const handleDownloadZip = async (repo: ProductionRepo) => {
    setIsDownloading(true);
    try {
      const zip = new JSZip();
      const folder = zip.folder(repo.name);

      repo.files.forEach((f) => {
        folder?.file(f.path, f.content);
      });

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${repo.name}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to generate ZIP:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  // Generate and download customized repository
  const handleGenerateCustomZip = async () => {
    setIsDownloading(true);
    try {
      const zip = new JSZip();
      const folder = zip.folder(customName);

      // Package JSON
      folder?.file(
        'package.json',
        JSON.stringify(
          {
            name: customName,
            version: '1.0.0',
            type: 'module',
            scripts: {
              build: 'tsc',
              start: customStack === 'cli' ? 'tsx src/cli.ts' : 'tsx src/server.ts',
            },
            dependencies: {
              '@google/genai': '^2.4.0',
              dotenv: '^17.2.3',
              ...(customStack === 'server' || customStack === 'hybrid'
                ? { express: '^4.21.2', cors: '^2.8.5' }
                : { chalk: '^5.3.0', ora: '^8.0.1', commander: '^12.0.0' }),
              ...(includeLiveAudio ? { ws: '^8.18.0' } : {}),
            },
            devDependencies: {
              '@types/node': '^22.14.0',
              typescript: '^7.0.2',
              tsx: '^4.21.0',
            },
          },
          null,
          2
        )
      );

      // TSConfig
      folder?.file(
        'tsconfig.json',
        JSON.stringify(
          {
            compilerOptions: {
              target: 'ES2022',
              module: 'NodeNext',
              moduleResolution: 'NodeNext',
              strict: true,
              skipLibCheck: true,
            },
            include: ['src/**/*'],
          },
          null,
          2
        )
      );

      // .env.example
      folder?.file('README.md', `# ${customName}\n\nGenerated with Gemini Code From Source.`);
      folder?.file('.env.example', 'GEMINI_API_KEY="your-gemini-api-key"\n');

      // Core Agent Entry
      folder?.file(
        'src/agent.ts',
        `import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: { headers: { 'User-Agent': 'aistudio-build/${customName}' } },
});

export const MODEL = "${customModel}";
export const USE_CONTEXT_CACHING = ${includeCaching};
export const USE_SUBAGENTS = ${includeSubagents};

console.log("[Agent] Initialized with model: " + MODEL);
`
      );

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${customName}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setShowConfigurator(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyCurrentFile = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopiedFile(true);
    setTimeout(() => setCopiedFile(false), 2000);
  };

  const getRepoIcon = (icon: string) => {
    switch (icon) {
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-cyan-400" />;
      case 'Server':
        return <Server className="w-5 h-5 text-indigo-400" />;
      case 'Eye':
        return <Eye className="w-5 h-5 text-emerald-400" />;
      case 'Mic':
        return <Mic className="w-5 h-5 text-amber-400" />;
      default:
        return <Terminal className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-mono mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready-to-Deploy Codebases</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Production-Ready Code Repositories
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Fully typed, standalone TypeScript repositories engineered directly from Google Gemini documentation. Inspect every source file and export as runnable .zip bundles.
          </p>
        </div>

        <button
          onClick={() => setShowConfigurator(true)}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:opacity-90 text-white shadow-lg shadow-indigo-600/25 transition active:scale-95"
        >
          <Settings2 className="w-4 h-4" />
          <span>Custom Repo Configurator</span>
        </button>
      </div>

      {/* Repo Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {PRODUCTION_REPOSITORIES.map((repo) => {
          const active = repo.id === selectedRepoId;
          return (
            <div
              key={repo.id}
              onClick={() => {
                setSelectedRepoId(repo.id);
                setSelectedFileIdx(0);
              }}
              className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                active
                  ? 'bg-blue-600/10 border-cyan-500/50 shadow-lg shadow-blue-500/10 ring-1 ring-cyan-500/30'
                  : 'bg-[#0F172A] border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                    {getRepoIcon(repo.icon)}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    {repo.files.length} files
                  </span>
                </div>
                <h3 className="font-bold text-white text-sm tracking-tight">{repo.name}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{repo.tagline}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="truncate max-w-[140px] text-cyan-300">{repo.geminiModel.split('/')[0]}</span>
                <span className="text-slate-500">TypeScript</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Repository Detail & File Explorer */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* Repo Header Bar */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-slate-800 border border-slate-700">
                {getRepoIcon(currentRepo.icon)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-mono">{currentRepo.name}</h3>
                <p className="text-xs text-slate-300">{currentRepo.description}</p>
              </div>
            </div>

            {/* Feature Badges */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {currentRepo.features.map((feat, i) => (
                <span
                  key={i}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-cyan-300 border border-blue-500/20"
                >
                  {feat}
                </span>
              ))}
            </div>
          </div>

          {/* Download Button */}
          <button
            onClick={() => handleDownloadZip(currentRepo)}
            disabled={isDownloading}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/20 transition active:scale-95 disabled:opacity-50 shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>{isDownloading ? 'Bundling ZIP...' : `Download ${currentRepo.name}.zip`}</span>
          </button>
        </div>

        {/* File Browser Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[480px]">
          {/* File Tree Column */}
          <div className="md:col-span-4 border-r border-slate-800 bg-[#0B0F17] p-4">
            <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold px-2 mb-2 flex items-center space-x-1.5">
              <Folder className="w-3.5 h-3.5 text-blue-400" />
              <span>Project Structure</span>
            </div>
            <div className="space-y-1">
              {currentRepo.files.map((file, idx) => {
                const active = idx === selectedFileIdx;
                return (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFileIdx(idx)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition flex items-center justify-between ${
                      active
                        ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    <span className="truncate">{file.path}</span>
                    {file.isEntry && (
                      <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded ml-2">
                        entry
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* File Editor Preview */}
          <div className="md:col-span-8 bg-[#0B0F17] flex flex-col">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
              <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
                <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                <span>{currentFile.path}</span>
              </div>
              <button
                onClick={handleCopyCurrentFile}
                className="flex items-center space-x-1 text-xs font-mono text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition"
              >
                {copiedFile ? (
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

            <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed flex-1 max-h-[500px]">
              <code>{currentFile.content}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Custom Repo Configurator Modal */}
      {showConfigurator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0F172A] border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <div className="flex items-center space-x-2">
                <Settings2 className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Custom Agent Repo Configurator</h3>
              </div>
              <button
                onClick={() => setShowConfigurator(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Repo Name */}
              <div>
                <label className="block text-slate-300 font-mono mb-1">Repository Name</label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              {/* Architecture Target */}
              <div>
                <label className="block text-slate-300 font-mono mb-1">Architecture Target</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['cli', 'server', 'hybrid'] as const).map((stack) => (
                    <button
                      key={stack}
                      type="button"
                      onClick={() => setCustomStack(stack)}
                      className={`p-2 rounded-lg border text-center font-mono uppercase ${
                        customStack === stack
                          ? 'bg-blue-600/20 border-cyan-500 text-cyan-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      {stack}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gemini Model */}
              <div>
                <label className="block text-slate-300 font-mono mb-1">Primary Gemini Model</label>
                <select
                  value={customModel}
                  onChange={(e) => setCustomModel(e.target.value)}
                  className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
                >
                  <option value="gemini-3.8-flash">gemini-3.8-flash (Recommended, fast & cost-efficient)</option>
                  <option value="gemini-3.1-pro-preview">gemini-3.1-pro-preview (Complex reasoning & math)</option>
                </select>
              </div>

              {/* Feature Toggles */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeCaching}
                    onChange={(e) => setIncludeCaching(e.target.checked)}
                    className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0"
                  />
                  <span className="text-slate-300">
                    Enable Gemini Context Caching (ai.caches.create with 75% savings)
                  </span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeSubagents}
                    onChange={(e) => setIncludeSubagents(e.target.checked)}
                    className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0"
                  />
                  <span className="text-slate-300">
                    Include Coordinator & Subagent Swarm (Explorer, Coder, Reviewer)
                  </span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeLiveAudio}
                    onChange={(e) => setIncludeLiveAudio(e.target.checked)}
                    className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0"
                  />
                  <span className="text-slate-300">
                    Include Gemini Live Audio API (Real-time voice pairing over WebSockets)
                  </span>
                </label>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end space-x-3">
              <button
                onClick={() => setShowConfigurator(false)}
                className="px-4 py-2 rounded-lg text-xs font-mono text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateCustomZip}
                disabled={isDownloading}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isDownloading ? 'Building ZIP...' : 'Generate & Download .ZIP'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
