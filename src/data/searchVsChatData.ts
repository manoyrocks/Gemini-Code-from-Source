export interface SearchVsChatComparisonSample {
  id: string;
  title: string;
  category: 'Debugging & Code' | 'Decision Making & Analysis' | 'Document & Multimodal' | 'Custom Planning' | 'Conceptual Learning' | 'Multi-Turn Refinement';
  userGoal: string;
  
  // Google Search Pipeline
  googleSearch: {
    typicalInput: string;
    inputCharacteristics: string[];
    processingMechanism: string;
    outputType: string;
    rawOutputSimulation: {
      organicResults: {
        title: string;
        url: string;
        snippet: string;
        sponsored?: boolean;
      }[];
      featuredSnippet?: string;
    };
    userEffortRequired: string;
    frictionPoints: string[];
  };

  // Gemini Chat Pipeline
  geminiChat: {
    typicalInput: string;
    inputCharacteristics: string[];
    processingMechanism: string;
    outputType: string;
    synthesizedResponse: string;
    followUpTurn?: {
      userFollowUp: string;
      geminiFollowUpResponse: string;
    };
    keyAdvantage: string;
    tokensAndGrounding: string;
  };
}

export interface PipelineStageDifference {
  stage: '1. Input Phase' | '2. Processing & Reasoning' | '3. Output & Delivery' | '4. Follow-up & Iteration';
  googleSearchApproach: {
    title: string;
    description: string;
    characteristics: string[];
    analogy: string;
  };
  geminiChatApproach: {
    title: string;
    description: string;
    characteristics: string[];
    analogy: string;
  };
  keyTakeaway: string;
}

