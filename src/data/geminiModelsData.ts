import { GeminiModelSpec } from './genai101Data';

export const GEMINI_MODELS_DATA: GeminiModelSpec[] = [
  {
    id: "gemini-3-8-flash",
    name: "Gemini 3.8 Flash",
    modelCode: "gemini-3.8-flash",
    alias: "gemini-flash-latest",
    category: "Flagship & Reasoning",
    badge: "Recommended Default",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    contextWindow: {
      input: "1,048,576 tokens (~1 hour video / 700k words)",
      output: "65,536 tokens (~150 pages code/text)"
    },
    supportedModalities: {
      input: ["Text", "Code", "High-Res Images", "Audio", "Full Video", "PDFs"],
      output: ["Text", "Code", "JSON Schema"]
    },
    description: "The premier workhorse model for high-frequency applications, autonomous agents, and production services. Delivers frontier intelligence, native multimodality, and ultra-fast generation speeds at exceptional cost efficiency.",
    detailedCapabilities: [
      "Native Function Calling with auto/any/none mode execution",
      "Native Structured JSON Outputs via responseSchema / Type.OBJECT",
      "Built-in Google Search Grounding for real-time web facts",
      "Sandboxed Python Code Execution for math & algorithmic analysis",
      "Server-side Context Caching (ai.caches) with 75% input discount",
      "Streaming responses with sub-second time-to-first-token (TTFT)"
    ],
    bestFor: "Production applications, high-throughput agents, low-latency chatbots, document Q&A, and live video analysis.",
    useCases: [
      {
        scenario: "Autonomous Software Engineering & Terminal Agents",
        industry: "Developer Tools / DevOps",
        whyThisModel: "Blazing fast inference lets ReAct loops read files, run tests, and emit surgical diffs within seconds without stalling the developer's terminal.",
        exampleInputOutput: "Input: 'Inspect src/auth.ts and fix JWT token expiry race condition'\nOutput: Surgical git patch + verified unit test execution"
      },
      {
        scenario: "Enterprise Multimodal Document & Video Intelligence",
        industry: "Finance, Legal & Logistics",
        whyThisModel: "1M context window ingests 50-page financial audits or 45-minute training videos in one call, locating exact clauses and timestamps.",
        exampleInputOutput: "Input: 200-page SEC 10-K filing + 'Find all supplier concentration risks'\nOutput: Structured table with page citations & quantified risk factors"
      },
      {
        scenario: "Real-Time Customer Support & Query Triage",
        industry: "E-Commerce & SaaS",
        whyThisModel: "Combines Google Search grounding with JSON output schema to verify live order statuses and dispatch database actions.",
        exampleInputOutput: "Input: 'Where is my order #49102 and can I change the delivery address?'\nOutput: Tool call to orders_db.query() + natural polite response"
      }
    ],
    pricingTier: "Free Tier & Pay-as-you-go",
    sdkSnippet: `import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({});

const response = await ai.models.generateContent({
  model: 'gemini-3.8-flash',
  contents: 'Analyze this customer error log and suggest a patch',
  config: {
    systemInstruction: 'You are an SRE specialist in Node.js microservices.',
    temperature: 0.2,
    responseMimeType: 'application/json',
    responseSchema: {
      type: Type.OBJECT,
      properties: {
        rootCause: { type: Type.STRING },
        severity: { type: Type.STRING, enum: ['LOW', 'MEDIUM', 'CRITICAL'] },
        remediationCode: { type: Type.STRING }
      },
      required: ['rootCause', 'severity', 'remediationCode']
    }
  }
});`,
    officialDocsUrl: "https://ai.google.dev/gemini-api/docs/models#gemini-3.8-flash"
  },
  {
    id: "gemini-3-1-pro",
    name: "Gemini 3.1 Pro",
    modelCode: "gemini-3.1-pro-preview",
    alias: "gemini-pro",
    category: "Flagship & Reasoning",
    badge: "Frontier Reasoning",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    contextWindow: {
      input: "1,048,576 tokens (~1 hour video / 700k words)",
      output: "65,536 tokens (~150 pages code/text)"
    },
    supportedModalities: {
      input: ["Text", "Code", "High-Res Images", "Audio", "Full Video", "PDFs"],
      output: ["Text", "Code", "JSON Schema"]
    },
    description: "Google's most capable model for complex reasoning, multi-disciplinary STEM, deep architectural design, and difficult algorithmic programming. Excels at solving problems that require exhaustive multi-step planning.",
    detailedCapabilities: [
      "Frontier reasoning scores on SWE-bench, GSM8K, and ARC-AGI",
      "Deep repository-wide architectural comprehension and dependency mapping",
      "Exhaustive chain-of-thought hypothesis testing and verification",
      "Superior instruction following across deeply nested constraints",
      "Advanced mathematical proof derivation and scientific modeling",
      "Seamless multi-tier coordination as orchestrator for worker subagents"
    ],
    bestFor: "Complex software refactoring, scientific analysis, architectural blueprints, multi-agent supervisory coordination, and legal synthesis.",
    useCases: [
      {
        scenario: "Monolithic Codebase Migration & Microservice Decomposition",
        industry: "Software Engineering & Cloud Architecture",
        whyThisModel: "Deeply tracks transitive dependencies across hundreds of thousands of lines of code without hallucinating circular references.",
        exampleInputOutput: "Input: Complete Django backend code zip + 'Architect NestJS microservice split'\nOutput: Full bounded-context boundary diagram, schema migrations & gRPC proto definitions"
      },
      {
        scenario: "Automated Formal Verification & Security Audit",
        industry: "Cybersecurity & Web3",
        whyThisModel: "Unpacks reentrancy vectors, memory leaks, and cryptographic timing attacks that simpler models overlook.",
        exampleInputOutput: "Input: Solidity staking contract with reentrancy vulnerability\nOutput: Mathematical proof of exploit vector + hardened invariant patch"
      },
      {
        scenario: "Multi-Agent System Supervisor & Evaluator",
        industry: "Autonomous Systems",
        whyThisModel: "Acts as the top-level Planner and Evaluator, inspecting work products from multiple Flash worker agents and requesting targeted iterations.",
        exampleInputOutput: "Input: 3 candidate PRs from parallel worker subagents\nOutput: Consolidated architectural critique, test coverage score, and approved merge strategy"
      }
    ],
    pricingTier: "Paid Key Required",
    sdkSnippet: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

const response = await ai.models.generateContent({
  model: 'gemini-3.1-pro-preview',
  contents: [
    { text: 'Synthesize the architectural tradeoffs between event-sourcing vs CQRS for high-frequency trading.' }
  ],
  config: {
    systemInstruction: 'You are a Principal Systems Architect specializing in distributed consensus.',
    thinkingConfig: {
      thinkingBudget: 4096
    }
  }
});`,
    officialDocsUrl: "https://ai.google.dev/gemini-api/docs/models#gemini-3.1-pro"
  },
  {
    id: "gemini-3-1-flash-lite",
    name: "Gemini 3.1 Flash-Lite",
    modelCode: "gemini-3.1-flash-lite",
    alias: "gemini-flash-lite",
    category: "High Volume & Speed",
    badge: "Ultra Low Cost & Latency",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    contextWindow: {
      input: "1,048,576 tokens",
      output: "65,536 tokens"
    },
    supportedModalities: {
      input: ["Text", "Code", "Images"],
      output: ["Text", "Code"]
    },
    description: "Engineered for high-volume, cost-sensitive workloads where millisecond responsiveness is critical. Delivers high throughput for classification, lightweight transformation, and real-time streaming pipelines.",
    detailedCapabilities: [
      "Lowest cost per million tokens in the Gemini model family",
      "Instant time-to-first-token suited for high-frequency autocomplete",
      "Efficient JSON extraction from noisy scraped documents",
      "Optimal for high-throughput user intent routing and sentiment scoring",
      "Full 1M token context capacity retained despite lightweight footprint"
    ],
    bestFor: "High-volume classification, intent detection, content moderation, streaming autocomplete, and high-frequency IoT / web scraping pipelines.",
    useCases: [
      {
        scenario: "High-Throughput Web Scrape Parser & Normalizer",
        industry: "Data Engineering / AdTech",
        whyThisModel: "Processes millions of raw HTML snippets per hour at pennies per gigabyte, extracting price and inventory data cleanly.",
        exampleInputOutput: "Input: Raw messy e-commerce HTML table\nOutput: Normalized JSON record with brand, sku, price, stock"
      },
      {
        scenario: "Real-Time User Query Intent Routing & Triage",
        industry: "SaaS Platforms & AI Gateways",
        whyThisModel: "Determines whether an incoming user query needs a simple answer, an SQL query, or escalation to a Gemini 3.1 Pro agent in <150ms.",
        exampleInputOutput: "Input: 'Refund order #1234'\nOutput: { route: 'billing_support', priority: 'HIGH' }"
      },
      {
        scenario: "Automated Content Moderation at Scale",
        industry: "Social Media & Community Platforms",
        whyThisModel: "High concurrency and low price permit screening every user comment, review, or forum submission against safety guidelines.",
        exampleInputOutput: "Input: User forum post text\nOutput: { pass: true, flags: [], toxicScore: 0.02 }"
      }
    ],
    pricingTier: "Free Tier & Pay-as-you-go",
    sdkSnippet: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

const response = await ai.models.generateContent({
  model: 'gemini-3.1-flash-lite',
  contents: 'Classify sentiment and urgency of this customer review: "Delivery took 2 weeks and box was crushed!"',
  config: {
    responseMimeType: 'application/json'
  }
});`,
    officialDocsUrl: "https://ai.google.dev/gemini-api/docs/models#gemini-3.1-flash-lite"
  },
  {
    id: "gemini-3-1-flash-image",
    name: "Gemini 3.1 Flash-Image (Nano Banana 2)",
    modelCode: "gemini-3.1-flash-image",
    alias: "nano banana 2 / gemini flash image",
    category: "Vision & Image",
    badge: "Image Generation & Edit",
    badgeColor: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    contextWindow: {
      input: "Multimodal Prompts & Image Inputs",
      output: "Generated PNG/JPEG (512px to 4K)"
    },
    supportedModalities: {
      input: ["Text Prompts", "Reference Images (up to 3)"],
      output: ["Synthesized Images (1:1, 16:9, 9:16, 4:3, 3:4)"]
    },
    description: "State-of-the-art visual generation and editing model. Produces photorealistic imagery, diagrams, and artistic renders with pinpoint prompt alignment and precise multi-turn editing.",
    detailedCapabilities: [
      "Text-to-image synthesis with typography and legible text rendering",
      "Image-to-image editing: inpainting, style transfer, and character persistence",
      "Flexible aspect ratios: 1:1, 16:9, 9:16, 4:3, 3:4, 2:3, 3:2",
      "Resolution control: 512px thumbnail, 1K standard, 2K HD, and 4K production",
      "Multi-image composition (combining elements from up to 3 input images)",
      "Zero device frames: generates pristine UI mockups and clean artwork"
    ],
    bestFor: "UI/UX mockup prototyping, marketing hero graphics, social share cards, architectural concept renders, and game asset production.",
    useCases: [
      {
        scenario: "Production Web & App UI Mockup Generation",
        industry: "Product Design / Frontend Engineering",
        whyThisModel: "Renders modern, production-grade web dashboards and mobile screens with clean typography and zero AI-slop device frames.",
        exampleInputOutput: "Input: 'A sleek dark-mode crypto analytics dashboard with neon teal line graphs and balance widget'\nOutput: High-res PNG interface mockup"
      },
      {
        scenario: "Interactive In-Context Asset Editing",
        industry: "Creative Studios / Marketing",
        whyThisModel: "Takes an existing product photo and modifies background lighting or accessories while maintaining 100% brand product fidelity.",
        exampleInputOutput: "Input: Existing perfume bottle photo + 'Place on wet marble at sunset with soft bokeh'\nOutput: Perfectly blended studio product render"
      },
      {
        scenario: "OpenGraph Social Share & Marketing Banners",
        industry: "Content Marketing / SaaS",
        whyThisModel: "Generates custom 16:9 share cards with crisp title typography and vibrant branding colors for technical blog posts.",
        exampleInputOutput: "Input: 'Futuristic quantum computing chip with blue laser optics, 16:9 aspect ratio'\nOutput: 16:9 high-res blog hero banner"
      }
    ],
    pricingTier: "Paid Key Required",
    sdkSnippet: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

const response = await ai.models.generateImages({
  model: 'gemini-3.1-flash-image',
  prompt: 'A minimalist technical diagram of cloud edge microservices, dark navy background, clean vector lines',
  config: {
    numberOfImages: 1,
    aspectRatio: '16:9',
    outputMimeType: 'image/png'
  }
});

const base64ImageBytes = response.generatedImages[0].image.imageBytes;`,
    officialDocsUrl: "https://ai.google.dev/gemini-api/docs/models#imagen-3"
  },
  {
    id: "gemini-3-8-live",
    name: "Gemini 3.8 Live & Extended Thinking",
    modelCode: "gemini-3.8-live",
    alias: "native audio / gemini live",
    category: "Real-Time Audio & Voice",
    badge: "Bidirectional Streaming",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    contextWindow: {
      input: "Continuous WebSocket Stream (Audio, Video, Text)",
      output: "Sub-500ms Audio Stream (PCM 24kHz) + Text"
    },
    supportedModalities: {
      input: ["Real-time Audio PCM", "Webcam/Screen Video Frames", "Text"],
      output: ["Ultra-low-latency Native Voice Audio", "Text Events"]
    },
    description: "The Live API model engineered for natural, low-latency, bidirectional audio and video conversations over persistent WebSockets. Supports interruptions, conversational backchanneling, and real-time vision inspection.",
    detailedCapabilities: [
      "Sub-500ms end-to-end voice turnaround: speaks while listening",
      "Native natural interruption: stops speaking immediately when user cuts in",
      "Real-time webcam video stream comprehension (e.g. 1 frame per second)",
      "Live tool calling during voice conversation without disconnecting stream",
      "Extended Thinking variant ('gemini-3.8-live-extended-thinking') for complex reasoning during live spoken dialogue",
      "Supports 30+ spoken languages and natural dialect inflections"
    ],
    bestFor: "Real-time voice tutors, hands-free field technician assistants, conversational customer service, and real-time screen-sharing pair programmers.",
    useCases: [
      {
        scenario: "Interactive Hands-Free Coding Pair Programmer",
        industry: "Developer Tools",
        whyThisModel: "Watches the developer's screen stream while discussing compiler errors naturally via voice without waiting for manual typing.",
        exampleInputOutput: "Input: Developer shares IDE screen: 'Why is line 42 throwing a NullPointerException?'\nOutput: Immediate spoken explanation: 'You forgot to check if user.profile is initialized before calling .getAvatar()'"
      },
      {
        scenario: "Real-Time Spoken Language Immersion Tutor",
        industry: "EdTech & Language Learning",
        whyThisModel: "Provides conversational practice with instant spoken feedback on pronunciation, grammar, and natural colloquialisms.",
        exampleInputOutput: "Input: User speaks French with subtle tense mistake\nOutput: Natural conversational French reply politely modeling the corrected subjunctive tense"
      },
      {
        scenario: "Field Maintenance AR Technician Assistant",
        industry: "Manufacturing & Aerospace",
        whyThisModel: "Technician points smartphone or AR glasses camera at a machinery valve; Gemini verbally guides the pressure recalibration step-by-step.",
        exampleInputOutput: "Input: Camera feed of pneumatic valve manifold + 'Is this pressure regulator aligned?'\nOutput: 'Turn the yellow dial 15 degrees counterclockwise until the gauge reaches 45 PSI'"
      }
    ],
    pricingTier: "Free Tier & Pay-as-you-go",
    sdkSnippet: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

// Connect to Gemini Live bidirectional WebSocket session
const session = await ai.aio.live.connect({
  model: 'gemini-3.8-live',
  config: {
    generationConfig: {
      responseModalities: ['AUDIO'],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Puck' }
        }
      }
    }
  }
});

// Stream local microphone PCM chunks directly
session.send({ realtimeInput: { mediaChunks: [audioPcmData] } });`,
    officialDocsUrl: "https://ai.google.dev/gemini-api/docs/live"
  },
  {
    id: "gemini-3-5-transcribe",
    name: "Gemini 3.5 Transcribe & Transcribe-Live",
    modelCode: "gemini-3.5-transcribe",
    alias: "audio transcription / live transcribe",
    category: "Real-Time Audio & Voice",
    badge: "Speech to Text & Translation",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    contextWindow: {
      input: "Up to 3 hours recorded audio / Continuous live stream",
      output: "Full text transcript with millisecond timestamps"
    },
    supportedModalities: {
      input: ["Audio (WAV, MP3, AAC, FLAC, OGG, PCM)"],
      output: ["Timestamped Text", "Speaker Diarization JSON"]
    },
    description: "Dedicated acoustic speech-to-text model delivering unmatched accuracy across overlapping speakers, noisy environments, technical terminology, and simultaneous multilingual live translation.",
    detailedCapabilities: [
      "Precise word-level and utterance-level millisecond timestamps",
      "Automatic multi-speaker diarization (Speaker 1, Speaker 2 identification)",
      "High resilience to background chatter, reverberation, and low-bitrate compression",
      "Domain-specific vocabulary adaptation (medical terms, code syntax, financial tickers)",
      "Transcribe-Live variant ('gemini-3.5-transcribe-live') for live conference and broadcast subtitling"
    ],
    bestFor: "Meeting note generators, clinical doctor-patient dictation, broadcast live captioning, and podcast audio indexing.",
    useCases: [
      {
        scenario: "Automated Executive Board Meeting Transcripts & Action Items",
        industry: "Enterprise / Legal",
        whyThisModel: "Accurately separates board member voices, generating verbatim records and extracting binding resolution votes.",
        exampleInputOutput: "Input: 90-minute board room audio recording\nOutput: Diarized transcript with speaker names + bulleted action items"
      },
      {
        scenario: "Clinical Patient Consultation Medical Transcription",
        industry: "Healthcare & Telehealth",
        whyThisModel: "Flawlessly identifies complex pharmacological names, dosages, and ICD-10 diagnostic phrasing without acoustic confusion.",
        exampleInputOutput: "Input: Doctor-patient exam audio\nOutput: SOAP note formatted with Chief Complaint, Assessment, and Rx plan"
      }
    ],
    pricingTier: "Free Tier & Pay-as-you-go",
    sdkSnippet: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

const response = await ai.models.generateContent({
  model: 'gemini-3.5-transcribe',
  contents: [
    {
      inlineData: {
        mimeType: 'audio/mp3',
        data: base64AudioBuffer
      }
    },
    { text: 'Transcribe this recording with speaker diarization and word timestamps.' }
  ]
});`,
    officialDocsUrl: "https://ai.google.dev/gemini-api/docs/audio"
  },
  {
    id: "gemini-3-8-flash-tts",
    name: "Gemini 3.8 Flash TTS & Flash-Lite TTS",
    modelCode: "gemini-3.8-flash-tts",
    alias: "gemini text-to-speech",
    category: "Real-Time Audio & Voice",
    badge: "Controllable Speech Synthesis",
    badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    contextWindow: {
      input: "Text & Voice Design Prompts",
      output: "Studio-Quality 24kHz / 48kHz Audio"
    },
    supportedModalities: {
      input: ["Text", "Voice Persona Prompts", "Vocal Expression Tags"],
      output: ["Linear PCM / MP3 / Opus Audio Stream"]
    },
    description: "Next-generation text-to-speech synthesis allowing developers to prompt custom voice personas from scratch. Supports vocal bursts (<laugh>, <sigh>, <gasp>) and backchannel interjections (|mhm|, |yeah|).",
    detailedCapabilities: [
      "Custom Voice Design: specify age, accent, cadence, and vocal texture via text prompts",
      "Vocal bursts and expressive acoustics: <laugh>, <whisper>, <gasp>, <throat-clearing>",
      "Backchannel conversational timing: realistic |mhm|, |uh-huh|, |right|",
      "Multi-speaker dialogue scripting in a single unified generation call",
      "Flash-Lite TTS variant ('gemini-3.8-flash-lite-tts') for ultra-high-throughput bulk narration"
    ],
    bestFor: "Audiobook narration, interactive game character voices, dynamic podcast generation, screenplay readings, and voice agent telephony.",
    useCases: [
      {
        scenario: "Dynamic Two-Host AI Podcast Production",
        industry: "Media & Podcasting",
        whyThisModel: "Generates natural banter between two distinct character voices who laugh, interrupt, and react organically to news articles.",
        exampleInputOutput: "Input: Script with [Host A]: 'Did you see this?' <laugh> [Host B]: '|mhm| totally wild!'\nOutput: Seamless multi-speaker audio with natural overlapping laughs"
      },
      {
        scenario: "Interactive NPC Voice Synthesis for Video Games",
        industry: "Gaming & Virtual Worlds",
        whyThisModel: "Designs custom fantasy character voices (e.g. 'a weary dwarven blacksmith with a gravelly Scottish lilt') on the fly.",
        exampleInputOutput: "Input: 'Voice: grumpy grizzled veteran. Line: Keep your head down or you will lose it!'\nOutput: Character-matched studio audio"
      }
    ],
    pricingTier: "Free Tier & Pay-as-you-go",
    sdkSnippet: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

const response = await ai.models.generateContent({
  model: 'gemini-3.8-flash-tts',
  contents: 'Welcome aboard flight 402 to Tokyo. <pause> Please fasten your seatbelts.',
  config: {
    speechConfig: {
      voiceConfig: {
        prebuiltVoiceConfig: { voiceName: 'Aoede' }
      }
    }
  }
});`,
    officialDocsUrl: "https://ai.google.dev/gemini-api/docs/speech"
  },
  {
    id: "veo-3-1",
    name: "Veo 3.1 & Veo 3.1 Lite",
    modelCode: "veo-3.1-generate-preview",
    alias: "veo",
    category: "Video & Music",
    badge: "1080p Generative Video",
    badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    contextWindow: {
      input: "Text Prompts & Keyframe Images",
      output: "1080p High-Definition MP4 Video (24fps / 60fps)"
    },
    supportedModalities: {
      input: ["Text Prompt", "Initial Keyframe Image", "Director Cinematic Controls"],
      output: ["Full 1080p Video Stream (MP4)"]
    },
    description: "Google's flagship generative video model. Creates stunning 1080p cinematic clips with realistic physics, temporal coherence, accurate lighting, and fine-grained camera direction (pan, orbit, zoom, crane).",
    detailedCapabilities: [
      "Crisp 1080p photorealistic video generation up to 60 seconds",
      "Cinematic camera motion controls: pan left/right, crane shot, 360-degree orbit, zoom in/out",
      "Realistic fluid dynamics, soft-body physics, and accurate shadow trajectories",
      "Image-to-video: animate static concept art or product photos into living motion",
      "Veo Lite variant ('veo-3.1-lite-generate-preview') for rapid storyboard draft iterations"
    ],
    bestFor: "Commercial advertising teasers, cinematic visual effects storyboards, educational science simulations, and social video generation.",
    useCases: [
      {
        scenario: "Luxury Automotive Commercial Teaser",
        industry: "Advertising & Marketing",
        whyThisModel: "Generates high-speed vehicle tracking shots with asphalt wet reflections and cinematic lighting without a multimillion-dollar film shoot.",
        exampleInputOutput: "Input: 'Sleek electric hypercar driving through neon rainy Tokyo street at night, camera tracking alongside, 1080p cinematic 24fps'\nOutput: Broadcast-ready MP4 clip"
      },
      {
        scenario: "Interactive Visual Storyboarding for Directors",
        industry: "Film & Entertainment",
        whyThisModel: "Transforms a screenplay script and character sketch into a dynamic 15-second moving keyframe sequence.",
        exampleInputOutput: "Input: Keyframe drawing of astronaut + 'Camera slowly orbits astronaut as earth rises in background'\nOutput: Smooth 1080p cinematic camera movement"
      }
    ],
    pricingTier: "Paid Key Required",
    sdkSnippet: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

const operation = await ai.models.generateVideos({
  model: 'veo-3.1-generate-preview',
  prompt: 'Drone shot descending through misty redwood forest canopy at sunrise, golden light rays, 1080p',
  config: {
    aspectRatio: '16:9',
    durationSeconds: 5
  }
});`,
    officialDocsUrl: "https://ai.google.dev/gemini-api/docs/models#veo"
  },
  {
    id: "lyria-3",
    name: "Lyria 3 (Clip & Pro)",
    modelCode: "lyria-3-pro-preview",
    alias: "lyria-3-clip-preview / lyria music",
    category: "Video & Music",
    badge: "Music & Audio Composition",
    badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/30",
    contextWindow: {
      input: "Genre, Tempo, Instruments & Mood Prompts",
      output: "Studio-Quality Stereo Music (WAV/MP3)"
    },
    supportedModalities: {
      input: ["Music Genre Descriptors", "BPM & Key Signatures", "Instrument Stems"],
      output: ["High-Fidelity Audio Tracks (30s clips up to full compositions)"]
    },
    description: "Google DeepMind's premier generative music model. Synthesizes rich instrumental compositions, vocals, adaptive game soundtracks, and audio themes with acoustic clarity and harmonic progression.",
    detailedCapabilities: [
      "Genre breadth: lo-fi chillhop, orchestral symphony, cinematic synthwave, jazz, EDM, rock",
      "Fine-grained control over BPM (tempo), major/minor key signatures, and instrumentation",
      "Lyria Clip ('lyria-3-clip-preview') for instant 30-second loopable audio beds",
      "Lyria Pro ('lyria-3-pro-preview') for full-length structured compositions with intro, verse, chorus, and outro",
      "SynthID watermarking embedded directly into audio frequencies for provenance verification"
    ],
    bestFor: "Dynamic video game soundtracks, podcast intro/outro themes, social media video background audio, and meditation apps.",
    useCases: [
      {
        scenario: "Adaptive Dynamic Video Game Soundtrack",
        industry: "Game Development",
        whyThisModel: "Generates smooth transitions between peaceful ambient exploration music and high-tempo boss battle battle themes in real time.",
        exampleInputOutput: "Input: 'Upbeat 8-bit retro arcade synthwave, 128 BPM, driving baseline and bright leads'\nOutput: High-energy loopable track"
      },
      {
        scenario: "Automated Commercial Jingle & Podcast Theme Song",
        industry: "Branding & Media",
        whyThisModel: "Creates memorable signature audio themes matching brand personality without royalty licensing overhead.",
        exampleInputOutput: "Input: 'Warm acoustic indie folk jingle, nylon string guitar, soft shaker, welcoming vibe, 15 seconds'\nOutput: Studio-grade audio branding clip"
      }
    ],
    pricingTier: "Paid Key Required",
    sdkSnippet: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

const musicTrack = await ai.models.generateContent({
  model: 'lyria-3-pro-preview',
  contents: 'A calm lo-fi beat with electric piano, vinyl crackle, and slow mellow drums, 80 BPM'
});`,
    officialDocsUrl: "https://ai.google.dev/gemini-api/docs/music"
  },
  {
    id: "gemini-embedding-2",
    name: "Gemini Embedding 2",
    modelCode: "gemini-embedding-2-preview",
    alias: "gemini-embeddings",
    category: "Embeddings",
    badge: "Multimodal Vector Search",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    contextWindow: {
      input: "Up to 8,192 tokens per document / image",
      output: "768 / 1536 / 3072 dimension vector"
    },
    supportedModalities: {
      input: ["Text", "Source Code", "Images", "Multimodal Documents"],
      output: ["Float32 Dense Vector Array"]
    },
    description: "High-performance multimodal embedding model for enterprise Retrieval-Augmented Generation (RAG), semantic code search, and cross-modal image-text retrieval with Matryoshka dimension truncation.",
    detailedCapabilities: [
      "Multimodal embedding: maps text queries and images into the exact same shared semantic vector space",
      "Matryoshka representation learning: truncate vector dimensions from 3072 down to 768 or 256 with negligible accuracy drop to reduce vector DB storage costs by 75%",
      "Specialized Task Types: RETRIEVAL_DOCUMENT, RETRIEVAL_QUERY, SEMANTIC_SIMILARITY, CLASSIFICATION, CLUSTERING",
      "Exceptional code search understanding across TypeScript, Python, Go, Java, Rust, and SQL"
    ],
    bestFor: "Retrieval-Augmented Generation (RAG) vector pipelines, semantic codebase navigation, enterprise knowledge base search, and recommendation systems.",
    useCases: [
      {
        scenario: "Enterprise RAG Over Millions of PDF Policies",
        industry: "Insurance & FinTech",
        whyThisModel: "Embeds both diagrams, tables, and dense legal text into unified vectors, ensuring RAG queries fetch the exact pertinent clause.",
        exampleInputOutput: "Input Query: 'What is our policy on flood damage for commercial properties?'\nOutput: High cosine similarity match to Underwriting Guidelines Section 4.2"
      },
      {
        scenario: "Semantic Code Repository Search Engine",
        industry: "Developer Tools",
        whyThisModel: "Understands conceptual developer intent rather than relying on exact string or symbol keyword matches.",
        exampleInputOutput: "Input Query: 'Where do we handle payment retry backoff logic?'\nOutput: Direct match to src/billing/circuitBreaker.ts without mentioning the word 'retry'"
      }
    ],
    pricingTier: "Free Tier & Pay-as-you-go",
    sdkSnippet: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

const response = await ai.models.embedContent({
  model: 'gemini-embedding-2-preview',
  contents: 'Function calculating exponentially decaying cache scores',
  config: {
    taskType: 'RETRIEVAL_DOCUMENT',
    outputDimensionality: 768
  }
});

const vector = response.embedding.values;`,
    officialDocsUrl: "https://ai.google.dev/gemini-api/docs/embeddings"
  }
];
