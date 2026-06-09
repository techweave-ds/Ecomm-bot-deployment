"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/input"
import { DeveloperMode } from "@/components/lab/developer-mode"
import { AnswerQualityBadge } from "@/components/lab/answer-quality-badge"
import { RetrievalInspector } from "@/components/lab/retrieval-inspector"
import { SourceTrace } from "@/components/lab/source-trace"
import { QueryAnalyticsCard } from "@/components/lab/query-analytics"
import { CitationViewer } from "@/components/lab/citation-viewer"
import { ChunkViewer } from "@/components/lab/chunk-viewer"
import { KnowledgeSourcePanel } from "@/components/lab/knowledge-source-panel"
import { QueryHistoryPanel } from "@/components/lab/query-history-panel"
import { SessionExport } from "@/components/lab/session-export"
import { knowledgeBases, recentQuestions, sampleQueryTrace, enrichedRetrievedChunks, sampleAnalytics, sampleCitations, sampleAnswerQuality, sampleGrounding, sampleKnowledgeSources, sampleQueryHistory, sampleChunkDetails } from "@/lib/data"
import type { ChunkDetail } from "@/lib/types"
import {
  Search,
  MessageSquare,
  ChevronRight,
  ChevronDown,
  FileText,
  Bookmark,
  FolderOpen,
  CheckCircle2,
  BarChart3,
  Layers,
  Brain,
  GitBranch,
  Shield,
  Lightbulb,
  Hash,
  Zap,
  Activity,
  Bug,
} from "lucide-react"

type ViewState = "empty" | "answering" | "answered"

// ─── Groq helpers ─────────────────────────────────────────
const STOPWORDS_WS = new Set(["the","a","an","is","are","was","were","be","been","have","has","had","do","does","did","to","of","in","on","at","by","for","with","and","or","but","it","its","this","that","i","you","he","she","we","they","my","your","our"])

function tokenizeWS(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g,"").split(/\s+/).filter(w => w.length > 2 && !STOPWORDS_WS.has(w))
}

function buildContext(query: string, kb: { documents: Array<{ name: string; content: string }> }): string {
  const qw = tokenizeWS(query)
  const scored = kb.documents.map(doc => {
    const dw = tokenizeWS(doc.content)
    let score = 0
    for (const w of qw) {
      const tf = dw.filter((x: string) => x === w).length / (dw.length || 1)
      const df = kb.documents.filter(d => tokenizeWS(d.content).includes(w)).length
      score += tf * (df > 0 ? Math.log(kb.documents.length / df) : 0)
    }
    return { ...doc, score }
  })
  return scored.sort((a,b) => b.score - a.score).slice(0,3)
    .filter(d => d.score > 0)
    .map(d => `[${d.name}]\n${d.content}`).join("\n\n---\n\n")
}


