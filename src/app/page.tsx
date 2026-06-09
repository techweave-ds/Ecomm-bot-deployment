"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  ArrowRight, CheckCircle2, AlertTriangle, Search,
  Target, Zap, Sparkles,
} from "lucide-react"
import { SiteShell } from "@/components/marketing/site-shell"

function Section({ className = "", children, dark = false }: { className?: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <section className={`relative py-20 md:py-24 ${dark ? "bg-[#0f172a] text-white" : "bg-background"} ${className}`}>
      <div className="max-w-7xl mx-auto px-6">{children}</div>
    </section>
  )
}

function Tag({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-5 ${dark ? "bg-white/10 text-white/80" : "bg-primary-light text-primary"}`}>
      {children}
    </div>
  )
}

function Hero() {
  const stages = ["Documents", "Chunking", "Embeddings", "Retrieval", "AI Response"]
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % stages.length), 1200)
    return () => clearInterval(t)
  }, [stages.length])

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-light/40 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <Tag>
            <Sparkles className="w-3 h-3" />
            The OS for Enterprise Knowledge
          </Tag>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
            Your AI Is Only As Good As
            <span className="text-primary block mt-2">The Knowledge Behind It</span>
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
            Upload your documents, policies, and expertise. Get a source-backed AI assistant your team can trust.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button size="lg" asChild>
              <a href="/build-your-bot">Build Your Bot <ArrowRight className="w-4 h-4" /></a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/demo">See How It Works</a>
            </Button>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between gap-1">
              {stages.map((s, i) => (
                <div key={s} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-2 transition-all duration-300 ${active === i ? "bg-primary shadow-lg scale-110" : "bg-gray-100"}`}
                  >
                    <span className={`text-xs md:text-sm font-bold ${active === i ? "text-white" : "text-muted"}`}>
                      {["📄", "🔪", "🧠", "🔍", "💬"][i]}
                    </span>
                  </div>
                  <span className={`text-[10px] md:text-xs font-medium ${active === i ? "text-foreground" : "text-muted"}`}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const problems = [
  { icon: AlertTriangle, title: "Missing Knowledge", desc: "Your AI can't retrieve what was never documented. Critical policies and expertise go missing." },
  { icon: Search, title: "Poor Retrieval", desc: "The right answer exists but the wrong context gets retrieved. Chunking and embeddings matter." },
  { icon: AlertTriangle, title: "Hallucinations", desc: "Without grounding, LLMs fabricate answers confidently. One bad answer erodes trust." },
  { icon: AlertTriangle, title: "Black Box Systems", desc: "No visibility into why answers were generated. No audit trail, no compliance." },
]

function ProblemSection() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <Section className="bg-gray-50/50">
      <div className="text-center mb-12">
        <Tag>Why Enterprise AI Fails</Tag>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Enterprise Knowledge Is Broken</h2>
        <p className="text-muted max-w-2xl mx-auto">Most organizations deploy AI without knowing if their knowledge is complete, accurate, or retrievable.</p>
      </div>
      <div className="grid md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {problems.map((p, i) => (
          <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
            <div className="p-5 rounded-xl border border-border bg-card h-full cursor-pointer hover:border-primary/30 transition-all" onClick={() => setOpen(open === i ? null : i)}>
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-3">
                <p.icon className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="font-semibold text-sm mb-1">{p.title}</h3>
              <p className="text-xs text-muted">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

const pillars = [
  { icon: Target, title: "Understand", color: "#2563EB", items: ["Know what your AI knows", "Track coverage and readiness", "Spot weak areas before deployment"] },
  { icon: Search, title: "Validate", color: "#14B8A6", items: ["Inspect every retrieval", "Verify citations against sources", "Audit confidence and grounding"] },
  { icon: Zap, title: "Optimize", color: "#8B5CF6", items: ["Detect knowledge gaps", "Improve chunk quality", "Reduce hallucinations over time"] },
]

function SolutionSection() {
  return (
    <Section>
      <div className="text-center mb-12">
        <Tag>The KnowledgeOS Platform</Tag>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Understand. Validate. Optimize.</h2>
        <p className="text-muted max-w-2xl mx-auto">Three pillars that make your AI explainable, auditable, and trustworthy.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
        {pillars.map((p, i) => (
          <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <div className="p-6 rounded-xl border border-border bg-card h-full hover:shadow-md transition-all">
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
    </Section>
  )
}

function CTASection() {
  return (
    <Section dark className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10 pointer-events-none" />
      <div className="relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Stop Guessing What Your AI Knows</h2>
        <p className="text-lg text-white/60 max-w-xl mx-auto mb-8">
          Upload your documents and build a source-backed AI assistant in minutes.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="bg-white text-[#0f172a] hover:bg-white/90" asChild>
            <a href="/build-your-bot">Build Your Bot <ArrowRight className="w-4 h-4" /></a>
          </Button>
          <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10" asChild>
            <a href="/demo">See The Demo</a>
          </Button>
        </div>
      </div>
    </Section>
  )
}

export default function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <CTASection />
    </SiteShell>
  )
}
