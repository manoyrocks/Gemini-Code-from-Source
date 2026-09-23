import React, { useState, useEffect } from 'react';
import { Cpu, Send, Sparkles, Terminal, Code2, CheckCircle2, AlertCircle } from 'lucide-react';

export const LivePlayground: React.FC = () => {
  const [prompt, setPrompt] = useState<string>(
    'Diagnose the failing auth controller in src/controllers/auth.ts and propose the exact tool call to inspect it.'
  );
  const [systemInstruction, setSystemInstruction] = useState<string>(
    'You are Gemini Code, an autonomous software engineering agent. You inspect files, propose surgical edits, and solve engineering tasks by calling tools.'
  );
  const [toolsEnabled, setToolsEnabled] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseOutput, setResponseOutput] = useState<any>(null);
  const [healthStatus, setHealthStatus] = useState<any>(null);

  useEffect(() => {
    fetch('/api/health')
      .then((r) => r.json())
      .then((data) => setHealthStatus(data))
      .catch((err) => console.log('Backend health check error:', err));
  }, []);

  const handleExecute = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setResponseOutput(null);

    try {
      const res = await fetch('/api/gemini/agent-step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          systemInstruction,
          toolsEnabled,
        }),
      });

      const data = await res.json();
      setResponseOutput(data);
    } catch (err: any) {
      setResponseOutput({ error: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 sm:p-8 mb-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>Live Gemini 3 Backend Testbed</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Execute Live Gemini Agent Turns
            </h2>
            <p className="mt-1 text-slate-300 text-xs sm:text-sm">
              Connect to the fullstack Express proxy running <code className="text-cyan-300 font-mono">gemini-3.8-flash</code> and test real-time tool calling and reasoning.
            </p>
          </div>

          {healthStatus && (
            <div className="p-3 rounded-xl bg-[#0B0F17] border border-slate-800 text-xs font-mono shrink-0">
              <div className="flex items-center space-x-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    healthStatus.hasApiKey ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                  }`}
                />
                <span className="text-white">
                  {healthStatus.hasApiKey ? 'API Key Active' : 'API Key Pending'}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1">Model: {healthStatus.model}</div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase font-semibold">
                Agent Directive / Prompt
              </label>
              <textarea
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter task instructions..."
                className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase font-semibold">
                System Instruction
              </label>
              <textarea
                rows={3}
                value={systemInstruction}
                onChange={(e) => setSystemInstruction(e.target.value)}
                className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center space-x-2 cursor-pointer text-xs font-mono text-slate-300">
                <input
                  type="checkbox"
                  checked={toolsEnabled}
                  onChange={(e) => setToolsEnabled(e.target.checked)}
                  className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span>Attach Agent Tools (view_file, edit_file, run_command)</span>
              </label>

              <button
                onClick={handleExecute}
                disabled={isLoading}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-indigo-600/20 transition active:scale-95 disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Calling Gemini...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Run Agent Turn</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Output */}
        <div className="lg:col-span-6">
          <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl h-full flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <span className="text-xs font-mono font-semibold uppercase text-slate-400">
                GenerateContent Response & Tool Calls
              </span>
              {responseOutput?.usage && (
                <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                  {responseOutput.usage.totalTokenCount} tokens
                </span>
              )}
            </div>

            {isLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center py-12 text-slate-400 space-y-3">
                <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
                <span className="text-xs font-mono">Gemini 3.8 Flash is reasoning and evaluating tools...</span>
              </div>
            ) : responseOutput ? (
              <div className="space-y-4 flex-1 overflow-y-auto max-h-[500px]">
                {responseOutput.error ? (
                  <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-300 text-xs">
                    <div className="font-bold mb-1">Execution Error</div>
                    {responseOutput.error}
                  </div>
                ) : (
                  <>
                    {/* Tool Calls Emitted */}
                    {responseOutput.functionCalls && responseOutput.functionCalls.length > 0 && (
                      <div className="p-4 rounded-xl bg-[#0B0F17] border border-cyan-500/30">
                        <div className="text-xs font-mono font-semibold text-cyan-400 mb-2 flex items-center space-x-1.5">
                          <Terminal className="w-3.5 h-3.5" />
                          <span>Emitted Function Call(s):</span>
                        </div>
                        {responseOutput.functionCalls.map((fc: any, i: number) => (
                          <div key={i} className="font-mono text-xs text-amber-300 bg-slate-900 p-2.5 rounded-lg border border-slate-800 mb-2 last:mb-0">
                            <span className="font-bold text-white">{fc.name}</span>({JSON.stringify(fc.args, null, 2)})
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Model Text Output */}
                    {responseOutput.text && (
                      <div className="p-4 rounded-xl bg-[#0B0F17] border border-slate-800">
                        <div className="text-xs font-mono font-semibold text-slate-400 mb-2">
                          Model Commentary
                        </div>
                        <p className="text-xs text-slate-200 font-sans leading-relaxed whitespace-pre-wrap">
                          {responseOutput.text}
                        </p>
                      </div>
                    )}

                    {/* Raw JSON Details */}
                    <div className="rounded-xl overflow-hidden border border-slate-800">
                      <div className="bg-slate-900 px-3 py-1.5 text-[10px] font-mono text-slate-400">
                        Raw Response Data
                      </div>
                      <pre className="p-3 bg-[#0B0F17] text-[11px] font-mono text-slate-400 overflow-x-auto max-h-48">
                        <code>{JSON.stringify(responseOutput, null, 2)}</code>
                      </pre>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center py-12 text-slate-500 text-xs font-mono text-center">
                <Sparkles className="w-6 h-6 text-slate-600 mb-2" />
                <span>Click "Run Agent Turn" to query Gemini 3 and observe autonomous tool selection.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
