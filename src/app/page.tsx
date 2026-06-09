"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  ArrowRight, CheckCircle2, XCircle, AlertTriangle, Search,
  BarChart3, Layers, Shield, FileText,
  Database, Zap, Activity, Target, Share2,
  ChevronRight, Menu, X, ExternalLink, Sparkles,
} from "lucide-react"

// ─── Navigation ──────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-lg border-b border-border shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-sm tracking-tight">KnowledgeOS</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          {["Product", "Solutions", "Docs", "Pricing"].map((item) => (
            <a key={item} href="#" className="text-sm text-muted hover:text-foreground transition-colors">{item}</a>
          ))}
          <Button variant="outline" size="sm">Sign In</Button>
          <Button size="sm">Book a Demo</Button>
        </nav>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-border overflow-hidden">
            <div className="px-6 py-4 space-y-3">
              {["Product", "Solutions", "Docs", "Pricing"].map((item) => (
                <a key={item} href="#" className="block text-sm text-muted hover:text-foreground">{item}</a>
              ))}
              <div className="flex gap-3 pt-2">
                <Button variant="outline" size="sm" className="flex-1">Sign In</Button>
                <Button size="sm" className="flex-1">Demo</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

// ─── Section Wrapper ─────────────────────────────────────────

function Section({ id, className = "", children, dark = false }: { id?: string; className?: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <section id={id} className={`relative ${dark ? "bg-[#0f172a] text-white" : "bg-background"} ${className}`}>
      {children}
    </section>
  )
}

function Container({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`max-w-7xl mx-auto px-6 ${className}`}>{children}</div>
}

function SectionLabel({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6 ${dark ? "bg-white/10 text-white/80" : "bg-primary-light text-primary"}`}>
      {children}
    </div>
  )
}

function SectionHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${className}`}>{children}</h2>
}

