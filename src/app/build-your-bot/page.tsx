"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import * as LucideIcons from "lucide-react"
import { ArrowRight, Upload, Settings2, BrainCircuit, Globe, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { HeroSection } from "@/components/marketing/hero-section"
import { SiteShell } from "@/components/marketing/site-shell"
import { heroContent, deploymentOptions } from "@/data/content"

const fadeInUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } }

function Icon({ name, className }: { name: string; className?: string }) {
  const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>
  const LucideIcon = icons[name]
  if (!LucideIcon) return null
  return <LucideIcon className={className} />
}

export default function BuildBotPage() {
  return (
    <SiteShell>
      <HeroSection content={heroContent.buildBot}>
        <div className="max-w-lg mx-auto">
          <Card className="p-6">
            <div className="flex items-center gap-3 text-sm text-muted mb-4">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              No credit card required
              <span className="text-border">|</span>
              <CheckCircle2 className="w-4 h-4 text-accent" />
              14-day free trial
              <span className="text-border">|</span>
              <CheckCircle2 className="w-4 h-4 text-accent" />
              No coding needed
            </div>
            <div className="grid grid-cols-3 gap-3">
              {["PDF", "DOCX", "TXT"].map((fmt) => (
                <div key={fmt} className="text-center p-3 rounded-lg bg-gray-50 text-xs font-medium text-muted border border-border">
                  {fmt}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </HeroSection>

      <section className="py-20 md:py-28">
        <div className="container-page">
          <motion.div className="text-center max-w-2xl mx-auto mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">4 Simple Steps To Your AI Assistant</h2>
            <p className="mt-4 text-lg text-muted">Build, configure, and deploy — all without writing a single line of code.</p>
          </motion.div>
          <div className="flex flex-col gap-8 max-w-3xl mx-auto">
            {[
              {
                step: 1, title: "Upload Your Documents", icon: Upload,
                description: "Upload your knowledge documents in any supported format. KnowledgeOS accepts PDF, DOCX, TXT, and web pages.",
                details: ["Drag and drop or browse files", "Batch upload multiple documents", "Automatic format detection", "Real-time upload progress"],
              },
              {
                step: 2, title: "Configure Your Assistant", icon: Settings2,
                description: "Customize your AI assistant to match your brand, tone, and requirements.",
                details: ["Set bot name and description", "Write custom instructions", "Choose response tone", "Upload your branding"],
              },
              {
                step: 3, title: "Process & Preview", icon: BrainCircuit,
                description: "Watch as KnowledgeOS processes your knowledge and test your assistant with real questions.",
                details: ["Automatic chunking & embedding", "Test with sample questions", "See source-backed answers", "Adjust and iterate instantly"],
              },
              {
                step: 4, title: "Deploy Everywhere", icon: Globe,
                description: "Launch your AI assistant on any channel — website, shareable link, or embedded widget.",
                details: ["Website widget with one script", "Shareable link for instant sharing", "Embedded in your platform", "API access for custom integrations"],
              },
            ].map((s, i) => (
              <motion.div key={s.step} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.12 }}>
                <Card className="p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
                      <s.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-7 h-7 rounded-lg bg-primary text-white text-xs font-bold flex items-center justify-center">{s.step}</div>
                        <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
                      </div>
                      <p className="text-sm text-muted mb-3">{s.description}</p>
                      <ul className="grid grid-cols-2 gap-1.5">
                        {s.details.map((d) => (
                          <li key={d} className="flex items-center gap-2 text-xs text-muted">
                            <CheckCircle2 className="w-3 h-3 text-accent shrink-0" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-card border-y border-border">
        <div className="container-page">
          <motion.div className="text-center max-w-2xl mx-auto mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Deployment Options</h2>
            <p className="mt-4 text-lg text-muted">Deploy your AI assistant wherever your users need it.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {deploymentOptions.slice(0, 6).map((opt, i) => (
              <motion.div key={opt.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                <Card className="p-6 h-full card-hover cursor-default">
                  <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center mb-4">
                    <Icon name={opt.icon} className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{opt.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{opt.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-primary-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark pointer-events-none" />
        <div className="container-page relative z-10 text-center">
          <motion.h2 className="text-3xl md:text-4xl font-bold tracking-tight" {...fadeInUp}>
            Ready To Go Live?
          </motion.h2>
          <motion.p className="mt-4 text-lg text-white/80 max-w-xl mx-auto" {...fadeInUp}>
            Get started free, then upgrade as you grow. Enterprise plans include dedicated support, custom SLAs, and on-premise deployment.
          </motion.p>
          <motion.div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4" {...fadeInUp}>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/pricing">View Pricing <ArrowRight className="w-4 h-4" /></Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10" asChild>
              <Link href="#contact">Contact Us For Production Deployment</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  )
}
