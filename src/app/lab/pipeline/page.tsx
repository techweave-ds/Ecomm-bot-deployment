"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { KnowledgeHealthCard } from "@/components/lab/knowledge-health"
import { ChunkExplorer } from "@/components/lab/chunk-explorer"
import { pipelineDeepDive, answerResponse, knowledgeBases } from "@/lib/data"
import * as Lucide from "lucide-react"

const {
  Upload,
  FileText,
  Split,
  Brain,
  Database,
  CheckCircle,
  Play,
  RotateCcw,
  Layers,
  Search,
  GitBranch,
  MessageSquare,
  Info,
  Table2,
  Image,
  FileSearch,
  Globe,
  BarChart3,
  Zap,
  Activity,
  Code,
  Clock,
  Gauge,
} = Lucide

const steps = [
  {
    id: "upload",
    title: "Upload",
    description: "Document Ingestion",
    icon: Upload,
    details: pipelineDeepDive.upload,
  },
  {
    id: "parse",
    title: "Parse",
    description: "Text Extraction",
    icon: FileText,
    details: pipelineDeepDive.parse,
  },
  {
    id: "chunk",
    title: "Chunk",
    description: "Document Splitting",
    icon: Split,
    details: pipelineDeepDive.chunk,
  },
  {
    id: "embed",
    title: "Embed",
    description: "Vector Generation",
    icon: Brain,
    details: pipelineDeepDive.embed,
  },
  {
    id: "index",
    title: "Index",
    description: "Vector Storage",
    icon: Database,
    details: pipelineDeepDive.index,
  },
  {
    id: "ready",
    title: "Ready",
    description: "Knowledge Available",
    icon: CheckCircle,
    details: { readinessScore: 94 },
  },
]

const fieldLabels: Record<string, string> = {
  fileName: "File Name",
  documentType: "Document Type",
  pageCount: "Page Count",
  fileSize: "File Size",
  uploadTime: "Upload Time",
  processingTime: "Processing Time",
  textExtracted: "Text Extracted",
  tablesDetected: "Tables Detected",
  imagesDetected: "Images Detected",
  metadataFieldsFound: "Metadata Fields",
  languageDetected: "Language",
  chunkCount: "Chunk Count",
  avgChunkSize: "Avg Chunk Size",
  chunkingStrategy: "Strategy",
  chunkOverlap: "Chunk Overlap",
  embeddingModel: "Model",
  embeddingCount: "Vector Count",
  vectorDimensions: "Dimensions",
  embeddingQualityScore: "Quality Score",
  indexedRecords: "Indexed Records",
  indexHealth: "Index Health",
  searchReadiness: "Search Readiness",
  vectorStoreStatus: "Store Status",
  readinessScore: "Readiness Score",
}

const fieldIcons: Record<string, typeof Info> = {
  fileName: FileText,
  documentType: Info,
  pageCount: Layers,
  fileSize: Database,
  uploadTime: Clock,
  processingTime: Zap,
  textExtracted: FileSearch,
  tablesDetected: Table2,
  imagesDetected: Image,
  metadataFieldsFound: Info,
  languageDetected: Globe,
  chunkCount: Layers,
  avgChunkSize: BarChart3,
  chunkingStrategy: GitBranch,
  chunkOverlap: GitBranch,
  embeddingModel: Brain,
  embeddingCount: Database,
  vectorDimensions: BarChart3,
  embeddingQualityScore: Activity,
  indexedRecords: Database,
  indexHealth: CheckCircle,
  searchReadiness: CheckCircle,
  vectorStoreStatus: Activity,
  readinessScore: Gauge,
}

interface JourneyStepData {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  detail?: string
}

