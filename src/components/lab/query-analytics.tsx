"use client"

import { type ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Zap, Clock, Cpu, DollarSign, Shield, CheckCircle } from "lucide-react"
import type { QueryAnalytics } from "@/lib/types"
import { cn } from "@/lib/utils"

export function QueryAnalyticsCard({ analytics }: { analytics: QueryAnalytics }) {
  const {
    totalTimeMs,
    embeddingSearchTimeMs,
    rerankTimeMs,
    generationTimeMs,
    inputTokens,
    outputTokens,
    totalTokens,
    estimatedCost,
    confidenceScore,
    groundingScore,
  } = analytics

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-muted" />
              Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">{totalTimeMs.toFixed(0)}ms</div>
            <div className="space-y-3">
              <MiniBar label="Embedding Search" value={embeddingSearchTimeMs} total={totalTimeMs} icon={<Cpu className="w-3 h-3" />} />
              <MiniBar label="Rerank" value={rerankTimeMs} total={totalTimeMs} icon={<Zap className="w-3 h-3" />} />
              <MiniBar label="Generation" value={generationTimeMs} total={totalTimeMs} icon={<Cpu className="w-3 h-3" />} />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Cpu className="w-4 h-4 text-muted" />
              Tokens
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <Row label="Input" value={inputTokens} />
              <Row label="Output" value={outputTokens} />
              <Row label="Total" value={totalTokens} bold />
            </div>
            <StackedBar input={inputTokens} output={outputTokens} total={totalTokens} />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <DollarSign className="w-4 h-4 text-muted" />
              Cost Estimate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">${estimatedCost.toFixed(4)}</span>
            </div>
            <p className="text-xs text-muted mt-1">Estimated API cost for this query</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-muted" />
              AI Confidence Score
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ConfidenceGauge value={confidenceScore} />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.4 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-muted" />
              Grounding Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl font-bold">{groundingScore}%</span>
              <span className="text-xs text-muted">supported by sources</span>
            </div>
            <div className="w-full bg-muted/20 rounded-full h-2.5">
              <div
                className={cn("h-2.5 rounded-full transition-all duration-500", getBarColor(groundingScore))}
                style={{ width: `${groundingScore}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

function MiniBar({ label, value, total, icon }: { label: string; value: number; total: number; icon: ReactNode }) {
  const pct = total > 0 ? (value / total) * 100 : 0
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="flex items-center gap-1 text-muted">
          {icon}
          {label}
        </span>
        <span className="font-medium">{value.toFixed(0)}ms</span>
      </div>
      <div className="w-full bg-muted/20 rounded-full h-1.5">
        <div
          className="bg-primary/60 h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
    </div>
  )
}

function Row({ label, value, bold }: { label: string; value: number; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted">{label}</span>
      <span className={bold ? "font-bold" : ""}>{value.toLocaleString()}</span>
    </div>
  )
}

function StackedBar({ input, output, total }: { input: number; output: number; total: number }) {
  const inputPct = total > 0 ? (input / total) * 100 : 0
  const outputPct = total > 0 ? (output / total) * 100 : 0
  return (
    <div className="w-full bg-muted/20 rounded-full h-3 flex overflow-hidden">
      <div className="bg-blue-500/70 h-3 transition-all duration-500" style={{ width: `${inputPct}%` }} />
      <div className="bg-accent/70 h-3 transition-all duration-500" style={{ width: `${outputPct}%` }} />
    </div>
  )
}

function ConfidenceGauge({ value }: { value: number }) {
  const circumference = 2 * Math.PI * 28
  const offset = circumference - (value / 100) * circumference
  return (
    <div className="relative flex items-center justify-center">
      <svg width="80" height="80" viewBox="0 0 64 64" className="-rotate-90">
        <circle cx="32" cy="32" r="28" fill="none" stroke="#e2e8f0" strokeWidth="4" />
        <circle
          cx="32" cy="32" r="28"
          fill="none"
          stroke={value >= 80 ? "#14b8a6" : value >= 60 ? "#2563eb" : "#f59e0b"}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      <span className={cn("absolute text-lg font-bold", value >= 80 ? "text-accent" : value >= 60 ? "text-primary" : "text-warning")}>
        {value}%
      </span>
    </div>
  )
}

function getBarColor(value: number) {
  if (value >= 80) return "bg-accent"
  if (value >= 60) return "bg-primary"
  if (value >= 40) return "bg-warning"
  return "bg-danger"
}
