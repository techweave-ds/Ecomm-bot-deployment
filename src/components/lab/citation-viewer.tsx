"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, FileText, ExternalLink, AlertCircle, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Citation } from "@/lib/types"

interface CitationViewerProps {
  citations: Citation[]
  open: boolean
  onClose: () => void
  loading?: boolean
  error?: string
}

export function CitationViewer({ citations, open, onClose, loading, error }: CitationViewerProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-96 flex-col border-l border-border bg-card shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <h2 className="text-sm font-semibold">Citation Viewer</h2>
                <Badge variant="outline" className="text-[10px]">{citations.length}</Badge>
              </div>
              <button
                onClick={onClose}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-muted hover:bg-secondary hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-16 text-muted">
                  <Loader2 className="h-8 w-8 animate-spin mb-3 text-primary" />
                  <p className="text-sm">Loading citations...</p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-16 text-muted">
                  <AlertCircle className="h-8 w-8 mb-3 text-danger" />
                  <p className="text-sm font-medium text-danger">Error loading citations</p>
                  <p className="text-xs mt-1">{error}</p>
                </div>
              ) : citations.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-muted">
                  <FileText className="h-8 w-8 mb-3 text-muted/50" />
                  <p className="text-sm">No citations available</p>
                  <p className="text-xs mt-1">Citations will appear here when generated</p>
                </div>
              ) : (
                citations.map((citation) => (
                  <motion.div
                    key={citation.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="overflow-hidden border-border/60">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-1 min-w-0">
                            <p className="text-sm font-medium truncate">{citation.documentName}</p>
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge variant="outline" className="text-[10px]">
                                p. {citation.pageNumber}
                              </Badge>
                              {citation.sectionName && (
                                <Badge variant="outline" className="text-[10px]">
                                  {citation.sectionName}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg bg-surface-1 p-3">
                          <p className="text-xs leading-relaxed text-muted">{citation.paragraph}</p>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] font-medium text-muted">Retrieved Score</span>
                              <span className="text-[10px] font-semibold">{citation.retrievedScore}%</span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-surface-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${citation.retrievedScore}%` }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] font-medium text-muted">Confidence Score</span>
                              <span className="text-[10px] font-semibold">{citation.confidenceScore}%</span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-surface-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${citation.confidenceScore}%` }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className={cn(
                                  "h-full rounded-full",
                                  citation.confidenceScore >= 70
                                    ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
                                    : citation.confidenceScore >= 40
                                      ? "bg-gradient-to-r from-amber-400 to-amber-500"
                                      : "bg-gradient-to-r from-red-400 to-red-500",
                                )}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          {citation.answerSegment && (
                            <div>
                              <span className="text-[10px] font-medium text-muted">Answer Segment</span>
                              <p className="mt-0.5 text-xs italic text-accent">{citation.answerSegment}</p>
                            </div>
                          )}
                          {citation.highlightedText && (
                            <div>
                              <span className="text-[10px] font-medium text-muted">Highlighted Match</span>
                              <p className="mt-0.5 text-xs rounded-md bg-amber-50 px-2 py-1.5 text-amber-900 border border-amber-200">
                                {citation.highlightedText}
                              </p>
                            </div>
                          )}
                        </div>

                        {citation.sourceLink && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-xs h-8"
                            onClick={() => window.open(citation.sourceLink, "_blank", "noopener,noreferrer")}
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            View Source
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