export const SEARCH_VS_CHAT_PIPELINE: PipelineStageDifference[] = [
  {
    stage: '1. Input Phase',
    googleSearchApproach: {
      title: 'Keyword Queries & Boolean Syntax',
      description: 'Optimized for index lookup using terse keywords, quotes, and operators (site:, filetype:, OR). Users must translate natural human intent into search keywords.',
      characteristics: [
        'Disjoint keyword strings (e.g., "react useeffect fetch async race condition fix")',
        'No conversational memory; each query is evaluated in isolation',
        'Text-only inputs (or reverse image search via Google Lens as a separate mode)',
        'Users fear wordiness because extraneous words dilute lexical matching'
      ],
      analogy: 'Looking up words in a giant library card catalog index.'
    },
    geminiChatApproach: {
      title: 'Natural Conversational Context & Multimodal Files',
      description: 'Accepts unstructured conversational natural language, code repositories, PDFs, spreadsheets, audio notes, and video recordings in a single 1M-token prompt.',
      characteristics: [
        'Full conversational paragraphs expressing nuance, constraints, and personas',
        'Persistent multi-turn memory: remembers previous constraints automatically',
        'Native multimodality: attach source code files, logs, error screenshots, and voice recordings',
        'Encourages detailed context: the more specific you are, the better the synthesis'
      ],
      analogy: 'Briefing a senior staff software engineer or research partner at your desk.'
    },
    keyTakeaway: 'Search requires you to speak like an indexer; Gemini lets you communicate like a human with full contextual nuances and attached artifacts.'
  },
  {
    stage: '2. Processing & Reasoning',
    googleSearchApproach: {
      title: 'Inverted Index & PageRank Crawling',
      description: 'Crawls billions of public web pages ahead of time, indexes tokens into an inverted index, and ranks candidate URLs using PageRank, BM25, and semantic embeddings.',
      characteristics: [
        'Retrieves pre-existing static web pages published by third parties',
        'No ability to synthesize new calculations, custom code, or tailored solutions',
        'Heavily influenced by Search Engine Optimization (SEO) tactics and sponsored bid rankings',
        'Information freshness depends on Googlebot crawl schedule'
      ],
      analogy: 'A supercharged librarian handing you 10 relevant books with sticky notes on them.'
    },
    geminiChatApproach: {
      title: 'Deep Transformer Attention & Tool Grounding',
      description: 'Processes your query through 1M+ tokens of neural attention, reasons across conceptual boundaries, and dynamically calls Google Search grounding and Python code execution.',
      characteristics: [
        'Autoregressive generation: constructs novel bespoke solutions from first principles',
        'Real-time Search Grounding: queries live Google Search index on-demand with source citations',
        'Executes Python code in a sandboxed runtime for mathematically verifiable outputs',
        'Zero vulnerability to SEO keyword stuffing—evaluates truthfulness and coherence'
      ],
      analogy: 'An expert who reads all 10 books in 300 milliseconds, solves your specific math problem, and hands you the final answer.'
    },
    keyTakeaway: 'Google Search indexes and ranks other people\'s pages; Gemini reasons, calculates, searches in real-time, and synthesizes a unique answer for your exact problem.'
  },
  {
    stage: '3. Output & Delivery',
    googleSearchApproach: {
      title: '10 Blue Links & Fragmented Snippets',
      description: 'Delivers a ranked list of URLs, sponsored advertisements, and brief 2-line snippets. The human user must act as the manual synthesis engine.',
      characteristics: [
        'SERP (Search Engine Results Page) with ads, video carousels, and 10 blue links',
        'User must open 5 to 10 browser tabs, skim articles, and dodge cookie banners & paywalls',
        'User manually extracts the relevant paragraph and stitches together the final conclusion',
        'Static representation: cannot format answers into customized tables or customized code'
      ],
      analogy: 'Handing you ingredients and a map to 5 grocery stores.'
    },
    geminiChatApproach: {
      title: 'Direct Tailored Solutions & Artifacts',
      description: 'Generates direct answers, fully formed code patches, comparative tables, executive summaries, and downloadable artifacts ready for production use.',
      characteristics: [
        'Direct solution: zero link-hopping or tab juggling required',
        'Formats output exactly as requested: Markdown tables, JSON schemas, diffs, or executive briefs',
        'Cites live web URLs inline with clickable grounding chips when factual verification is needed',
        'Eliminates advertising noise, affiliate clickbait, and intrusive popups'
      ],
      analogy: 'A Michelin-star chef serving you the completed, customized meal.'
    },
    keyTakeaway: 'In Google Search, YOU are the synthesis engine; in Gemini Chat, the AI does the synthesis and hands you the finished artifact.'
  },
  {
    stage: '4. Follow-up & Iteration',
    googleSearchApproach: {
      title: 'Starting Over from Scratch',
      description: 'Every new query in Google Search is completely stateless. Refining results requires formulating a new keyword string and re-filtering search results.',
      characteristics: [
        'Zero conversational memory between searches',
        'Cannot say "Now make that shorter" or "Convert the above into TypeScript"',
        'Modifying one constraint forces the user to re-evaluate all 10 links from zero',
        'History is stored merely as a flat log of past URLs visited'
      ],
      analogy: 'Re-introducing yourself to a receptionist every time you ask another question.'
    },
    geminiChatApproach: {
      title: 'Continuous Multi-Turn Dialogue Refinement',
      description: 'Preserves the entire conversation thread, allowing progressive refinement, tone shifts, edge-case testing, and code rewrites with simple conversational follow-ups.',
      characteristics: [
        'Effortless follow-ups: "Now write tests for it", "What if the user is offline?", "Make it a table"',
        'Branching conversations: explore alternative architectural hypotheses seamlessly',
        'Dynamic state updates: provide error logs from your terminal and Gemini updates the existing solution',
        'Maintains project context across thousands of lines of discussion'
      ],
      analogy: 'An ongoing interactive whiteboarding session with a partner who never forgets what you said 10 minutes ago.'
    },
    keyTakeaway: 'Search is a series of isolated one-off lookups; Gemini Chat is a continuous collaborative problem-solving partnership.'
  }
];

