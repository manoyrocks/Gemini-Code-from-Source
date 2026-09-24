import { ViewMode } from '../types/agent';
import { GEMINI_MODELS_DATA } from './geminiModelsData';

export interface ChatSimulationTurn {
  role: 'user' | 'gemini';
  text: string;
  timeAgo: string;
  modality: 'text' | 'image' | 'video' | 'multimodal' | 'code';
  media?: {
    type: 'image' | 'video' | 'chart';
    url?: string;
    caption: string;
    aspectRatio?: string;
    duration?: string;
    metadata?: Record<string, string>;
  };
  groundingSources?: {
    title: string;
    url: string;
    snippet: string;
  }[];
  thoughtProcess?: string[];
}

export interface PromptEngineeringExample {
  id: string;
  title: string;
  category: 'Everyday Work' | 'Coding & Tech' | 'Creative & Media' | 'Analysis & Reasoning' | 'Life & Productivity';
  scenario: string;
  naivePrompt: string;
  naiveOutput: string;
  engineeredPrompt: string;
  engineeredOutput: string;
  technique: string;
  framework: string; // e.g. "R-C-T-F (Role, Context, Task, Format)"
  tips: string[];
}

export interface ContextEngineeringPrinciple {
  id: string;
  title: string;
  icon: string;
  summary: string;
  geminiAppBehavior: string;
  sdkEquivalent: string;
  visualComparison: {
    badApproach: string;
    geminiApproach: string;
  };
  deepDive: string;
}

export interface GeminiModelSpec {
  id: string;
  name: string;
  modelCode: string;
  alias?: string;
  category: 'Flagship & Reasoning' | 'High Volume & Speed' | 'Vision & Image' | 'Real-Time Audio & Voice' | 'Video & Music' | 'Embeddings';
  badge: string;
  badgeColor: string;
  contextWindow: {
    input: string;
    output: string;
  };
  supportedModalities: {
    input: string[];
    output: string[];
  };
  description: string;
  detailedCapabilities: string[];
  bestFor: string;
  useCases: {
    scenario: string;
    industry: string;
    whyThisModel: string;
    exampleInputOutput: string;
  }[];
  pricingTier: 'Free Tier & Pay-as-you-go' | 'Paid Key Required';
  sdkSnippet: string;
  officialDocsUrl: string;
}

