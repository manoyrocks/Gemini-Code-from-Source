export type ViewMode =
  | 'genai-101'
  | 'gemini-spark'
  | 'gemini-ai-studio'
  | 'agentic-ai'
  | 'book'
  | 'simulator'
  | 'repos'
  | 'code'
  | 'comparison'
  | 'live'
  | 'ai-softeng'
  | 'docs';

export type ThemeId = 'dark' | 'bark' | 'light' | 'ambient' | 'light-green' | 'light-pink';

export interface ThemeOption {
  id: ThemeId;
  name: string;
  description: string;
  mode: 'dark' | 'light';
  previewBg: string;
  previewAccent: string;
  previewBorder: string;
  emoji: string;
}

export interface InterviewChallenge {
  id: string;
  title: string;
  difficulty: 'Medium' | 'Hard' | 'Expert';
  category: 'Algorithms for AI' | 'Agentic Systems' | 'Attention & Tensors' | 'Memory & Cache';
  summary: string;
  problemStatement: string;
  googleContext: string;
  timeComplexity: string;
  spaceComplexity: string;
  starterCode: string;
  solutionCode: string;
  explanation: string;
  testCases: {
    description: string;
    input: any;
    expected: any;
  }[];
  // Function to execute code against tests in browser
  testRunnerFn: string;
}

export interface SystemDesignTopic {
  id: string;
  title: string;
  roleContext: string;
  scaleMetrics: {
    qps: string;
    latencyTarget: string;
    storage: string;
    costConstraint: string;
  };
  problemOverview: string;
  architectureDiagram: string;
  keyComponents: {
    name: string;
    purpose: string;
    googleTech: string;
    tradeoffs: string;
  }[];
  deepDives: {
    topic: string;
    content: string;
  }[];
}

export interface FoundationTopic {
  id: string;
  category: string;
  question: string;
  shortAnswer: string;
  inDepthAnswer: string;
  keyFormulasOrCode?: string;
  googleRelevance: string;
}


export interface Chapter {
  id: string;
  partNumber: number;
  partTitle: string;
  chapterNumber: number;
  title: string;
  slug: string;
  readingTimeMinutes: number;
  summary: string;
  claudeEquivalentTopic: string;
  keyGeminiSdkApis: string[];
  content: string;
  mermaidDiagram?: string;
  applyThis: string[];
  codeSnippets: {
    language: string;
    filename: string;
    description: string;
    code: string;
  }[];
}

export interface PartInfo {
  number: number;
  title: string;
  description: string;
  chapters: Chapter[];
}

export interface AgentStep {
  stepNumber: number;
  type: 'user_prompt' | 'thinking' | 'model_call' | 'tool_call' | 'tool_execution' | 'tool_response' | 'patch_apply' | 'final_answer';
  title: string;
  description: string;
  durationMs: number;
  tokens?: {
    promptTokens: number;
    cachedTokens: number;
    candidateTokens: number;
    totalTokens: number;
  };
  payload?: any;
  diff?: {
    file: string;
    original: string;
    modified: string;
  };
}

export interface RepoFile {
  path: string;
  language: string;
  content: string;
  isEntry?: boolean;
}

export interface ProductionRepo {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  starsCount: number;
  features: string[];
  geminiModel: string;
  technologies: string[];
  files: RepoFile[];
}

export interface ComparisonItem {
  dimension: string;
  category: 'Loop' | 'Tools' | 'Memory & Cache' | 'Multimodal' | 'Reasoning' | 'Distribution';
  claudeCodeApproach: string;
  claudeDocsReference: string;
  geminiCodeApproach: string;
  geminiDocsReference: string;
  geminiAdvantage: string;
}