function AnimatedJourney({ data }: { data: typeof sampleQueryTrace }) {
  const [activeStep, setActiveStep] = useState(0)
  const steps = [
    { icon: MessageSquare, label: "Question Received", value: data.question, detail: `Query: "${data.question}"` },
    { icon: Brain, label: "Embedding Created", value: `${data.llmGeneration.model}`, detail: `Query expansion: ${data.queryExpansion.expanded.join(", ")}` },
    { icon: Search, label: "Vector Search Executed", value: `${data.vectorSearch.strategy} | Top-K: ${data.vectorSearch.topK}`, detail: `Threshold: ${data.vectorSearch.threshold}, Results: ${data.vectorSearch.results}` },
    { icon: FileText, label: "Documents Retrieved", value: data.retrievedChunks.map(c => c.source).filter((v, i, a) => a.indexOf(v) === i).join(", "), detail: data.retrievedChunks.map(c => `${c.id} (${c.score}) - ${c.source}`).join("\n") },
    { icon: Layers, label: "Chunks Retrieved", value: data.retrievedChunks.map(c => c.id).join(", "), detail: data.retrievedChunks.map(c => `${c.id} (${(c.score * 100).toFixed(0)}%) - ${c.source}`).join("\n") },
    { icon: GitBranch, label: "Context Constructed", value: `${data.analytics.totalTokens} tokens`, detail: `Strategy: ${data.reranking.strategy}` },
    { icon: Activity, label: "Prompt Built", value: "System + Context + Question assembled", detail: data.promptAssembly.finalPrompt },
    { icon: Brain, label: "LLM Invoked", value: `${data.llmGeneration.model} (temp: ${data.llmGeneration.temperature})`, detail: `${data.llmGeneration.tokensGenerated} tokens in ${data.llmGeneration.latencyMs}ms` },
    { icon: CheckCircle2, label: "Answer Generated", value: "Final response", detail: `${data.quality.label}, ${data.analytics.confidenceScore}% confidence, ${data.citations.length} sources cited` },
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
                  <pre className="mt-1 p-2 rounded bg-surface-1 border text-[10px] font-mono text-muted whitespace-pre-wrap">{step.detail}</pre>
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

function AnswerText({ text, citations, onCitationClick }: { text: string; citations: typeof sampleCitations; onCitationClick: () => void }) {
  const parts = text.split(/(\[\d+\])/g)
  return (
    <p className="text-base leading-relaxed">
      {parts.map((part, i) => {
        const match = part.match(/\[(\d+)\]/)
        if (match) {
          const num = parseInt(match[1])
          const citation = citations[num - 1]
          return (
            <button
              key={i}
              onClick={() => onCitationClick()}
              className="inline-flex items-center px-1.5 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors cursor-pointer mx-0.5"
              title={citation ? `View citation: ${citation.documentName}` : "View citation"}
            >
              [{num}]
            </button>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </p>
  )
}

export default function WorkspacePage() {
  const [viewState, setViewState] = useState<ViewState>("empty")
  const [query, setQuery] = useState("")
  const [showJourney, setShowJourney] = useState(false)
  const [activeKb, setActiveKb] = useState("customer-support")
  const [devMode, setDevMode] = useState(false)
  const [citationOpen, setCitationOpen] = useState(false)
  const [chunkViewerOpen, setChunkViewerOpen] = useState(false)
  const [selectedChunk, setSelectedChunk] = useState<ChunkDetail | null>(null)
  const [showAnalytics, setShowAnalytics] = useState(false)
  // Real AI state
  const [aiAnswer, setAiAnswer] = useState("")
  const [activeQuery, setActiveQuery] = useState("")
  const [apiError, setApiError] = useState("")
  const [sessionHistory, setSessionHistory] = useState<Array<{q: string; a: string; ts: Date}>>([])

  const kb = knowledgeBases[activeKb as keyof typeof knowledgeBases]

  const runQuery = useCallback(async (q: string) => {
    if (!q.trim()) return
    setActiveQuery(q)
    setViewState("answering")
    setApiError("")
    setAiAnswer("")

    const savedKey = localStorage.getItem("builder_groq_key") || ""
    const context = buildContext(q, kb as { documents: Array<{ name: string; content: string }> })

    const systemPrompt = `You are an enterprise knowledge assistant for ${kb.name}. ${context ? "Answer ONLY from the provided context. If not found, say so clearly." : "Answer helpfully."} Be concise and professional.`
    const userPrompt = context ? `Context:

${context}

Question: ${q}` : q

    if (!savedKey) {
      // Fallback: use sample data when no key
      setTimeout(() => {
        setAiAnswer(sampleQueryTrace.answer)
        setViewState("answered")
        setSessionHistory(prev => [{q, a: sampleQueryTrace.answer, ts: new Date()}, ...prev].slice(0, 20))
      }, 1200)
      return
    }

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${savedKey}` },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          max_tokens: 1000,
          messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }],
        }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error.message)
      const answer = data.choices[0].message.content
      setAiAnswer(answer)
      setViewState("answered")
      setSessionHistory(prev => [{q, a: answer, ts: new Date()}, ...prev].slice(0, 20))
    } catch (e) {
      setApiError((e as Error).message)
      setAiAnswer(sampleQueryTrace.answer)
      setViewState("answered")
    }
  }, [kb])

  const handleSubmit = useCallback(() => { runQuery(query) }, [query, runQuery])
  const handleSuggested = useCallback((q: string) => { setQuery(q); runQuery(q) }, [runQuery])
  const handleReRun = useCallback((q: string) => { setQuery(q); runQuery(q) }, [runQuery])

  const handleExportSession = useCallback(() => {
    if (!sessionHistory.length) return
    const csv = ["Timestamp,Query,Answer", ...sessionHistory.map(h =>
      `"${h.ts.toISOString()}","${h.q.replace(/"/g,'""')}","${h.a.replace(/"/g,'""')}"`
    )].join("\n")
    const a = document.createElement("a")
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }))
    a.download = `workspace-session-${Date.now()}.csv`
    a.click()
  }, [sessionHistory])

  const handleCitationClick = useCallback(() => {
    setCitationOpen(true)
  }, [])

  const handleViewFullChunk = useCallback((chunk: ChunkDetail) => {
    setSelectedChunk(chunk)
    setChunkViewerOpen(true)
  }, [])

  // Use real answer when available, fallback to sample for UI components
  const displayAnswer = aiAnswer || sampleQueryTrace.answer
  const trace = { ...sampleQueryTrace, answer: displayAnswer, question: activeQuery || sampleQueryTrace.question }
  const chunks = enrichedRetrievedChunks
  const analytics = sampleAnalytics
  const citations = sampleCitations
  const quality = sampleAnswerQuality
  const grounding = sampleGrounding
  const knowledgeSources = sampleKnowledgeSources
  const queryHistory = sessionHistory.length
    ? sessionHistory.map((h, i) => ({ ...sampleQueryHistory[0], id: String(i), question: h.q, answer: h.a, timestamp: h.ts.toISOString() }))
    : sampleQueryHistory
  const chunkDetails = sampleChunkDetails

  return (
    <div className="flex h-[calc(100vh-3.5rem-2.5rem)]">
      <DeveloperMode
        enabled={devMode}
        onToggle={() => setDevMode(!devMode)}
        trace={trace}
        chunks={enrichedRetrievedChunks}
        analytics={{
          tokens: { input: analytics.inputTokens, output: analytics.outputTokens, cost: analytics.estimatedCost },
          latency: { total: analytics.totalTimeMs, embeddingSearch: analytics.embeddingSearchTimeMs, rerank: analytics.rerankTimeMs, generation: analytics.generationTimeMs },
          retrieval: chunks.map(c => ({ id: c.id, score: c.score, source: c.source })),
          prompt: { system: trace.promptAssembly.systemPrompt, context: trace.promptAssembly.retrievedContext, question: trace.promptAssembly.userQuestion, final: trace.promptAssembly.finalPrompt },
          grounding: { score: grounding.percentage, supported: grounding.supportedSegments, unsupported: grounding.unsupportedSegments.length },
        }}
      />

      <aside className="w-[280px] shrink-0 border-r border-border bg-card overflow-y-auto hidden lg:block">
        <div className="p-4 space-y-6">
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
                    className={`w-full flex items-center gap-2 px-2.5 py-2 text-sm rounded-lg text-left transition-colors ${activeKb === key ? "bg-primary-light text-primary" : "hover:bg-secondary"}`}
                  >
                    <div className={`w-2 h-2 rounded-full shrink-0 ${accentColors[key] || "bg-primary"}`} />
                    <span className="truncate">{k.name}</span>
                    <Badge variant="outline" className="text-[9px] ml-auto">{k.documents.length} docs</Badge>
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Bookmark className="w-4 h-4 text-muted" />
              <span className="text-xs font-semibold text-muted uppercase tracking-wider">Knowledge Sources</span>
            </div>
            <KnowledgeSourcePanel sources={knowledgeSources} />
          </div>

          <div>
            <QueryHistoryPanel
              queries={queryHistory}
              onReRun={handleReRun}
              onExport={handleExportSession}
            />
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
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
              {apiError && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-700">
                  <span>⚠ API error — showing demo response. Add your Groq key in</span>
                  <a href="/lab/builder" className="underline font-medium">Builder →</a>
                </div>
              )}
              <div className="flex items-center justify-between">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center shrink-0">
                    <Search className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted mb-0.5">Knowledge Query</p>
                    <p className="text-base font-medium">{query}</p>
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDevMode(!devMode)}
                    className="flex items-center gap-1.5 text-xs"
                  >
                    <Bug className="w-3.5 h-3.5" />
                    Developer Mode
                  </Button>
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Generated Response</CardTitle>
                      <div className="flex items-center gap-3">
                        <AnswerQualityBadge quality={quality} />
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-accent" />
                          <span className="text-lg font-bold text-accent">{analytics.confidenceScore}%</span>
                          <span className="text-xs text-muted">confidence</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <AnswerText text={trace.answer} citations={citations} onCitationClick={handleCitationClick} />

                    <div>
                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-accent" />
                        Key Findings
                      </h4>
                      <ul className="space-y-1.5">
                        {trace.analytics && (
                          <>
                            <li className="flex items-start gap-2 text-sm text-muted">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                              {quality.label} - {quality.explanation}
                            </li>
                            <li className="flex items-start gap-2 text-sm text-muted">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                              Grounding score: {grounding.percentage}% ({grounding.supportedSegments}/{grounding.totalSegments} segments supported)
                            </li>
                          </>
                        )}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-accent/30 bg-accent/5 p-4">
                      <h4 className="text-sm font-semibold mb-3 flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4 text-accent" />
                        Why This Answer Was Generated
                      </h4>
                      <div className="space-y-4">
                        <p className="text-sm text-muted">{quality.explanation}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {citations.slice(0, 2).map((cit) => (
                            <div key={cit.id} className="p-3 rounded-xl border border-border">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium">{cit.documentName}</span>
                                <Badge variant={cit.confidenceScore >= 90 ? "success" : "outline"} className="text-[10px]">Source</Badge>
                              </div>
                              <p className="text-xs text-muted">{cit.paragraph.slice(0, 80)}...</p>
                            </div>
                          ))}
                        </div>
                        <div>
                          <h5 className="text-xs font-semibold text-muted uppercase mb-2">Confidence Factors</h5>
                          <ul className="space-y-1">
                            <li className="flex items-start gap-1.5 text-xs text-muted">
                              <CheckCircle2 className="w-3 h-3 text-accent mt-0.5 shrink-0" />
                              High semantic similarity between query and source documents
                            </li>
                            <li className="flex items-start gap-1.5 text-xs text-muted">
                              <CheckCircle2 className="w-3 h-3 text-accent mt-0.5 shrink-0" />
                              Multiple corroborating sources confirming the same policy
                            </li>
                            <li className="flex items-start gap-1.5 text-xs text-muted">
                              <CheckCircle2 className="w-3 h-3 text-accent mt-0.5 shrink-0" />
                              Low LLM temperature ensuring factual consistency
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Sources Used</h4>
                        <div className="space-y-2">
                          {citations.map((cit) => (
                            <Badge key={cit.id} variant="outline" className="flex items-center gap-1 py-1.5 w-full justify-start">
                              <FileText className="w-3 h-3" />
                              {cit.documentName}
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
                          {chunks.slice(0, 3).map((chunk, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                const detail = chunkDetails.find(cd => cd.id === parseInt(chunk.id.replace("Chunk ", ""))) || chunkDetails[0]
                                handleViewFullChunk(detail)
                              }}
                              className="w-full flex items-center justify-between p-2 rounded-lg border border-border text-xs hover:border-primary hover:bg-primary-light/30 transition-all text-left"
                            >
                              <span className="font-medium">{chunk.id}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-muted">{chunk.source}</span>
                                <Badge variant={chunk.score >= 0.9 ? "success" : "default"} className="text-[10px]">{(chunk.score * 100).toFixed(0)}%</Badge>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-border p-4">
                      <RetrievalInspector chunks={chunks} query={query} answer={trace.answer} grounding={grounding} quality={quality} />
                    </div>

                    <div>
                      <button
                        onClick={() => setShowAnalytics(!showAnalytics)}
                        className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                      >
                        {showAnalytics ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        <BarChart3 className="w-4 h-4" />
                        Query Analytics
                      </button>
                      <AnimatePresence>
                        {showAnalytics && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden mt-3"
                          >
                            <QueryAnalyticsCard analytics={analytics} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

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
                            <div className="p-4 rounded-xl border border-border bg-surface-1/50">
                              <AnimatedJourney data={trace} />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold mb-2">Source Trace Pipeline</h4>
                      <SourceTrace trace={trace} />
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold mb-2">Suggested Follow-Up Queries</h4>
                      <div className="flex flex-wrap gap-2">
                        {(recentQuestions[activeKb as keyof typeof recentQuestions] || recentQuestions["customer-support"]).slice(0, 3).map((q, i) => (
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

        <div className="border-t border-border p-4 bg-card">
          <div className="max-w-3xl mx-auto flex gap-3 items-end">
            <Textarea
              placeholder={`Query ${kb.name}...`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit() } }}
              autoExpand
              className="flex-1"
            />
            <div className="flex gap-2 items-center">
              <Button onClick={handleSubmit} disabled={!query.trim() || viewState === "answering"} className="shrink-0">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

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
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#14b8a6" strokeWidth="3" strokeDasharray={`${analytics.confidenceScore}, 100`} />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-accent">{analytics.confidenceScore}%</span>
                  </div>
                  <div className="text-xs text-muted">
                    <p>{quality.label}</p>
                    <p>{citations.length} sources cited</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <SessionExport
              trace={trace}
              analytics={analytics}
              chunks={chunks}
              citations={citations}
            />

            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-xs font-semibold text-muted uppercase">Retrieved Chunks</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-2 space-y-2">
                {chunks.slice(0, 3).map((chunk, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      const detail = chunkDetails.find(cd => cd.id === parseInt(chunk.id.replace("Chunk ", ""))) || chunkDetails[0]
                      handleViewFullChunk(detail)
                    }}
                    className="w-full text-left p-2.5 rounded-lg border border-border text-sm hover:border-primary hover:bg-primary-light/30 transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-xs">{chunk.id}</span>
                      <Badge variant={chunk.score >= 0.9 ? "success" : "default"} className="text-[10px] px-1.5 py-0">{(chunk.score * 100).toFixed(0)}%</Badge>
                    </div>
                    <p className="text-xs text-muted line-clamp-1">{chunk.text}</p>
                    <div className="flex items-center gap-2 text-[10px] text-muted mt-1">
                      <FileText className="w-3 h-3" />
                      {chunk.source}
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-xs font-semibold text-muted uppercase">Quality Assessment</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <AnswerQualityBadge quality={quality} />
                <p className="text-xs text-muted mt-2">{quality.explanation}</p>
              </CardContent>
            </Card>
          </div>
        </aside>
      )}

      <CitationViewer
        citations={citations}
        open={citationOpen}
        onClose={() => setCitationOpen(false)}
      />

      <ChunkViewer
        chunk={selectedChunk}
        open={chunkViewerOpen}
        onClose={() => setChunkViewerOpen(false)}
      />
    </div>
  )
}
