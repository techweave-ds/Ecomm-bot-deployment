"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { KnowledgeHealthCard } from "@/components/lab/knowledge-health"
import { RelationshipExplorer } from "@/components/lab/relationship-explorer"
import { ChunkExplorer } from "@/components/lab/chunk-explorer"
import { knowledgeBases, sampleChunks, documentRelationships } from "@/lib/data"
import {
  FileText,
  BookOpen,
  Grid3X3,
  HardDrive,
  Upload,
  Search,
  ChevronRight,
  X,
  Layers,
  Link2,
  CheckCircle,
  Clock,
  Share2,
  Hash,
  BarChart3,
  Database,
  Activity,
  TrendingUp,
  Globe,
  Zap,
  ChevronLeft,
  Info,
} from "lucide-react"

type DetailDoc = (typeof knowledgeBases)[keyof typeof knowledgeBases]["documents"][number] | null

export default function DocumentsPage() {
  const [selectedDoc, setSelectedDoc] = useState<DetailDoc>(null)
  const [uploadModal, setUploadModal] = useState(false)
  const [uploadStep, setUploadStep] = useState(0)
  const [uploadProgress, setUploadProgress] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<"documents" | "relationships" | "chunks">("documents")

  const allDocs = Object.values(knowledgeBases).flatMap((kb) => kb.documents)

  const kpis = [
    { label: "Documents Indexed", value: allDocs.length, icon: FileText, color: "text-primary", bg: "bg-primary-light" },
    { label: "Knowledge Sources", value: Object.keys(knowledgeBases).length, icon: BookOpen, color: "text-accent", bg: "bg-accent-light" },
    { label: "Embedding Chunks", value: allDocs.reduce((a, d) => a + d.chunks, 0).toLocaleString(), icon: Grid3X3, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Storage Usage", value: "2.4 GB", icon: HardDrive, color: "text-purple-600", bg: "bg-purple-50" },
  ]

  const handleUpload = () => {
    setUploadModal(true)
    setUploadStep(0)
    setUploadProgress([])
    const stages = ["Uploading", "Parsing", "Chunking", "Embedding", "Indexing", "Ready"]
    stages.forEach((stage, i) => {
      setTimeout(() => { setUploadStep(i + 1); setUploadProgress((prev) => [...prev, stage]) }, (i + 1) * 800)
    })
  }

  // Find relationships for selectedDoc
  const docRelationships = selectedDoc
    ? documentRelationships.filter(r => r.source === selectedDoc.name)
    : []

  return (
    <div className="container-page py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Knowledge Control Center</h1>
          <p className="text-sm text-muted mt-1">Manage, inspect, and analyze your knowledge sources</p>
        </div>
        <Button onClick={handleUpload}>
          <Upload className="w-4 h-4" />
          Upload Document
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${kpi.bg} flex items-center justify-center shrink-0`}>
                  <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <p className="text-xs text-muted">{kpi.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 mb-4">
        {([
          { id: "documents" as const, label: "All Documents", icon: FileText },
          { id: "relationships" as const, label: "Relationship Explorer", icon: Share2 },
          { id: "chunks" as const, label: "Chunk Inspector", icon: Hash },
        ]).map((tab) => (
          <Button key={tab.id} variant={activeTab === tab.id ? "primary" : "outline"} size="sm" onClick={() => setActiveTab(tab.id)}>
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Tab: Documents */}
      {activeTab === "documents" && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Documents & Knowledge Sources</CardTitle>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input placeholder="Search documents..." className="pl-9 pr-3 py-1.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 w-56" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-3">Document</th>
                    <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-3">Category</th>
                    <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-3">Pages</th>
                    <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-3">Chunks</th>
                    <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-3">Status</th>
                    <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-3">Last Updated</th>
                    <th className="w-12 px-6 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {allDocs.map((doc, i) => (
                    <motion.tr key={doc.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
                      className="border-b border-border last:border-0 hover:bg-gray-50/50 cursor-pointer transition-colors"
                      onClick={() => setSelectedDoc(doc)}
                    >
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2.5">
                          <FileText className="w-4 h-4 text-muted shrink-0" />
                          <span className="text-sm font-medium">{doc.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3"><Badge variant="outline" className="text-xs">{doc.category}</Badge></td>
                      <td className="px-6 py-3 text-sm text-muted">{doc.pages}</td>
                      <td className="px-6 py-3 text-sm text-muted">{doc.chunks}</td>
                      <td className="px-6 py-3">
                        <Badge variant="success" className="text-xs flex items-center gap-1 w-fit">
                          <CheckCircle className="w-3 h-3" />
                          {doc.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-3 text-sm text-muted">{doc.updated}</td>
                      <td className="px-6 py-3">
                        <button onClick={(e) => { e.stopPropagation(); setSelectedDoc(doc) }}>
                          <ChevronRight className="w-4 h-4 text-muted" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab: Relationships */}
      {activeTab === "relationships" && <RelationshipExplorer />}

      {/* Tab: Chunks */}
      {activeTab === "chunks" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-primary" />
              Chunk Inspector
            </CardTitle>
            <CardDescription>Inspect individual chunks with retrieval metrics, similarity scores, and connected chunks</CardDescription>
          </CardHeader>
          <CardContent>
            <ChunkExplorer chunks={sampleChunks as any} />
          </CardContent>
        </Card>
      )}

      {/* Document Detail - Knowledge Control Center */}
      {selectedDoc && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 pb-10"
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setSelectedDoc(null)} />
          <Card className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto z-10 mx-4">
            <CardHeader className="sticky top-0 bg-card z-10 border-b border-border">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{selectedDoc.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-0.5">
                      <Badge variant="outline" className="text-[10px]">{selectedDoc.category}</Badge>
                      <span className="text-xs text-muted">{selectedDoc.pages} pages</span>
                      <span className="text-xs text-muted">{selectedDoc.chunks} chunks</span>
                      <span className="text-xs text-muted">Updated {selectedDoc.updated}</span>
                    </CardDescription>
                  </div>
                </div>
                <button onClick={() => setSelectedDoc(null)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-8">
              {/* 1. Overview */}
              <section>
                <h3 className="text-sm font-semibold flex items-center gap-1.5 mb-3">
                  <Info className="w-4 h-4 text-primary" />
                  Document Overview
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { label: "Document Type", value: "PDF", icon: FileText },
                    { label: "File Size", value: "2.4 MB", icon: HardDrive },
                    { label: "Embedding Model", value: "BGE Large", icon: Database },
                    { label: "Vector Count", value: selectedDoc.chunks.toString(), icon: Grid3X3 },
                    { label: "Vector Dimensions", value: "1024", icon: BarChart3 },
                    { label: "Retrieval Count", value: `${Math.floor(Math.random() * 500 + 100)}`, icon: TrendingUp },
                    { label: "Chunk Strategy", value: "Semantic + Overlap", icon: Layers },
                    { label: "Index Status", value: "Optimal", icon: CheckCircle },
                  ].map((m) => (
                    <div key={m.label} className="p-3 rounded-xl border border-border">
                      <div className="flex items-center gap-1.5 mb-1">
                        <m.icon className="w-3.5 h-3.5 text-muted" />
                        <p className="text-[10px] text-muted">{m.label}</p>
                      </div>
                      <p className="text-sm font-medium">{m.value}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 2. Relationships */}
              <section>
                <h3 className="text-sm font-semibold flex items-center gap-1.5 mb-3">
                  <Link2 className="w-4 h-4 text-primary" />
                  Document Relationships
                </h3>
                {docRelationships.length > 0 ? (
                  <div className="space-y-2">
                    {docRelationships.map((rel) => (
                      <div key={rel.source} className="p-3 rounded-xl border border-border">
                        <p className="text-xs text-muted mb-2">{rel.source} is connected to:</p>
                        <div className="flex flex-wrap gap-2">
                          {rel.targets.map((target) => (
                            <Badge key={target} variant="outline" className="flex items-center gap-1 py-1.5">
                              <FileText className="w-3 h-3" />
                              {target}
                              <span className="w-1.5 h-1.5 rounded-full bg-accent ml-1" />
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {["Refund Policy", "Returns Policy", "Warranty Guide", "Shipping Guide"].filter(r => r !== selectedDoc.name).slice(0, 3).map((rel) => (
                      <Badge key={rel} variant="outline" className="flex items-center gap-1 py-1.5 cursor-pointer hover:border-primary">
                        <FileText className="w-3 h-3" />
                        {rel}
                        <Link2 className="w-3 h-3 text-accent ml-0.5" />
                      </Badge>
                    ))}
                  </div>
                )}
              </section>

              {/* 3. Chunk Explorer */}
              <section>
                <h3 className="text-sm font-semibold flex items-center gap-1.5 mb-3">
                  <Layers className="w-4 h-4 text-primary" />
                  Chunks
                </h3>
                <ChunkExplorer />
              </section>

              {/* 4. Retrieval Metrics */}
              <section>
                <h3 className="text-sm font-semibold flex items-center gap-1.5 mb-3">
                  <Activity className="w-4 h-4 text-primary" />
                  Retrieval Analytics
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: "Retrieval Count", value: Math.floor(Math.random() * 500 + 100).toString(), icon: Zap },
                    { label: "Avg Similarity", value: `${Math.floor(Math.random() * 10 + 88)}%`, icon: Activity },
                    { label: "Times Referenced", value: Math.floor(Math.random() * 50 + 20).toString(), icon: Hash },
                    { label: "Last Retrieved", value: "Today", icon: Clock },
                  ].map((m) => (
                    <div key={m.label} className="p-3 rounded-xl border border-border text-center">
                      <m.icon className="w-4 h-4 mx-auto mb-1 text-muted" />
                      <p className="text-lg font-bold">{m.value}</p>
                      <p className="text-[10px] text-muted">{m.label}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 5. Health */}
              <KnowledgeHealthCard compact />
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Upload Modal */}
      {uploadModal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setUploadModal(false)} />
          <Card className="relative w-full max-w-lg z-10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Upload Document</CardTitle>
                <button onClick={() => setUploadModal(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <CardDescription>Drop your document or click to browse</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center mb-4 hover:border-primary transition-colors">
                <Upload className="w-8 h-8 mx-auto mb-3 text-muted" />
                <p className="text-sm font-medium mb-1">Drop documents here</p>
                <p className="text-xs text-muted mb-3">or</p>
                <Button variant="outline" size="sm">Browse Files</Button>
              </div>
              {uploadStep > 0 && (
                <div className="space-y-2">
                  {["Uploading", "Parsing", "Chunking", "Embedding", "Indexing", "Ready"].map((stage, i) => {
                    const isDone = i < uploadStep - 1
                    const isCurrent = i === uploadStep - 1
                    const isPending = i > uploadStep - 1
                    return (
                      <div key={stage} className={`flex items-center gap-3 p-2 rounded-lg text-sm ${isCurrent ? "bg-primary-light" : ""}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isDone ? "bg-accent text-white" : isCurrent ? "border-2 border-primary" : "border-2 border-border text-muted"}`}>
                          {isDone ? <CheckCircle className="w-3.5 h-3.5" /> : isCurrent ? <Clock className="w-3.5 h-3.5 text-primary" /> : <div className="w-2 h-2 rounded-full bg-border" />}
                        </div>
                        <span className={isPending ? "text-muted" : ""}>{stage}</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
