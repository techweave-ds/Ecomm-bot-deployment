"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { navLinks, siteConfig } from "@/data/content"

export function MarketingNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false)
  }, [pathname])

  if (pathname.startsWith("/lab")) return null

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/90 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container-page flex items-center justify-between h-16 md:h-18">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-foreground shrink-0">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white text-sm font-bold">K</span>
          </div>
          {siteConfig.name}
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                pathname === link.href
                  ? "text-primary bg-primary-light"
                  : "text-muted hover:text-foreground hover:bg-gray-50",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="primary" size="md" asChild>
            <Link href="/build-your-bot">
              Build Your Bot
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-b border-border overflow-hidden"
          >
            <div className="container-page py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                    pathname === link.href
                      ? "text-primary bg-primary-light"
                      : "text-muted hover:text-foreground hover:bg-gray-50",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-border mt-2">
                <Button variant="primary" size="md" className="w-full" asChild>
                  <Link href="/build-your-bot">
                    Build Your Bot
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
