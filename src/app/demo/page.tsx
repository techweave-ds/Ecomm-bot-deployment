"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, CheckCircle2, XCircle, Upload, BrainCircuit, MessageSquare, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { HeroSection } from "@/components/marketing/hero-section"
import { SiteShell } from "@/components/marketing/site-shell"
import { heroContent, demoSteps, demoQuestions, beforeAfter } from "@/data/content"
import { fadeInUp } from "@/lib/animations"

const stepIcons: Record<string, React.ElementType> = { Upload, BrainCircuit, MessageSquare, CheckCircle2 }

export default function DemoPage() {
  return (
    <SiteShell>
      <HeroSection content={heroContent.demo} />

      <section className="py-20 md:py-28">
        <div className="container-page">
          <motion.div className="text-center max-w-2xl mx-auto mb-14" {...fadeInUp}>
            <div className="section-label">Walkthrough</div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">How It Works In 4 Steps</h2>
            <p className="mt-4 text-muted leading-relaxed">See exactly how KnowledgeOS transforms your knowledge into trusted AI answers.</p>
          </motion.div>
          <div className="flex flex-col gap-6 max-w-3xl mx-auto">
            {demoSteps.map((step, i) => {
              const Icon = stepIcons[step.visual] || FileText
              return (
                <motion.div key={step.step} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.12 }}>
                  <Card className="p-6 md:p-8 hover:shadow-md transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-7 h-7 rounded-lg bg-primary text-white text-xs font-bold flex items-center justify-center">{step.step}</div>
                          <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                        </div>
                        <p className="text-sm text-muted leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-surface-1 border-y border-border">
        <div className="container-page">
          <motion.div className="text-center max-w-2xl mx-auto mb-14" {...fadeInUp}>
            <div className="section-label">Sample Q&A</div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">See The Results</h2>
            <p className="mt-4 text-muted leading-relaxed">Every answer is backed by source citations, confidence scores, and grounding verification.</p>
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-5">
            {demoQuestions.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                <Card className="p-6 hover:shadow-sm transition-all">
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Question</div>
                    <div className="text-foreground font-medium">&ldquo;{item.q}&rdquo;</div>
                  </div>
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Answer</div>
                    <div className="text-sm text-foreground leading-relaxed">{item.a}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Sources</div>
                    <ul className="space-y-1">
                      {item.sources.map((src) => (
                        <li key={src} className="flex items-start gap-2 text-xs text-muted">
                          <FileText className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                          {src}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-page">
          <motion.div className="text-center max-w-2xl mx-auto mb-14" {...fadeInUp}>
            <div className="section-label">Comparison</div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Before vs After</h2>
            <p className="mt-4 text-muted leading-relaxed">See the difference KnowledgeOS makes in how your organization accesses and uses knowledge.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <Card className="p-6 border-danger/20">
                <h3 className="font-semibold text-danger mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  {beforeAfter.before.label}
                </h3>
                <ul className="space-y-3">
                  {beforeAfter.before.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted">
                      <XCircle className="w-4 h-4 text-danger/60 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <Card className="p-6 border-accent/20">
                <h3 className="font-semibold text-accent mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  {beforeAfter.after.label}
                </h3>
                <ul className="space-y-3">
                  {beforeAfter.after.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted">
                      <CheckCircle2 className="w-4 h-4 text-accent/60 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="cta-section py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10 pointer-events-none" />
        <div className="container-page relative z-10 text-center">
          <motion.h2 className="text-3xl md:text-4xl font-bold tracking-tight" {...fadeInUp}>
            Build Your Own AI Assistant
          </motion.h2>
          <motion.p className="mt-4 text-lg text-white/60 max-w-xl mx-auto" {...fadeInUp}>
            Stop watching demos. Start building. Upload your knowledge and create your AI assistant in minutes.
          </motion.p>
          <motion.div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4" {...fadeInUp}>
            <Button size="lg" className="bg-white text-[#0f172a] hover:bg-white/90 shadow-md" asChild>
              <Link href="/build-your-bot">Build Your Own Bot <ArrowRight className="w-4 h-4" /></Link>
            </Button>
            <Button variant="outline" size="lg" className="cta-section-outline" asChild>
              <Link href="mailto:sales@knowledgeos.com">Contact Us</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  )
}
