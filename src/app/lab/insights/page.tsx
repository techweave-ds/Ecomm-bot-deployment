"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { KnowledgeHealthCard } from "@/components/lab/knowledge-health"
import { knowledgeGapsEngine, knowledgeBases } from "@/lib/data"
import {
  TrendingUp,
  FileText,
  Target,
  AlertTriangle,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  MessageSquare,
  Zap,
  Lightbulb,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react"

interface TopicData { topic: string; count: number; percentage: number }
interface DocData { name: string; retrievals: number; percentage: number }
interface SourceData { source: string; utilization: number }
interface InsightsData {
  totalQuestions: number
  retrievalQuality: number
  coverageScore: number
  popularTopics: TopicData[]
  mostRetrievedDocuments: DocData[]
  sourceUtilization: SourceData[]
}

export default function InsightsPage() {
  const [selectedEnv, setSelectedEnv] = useState("customer-support")
  const kb = knowledgeBases[selectedEnv as keyof typeof knowledgeBases]

  const fallbackInsights: InsightsData = {
    totalQuestions: 12480,
    retrievalQuality: 94,
    coverageScore: 87,
    popularTopics: [{ topic: "Refunds & Returns", count: 3450, percentage: 28 }, { topic: "Shipping & Delivery", count: 2890, percentage: 23 }],
    mostRetrievedDocuments: [{ name: "Refund Policy.pdf", retrievals: 1240, percentage: 18 }, { name: "Returns Policy.pdf", retrievals: 980, percentage: 14 }],
    sourceUtilization: [{ source: "Policy Documents", utilization: 42 }, { source: "FAQs", utilization: 28 }],
  }
  const kbData = kb as typeof kb & { insights?: InsightsData }
  const data = kbData.insights || fallbackInsights

  return (
    <div className="container-page py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Insights</h1>
            <p className="text-sm text-muted mt-1">Knowledge intelligence and retrieval analytics</p>
          </div>
          <div className="flex gap-1.5">
            {Object.entries(knowledgeBases).map(([key, k]) => (
              <Badge
                key={key}
                variant={selectedEnv === key ? "default" : "outline"}
                className="cursor-pointer capitalize"
                onClick={() => setSelectedEnv(key)}
              >
                {k.name}
              </Badge>
            ))}
          </div>
        </div>
        <p className="text-xs text-muted mt-2">Showing analytics for: <strong>{kb.name}</strong></p>
      </div>

      {/* Environment Health */}
      <div className="mb-8">
        <KnowledgeHealthCard data={kb.health} />
      </div>

      {/* Top KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Questions Asked", value: data.totalQuestions?.toLocaleString() || "12,480", icon: MessageSquare, change: "+12%", trend: "up" as const, color: "text-primary", bg: "bg-primary-light" },
          { label: "Retrieval Quality", value: `${data.retrievalQuality || 94}%`, icon: Zap, change: "+3%", trend: "up" as const, color: "text-accent", bg: "bg-accent-light" },
          { label: "Coverage Score", value: `${data.coverageScore || 87}%`, icon: Target, change: "+5%", trend: "up" as const, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Knowledge Gaps", value: knowledgeGapsEngine.gaps.length.toString(), icon: AlertTriangle, change: "-2", trend: "down" as const, color: "text-red-600", bg: "bg-red-50" },
        ].map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-9 h-9 rounded-xl ${kpi.bg} flex items-center justify-center`}>
                    <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                  </div>
                  <Badge variant={kpi.trend === "up" ? "success" : "danger"} className="text-[10px] px-1.5 py-0">
                    {kpi.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {kpi.change}
                  </Badge>
                </div>
                <p className="text-2xl font-bold">{kpi.value}</p>
                <p className="text-xs text-muted mt-0.5">{kpi.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Popular Topics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Popular Topics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(data.popularTopics || fallbackInsights.popularTopics).map((topic: TopicData, i: number) => (
                <div key={topic.topic}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-medium">{topic.topic}</span>
                    <span className="text-muted">{topic.count.toLocaleString()} questions</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-100">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${topic.percentage}%` }} transition={{ duration: 0.8, delay: i * 0.1 }} className="h-full rounded-full bg-gradient-to-r from-primary to-accent" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Most Retrieved Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              Most Retrieved Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(data.mostRetrievedDocuments || fallbackInsights.mostRetrievedDocuments).map((doc: DocData, i: number) => (
                <div key={doc.name}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-medium">{doc.name}</span>
                    <span className="text-muted">{doc.retrievals.toLocaleString()} retrievals</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-100">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${doc.percentage}%` }} transition={{ duration: 0.8, delay: i * 0.1 }} className="h-full rounded-full bg-gradient-to-r from-accent to-primary" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Knowledge Gaps Engine */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            Knowledge Gaps Engine
          </CardTitle>
          <CardDescription>Identify missing knowledge and improvement opportunities</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Summary */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            {[
              { label: "Total Questions", value: knowledgeGapsEngine.summary.questionsAsked.toLocaleString(), icon: MessageSquare },
              { label: "Answered", value: `${knowledgeGapsEngine.summary.answeredRate}%`, sub: `${knowledgeGapsEngine.summary.answered.toLocaleString()} questions`, icon: CheckCircle2, color: "text-accent" },
              { label: "Low Confidence", value: `${knowledgeGapsEngine.summary.lowConfidenceRate}%`, sub: `${knowledgeGapsEngine.summary.lowConfidence} questions`, icon: AlertCircle, color: "text-amber-500" },
              { label: "Unanswered", value: `${knowledgeGapsEngine.summary.unansweredRate}%`, sub: `${knowledgeGapsEngine.summary.unanswered} questions`, icon: XCircle, color: "text-red-500" },
              { label: "Gaps Identified", value: knowledgeGapsEngine.gaps.length.toString(), icon: AlertTriangle, color: "text-amber-500" },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-xl border border-border text-center">
                <item.icon className={`w-4 h-4 mx-auto mb-1 ${item.color || "text-primary"}`} />
                <p className="text-lg font-bold">{item.value}</p>
                <p className="text-[10px] text-muted">{item.label}</p>
                {item.sub && <p className="text-[9px] text-muted mt-0.5">{item.sub}</p>}
              </div>
            ))}
          </div>

          {/* Gap Details */}
          <div className="space-y-3">
            {knowledgeGapsEngine.gaps.map((gap, i) => (
              <motion.div key={gap.topic} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <div className="p-3 rounded-xl border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{gap.topic}</span>
                      <Badge variant={gap.impact === "High" ? "danger" : gap.impact === "Medium" ? "warning" : "outline"} className="text-[10px]">{gap.impact} Impact</Badge>
                    </div>
                    <Badge variant={gap.coverage === "Missing" ? "danger" : "warning"} className="text-[10px]">
                      {gap.coverage === "Missing" ? <XCircle className="w-3 h-3 mr-0.5" /> : <AlertCircle className="w-3 h-3 mr-0.5" />}
                      {gap.coverage}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted">
                    <span>Asked {gap.asked} times</span>
                    {gap.coverage === "Partial" && <span>Confidence: {gap.confidence}%</span>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Recommendations */}
          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-3">Recommended Actions</h4>
            <div className="space-y-2">
              {knowledgeGapsEngine.recommendations.map((rec, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-lg border border-border text-sm">
                  <span>{rec.action}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant={rec.impact === "High" ? "danger" : "warning"} className="text-[10px]">{rec.impact} impact</Badge>
                    <Badge variant="outline" className="text-[10px]">{rec.effort} effort</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Knowledge Gaps (legacy) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Gap Distribution
            </CardTitle>
            <CardDescription>By coverage type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: "Missing Coverage", count: knowledgeGapsEngine.gaps.filter(g => g.coverage === "Missing").length, color: "bg-red-400" },
                { label: "Partial Coverage", count: knowledgeGapsEngine.gaps.filter(g => g.coverage === "Partial").length, color: "bg-amber-400" },
                { label: "By Impact: High", count: knowledgeGapsEngine.gaps.filter(g => g.impact === "High").length, color: "bg-red-500" },
                { label: "By Impact: Medium", count: knowledgeGapsEngine.gaps.filter(g => g.impact === "Medium").length, color: "bg-amber-500" },
                { label: "By Impact: Low", count: knowledgeGapsEngine.gaps.filter(g => g.impact === "Low").length, color: "bg-blue-400" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                  <span>{item.label}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 rounded-full bg-gray-100">
                      <div className={`h-full rounded-full ${item.color}`} style={{ width: `${(item.count / knowledgeGapsEngine.gaps.length) * 100}%` }} />
                    </div>
                    <span className="text-xs font-medium w-4 text-right">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Source Utilization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-4 h-4 text-primary" />
              Source Utilization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(data.sourceUtilization || fallbackInsights.sourceUtilization).map((source: SourceData) => (
                <div key={source.source}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-medium">{source.source}</span>
                    <span className="text-muted">{source.utilization}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-gray-100">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${source.utilization}%` }} transition={{ duration: 0.8 }} className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-amber-400" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
