export type ViewMode = 'book' | 'simulator' | 'repos' | 'code' | 'comparison' | 'live';

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
