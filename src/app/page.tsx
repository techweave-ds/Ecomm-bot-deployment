"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  ArrowRight, CheckCircle2, AlertTriangle, Search,
  Target, Zap, Sparkles, FileText, Upload, BrainCircuit,
  MessageSquare, XCircle, FileSearch, DollarSign, Users,
} from "lucide-react"
import { SiteShell } from "@/components/marketing/site-shell"
import { fadeInUp } from "@/lib/animations"

const stages = [
  { icon: Upload, label: "Documents", color: "#2563EB" },
  { icon: BrainCircuit, label: "Processing", color: "#14B8A6" },
  { icon: Search, label: "Retrieval", color: "#8B5CF6" },
  { icon: MessageSquare, label: "AI Assistant", color: "#2563EB" },
  { icon: CheckCircle2, label: "Verified Answer", color: "#10B981" },
]

function Hero() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % stages.length), 1400)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-light/50 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-5 bg-primary-light text-primary">
            <Sparkles className="w-3 h-3" />
            The OS for Enterprise Knowledge
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
            Your AI Is Only As Good As
            <span className="text-primary block mt-2">The Knowledge Behind It</span>
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
            Upload your documents, policies, and expertise. Get a source-backed AI assistant
            your team can trust — with citations, not hallucinations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Button size="lg" asChild>
              <a href="/build-your-bot">Build Your Bot <ArrowRight className="w-4 h-4" /></a>
            </Button>
            <Button variant="outline" size="lg" className="border-primary/30 bg-white/80" asChild>
              <a href="/demo">See How It Works</a>
            </Button>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative flex items-center justify-between gap-2">
              {stages.map((s, i) => {
                const Icon = s.icon
                const isActive = i === active
                const isPast = i < active
                return (
                  <div key={s.label} className="flex flex-col items-center flex-1 relative">
                    {i > 0 && (
                      <div className={`absolute top-5 -left-1/2 w-full h-0.5 hidden md:block transition-colors duration-500 ${isPast || isActive ? "bg-primary/30" : "bg-gray-200"}`} />
                    )}
                    <div
                      className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-2.5 transition-all duration-500 relative z-10 ${isActive ? "bg-primary shadow-lg shadow-primary/25 scale-110" : isPast ? "bg-primary/10" : "bg-gray-100"}`}
                    >
                      <Icon className={`w-5 h-5 md:w-6 md:h-6 transition-colors duration-500 ${isActive ? "text-white" : isPast ? "text-primary" : "text-muted"}`} />
                    </div>
                    <span className={`text-[10px] md:text-xs font-medium transition-colors duration-500 ${isActive ? "text-foreground font-semibold" : "text-muted"}`}>{s.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const problems = [
  { icon: FileSearch, title: "Missing Knowledge", desc: "Critical documents and expertise are scattered across silos. Your AI can't retrieve what was never documented.", color: "#EF4444" },
  { icon: Search, title: "Poor Retrieval", desc: "Even when knowledge exists, traditional search retrieves the wrong context — leading to irrelevant or incomplete answers.", color: "#F59E0B" },
  { icon: AlertTriangle, title: "Hallucinations", desc: "Without grounding, LLMs fabricate answers confidently. One hallucinated response can erode trust and create compliance risks.", color: "#EF4444" },
  { icon: XCircle, title: "Black Box Systems", desc: "No visibility into why answers were generated. No citations, no audit trail, no way to debug or improve.", color: "#8B5CF6" },
]

function ProblemSection() {
  return (
    <section className="py-20 md:py-28 bg-gray-50/60">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div className="text-center max-w-2xl mx-auto mb-14" {...fadeInUp}>
          <div className="section-label">Why Enterprise AI Fails</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Enterprise Knowledge Is Broken</h2>
          <p className="text-muted leading-relaxed">Most organizations deploy AI without knowing if their knowledge is complete, accurate, or even retrievable.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {problems.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
              <div className="p-6 rounded-xl bg-white border border-border h-full hover:shadow-md transition-all group">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${p.color}15` }}>
                  <p.icon className="w-5 h-5" style={{ color: p.color }} />
                </div>
                <h3 className="font-semibold text-sm mb-2">{p.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const comparison = [
  { feature: "Source-backed answers", kb: false, chatbot: false, rag: false, kos: true },
  { feature: "Knowledge validation", kb: false, chatbot: false, rag: false, kos: true },
  { feature: "Retrieval transparency", kb: false, chatbot: false, rag: false, kos: true },
  { feature: "Answer confidence scoring", kb: false, chatbot: false, rag: false, kos: true },
  { feature: "Hallucination prevention", kb: false, chatbot: false, rag: false, kos: true },
  { feature: "Audit trail & compliance", kb: true, chatbot: false, rag: false, kos: true },
  { feature: "No-code setup", kb: false, chatbot: true, rag: true, kos: true },
  { feature: "Enterprise security", kb: true, chatbot: false, rag: false, kos: true },
]

function ComparisonSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div className="text-center max-w-2xl mx-auto mb-14" {...fadeInUp}>
          <div className="section-label">Why Existing Solutions Fall Short</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Traditional Tools Can&apos;t Keep Up</h2>
          <p className="text-muted leading-relaxed">Knowledge bases, chatbots, and basic RAG each solve one piece. KnowledgeOS solves all of them.</p>
        </motion.div>
        <div className="max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 pr-4 font-semibold text-foreground">Feature</th>
                <th className="text-center py-3 px-3 font-medium text-muted">Knowledge Base</th>
                <th className="text-center py-3 px-3 font-medium text-muted">Chatbot</th>
                <th className="text-center py-3 px-3 font-medium text-muted">Basic RAG</th>
                <th className="text-center py-3 px-3 font-semibold text-primary">KnowledgeOS</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, i) => (
                <motion.tr key={row.feature} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                  className="border-b border-border/50">
                  <td className="py-3 pr-4 text-foreground">{row.feature}</td>
                  {[row.kb, row.chatbot, row.rag, row.kos].map((supported, j) => (
                    <td key={j} className={`text-center py-3 px-3 ${j === 3 ? "bg-primary-light/30" : ""}`}>
                      {supported ? (
                        <CheckCircle2 className="w-4 h-4 mx-auto text-emerald-500" />
                      ) : (
                        <XCircle className="w-4 h-4 mx-auto text-red-300" />
                      )}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

const pillars = [
  { icon: Target, title: "Understand", color: "#2563EB", items: ["Map your knowledge landscape", "See exactly which sources are retrieved", "Understand chunk-level retrieval decisions", "Visualize knowledge relationships and gaps"] },
  { icon: Search, title: "Validate", color: "#14B8A6", items: ["Ground every response in actual documents", "Get confidence and grounding scores", "Identify hallucinated or unsupported claims", "Audit the full answer journey"] },
  { icon: Zap, title: "Optimize", color: "#8B5CF6", items: ["Detect and fill knowledge gaps proactively", "Track retrieval quality over time", "Adjust chunking and embedding strategies", "Measure and improve answer quality"] },
]

function PillarsSection() {
  return (
    <section className="py-20 md:py-28 bg-gray-50/60">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div className="text-center max-w-2xl mx-auto mb-14" {...fadeInUp}>
          <div className="section-label">The KnowledgeOS Platform</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Understand. Validate. Optimize.</h2>
          <p className="text-muted leading-relaxed">Three pillars that make your AI explainable, auditable, and continuously improving.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pillars.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
              <div className="p-7 rounded-xl bg-white border border-border h-full hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${p.color}15` }}>
                  <p.icon className="w-6 h-6" style={{ color: p.color }} />
                </div>
                <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                <ul className="space-y-2">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: p.color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const previewFeatures = [
  { icon: Upload, title: "Upload Any Document", desc: "PDFs, DOCX, TXT — drag and drop to build your knowledge base in seconds." },
  { icon: BrainCircuit, title: "AI Processing", desc: "Automatic chunking, embedding, and indexing optimized for your content." },
  { icon: MessageSquare, title: "Smart Chat Interface", desc: "Ask questions and get instant answers with source citations you can verify." },
  { icon: FileSearch, title: "Source Verification", desc: "Every answer includes citations, confidence scores, and grounding checks." },
]

function PreviewSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div className="text-center max-w-2xl mx-auto mb-14" {...fadeInUp}>
          <div className="section-label">See It In Action</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">What KnowledgeOS Looks Like</h2>
          <p className="text-muted leading-relaxed">A clean, powerful interface designed for both technical and non-technical teams.</p>
        </motion.div>
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden mb-10">
            <div className="flex items-center gap-1.5 px-4 py-3 bg-gray-50 border-b border-border">
              {["#EF4444", "#F59E0B", "#10B981"].map((c) => (
                <div key={c} className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />
              ))}
              <div className="ml-4 text-xs text-muted font-mono">knowledgeos.app / builder</div>
            </div>
            <div className="p-6 md:p-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-gray-50 border border-border">
                    <div className="flex items-center gap-3 mb-2">
                      <Upload className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">knowledge_base.pdf</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-gradient-to-r from-primary to-accent rounded-full" />
                    </div>
                    <p className="text-xs text-muted mt-1">2.4 MB · 47 pages · 156 chunks indexed</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Ask a question</span>
                    </div>
                    <div className="p-3 rounded-lg bg-white border border-border text-sm text-muted">
                      &ldquo;What is the return policy for enterprise customers?&rdquo;
                    </div>
                    <div className="mt-3 p-3 rounded-lg bg-primary text-white text-sm">
                      Enterprise customers receive a full refund within 30 days. After 30 days, refunds are prorated.
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-xs text-muted">
                      <FileText className="w-3 h-3" /> Source: Enterprise_Agreement_Terms.pdf (p. 4)
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {previewFeatures.map((f, i) => {
                    const Icon = f.icon
                    return (
                      <motion.div key={f.title} initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                        className="p-4 rounded-xl border border-border hover:border-primary/30 transition-all">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-lg bg-primary-light flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold mb-0.5">{f.title}</h4>
                            <p className="text-xs text-muted">{f.desc}</p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const howItWorks = [
  { step: 1, title: "Upload", desc: "Upload your documents — PDFs, policies, manuals, or knowledge base exports." },
  { step: 2, title: "Configure", desc: "Name your bot, set instructions, and customize the branding to match your company." },
  { step: 3, title: "Process", desc: "Your knowledge is automatically chunked, embedded, and indexed for retrieval." },
  { step: 4, title: "Deploy", desc: "Go live with a website widget, shareable link, or embedded assistant." },
]

function HowItWorksSection() {
  return (
    <section className="py-20 md:py-28 bg-gray-50/60">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div className="text-center max-w-2xl mx-auto mb-14" {...fadeInUp}>
          <div className="section-label">Simple 4-Step Process</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">How It Works</h2>
          <p className="text-muted leading-relaxed">From documents to deployed AI assistant in minutes. No coding required.</p>
        </motion.div>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block" />
            <div className="flex flex-col gap-6">
              {howItWorks.map((step, i) => (
                <motion.div key={step.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.12 }}
                  className="relative pl-0 md:pl-20">
                  <div className="hidden md:flex absolute left-4 top-1 w-8 h-8 rounded-full bg-primary text-white text-sm font-bold items-center justify-center border-4 border-background">
                    {step.step}
                  </div>
                  <div className="p-6 rounded-xl bg-white border border-border hover:shadow-sm transition-all">
                    <div className="flex items-center gap-3 mb-2 md:hidden">
                      <div className="w-7 h-7 rounded-lg bg-primary text-white text-xs font-bold flex items-center justify-center">{step.step}</div>
                      <h3 className="font-semibold text-foreground">{step.title}</h3>
                    </div>
                    <h3 className="font-semibold text-foreground mb-1 hidden md:block">{step.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const outcomes = [
  { icon: Zap, title: "Faster Support", desc: "Reduce resolution time from hours to seconds with instant AI responses backed by your actual knowledge.", color: "#2563EB" },
  { icon: DollarSign, title: "Lower Costs", desc: "Deflect common questions to your AI assistant, cutting ticket volume and freeing your team.", color: "#10B981" },
  { icon: FileSearch, title: "Source Transparency", desc: "Every answer backed by real sources with citations — no hallucinations, no guesswork.", color: "#8B5CF6" },
  { icon: Users, title: "Knowledge Access", desc: "Unlock the value of your documents, policies, and expertise across every department.", color: "#F59E0B" },
]

function OutcomesSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div className="text-center max-w-2xl mx-auto mb-14" {...fadeInUp}>
          <div className="section-label">Real Business Impact</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Outcomes That Matter</h2>
          <p className="text-muted leading-relaxed">Organizations using KnowledgeOS see measurable improvements across every metric.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {outcomes.map((o, i) => {
            const Icon = o.icon
            return (
              <motion.div key={o.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                <div className="p-6 rounded-xl bg-white border border-border text-center h-full hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${o.color}15` }}>
                    <Icon className="w-6 h-6" style={{ color: o.color }} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{o.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{o.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#0f172a] text-white py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div {...fadeInUp}>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Stop Guessing What Your AI Knows</h2>
          <p className="text-lg md:text-xl text-white/60 max-w-xl mx-auto mb-8 leading-relaxed">
            Upload your documents and build a source-backed AI assistant in under 5 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-white text-[#0f172a] hover:bg-white/90" asChild>
              <a href="/build-your-bot">Build Your Bot <ArrowRight className="w-4 h-4" /></a>
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10" asChild>
              <a href="/demo">See The Demo</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <ProblemSection />
      <ComparisonSection />
      <PillarsSection />
      <PreviewSection />
      <HowItWorksSection />
      <OutcomesSection />
      <CTASection />
    </SiteShell>
  )
}
