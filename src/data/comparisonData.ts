import { ComparisonItem } from '../types/agent';

export const COMPARISON_DATA: ComparisonItem[] = [
  {
    dimension: 'Agent Loop & Tool Calling Protocol',
    category: 'Loop',
    claudeCodeApproach:
      'Anthropic Messages API turns. Uses content blocks with type: "tool_use" (containing id, name, input) followed by a user turn containing type: "tool_result" with matching tool_use_id.',
    claudeDocsReference: 'Anthropic Docs: Tool Use (function calling) in Messages API',
    geminiCodeApproach:
      'Native @google/genai SDK with tools: [{ functionDeclarations: [...] }]. Model emits functionCalls array directly on GenerateContentResponse. Client/Agent returns functionResponses object within the contents array.',
    geminiDocsReference: '@google/genai SDK: ai.models.generateContent({ config: { tools: [...] } })',
    geminiAdvantage:
      'Gemini 3 allows combining custom functionDeclarations with built-in Google Search, URL Context, and Code Execution in one single request with includeServerSideToolInvocations: true.',
  },
  {
    dimension: 'Prompt Caching Architecture',
    category: 'Memory & Cache',
    claudeCodeApproach:
      'Anthropic Ephemeral Prompt Caching using cache_control: { type: "ephemeral" } markers. Fixed 5-minute Time-To-Live (TTL) refreshed on each hit. Minimum breakpoint threshold 1024 or 2048 tokens.',
    claudeDocsReference: 'Anthropic Docs: Prompt Caching (Ephemeral 5m TTL)',
    geminiCodeApproach:
      'Gemini Context Caching via ai.caches.create. Explicit cached content with configurable TTL (e.g., "3600s", "86400s", or indefinite). Stores entire codebase AST, repository indexes, and system instructions.',
    geminiDocsReference: 'Gemini API Docs: Context Caching (ai.caches.create & cache name reference)',
    geminiAdvantage:
      'Deterministic TTL control without reliance on 5-minute expiration windows; up to 75% cost reduction on massive repositories with continuous multi-hour developer sessions.',
  },
  {
    dimension: 'Context Window Capacity',
    category: 'Memory & Cache',
    claudeCodeApproach:
      'Standard 200,000 tokens context window. Requires aggressive context compaction, AST pruning, and session history truncation during heavy multi-file refactoring.',
    claudeDocsReference: 'Anthropic Claude 3.5 Sonnet / Claude 3.7 Sonnet specs (200k limit)',
    geminiCodeApproach:
      '1,000,000 to 2,000,000 native token context window in Gemini 3 models (Gemini 3.8 Flash & Gemini 3.1 Pro).',
    geminiDocsReference: 'Google DeepMind: Gemini 1.5/2.5/3.0+ Long Context Architecture (1M-2M tokens)',
    geminiAdvantage:
      'Enables preloading entire medium-to-large repositories directly in active memory without premature truncation or loss of subtle cross-file references.',
  },
  {
    dimension: 'Reasoning & Thinking Modes',
    category: 'Reasoning',
    claudeCodeApproach:
      'Extended Thinking with thinking budget in tokens (e.g., thinking: { type: "enabled", budget_tokens: 16000 }). Produces thinking blocks alongside response text.',
    claudeDocsReference: 'Anthropic Claude 3.7 Sonnet Extended Thinking',
    geminiCodeApproach:
      'Gemini 3 Thinking Config with ThinkingLevel enum (ThinkingLevel.HIGH, ThinkingLevel.LOW, ThinkingLevel.MINIMAL). Auto-calibrated reasoning tokens bundled with generation.',
    geminiDocsReference: '@google/genai SDK: config: { thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH } }',
    geminiAdvantage:
      'Qualitative reasoning calibration (HIGH for deep architectural refactoring, LOW for rapid syntax edits) without requiring manual token budget guessing.',
  },
  {
    dimension: 'Tool Sandboxing & Code Execution',
    category: 'Tools',
    claudeCodeApproach:
      'Client-side bash process runner with node-pty or child_process, command authorization hooks, and pattern-based risk assessment.',
    claudeDocsReference: 'Claude Code CLI Architecture: Local subshell with approval policies',
    geminiCodeApproach:
      'Dual Execution Model: Built-in sandboxed Code Execution on Google infrastructure ({ codeExecution: {} }) for pure verification, combined with local sandboxed shell executor for repo changes.',
    geminiDocsReference: 'Gemini API: Built-in Code Execution tool + Agent Local Sandbox',
    geminiAdvantage:
      'Code execution validation can occur directly within Gemini servers before modifying local developer disk files, saving local cycles and catching hallucinations early.',
  },
  {
    dimension: 'Multimodal Ingestion (UI & Audio)',
    category: 'Multimodal',
    claudeCodeApproach:
      'Static image attachments (PNG/JPEG) encoded as base64 in messages API. No native real-time bidirectional audio/video pairing.',
    claudeDocsReference: 'Anthropic Docs: Vision with Base64 content blocks',
    geminiCodeApproach:
      'Native full-spectrum multimodal: Images, Video frames up to 1 FPS, Audio files, and Gemini Live API (ai.live.connect) with bidirectional 16kHz PCM streaming over WebSockets.',
    geminiDocsReference: 'Gemini API: Live API (ai.live.connect), Multimodal Video/Image/Audio parts',
    geminiAdvantage:
      'Enables Real-Time Voice Pair Programming where the engineer speaks to the coding agent while sharing their screen or live UI canvas.',
  },
  {
    dimension: 'Extensibility Protocol',
    category: 'Tools',
    claudeCodeApproach:
      'Model Context Protocol (MCP) clients connecting to local/remote MCP servers via stdio or SSE transport.',
    claudeDocsReference: 'Anthropic Model Context Protocol (MCP) Specification',
    geminiCodeApproach:
      'Direct OpenAPI/JSON Schema FunctionDeclarations + Gemini Extensions & Hybrid Built-ins (Google Search, Maps, URL Context, Grounding). Compatible with MCP adapters.',
    geminiDocsReference: '@google/genai SDK: tools: [{ functionDeclarations: [...] }, { googleSearch: {} }]',
    geminiAdvantage:
      'Zero-latency built-in search grounding provides instant live docs access (e.g. latest npm packages, API changelogs) without external MCP server overhead.',
  },
  {
    dimension: 'Subagent Delegation Pattern',
    category: 'Loop',
    claudeCodeApproach:
      'Subagent spawning via CLI child tasks or specialized prompt personas managed in sequential queues.',
    claudeDocsReference: 'Subagents & Task Orchestration Architecture Reference',
    geminiCodeApproach:
      'Hierarchical Coordinator-Worker Swarm utilizing model tiers (e.g., Gemini 3.1 Pro for architectural planning, Gemini 3.8 Flash for parallel file searching and fast diff generation).',
    geminiDocsReference: 'Google Cloud Architecture: Agent Orchestration with Gemini Multi-Tier Models',
    geminiAdvantage:
      'Cost and latency optimization by running high-throughput subagent queries (ripgrep, linting, test runs) on Flash while preserving Pro for coordination.',
  },
];
