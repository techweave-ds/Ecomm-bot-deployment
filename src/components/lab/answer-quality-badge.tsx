"use client"

import { Badge } from "@/components/ui/badge"
import type { AnswerQuality } from "@/lib/types"
import { Info, Shield, AlertTriangle, CheckCircle } from "lucide-react"

const colorClasses: Record<string, { badge: string; dot: string }> = {
  green: {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
  },
  yellow: {
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
  },
  red: {
    badge: "bg-red-50 text-red-700 border-red-200",
    dot: "bg-red-500",
  },
}

export function getQualityColor(color: string): string {
  const map: Record<string, string> = {
    green: "emerald",
    yellow: "amber",
    red: "red",
  }
  return map[color] ?? "emerald"
}

const iconMap: Record<AnswerQuality["label"], typeof CheckCircle> = {
  Grounded: CheckCircle,
  "Partially Grounded": Shield,
  "Low Confidence": AlertTriangle,
  "Needs Verification": Info,
}

export function AnswerQualityBadge({ quality }: { quality: AnswerQuality }) {
  const colors = colorClasses[quality.color] ?? colorClasses.green
  const Icon = iconMap[quality.label]

  return (
    <Badge variant="outline" className={`inline-flex items-center gap-1.5 ${colors.badge}`}>
      <span className={`h-2 w-2 rounded-full ${colors.dot}`} />
      <span className="font-medium">{quality.label}</span>
      <span className="group relative inline-flex items-center">
        <Icon className="h-3 w-3 cursor-help" />
        <span className="absolute bottom-full left-1/2 mb-1.5 hidden w-max max-w-48 rounded-md bg-popover px-2 py-1 text-[11px] text-white shadow-lg group-hover:block -translate-x-1/2 z-10 whitespace-normal break-words">
          {quality.explanation}
        </span>
      </span>
    </Badge>
  )
}