function SectionSubheading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-lg text-muted max-w-2xl ${className}`}>{children}</p>
}

// ─── Hero Visual (Animated Pipeline) ─────────────────────────

function HeroPipeline() {
  const stages = [
    { label: "Documents", icon: FileText, color: "#2563EB" },
    { label: "Chunking", icon: Layers, color: "#14B8A6" },
    { label: "Embeddings", icon: Database, color: "#8B5CF6" },
    { label: "Retrieval", icon: Search, color: "#F59E0B" },
    { label: "AI Response", icon: Zap, color: "#EF4444" },
  ]
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % stages.length)
    }, 1200)
    return () => clearInterval(interval)
  }, [stages.length])

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative flex items-center justify-between gap-1 md:gap-2">
        {stages.map((stage, i) => (
          <div key={stage.label} className="flex-1 flex flex-col items-center">
            <motion.div
              animate={{
                scale: activeIndex === i ? 1.1 : 1,
                backgroundColor: activeIndex === i ? stage.color : "#E2E8F0",
              }}
              transition={{ duration: 0.3 }}
              className="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-2 shadow-lg"
            >
              <stage.icon className={`w-5 h-5 md:w-6 md:h-6 ${activeIndex === i ? "text-white" : "text-muted"}`} />
            </motion.div>
            <span className={`text-[10px] md:text-xs font-medium text-center ${activeIndex === i ? "text-foreground" : "text-muted"}`}>
              {stage.label}
            </span>
            {i < stages.length - 1 && (
              <motion.div
                animate={{ backgroundColor: activeIndex >= i ? stage.color : "#E2E8F0" }}
                className="absolute top-6 md:top-8 h-0.5 hidden md:block"
                style={{ left: `calc(${(i + 0.5) * (100 / stages.length)}% )`, width: `calc(${100 / stages.length}% )`, transform: "translateX(50%)" }}
              />
            )}
          </div>
        ))}
      </div>
      <motion.div key={activeIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 rounded-xl bg-gray-50 border border-border text-center">
        <p className="text-sm font-medium">{stages[activeIndex].label} Stage Active</p>
        <p className="text-xs text-muted mt-1">
          {activeIndex === 0 && "Extracting content from enterprise documents and knowledge sources"}
          {activeIndex === 1 && "Splitting into semantic chunks with overlap for optimal retrieval"}
          {activeIndex === 2 && "Generating vector embeddings for similarity search"}
          {activeIndex === 3 && "Retrieving top-k relevant chunks based on query similarity"}
          {activeIndex === 4 && "Generating grounded answer with source citations"}
        </p>
      </motion.div>
      {/* Trace indicators */}
      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent" /> Grounded</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary" /> Traceable</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Verifiable</span>
      </div>
    </div>
  )
}

// ─── Section 1: Hero ─────────────────────────────────────────

function Hero() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.15], [0, 50])

  return (
    <Section className="min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <motion.div style={{ opacity, y }} className="w-full">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <SectionLabel>
              <Sparkles className="w-3 h-3" />
              The Operating System for Enterprise Knowledge
            </SectionLabel>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              Your AI Is Only As Good As
              <span className="text-primary block mt-2">The Knowledge Behind It</span>
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto mb-10 leading-relaxed">
              Most organizations deploy AI assistants without understanding what their AI knows, what it doesn&apos;t know, or why it generated an answer.
              KnowledgeOS helps enterprises <strong>measure, validate, and optimize</strong> the knowledge powering their AI systems.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button size="lg" className="text-base px-8 h-12">
                Book a Demo
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg" className="text-base px-8 h-12">
                Watch Product Tour
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
            <HeroPipeline />
          </div>

          {/* Trust Bar */}
          <div className="mt-20 text-center">
            <p className="text-xs text-muted uppercase tracking-wider font-medium mb-6">Trusted by AI teams building enterprise assistants</p>
            <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap opacity-40">
              {["Enterprise Co", "DataFlow Inc", "NeuralWorks", "CloudPeak"].map((name) => (
                <div key={name} className="h-8 flex items-center">
                  <span className="text-sm font-bold text-muted tracking-tight">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </motion.div>
    </Section>
  )
}

// ─── Section 2: The Problem ──────────────────────────────────

const problems = [
  {
    icon: <FileText className="w-6 h-6" />,
    color: "#EF4444",
    bg: "#FEF2F2",
    title: "Missing Knowledge",
    desc: "AI cannot retrieve information that doesn't exist in your knowledge base.",
    detail: "Critical policies, procedures, or product details may never have been documented. Your AI cannot invent what it was never taught.",
  },
  {
    icon: <Search className="w-6 h-6" />,
    color: "#F59E0B",
    bg: "#FFFBEB",
    title: "Poor Retrieval",
    desc: "The correct answer exists. The wrong chunk gets retrieved.",
    detail: "Semantic search can return irrelevant chunks even when the right information exists. Chunking strategy and embedding quality matter.",
  },
  {
    icon: <AlertTriangle className="w-6 h-6" />,
    color: "#8B5CF6",
    bg: "#F5F3FF",
    title: "Hallucinated Responses",
    desc: "AI generates unsupported answers. Users trust incorrect information.",
    detail: "Without grounding, LLMs confidently fabricate answers. Your team makes decisions based on information that never existed.",
  },
  {
    icon: <XCircle className="w-6 h-6" />,
    color: "#2563EB",
    bg: "#DBEAFE",
    title: "Black Box Systems",
    desc: "Organizations see responses. They never see why those responses were generated.",
    detail: "No visibility into sources, retrieval scores, confidence metrics, or reasoning. Auditing and compliance become impossible.",
  },
]

function ProblemCard({ p, index }: { p: typeof problems[0]; index: number }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-6 rounded-2xl border border-border bg-card hover:shadow-lg hover:border-primary/30 transition-all duration-300 h-full">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: p.bg, color: p.color }}>
          {p.icon}
        </div>
        <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
        <p className="text-sm text-muted mb-3">{p.desc}</p>
        <AnimatePresence>
          {expanded && (
            <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="text-xs text-muted/80 pt-3 border-t border-border">
              {p.detail}
            </motion.p>
          )}
        </AnimatePresence>
        <span className="text-xs text-primary font-medium mt-2 inline-flex items-center gap-1">
          {expanded ? "Show less" : "Learn more"}
          <ChevronRight className={`w-3 h-3 transition-transform ${expanded ? "rotate-90" : ""}`} />
        </span>
      </div>
    </motion.div>
  )
}

function ProblemSection() {
  return (
    <Section className="py-24 md:py-32">
      <Container>
        <div className="text-center mb-16">
          <SectionLabel>Why Enterprise AI Fails</SectionLabel>
          <SectionHeading className="mb-4">Enterprise Knowledge Is Broken</SectionHeading>
          <SectionSubheading className="mx-auto">
            Organizations have thousands of documents spread across policies, SOPs, manuals, wikis, and knowledge bases.
            When AI assistants are deployed, these documents become the foundation of every answer.
            Yet most organizations have no visibility into whether their knowledge is complete, accurate, retrievable, or AI-ready.
          </SectionSubheading>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((p, i) => <ProblemCard key={p.title} p={p} index={i} />)}
        </div>
      </Container>
    </Section>
  )
}

// ─── Section 3: Cost of Bad Knowledge ────────────────────────

const costs = [
  { label: "Higher Support Costs", value: "3.2x", desc: "per ticket when agents lack accurate knowledge" },
  { label: "Lower Employee Productivity", value: "40%", desc: "of time wasted searching for correct information" },
  { label: "Compliance Risk", value: "68%", desc: "of organizations cannot audit AI-generated answers" },
  { label: "Reduced Trust in AI", value: "74%", desc: "of users distrust AI responses without citations" },
  { label: "Poor CX", value: "52%", desc: "of customers will leave after one bad AI interaction" },
  { label: "Escalations & Rework", value: "2.8x", desc: "more escalations when AI lacks proper grounding" },
]

function CostSection() {
  return (
    <Section dark className="py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/50 via-transparent to-transparent pointer-events-none" />
      <Container className="relative z-10">
        <div className="text-center mb-16">
          <SectionLabel dark>Why It Matters</SectionLabel>
          <SectionHeading className="mb-4 text-white">Bad Knowledge Creates Expensive Problems</SectionHeading>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Knowledge issues don&apos;t stay isolated. They cascade through your entire organization, compounding costs at every level.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {costs.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="text-3xl font-bold text-accent mb-1">{c.value}</div>
              <div className="text-sm font-medium text-white mb-0.5">{c.label}</div>
              <div className="text-xs text-white/50">{c.desc}</div>
            </motion.div>
          ))}
        </div>
        {/* Propagation Flow */}
        <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
          <p className="text-xs text-white/40 uppercase tracking-wider font-medium mb-4">How knowledge issues propagate</p>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {["Missing Docs", "→", "Wrong Retrieval", "→", "Bad Answer", "→", "Wrong Decision", "→", "Escalation", "→", "Cost"].map((step, i) => (
              <span key={i} className={`px-3 py-1.5 rounded-lg ${i % 2 === 1 ? "text-white/20" : "bg-white/10 text-white/80 font-medium"}`}>
                {step}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

// ─── Section 4: Solution ─────────────────────────────────────

const pillars = [
  {
    icon: Target, title: "Understand", color: "#2563EB",
    items: ["Measure knowledge quality across all sources", "Track coverage, metadata, and readiness", "Identify weak spots before deployment"],
  },
  {
    icon: Search, title: "Validate", color: "#14B8A6",
    items: ["Inspect every retrieval with full traceability", "Verify citations against source documents", "Audit confidence and grounding scores"],
  },
  {
    icon: Zap, title: "Optimize", color: "#8B5CF6",
    items: ["Detect knowledge gaps automatically", "Improve coverage and chunk quality", "Strengthen retrieval and reduce hallucinations"],
  },
]

function SolutionSection() {
  return (
    <Section className="py-24 md:py-32">
      <Container>
        <div className="text-center mb-16">
          <SectionLabel>The KnowledgeOS Platform</SectionLabel>
          <SectionHeading className="mb-4">
            Introducing <span className="text-primary">KnowledgeOS</span>
          </SectionHeading>
          <p className="text-lg text-muted max-w-3xl mx-auto">
            <strong>KnowledgeOS</strong> doesn&apos;t just generate answers. It helps organizations understand what AI knows,
            how AI knows it, and what AI is missing.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative group"
            >
              <div className="p-8 rounded-2xl border border-border bg-card hover:shadow-xl transition-all duration-300 h-full">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: `${p.color}15`, color: p.color }}>
                  <p.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{p.title}</h3>
                <ul className="space-y-3">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: p.color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {i < pillars.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 text-muted">
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

// ─── Section 5: Platform Capabilities ────────────────────────

const capabilities = [
  { icon: Activity, title: "Knowledge Health Monitoring", desc: "Monitor readiness, coverage, metadata quality, chunk quality, and retrieval performance across all knowledge bases." },
  { icon: Search, title: "Knowledge Engineering Workspace", desc: "Ask questions and inspect the complete answer generation process from retrieval to final response." },
  { icon: Layers, title: "Retrieval Observability", desc: "Understand exactly which chunks and sources were retrieved, with similarity scores and ranking." },
  { icon: Shield, title: "Citation Verification", desc: "Verify every answer against supporting evidence with highlighted source text and confidence mapping." },
  { icon: AlertTriangle, title: "Knowledge Gap Detection", desc: "Identify missing topics before they become problems. Track unanswered and low-confidence queries." },
  { icon: Share2, title: "Relationship Mapping", desc: "Visualize how knowledge connects across documents, topics, policies, and departments." },
  { icon: Database, title: "Document Intelligence", desc: "Inspect chunks, embeddings, metadata, and source quality at the individual document level." },
  { icon: BarChart3, title: "AI Readiness Assessment", desc: "Measure whether enterprise knowledge is prepared for AI deployment with actionable improvement scores." },
]

function CapabilitiesSection() {
  return (
    <Section className="py-24 md:py-32 bg-gray-50/50">
      <Container>
        <div className="text-center mb-16">
          <SectionLabel>Platform Capabilities</SectionLabel>
          <SectionHeading className="mb-4">Everything Needed To Build Trusted Enterprise AI</SectionHeading>
          <SectionSubheading className="mx-auto">
            From knowledge health monitoring to retrieval observability — every tool an AI team needs to ship with confidence.
          </SectionSubheading>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {capabilities.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-5 rounded-xl border border-border bg-card hover:shadow-md hover:border-primary/30 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center mb-3">
                <c.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-sm font-semibold mb-2">{c.title}</h3>
              <p className="text-xs text-muted leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

// ─── Section 6: How It Works ─────────────────────────────────

const steps = [
  { num: "01", title: "Upload Knowledge", desc: "PDFs, policies, manuals, knowledge articles — connect any knowledge source.", icon: UploadIcon },
  { num: "02", title: "Process Knowledge", desc: "Extraction, chunking, embedding, indexing — fully automated pipeline.", icon: Activity },
  { num: "03", title: "Analyze Quality", desc: "Coverage, metadata, readiness, relationships — measure before you deploy.", icon: BarChart3 },
  { num: "04", title: "Query Knowledge", desc: "Ask questions naturally. KnowledgeOS retrieves the most relevant context.", icon: Search },
  { num: "05", title: "Inspect Retrieval", desc: "See sources, chunks, scores, evidence — every answer is fully traceable.", icon: Layers },
  { num: "06", title: "Optimize Knowledge", desc: "Improve quality, reduce hallucinations, increase trust. Continuous improvement.", icon: Zap },
]

function UploadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  )
}

function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null)

  return (
    <Section className="py-24 md:py-32">
      <Container>
        <div className="text-center mb-16">
          <SectionLabel>Simple Workflow</SectionLabel>
          <SectionHeading className="mb-4">From Documents To Trusted Answers</SectionHeading>
          <SectionSubheading className="mx-auto">
            A six-step pipeline that transforms raw enterprise documents into verifiable, grounded AI responses.
          </SectionSubheading>
        </div>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden md:block" />
          <div className="space-y-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex items-start gap-6"
              >
                <div
                  className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 cursor-pointer transition-all duration-300 ${activeStep === i ? "shadow-lg scale-110" : ""}`}
                  style={{ backgroundColor: activeStep === i ? "#2563EB" : "#DBEAFE", color: activeStep === i ? "white" : "#2563EB" }}
                  onClick={() => setActiveStep(activeStep === i ? null : i)}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <div className="pt-2 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-primary">{step.num}</span>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-sm text-muted">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

