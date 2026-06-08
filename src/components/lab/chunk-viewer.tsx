"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, FileText, Hash, BookOpen, Layers, Database, Clock, CheckCircle2, AlertTriangle } from "lucide-react"
import type { ChunkDetail } from "@/lib/types"

interface ChunkViewerProps {
  chunk: ChunkDetail | null
  open: boolean
  onClose: () => void
}

export function ChunkViewer({ chunk, open, onClose }: ChunkViewerProps) {
  const [expanded, setExpanded] = useState(false)

  const tokenDensity = chunk ? Math.min(chunk.chunkSize / 512, 1) : 0

  return (
    <AnimatePresence>
      {open && chunk && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.3, bounce: 0.2 }}
            className="w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="rounded-2xl shadow-2xl border-border/50 overflow-hidden max-h-[85vh] flex flex-col">
              <CardHeader className="flex flex-row items-start justify-between gap-4 p-6 pb-0">
                <div>
                  <CardTitle>Chunk Viewer</CardTitle>
                  <CardDescription>Detailed chunk information</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>

              <CardContent className="p-6 space-y-6 overflow-y-auto">
                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold">Document Information</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-gray-50/80">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Hash className="w-3 h-3 text-muted" />
                        <span className="text-[10px] font-medium text-muted">Chunk ID</span>
                      </div>
                      <span className="text-sm font-semibold">{chunk.id}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-50/80">
                      <div className="flex items-center gap-1.5 mb-1">
                        <FileText className="w-3 h-3 text-muted" />
                        <span className="text-[10px] font-medium text-muted">Document Name</span>
                      </div>
                      <span className="text-sm font-semibold truncate block">{chunk.source}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-50/80">
                      <div className="flex items-center gap-1.5 mb-1">
                        <BookOpen className="w-3 h-3 text-muted" />
                        <span className="text-[10px] font-medium text-muted">Page Number</span>
                      </div>
                      <span className="text-sm font-semibold">{chunk.pageNumber}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-50/80">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Layers className="w-3 h-3 text-muted" />
                        <span className="text-[10px] font-medium text-muted">Section Name</span>
                      </div>
                      <span className="text-sm font-semibold truncate block">{chunk.sectionName}</span>
                    </div>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <Database className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold">Chunk Details</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="p-3 rounded-xl bg-gray-50/80 text-center">
                      <span className="text-lg font-bold">{chunk.chunkSize}</span>
                      <p className="text-[10px] text-muted">Chunk Size</p>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-50/80 text-center">
                      <span className="text-lg font-bold">{chunk.tokenCount}</span>
                      <p className="text-[10px] text-muted">Token Count</p>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-50/80 text-center">
                      <span className="text-lg font-bold">{chunk.chunkOverlap}</span>
                      <p className="text-[10px] text-muted">Chunk Overlap</p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-gray-50/80 p-4">
                    <p className="text-xs text-muted leading-relaxed line-clamp-3">{chunk.text}</p>
                    {chunk.text.length > 150 && !expanded && (
                      <button onClick={() => setExpanded(true)} className="text-xs text-primary hover:underline mt-1">
                        Show more
                      </button>
                    )}
                    {expanded && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <p className="text-xs text-muted leading-relaxed mt-2 pt-2 border-t border-border/50">
                          {chunk.text}
                        </p>
                        <button onClick={() => setExpanded(false)} className="text-xs text-primary hover:underline mt-1">
                          Show less
                        </button>
                      </motion.div>
                    )}
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-medium text-muted">Token Density Heatmap</span>
                      <Badge variant="outline" className="text-[10px]">
                        {Math.round(tokenDensity * 100)}% density
                      </Badge>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: 12 }).map((_, i) => {
                        const intensity = 0.2 + (i / 11) * 0.8
                        const active = i / 11 <= tokenDensity
                        return (
                          <div
                            key={i}
                            className="h-6 flex-1 rounded-md transition-colors"
                            style={{
                              backgroundColor: active
                                ? `rgba(59, 130, 246, ${intensity})`
                                : "rgba(59, 130, 246, 0.05)",
                            }}
                          />
                        )
                      })}
                    </div>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <Layers className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold">Embedding Information</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-gray-50/80">
                      <span className="text-[10px] font-medium text-muted block">Embedding Model</span>
                      <span className="text-sm font-semibold">{chunk.embeddingModel}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-50/80">
                      <span className="text-[10px] font-medium text-muted block">Vector Dimensions</span>
                      <span className="text-sm font-semibold">{chunk.vectorDimensions}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-50/80">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Clock className="w-3 h-3 text-muted" />
                        <span className="text-[10px] font-medium text-muted">Created</span>
                      </div>
                      <span className="text-sm font-semibold">{chunk.createdTimestamp}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-50/80">
                      <div className="flex items-center gap-1.5 mb-1">
                        {chunk.embeddingStatus === "completed" ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <AlertTriangle className="w-3 h-3 text-amber-500" />
                        )}
                        <span className="text-[10px] font-medium text-muted">Status</span>
                      </div>
                      <Badge
                        variant={chunk.embeddingStatus === "completed" ? "success" : "warning"}
                        className="text-[10px]"
                      >
                        {chunk.embeddingStatus}
                      </Badge>
                    </div>
                  </div>
                </section>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
