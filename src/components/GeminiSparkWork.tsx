import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  Layers,
  Cpu,
  ShieldCheck,
  FolderGit2,
  Play,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  FileText,
  Mail,
  Calendar,
  Video,
  Table,
  MessageSquare,
  AlertTriangle,
  RotateCw,
  Terminal,
  Activity,
  Server,
  KeyRound,
  Check
} from 'lucide-react';
import { GEMINI_SPARK_CONTENT, SparkWorkflow } from '../data/geminiSparkData';

export interface GeminiSparkWorkProps {
  onProceedNext?: () => void;
}

export const GeminiSparkWork: React.FC<GeminiSparkWorkProps> = ({ onProceedNext }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'simulator' | 'standing-directives' | 'security'>('simulator');
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>('wf-quarterly-sales-sync');
  const [isSimulatingRun, setIsSimulatingRun] = useState<boolean>(false);
  const [simulatedStepProgress, setSimulatedStepProgress] = useState<number>(4); // all completed initially
  const [customDirectiveText, setCustomDirectiveText] = useState<string>('');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const selectedWorkflow =
    GEMINI_SPARK_CONTENT.sampleWorkflows.find((w) => w.id === selectedWorkflowId) ||
    GEMINI_SPARK_CONTENT.sampleWorkflows[0];

  const handleTriggerRun = () => {
    setIsSimulatingRun(true);
    setSimulatedStepProgress(0);

    const interval = setInterval(() => {
      setSimulatedStepProgress((prev) => {
        if (prev >= selectedWorkflow.steps.length) {
          clearInterval(interval);
          setIsSimulatingRun(false);
          return selectedWorkflow.steps.length;
        }
        return prev + 1;
      });
    }, 700);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const renderAppIcon = (app: string) => {
    switch (app.toLowerCase()) {
      case 'gmail':
        return <Mail className="w-4 h-4 text-red-400" />;
      case 'google docs':
      case 'docs':
        return <FileText className="w-4 h-4 text-blue-400" />;
      case 'google sheets':
      case 'sheets':
        return <Table className="w-4 h-4 text-emerald-400" />;
      case 'google calendar':
      case 'calendar':
        return <Calendar className="w-4 h-4 text-amber-400" />;
      case 'google meet':
      case 'meet':
        return <Video className="w-4 h-4 text-teal-400" />;
      case 'google chat':
      case 'chat':
        return <MessageSquare className="w-4 h-4 text-emerald-400" />;
      case 'google drive':
      case 'drive':
        return <FolderGit2 className="w-4 h-4 text-yellow-400" />;
      default:
        return <Zap className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0B132B] via-[#0E1A38] to-[#070D1E] border border-amber-500/20 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>MODULE 2 · GEMINI SPARK ENTERPRISE AGENTIC SUITE</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Gemini Spark Work
              </h1>
            </div>

            {onProceedNext && (
              <button
                onClick={onProceedNext}
                className="inline-flex items-center space-x-2.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition active:scale-95 cursor-pointer shrink-0 self-start md:self-center group"
              >
                <span>Proceed to next module --&gt;</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            )}
          </div>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            {GEMINI_SPARK_CONTENT.header.description}{' '}
            <a
              href="https://gemini.google.com/spark"
              target="_blank"
              rel="noreferrer"
              className="text-amber-300 hover:text-amber-200 underline font-mono inline-flex items-center space-x-1"
            >
              <span>gemini.google.com/spark</span>
              <ExternalLink className="w-3 h-3" />
            </a>.
          </p>

          {/* Metric Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
            {GEMINI_SPARK_CONTENT.header.metrics.map((m, idx) => (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 hover:border-amber-500/40 transition"
              >
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  {m.label}
                </div>
                <div className="text-xs font-bold text-amber-300 mt-1 truncate">
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'simulator'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Interactive Spark Workflow Simulator</span>
        </button>

        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Spark Core Capabilities & Architecture</span>
        </button>

        <button
          onClick={() => setActiveTab('standing-directives')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'standing-directives'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Standing Directives & MCP Connectors</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'security'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Enterprise DLP & Zero Data Retention</span>
        </button>
      </div>

      {/* TAB 1: INTERACTIVE WORKFLOW SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="space-y-6">
          {/* Header Controls */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Simulate Autonomous Spark Directives Across Google Workspace</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Observe Gemini Spark executing continuous multi-app workflows across Gmail, Drive, Docs, Sheets, and Calendar.
              </p>
            </div>

            {/* Workflow Picker */}
            <div className="flex flex-wrap items-center gap-2">
              {GEMINI_SPARK_CONTENT.sampleWorkflows.map((wf) => (
                <button
                  key={wf.id}
                  onClick={() => {
                    setSelectedWorkflowId(wf.id);
                    setSimulatedStepProgress(wf.steps.length);
                    setIsSimulatingRun(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                    selectedWorkflowId === wf.id
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80'
                  }`}
                >
                  {wf.name.split('&')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Workflow Details Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Directive & Parameters */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-[#0A0E1A] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-white">Spark Standing Directive</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {selectedWorkflow.category}
                  </span>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    Natural Language Prompt:
                  </label>
                  <p className="text-xs font-mono text-slate-200 bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 mt-1 leading-relaxed">
                    "{selectedWorkflow.directivePrompt}"
                  </p>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-500">Cadence:</span>
                    <span className="font-mono text-amber-300 text-[11px]">{selectedWorkflow.executionCadence}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-500">Trigger:</span>
                    <span className="font-mono text-slate-300 text-[11px]">{selectedWorkflow.trigger}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-500">Classification:</span>
                    <span className="font-mono text-emerald-400 text-[11px]">
                      {selectedWorkflow.securityAndDlp.classification}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-500">Data Residency:</span>
                    <span className="font-mono text-slate-400 text-[11px]">
                      {selectedWorkflow.securityAndDlp.dataResidency}
                    </span>
                  </div>
                </div>

                {/* Workspace Apps Badges */}
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1.5">
                    Coordinated Workspace Applications:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedWorkflow.workspaceApps.map((app) => (
                      <span
                        key={app}
                        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-[11px] bg-slate-800 text-slate-200 border border-slate-700"
                      >
                        {renderAppIcon(app)}
                        <span>{app}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {selectedWorkflow.thirdPartyServices && (
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1.5">
                      MCP Connectors:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedWorkflow.thirdPartyServices.map((srv) => (
                        <span
                          key={srv}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                        >
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trigger Run Button */}
                <div className="pt-2">
                  <button
                    onClick={handleTriggerRun}
                    disabled={isSimulatingRun}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs flex items-center justify-center space-x-2 transition cursor-pointer shadow-lg shadow-amber-600/20 disabled:opacity-50"
                  >
                    {isSimulatingRun ? (
                      <>
                        <RotateCw className="w-4 h-4 animate-spin text-white" />
                        <span>Autonomous Execution In Progress...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>Run Simulation ({selectedWorkflow.steps.length} Steps)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Steps Timeline & Execution Log */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-[#0A0E1A] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center space-x-2">
                    <Server className="w-5 h-5 text-amber-400" />
                    <h3 className="text-sm font-bold text-white">
                      Execution Stepper: {selectedWorkflow.name}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Persistent Cloud Worker Active</span>
                  </div>
                </div>

                {/* Steps Accordion */}
                <div className="space-y-4">
                  {selectedWorkflow.steps.map((step, idx) => {
                    const isCompleted = simulatedStepProgress > idx;
                    const isCurrent = simulatedStepProgress === idx && isSimulatingRun;
                    const isPending = simulatedStepProgress < idx;

                    return (
                      <div
                        key={step.stepIndex}
                        className={`rounded-xl border p-4 transition-all ${
                          isCurrent
                            ? 'bg-amber-500/10 border-amber-500/50 shadow-md shadow-amber-500/10'
                            : isCompleted
                            ? 'bg-slate-900/70 border-slate-800'
                            : 'bg-slate-950/40 border-slate-900 opacity-40'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                                isCompleted
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : isCurrent
                                  ? 'bg-amber-500 text-slate-950 animate-pulse'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {isCompleted ? <Check className="w-4 h-4" /> : step.stepIndex}
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold text-xs text-white">
                                  {step.action}
                                </span>
                                <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                                  {renderAppIcon(step.app)}
                                  <span>{step.app}</span>
                                </span>
                              </div>
                              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                                {step.outputSummary}
                              </p>
                            </div>
                          </div>

                          <span className="text-[10px] font-mono text-slate-500">
                            Step {step.stepIndex}/{selectedWorkflow.steps.length}
                          </span>
                        </div>

                        {/* Step Structured Payload Display */}
                        {step.payload && isCompleted && (
                          <div className="mt-3 pt-3 border-t border-slate-800/80">
                            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                              Telemetry Output Payload:
                            </div>
                            <pre className="bg-[#070A11] p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] text-cyan-300 overflow-x-auto">
                              {JSON.stringify(step.payload, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Completion Status Card */}
                {simulatedStepProgress >= selectedWorkflow.steps.length && (
                  <div className="p-3.5 bg-emerald-950/20 border border-emerald-500/30 rounded-xl flex items-center justify-between text-xs text-emerald-300">
                    <span className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Standing directive fully reconciled across Workspace apps with auditable logs.</span>
                    </span>
                    <span className="font-mono text-[10px] text-emerald-400/80">
                      Execution latency: ~2.4s total
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: OVERVIEW & CORE CAPABILITIES */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GEMINI_SPARK_CONTENT.capabilities.map((cap) => (
              <div
                key={cap.id}
                className="bg-[#0D1527] border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-amber-500/40 transition flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {cap.badge}
                    </span>
                    <Zap className="w-4 h-4 text-amber-400" />
                  </div>

                  <h3 className="text-sm font-bold text-white mt-3">{cap.title}</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {cap.summary}
                  </p>

                  <div className="mt-4 space-y-2 text-xs">
                    <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-[11px] text-slate-300">
                      <strong className="text-amber-300 block mb-0.5">Enterprise Impact:</strong>
                      {cap.enterpriseValue}
                    </div>

                    <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-[11px] font-mono text-cyan-300">
                      <strong className="text-slate-400 block mb-0.5 font-sans">Architectural Mechanism:</strong>
                      {cap.architecturalMechanism}
                    </div>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-slate-400 bg-slate-950 p-2.5 rounded border border-slate-800 truncate">
                  API: {cap.sdkAndApiMapping}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: STANDING DIRECTIVES & MCP CONNECTORS */}
      {activeTab === 'standing-directives' && (
        <div className="space-y-6">
          <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>How Gemini Spark Directives Differ from Standard Chatbots</span>
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
              Traditional chatbots are <em>reactive</em>: you provide an input, wait for a streaming response, and the connection closes. In contrast, <strong>Gemini Spark Directives</strong> are <em>proactive and event-driven</em>: they register webhooks against Google Workspace Events and external Model Context Protocol (MCP) servers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-900 p-4 rounded-xl border border-rose-950/40 space-y-2">
                <span className="text-xs font-bold text-rose-400">Standard Chatbot Limitations</span>
                <ul className="text-[11px] text-slate-400 space-y-1 list-disc list-inside">
                  <li>Ephemeral memory dies when the tab is closed.</li>
                  <li>No background event subscription; cannot respond to new email arrivals while you sleep.</li>
                  <li>Single application scope: cannot coordinate Drive, Calendar, and Sheets atomically.</li>
                  <li>Requires manual human prompt trigger every time.</li>
                </ul>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-amber-500/30 space-y-2">
                <span className="text-xs font-bold text-amber-300">Gemini Spark Standing Directives</span>
                <ul className="text-[11px] text-slate-400 space-y-1 list-disc list-inside">
                  <li>24/7 background worker execution on Google Cloud Run.</li>
                  <li>Triggers on inbound webhooks, document changes, or cron schedules.</li>
                  <li>Atomically rolls back cross-application actions if an intermediate step fails.</li>
                  <li>Connects to third-party ERP/CRM through Model Context Protocol (MCP) standard.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* MCP Architecture Blueprint */}
          <div className="bg-[#0A0E1A] border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Terminal className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">
                  Sample Spark Standing Directive Definition in TypeScript
                </h3>
              </div>
              <button
                onClick={() =>
                  handleCopy(
                    `import { GeminiSparkAgent, WorkspaceEventTrigger } from '@google/gemini-spark';\n\nexport const weeklySprintDirective = new GeminiSparkAgent({\n  name: 'Monday-Sprint-Consolidation',\n  trigger: WorkspaceEventTrigger.cron('0 8 * * 1'), // 8:00 AM Mondays\n  scopes: ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/gmail.readonly'],\n  mcpServers: ['mcp://jira.internal:8080'],\n  directive: \`\n    Audit Jira sprint blockers from the previous week.\n    Synthesize decisions into 'Engineering_Weekly_Brief.gdoc'.\n    Notify team in Google Chat space #eng-leadership.\n  \`,\n  dlpPolicy: 'CONFIDENTIAL_INTERNAL'\n});`,
                    'spark-code'
                  )
                }
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 cursor-pointer"
              >
                {copiedCodeId === 'spark-code' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            <pre className="bg-[#070A11] p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
{`import { GeminiSparkAgent, WorkspaceEventTrigger } from '@google/gemini-spark';

// Define a 24/7 Persistent Standing Directive
export const weeklySprintDirective = new GeminiSparkAgent({
  name: 'Monday-Sprint-Consolidation',
  trigger: WorkspaceEventTrigger.cron('0 8 * * 1'), // 8:00 AM every Monday
  scopes: [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/chat.messages'
  ],
  mcpServers: [
    'mcp://jira.internal:8080/v1',
    'mcp://salesforce-sync.internal/mcp'
  ],
  directive: \`
    1. Scan Google Drive folder '/Engineering/Sprint-Reviews' for new retrospectives.
    2. Query Jira MCP server for unresolved P0 and P1 sprint blockers.
    3. Synthesize findings into 'Engineering_Weekly_Brief.gdoc'.
    4. Post summary card to Google Chat space #eng-leadership.
  \`,
  dlpPolicy: 'CONFIDENTIAL_INTERNAL',
  humanInTheLoopThreshold: 'HIGH_RISK_ONLY'
});`}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 4: ENTERPRISE DLP & DATA PROTECTION */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Enterprise Trust, Data Isolation & Compliance Guarantees</span>
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Google Workspace with Gemini Spark adheres to the highest tier of enterprise data confidentiality and isolation. Your corporate emails, documents, spreadsheets, and recordings are never exposed to external entities.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-emerald-400">Zero Model Training</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Your organization's Workspace data and prompts are never used to train Google's general Gemini baseline models.
                </p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-cyan-400">No Human Reviewers</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Data processed by Gemini Spark is never inspected by human annotators or third-party contractors.
                </p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-amber-400">CMEK & VPC-SC</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Supports Customer-Managed Encryption Keys (CMEK) and VPC Service Controls for sovereign banking and healthcare data.
                </p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-indigo-400">Audit Logging</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Every Spark action emits tamper-proof Cloud Audit Logs detailing the exact OAuth principal and tools executed.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
