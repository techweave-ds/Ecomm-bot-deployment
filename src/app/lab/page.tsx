"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { KnowledgeHealthCard } from "@/components/lab/knowledge-health"
import { ArrowRight, Building2, Upload, Sparkles, Library, Shield, Monitor, ScrollText } from "lucide-react"
import Link from "next/link"
import { knowledgeBases } from "@/lib/data"

const knowledgeBaseList = Object.entries(knowledgeBases).map(([key, kb]) => ({
  key,
  ...kb,
  icon: key === "customer-support" ? Building2 : key === "hr" ? ScrollText : key === "it-support" ? Monitor : Shield,
}))

export default function LabHome() {
  return (
    <div className="container-page py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto text-center mb-16"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          TechWeave DS AI Lab
        </h1>
        <p className="text-lg text-muted mb-2">
          Build, Test, Validate and Understand Enterprise AI Knowledge Systems
        </p>
        <p className="text-sm text-muted max-w-2xl mx-auto leading-relaxed">
          Transform enterprise documents, policies, FAQs, guides and knowledge bases into AI-powered
          assistants with transparent retrieval and evidence-backed responses.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="h-full card-hover cursor-pointer transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center mb-3">
                <Library className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Explore Prebuilt Knowledge Bases</CardTitle>
              <CardDescription className="text-sm">
                Experience enterprise AI assistants immediately using curated knowledge collections.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-6">
                {knowledgeBaseList.map((kb) => (
                  <Badge key={kb.key} variant="outline" className="flex items-center gap-1.5 py-1.5">
                    <kb.icon className="w-3 h-3" />
                    {kb.name}
                  </Badge>
                ))}
              </div>
              <Link href="/lab/workspace">
                <Button variant="primary" size="lg" className="w-full">
                  Launch Workspace
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-full card-hover cursor-pointer transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-accent-light flex items-center justify-center mb-3">
                <Upload className="w-6 h-6 text-accent" />
              </div>
              <CardTitle className="text-xl">Build Your Own Assistant</CardTitle>
              <CardDescription className="text-sm">
                Upload documents, observe processing, create searchable knowledge and test retrieval quality.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="outline">PDF</Badge>
                <Badge variant="outline">DOCX</Badge>
                <Badge variant="outline">TXT</Badge>
                <Badge variant="outline">CSV</Badge>
                <Badge variant="outline">Markdown</Badge>
              </div>
              <Link href="/lab/documents">
                <Button variant="secondary" size="lg" className="w-full">
                  Start Building
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Knowledge Health */}
      <div className="max-w-5xl mx-auto mb-12">
        <KnowledgeHealthCard />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <p className="text-xs text-muted uppercase tracking-wider font-medium mb-4">
          Featured Knowledge Bases
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {knowledgeBaseList.map((kb) => (
            <Link key={kb.key} href={`/lab/workspace?kb=${kb.key}`}>
              <Card className="card-hover cursor-pointer p-4 text-center transition-all duration-200">
                <kb.icon className="w-5 h-5 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">{kb.name}</p>
                <p className="text-xs text-muted mt-0.5">{kb.documents.length} documents</p>
              </Card>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
