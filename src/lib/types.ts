export interface RetrievedChunk {
  id: string
  text: string
  score: number
  rank: number
  source: string
  pageNumber: number
  sectionName: string
  chunkSize: number
  tokenCount: number
  chunkOverlap: number
  metadata: {
    pageNumber: number
    sourceType: string
    createdDate: string
    category: string
  }
}

export interface Citation {
  id: string
  documentName: string
  pageNumber: number
  sectionName: string
  paragraph: string
  retrievedScore: number
  confidenceScore: number
  sourceLink: string
  highlightedText: string
  answerSegment: string
}

export interface PromptAssembly {
  systemPrompt: string
  retrievedContext: string
  userQuestion: string
  finalPrompt: string
}

export interface QueryAnalytics {
  totalTimeMs: number
  embeddingSearchTimeMs: number
  rerankTimeMs: number
  generationTimeMs: number
  inputTokens: number
  outputTokens: number
  totalTokens: number
  estimatedCost: number
  confidenceScore: number
  groundingScore: number
}

export interface GroundingResult {
  grounded: boolean
  percentage: number
  supportedSegments: number
  totalSegments: number
  unsupportedSegments: string[]
}

export interface AnswerQuality {
  label: "Grounded" | "Partially Grounded" | "Low Confidence" | "Needs Verification"
  color: "green" | "yellow" | "red"
  explanation: string
}

export interface QueryTrace {
  id: string
  question: string
  answer: string
  queryExpansion: { original: string; expanded: string[] }
  vectorSearch: { strategy: string; topK: number; threshold: number; results: number }
  retrievedChunks: RetrievedChunk[]
  reranking: { strategy: string; before: number; after: number }
  promptAssembly: PromptAssembly
  llmGeneration: { model: string; temperature: number; tokensGenerated: number; latencyMs: number; cost: number }
  finalResponse: string
  analytics: QueryAnalytics
  grounding: GroundingResult
  quality: AnswerQuality
  citations: Citation[]
  timestamp: string
}

export interface KnowledgeSource {
  name: string
  status: "Indexed" | "Processing" | "Failed" | "Queued"
  pages: number
  chunks: number
  embeddings: number
  lastUpdated: string
  coverage: number
  quality: number
  retrievalFrequency: number
  category: string
}

export interface QueryHistoryItem {
  id: string
  query: string
  timestamp: string
  latencyMs: number
  confidence: number
  status: "success" | "partial" | "failed"
  environment: string
}

export interface SessionExport {
  question: string
  answer: string
  retrievedChunks: RetrievedChunk[]
  sources: string[]
  metadata: Record<string, string>
  trace: QueryTrace
  analytics: QueryAnalytics
  prompt: PromptAssembly
  timestamp: string
}

export interface ChunkDetail {
  id: number
  text: string
  tokens: number
  source: string
  retrievals: number
  lastRetrieved: string
  avgSimilarity: number
  connectedChunks: number[]
  chunkSize: number
  tokenCount: number
  chunkOverlap: number
  pageNumber: number
  sectionName: string
  embeddingModel: string
  vectorDimensions: number
  createdTimestamp: string
  embeddingStatus: string
}
