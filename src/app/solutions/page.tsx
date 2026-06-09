"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, HeartPulse, Cloud, Factory, Landmark, GraduationCap, ShoppingBag, MessageSquare, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { HeroSection } from "@/components/marketing/hero-section"
import { SiteShell } from "@/components/marketing/site-shell"
import { heroContent, solutionCards, industryExamples } from "@/data/content"
import { fadeInUp } from "@/lib/animations"

const industryIcons: Record<string, React.ElementType> = { HeartPulse, Cloud, Factory, Landmark, GraduationCap, ShoppingBag }

export default function SolutionsPage() {
  return (
    <SiteShell>
      <HeroSection content={heroContent.solutions} />

      <section className="py-20 md:py-28">
        <div className="container-page">
          <motion.div className="text-center max-w-2xl mx-auto mb-14" {...fadeInUp}>
            <div className="section-label">Use Cases</div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Solutions For Every Department</h2>
            <p className="mt-4 text-muted leading-relaxed">KnowledgeOS adapts to your specific use case, industry, and requirements.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {solutionCards.map((solution, i) => (
              <motion.div key={solution.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                <Card className="p-6 h-full card-hover">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
                      <MessageSquare className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground text-lg">{solution.title}</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Problem</div>
                      <p className="text-sm text-foreground">{solution.problem}</p>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Solution</div>
                      <p className="text-sm text-foreground">{solution.solution}</p>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Outcome</div>
                      <p className="text-sm font-medium text-primary">{solution.outcome}</p>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Example Questions</div>
                      <ul className="space-y-1">
                        {solution.examples.map((ex) => (
                          <li key={ex} className="flex items-start gap-2 text-xs text-muted">
                            <CheckCircle2 className="w-3 h-3 text-accent mt-0.5 shrink-0" />
                            {ex}
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

      <section className="py-20 md:py-28 bg-gray-50/60 dark:bg-gray-900/40 border-y border-border">
        <div className="container-page">
          <motion.div className="text-center max-w-2xl mx-auto mb-14" {...fadeInUp}>
            <div className="section-label">Industries</div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Trusted Across Industries</h2>
            <p className="mt-4 text-muted leading-relaxed">Organizations in every sector use KnowledgeOS to power their AI knowledge systems.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5">
            {industryExamples.map((industry, i) => {
              const Icon = industryIcons[industry.icon] || MessageSquare
              return (
                <motion.div key={industry.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                  <Card className="p-6 h-full card-hover cursor-default">
                    <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{industry.name}</h3>
                    <p className="text-sm text-muted leading-relaxed">{industry.description}</p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#0f172a] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10 pointer-events-none" />
        <div className="container-page relative z-10 text-center">
          <motion.h2 className="text-3xl md:text-4xl font-bold tracking-tight" {...fadeInUp}>
            See How KnowledgeOS Fits Your Workflow
          </motion.h2>
          <motion.p className="mt-4 text-lg text-white/60 max-w-xl mx-auto" {...fadeInUp}>
            Build your own AI assistant powered by your knowledge.
          </motion.p>
          <motion.div className="mt-8" {...fadeInUp}>
            <Button size="lg" className="bg-white text-[#0f172a] hover:bg-white/90" asChild>
              <Link href="/build-your-bot">Build Your Bot <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  )
}
