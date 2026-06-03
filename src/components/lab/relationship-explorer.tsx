"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { documentRelationships, topicRelationships, chunkRelationships } from "@/lib/data"
import { Share2, List, Network, ArrowRight, FileText, Hash, Tag } from "lucide-react"

type ViewMode = "graph" | "list"
type RelationType = "documents" | "topics" | "chunks"

interface Relationship {
  source: string
  targets: string[]
  strength: string
}

const relationSources: Record<RelationType, Relationship[]> = {
  documents: documentRelationships,
  topics: topicRelationships,
  chunks: chunkRelationships,
}

const typeIcons: Record<RelationType, typeof FileText> = {
  documents: FileText,
  topics: Tag,
  chunks: Hash,
}

export function RelationshipExplorer({ className }: { className?: string }) {
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [relationType, setRelationType] = useState<RelationType>("documents")
  const [selectedSource, setSelectedSource] = useState<string | null>(null)

  const relations = relationSources[relationType]
  const Icon = typeIcons[relationType]

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Share2 className="w-4 h-4 text-primary" />
            Knowledge Relationship Explorer
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button variant={viewMode === "list" ? "primary" : "ghost"} size="sm" onClick={() => setViewMode("list")}>
              <List className="w-3.5 h-3.5" />
            </Button>
            <Button variant={viewMode === "graph" ? "primary" : "ghost"} size="sm" onClick={() => setViewMode("graph")}>
              <Network className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
        <CardDescription>Visualize relationships between knowledge assets</CardDescription>
        <div className="flex gap-2 mt-2">
          {(["documents", "topics", "chunks"] as const).map((t) => (
            <Badge
              key={t}
              variant={relationType === t ? "default" : "outline"}
              className="cursor-pointer capitalize"
              onClick={() => { setRelationType(t); setSelectedSource(null) }}
            >
              {t}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {viewMode === "list" ? (
          <div className="space-y-3">
            {relations.map((rel: { source: string; targets: string[]; strength: string }, i: number) => (
              <motion.div
                key={rel.source}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <button
                  onClick={() => setSelectedSource(selectedSource === rel.source ? null : rel.source)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    selectedSource === rel.source
                      ? "border-primary bg-primary-light/30"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{rel.source}</span>
                    <Badge
                      variant={rel.strength === "strong" ? "success" : rel.strength === "medium" ? "warning" : "outline"}
                      className="text-[10px] ml-auto"
                    >
                      {rel.strength}
                    </Badge>
                  </div>
                  {selectedSource === rel.source && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-2 space-y-1.5"
                    >
                      <p className="text-xs text-muted mb-1">Connected to:</p>
                      {rel.targets.map((target: string) => (
                        <div key={target} className="flex items-center gap-2 text-sm pl-2">
                          <ArrowRight className="w-3 h-3 text-accent shrink-0" />
                          <span>{target}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="relative p-4 min-h-[300px] flex items-center justify-center">
            <div className="text-center">
              <Network className="w-12 h-12 mx-auto mb-3 text-muted/50" />
              <p className="text-sm text-muted">Graph visualization</p>
              <p className="text-xs text-muted mt-1">Showing {relations.length} relationship nodes</p>
            </div>
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.15 }}>
              {relations.map((rel, i) => {
                const angle = (i / relations.length) * 2 * Math.PI
                const cx = 50 + 35 * Math.cos(angle)
                const cy = 50 + 35 * Math.sin(angle)
                return (
                  <g key={i}>
                    <circle cx={`${cx}%`} cy={`${cy}%`} r="8" fill="#2563eb" />
                    <text x={`${cx}%`} y={`${cy + 1.5}%`} textAnchor="middle" className="text-[4px]" fill="#0f172a">
                      {rel.source.length > 12 ? rel.source.slice(0, 12) + ".." : rel.source}
                    </text>
                    {rel.targets.slice(0, 2).map((_: string, j: number) => {
                      const ta = ((i + 1 + j) / relations.length) * 2 * Math.PI
                      return (
                        <line
                          key={j}
                          x1={`${cx}%`} y1={`${cy}%`}
                          x2={`${50 + 35 * Math.cos(ta)}%`}
                          y2={`${50 + 35 * Math.sin(ta)}%`}
                          stroke="#94a3b8"
                          strokeWidth="0.5"
                        />
                      )
                    })}
                  </g>
                )
              })}
            </svg>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
