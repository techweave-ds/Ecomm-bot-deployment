"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import * as LucideIcons from "lucide-react"
import { ArrowRight, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { HeroSection } from "@/components/marketing/hero-section"
import { SiteShell } from "@/components/marketing/site-shell"
import { heroContent, capabilities, howItWorksSteps, knowledgeProcessingSteps, deploymentOptions, businessOutcomes } from "@/data/content"

const fadeInUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } }

function Icon({ name, className }: { name: string; className?: string }) {
  const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>
  const LucideIcon = icons[name]
  if (!LucideIcon) return null
  return <LucideIcon className={className} />
}

export default function ProductPage() {
  return (
    <SiteShell>
      <HeroSection content={heroContent.product}>
        <div className="max-w-4xl mx-auto">
          <div className="card p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {knowledgeProcessingSteps.slice(0, 6).map((step, i) => (
                <div key={step.title} className="flex items-center gap-3 md:flex-col md:text-center">
                  <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{step.title}</div>
                    <div className="text-xs text-muted hidden md:block">{step.description}</div>
                  </div>
                  {i < 5 && <ArrowRight className="w-4 h-4 text-muted hidden md:block" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </HeroSection>

      <section className="py-20 md:py-28">
        <div className="container-page">
          <motion.div className="text-center max-w-2xl mx-auto mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Everything You Need To Build Trusted AI</h2>
            <p className="mt-4 text-lg text-muted">From document upload to deployment — a complete knowledge engineering platform.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, i) => (
              <motion.div key={cap.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                <Card className="p-6 h-full card-hover cursor-default">
                  <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center mb-4">
                    <Icon name={cap.icon} className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{cap.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{cap.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-card border-y border-border">
        <div className="container-page">
          <motion.div className="text-center max-w-2xl mx-auto mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">How It Works</h2>
            <p className="mt-4 text-lg text-muted">From documents to deployed AI assistant in 6 simple steps.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {howItWorksSteps.map((step, i) => (
              <motion.div key={step.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                <Card className="p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-primary text-white text-sm font-bold flex items-center justify-center">{step.step}</div>
                    <h3 className="font-semibold text-foreground">{step.title}</h3>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{step.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
          <motion.div className="text-center mt-10" {...fadeInUp}>
            <Button variant="primary" size="lg" asChild>
              <Link href="/demo">See It In Action <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-page">
          <motion.div className="text-center max-w-2xl mx-auto mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Knowledge Processing Pipeline</h2>
            <p className="mt-4 text-lg text-muted">Your documents go through a sophisticated pipeline optimized for accuracy and speed.</p>
          </motion.div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden md:block" />
            <div className="flex flex-col gap-8">
              {knowledgeProcessingSteps.map((step, i) => (
                <motion.div key={step.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.12 }} className="relative pl-0 md:pl-16">
                  <div className="hidden md:flex absolute left-4 top-1 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                  <Card className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center md:hidden">
                        <FileText className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground">{step.title}</h3>
                    </div>
                    <p className="text-sm text-muted">{step.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
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

      <section className="py-20 md:py-28">
        <div className="container-page">
          <motion.div className="text-center max-w-2xl mx-auto mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Business Outcomes</h2>
            <p className="mt-4 text-lg text-muted">Real results from organizations using KnowledgeOS.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessOutcomes.map((outcome, i) => (
              <motion.div key={outcome.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                <Card className="p-6 text-center h-full">
                  <div className="text-4xl font-bold text-primary mb-2">{outcome.stat}</div>
                  <div className="font-semibold text-foreground mb-2">{outcome.label}</div>
                  <p className="text-sm text-muted">{outcome.description}</p>
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
            Ready To Build Your First AI Assistant?
          </motion.h2>
          <motion.p className="mt-4 text-lg text-white/80 max-w-xl mx-auto" {...fadeInUp}>
            Try the demo and see how KnowledgeOS transforms your knowledge into trusted AI answers.
          </motion.p>
          <motion.div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4" {...fadeInUp}>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/demo">Try The Demo <ArrowRight className="w-4 h-4" /></Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10" asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  )
}
