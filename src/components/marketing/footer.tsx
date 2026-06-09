"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { siteConfig, navLinks } from "@/data/content"
import { fadeInUp } from "@/lib/animations"

const footerLinks = {
  Product: [
    { label: "Product", href: "/product" },
    { label: "Pricing", href: "/pricing" },
    { label: "Demo", href: "/demo" },
    { label: "Build Your Bot", href: "/build-your-bot" },
  ],
  Solutions: [
    { label: "Customer Support", href: "/solutions" },
    { label: "Internal Knowledge", href: "/solutions" },
    { label: "HR Assistant", href: "/solutions" },
    { label: "Compliance", href: "/solutions" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Blog", href: "#" },
    { label: "FAQ", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Contact", href: "mailto:sales@knowledgeos.com" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
}

export function Footer() {
  const pathname = usePathname()
  if (pathname.startsWith("/lab")) return null

  return (
    <>
      <section className="relative overflow-hidden bg-[#0f172a] text-white py-20 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Ready To Build An AI Assistant Your Team Can Trust?
            </h2>
            <p className="text-lg text-white/60 max-w-xl mx-auto mb-8">
              Upload your first document and get a working AI assistant in under 5 minutes. No code required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-white text-[#0f172a] hover:bg-white/90" asChild>
                <Link href="/build-your-bot">
                  Build Your Bot
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10" asChild>
                <Link href="/demo">
                  <Play className="w-4 h-4" />
                  Watch Demo
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-border bg-card dark:bg-gray-900">
        <div className="container-page py-14">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 font-bold text-lg text-foreground mb-4">
                <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-white text-xs font-bold">K</span>
                </div>
                {siteConfig.name}
              </Link>
              <p className="text-sm text-muted leading-relaxed max-w-xs">
                {siteConfig.description}
              </p>
            </div>
            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading}>
                <h4 className="text-sm font-semibold text-foreground mb-3">{heading}</h4>
                <ul className="flex flex-col gap-2">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-muted hover:text-foreground transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-border">
          <div className="container-page py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-muted">&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
            <div className="flex items-center gap-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-xs text-muted hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
