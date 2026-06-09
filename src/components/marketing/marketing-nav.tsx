"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ArrowRight, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { navLinks, siteConfig } from "@/data/content"
import { useTheme } from "@/lib/use-theme"

export function MarketingNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [atTop, setAtTop] = useState(true)
  const pathname = usePathname()
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      setAtTop(y < 5)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const prevPath = useRef(pathname)
  useEffect(() => {
    if (prevPath.current !== pathname) {
      prevPath.current = pathname
      setIsOpen(false)
    }
  }, [pathname])

  if (pathname.startsWith("/lab")) return null

  const linkClass = (href: string) =>
    cn(
      "relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
      pathname === href
        ? "text-primary bg-primary-light"
        : "text-muted hover:text-foreground hover:bg-gray-50 dark:hover:bg-gray-800",
    )

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-border shadow-sm"
          : atTop
            ? "bg-transparent"
            : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-transparent",
      )}
    >
      <div className="container-page flex items-center justify-between h-16 md:h-18">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-foreground shrink-0 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center transition-transform group-hover:scale-105 duration-200">
            <span className="text-white text-sm font-bold">K</span>
          </div>
          <span className="transition-opacity group-hover:opacity-80">{siteConfig.name}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <button onClick={toggle} className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Toggle theme">
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <Button variant="primary" size="md" asChild>
            <Link href="/build-your-bot">
              Build Your Bot
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
            className="md:hidden bg-white dark:bg-gray-900 border-b border-border overflow-hidden shadow-lg"
          >
            <div className="container-page py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={linkClass(link.href) + " py-2.5"}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-border mt-2 flex flex-col gap-2">
                <Button variant="primary" size="md" className="w-full" asChild>
                  <Link href="/build-your-bot">
                    Build Your Bot
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <button onClick={toggle} className="flex items-center justify-center gap-2 w-full p-2.5 rounded-lg text-sm font-medium text-muted hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  {theme === "light" ? "Dark Mode" : "Light Mode"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
