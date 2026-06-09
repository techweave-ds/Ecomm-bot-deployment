"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { dashboardData, knowledgeBases } from "@/lib/data"
import { getHealthColor } from "@/components/lab/knowledge-health"
import { RelationshipExplorer } from "@/components/lab/relationship-explorer"
import {
  FileText,
  Layers,
  Gauge,
  Hash,
  BarChart3,
  AlertTriangle,
  Globe,
  Zap,
  Activity,
  Shield,
  BookOpen,
} from "lucide-react"

const readinessExplanations = [
  { key: "readiness", label: "Knowledge Readiness", desc: "Overall AI readiness score based on all health metrics combined", value: dashboardData.knowledgeReadiness },
  { key: "coverage", label: "Coverage Score", desc: "Percentage of known topics covered by existing documents", value: dashboardData.coverageScore },
  { key: "metadataQuality", label: "Metadata Quality", desc: "Completeness of document metadata fields (title, author, date, category)", value: 94 },
  { key: "chunkQuality", label: "Chunk Quality", desc: "Measures chunk structure, overlap strategy, and retrieval effectiveness", value: 89 },
  { key: "indexHealth", label: "Index Health", desc: "Vector index integrity, search performance, and database connectivity", value: 99 },
  { key: "retrievalPerformance", label: "Retrieval Performance", desc: "Speed and accuracy of document retrieval from vector search", value: 93 },
]

export default function DashboardPage() {
  const envList = Object.entries(knowledgeBases)

  return (
    <div className="container-page py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Knowledge Engineering Dashboard</h1>
        <p className="text-sm text-muted mt-1">Operational visibility into knowledge quality and AI readiness</p>
      </div>

      {/* Knowledge Readiness Dashboard */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-primary" />
            Knowledge Readiness Assessment
          </CardTitle>
          <CardDescription>Understand whether your knowledge base is AI-ready</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {readinessExplanations.map((item) => {
              const color = item.value >= 90 ? "text-accent" : item.value >= 75 ? "text-primary" : "text-warning"
              const barColor = item.value >= 90 ? "bg-accent" : item.value >= 75 ? "bg-primary" : "bg-warning"
              return (
                <div key={item.key} className="p-4 rounded-xl border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className={`text-lg font-bold ${color}`}>{item.value}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-2 mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 0.8 }}
                      className={`h-full rounded-full ${barColor}`}
                    />
                  </div>
                  <p className="text-[11px] text-muted">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Global KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        {[
          { label: "Documents Indexed", value: dashboardData.documentsIndexed, icon: FileText, color: "text-primary", bg: "bg-primary-light" },
          { label: "Chunks Indexed", value: dashboardData.chunksIndexed.toLocaleString(), icon: Layers, color: "text-accent", bg: "bg-accent-light" },
          { label: "Avg Confidence", value: `${dashboardData.averageConfidence}%`, icon: Shield, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Retrieval Success", value: `${dashboardData.retrievalSuccessRate}%`, icon: Zap, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Knowledge Gaps", value: dashboardData.knowledgeGaps, icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50" },
        ].map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-8 h-8 rounded-xl ${kpi.bg} flex items-center justify-center`}>
                    <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                  </div>
                </div>
                <p className="text-xl font-bold">{kpi.value}</p>
                <p className="text-xs text-muted mt-0.5">{kpi.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Health by Environment */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              Health by Knowledge Environment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {envList.map(([key, kb]) => {
                const h = kb.health
                return (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{kb.name}</span>
                      <span className={`text-sm font-bold ${getHealthColor(h.readiness)}`}>{h.readiness}% readiness</span>
                    </div>
                    <div className="flex gap-3 text-[10px] text-muted mb-1">
                      <span>Coverage: {h.coverage}%</span>
                      <span>Metadata: {h.metadataQuality}%</span>
                      <span>Chunks: {h.chunkQuality}%</span>
                      <span>Index: {h.indexHealth}%</span>
                      <span>Retrieval: {h.retrievalPerformance}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-surface-2">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${h.readiness}%` }} className="h-full rounded-full bg-gradient-to-r from-primary to-accent" />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                <CardTitle className="text-xs font-semibold text-muted uppercase">Overall Readiness</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <p className="text-3xl font-bold text-accent">{dashboardData.knowledgeReadiness}%</p>
              <p className="text-xs text-muted mt-1">Across all environments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-500" />
                <CardTitle className="text-xs font-semibold text-muted uppercase">Source Coverage</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <p className="text-3xl font-bold text-primary">{dashboardData.coverageScore}%</p>
              <p className="text-xs text-muted mt-1">Of topics are documented</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-purple-500" />
                <CardTitle className="text-xs font-semibold text-muted uppercase">Total Chunks</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <p className="text-3xl font-bold text-purple-600">{dashboardData.chunksIndexed.toLocaleString()}</p>
              <p className="text-xs text-muted mt-1">Across {dashboardData.documentsIndexed} documents</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Most Retrieved Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Most Retrieved Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dashboardData.mostRetrievedDocuments.map((doc) => (
                <div key={doc.name}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium">{doc.name}</span>
                    <span className="text-muted">{doc.retrievals.toLocaleString()} retrievals</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-surface-2">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(doc.retrievals / 1240) * 100}%` }} className="h-full rounded-full bg-gradient-to-r from-primary to-accent" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Most Referenced Chunks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-primary" />
              Most Referenced Chunks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dashboardData.mostReferencedChunks.map((chunk) => (
                <div key={chunk.id}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>
                      <span className="font-medium">{chunk.id}</span>
                      <span className="text-muted ml-2 text-xs">{chunk.document}</span>
                    </span>
                    <span className="text-muted">{chunk.retrievals.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-surface-2">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(chunk.retrievals / Math.max(...dashboardData.mostReferencedChunks.map(c => c.retrievals))) * 100}%` }} className="h-full rounded-full bg-gradient-to-r from-accent to-primary" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Relationship Explorer Integration */}
      <RelationshipExplorer />
    </div>
  )
}
