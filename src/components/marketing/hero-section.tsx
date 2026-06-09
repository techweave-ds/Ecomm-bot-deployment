"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroContent {
  headline: string
  subheadline: string
  cta: {
    primary: { label: string; href: string }
    secondary: { label: string; href: string }
  }
}

export function HeroSection({ content, children }: { content: HeroContent; children?: React.ReactNode }) {
  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-light/40 via-transparent to-transparent pointer-events-none" />
      <div className="container-page relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]"
          >
            {content.headline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="mt-5 text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed"
          >
            {content.subheadline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="primary" size="lg" asChild>
              <Link href={content.cta.primary.href}>
                {content.cta.primary.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href={content.cta.secondary.href}>
                <Play className="w-4 h-4" />
                {content.cta.secondary.label}
              </Link>
            </Button>
          </motion.div>
        </div>
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
            className="mt-12 md:mt-16"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}
