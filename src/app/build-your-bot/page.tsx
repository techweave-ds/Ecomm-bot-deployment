"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/input"
import {
  Upload, FileText, X, Send, Bot, User, Loader2,
  CheckCircle, Key, Eye, EyeOff, Zap, MessageSquare,
  Trash2, Download, Info, AlertCircle,
  Hash, BarChart3, ArrowLeft, HelpCircle, BookOpen,
  Shield, Clock, Lightbulb, FileUp,
} from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  intent?: string
  timestamp: Date
  chunks?: string[]
}

interface KBChunk {
  text: string
  index: number
}

const STOPWORDS = new Set([
  "the","a","an","is","are","was","were","be","been","being","have","has","had",
  "do","does","did","will","would","could","should","to","of","in","on","at","by",
  "for","with","about","into","from","and","or","but","if","as","it","its","this",
  "that","these","those","i","you","he","she","we","they","me","him","her","us",
  "them","my","your","his","our","their","what","how","when","where","who","which",
])

function tokenize(text: string): string[] {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(w => w.length > 2 && !STOPWORDS.has(w))
}

function searchChunks(query: string, chunks: KBChunk[], topK = 4): KBChunk[] {
  if (!chunks.length) return []
  const qw = tokenize(query)
  const scored = chunks.map(chunk => {
    const cw = tokenize(chunk.text)
    let score = 0
    for (const word of qw) {
      const tf = cw.filter(w => w === word).length / (cw.length || 1)
      const df = chunks.filter(c => tokenize(c.text).includes(word)).length
      const idf = df > 0 ? Math.log(chunks.length / df) : 0
      score += tf * idf
    }
    return { ...chunk, score }
  })
  return scored.sort((a, b) => (b as typeof b & { score: number }).score - (a as typeof a & { score: number }).score).slice(0, topK).filter((s) => (s as typeof s & { score: number }).score > 0)
}

function classifyIntent(query: string): string {
  const q = query.toLowerCase()
  if (/password|login|account|register|sign.?in/.test(q)) return "Account"
  if (/track|order|ship|delivery|deliver|when.*arriv/.test(q)) return "Delivery"
  if (/return|refund|exchange|money.?back/.test(q)) return "Returns"
  if (/cancel|change.*order|modify/.test(q)) return "Cancellation"
  if (/pay|payment|card|cash|cod/.test(q)) return "Payment"
  if (/product|item|size|color|available/.test(q)) return "Product Info"
  if (/warrant|defect|fault|broken|damage/.test(q)) return "Warranty"
  return "General"
}

function chunkText(text: string): KBChunk[] {
  const sentences = text.split(/(?<=[.?!])\s+/)
  const result: KBChunk[] = []
  let current = ""
  let idx = 0
  for (const s of sentences) {
    if ((current + s).length > 500 && current.length > 0) {
      result.push({ text: current.trim(), index: idx++ })
      const words = current.split(" ")
      current = words.slice(-10).join(" ") + " "
    }
    current += s + " "
  }
  if (current.trim()) result.push({ text: current.trim(), index: idx })
  return result
}

const QUICK_QUESTIONS = [
  "How do I track my order?",
  "What is the return policy?",
  "How do I reset my password?",
  "What payment methods are accepted?",
  "How long does shipping take?",
  "Can I cancel my order?",
]

const helpSteps = [
  { icon: Key, title: "Step 1: Add Your API Key", description: "Get a free Groq API key from console.groq.com and paste it above. Your key stays in your browser — we never see it." },
  { icon: FileUp, title: "Step 2: Upload a PDF", description: "Drop a PDF (up to 5MB) or click to browse. We support policies, manuals, FAQs — any document your bot should know." },
  { icon: Zap, title: "Step 3: Process & Index", description: "Click 'Process Document'. PDF.js extracts the text in your browser, then it's chunked and indexed with TF-IDF — all client-side." },
  { icon: MessageSquare, title: "Step 4: Ask Questions", description: "Your knowledge base is ready. Ask anything — the bot retrieves the most relevant chunks and answers via Groq's free LLM." },
]

