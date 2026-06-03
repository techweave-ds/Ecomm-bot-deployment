"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/input"
import { KnowledgeHealthCard } from "@/components/lab/knowledge-health"
import { knowledgeBases, recentQuestions, answerResponse } from "@/lib/data"
import {
  Search,
  MessageSquare,
  ChevronRight,
  ChevronDown,
  FileText,
  Bookmark,
  History,
  FolderOpen,
  Star,
  CheckCircle2,
  BarChart3,
  Layers,
  Brain,
  GitBranch,
  Shield,
  Lightbulb,
  Network,
  Hash,
  Clock,
  Zap,
  Activity,
} from "lucide-react"

type ViewState = "empty" | "answering" | "answered"

function ConfidenceBreakdown({ data }: { data: typeof answerResponse.confidenceBreakdown }) {
  const items = [
    { label: "Source Match", value: data.sourceMatch, color: "bg-accent" },
    { label: "Semantic Match", value: data.semanticMatch, color: "bg-primary" },
    { label: "Retrieval Confidence", value: data.retrievalConfidence, color: "bg-blue-500" },
    { label: "Generation Confidence", value: data.generationConfidence, color: "bg-purple-500" },
  ]
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2 text-sm">
          <span className="w-28 text-muted text-xs">{item.label}</span>
          <div className="flex-1 h-2 rounded-full bg-gray-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${item.value}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`h-full rounded-full ${item.color}`}
            />
          </div>
          <span className="w-8 text-right text-xs font-medium">{item.value}%</span>
        </div>
      ))}
    </div>
  )
}