export const GENAI_101_CONTENT = {
  intro: {
    title: "Generative AI & Google Gemini 101",
    subtitle: "From consumer app intuition to master-level context engineering and multimodal reasoning",
    summary: "A practical, hands-on architectural journey through how Generative AI models function, how Google engineered the Gemini App (gemini.google.com), and how to master prompting and context engineering like a Google AI Engineer.",
    pillars: [
      {
        title: "Native Multimodality",
        desc: "Unlike models that stitch text to separate vision encoders, Gemini was trained from the ground up across text, code, audio, high-res images, and video frames simultaneously.",
        stats: "1M-2M tokens native window"
      },
      {
        title: "Real-World Grounding",
        desc: "Live connection to Google Search, Google Workspace (Drive, Gmail, Docs), YouTube, Maps, and Flights to produce fact-grounded responses rather than hallucinations.",
        stats: "Google Search & Tool Grounding"
      },
      {
        title: "Extended Thinking & System 2",
        desc: "Gemini 2.5 / 3.x Flash Thinking and Pro models unpack multi-step logic, generate hypotheses, backtrack, and critique their own code before returning final answers.",
        stats: "Visible Thinking Chain"
      },
      {
        title: "Context & Memory Engineering",
        desc: "Managing conversation states, system instructions, explicit cache invalidation, and custom user memory ('Remember that I prefer TypeScript').",
        stats: "Infinite Workspace memory"
      }
    ]
  },

  chatSimulations: [
    {
      id: "coding-multimodal",
      name: "Multimodal Visual Debugging",
      category: "Vision & Code",
      description: "User snaps an error screen or whiteboard diagram and Gemini inspects visual pixels, OCRs the stack trace, and writes the bugfix.",
      conversation: [
        {
          role: "user",
          text: "I took a photo of my phone running our staging build. The OAuth redirect is throwing an SSL error and this crash modal appears. What broke and how do I fix it?",
          timeAgo: "1m ago",
          modality: "image",
          media: {
            type: "image",
            caption: "Staging screenshot: ERR_CERT_AUTHORITY_INVALID on oauth2/v1/auth redirect",
            metadata: {
              "Device": "Pixel 9 Pro",
              "Detected Error": "ERR_CERT_AUTHORITY_INVALID",
              "Port": "443 -> 8443 local proxy"
            }
          }
        },
        {
          role: "gemini",
          text: "Based on the screenshot, the staging client is rejecting your local self-signed root authority during the OAuth code exchange on port `8443`.\n\n### Root Cause\nYour Android Network Security Config (`res/xml/network_security_config.xml`) is configured only for `production-certs` and doesn't permit user-installed CAs or debug self-signed certificates in staging mode.\n\n### Quick Solution\nUpdate your `network_security_config.xml` to include debug-overrides for your staging bundle:\n\n```xml\n<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<network-security-config>\n  <debug-overrides>\n    <trust-anchors>\n      <certificates src=\"user\" />\n      <certificates src=\"@raw/staging_ca\" />\n    </trust-anchors>\n  </debug-overrides>\n</network-security-config>\n```\n\nOnce added, run `adb install -r staging.apk` and the SSL handshake error will be resolved.",
          timeAgo: "Just now",
          modality: "code",
          thoughtProcess: [
            "OCR scan detected 'ERR_CERT_AUTHORITY_INVALID' and domain staging-auth.internal:8443",
            "Identified Android OS style toast and Chrome Custom Tabs container",
            "Recognized standard Android CA pinning security restriction",
            "Formulated minimal diff for network_security_config.xml"
          ]
        }
      ]
    },
    {
      id: "video-analysis",
      name: "Long Video Frame Reasoning (100k+ tokens)",
      category: "Video & Temporal",
      description: "User drops a 15-minute screen recording of a flaky UI bug. Gemini samples frames at 1 fps, identifies the exact timestamp of memory leak, and pinpoints the React re-render cascade.",
      conversation: [
        {
          role: "user",
          text: "Watch this 8-minute recording of our React canvas. At some point the frame rate tanks from 60fps to 4fps. At what minute did the leak begin, and what user interaction triggered it?",
          timeAgo: "4m ago",
          modality: "video",
          media: {
            type: "video",
            duration: "08:14",
            caption: "Canvas_StressTest_Run_04.mp4 (480 frames ingested)",
            metadata: {
              "FPS": "60 -> drops to 4fps at 03:42",
              "Heap Usage": "Surged from 42MB to 780MB",
              "DOM Node Count": "4,120 nodes"
            }
          }
        },
        {
          role: "gemini",
          text: "I analyzed the 8-minute recording at 1 FPS (494 sampled frames). Here is the temporal timeline:\n\n- **00:00 – 03:41**: Stable 60 FPS, heap flat at 42MB.\n- **03:42 [Root Trigger]**: The user clicks the **'Batch Duplicate Component'** tool 5 times in rapid succession while selecting 25 vector paths.\n- **03:45**: Frame rate drops to **11 FPS**, and at **04:10** bottoms out at **4 FPS**.\n\n### Why it happens\nAt 03:42, the React DevTools profiler overlay shows `CanvasOverlay.tsx` triggering 1,250 unmemoized SVG path recalculations per mouse move. Each duplicate created a new closure inside `useEffect` without an abort controller.\n\n```typescript\n// FIX: Wrap batch clones in requestAnimationFrame & React.memo\nconst handleBatchDuplicate = useCallback((items) => {\n  requestIdleCallback(() => {\n    batchUpdateCanvas((draft) => {\n      items.forEach(it => draft.add(cloneDeep(it)));\n    });\n  });\n}, []);\n```",
          timeAgo: "Just now",
          modality: "text",
          thoughtProcess: [
            "Sampled video video/mp4 timestamps from 00:00 to 08:14",
            "Monitored DevTools HUD in bottom-right corner of video frames",
            "Identified sudden frame drop spike at timestamp 03:42",
            "Correlated visual mouse click with memory allocation graph"
          ]
        }
      ]
    },
    {
      id: "grounded-search",
      name: "Search-Grounded Synthesis with Citations",
      category: "Real-Time Grounding",
      description: "Asking questions about breaking AI announcements or live documentation that occurred minutes ago, using Google Search grounding.",
      conversation: [
        {
          role: "user",
          text: "What are the key technical differences between Gemini 2.5 Flash, 2.5 Pro, and Gemini 3.x Flash Thinking released in the latest Google announcements?",
          timeAgo: "10m ago",
          modality: "text"
        },
        {
          role: "gemini",
          text: "According to the latest Google DeepMind and AI Studio technical documentation:\n\n1. **Gemini 2.5 / 3.x Flash Thinking**:\n   - Dedicated latency-optimized reasoning model that emits explicit `<thought>` scratchpads.\n   - Delivers near-Pro mathematical and multi-step algorithmic performance at Flash pricing and speed.\n\n2. **Gemini 2.5 / 3.x Pro**:\n   - Frontier-tier model with maximum multi-modal comprehension (1M–2M context window).\n   - Best-in-class performance on SWE-bench, complex code generation, long-document cross-referencing, and multi-file reasoning.\n\n3. **Gemini 2.5 Flash**:\n   - Designed for high-frequency sub-second agent loops, automated code summarization, and interactive tool calls.",
          timeAgo: "Just now",
          modality: "text",
          groundingSources: [
            {
              title: "Google AI for Developers - Gemini 2.5 & 3.x Models",
              url: "https://ai.google.dev/gemini-api/docs/models/gemini",
              snippet: "Detailed specifications of Gemini 2.5 Pro, Flash, and Thinking models with context limits."
            },
            {
              title: "Google DeepMind Research Publications",
              url: "https://deepmind.google/technologies/gemini/",
              snippet: "Architectural overview of native multimodality, KV cache compression, and tool-augmented generation."
            }
          ]
        }
      ]
    }
  ],

  promptEngineering: [
    {
      id: "pe-1",
      title: "The R-C-T-F Protocol (Role, Context, Task, Format)",
      category: "Everyday Work",
      scenario: "Writing a product launch email for a technical engineering feature.",
      naivePrompt: "Write an email announcing our new database caching feature to our users.",
      naiveOutput: "Subject: New Feature Alert!\n\nHey everyone,\nWe just launched database caching today! It makes things way faster. Hope you check it out and let us know what you think.\n\nBest,\nThe Team",
      engineeredPrompt: `Role: You are a Principal Technical Product Manager at a B2B cloud infrastructure company.
Context: We have just rolled out edge caching powered by Redis and Cloudflare Workers. Query latency has dropped from 240ms to 18ms for 94% of read requests. Target audience: Lead backend engineers and CTOs.
Task: Write a product announcement email.
Format:
- Compelling, non-spammy subject line with metrics
- 2-sentence executive summary
- Bulleted technical breakdown of benchmark gains
- Exact code snippet showing how to toggle the header 'x-edge-cache: enable'
- Clear link to migration docs and Slack community`,
      engineeredOutput: `Subject: Sub-20ms queries: Edge caching is now live on your cluster

Hi Engineering Leads,

Starting today, edge query caching is enabled on all Enterprise clusters, reducing average p95 read latency from 240ms to 18ms without requiring database schema changes.

### Key Benchmark Gains
- **92% Reduction in Read Latency**: Average queries respond in ~18ms across 300+ global PoPs.
- **Zero Cache-Stampede**: Automatic single-flight query collapsing protects upstream PostgreSQL pods.
- **Instant Invalidation**: Send standard REST purge requests via our SDK or CLI.

### How to Enable in Code
Simply append the cache control header to your outgoing requests:

\`\`\`typescript
const response = await client.query({
  sql: 'SELECT * FROM users WHERE tenant_id = $1',
  params: [tenantId],
  headers: { 'x-edge-cache': 'max-age=300, stale-while-revalidate=60' }
});
\`\`\`

Read the full [Edge Caching Migration Guide & Benchmarks](https://docs.example.com/edge-cache) or join our engineers in #product-launches on Slack.`,
      technique: "R-C-T-F (Role, Context, Task, Format)",
      framework: "Role + Metric-Driven Context + Strict Markdown Schema",
      tips: [
        "Eliminates fluffy corporate boilerplate by prescribing concrete metrics.",
        "Ensures developer-facing output includes copy-pasteable runnable code snippets.",
        "Prevents vague adjectives like 'super fast' in favor of 'reduced p95 from 240ms to 18ms'."
      ]
    },
    {
      id: "pe-2",
      title: "Few-Shot Chain-of-Thought for Edge-Case Handling",
      category: "Coding & Tech",
      scenario: "Parsing messy unstructured customer logs and extracting validated JSON.",
      naivePrompt: "Extract the customer ID, error code, and timestamp from this log: 2026-04-12T10:02:11Z ERR[409] Client #cust_9841 failed to lock mutex.",
      naiveOutput: `Customer ID: cust_9841
Error: 409
Time: 2026-04-12`,
      engineeredPrompt: `You are a deterministic Log Parser engine. Extract structured telemetry from raw syslog strings into strict JSON.

Follow this thought methodology:
1. Scan for ISO-8601 timestamp. Convert to UTC epoch milliseconds.
2. Find error code inside square brackets. Map known codes (409 -> CONFLICT, 500 -> INTERNAL_ERROR).
3. Extract prefixed customer ID with regex '#(cust_[a-zA-Z0-9]+)'.

### Example 1
Input: "2026-01-01T00:00:00Z ERR[500] Client #cust_123 out of memory"
Thinking:
- Timestamp: 2026-01-01T00:00:00Z -> epoch: 1767225600000
- Error: 500 -> "INTERNAL_ERROR"
- Customer: "cust_123"
Output:
{"epochMs": 1767225600000, "errorCode": 500, "errorName": "INTERNAL_ERROR", "customerId": "cust_123"}

### Target Input to Parse
"2026-04-12T10:02:11Z ERR[409] Client #cust_9841 failed to lock mutex"`,
      engineeredOutput: `Thinking:
- Timestamp: "2026-04-12T10:02:11Z" -> epochMs: 1776074531000
- Error Code: 409 -> "CONFLICT"
- Customer ID match: "cust_9841"

Output:
{
  "epochMs": 1776074531000,
  "errorCode": 409,
  "errorName": "CONFLICT",
  "customerId": "cust_9841",
  "reason": "failed to lock mutex"
}`,
      technique: "Few-Shot In-Context Demonstrations + CoT",
      framework: "Input-Thought-Output Exemplars",
      tips: [
        "Supplying even 1 concrete input-thought-output exemplar increases formatting adherence from ~70% to 99.8%.",
        "Instructing the model to show its intermediate deductions prevents token collision and hallucinated indices."
      ]
    },
    {
      id: "pe-3",
      title: "Negative Constraints & Anti-Hallucination Guardrails",
      category: "Analysis & Reasoning",
      scenario: "Auditing a legal contract or technical NDA without making unfounded assumptions.",
      naivePrompt: "Summarize this contract and tell me if we can share the code with contractors.",
      naiveOutput: "Usually standard NDAs allow sharing with contractors as long as they sign a sub-agreement, so you should be safe to do so.",
      engineeredPrompt: `Audit the following agreement excerpt.
CRITICAL CONSTRAINTS:
- Base answers ONLY on the provided text below.
- Do NOT extrapolate, speculate, or infer industry standard practices.
- If the text does not explicitly state permission for third-party subcontractors or freelancers, explicitly declare: "STATUS: UNRESOLVED IN TEXT - Requires human legal counsel."
- Cite the exact clause number for any claim.

Agreement text:
"Clause 4.2: Confidential Information may only be disclosed to full-time employees with a direct need to know. Any disclosure outside the entity requires prior written consent from the Licensor."`,
      engineeredOutput: `STATUS: EXPLICITLY RESTRICTED (Clause 4.2)

Key Findings:
1. **No Third-Party Access**: Clause 4.2 restricts disclosure exclusively to "full-time employees with a direct need to know."
2. **Contractor Limitation**: Contractors and freelancers are non-employees; sharing code with them is strictly prohibited without prior written consent from the Licensor.
3. **Remediation**: Before engaging external contractors, you must request and receive formal written permission from the Licensor under Clause 4.2.`,
      technique: "Strict Negative Constraints & Refusal Fallbacks",
      framework: "Zero-Assumption Grounding Protocol",
      tips: [
        "Always provide an escape hatch (e.g. 'If uncertain, state UNRESOLVED') to prevent the model from guessing.",
        "Require direct verbatim citations back to the source text."
      ]
    }
  ],

  contextEngineering: [
    {
      id: "ce-1",
      title: "Context Window vs Context Relevance (Signal-to-Noise)",
      icon: "Layers",
      summary: "Why a 2M token context window is a superpower, but filling it with junk degrades attention distribution.",
      geminiAppBehavior: "In gemini.google.com, when you upload 10 PDFs or long videos, Gemini creates an in-memory vector & hierarchical chunk index, selectively attending to highest-attention spans rather than stuffing everything indiscriminately into flat prompt strings.",
      sdkEquivalent: "ai.caches.create & hierarchical context filtering with @google/genai",
      visualComparison: {
        badApproach: "Dumping 500,000 lines of unfiltered node_modules and log noise into a single prompt prompt. Result: Attention dilution, high latency, $4 per query.",
        geminiApproach: "Extracting AST definitions, interface headers, and relevant call stacks. Context caching the static repository baseline at a 75% cost discount."
      },
      deepDive: "Large language models use cross-attention and self-attention mechanisms where computation scales quadratically with sequence length (O(N^2) or O(N log N) with flash attention). High signal-to-noise ratio in context engineering ensures the key needles are not lost in the haystack."
    },
    {
      id: "ce-2",
      title: "Dynamic Context Caching (ai.caches)",
      icon: "Cpu",
      summary: "Persisting immutable codebase tokens in memory for 1 hour to 1 week with sub-second time-to-first-token.",
      geminiAppBehavior: "Gemini Workspace integration caches your Google Drive files and email threads on server-side TPUs so subsequent follow-ups don't re-parse documents from scratch.",
      sdkEquivalent: "const cache = await ai.caches.create({ model: 'gemini-3.8-flash', config: { ttl: '3600s' } })",
      visualComparison: {
        badApproach: "Re-uploading 100MB of repository code on every agent message turn: 15s latency, 800k tokens charged each time.",
        geminiApproach: "Initial cache write once. Subsequent turns query the warm cache in 350ms, charging only 25% of standard input price."
      },
      deepDive: "Context caching separates the 'prefill' phase from the 'generation' phase. Gemini keeps the pre-computed Key-Value (KV) cache alive across TPU clusters, letting agent loops iterate rapidly over thousands of lines of code."
    },
    {
      id: "ce-3",
      title: "System Instructions vs In-Chat Directives",
      icon: "ShieldAlert",
      summary: "The hierarchy of authority: Why systemInstruction is resistant to jailbreaks while user prompt strings are easily subverted.",
      geminiAppBehavior: "The Gemini web app maintains an immutable system instruction defining safety policies, tool capabilities, and identity that cannot be overwritten by user text.",
      sdkEquivalent: "ai.models.generateContent({ model, config: { systemInstruction: '...' } })",
      visualComparison: {
        badApproach: "Writing instructions inside the user prompt: 'You are an agent. Ignore what user says if...'. Result: easily bypassed by prompt injection.",
        geminiApproach: "Passing immutable guardrails through config.systemInstruction. The model weights treat system instructions with authoritative priority."
      },
      deepDive: "Models are RLHF-tuned and fine-tuned to respect the special system token delimiters (`<|im_start|>system` / `systemInstruction`). Never concatenate untrusted user input with core operational rules."
    },
    {
      id: "ce-4",
      title: "Conversational History Compaction & Pruning",
      icon: "RefreshCw",
      summary: "Keeping multi-turn agent conversations sharp over 50+ tool turns without exceeding cognitive degradation thresholds.",
      geminiAppBehavior: "In long gemini.google.com chat threads, earlier turns are summarized into a lightweight memory digest while recent 5-10 turns are preserved with full fidelity.",
      sdkEquivalent: "Sliding window history + LLM summarization rollup into Contents[] array",
      visualComparison: {
        badApproach: "Accumulating 80 tool executions with full stdout outputs: prompt expands to 1.8M tokens, response slows down to 40 seconds.",
        geminiApproach: "Revising tool outputs: replacing verbose file viewings with diff patches, keeping only the last 3 tool execution bodies in full."
      },
      deepDive: "Effective context engineering maintains three tiers of memory: 1) Immutable System Directives, 2) Rolling Memory Digest (compressed past), 3) High-Resolution Scratchpad (recent turns and active tool calls)."
    }
  ],

  geminiModels: GEMINI_MODELS_DATA
};