export default function BuildBotPage() {
  const [apiKey, setApiKey] = useState("")
  const [showKey, setShowKey] = useState(false)
  const [keySaved, setKeySaved] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [kbChunks, setKbChunks] = useState<KBChunk[]>([])
  const [processing, setProcessing] = useState(false)
  const [processProgress, setProcessProgress] = useState(0)
  const [processStage, setProcessStage] = useState("")
  const [kbReady, setKbReady] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [sending, setSending] = useState(false)
  const [activeTab, setActiveTab] = useState<"chat" | "chunks" | "logs">("chat")
  const [stats, setStats] = useState({ queries: 0, resolved: 0 })
  const [logs, setLogs] = useState<{ time: string; intent: string; query: string; response: string }[]>([])
  const [showHelp, setShowHelp] = useState(false)
  const [firstVisit, setFirstVisit] = useState(true)
  const fileRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem("builder_groq_key")
    if (saved) { setApiKey(saved); setKeySaved(true) }
    const savedLogs = localStorage.getItem("builder_logs")
    if (savedLogs) setLogs(JSON.parse(savedLogs))
    const visited = localStorage.getItem("builder_visited")
    if (visited) setFirstVisit(false)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const dismissFirstVisit = () => {
    setFirstVisit(false)
    localStorage.setItem("builder_visited", "true")
  }

  const saveKey = () => {
    if (!apiKey.startsWith("gsk_")) { setError("Key must start with gsk_"); return }
    localStorage.setItem("builder_groq_key", apiKey)
    setKeySaved(true)
    setError("")
  }

  const handleFileSelect = (f: File) => {
    if (!f.name.endsWith(".pdf")) { setError("PDF only"); return }
    if (f.size > 5 * 1024 * 1024) { setError("Max 5MB"); return }
    setFile(f)
    setKbReady(false)
    setKbChunks([])
    setError("")
  }

  const processDocument = async () => {
    if (!file) return
    setProcessing(true)
    setProcessProgress(0)
    setError("")

    try {
      setProcessStage("Loading PDF parser...")
      setProcessProgress(10)

      if (!(window as Window & { pdfjsLib?: unknown }).pdfjsLib) {
        await new Promise<void>((res, rej) => {
          const s = document.createElement("script")
          s.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"
          s.onload = () => res()
          s.onerror = () => rej(new Error("Failed to load PDF.js"))
          document.head.appendChild(s)
        })
        const pdfjs = (window as Window & { pdfjsLib?: { GlobalWorkerOptions: { workerSrc: string } } }).pdfjsLib
        if (pdfjs) {
          pdfjs.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"
        }
      }

      setProcessStage("Extracting text...")
      setProcessProgress(30)

      const ab = await file.arrayBuffer()
      const pdfjs = (window as Window & { pdfjsLib?: { getDocument: (opts: { data: ArrayBuffer }) => { promise: Promise<{ numPages: number; getPage: (n: number) => Promise<{ getTextContent: () => Promise<{ items: Array<{ str: string }> }> }> }> } } }).pdfjsLib
      if (!pdfjs) throw new Error("PDF.js not loaded")
      const pdf = await pdfjs.getDocument({ data: ab }).promise
      let fullText = ""
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const content = await page.getTextContent()
        fullText += content.items.map((it) => it.str).join(" ") + "\n\n"
        setProcessProgress(30 + Math.floor((i / pdf.numPages) * 40))
      }

      setProcessStage("Chunking text...")
      setProcessProgress(75)
      const chunks = chunkText(fullText.trim())

      setProcessStage("Indexing chunks...")
      setProcessProgress(95)
      await new Promise(r => setTimeout(r, 300))

      setKbChunks(chunks)
      setKbReady(true)
      setProcessProgress(100)
      setProcessStage("Ready!")

      setMessages([{
        id: "welcome",
        role: "assistant",
        content: `Knowledge base loaded from **${file.name}** — ${chunks.length} chunks indexed. Ask me anything about your document!`,
        timestamp: new Date(),
      }])
    } catch (e) {
      setError(`Processing failed: ${(e as Error).message}`)
    } finally {
      setProcessing(false)
    }
  }

  const sendMessage = useCallback(async () => {
    if (!input.trim() || sending) return
    if (!keySaved) { setError("Save your API key first"); return }
    if (!kbReady) { setError("Process a document first"); return }

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setSending(true)
    setError("")

    const intent = classifyIntent(userMsg.content)
    const relevant = searchChunks(userMsg.content, kbChunks, 4)
    const context = relevant.map(c => c.text).join("\n\n---\n\n")

    const systemPrompt = `You are a helpful customer support assistant. Answer ONLY from the provided context. If the answer is not in the context, say: "I don't have that information in my knowledge base." Be concise and clear. 2-3 sentences max.`
    const userPrompt = context
      ? `Context:\n\n${context}\n\nQuestion: ${userMsg.content}`
      : userMsg.content

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          max_tokens: 1000,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        }),
      })

      const data = await res.json()
      if (data.error) throw new Error(data.error.message || "API error")

      const answer = data.choices[0].message.content
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: answer,
        intent,
        timestamp: new Date(),
        chunks: relevant.slice(0, 2).map(c => c.text.slice(0, 80) + "..."),
      }
      setMessages(prev => [...prev, botMsg])

      const isResolved = !answer.includes("don't have that information")
      setStats(s => ({ queries: s.queries + 1, resolved: s.resolved + (isResolved ? 1 : 0) }))

      const log = {
        time: new Date().toISOString(),
        intent,
        query: userMsg.content,
        response: answer,
      }
      setLogs(prev => {
        const next = [log, ...prev].slice(0, 100)
        localStorage.setItem("builder_logs", JSON.stringify(next))
        return next
      })
    } catch (e) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `⚠ Error: ${(e as Error).message}. Check your API key.`,
        timestamp: new Date(),
      }])
    } finally {
      setSending(false)
    }
  }, [input, sending, keySaved, kbReady, kbChunks, apiKey])

  const exportLogs = () => {
    if (!logs.length) return
    const csv = ["Timestamp,Intent,Query,Response", ...logs.map(l =>
      `"${l.time}","${l.intent}","${l.query.replace(/"/g, '""')}","${l.response.replace(/"/g, '""')}"`
    )].join("\n")
    const a = document.createElement("a")
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }))
    a.download = `support-bot-logs-${Date.now()}.csv`
    a.click()
  }

  const clearChat = () => {
    setMessages([])
    setStats({ queries: 0, resolved: 0 })
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur-md">
        <div className="container-page flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 font-semibold text-sm">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white text-xs font-bold">K</span>
            </div>
            <span>KnowledgeOS</span>
            <span className="text-muted text-xs hidden sm:inline">/ Build Your Bot</span>
          </Link>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowHelp(true)}
              className="text-xs text-muted hover:text-foreground transition-colors flex items-center gap-1 p-2 rounded-lg hover:bg-gray-100">
              <HelpCircle className="w-3.5 h-3.5" /> Help
            </button>
            <Link href="/" className="text-xs text-muted hover:text-foreground transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Back
            </Link>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {firstVisit && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl border border-border max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">Welcome to the Builder</h2>
                    <p className="text-sm text-muted">Build your AI assistant in 4 steps</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {helpSteps.map((step, i) => {
                    const Icon = step.icon
                    return (
                      <div key={i} className="flex gap-3 p-3 rounded-xl bg-gray-50 border border-border">
                        <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold mb-0.5">{step.title}</h4>
                          <p className="text-xs text-muted leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-5 p-3 rounded-xl bg-blue-50 border border-blue-200 flex gap-2 text-xs text-blue-700">
                  <Shield className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <strong>Privacy:</strong> Everything runs in your browser. Your documents and API key never leave your machine. No data stored on servers.
                  </div>
                </div>
                <Button onClick={dismissFirstVisit} size="lg" className="w-full mt-5">
                  Got It — Let&apos;s Build
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showHelp && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl border border-border max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold">How It Works</h2>
                      <p className="text-sm text-muted">Your guide to building an AI assistant</p>
                    </div>
                  </div>
                  <button onClick={() => setShowHelp(false)} className="p-1.5 rounded-lg hover:bg-gray-100">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  {helpSteps.map((step, i) => {
                    const Icon = step.icon
                    return (
                      <div key={i} className="flex gap-3 p-3 rounded-xl bg-gray-50 border border-border">
                        <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold mb-0.5">{step.title}</h4>
                          <p className="text-xs text-muted leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-semibold">Tips & Notes</h4>
                  <div className="flex items-start gap-2 text-xs text-muted">
                    <Clock className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary" />
                    <span>Processing time depends on document size. A 50-page PDF takes ~5-10 seconds.</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-muted">
                    <FileText className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary" />
                    <span>Best results with clear, text-based PDFs (not scanned images). Max 5MB file size.</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-muted">
                    <Shield className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary" />
                    <span>Everything runs client-side. Your data is never sent to any server except Groq for AI responses.</span>
                  </div>
                </div>
                <Button onClick={() => setShowHelp(false)} variant="outline" size="lg" className="w-full mt-5">
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={() => setShowHelp(true)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-primary text-white shadow-lg hover:bg-primary-dark transition-all flex items-center justify-center">
        <HelpCircle className="w-5 h-5" />
      </button>

      <div className="container-page py-6 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Build Your Own Assistant</h1>
            <p className="text-sm text-muted mt-1">Upload a PDF, configure Groq AI, and test your chatbot — all free, all in your browser</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={kbReady ? "success" : "outline"} className="gap-1.5 py-1">
              {kbReady ? <><CheckCircle className="w-3 h-3" /> Ready</> : <><AlertCircle className="w-3 h-3" /> Not ready</>}
            </Badge>
          </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
              <button onClick={() => setError("")} className="ml-auto"><X className="w-4 h-4" /></button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-[300px_1fr] gap-6">
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Key className="w-4 h-4 text-primary" /> Groq API Key
                  <Badge variant="success" className="text-[10px] ml-auto py-0.5">Free</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="relative">
                  <input
                    type={showKey ? "text" : "password"}
                    value={apiKey}
                    onChange={e => setApiKey(e.target.value)}
                    placeholder="gsk_..."
                    className="w-full text-xs font-mono pr-8 pl-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <button onClick={() => setShowKey(!showKey)} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-foreground">
                    {showKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <Button onClick={saveKey} size="sm" className="w-full" variant={keySaved ? "outline" : "primary"}>
                  {keySaved ? <><CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Key Saved</> : "Save Key"}
                </Button>
                <p className="text-[11px] text-muted leading-relaxed">
                  Get a free key at{" "}
                  <a href="https://console.groq.com" target="_blank" rel="noreferrer" className="text-primary hover:underline">console.groq.com</a>
                  {" "}→ API Keys → Create
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-accent" /> Knowledge Base
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div
                  onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-border rounded-xl p-4 text-center cursor-pointer hover:border-primary hover:bg-primary-light/20 transition-all"
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFileSelect(f) }}
                >
                  <Upload className="w-6 h-6 mx-auto mb-2 text-muted" />
                  <p className="text-xs font-medium">Drop PDF here</p>
                  <p className="text-[11px] text-muted mt-0.5">or click to browse · Max 5MB</p>
                </div>
                <input ref={fileRef} type="file" accept=".pdf" className="hidden" onChange={e => e.target.files?.[0] && handleFileSelect(e.target.files[0])} />

                {file && (
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-700">
                    <FileText className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate flex-1">{file.name}</span>
                    <button onClick={() => { setFile(null); setKbReady(false); setKbChunks([]) }}><X className="w-3.5 h-3.5" /></button>
                  </div>
                )}

                {processing && (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted">{processStage}</span>
                      <span className="font-medium">{processProgress}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                        animate={{ width: `${processProgress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                )}

                <Button
                  onClick={processDocument}
                  disabled={!file || processing || kbReady}
                  size="sm"
                  className="w-full"
                  variant={kbReady ? "outline" : "secondary"}
                >
                  {processing ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Processing...</> :
                    kbReady ? <><CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> {kbChunks.length} chunks indexed</> :
                      <><Zap className="w-3.5 h-3.5" /> Process Document</>}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" /> Quick Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1.5 p-4 pt-0">
                {QUICK_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => { setInput(q); setActiveTab("chat") }}
                    disabled={!kbReady}
                    className="w-full text-left text-xs p-2 rounded-lg border border-border hover:border-primary hover:bg-primary-light/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {q}
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-primary" /> Session Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Queries", value: stats.queries, color: "text-primary" },
                    { label: "Resolved", value: stats.resolved, color: "text-emerald-600" },
                    { label: "Chunks", value: kbChunks.length, color: "text-amber-600" },
                    { label: "Logs", value: logs.length, color: "text-purple-600" },
                  ].map(s => (
                    <div key={s.label} className="p-2.5 rounded-lg bg-gray-50 border border-border text-center">
                      <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                      <p className="text-[10px] text-muted uppercase tracking-wide">{s.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col min-h-[70vh]">
            <div className="flex items-center gap-2 mb-4">
              {[
                { id: "chat" as const, label: "Chat", icon: MessageSquare },
                { id: "chunks" as const, label: `Chunks (${kbChunks.length})`, icon: Hash },
                { id: "logs" as const, label: `Logs (${logs.length})`, icon: BarChart3 },
              ].map(tab => (
                <Button key={tab.id} variant={activeTab === tab.id ? "primary" : "outline"} size="sm" onClick={() => setActiveTab(tab.id)}>
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </Button>
              ))}
              <div className="ml-auto flex gap-2">
                {activeTab === "chat" && messages.length > 0 && (
                  <Button variant="outline" size="sm" onClick={clearChat}>
                    <Trash2 className="w-3.5 h-3.5" /> Clear
                  </Button>
                )}
                {activeTab === "logs" && logs.length > 0 && (
                  <Button variant="outline" size="sm" onClick={exportLogs}>
                    <Download className="w-3.5 h-3.5" /> Export CSV
                  </Button>
                )}
              </div>
            </div>

            <Card className="flex-1 flex flex-col overflow-hidden">
              {activeTab === "chat" && (
                <>
                  <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-[400px] max-h-[550px]">
                    {messages.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center py-12">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                          <Bot className="w-7 h-7 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-1">Your Assistant is ready</h3>
                        <p className="text-sm text-muted max-w-xs">
                          {!keySaved ? "Save your Groq API key to start" :
                            !kbReady ? "Upload and process a PDF to build your knowledge base" :
                              "Ask anything about your document"}
                        </p>
                        {kbReady && (
                          <div className="flex flex-wrap gap-2 mt-4 justify-center">
                            {QUICK_QUESTIONS.slice(0, 4).map((q, i) => (
                              <button key={i} onClick={() => setInput(q)}
                                className="text-xs px-3 py-1.5 rounded-lg border border-border hover:border-primary hover:bg-primary-light/30 transition-all">
                                {q}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        {messages.map(msg => (
                          <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                            className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${msg.role === "user" ? "bg-primary text-white" : "bg-accent/15 text-accent"}`}>
                              {msg.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                            </div>
                            <div className={`max-w-[75%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                              <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${msg.role === "user" ? "bg-primary text-white rounded-tr-sm" : "bg-gray-50 border border-border rounded-tl-sm"}`}>
                                {msg.content.replace(/\*\*(.*?)\*\*/g, "$1")}
                              </div>
                              <div className="flex items-center gap-2 px-1">
                                {msg.intent && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary-light text-primary font-medium">{msg.intent}</span>
                                )}
                                <span className="text-[10px] text-muted">
                                  {msg.timestamp.toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" })}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                        {sending && (
                          <div className="flex gap-3">
                            <div className="w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center">
                              <Bot className="w-3.5 h-3.5 text-accent" />
                            </div>
                            <div className="bg-gray-50 border border-border rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                              {[0, 1, 2].map(i => (
                                <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-primary"
                                  animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }} />
                              ))}
                            </div>
                          </div>
                        )}
                        <div ref={messagesEndRef} />
                      </>
                    )}
                  </div>

                  <div className="border-t border-border p-4">
                    <div className="flex gap-3 items-end">
                      <Textarea
                        placeholder={kbReady ? "Ask about your document..." : "Process a document first..."}
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
                        autoExpand
                        disabled={!kbReady || !keySaved}
                        className="flex-1"
                      />
                      <Button onClick={sendMessage} disabled={!input.trim() || sending || !kbReady || !keySaved} className="shrink-0">
                        {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      </Button>
                    </div>
                    <p className="text-[11px] text-muted mt-2">Press Enter to send · Shift+Enter for new line · Powered by Groq (free)</p>
                  </div>
                </>
              )}

              {activeTab === "chunks" && (
                <div className="flex-1 overflow-y-auto p-6">
                  {kbChunks.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-12">
                      <Hash className="w-10 h-10 text-muted mb-3" />
                      <p className="text-sm text-muted">No chunks yet. Process a document first.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-sm text-muted">{kbChunks.length} chunks indexed from <strong>{file?.name}</strong></p>
                      </div>
                      {kbChunks.map((chunk, i) => (
                        <div key={i} className="p-4 rounded-xl border border-border hover:border-primary/30 transition-all">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-[10px]">Chunk {i + 1}</Badge>
                            <span className="text-[11px] text-muted">{chunk.text.split(" ").length} words</span>
                          </div>
                          <p className="text-xs text-muted leading-relaxed line-clamp-4">{chunk.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "logs" && (
                <div className="flex-1 overflow-y-auto p-6">
                  {logs.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-12">
                      <BarChart3 className="w-10 h-10 text-muted mb-3" />
                      <p className="text-sm text-muted">No logs yet. Start chatting!</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {logs.map((log, i) => (
                        <div key={i} className="p-4 rounded-xl border border-border font-mono text-xs space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-muted">{new Date(log.time).toLocaleString()}</span>
                            <Badge variant="default" className="text-[10px] py-0">{log.intent}</Badge>
                          </div>
                          <p className="font-medium text-foreground">Q: {log.query}</p>
                          <p className="text-muted line-clamp-2">A: {log.response}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200 text-sm text-blue-700">
          <Info className="w-4 h-4 mt-0.5 shrink-0" />
          <div>
            <strong>100% Free Stack:</strong> Groq free tier (14,400 req/day) + PDF.js (browser) + TF-IDF search (client-side) + hosted on Cloudflare Pages. No backend, no database, no monthly cost.
            Everything runs in your browser — your data stays yours.
          </div>
        </div>
      </div>
    </div>
  )
}