export const SEARCH_VS_CHAT_SAMPLES: SearchVsChatComparisonSample[] = [
  {
    id: 'sample-debugging',
    title: 'Code Bug & Async Race Condition',
    category: 'Debugging & Code',
    userGoal: 'Diagnose why a React component crashes with "TypeError: Cannot read properties of undefined (reading map)" after an API call.',
    googleSearch: {
      typicalInput: 'react TypeError: Cannot read properties of undefined reading map useeffect fetch async',
      inputCharacteristics: [
        'Keyword-stuffed error string',
        'No source code provided (cannot paste code into Google search box effectively)',
        'No knowledge of user\'s React version or API response format'
      ],
      processingMechanism: 'Matches keywords against StackOverflow titles, blog posts, and forum threads.',
      outputType: 'SERP with 3 sponsored ad links, 2 StackOverflow threads from 2017/2019, and 4 generic tech blog articles.',
      rawOutputSimulation: {
        featuredSnippet: 'In React, "Cannot read properties of undefined (reading \'map\')" usually happens because your state starts as undefined and your fetch call is asynchronous...',
        organicResults: [
          {
            title: 'Ad: Fix React Bugs Faster with Sentry APM Monitoring',
            url: 'https://sentry.io/welcome',
            snippet: 'Track errors in real time. Automatic stack trace symbolication for React and Next.js.',
            sponsored: true
          },
          {
            title: 'TypeError: Cannot read properties of undefined (reading \'map\') in React',
            url: 'https://stackoverflow.com/questions/59281234/typeerror-cannot-read-properties...',
            snippet: 'Asked 6 years ago. Active 2 years ago. 14 answers. The top answer suggests initializing useState([]), but another answer suggests using ternary operator...'
          },
          {
            title: 'Common React Errors and How to Fix Them - DevBlog',
            url: 'https://devblog.io/react-errors-guide',
            snippet: 'Learn the top 10 React errors. Cookie banner: Please accept our cookies to continue reading this 15-minute guide...'
          }
        ]
      },
      userEffortRequired: 'User clicks StackOverflow, scrolls through 8 different answers, mentally evaluates which one applies to their specific code, copies code fragments, and tests manually.',
      frictionPoints: [
        'Cannot see user\'s actual code or state variable names',
        'StackOverflow answers may use outdated Class components or obsolete hooks patterns',
        'Intrusive ads, paywalled medium posts, and cookie consent banners'
      ]
    },
    geminiChat: {
      typicalInput: `Here is my component. Why does it crash on render?
\`\`\`tsx
export function UserList() {
  const [users, setUsers] = useState();
  useEffect(() => {
    fetch('/api/users').then(r => r.json()).then(data => setUsers(data.users));
  }, []);
  return <div>{users.map(u => <span key={u.id}>{u.name}</span>)}</div>;
}
\`\`\``,
      inputCharacteristics: [
        'Exact copy-paste of real broken source code',
        'Natural question explaining the observed failure',
        'No need to reverse-engineer search keywords'
      ],
      processingMechanism: 'Static analysis and neural comprehension of React lifecycle, hooks asynchronous execution flow, and undefined variable dereferencing.',
      outputType: 'Immediate surgical explanation with both the root cause and the corrected drop-in replacement code.',
      synthesizedResponse: `### Root Cause:
Your component crashes on the **initial render** before the asynchronous \`fetch\` resolves. 
Because \`useState()\` is called with no initial value, \`users\` defaults to \`undefined\`. When JSX executes \`users.map(...)\` on line 7, calling \`.map\` on \`undefined\` immediately throws a runtime TypeError.

### Surgical Fix (2 Options):

**Option 1 (Recommended): Initialize with an empty array:**
\`\`\`tsx
// Initialize with empty array so .map() executes safely on turn 1
const [users, setUsers] = useState<User[]>([]);
\`\`\`

**Option 2: Defensive Optional Chaining & Loading State:**
\`\`\`tsx
export function UserList() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/users')
      .then((r) => r.json())
      .then((data) => {
        setUsers(data?.users ?? []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load users', err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading users...</div>;
  return (
    <div>
      {users?.map((u) => (
        <span key={u.id} className="user-badge">{u.name}</span>
      ))}
    </div>
  );
}
\`\`\``,
      followUpTurn: {
        userFollowUp: 'Now add an AbortController so if the component unmounts quickly it cancels the in-flight request.',
        geminiFollowUpResponse: 'Updated with clean cleanup function returning `controller.abort()` in the `useEffect` return handler.'
      },
      keyAdvantage: 'Identifies the exact bug in YOUR code, writes custom type-safe drop-in code, and handles follow-up refinements without re-searching.',
      tokensAndGrounding: 'Direct code reasoning · 0ms external search latency · Tailored to exact variable names'
    }
  },
  {
    id: 'sample-decision-making',
    title: 'Technology Selection & Architectural Tradeoffs',
    category: 'Decision Making & Analysis',
    userGoal: 'Decide between ClickHouse, TimescaleDB, and Google Cloud Bigtable for ingesting 40,000 IoT telemetry metrics per second with a 30-day retention budget.',
    googleSearch: {
      typicalInput: 'clickhouse vs timescaledb vs bigtable iot time series 50k events per second pricing comparison',
      inputCharacteristics: [
        'Attempting to compare 3 distinct technologies simultaneously',
        'Constrained by specific throughput and retention budget'
      ],
      processingMechanism: 'Keyword ranking. Matches vendor marketing whitepapers, biased comparative blog posts, and Reddit discussions.',
      outputType: 'SERP dominated by vendor-sponsored comparison pages ("Why Timescale is Better Than Bigtable"), outdated Medium posts from 2021, and product landing pages.',
      rawOutputSimulation: {
        organicResults: [
          {
            title: 'Ad: ClickHouse Cloud - The Fastest Column-Oriented Database',
            url: 'https://clickhouse.com',
            snippet: 'Start for free today. Unmatched compression and query speeds for time-series analytics.',
            sponsored: true
          },
          {
            title: 'TimescaleDB vs ClickHouse: In-Depth Benchmark (Published by Timescale)',
            url: 'https://timescale.com/blog/timescale-vs-clickhouse...',
            snippet: 'In our synthetic benchmark, TimescaleDB outperforms ClickHouse in 7 out of 10 insert scenarios...'
          },
          {
            title: 'Google Cloud Bigtable Time Series Best Practices',
            url: 'https://cloud.google.com/bigtable/docs/schema-design-time-series',
            snippet: 'Learn how to design tall and narrow row keys for IoT time series telemetry data.'
          }
        ]
      },
      userEffortRequired: 'User must open all 3 vendor pages, filter out obvious corporate marketing bias, calculate storage compression math manually, and compile their own comparison spreadsheet.',
      frictionPoints: [
        'Vendor articles are inherently biased towards their own product',
        'No single web page discusses all 3 specific databases with the user\'s exact 40k/sec throughput and 30-day retention constraint',
        'User spends 3 hours reading conflicting benchmarks'
      ]
    },
    geminiChat: {
      typicalInput: 'We need to store 40,000 IoT metrics/sec (timestamp, sensor_id: uuid, metric_name: string, value: float64). Data is retained for 30 days. Queries are 95% aggregations (avg, p95 over 5-minute buckets) and 5% point-lookups. Compare ClickHouse, TimescaleDB, and Bigtable on write throughput, compression, operational overhead, and estimated monthly cost.',
      inputCharacteristics: [
        'Explicit workload parameters: schema, write volume, retention window, query profile, and decision criteria.',
        'Objective constraint-driven prompt.'
      ],
      processingMechanism: 'Synthesizes architectural knowledge, calculates exact disk storage requirements (40k/sec * 30 days = 103B rows), applies compression ratios, and compares operational models.',
      outputType: 'Structured side-by-side comparison table, math verification, and concrete recommendation.',
      synthesizedResponse: `### Workload Sizing:
- **Write Throughput**: 40,000 rows/sec = 2.4M rows/min = **103.68 Billion rows per 30-day window**.
- **Raw Uncompressed Payload**: ~40 bytes/row = **~4.14 TB raw per month**.

### Side-by-Side Architectural Evaluation:

| Evaluation Dimension | ClickHouse | TimescaleDB (PostgreSQL) | Google Cloud Bigtable |
| :--- | :--- | :--- | :--- |
| **Write Scalability (40k/s)** | **Effortless**. Columnar chunk merges easily ingest 200k+ rows/s per node. | **Moderate**. Requires hypertable partitioning; may need connection pooling & heavy tuning. | **Native**. Distributed NoSQL scales linearly by adding nodes. |
| **Storage Compression** | **Extreme (8x - 12x)** via ZSTD/LZ4 columnar encoding. ~400 GB total on disk. | **Good (4x - 6x)** via chunk compression policies. ~800 GB total. | **Moderate (2x - 3x)** via Snappy. ~1.5 TB - 2 TB total. |
| **Analytical Queries (P95/Avg)** | **Sub-second**. Vectorized SIMD execution dominates aggregation over billions of rows. | **Fast**. PostgreSQL compatibility with SQL ease, but slower on multi-billion row scans. | **Requires scan orchestration**. Not optimized for ad-hoc SQL math unless paired with BigQuery. |
| **Operational Simplicity** | Self-hosted or ClickHouse Cloud. Moderate config learning curve. | Standard PostgreSQL tools, pgAdmin, and existing SQL ecosystem. | **Fully Managed (Serverless)**. Zero sharding maintenance or disk provisioning. |
| **Estimated Monthly Cost** | **$ (Lowest)**: Small 2-node cluster or modest cloud instance (~$350-$600/mo). | **$$ (Moderate)**: Needs high IOPS storage tier (~$700-$1,200/mo). | **$$$ (Higher)**: Minimum 3-node cluster for SLA + storage costs (~$1,400-$2,100/mo). |

### Concrete Recommendation:
Choose **ClickHouse**. For 40k events/sec with 95% analytical aggregations, ClickHouse's columnar vectorization and 10x compression provide the lowest infrastructure bill and lowest P95 query latency by a wide margin.`,
      followUpTurn: {
        userFollowUp: 'Generate the ClickHouse MergeTree DDL table definition with TTL for the 30-day eviction policy.',
        geminiFollowUpResponse: 'Provides complete CREATE TABLE with ENGINE = MergeTree() PARTITION BY toYYYYMM(timestamp) ORDER BY (metric_name, sensor_id, timestamp) TTL timestamp + INTERVAL 30 DAY DELETE;'
      },
      keyAdvantage: 'Performs the quantitative calculations for you, eliminates marketing bias, and provides an actionable verdict with ready-to-run DDL code.',
      tokensAndGrounding: 'Quantitative reasoning + 103B row sizing calculation · No vendor ads'
    }
  },
  {
    id: 'sample-multimodal',
    title: 'Multimodal Document & Table Extraction',
    category: 'Document & Multimodal',
    userGoal: 'Extract quarterly revenue by business segment from an uploaded 85-page PDF financial report and compute Year-over-Year growth rates.',
    googleSearch: {
      typicalInput: 'alphabet 2025 q4 earnings release pdf segment revenue google services cloud',
      inputCharacteristics: [
        'Searching for public PDF document links',
        'Cannot perform math or data extraction inside search engine'
      ],
      processingMechanism: 'Retrieves links to corporate Investor Relations pages and PDF files.',
      outputType: 'Links to PDF files and third-party financial news articles with partial quotes.',
      rawOutputSimulation: {
        organicResults: [
          {
            title: 'Alphabet Announces Fourth Quarter and Fiscal Year 2025 Results (PDF)',
            url: 'https://abc.xyz/investor/earnings/2025/q4/',
            snippet: 'Alphabet Inc. today reported financial results for the quarter ended December 31, 2025. Revenues of $96.5B, up 15% year-over-year...'
          },
          {
            title: 'CNBC: Google Cloud breaks records in Q4 earnings',
            url: 'https://cnbc.com/2026/01/alphabet-earnings-q4',
            snippet: 'Alphabet reported earnings beating Wall Street expectations on cloud momentum...'
          }
        ]
      },
      userEffortRequired: 'User downloads the 85-page PDF, opens it in Acrobat, hits Ctrl+F "Segment Revenues", finds Table 2 on page 14, manually copies numbers into Excel, and writes `= (B2 - C2) / C2` formulas.',
      frictionPoints: [
        'Search engine stops at delivering the document; the entire cognitive workload falls on the user',
        'Takes 20+ minutes of manual copy-pasting and formula creation',
        'High risk of human transcription error from dense accounting footnotes'
      ]
    },
    geminiChat: {
      typicalInput: 'Attached is Alphabet\'s Q4 earnings PDF. Extract the revenue table for Google Services, Google Cloud, and Other Bets for Q4 2024 vs Q4 2025. Add a calculated column for YoY Growth % and summarize the main driver for Cloud growth mentioned in the management discussion.',
      inputCharacteristics: [
        'Direct PDF file attachment into the 1M token context window',
        'Specific formatting instruction (calculated column, management quote extraction)'
      ],
      processingMechanism: 'Gemini natively parses PDF document layout, tabular cells, and financial footnotes across all 85 pages, runs internal arithmetic, and synthesizes text.',
      outputType: 'Clean Markdown table with exact audited numbers, calculated growth percentages, and extracted management quote.',
      synthesizedResponse: `### Segment Revenues (in Millions USD) & Calculated YoY Growth:

| Segment | Q4 2024 | Q4 2025 | YoY Growth ($) | YoY Growth (%) |
| :--- | :--- | :--- | :--- | :--- |
| **Google Services** (Search, YouTube, Ads) | $72,459 | $81,210 | +$8,751 | **+12.08%** |
| **Google Cloud** (GCP & Workspace) | $9,192 | $11,940 | +$2,748 | **+29.89%** |
| **Other Bets** (Waymo, Verily) | $657 | $710 | +$53 | **+8.07%** |
| **Total Consolidated Revenues** | **$82,308** | **$93,860** | **+$11,552** | **+14.03%** |

### Key Cloud Growth Driver (from Page 18):
> *"Google Cloud growth accelerated to ~30%, driven by enterprise customer adoption of Gemini Enterprise models, Vertex AI platform consumption, and expanding multi-year commitments from generative AI startups."*`,
      followUpTurn: {
        userFollowUp: 'Convert this table into a CSV format ready to paste into our internal executive memo.',
        geminiFollowUpResponse: 'Provides clean comma-separated values block ready for 1-click clipboard copying.'
      },
      keyAdvantage: 'Ingests the raw 85-page document directly, performs the arithmetic calculations automatically, and pulls cited quotes in seconds.',
      tokensAndGrounding: 'Direct PDF multimodal ingestion (42k tokens) · Zero manual data entry'
    }
  },
  {
    id: 'sample-custom-planning',
    title: 'Custom Multi-Constraint Planning',
    category: 'Custom Planning',
    userGoal: 'Create a 5-day training and meal plan for a runner with patellar tendonitis, a nut allergy, a 45-minute daily limit, and no gym access.',
    googleSearch: {
      typicalInput: '5 day running plan patellar tendonitis no gym nut allergy 45 min workout',
      inputCharacteristics: [
        'Too many disjoint constraints for a search engine to match a single pre-existing webpage',
        'Search engine ignores 2 or 3 constraints to find any partial match'
      ],
      processingMechanism: 'Keyword indexing. Drops "nut allergy" and "45 min" to return general runner knee rehabilitation blogs.',
      outputType: 'Generic physical therapy blog articles and generic 5k training schedules.',
      rawOutputSimulation: {
        organicResults: [
          {
            title: 'Patellar Tendonitis in Runners: Exercises to Heal Knee Pain',
            url: 'https://runnersworld.com/health/patellar-tendonitis',
            snippet: 'Strengthen your quadriceps with eccentric squats, leg extensions, and isometric holds...'
          },
          {
            title: 'High Protein Nut-Free Snacks for Athletes',
            url: 'https://healthyeating.com/nut-free-athlete-diet',
            snippet: 'Fuel your workouts without peanuts or tree nuts with these 10 delicious ideas...'
          }
        ]
      },
      userEffortRequired: 'User must manually read 3 different fitness guides and 2 nutrition blogs, then spend 2 hours reconciling conflicting advice into their own custom calendar.',
      frictionPoints: [
        'Webpages are written for the general public, not the individual\'s intersection of constraints',
        'Exercises recommended by running blogs (e.g. barbell squats) violate the "no gym equipment" constraint'
      ]
    },
    geminiChat: {
      typicalInput: 'I am training for a 10K race but developed mild patellar tendonitis. Design a 5-day cross-training and rehab schedule where each session is under 45 minutes, requires zero gym equipment (bodyweight and resistance bands only), avoids deep repetitive knee flexion, and pair each day with a nut-free high-protein recovery meal idea.',
      inputCharacteristics: [
        'Multi-variable constraint satisfaction problem: injury type, time budget, equipment limits, diet limits.'
      ],
      processingMechanism: 'Simultaneous constraint satisfaction using knowledge of sports biomechanics, tendon rehabilitation protocols (isometrics), and nutritional science.',
      outputType: 'Cohesive, fully individualized 5-day daily protocol with exercises, sets, rests, and nut-free recipe specs.',
      synthesizedResponse: `### Individualized 5-Day Protocol (Knee Rehab + Aerobic Maintenance)

#### **Day 1: Tendon Isometrics & Low-Impact Aerobics (40 Mins)**
- **Rehab (20 min)**: 
  - Wall-Sit Isometric Holds (45-degree knee angle): 5 sets × 45s holds (releaves tendon pain via cortical inhibition).
  - Standing Banded Terminal Knee Extensions (TKE): 3 sets × 20 reps per leg.
- **Cardio (20 min)**: Brisk incline walking or shadow boxing intervals (no repetitive knee impact).
- **Nut-Free Recovery Meal**: Greek yogurt bowl with sunflower seed butter, hemp seeds, blueberries, and honey (32g protein).

#### **Day 2: Posterior Chain & Core (42 Mins)**
- **Rehab (25 min)**: 
  - Single-leg glute bridges: 4 sets × 12 reps.
  - Banded Romanian Deadlifts (RDL): 4 sets × 15 reps (targets hamstrings/glutes without anterior knee shearing).
  - Side-lying hip abductions: 3 sets × 20 reps.
- **Cardio (17 min)**: 45s jumping-jack-free core tabata (planks, deadbugs, bird-dogs).
- **Nut-Free Recovery Meal**: Grilled chicken breast wrap with pumpkin seed pesto, spinach, and feta (40g protein).

... [Days 3-5 custom tailored with progression] ...`,
      followUpTurn: {
        userFollowUp: 'Swap Day 3 meal with something I can prep in under 5 minutes without cooking.',
        geminiFollowUpResponse: 'Replaced with a no-cook tuna and white bean salad with lemon juice and olive oil (35g protein, 3 min prep).'
      },
      keyAdvantage: 'Simultaneously satisfies every constraint in one coherent answer; adapts instantly when constraints change.',
      tokensAndGrounding: 'Cross-domain reasoning across sports medicine and clinical nutrition'
    }
  },
  {
    id: 'sample-conceptual-learning',
    title: 'Adaptive Learning & Mental Models',
    category: 'Conceptual Learning',
    userGoal: 'Understand the Self-Attention mechanism in Transformer models tailored to a senior SQL database administrator\'s mental model.',
    googleSearch: {
      typicalInput: 'transformer self attention mechanism explained simply formula query key value',
      inputCharacteristics: [
        'Generic technical keywords',
        'Cannot express the learner\'s specific prior knowledge or background'
      ],
      processingMechanism: 'Pulls the most popular articles and academic papers on Transformer models.',
      outputType: 'Academic math papers (Vaswani et al.), generic illustrations, and Medium articles explaining for data scientists.',
      rawOutputSimulation: {
        organicResults: [
          {
            title: 'Attention Is All You Need - arXiv',
            url: 'https://arxiv.org/abs/1706.03762',
            snippet: 'We propose the Transformer, a model architecture eschewing recurrence and instead relying entirely on an attention mechanism to draw global dependencies...'
          },
          {
            title: 'Illustrated Guide to Transformers and Self-Attention',
            url: 'https://jalammar.github.io/illustrated-transformer/',
            snippet: 'Let\'s understand the Query, Key, and Value vectors with a high-level visual walkthrough...'
          }
        ]
      },
      userEffortRequired: 'User must read mathematical notation ($\text{softmax}(QK^T / \sqrt{d_k})V$), translate abstract vector math into concepts they already know, and struggle through unfamiliar ML jargon.',
      frictionPoints: [
        'Articles assume a standard machine learning student background',
        'Cannot bridge the gap to relational database terminology that the user already masters'
      ]
    },
    geminiChat: {
      typicalInput: 'Explain the Transformer self-attention mechanism (Queries, Keys, Values) as if I am a Principal Database Architect who understands relational SQL, B-tree indexes, fuzzy hash joins, and cosine similarity, but has never touched PyTorch.',
      inputCharacteristics: [
        'Identifies the exact mental model and prior expertise of the learner',
        'Requests conceptual mapping rather than generic formulas'
      ],
      processingMechanism: 'Analogical translation and cognitive pedagogy: maps Machine Learning vector operations directly onto Relational Database query execution plans.',
      outputType: 'Precise conceptual bridge using SQL analogies and database execution metaphors.',
      synthesizedResponse: `### Self-Attention Explained in Database Terms:

Think of Self-Attention as a **Fuzzy, Probabilistic Hash Join between a table and itself**.

In a standard database, if you run:
\`\`\`sql
SELECT * FROM Tokens t1 
JOIN Tokens t2 ON t1.id = t2.id;
\`\`\`
It is binary: a row either matches the foreign key or it doesn't. 

In a Transformer, every token in a sentence (e.g. *"The bank of the river"*) needs to look at all other tokens in the same sentence to figure out what it means in context. Here is how **Query (Q), Key (K), and Value (V)** map to your DB world:

#### 1. The Query ($Q$): The \`WHERE\` Search Filter
- Every token issues a **Query vector**: *"I am the word 'bank'. I need context to know if I am a financial institution or a river bank."*
- In SQL terms, this is your search predicate: \`WHERE text LIKE ?\`.

#### 2. The Key ($K$): The Primary Key Index Tag
- Every token exposes a **Key vector** advertising what kind of information it holds: *"I am the word 'river', and I describe geography, water, and nature."*
- In SQL terms, this is the indexed search column on the foreign table.

#### 3. $Q \times K^T$: The Fuzzy Similarity Join (Attention Weights)
- Instead of an exact match (\`=\`), the model takes the dot product of the Query with every token's Key:
  \`\`\`sql
  SELECT t2.Value, CosineSimilarity(t1.Query, t2.Key) AS MatchScore
  FROM Sentence t1 
  CROSS JOIN Sentence t2
  \`\`\`
- The model runs a \`Softmax\` (which normalizes the match scores so they sum to 100%, like a weighted distribution). 'River' gets an 85% match score with 'bank'; 'the' gets 2%.

#### 4. The Value ($V$): The Actual Payload Retrieved
- Every token has a **Value vector** containing its substantive semantic data.
- The output for 'bank' is a **weighted average aggregation** of all Values in the table:
  \`\`\`sql
  SELECT SUM(t2.Value * t2.MatchScore) FROM ...
  \`\`\`

**The Summary**:
Self-Attention is just a **weighted \`CROSS JOIN\` and \`GROUP BY\` aggregation** where every token asks questions ($Q$), inspects the tags of neighbors ($K$), and calculates a weighted sum of their information ($V$).`,
      followUpTurn: {
        userFollowUp: 'What does "Multi-Head Attention" correspond to in this database analogy?',
        geminiFollowUpResponse: 'Multi-Head Attention is running multiple parallel JOIN queries with different composite index projections—one head joins on grammatical subject-verb relationships, another joins on temporal proximity, and another joins on semantic sentiment.'
      },
      keyAdvantage: 'Bridges directly into the user\'s existing mental models; eliminates hours of wading through unhelpful academic ML notation.',
      tokensAndGrounding: 'Adaptive pedagogy · Zero jargon friction · Custom analogical reasoning'
    }
  }
];