function AnswerExplanation({ data }: { data: typeof answerResponse.answerExplanation }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted">{data.summary}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {data.documentsUsed.map((doc) => (
          <div key={doc.name} className="p-3 rounded-xl border border-border">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">{doc.name}</span>
              <Badge variant={doc.relevance === "Primary source" ? "success" : "outline"} className="text-[10px]">{doc.relevance}</Badge>
            </div>
            <p className="text-xs text-muted">{doc.reason}</p>
          </div>
        ))}
      </div>
      <div>
        <h5 className="text-xs font-semibold text-muted uppercase mb-2">Confidence Factors</h5>
        <ul className="space-y-1">
          {data.confidenceFactors.map((f, i) => (
            <li key={i} className="flex items-start gap-1.5 text-xs text-muted">
              <CheckCircle2 className="w-3 h-3 text-accent mt-0.5 shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function AnimatedJourney({ data }: { data: typeof answerResponse.answerJourney }) {
  const [activeStep, setActiveStep] = useState(0)
  const steps = [
    { icon: MessageSquare, label: "Question Received", value: data.question, detail: `Query: "${data.question}"` },
    { icon: Brain, label: "Embedding Created", value: `${data.embedding.model} (${data.embedding.dimensions}d)`, detail: `Vector: ${data.embedding.queryVector}` },
    { icon: Search, label: "Vector Search Executed", value: `${data.vectorSearch.strategy} | Top-K: ${data.vectorSearch.topK}`, detail: `Threshold: ${data.vectorSearch.threshold}, Results: ${data.vectorSearch.results}` },
    { icon: FileText, label: "Documents Retrieved", value: data.vectorSearch.retrievedDocuments.map(d => d.name).join(", "), detail: data.vectorSearch.retrievedDocuments.map(d => `${d.name}: ${d.score}`).join("\n") },
    { icon: Layers, label: "Chunks Retrieved", value: data.contextAssembly.combinedChunks.join(", "), detail: data.retrievedChunks.map(c => `${c.id} (${c.score}) - ${c.document}`).join("\n") },
    { icon: GitBranch, label: "Context Constructed", value: `${data.contextAssembly.tokensUsed} tokens`, detail: `Strategy: ${data.contextAssembly.strategy}` },
    { icon: Activity, label: "Prompt Built", value: "System + Context + Question assembled", detail: data.contextAssembly.promptPreview },
    { icon: Brain, label: "LLM Invoked", value: `${data.llmGeneration.model} (temp: ${data.llmGeneration.temperature})`, detail: `${data.llmGeneration.tokensGenerated} tokens in ${data.llmGeneration.latencyMs}ms` },
    { icon: CheckCircle2, label: "Answer Generated", value: "Final response", detail: "97% confidence, 3 sources cited" },
  ]

  useEffect(() => {
    if (activeStep >= steps.length) return
    const t = setTimeout(() => setActiveStep(p => p + 1), 400)
    return () => clearTimeout(t)
  }, [activeStep, steps.length])

  return (
    <div className="space-y-0">
      {steps.slice(0, activeStep).map((step, i) => {
        const isLast = i === steps.length - 1
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-start gap-3 pb-3 relative group"
          >
            <div className="flex flex-col items-center">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${isLast ? "bg-accent/10" : "bg-primary-light"}`}>
                <step.icon className={`w-3.5 h-3.5 ${isLast ? "text-accent" : "text-primary"}`} />
              </div>
              {!isLast && <div className="w-px h-full bg-primary/20 mt-1" />}
            </div>
            <div className="pt-0.5 flex-1 min-w-0">
              <p className="text-xs font-medium text-muted">{step.label}</p>
              <p className="text-sm">{step.value}</p>
              {step.detail && (
                <details className="mt-0.5">
                  <summary className="text-[10px] text-primary cursor-pointer hover:underline">Details</summary>
                  <pre className="mt-1 p-2 rounded bg-gray-50 border text-[10px] font-mono text-muted whitespace-pre-wrap">{step.detail}</pre>
                </details>
              )}
            </div>
          </motion.div>
        )
      })}
      {activeStep < steps.length && (
        <div className="flex items-center gap-2 pl-10 py-2">
          <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-muted">Processing...</span>
        </div>
      )}
    </div>
  )
}

export default function WorkspacePage() {
  const [viewState, setViewState] = useState<ViewState>("empty")
  const [query, setQuery] = useState("")
  const [showJourney, setShowJourney] = useState(false)
  const [activeKb, setActiveKb] = useState("customer-support")

  const kb = knowledgeBases[activeKb as keyof typeof knowledgeBases]

  const handleSubmit = useCallback(() => {
    if (!query.trim()) return
    setViewState("answering")
    setTimeout(() => setViewState("answered"), 1500)
  }, [query])

  const handleSuggested = useCallback((q: string) => {
    setQuery(q)
    setViewState("answering")
    setTimeout(() => setViewState("answered"), 1500)
  }, [])

  return (
    <div className="flex h-[calc(100vh-3.5rem-2.5rem)]">
      {/* Left Sidebar - Knowledge Engineering Panel */}
      <aside className="w-[280px] shrink-0 border-r border-border bg-card overflow-y-auto hidden lg:block">
        <div className="p-4 space-y-6">
          {/* Environment Selector */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FolderOpen className="w-4 h-4 text-muted" />
              <span className="text-xs font-semibold text-muted uppercase tracking-wider">Knowledge Environment</span>
            </div>
            <div className="space-y-0.5">
              {Object.entries(knowledgeBases).map(([key, k]) => {
                const accentColors: Record<string, string> = {
                  "customer-support": "bg-blue-500",
                  hr: "bg-purple-500",
                  "it-support": "bg-amber-500",
                  compliance: "bg-red-500",
                }
                return (
                  <button
                    key={key}
                    onClick={() => { setActiveKb(key); setViewState("empty") }}
                    className={`w-full flex items-center gap-2 px-2.5 py-2 text-sm rounded-lg text-left transition-colors ${activeKb === key ? "bg-primary-light text-primary" : "hover:bg-gray-50"}`}
                  >
                    <div className={`w-2 h-2 rounded-full shrink-0 ${accentColors[key] || "bg-primary"}`} />
                    <span className="truncate">{k.name}</span>
                    <Badge variant="outline" className="text-[9px] ml-auto">{k.documents.length} docs</Badge>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Knowledge Sources */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Bookmark className="w-4 h-4 text-muted" />
              <span className="text-xs font-semibold text-muted uppercase tracking-wider">Knowledge Sources</span>
            </div>
            <div className="space-y-0.5">
              {kb.documents.map((doc) => (
                <button key={doc.name} className="w-full flex items-center gap-2 px-2.5 py-2 text-sm rounded-lg hover:bg-gray-50 text-left transition-colors">
                  <FileText className="w-3.5 h-3.5 text-muted shrink-0" />
                  <span className="truncate text-muted">{doc.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Questions */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <History className="w-4 h-4 text-muted" />
              <span className="text-xs font-semibold text-muted uppercase tracking-wider">Queries</span>
            </div>
            <div className="space-y-0.5">
              {(recentQuestions[activeKb as keyof typeof recentQuestions] || recentQuestions["customer-support"]).slice(0, 4).map((q, i) => (
                <button key={i} onClick={() => handleSuggested(q)} className="w-full flex items-start gap-2 px-2.5 py-2 text-sm rounded-lg hover:bg-gray-50 text-left transition-colors">
                  <Search className="w-3.5 h-3.5 text-muted mt-0.5 shrink-0" />
                  <span className="text-muted line-clamp-2">{q}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Environment Health */}
          <KnowledgeHealthCard data={kb.health} compact />
        </div>
      </aside>

      {/* Center - Knowledge Engineering Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Environment Header */}
        <div className="border-b border-border px-6 py-3 bg-card/50">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold">{kb.name}</span>
            <span className="text-muted">&middot;</span>
            <span className="text-muted">{kb.documents.length} documents</span>
            <span className="text-muted">&middot;</span>
            <span className="text-muted">{kb.description}</span>
          </div>
        </div>

        {viewState === "empty" && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl w-full text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-6">
                <Activity className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Knowledge Engineering Workspace</h2>
              <p className="text-muted text-sm mb-1">Query across <strong>{kb.name}</strong> to test retrieval, inspect chunks, and validate responses.</p>
              <p className="text-xs text-muted mb-8">{kb.description}</p>

              <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
                {(recentQuestions[activeKb as keyof typeof recentQuestions] || recentQuestions["customer-support"]).slice(0, 6).map((q, i) => (
                  <button key={i} onClick={() => handleSuggested(q)}
                    className="text-left p-3 rounded-xl border border-border hover:border-primary hover:bg-primary-light/30 transition-all text-sm"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {viewState === "answering" && (
          <div className="flex-1 flex items-center justify-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-muted">Running retrieval pipeline...</p>
            </motion.div>
          </div>
        )}

        {viewState === "answered" && (
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto p-6 space-y-6">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-start gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center shrink-0">
                    <Search className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted mb-0.5">Knowledge Query</p>
                    <p className="text-base font-medium">{query}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Generated Response</CardTitle>
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-accent" />
                        <span className="text-lg font-bold text-accent">{answerResponse.confidence}%</span>
                        <span className="text-xs text-muted">confidence</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-base leading-relaxed">{answerResponse.answer}</p>

                    {/* Key Findings */}
                    <div>
                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-accent" />
                        Key Findings
                      </h4>
                      <ul className="space-y-1.5">
                        {answerResponse.keyFindings.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Why This Answer Was Generated - PROMINENT */}
                    <div className="rounded-xl border border-accent/30 bg-accent/5 p-4">
                      <h4 className="text-sm font-semibold mb-3 flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4 text-accent" />
                        Why This Answer Was Generated
                      </h4>
                      <AnswerExplanation data={answerResponse.answerExplanation} />
                    </div>

                    {/* Sources & Chunks */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Sources Used</h4>
                        <div className="space-y-2">
                          {answerResponse.sourcesUsed.map((s) => (
                            <Badge key={s} variant="outline" className="flex items-center gap-1 py-1.5 w-full justify-start">
                              <FileText className="w-3 h-3" />
                              {s}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-2">
                          <Hash className="w-3.5 h-3.5 inline mr-1 text-primary" />
                          Retrieved Chunks
                        </h4>
                        <div className="space-y-1.5">
                          {answerResponse.retrievedChunks.map((chunk, i) => (
                            <div key={i} className="flex items-center justify-between p-2 rounded-lg border border-border text-xs">
                              <span className="font-medium">{chunk.id}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-muted">{chunk.source}</span>
                                <Badge variant={chunk.similarity > 90 ? "success" : "default"} className="text-[10px]">{chunk.similarity}%</Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Confidence Breakdown */}
                    <div>
                      <h4 className="text-sm font-semibold mb-3 flex items-center gap-1.5">
                        <Shield className="w-4 h-4 text-primary" />
                        Confidence Breakdown
                      </h4>
                      <ConfidenceBreakdown data={answerResponse.confidenceBreakdown} />
                    </div>

                    {/* Answer Journey - Animated */}
                    <div>
                      <button
                        onClick={() => setShowJourney(!showJourney)}
                        className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                      >
                        {showJourney ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        <Zap className="w-4 h-4" />
                        Answer Journey Replay
                      </button>
                      <AnimatePresence>
                        {showJourney && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden mt-3"
                          >
                            <div className="p-4 rounded-xl border border-border bg-gray-50/50">
                              <AnimatedJourney data={answerResponse.answerJourney} />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Follow-Up */}
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Suggested Follow-Up Queries</h4>
                      <div className="flex flex-wrap gap-2">
                        {answerResponse.followUpQuestions.map((q, i) => (
                          <button key={i} onClick={() => handleSuggested(q)}
                            className="text-sm px-3 py-1.5 rounded-lg border border-border hover:border-primary hover:bg-primary-light/30 transition-all"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        )}

        {/* Query Input */}
        <div className="border-t border-border p-4 bg-card">
          <div className="max-w-3xl mx-auto flex gap-3">
            <Textarea
              placeholder={`Query ${kb.name}...`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit() } }}
              autoExpand
              className="flex-1"
            />
            <Button onClick={handleSubmit} disabled={!query.trim() || viewState === "answering"} className="shrink-0 self-end">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Evidence Explorer */}
      {viewState === "answered" && (
        <aside className="w-[320px] shrink-0 border-l border-border bg-card overflow-y-auto hidden xl:block">
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold">Evidence Explorer</span>
            </div>

            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-xs font-semibold text-muted uppercase">Overall Confidence</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#14b8a6" strokeWidth="3" strokeDasharray="97, 100" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-accent">{answerResponse.confidence}%</span>
                  </div>
                  <div className="text-xs text-muted">
                    <p>High confidence</p>
                    <p>3 sources cited</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-xs font-semibold text-muted uppercase">Confidence Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <ConfidenceBreakdown data={answerResponse.confidenceBreakdown} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-xs font-semibold text-muted uppercase">Retrieved Chunks</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-2 space-y-2">
                {answerResponse.retrievedChunks.map((chunk, i) => (
                  <div key={i} className="p-2.5 rounded-lg border border-border text-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-xs">{chunk.id}</span>
                      <Badge variant={chunk.similarity > 90 ? "success" : "default"} className="text-[10px] px-1.5 py-0">{chunk.similarity}%</Badge>
                    </div>
                    <p className="text-xs text-muted line-clamp-1">{chunk.text}</p>
                    <div className="flex items-center gap-2 text-[10px] text-muted mt-1">
                      <FileText className="w-3 h-3" />
                      {chunk.source}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <KnowledgeHealthCard compact />
          </div>
        </aside>
      )}
    </div>
  )
}
