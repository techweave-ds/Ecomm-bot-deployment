"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import {
  Database, Brain, Shield, Sliders, Save, RefreshCw, CheckCircle, AlertTriangle,
} from "lucide-react"

const DEFAULT_SETTINGS = {
  embeddingModel: "BGE Large",
  dimensions: "1024",
  chunkSize: "256 tokens",
  chunkOverlap: "32 tokens",
  vectorDb: "Qdrant",
  distanceMetric: "Cosine",
  topK: "5",
  similarityThreshold: "0.75",
  llmModel: "llama-3.1-8b-instant",
  temperature: "0.1",
  maxTokens: "1024",
  topP: "0.95",
  language: "English",
  confidenceThreshold: "70%",
  answerStyle: "Detailed",
  maxRetrievalDocs: "3",
}

type Settings = typeof DEFAULT_SETTINGS

const STORAGE_KEY = "techweave_settings"

function loadSavedSettings(): Settings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) }
    }
  } catch { /* ignore */ }
  return DEFAULT_SETTINGS
}
function Field({ label, stKey, options, value, onChange }: { label: string; stKey: keyof Settings; options: string[]; value: string; onChange: (key: keyof Settings, value: string) => void }) {
  return (
    <div>
      <label className="text-sm font-medium mb-1.5 block">{label}</label>
      <select
        value={value}
        onChange={e => onChange(stKey, e.target.value)}
        className="w-full px-3 py-2 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  )
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(loadSavedSettings)
  const [saved, setSaved] = useState(false)
  const [resetConfirm, setResetConfirm] = useState(false)
  const [dirty, setDirty] = useState(false)

  const update = (key: keyof Settings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    setDirty(true)
    setSaved(false)
  }

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    setDirty(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const resetAll = () => {
    if (!resetConfirm) { setResetConfirm(true); return }
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem("builder_groq_key")
    localStorage.removeItem("builder_logs")
    localStorage.removeItem("supportai_groq_key")
    localStorage.removeItem("supportai_logs")
    setSettings(DEFAULT_SETTINGS)
    setResetConfirm(false)
    setDirty(false)
    setSaved(false)
  }

  return (
    <div className="container-page py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-sm text-muted mt-1">Configure your AI knowledge engineering workspace</p>
        </div>
        <div className="flex items-center gap-3">
          <AnimatePresence>
            {saved && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 text-sm text-emerald-600 font-medium">
                <CheckCircle className="w-4 h-4" /> Saved!
              </motion.div>
            )}
          </AnimatePresence>
          <Button onClick={save} variant={dirty ? "primary" : "outline"}>
            <Save className="w-4 h-4" />
            {dirty ? "Save Changes*" : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="space-y-6 max-w-3xl">
        {/* Embedding */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle>Embedding Model</CardTitle>
                <CardDescription>Configure the embedding model for document vectorization</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Model" stKey="embeddingModel" value={settings.embeddingModel} onChange={update} options={["BGE Large", "OpenAI text-embedding-3", "Cohere embed-english", "sentence-transformers/all-MiniLM-L6-v2"]} />
              <Field label="Dimensions" stKey="dimensions" value={settings.dimensions} onChange={update} options={["384", "768", "1024", "1536", "3072"]} />
              <Field label="Chunk Size" stKey="chunkSize" value={settings.chunkSize} onChange={update} options={["128 tokens", "256 tokens", "512 tokens", "1024 tokens"]} />
              <Field label="Chunk Overlap" stKey="chunkOverlap" value={settings.chunkOverlap} onChange={update} options={["0 tokens", "16 tokens", "32 tokens", "64 tokens", "128 tokens"]} />
            </div>
          </CardContent>
        </Card>

        {/* Vector DB */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center">
                <Database className="w-5 h-5 text-accent" />
              </div>
              <div>
                <CardTitle>Vector Database</CardTitle>
                <CardDescription>Configure the vector storage backend</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Database" stKey="vectorDb" value={settings.vectorDb} onChange={update} options={["Qdrant", "Pinecone", "Weaviate", "Chroma", "pgvector"]} />
              <Field label="Distance Metric" stKey="distanceMetric" value={settings.distanceMetric} onChange={update} options={["Cosine", "Euclidean", "Dot Product"]} />
              <Field label="Top-K Retrieval" stKey="topK" value={settings.topK} onChange={update} options={["3", "5", "10", "20"]} />
              <Field label="Similarity Threshold" stKey="similarityThreshold" value={settings.similarityThreshold} onChange={update} options={["0.5", "0.6", "0.75", "0.85", "0.9"]} />
            </div>
          </CardContent>
        </Card>

        {/* LLM */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle>LLM Configuration</CardTitle>
                <CardDescription>Configure the language model for answer generation</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Model" stKey="llmModel" value={settings.llmModel} onChange={update} options={["llama-3.1-8b-instant", "llama-3.3-70b-versatile", "gemma2-9b-it", "DeepSeek v3", "Claude Sonnet 4", "GPT-4o"]} />
              <Field label="Temperature" stKey="temperature" value={settings.temperature} onChange={update} options={["0.0", "0.1", "0.3", "0.5", "0.7", "1.0"]} />
              <Field label="Max Tokens" stKey="maxTokens" value={settings.maxTokens} onChange={update} options={["256", "512", "1024", "2048", "4096"]} />
              <Field label="Top-P" stKey="topP" value={settings.topP} onChange={update} options={["0.8", "0.9", "0.95", "1.0"]} />
            </div>
          </CardContent>
        </Card>

        {/* General */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <Sliders className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Application-wide configuration</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Language" stKey="language" value={settings.language} onChange={update} options={["English", "Spanish", "French", "German", "Japanese", "Hindi"]} />
              <Field label="Confidence Threshold" stKey="confidenceThreshold" value={settings.confidenceThreshold} onChange={update} options={["50%", "60%", "70%", "80%", "90%"]} />
              <Field label="Answer Style" stKey="answerStyle" value={settings.answerStyle} onChange={update} options={["Concise", "Balanced", "Detailed"]} />
              <Field label="Max Retrieval Documents" stKey="maxRetrievalDocs" value={settings.maxRetrievalDocs} onChange={update} options={["1", "3", "5", "10"]} />
            </div>
          </CardContent>
        </Card>

        {/* Current values preview */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-sm">Active Configuration</CardTitle>
            <CardDescription>Current settings in effect</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "LLM", value: settings.llmModel },
                { label: "Chunk Size", value: settings.chunkSize },
                { label: "Top-K", value: settings.topK },
                { label: "Answer Style", value: settings.answerStyle },
              ].map(item => (
                <div key={item.label} className="p-3 rounded-xl bg-gray-50 border border-border">
                  <p className="text-[10px] text-muted uppercase tracking-wide mb-1">{item.label}</p>
                  <p className="text-sm font-semibold truncate">{item.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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
                <p className="text-sm font-medium">Reset All Data</p>
                <p className="text-xs text-muted">Clears all settings, API keys, logs, and knowledge bases</p>
              </div>
              <Button variant="danger" size="sm" onClick={resetAll}>
                {resetConfirm
                  ? <><AlertTriangle className="w-3.5 h-3.5" /> Confirm Reset</>
                  : <><RefreshCw className="w-3.5 h-3.5" /> Reset</>}
              </Button>
            </div>
            {resetConfirm && (
              <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Click again to confirm. This cannot be undone.
                <button className="underline ml-2" onClick={() => setResetConfirm(false)}>Cancel</button>
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
