"use client"

import { useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileJson, FileText, Printer } from "lucide-react"
import type { QueryTrace, RetrievedChunk, QueryAnalytics, Citation } from "@/lib/types"

interface SessionExportProps {
  trace: QueryTrace | null
  analytics: QueryAnalytics | null
  chunks: RetrievedChunk[]
  citations: Citation[]
}

function buildExportPayload(trace: QueryTrace | null, _analytics: QueryAnalytics | null, chunks: RetrievedChunk[], citations: Citation[]) {
  return {
    question: trace?.question || "",
    answer: trace?.answer || "",
    retrievedChunks: chunks,
    sources: citations,
    metadata: {
      responseTime: _analytics?.totalTimeMs,
      tokens: _analytics?.totalTokens,
      cost: _analytics?.estimatedCost,
      model: trace?.llmGeneration.model,
      timestamp: new Date().toISOString(),
    },
    trace,
    analytics: _analytics,
    prompt: trace?.promptAssembly?.finalPrompt || "",
  }
}

function buildMarkdown(trace: QueryTrace | null, analytics: QueryAnalytics | null, chunks: RetrievedChunk[], citations: Citation[]): string {
  const payload = buildExportPayload(trace, analytics, chunks, citations)
  const rows = chunks
    .map((c: RetrievedChunk, i: number) => `| ${c.id || String(i + 1)} | ${"score" in c ? String(c.score) : "N/A"} | ${c.source || "N/A"} |`)
    .join("\n")

  return [
    `# Query: ${payload.question}`,
    "",
    "## Answer",
    payload.answer || "_No answer_",
    "",
    "## Retrieved Sources",
    "| Chunk | Score | Source |",
    "|-------|-------|--------|",
    rows || "| - | - | - |",
    "",
    "## Analytics",
    `- Response Time: ${payload.metadata.responseTime || "N/A"}ms`,
    `- Tokens: ${payload.metadata.tokens || "N/A"}`,
    `- Cost: $${payload.metadata.cost || "N/A"}`,
    "",
    "## Trace",
    "```",
    JSON.stringify(payload.trace, null, 2),
    "```",
  ].join("\n")
}

function downloadBlob(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function SessionExport({ trace, analytics, chunks, citations }: SessionExportProps) {
  const handleExportJSON = useCallback(() => {
    const payload = buildExportPayload(trace, analytics, chunks, citations)
    downloadBlob(JSON.stringify(payload, null, 2), "session-export.json", "application/json")
  }, [trace, analytics, chunks, citations])

  const handleExportMarkdown = useCallback(() => {
    const md = buildMarkdown(trace, analytics, chunks, citations)
    downloadBlob(md, "session-export.md", "text/markdown")
  }, [trace, analytics, chunks, citations])

  const handleExportPDF = useCallback(() => {
    window.print()
  }, [])

  return (
    <Card className="border-border">
      <CardHeader className="p-4 pb-2 border-b border-border">
        <div className="flex items-center gap-2">
          <Download className="w-4 h-4 text-primary" />
          <CardTitle className="text-sm font-semibold">Export Session</CardTitle>
        </div>
        <CardDescription className="text-[11px] text-muted mt-1">
          Download the current session as JSON, Markdown, or PDF
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handleExportJSON} className="gap-1.5">
            <FileJson className="w-3.5 h-3.5" />
            Export JSON
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportMarkdown} className="gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            Export Markdown
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportPDF} className="gap-1.5">
            <Printer className="w-3.5 h-3.5" />
            Export PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
