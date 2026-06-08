"use client"

import type { QueryHistoryItem } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { History, RotateCcw, Download, CheckCircle, AlertCircle, XCircle, Clock, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface QueryHistoryPanelProps {
  queries: QueryHistoryItem[]
  onReRun: (query: string) => void
  onExport: () => void
}

function timeAgo(isoString: string): string {
  const now = Date.now()
  const then = new Date(isoString).getTime()
  const diffMs = now - then
  const seconds = Math.floor(diffMs / 1000)
  if (seconds < 60) return "just now"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hours ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days} days ago`
  return new Date(isoString).toLocaleDateString()
}

function formatLatency(ms: number): string {
  if (ms < 1000) return `${ms}ms`
  return `${(ms / 1000).toFixed(1)}s`
}

function confidenceColor(score: number): string {
  if (score >= 0.9) return "text-emerald-600"
  if (score >= 0.7) return "text-amber-600"
  return "text-red-600"
}

function statusIcon(status: QueryHistoryItem["status"]) {
  switch (status) {
    case "success":
      return <CheckCircle className="w-4 h-4 text-emerald-500" />
    case "partial":
      return <AlertCircle className="w-4 h-5 text-amber-500" />
    case "failed":
      return <XCircle className="w-4 h-4 text-red-500" />
  }
}

export function QueryHistoryPanel({ queries, onReRun, onExport }: QueryHistoryPanelProps) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between p-4 pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <History className="w-4 h-4 text-muted" />
          Recent Queries
          <Badge variant="outline" className="ml-1 text-xs">
            {queries.length}
          </Badge>
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onExport}>
          <Download className="w-3.5 h-3.5" />
          Export
        </Button>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        {queries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-muted">
            <Clock className="w-8 h-8 mb-2 opacity-40" />
            <p className="text-sm">No queries yet</p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            <div className="space-y-2">
              {queries.map((q) => (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="group flex items-start gap-3 rounded-lg border border-border p-3 hover:bg-card-hover transition-colors"
                >
                  <div className="mt-0.5 shrink-0">{statusIcon(q.status)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{q.query}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {timeAgo(q.timestamp)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        {formatLatency(q.latencyMs)}
                      </span>
                      <span className={`font-medium ${confidenceColor(q.confidence)}`}>
                        {Math.round(q.confidence * 100)}%
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onReRun(q.query)}
                    className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Re-run
                  </Button>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </CardContent>
    </Card>
  )
}
