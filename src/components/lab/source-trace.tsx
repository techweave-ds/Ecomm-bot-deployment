"use client"

import { useState } from "react"
import type { QueryTrace } from "@/lib/types"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronRight,
  ChevronDown,
  Search,
  GitBranch,
  Layers,
  Brain,
  MessageSquare,
  FileText,
  Code,
  CheckCircle,
} from "lucide-react"

function StageIcon({ index }: { index: number }) {
  const icons = [MessageSquare, Search, GitBranch, Layers, Brain, FileText, Code, CheckCircle]
  const Icon = icons[index] || MessageSquare
  return <Icon className="w-4 h-4" />
}

const stageLabels = [
  "User Query",
  "Query Expansion",
  "Vector Search",
  "Retrieved Chunks",
  "Reranking",
  "Prompt Assembly",
  "LLM Generation",
  "Final Response",
]

function StageLine() {
  return (
    <div className="flex justify-center py-0.5">
      <div className="w-px h-5 bg-gradient-to-b from-primary/30 to-primary/10" />
    </div>
  )
}

function ExpandableSection({
  open,
  onToggle,
  icon,
  label,
  badge,
  children,
}: {
  open: boolean
  onToggle: () => void
  icon: React.ReactNode
  label: string
  badge?: string
  children: React.ReactNode
}) {
  return (
    <Card className="border border-border/60 bg-card shadow-sm overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/30 transition-colors"
      >
        <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
          {icon}
        </span>
        <span className="text-sm font-medium text-foreground flex-1">{label}</span>
        {badge && (
          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
            {badge}
          </Badge>
        )}
        <span className="text-muted">
          {open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/40 px-4 py-3 text-sm text-muted space-y-1.5">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

function DataRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-xs text-muted">{label}</span>
      <span className="text-xs font-medium text-foreground">{value}</span>
    </div>
  )
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="text-[11px] leading-relaxed bg-muted/30 rounded-lg p-3 overflow-x-auto border border-border/30 text-foreground/80 max-h-40 overflow-y-auto">
      {children}
    </pre>
  )
}

export function SourceTrace({ trace }: { trace: QueryTrace }) {
  const [openStages, setOpenStages] = useState<Record<number, boolean>>({
    0: true,
    7: true,
  })

  const toggle = (index: number) => {
    setOpenStages((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  return (
    <div className="flex flex-col items-center w-full">
      {stageLabels.map((label, i) => (
        <div key={i} className="w-full max-w-2xl">
          {i > 0 && <StageLine />}
          <ExpandableSection
            open={!!openStages[i]}
            onToggle={() => toggle(i)}
            icon={<StageIcon index={i} />}
            label={label}
            badge={i === 4 ? `${trace.reranking.before}→${trace.reranking.after}` : undefined}
          >
            {i === 0 && (
              <p className="text-foreground text-sm font-medium">{trace.question}</p>
            )}

            {i === 1 && (
              <div className="space-y-1">
                <p className="text-xs text-muted">Original: <span className="text-foreground">{trace.queryExpansion.original}</span></p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {trace.queryExpansion.expanded.map((q, j) => (
                    <Badge key={j} variant="outline" className="text-[10px]">{q}</Badge>
                  ))}
                </div>
              </div>
            )}

            {i === 2 && (
              <>
                <DataRow label="Strategy" value={trace.vectorSearch.strategy} />
                <DataRow label="Top-K" value={trace.vectorSearch.topK} />
                <DataRow label="Threshold" value={trace.vectorSearch.threshold} />
                <DataRow label="Results" value={trace.vectorSearch.results} />
              </>
            )}

            {i === 3 && (
              <div className="space-y-2">
                {trace.retrievedChunks.map((chunk) => (
                  <div key={chunk.id} className="flex items-center justify-between bg-muted/20 rounded-lg px-3 py-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-foreground truncate">{chunk.text}</p>
                      <p className="text-[10px] text-muted mt-0.5">{chunk.source} · p.{chunk.pageNumber}</p>
                    </div>
                    <Badge
                      variant={chunk.score >= 0.8 ? "default" : chunk.score >= 0.5 ? "warning" : "outline"}
                      className="ml-2 text-[10px] flex-shrink-0"
                    >
                      {Math.round(chunk.score * 100)}%
                    </Badge>
                  </div>
                ))}
              </div>
            )}

            {i === 4 && (
              <>
                <DataRow label="Strategy" value={trace.reranking.strategy} />
                <DataRow label="Before Reranking" value={trace.reranking.before} />
                <DataRow label="After Reranking" value={trace.reranking.after} />
              </>
            )}

            {i === 5 && (
              <div className="space-y-3">
                <div>
                  <p className="text-[11px] font-medium text-muted mb-1">System Prompt</p>
                  <CodeBlock>{trace.promptAssembly.systemPrompt}</CodeBlock>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-muted mb-1">Retrieved Context</p>
                  <CodeBlock>{trace.promptAssembly.retrievedContext}</CodeBlock>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-muted mb-1">User Question</p>
                  <CodeBlock>{trace.promptAssembly.userQuestion}</CodeBlock>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-muted mb-1">Final Prompt</p>
                  <CodeBlock>{trace.promptAssembly.finalPrompt}</CodeBlock>
                </div>
              </div>
            )}

            {i === 6 && (
              <>
                <DataRow label="Model" value={trace.llmGeneration.model} />
                <DataRow label="Temperature" value={trace.llmGeneration.temperature} />
                <DataRow label="Tokens Generated" value={trace.llmGeneration.tokensGenerated} />
                <DataRow label="Latency" value={`${trace.llmGeneration.latencyMs}ms`} />
                <DataRow label="Cost" value={`$${trace.llmGeneration.cost.toFixed(4)}`} />
              </>
            )}

            {i === 7 && (
              <p className="text-foreground text-sm leading-relaxed">{trace.finalResponse}</p>
            )}
          </ExpandableSection>
        </div>
      ))}
    </div>
  )
}
