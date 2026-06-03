"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface HealthData {
  readiness: number
  coverage: number
  metadataQuality: number
  chunkQuality: number
  indexHealth: number
  retrievalPerformance: number
}

interface KnowledgeHealthProps {
  data?: HealthData
  compact?: boolean
  className?: string
}

const defaultHealth: HealthData = {
  readiness: 92,
  coverage: 87,
  metadataQuality: 94,
  chunkQuality: 89,
  indexHealth: 99,
  retrievalPerformance: 93,
}

function Gauge({ value, label, size = "sm" }: { value: number; label: string; size?: "sm" | "md" }) {
  const isSm = size === "sm"
  const circumference = 2 * Math.PI * (isSm ? 14 : 18)
  const offset = circumference - (value / 100) * circumference
  const r = isSm ? 14 : 18
  const viewBox = isSm ? "0 0 32 32" : "0 0 40 40"
  const stroke = isSm ? 3 : 4
  const fontSize = isSm ? "text-[10px]" : "text-xs"

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative">
        <svg width={isSm ? 40 : 52} height={isSm ? 40 : 52} viewBox={viewBox} className="-rotate-90">
          <circle cx="16" cy="16" r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
          <circle
            cx="16" cy="16" r={r}
            fill="none"
            stroke={value >= 90 ? "#14b8a6" : value >= 75 ? "#2563eb" : "#f59e0b"}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <span className={`absolute inset-0 flex items-center justify-center font-bold ${fontSize} ${value >= 90 ? "text-accent" : value >= 75 ? "text-primary" : "text-warning"}`}>
          {value}%
        </span>
      </div>
      <span className={`${isSm ? "text-[9px]" : "text-xs"} text-muted text-center leading-tight`}>{label}</span>
    </div>
  )
}

export function KnowledgeHealthCard({ data, compact, className }: KnowledgeHealthProps) {
  const h = data || defaultHealth
  const metrics = [
    { value: h.readiness, label: "Readiness" },
    { value: h.coverage, label: "Coverage" },
    { value: h.metadataQuality, label: "Metadata" },
    { value: h.chunkQuality, label: "Chunks" },
    { value: h.indexHealth, label: "Index" },
    { value: h.retrievalPerformance, label: "Retrieval" },
  ]

  if (compact) {
    return (
      <Card className={cn("", className)}>
        <CardHeader className="p-3 pb-1">
          <CardTitle className="text-xs font-semibold text-muted uppercase">Knowledge Health</CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-1">
          <div className="grid grid-cols-6 gap-1">
            {metrics.map((m) => (
              <Gauge key={m.label} value={m.value} label={m.label} size="sm" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <span className="w-2 h-2 rounded-full bg-accent" />
          Knowledge Health
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {metrics.map((m) => (
            <Gauge key={m.label} value={m.value} label={m.label} size="md" />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function getHealthColor(value: number) {
  if (value >= 90) return "text-accent"
  if (value >= 75) return "text-primary"
  if (value >= 60) return "text-warning"
  return "text-danger"
}

export function getHealthBg(value: number) {
  if (value >= 90) return "bg-accent/10"
  if (value >= 75) return "bg-primary/10"
  if (value >= 60) return "bg-warning/10"
  return "bg-danger/10"
}
