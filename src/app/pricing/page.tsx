"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { HeroSection } from "@/components/marketing/hero-section"
import { SiteShell } from "@/components/marketing/site-shell"
import { heroContent, pricingPlans, pricingFaq } from "@/data/content"

const fadeInUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } }

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <SiteShell>
      <HeroSection content={heroContent.pricing} />

      <section className="py-20 md:py-28">
        <div className="container-page">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className={`p-6 h-full flex flex-col ${plan.highlighted ? "border-primary ring-2 ring-primary/20" : ""}`}>
                  {plan.highlighted && (
                    <div className="text-xs font-semibold text-primary bg-primary-light px-3 py-1 rounded-full self-start mb-3">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    {plan.period && <span className="text-sm text-muted">{plan.period}</span>}
                  </div>
                  <p className="mt-2 text-sm text-muted">{plan.description}</p>
                  <ul className="mt-6 space-y-3 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                        <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button variant={plan.highlighted ? "primary" : "outline"} size="lg" className="mt-8 w-full" asChild>
                    <Link href="/build-your-bot">{plan.cta}</Link>
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-card border-y border-border">
        <div className="container-page">
          <motion.div className="text-center max-w-2xl mx-auto mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Feature Comparison</h2>
            <p className="mt-4 text-lg text-muted">See exactly what you get with each plan.</p>
          </motion.div>
          <div className="max-w-3xl mx-auto overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 pr-4 font-semibold text-foreground">Feature</th>
                  {pricingPlans.map((p) => (
                    <th key={p.name} className="text-center py-4 px-4 font-semibold text-foreground">{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-3 pr-4 text-muted" colSpan={4}><span className="font-semibold text-foreground">Plan Limits</span></td>
                </tr>
                {pricingPlans[0].features.slice(0, 4).map((feat) => (
                  <tr key={feat} className="border-b border-border/50">
                    <td className="py-3 pr-4 text-muted">{feat}</td>
                    {pricingPlans.map((p) => (
                      <td key={p.name} className="text-center py-3 px-4">
                        {p.features.includes(feat) ? (
                          <CheckCircle2 className="w-4 h-4 text-accent mx-auto" />
                        ) : (
                          <span className="text-xs text-muted">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="border-b border-border">
                  <td className="py-3 pr-4 text-muted" colSpan={4}><span className="font-semibold text-foreground">Features</span></td>
                </tr>
                {pricingPlans[0].features.slice(4).map((feat) => (
                  <tr key={feat} className="border-b border-border/50">
                    <td className="py-3 pr-4 text-muted">{feat}</td>
                    {pricingPlans.map((p) => (
                      <td key={p.name} className="text-center py-3 px-4">
                        {p.features.includes(feat) ? (
                          <CheckCircle2 className="w-4 h-4 text-accent mx-auto" />
                        ) : (
                          <span className="text-xs text-muted">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-page max-w-3xl mx-auto">
          <motion.div className="text-center max-w-2xl mx-auto mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Frequently Asked Questions</h2>
          </motion.div>
          <div className="space-y-3">
            {pricingFaq.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full p-5 flex items-center justify-between text-left">
                    <span className="font-medium text-foreground text-sm pr-4">{item.q}</span>
                    <ChevronDown className={`w-4 h-4 text-muted shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-sm text-muted leading-relaxed">{item.a}</div>
                  )}
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
            Need A Custom Plan?
          </motion.h2>
          <motion.p className="mt-4 text-lg text-white/80 max-w-xl mx-auto" {...fadeInUp}>
            Enterprise customers get custom pricing, dedicated support, and on-premise deployment options.
          </motion.p>
          <motion.div className="mt-8" {...fadeInUp}>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/build-your-bot">Build Your Bot <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  )
}