// ─── Section 7: Retrieval Inspector Showcase ─────────────────

function InspectorShowcase() {
  const chunks = [
    { id: "Chunk 12", source: "Refund Policy.pdf", score: 0.98, text: "Refund requests may be initiated within seven days of delivery. Items must be unused and in original packaging." },
    { id: "Chunk 17", source: "Refund Policy.pdf", score: 0.92, text: "Refunds are issued to the original payment method. Store credit is available as an alternative." },
    { id: "Chunk 24", source: "Returns Policy.pdf", score: 0.84, text: "Damaged items may be eligible for full refund including shipping costs." },
  ]

  return (
    <Section className="py-24 md:py-32 bg-gray-50/50">
      <Container>
        <div className="text-center mb-16">
          <SectionLabel>Flagship Feature</SectionLabel>
          <SectionHeading className="mb-4">See Exactly Why Every Answer Was Generated</SectionHeading>
          <SectionSubheading className="mx-auto">
            Every response includes a full trace: which sources were retrieved, why they were selected, and how confident the system is.
          </SectionSubheading>
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-border bg-card shadow-xl overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-border bg-gray-50/50 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center">
                <Search className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted font-medium">Knowledge Query</p>
                <p className="text-sm font-semibold">What is the refund policy?</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-xs font-medium text-accent">Grounded</span>
                <span className="text-sm font-bold text-accent">97%</span>
              </div>
            </div>
            {/* Answer */}
            <div className="p-4 border-b border-border">
              <p className="text-sm leading-relaxed">
                Our refund policy allows customers to initiate refund requests within seven days of delivery.
                Items must be unused and in their original packaging to qualify. Once approved, refunds are typically
                processed within 5-7 business days.
              </p>
            </div>
            {/* Chunks */}
            <div className="p-4 space-y-3">
              <p className="text-xs font-semibold text-muted uppercase tracking-wider">Retrieved Sources</p>
              {chunks.map((chunk, i) => (
                <motion.div
                  key={chunk.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-3 rounded-xl border border-border hover:border-accent/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-medium">{chunk.source}</span>
                      <span className="text-[10px] text-muted">{chunk.id}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full rounded-full bg-accent" style={{ width: `${chunk.score * 100}%` }} />
                      </div>
                      <span className="text-xs font-bold text-accent">{(chunk.score * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted">{chunk.text}</p>
                </motion.div>
              ))}
            </div>
            {/* Grounding */}
            <div className="p-4 border-t border-border bg-accent/5 flex items-center gap-3">
              <Shield className="w-5 h-5 text-accent" />
              <div>
                <p className="text-xs font-semibold">Grounding Score: 94%</p>
                <p className="text-[10px] text-muted">3 of 4 answer segments directly supported by retrieved sources</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

// ─── Section 8: Knowledge Health Dashboard ───────────────────

const healthMetrics = [
  { label: "Coverage", value: 87, desc: "Percentage of known topics covered by existing documents", color: "#2563EB" },
  { label: "Metadata Quality", value: 94, desc: "Completeness of document metadata fields", color: "#14B8A6" },
  { label: "Chunk Quality", value: 89, desc: "Chunk structure, overlap strategy, and retrieval effectiveness", color: "#8B5CF6" },
  { label: "Retrieval Performance", value: 93, desc: "Speed and accuracy of document retrieval", color: "#F59E0B" },
  { label: "Knowledge Gaps", value: 8, desc: "Missing topics detected across all knowledge bases", color: "#EF4444", isGap: true },
  { label: "Readiness Score", value: 92, desc: "Overall AI readiness based on all health metrics combined", color: "#10B981", large: true },
]

function HealthDashboardSection() {
  return (
    <Section className="py-24 md:py-32">
      <Container>
        <div className="text-center mb-16">
          <SectionLabel>AI Readiness</SectionLabel>
          <SectionHeading className="mb-4">Measure AI Readiness Before Deployment</SectionHeading>
          <SectionSubheading className="mx-auto">
            Know exactly how prepared your enterprise knowledge is for AI deployment with actionable scores and improvement guidance.
          </SectionSubheading>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {healthMetrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`p-5 rounded-xl border border-border bg-card ${m.large ? "sm:col-span-2 lg:col-span-1" : ""}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{m.label}</span>
                <span className={`text-lg font-bold ${m.isGap ? "text-red-500" : ""}`} style={{ color: m.isGap ? undefined : m.color }}>
                  {m.value}{m.isGap ? "" : "%"}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-100 mb-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${m.isGap ? Math.min(m.value * 10, 100) : m.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: m.color }}
                />
              </div>
              <p className="text-xs text-muted">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

// ─── Section 9: Knowledge Graph ──────────────────────────────

function KnowledgeGraphSection() {
  const nodes = [
    { id: "doc1", label: "Refund Policy", x: 50, y: 30, color: "#2563EB" },
    { id: "doc2", label: "Returns Policy", x: 20, y: 55, color: "#14B8A6" },
    { id: "doc3", label: "Warranty Guide", x: 80, y: 55, color: "#8B5CF6" },
    { id: "doc4", label: "Shipping Guide", x: 35, y: 80, color: "#F59E0B" },
    { id: "doc5", label: "Tracking Guide", x: 65, y: 80, color: "#EF4444" },
    { id: "topic", label: "Refunds", x: 50, y: 55, color: "#10B981", large: true },
  ]
  const edges = [
    [0, 1], [0, 4], [1, 4], [3, 4], [2, 4], [0, 5], [1, 5], [2, 5],
  ]

  return (
    <Section className="py-24 md:py-32 bg-gray-50/50">
      <Container>
        <div className="text-center mb-16">
          <SectionLabel>Knowledge Relationships</SectionLabel>
          <SectionHeading className="mb-4">Understand How Knowledge Connects</SectionHeading>
          <SectionSubheading className="mx-auto">
            Visualize relationships between documents, topics, policies, and departments across your entire knowledge ecosystem.
          </SectionSubheading>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="relative w-full aspect-square rounded-2xl border border-border bg-card p-8 overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {edges.map(([a, b], i) => (
                <motion.line
                  key={i}
                  x1={nodes[a].x} y1={nodes[a].y}
                  x2={nodes[b].x} y2={nodes[b].y}
                  stroke="#E2E8F0"
                  strokeWidth="0.3"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                />
              ))}
              {nodes.map((node, i) => (
                <motion.g
                  key={node.id}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, type: "spring" }}
                >
                  <circle cx={node.x} cy={node.y} r={node.large ? 8 : 5} fill={node.color} opacity="0.9" />
                  <text x={node.x} y={node.y + (node.large ? 12 : 9)} textAnchor="middle" className="text-[3px] fill-muted" fontSize="3">
                    {node.label}
                  </text>
                </motion.g>
              ))}
            </svg>
          </div>
        </div>
      </Container>
    </Section>
  )
}

// ─── Section 10: Business Outcomes ───────────────────────────

const outcomes = [
  { icon: CheckCircle2, label: "Improve AI Accuracy", desc: "Achieve 94%+ grounding accuracy with retrieved evidence", stat: "94%", color: "#14B8A6" },
  { icon: AlertTriangle, label: "Reduce Hallucinations", desc: "Decrease unsupported answers by identifying knowledge gaps", stat: "<5%", color: "#2563EB" },
  { icon: Zap, label: "Increase Employee Productivity", desc: "Reduce knowledge search time by 60% with grounded answers", stat: "60%", color: "#8B5CF6" },
  { icon: Shield, label: "Strengthen Compliance", desc: "Full audit trail for every AI-generated answer and source", stat: "100%", color: "#F59E0B" },
]

function OutcomesSection() {
  return (
    <Section className="py-24 md:py-32">
      <Container>
        <div className="text-center mb-16">
          <SectionLabel>Results</SectionLabel>
          <SectionHeading className="mb-4">The Result: Trusted AI At Scale</SectionHeading>
          <SectionSubheading className="mx-auto">
            Organizations using KnowledgeOS ship AI systems their teams can actually trust.
          </SectionSubheading>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {outcomes.map((o, i) => (
            <motion.div
              key={o.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl border border-border bg-card"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${o.color}15` }}>
                <o.icon className="w-6 h-6" style={{ color: o.color }} />
              </div>
              <div className="text-3xl font-bold mb-2" style={{ color: o.color }}>{o.stat}</div>
              <h3 className="text-sm font-semibold mb-1">{o.label}</h3>
              <p className="text-xs text-muted">{o.desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

// ─── Section 11: Comparison ──────────────────────────────────

const comparisons = [
  { feature: "Answer Generation", traditional: "Black box", kos: "Fully traceable" },
  { feature: "Source Traceability", traditional: "Not available", kos: "Complete chain of evidence" },
  { feature: "Retrieval Visibility", traditional: "Hidden", kos: "Full observability" },
  { feature: "Knowledge Health", traditional: "Not measured", kos: "Real-time monitoring" },
  { feature: "Gap Detection", traditional: "Manual", kos: "Automated detection" },
  { feature: "Citation Validation", traditional: "None", kos: "Verified per answer" },
  { feature: "Knowledge Relationships", traditional: "Not tracked", kos: "Graph visualization" },
  { feature: "AI Readiness", traditional: "Unknown", kos: "Quantified score" },
  { feature: "Auditability", traditional: "Impossible", kos: "Complete audit trail" },
  { feature: "Governance", traditional: "None", kos: "Enterprise controls" },
]

function ComparisonSection() {
  return (
    <Section className="py-24 md:py-32 bg-gray-50/50">
      <Container>
        <div className="text-center mb-16">
          <SectionLabel>Why We&apos;re Different</SectionLabel>
          <SectionHeading className="mb-4">Traditional AI Assistants vs KnowledgeOS</SectionHeading>
          <SectionSubheading className="mx-auto">
            Most AI platforms answer questions. KnowledgeOS makes every answer verifiable, auditable, and improvable.
          </SectionSubheading>
        </div>
        <div className="max-w-4xl mx-auto overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-border">
                <th className="text-left px-6 py-4 font-semibold">Capability</th>
                <th className="text-left px-6 py-4 font-medium text-muted">Traditional AI</th>
                <th className="text-left px-6 py-4 font-semibold text-primary">KnowledgeOS</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((c, i) => (
                <motion.tr
                  key={c.feature}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                >
                  <td className="px-6 py-3.5 font-medium">{c.feature}</td>
                  <td className="px-6 py-3.5">
                    <span className="flex items-center gap-1.5 text-muted">
                      <XCircle className="w-3.5 h-3.5 text-red-400" />
                      {c.traditional}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="flex items-center gap-1.5 text-accent font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {c.kos}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </Section>
  )
}

// ─── Section 12: Testimonials ────────────────────────────────

const testimonials = [
  { quote: "KnowledgeOS gave us visibility into our AI's knowledge that we never had before. We caught three major knowledge gaps before they reached production.", role: "CTO", company: "Enterprise Data Platform" },
  { quote: "The retrieval inspector alone is worth the investment. Our compliance team can finally audit every AI-generated answer.", role: "VP AI Engineering", company: "Financial Services" },
  { quote: "We reduced hallucinations by 80% after using KnowledgeOS to identify and fix our knowledge quality issues.", role: "Head of AI", company: "Healthcare Technology" },
]

function TestimonialsSection() {
  return (
    <Section className="py-24 md:py-32">
      <Container>
        <div className="text-center mb-16">
          <SectionLabel>Trusted by AI Teams</SectionLabel>
          <SectionHeading className="mb-4">What Engineering Leaders Say</SectionHeading>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-border bg-card"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-muted mb-4 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="text-sm font-semibold">{t.role}</p>
                <p className="text-xs text-muted">{t.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

// ─── Section 13: FAQ ─────────────────────────────────────────

const faqs = [
  { q: "Why isn't a chatbot enough?", a: "Standard chatbots answer questions without showing their work. KnowledgeOS provides full traceability for every answer, enabling auditing, compliance, and continuous improvement." },
  { q: "How does KnowledgeOS reduce hallucinations?", a: "By grounding every answer in retrieved source documents and showing the confidence score. When the knowledge doesn't support an answer, the system flags it instead of fabricating." },
  { q: "Can it work with existing AI systems?", a: "Yes. KnowledgeOS integrates with any LLM API (OpenAI, Anthropic, Groq, open-source models) and vector database (Qdrant, Pinecone, Weaviate, Chroma)." },
  { q: "How does readiness scoring work?", a: "Readiness is computed from six dimensions: coverage, metadata quality, chunk quality, index health, retrieval performance, and knowledge gaps. Each dimension has actionable improvement guidance." },
  { q: "Can it integrate with vector databases?", a: "Yes. KnowledgeOS supports Qdrant, Pinecone, Weaviate, Chroma, and pgvector. The retrieval observability layer works with any backend." },
  { q: "Can it support compliance requirements?", a: "Yes. Every answer includes a complete audit trail: retrieved chunks, similarity scores, prompt assembly, generated response, and confidence metrics." },
]

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <Section className="py-24 md:py-32 bg-gray-50/50">
      <Container>
        <div className="text-center mb-16">
          <SectionLabel>Questions?</SectionLabel>
          <SectionHeading className="mb-4">Frequently Asked Questions</SectionHeading>
        </div>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="rounded-xl border border-border bg-card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="text-sm font-medium">{faq.q}</span>
                <ChevronRight className={`w-4 h-4 text-muted transition-transform shrink-0 ${openIndex === i ? "rotate-90" : ""}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 pb-4 text-sm text-muted">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

// ─── Section 14: Final CTA ───────────────────────────────────

function FinalCTA() {
  return (
    <Section dark className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10 pointer-events-none" />
      <Container className="relative z-10 text-center">
        <SectionHeading className="text-white mb-4">Stop Guessing What Your AI Knows</SectionHeading>
        <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10">
          Understand your knowledge. Validate your AI. Build trust at enterprise scale.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="text-base px-8 h-12 bg-white text-[#0f172a] hover:bg-white/90">
            Book a Demo
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="lg" className="text-base px-8 h-12 border-white/20 text-white hover:bg-white/10">
            Start Free Evaluation
          </Button>
        </div>
      </Container>
    </Section>
  )
}

// ─── Footer ──────────────────────────────────────────────────

function FooterSection() {
  const cols = [
    {
      title: "Product", links: ["Knowledge Health", "Retrieval Inspector", "Knowledge Graph", "Gap Detection", "AI Readiness"],
    },
    {
      title: "Solutions", links: ["AI Teams", "Knowledge Managers", "Compliance", "Support Leaders", "Enterprise"],
    },
    {
      title: "Resources", links: ["Documentation", "API Reference", "Integration Guide", "Case Studies", "Blog"],
    },
    {
      title: "Company", links: ["About", "Careers", "Security", "Privacy Policy", "Terms of Service"],
    },
  ]

  return (
    <Section className="py-16 border-t border-border">
      <Container>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-sm">KnowledgeOS</span>
            </div>
            <p className="text-xs text-muted leading-relaxed max-w-xs">
              The operating system for enterprise knowledge. Making AI explainable, auditable, and trustworthy.
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted hover:text-foreground transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">&copy; 2026 TechWeave DS. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {["Twitter", "GitHub", "LinkedIn", "YouTube"].map((s) => (
              <a key={s} href="#" className="text-xs text-muted hover:text-foreground transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

// ─── Main Page ───────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <Hero />
      <ProblemSection />
      <CostSection />
      <SolutionSection />
      <CapabilitiesSection />
      <HowItWorksSection />
      <InspectorShowcase />
      <HealthDashboardSection />
      <KnowledgeGraphSection />
      <OutcomesSection />
      <ComparisonSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTA />
      <FooterSection />
    </main>
  )
}
