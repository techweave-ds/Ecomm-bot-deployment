"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { RetrievedChunk, GroundingResult, AnswerQuality } from "@/lib/types"
import {
  FileText,
  ExternalLink,
  Copy,
  Info,
  ChevronDown,
  ChevronRight,
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  BarChart3,
  Layers,
  Shield,
  Target,
  ArrowUpRight,
} from "lucide-react"

interface RetrievalInspectorProps {
  chunks: RetrievedChunk[]
  query: string
  answer: string
  grounding: GroundingResult
  quality: AnswerQuality
}

const PREVIEW_LIMIT = 300

function ChunkCard({ chunk, index }: { chunk: RetrievedChunk; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState<"chunk" | "source" | "meta" | null>(null)

  const preview = chunk.text.length > PREVIEW_LIMIT && !expanded
    ? chunk.text.slice(0, PREVIEW_LIMIT) + "..."
    : chunk.text

  const handleCopy = async () => {
    await navigator.clipboard.writeText(chunk.text)
    setCopied("chunk")
    setTimeout(() => setCopied(null), 2000)
  }

  const handleViewFullChunk = () => setExpanded(true)
  const handleViewSourceDoc = () => {
    const info = `${chunk.source} - Page ${chunk.metadata.pageNumber}`
    navigator.clipboard.writeText(info)
    setCopied("source")
    setTimeout(() => setCopied(null), 2000)
  }
  const handleInspectMetadata = () => {
    const meta = JSON.stringify(chunk.metadata, null, 2)
    navigator.clipboard.writeText(meta)
    setCopied("meta")
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card
        className={cn(
          "border-border transition-all duration-200",
          expanded && "border-primary/40 shadow-sm",
        )}
      >
        <CardHeader className="p-3 pb-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <FileText className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="text-xs font-semibold truncate">{chunk.source}</span>
              <Badge variant="outline" className="text-[10px] shrink-0">
                Chunk {chunk.id}
              </Badge>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[10px] text-muted">Rank #{chunk.rank}</span>
              {expanded ? (
                <ChevronDown className="w-3.5 h-3.5 text-muted" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-muted" />
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3 pt-1">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-medium text-muted">Retrieval Score</span>
                  <span className="text-[11px] font-bold text-primary">{chunk.score.toFixed(3)}</span>
                </div>
                <div className="h-1.5 rounded-full bg-surface-2 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: chunk.score > 0.8
                        ? "#14B8A6"
                        : chunk.score > 0.5
                          ? "#2563EB"
                          : "#F59E0B",
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(chunk.score * 100, 100)}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => setExpanded(!expanded)}
              className="w-full text-left"
            >
              <p className="text-xs text-foreground leading-relaxed">
                {preview}
              </p>
              {chunk.text.length > PREVIEW_LIMIT && (
                <span className="text-[10px] text-primary hover:underline mt-1 inline-block">
                  {expanded ? "Show less" : "Show more"}
                </span>
              )}
            </button>

            <div className="flex flex-wrap gap-1.5 pt-0.5">
              <Badge variant="outline" className="text-[10px]">
                Page {chunk.metadata.pageNumber}
              </Badge>
              <Badge variant="outline" className="text-[10px]">
                {chunk.metadata.sourceType}
              </Badge>
              <Badge variant="outline" className="text-[10px]">
                {chunk.metadata.category}
              </Badge>
              <Badge variant="outline" className="text-[10px]">
                {chunk.metadata.createdDate}
              </Badge>
            </div>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 pt-2 border-t border-border space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 rounded-lg bg-surface-1 text-center">
                        <p className="text-xs font-bold text-foreground">{chunk.chunkSize}</p>
                        <p className="text-[10px] text-muted">Chunk Size</p>
                      </div>
                      <div className="p-2 rounded-lg bg-surface-1 text-center">
                        <p className="text-xs font-bold text-foreground">{chunk.tokenCount}</p>
                        <p className="text-[10px] text-muted">Tokens</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <Button variant="outline" size="sm" className="text-[10px] h-7" onClick={handleViewFullChunk}>
                        <ExternalLink className="w-3 h-3" />
                        View Full Chunk
                      </Button>
                      <Button variant="outline" size="sm" className="text-[10px] h-7" onClick={handleViewSourceDoc}>
                        <ArrowUpRight className="w-3 h-3" />
                        {copied === "source" ? "Copied!" : "View Source"}
                      </Button>
                      <Button variant="outline" size="sm" className="text-[10px] h-7" onClick={handleCopy}>
                        {copied === "chunk" ? (
                          <CheckCircle2 className="w-3 h-3 text-accent" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        {copied === "chunk" ? "Copied!" : "Copy Chunk"}
                      </Button>
                      <Button variant="outline" size="sm" className="text-[10px] h-7" onClick={handleInspectMetadata}>
                        <Info className="w-3 h-3" />
                        {copied === "meta" ? "Copied!" : "Metadata"}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function GroundingIndicator({ percentage }: { percentage: number }) {
  const color = percentage >= 80 ? "#14B8A6" : percentage >= 50 ? "#2563EB" : "#EF4444"

  return (
    <div className="flex items-center gap-3">
      <div className="relative w-14 h-14">
        <svg width="56" height="56" viewBox="0 0 36 36" className="-rotate-90">
          <circle cx="18" cy="18" r="15.5" fill="none" stroke="#E2E8F0" strokeWidth="3" />
          <circle
            cx="18" cy="18" r="15.5"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeDasharray={`${(percentage / 100) * 97.4} 97.4`}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold" style={{ color }}>
          {percentage}%
        </span>
      </div>
      <div>
        <p className="text-xs font-semibold text-foreground">Grounding Score</p>
        <p className="text-[10px] text-muted">
          {percentage >= 80 ? "Well grounded" : percentage >= 50 ? "Partially grounded" : "Poorly grounded"}
        </p>
      </div>
    </div>
  )
}

function getQualityIcon(label: string) {
  switch (label) {
    case "Grounded":
      return <CheckCircle2 className="w-4 h-4 text-accent" />
    case "Partially Grounded":
      return <AlertTriangle className="w-4 h-4 text-amber-500" />
    case "Low Confidence":
      return <XCircle className="w-4 h-4 text-red-500" />
    case "Needs Verification":
      return <AlertTriangle className="w-4 h-4 text-orange-500" />
    default:
      return <Info className="w-4 h-4 text-muted" />
  }
}

function getQualityColor(label: string) {
  switch (label) {
    case "Grounded":
      return "success"
    case "Partially Grounded":
      return "warning"
    case "Low Confidence":
      return "danger"
    case "Needs Verification":
      return "warning"
    default:
      return "outline"
  }
}

function KeyFindings({ grounding }: { grounding: GroundingResult }) {
  const findings = [
    {
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-accent" />,
      label: "Supported Segments",
      value: `${grounding.supportedSegments} / ${grounding.totalSegments}`,
      good: true,
    },
    {
      icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />,
      label: "Unsupported Segments",
      value: grounding.unsupportedSegments.length,
      good: grounding.unsupportedSegments.length === 0,
    },
    {
      icon: <Shield className="w-3.5 h-3.5 text-primary" />,
      label: "Grounding Confidence",
      value: `${grounding.percentage}%`,
      good: grounding.percentage >= 70,
    },
  ]

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 mb-2">
        <Target className="w-3.5 h-3.5 text-primary" />
        <span className="text-xs font-semibold">Key Findings</span>
      </div>
      {findings.map((f) => (
        <div key={f.label} className="flex items-center justify-between p-2 rounded-lg bg-surface-1">
          <div className="flex items-center gap-2">
            {f.icon}
            <span className="text-[11px] text-muted">{f.label}</span>
          </div>
          <span className={cn("text-[11px] font-semibold", f.good ? "text-accent" : "text-red-500")}>
            {f.value}
          </span>
        </div>
      ))}
    </div>
  )
}

function ConfidenceBreakdown({ grounding, quality }: { grounding: GroundingResult; quality: AnswerQuality }) {
  const items = [
    {
      label: "Supported",
      value: grounding.totalSegments > 0
        ? Math.round((grounding.supportedSegments / grounding.totalSegments) * 100)
        : 0,
      color: "#14B8A6",
    },
    {
      label: "Unsupported",
      value: grounding.totalSegments > 0
        ? Math.round((grounding.unsupportedSegments.length / grounding.totalSegments) * 100)
        : 0,
      color: "#EF4444",
    },
  ]

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 mb-2">
        <BarChart3 className="w-3.5 h-3.5 text-primary" />
        <span className="text-xs font-semibold">Confidence Breakdown</span>
      </div>
      <div className="h-2 rounded-full bg-surface-2 overflow-hidden flex">
        {items.map((item) =>
          item.value > 0 ? (
            <motion.div
              key={item.label}
              className="h-full first:rounded-l-full last:rounded-r-full"
              style={{ backgroundColor: item.color, width: `${item.value}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${item.value}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          ) : null,
        )}
      </div>
      <div className="flex items-center gap-4">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-[10px] text-muted">{item.label}</span>
            <span className="text-[10px] font-semibold text-foreground">{item.value}%</span>
          </div>
        ))}
      </div>
      <div className="mt-2 p-2 rounded-lg bg-surface-1">
        <p className="text-[10px] text-muted">{quality.explanation}</p>
      </div>
    </div>
  )
}

export function RetrievalInspector({ chunks, query, grounding, quality }: RetrievalInspectorProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="border-border">
        <CardHeader className="p-4 pb-2 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" />
              <CardTitle className="text-sm font-semibold">Retrieved Sources</CardTitle>
            </div>
            <Badge variant="outline" className="text-[10px]">
              {chunks.length} chunks
            </Badge>
          </div>
          <CardDescription className="text-[11px] text-muted mt-1">
            Retrieved chunks for query: &ldquo;{query}&rdquo;
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 space-y-2 max-h-[600px] overflow-y-auto">
          {chunks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Search className="w-8 h-8 text-muted/40 mb-2" />
              <p className="text-xs text-muted">No retrieved chunks available</p>
            </div>
          ) : (
            chunks.map((chunk, i) => (
              <ChunkCard key={chunk.id} chunk={chunk} index={i} />
            ))
          )}
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader className="p-4 pb-2 border-b border-border">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" />
            <CardTitle className="text-sm font-semibold">Answer Analysis</CardTitle>
          </div>
          <CardDescription className="text-[11px] text-muted mt-1">
            Quality assessment based on retrieved evidence
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 space-y-5">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-1 border border-border">
            {getQualityIcon(quality.label)}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-foreground">{quality.label}</span>
                <Badge variant={getQualityColor(quality.label) as "success" | "warning" | "danger" | "outline"} className="text-[10px]">
                  {quality.label}
                </Badge>
              </div>
              <p className="text-[10px] text-muted mt-0.5">{quality.explanation}</p>
            </div>
          </div>

          <GroundingIndicator percentage={grounding.percentage} />

          <KeyFindings grounding={grounding} />

          <ConfidenceBreakdown grounding={grounding} quality={quality} />
        </CardContent>
      </Card>
    </div>
  )
}
