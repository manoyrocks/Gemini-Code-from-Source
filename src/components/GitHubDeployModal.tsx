import React, { useState } from 'react';
import {
  X,
  Github,
  Rocket,
  Key,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  Copy,
  Check,
  Globe,
  Terminal,
  Download
} from 'lucide-react';

interface GitHubDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuickDownload?: () => void;
}

export const GitHubDeployModal: React.FC<GitHubDeployModalProps> = ({
  isOpen,
  onClose,
  onQuickDownload,
}) => {
  const [token, setToken] = useState('');
  const [showToken, setShowToken] = useState(false);
  const [repoUrl, setRepoUrl] = useState('https://github.com/manoyrocks/Gemini-Code-from-Source.git');
  const [isPushing, setIsPushing] = useState(false);
  const [pushResult, setPushResult] = useState<{
    success?: boolean;
    message?: string;
    pagesUrl?: string;
    error?: string;
    details?: string;
  } | null>(null);
  const [copiedCmd, setCopiedCmd] = useState(false);

  if (!isOpen) return null;

  const handlePush = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) return;

    setIsPushing(true);
    setPushResult(null);

    try {
      const response = await fetch('/api/git-push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: token.trim(),
          repo: repoUrl.trim(),
          branch: 'main',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to push to GitHub repository');
      }

      setPushResult({
        success: true,
        message: data.message,
        pagesUrl: data.pagesUrl,
        details: data.details,
      });
    } catch (err: any) {
      setPushResult({
        success: false,
        error: err.message || 'Unknown network error occurred',
      });
    } finally {
      setIsPushing(false);
    }
  };

  const copyLocalCommand = () => {
    navigator.clipboard.writeText('git push origin main');
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                Deploy to GitHub Pages
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono font-medium">
                  CI/CD Ready
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Automated build & release via GitHub Actions workflow
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Target Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Target Repository
              </span>
              <a
                href="https://github.com/manoyrocks/Gemini-Code-from-Source"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cyan-400 hover:text-cyan-300 font-mono font-medium flex items-center gap-1.5 break-all"
              >
                <Github className="w-4 h-4 shrink-0" />
                manoyrocks/Gemini-Code-from-Source
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Live GitHub Pages URL
              </span>
              <a
                href="https://manoyrocks.github.io/Gemini-Code-from-Source/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-400 hover:text-emerald-300 font-mono font-medium flex items-center gap-1.5 break-all"
              >
                <Globe className="w-4 h-4 shrink-0" />
                manoyrocks.github.io/Gemini-Code...
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            </div>
          </div>

          {/* GitHub Pages Setup Note */}
          <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-800/40 text-xs text-slate-300 space-y-1.5">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>One-Time GitHub Pages Setting Required on GitHub</span>
            </div>
            <p className="text-slate-400 pl-6">
              In your GitHub repo, go to <span className="text-slate-200 font-medium">Settings &rarr; Pages</span>. Under <span className="text-slate-200 font-medium">Build and deployment &rarr; Source</span>, choose <span className="text-cyan-300 font-semibold">GitHub Actions</span>. The workflow <code className="text-cyan-400 bg-slate-900 px-1 py-0.5 rounded">.github/workflows/deploy.yml</code> handles the rest automatically!
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handlePush} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-cyan-400" />
                  GitHub Personal Access Token (PAT)
                </label>
                <a
                  href="https://github.com/settings/tokens/new?scopes=repo&description=AI+Studio+Gemini+Code+from+Source"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 hover:underline"
                >
                  Generate token with repo scope &rarr;
                </a>
              </div>
              <div className="relative">
                <input
                  type={showToken ? 'text' : 'password'}
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Paste your GitHub token (ghp_...)"
                  className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 pr-10 font-mono"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowToken(!showToken)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="mt-1.5 text-[11px] text-slate-400">
                Your token is sent directly to execute the push and is never persisted on disk.
              </p>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isPushing || !token.trim()}
              className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              {isPushing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Pushing to GitHub & Triggering Workflow...</span>
                </>
              ) : (
                <>
                  <Rocket className="w-4 h-4" />
                  <span>Push to GitHub & Deploy to GitHub Pages</span>
                </>
              )}
            </button>
          </form>

          {/* Feedback states */}
          {pushResult && (
            <div
              className={`p-4 rounded-xl border text-xs ${
                pushResult.success
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                  : 'bg-red-950/40 border-red-500/40 text-red-200'
              }`}
            >
              <div className="flex items-start gap-2.5">
                {pushResult.success ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                )}
                <div className="space-y-2 flex-1">
                  <p className="font-semibold text-sm">
                    {pushResult.success ? 'Deployment Triggered Successfully!' : 'Push Failed'}
                  </p>
                  <p className="text-xs opacity-90">
                    {pushResult.message || pushResult.error}
                  </p>

                  {pushResult.success && (
                    <div className="pt-2 flex flex-wrap gap-2">
                      <a
                        href="https://github.com/manoyrocks/Gemini-Code-from-Source/actions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/60 font-medium transition"
                      >
                        <Github className="w-3.5 h-3.5" />
                        Watch GitHub Actions Build
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <a
                        href="https://manoyrocks.github.io/Gemini-Code-from-Source/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-900/60 hover:bg-cyan-800 text-cyan-200 border border-cyan-700/60 font-medium transition"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        Open Live Site
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Local Alternative */}
          <div className="pt-2 border-t border-slate-800/80">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
              Alternative: Push from your local computer
            </span>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={copyLocalCommand}
                className="flex-1 flex items-center justify-between px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300 hover:border-slate-700 transition"
              >
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>git push origin main</span>
                </div>
                {copiedCmd ? (
                  <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                    <Check className="w-3.5 h-3.5" /> Copied
                  </span>
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                )}
              </button>

              {onQuickDownload && (
                <button
                  type="button"
                  onClick={onQuickDownload}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Download .zip</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
