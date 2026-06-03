"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { ChevronUp, ChevronDown, Activity } from "lucide-react"

interface HealthData {
  readiness: number
  coverage: number
  metadataQuality: number
  chunkQuality: number
  indexHealth: number
  retrievalPerformance: number
}

const defaultHealth: HealthData = {
  readiness: 92, coverage: 87, metadataQuality: 94,
  chunkQuality: 89, indexHealth: 99, retrievalPerformance: 93,
}

const metricLabels: Record<keyof HealthData, string> = {
  readiness: "Readiness",
  coverage: "Coverage",
  metadataQuality: "Metadata",
  chunkQuality: "Chunks",
  indexHealth: "Index",
  retrievalPerformance: "Retrieval",
}

const metricExplanations: Record<keyof HealthData, string> = {
  readiness: "Overall knowledge base AI readiness score",
  coverage: "Percentage of topics covered by documents",
  metadataQuality: "Completeness of document metadata fields",
  chunkQuality: "Chunk structure and retrieval effectiveness",
  indexHealth: "Vector index health and search performance",
  retrievalPerformance: "Speed and accuracy of document retrieval",
}

function MiniBar({ value, label }: { value: number; label: string }) {
  const color = value >= 90 ? "bg-accent" : value >= 75 ? "bg-primary" : "bg-warning"
  return (
    <div className="flex items-center gap-2 text-[11px]">
      <span className="w-14 text-muted text-right">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-gray-100 min-w-[60px]">
        <div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width: `${value}%` }} />
      </div>
      <span className={`w-8 text-right font-medium ${value >= 90 ? "text-accent" : value >= 75 ? "text-primary" : "text-warning"}`}>{value}%</span>
    </div>
  )
}

export function KnowledgeHealthBanner({ data, className }: { data?: HealthData; className?: string }) {
  const [collapsed, setCollapsed] = useState(true)
  const h = data || defaultHealth
  const metrics = Object.keys(metricLabels) as (keyof HealthData)[]
  const values = metrics.map((k) => ({ key: k, value: h[k] }))

  return (
    <div className={cn("border-b border-border bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5", className)}>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center justify-between px-6 py-1.5 text-[11px] text-muted hover:text-foreground transition-colors"
      >
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-primary" />
          <span className="font-medium text-primary">Knowledge Health</span>
          <span className="hidden sm:inline text-muted">&middot;</span>
          {values.map((m) => (
            <span key={m.key} className="hidden sm:inline">
              {metricLabels[m.key]}: <strong className={m.value >= 90 ? "text-accent" : m.value >= 75 ? "text-primary" : "text-warning"}>{m.value}%</strong>
            </span>
          ))}
        </div>
        {collapsed ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
      </button>
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-3 pt-1">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-1.5">
                {values.map((m) => (
                  <div key={m.key}>
                    <MiniBar value={m.value} label={metricLabels[m.key]} />
                    <p className="text-[10px] text-muted mt-0.5 pl-16">{metricExplanations[m.key]}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
