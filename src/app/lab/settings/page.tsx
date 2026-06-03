"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Database,
  Brain,
  Shield,
  Sliders,
  Save,
  RefreshCw,
} from "lucide-react"

const settingsSections = [
  {
    id: "embeddings",
    title: "Embedding Model",
    description: "Configure the embedding model for document vectorization",
    icon: Brain,
    fields: [
      { label: "Model", value: "BGE Large", type: "select", options: ["BGE Large", "OpenAI text-embedding-3", "Cohere embed-english"] },
      { label: "Dimensions", value: "1024", type: "select", options: ["384", "768", "1024", "1536", "3072"] },
      { label: "Chunk Size", value: "256 tokens", type: "select", options: ["128", "256", "512", "1024"] },
      { label: "Chunk Overlap", value: "32 tokens", type: "select", options: ["0", "16", "32", "64", "128"] },
    ],
  },
  {
    id: "vector-db",
    title: "Vector Database",
    description: "Configure the vector storage backend",
    icon: Database,
    fields: [
      { label: "Database", value: "Qdrant", type: "select", options: ["Qdrant", "Pinecone", "Weaviate", "Chroma"] },
      { label: "Distance Metric", value: "Cosine", type: "select", options: ["Cosine", "Euclidean", "Dot Product"] },
      { label: "Top-K Retrieval", value: "5", type: "select", options: ["3", "5", "10", "20"] },
      { label: "Similarity Threshold", value: "0.75", type: "select", options: ["0.5", "0.6", "0.75", "0.85", "0.9"] },
    ],
  },
  {
    id: "llm",
    title: "LLM Configuration",
    description: "Configure the language model for answer generation",
    icon: Brain,
    fields: [
      { label: "Model", value: "DeepSeek v3", type: "select", options: ["DeepSeek v3", "Claude 4", "GPT-4o", "Gemini 2.0"] },
      { label: "Temperature", value: "0.1", type: "select", options: ["0.0", "0.1", "0.3", "0.5", "0.7", "1.0"] },
      { label: "Max Tokens", value: "1024", type: "select", options: ["256", "512", "1024", "2048", "4096"] },
      { label: "Top-P", value: "0.95", type: "select", options: ["0.8", "0.9", "0.95", "1.0"] },
    ],
  },
  {
    id: "general",
    title: "General Settings",
    description: "Application-wide configuration",
    icon: Sliders,
    fields: [
      { label: "Language", value: "English", type: "select", options: ["English", "Spanish", "French", "German", "Japanese"] },
      { label: "Confidence Threshold", value: "70%", type: "select", options: ["50%", "60%", "70%", "80%", "90%"] },
      { label: "Answer Style", value: "Detailed", type: "select", options: ["Concise", "Balanced", "Detailed"] },
      { label: "Max Retrieval Documents", value: "3", type: "select", options: ["1", "3", "5", "10"] },
    ],
  },
]

export default function SettingsPage() {
  return (
    <div className="container-page py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-sm text-muted mt-1">Configure your AI knowledge engineering workspace</p>
        </div>
        <Button>
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>

      <div className="space-y-6 max-w-3xl">
        {settingsSections.map((section) => (
          <Card key={section.id}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.fields.map((field) => (
                  <div key={field.label}>
                    <label className="text-sm font-medium mb-1.5 block">{field.label}</label>
                    <select
                      className="w-full px-3 py-2 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
                      defaultValue={field.value}
                    >
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Danger Zone */}
        <Card className="border-red-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <Shield className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <CardTitle className="text-red-600">Danger Zone</CardTitle>
                <CardDescription>Irreversible actions</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 rounded-xl border border-red-200 bg-red-50/50">
              <div>
                <p className="text-sm font-medium">Reset All Knowledge Bases</p>
                <p className="text-xs text-muted">This will delete all documents, chunks and embeddings</p>
              </div>
              <Button variant="danger" size="sm">
                <RefreshCw className="w-4 h-4" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