function JourneyStep({ step, isLast }: { step: JourneyStepData; isLast: boolean }) {
  const [showDetail, setShowDetail] = useState(false)
  return (
    <div className="flex items-start gap-4 pb-4 relative group">
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${!isLast ? "bg-gray-100" : "bg-accent/10"}`}>
          <step.icon className={`w-4 h-4 ${!isLast ? "text-muted" : "text-accent"}`} />
        </div>
        {!isLast && <div className="w-px h-full bg-border mt-1" />}
      </div>
      <div className="pt-1.5 flex-1 min-w-0">
        <p className="text-sm font-medium">{step.label}</p>
        <p className="text-xs text-muted mt-0.5">{step.value}</p>
        {step.detail && (
          <>
            <button onClick={() => setShowDetail(!showDetail)} className="text-[10px] text-primary hover:underline mt-1">
              {showDetail ? "Hide details" : "View details"}
            </button>
            <AnimatePresence>
              {showDetail && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="mt-2 p-2 rounded-lg bg-gray-50 border border-border">
                    <pre className="text-[10px] text-muted whitespace-pre-wrap break-all font-mono">{step.detail}</pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  )
}

export default function PipelinePage() {
  const [activeStep, setActiveStep] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const isRunning = isAutoPlaying && activeStep < steps.length

  useEffect(() => {
    if (!isRunning) return
    const timer = setTimeout(() => setActiveStep((p) => p + 1), 1200)
    return () => clearTimeout(timer)
  }, [isRunning, activeStep])

  const handleRun = () => {
    setActiveStep(0)
    setIsAutoPlaying(true)
  }

  const handleReset = () => {
    setIsAutoPlaying(false)
    setActiveStep(0)
  }

  const renderDetails = (stepIndex: number) => {
    const s = steps[stepIndex]
    if (stepIndex === 2) {
      const data = s.details as typeof pipelineDeepDive.chunk
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["chunkCount", "avgChunkSize", "chunkingStrategy", "chunkOverlap"].map((key) => {
              const Icon = fieldIcons[key] || Info
              return (
                <div key={key} className="p-3 rounded-lg border border-border">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon className="w-3.5 h-3.5 text-muted" />
                    <p className="text-[10px] text-muted">{fieldLabels[key]}</p>
                  </div>
                  <p className="text-sm font-medium">{String((data as Record<string, unknown>)[key])}</p>
                </div>
              )
            })}
          </div>
          <ChunkExplorer className="mt-4" />
        </div>
      )
    }

    if (stepIndex === 5) {
      return (
        <div className="text-center py-8">
          <div className="w-24 h-24 mx-auto mb-4 relative">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e2e8f0" strokeWidth="3" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#14b8a6" strokeWidth="3" strokeDasharray="94, 100" />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-accent">94%</span>
          </div>
          <h3 className="text-lg font-semibold mb-1">Knowledge Readiness Score</h3>
          <p className="text-sm text-muted">Document processed and ready for retrieval</p>
        </div>
      )
    }

    const data = s.details as Record<string, string | number>
    const keys = Object.keys(data)
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {keys.map((key) => {
          const Icon = fieldIcons[key] || Info
          return (
            <div key={key} className="p-3 rounded-lg border border-border">
              <div className="flex items-center gap-1.5 mb-1">
                <Icon className="w-3.5 h-3.5 text-muted" />
                <p className="text-[10px] text-muted">{fieldLabels[key] || key.replace(/([A-Z])/g, " $1").trim()}</p>
              </div>
              <p className="text-sm font-medium">{data[key]}</p>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="container-page py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Knowledge Processing Pipeline</h1>
            <p className="text-sm text-muted mt-1">Deep inspection of how documents become searchable knowledge</p>
          </div>
          <div className="flex items-center gap-2">
            {!isRunning ? (
              <Button onClick={handleRun} disabled={activeStep > 0}>
                <Play className="w-4 h-4" />
                {activeStep > 0 ? "Resume" : "Run Pipeline"}
              </Button>
            ) : null}
            {activeStep > 0 && !isRunning && (
              <Button variant="outline" onClick={handleReset}>
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
            )}
          </div>
        </div>

        {/* Pipeline Flow */}
        <div className="flex items-center gap-1 mb-8 mt-6 overflow-x-auto pb-2">
          {steps.map((step, i) => (
            <div key={step.id} className="flex-1 min-w-[80px]">
              <div className="flex items-center">
                <div className={`flex flex-col items-center gap-1.5 flex-1 ${i <= activeStep ? "opacity-100" : "opacity-30"}`}>
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                      i < activeStep
                        ? "bg-accent text-white shadow-lg shadow-accent/20"
                        : i === activeStep
                          ? "bg-primary text-white shadow-lg shadow-primary/20 scale-110"
                          : "bg-gray-100 text-muted"
                    }`}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-medium ${i === activeStep ? "text-primary" : i < activeStep ? "text-accent" : "text-muted"}`}>
                    {step.title}
                  </span>
                  <span className="text-[10px] text-muted">{step.description}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 mx-2 mt-[-24px] transition-colors duration-500 ${i < activeStep ? "bg-accent" : "bg-border"}`} />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Active Step Details */}
        <AnimatePresence mode="wait">
          {activeStep > 0 && (
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {(() => {
                        const Icon = steps[activeStep - 1]?.icon || CheckCircle
                        return <Icon className="w-5 h-5 text-primary" />
                      })()}
                      <CardTitle>{steps[activeStep - 1]?.title} Deep Dive</CardTitle>
                    </div>
                    <Badge variant={activeStep === steps.length ? "success" : "default"}>
                      {activeStep === steps.length ? "Complete" : "Processing"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {renderDetails(activeStep - 1)}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Knowledge Health */}
        <div className="mt-8">
          <KnowledgeHealthCard data={knowledgeBases["customer-support"].health} />
        </div>

        {/* Answer Replay System - Enhanced */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-1">Answer Replay System</h2>
          <p className="text-sm text-muted mb-4">Full replay of how an answer was generated, stage by stage</p>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-0">
                {[
                  { icon: MessageSquare, label: "Question Received", value: answerResponse.answerJourney.question, detail: "Raw user query captured" },
                  { icon: Brain, label: "Embedding Created", value: `BGE Large | 1024 dimensions`, detail: `Query vector: ${answerResponse.answerJourney.embedding.queryVector}` },
                  { icon: Search, label: "Vector Search Executed", value: "Cosine similarity across 124 vectors", detail: `Top-K: 5, Threshold: 0.75, Results: 3` },
                  { icon: FileText, label: "Documents Retrieved", value: "3 documents matched", detail: answerResponse.answerJourney.vectorSearch.retrievedDocuments.map(d => `${d.name} (${d.score})`).join(", ") },
                  { icon: Layers, label: "Chunks Retrieved", value: `Chunks: 12, 17, 24`, detail: `Scores: 0.98, 0.87, 0.72` },
                  { icon: GitBranch, label: "Context Constructed", value: `1,248 tokens combined`, detail: `3 chunks → context window` },
                  { icon: Code, label: "Prompt Built", value: "System + Context + Question assembled", detail: answerResponse.answerJourney.contextAssembly.promptPreview },
                  { icon: Brain, label: "LLM Invoked", value: `DeepSeek v3 (temp: 0.1)`, detail: `256 tokens generated in 1,240ms` },
                  { icon: CheckCircle, label: "Answer Generated", value: "Final response delivered", detail: `97% confidence | 3 sources cited` },
                ].map((step, i) => (
                    <JourneyStep key={i} step={step} isLast={i === 8} />
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
