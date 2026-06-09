"use client"

import { motion } from "framer-motion"
import { Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/marketing/hero-section"
import { SiteShell } from "@/components/marketing/site-shell"
import { heroContent } from "@/data/content"

const fadeInUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } }

export default function PricingPage() {
  return (
    <SiteShell>
      <HeroSection content={heroContent.pricing} />
      <section className="py-20 md:py-28">
        <div className="container-page text-center max-w-2xl mx-auto">
          <motion.div className="card p-10 md:p-14" {...fadeInUp}>
            <div className="w-16 h-16 rounded-2xl bg-primary-light flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Get In Touch For Pricing</h2>
            <p className="text-muted leading-relaxed mb-8">
              KnowledgeOS is tailored to your organization&apos;s needs. Contact our team for a custom quote,
              enterprise demo, or to discuss your specific requirements.
            </p>
            <Button variant="primary" size="lg" asChild>
              <a href="mailto:sales@knowledgeos.com">
                Contact Sales
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
      <section className="py-20 md:py-28 bg-primary-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark pointer-events-none" />
        <div className="container-page relative z-10 text-center">
          <motion.h2 className="text-3xl md:text-4xl font-bold tracking-tight" {...fadeInUp}>
            Not Ready To Talk?
          </motion.h2>
          <motion.p className="mt-4 text-lg text-white/80 max-w-xl mx-auto" {...fadeInUp}>
            Try the builder and see how KnowledgeOS works with your own documents.
          </motion.p>
          <motion.div className="mt-8" {...fadeInUp}>
            <Button variant="secondary" size="lg" asChild>
              <a href="/build-your-bot">Build Your Bot <ArrowRight className="w-4 h-4" /></a>
            </Button>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  )
}
