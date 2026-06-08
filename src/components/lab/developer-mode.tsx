"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import type { QueryTrace, RetrievedChunk } from "@/lib/types"
import {
  Bug,
  Code,
  Terminal,
  Cpu,
  Clock,
  FileText,
  Shield,
  X,
} from "lucide-react"

interface DeveloperModeProps {
  enabled: boolean
  onToggle: () => void
  trace: QueryTrace | null
  chunks: RetrievedChunk[]
  analytics: Record<string, unknown> | null
}

type Tab = "retrieval" | "prompt" | "tokens" | "latency" | "trace" | "grounding"

const tabs: { id: Tab; label: string; icon: typeof Bug }[] = [
  { id: "retrieval", label: "Retrieval", icon: FileText },
  { id: "prompt", label: "Prompt", icon: Code },
  { id: "tokens", label: "Tokens", icon: Cpu },
  { id: "latency", label: "Latency", icon: Clock },
  { id: "trace", label: "Trace", icon: Terminal },
  { id: "grounding", label: "Grounding", icon: Shield },
]

function TabContent({ tab, chunks, trace, analytics }: { tab: Tab; chunks: RetrievedChunk[]; trace: QueryTrace | null; analytics: Record<string, unknown> | null }) {
  const renderJSON = (data: Record<string, unknown>) => (
    <pre className="text-[11px] font-mono leading-relaxed whitespace-pre-wrap break-all">
      {JSON.stringify(data, null, 2)}
    </pre>
  )

  switch (tab) {
    case "retrieval":
      return (
        <div className="space-y-3">
          {chunks.length === 0 ? (
            <p className="text-[11px] text-gray-400">No chunks available</p>
          ) : (
            chunks.map((chunk: RetrievedChunk, i: number) => (
              <div key={i} className="p-2 rounded bg-gray-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-gray-300">Chunk #{chunk.id ?? i}</span>
                  <span className="text-[10px] text-gray-400">Score: {chunk.score?.toFixed(4) ?? "N/A"}</span>
                </div>
                {chunk.metadata && (
                  <div className="flex gap-2 text-[10px] text-gray-500">
                    <span>Page {chunk.metadata.pageNumber}</span>
                    <span>{chunk.metadata.sourceType}</span>
                    <span>{chunk.metadata.category}</span>
                  </div>
                )}
                {chunk.text && (
                  <p className="text-[10px] text-gray-400 line-clamp-2">{chunk.text}</p>
                )}
              </div>
            ))
          )}
          {!!analytics?.retrieval && (
            <div className="p-2 rounded bg-gray-800">
              <p className="text-[10px] font-semibold text-gray-300 mb-1">Retrieval Scores</p>
              {renderJSON(analytics.retrieval as Record<string, unknown>)}
            </div>
          )}
        </div>
      )

    case "prompt":
      return (
        <div className="space-y-3">
          {!!analytics?.prompt ? (
            <>{renderJSON(analytics.prompt as Record<string, unknown>)}</>
          ) : (
            <p className="text-[11px] text-gray-400">No prompt data available</p>
          )}
        </div>
      )

    case "tokens":
      return (
        <div className="space-y-2">
          {analytics?.tokens ? (
            <>{renderJSON(analytics.tokens as Record<string, unknown>)}</>
          ) : (
            <p className="text-[11px] text-gray-400">No token data available</p>
          )}
        </div>
      )

    case "latency":
      return (
        <div className="space-y-2">
          {analytics?.latency ? (
            <>{renderJSON(analytics.latency as Record<string, unknown>)}</>
          ) : (
            <p className="text-[11px] text-gray-400">No latency data available</p>
          )}
        </div>
      )

    case "trace":
      return (
        <div className="space-y-2">
          {trace ? (
            <pre className="text-[11px] font-mono leading-relaxed whitespace-pre-wrap break-all p-2 rounded bg-gray-800 text-gray-400 max-h-[400px] overflow-y-auto">
              {typeof trace === "string" ? trace : JSON.stringify(trace, null, 2)}
            </pre>
          ) : (
            <p className="text-[11px] text-gray-400">No trace data available</p>
          )}
        </div>
      )

    case "grounding":
      return (
        <div className="space-y-2">
          {analytics?.grounding ? (
            <>{renderJSON(analytics.grounding as Record<string, unknown>)}</>
          ) : (
            <p className="text-[11px] text-gray-400">No grounding data available</p>
          )}
        </div>
      )
  }
}

export function DeveloperMode({ enabled, onToggle, trace, chunks, analytics }: DeveloperModeProps) {
  const [activeTab, setActiveTab] = useState<Tab>("retrieval")

  return (
    <>
      <button
        onClick={onToggle}
        className={cn(
          "fixed top-4 right-4 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 shadow-lg",
          enabled
            ? "bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-amber-500/10"
            : "bg-gray-800/80 text-gray-400 border border-gray-700/50 hover:bg-gray-700/80 hover:text-gray-300",
        )}
      >
        <Bug className={cn("w-3.5 h-3.5", enabled && "animate-pulse")} />
        <span>Developer Mode</span>
        {enabled && (
          <motion.span
            className="absolute -inset-0.5 rounded-lg border border-amber-400/40"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </button>

      <AnimatePresence>
        {enabled && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-40 h-[50vh] bg-gray-900 border-t border-gray-700 text-gray-100 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700 shrink-0">
              <div className="flex items-center gap-2 overflow-x-auto">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "flex items-center gap-1.5 px-2.5 py-1.5 rounded text-[10px] font-medium whitespace-nowrap transition-colors",
                        activeTab === tab.id
                          ? "bg-gray-700 text-gray-100"
                          : "text-gray-400 hover:text-gray-200 hover:bg-gray-800",
                      )}
                    >
                      <Icon className="w-3 h-3" />
                      {tab.label}
                    </button>
                  )
                })}
              </div>
              <button
                onClick={onToggle}
                className="p-1 rounded hover:bg-gray-700 text-gray-400 hover:text-gray-200 transition-colors shrink-0 ml-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <TabContent tab={activeTab} chunks={chunks} trace={trace} analytics={analytics} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
