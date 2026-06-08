"use client"

import { motion } from "framer-motion"
import { FileText, Clock, BarChart3, Database, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { KnowledgeSource } from "@/lib/types"

const statusConfig: Record<string, { variant: "success" | "warning" | "danger" | "outline"; icon: typeof CheckCircle }> = {
  Indexed: { variant: "success", icon: CheckCircle },
  Processing: { variant: "warning", icon: Loader2 },
  Failed: { variant: "danger", icon: AlertCircle },
  Queued: { variant: "outline", icon: Loader2 },
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "Indexed": return "text-emerald-600"
    case "Processing": return "text-amber-600"
    case "Failed": return "text-red-600"
    case "Queued": return "text-gray-500"
    default: return "text-muted"
  }
}

function HealthBar({ value, label }: { value: number; label: string }) {
  const color = value >= 90 ? "bg-emerald-500" : value >= 75 ? "bg-amber-500" : "bg-red-500"
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted w-16 shrink-0">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-gray-100">
        <div className={cn("h-full rounded-full transition-all duration-700", color)} style={{ width: `${value}%` }} />
      </div>
      <span className={cn("text-xs font-medium w-8 text-right", getStatusColor(value >= 75 ? "Indexed" : value >= 50 ? "Processing" : "Failed"))}>{value}%</span>
    </div>
  )
}

function SourceCard({ source, index }: { source: KnowledgeSource; index: number }) {
  const config = statusConfig[source.status] || statusConfig.Queued
  const StatusIcon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2 min-w-0">
              <FileText className="w-4 h-4 text-muted shrink-0" />
              <span className="text-sm font-medium truncate">{source.name}</span>
            </div>
            <Badge variant={config.variant} className="shrink-0 flex items-center gap-1">
              <StatusIcon className={cn("w-3 h-3", source.status === "Processing" && "animate-spin")} />
              {source.status}
            </Badge>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-3">
            <div className="flex flex-col items-center p-1.5 rounded-md bg-muted/30">
              <span className="text-xs text-muted">Pages</span>
              <span className="text-sm font-semibold">{source.pages}</span>
            </div>
            <div className="flex flex-col items-center p-1.5 rounded-md bg-muted/30">
              <span className="text-xs text-muted">Chunks</span>
              <span className="text-sm font-semibold">{source.chunks}</span>
            </div>
            <div className="flex flex-col items-center p-1.5 rounded-md bg-muted/30">
              <Database className="w-3 h-3 text-muted mb-0.5" />
              <span className="text-xs font-semibold">{source.embeddings}</span>
            </div>
            <div className="flex flex-col items-center p-1.5 rounded-md bg-muted/30">
              <Clock className="w-3 h-3 text-muted mb-0.5" />
              <span className="text-[10px] font-medium leading-tight text-center">{source.lastUpdated}</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <HealthBar value={source.coverage} label="Coverage" />
            <HealthBar value={source.quality} label="Quality" />
            <div className="flex items-center gap-2 pt-0.5">
              <BarChart3 className="w-3.5 h-3.5 text-muted" />
              <span className="text-xs text-muted">Retrieval Frequency</span>
              <span className="text-xs font-semibold ml-auto">{source.retrievalFrequency}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function KnowledgeSourcePanel({ sources, className }: { sources: KnowledgeSource[]; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {sources.map((source, i) => (
        <SourceCard key={source.name} source={source} index={i} />
      ))}
    </div>
  )
}
