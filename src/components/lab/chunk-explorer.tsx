"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { sampleChunks } from "@/lib/data"
import { Layers, ChevronDown, ChevronRight, FileText, Hash, Clock, Link2, ExternalLink, Expand } from "lucide-react"

interface ChunkData {
  id: number
  text: string
  tokens: number
  source: string
  retrievals: number
  lastRetrieved: string
  avgSimilarity: number
  connectedChunks: number[]
}

interface ChunkExplorerProps {
  chunks?: ChunkData[]
  className?: string
}

export function ChunkExplorer({ chunks = sampleChunks as ChunkData[], className }: ChunkExplorerProps) {
  const [expandedChunk, setExpandedChunk] = useState<number | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [viewingRelated] = useState<number | null>(null)

  return (
    <div className={className}>
      <div className="flex items-center gap-2 mb-3">
        <Layers className="w-4 h-4 text-primary" />
        <span className="text-sm font-semibold">Advanced Chunk Explorer</span>
      </div>
      <div className="space-y-2">
        {chunks.map((chunk) => (
          <motion.div
            key={chunk.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card
              className={`transition-all cursor-pointer ${expandedChunk === chunk.id ? "border-primary" : ""}`}
              onClick={() => setExpandedChunk(expandedChunk === chunk.id ? null : chunk.id)}
            >
              <CardHeader className="p-3 pb-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Hash className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-semibold">Chunk {chunk.id}</span>
                    <Badge variant="outline" className="text-[10px]">{chunk.tokens} tokens</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-muted">{chunk.retrievals} retrievals</span>
                    <span className="text-xs font-medium text-accent">{chunk.avgSimilarity}% avg</span>
                    {expandedChunk === chunk.id ? <ChevronDown className="w-3.5 h-3.5 text-muted" /> : <ChevronRight className="w-3.5 h-3.5 text-muted" />}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-3 pt-1">
                <p className="text-xs text-muted leading-relaxed">{chunk.text}</p>
                <div className="flex items-center gap-2 mt-2">
                  <FileText className="w-3 h-3 text-muted" />
                  <span className="text-[10px] text-muted">{chunk.source}</span>
                  <Clock className="w-3 h-3 text-muted ml-2" />
                  <span className="text-[10px] text-muted">{chunk.lastRetrieved}</span>
                </div>

                <AnimatePresence>
                  {expandedChunk === chunk.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 pt-3 border-t border-border space-y-3">
                        <div className="grid grid-cols-3 gap-2">
                          <div className="p-2 rounded-lg bg-surface-1 text-center">
                            <p className="text-xs font-bold">{chunk.retrievals}</p>
                            <p className="text-[10px] text-muted">Retrievals</p>
                          </div>
                          <div className="p-2 rounded-lg bg-surface-1 text-center">
                            <p className="text-xs font-bold">{chunk.avgSimilarity}%</p>
                            <p className="text-[10px] text-muted">Avg Similarity</p>
                          </div>
                          <div className="p-2 rounded-lg bg-surface-1 text-center">
                            <p className="text-xs font-bold">{chunk.tokens}</p>
                            <p className="text-[10px] text-muted">Tokens</p>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-medium text-muted">Connected Chunks</span>
                            <button className="text-[10px] text-primary hover:underline">View Related</button>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {chunk.connectedChunks.map((cid) => (
                              <Badge key={cid} variant="outline" className="text-[10px] cursor-pointer hover:border-primary">
                                Chunk {cid}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-1.5">
                          <Button variant="outline" size="sm" className="text-[10px] h-7">
                            <Expand className="w-3 h-3" />
                            Expand
                          </Button>
                          <Button variant="outline" size="sm" className="text-[10px] h-7">
                            <Link2 className="w-3 h-3" />
                            Related
                          </Button>
                          <Button variant="outline" size="sm" className="text-[10px] h-7">
                            <ExternalLink className="w-3 h-3" />
                            Source
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
