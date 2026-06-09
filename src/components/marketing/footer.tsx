"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { siteConfig, navLinks } from "@/data/content"

const footerLinks = {
  Product: [
    { label: "Features", href: "/product" },
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
    { label: "Contact", href: "#contact" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
}

export function Footer() {
  const pathname = usePathname()
  if (pathname.startsWith("/lab")) return null

  return (
    <footer className="border-t border-border bg-card">
      <div className="container-page py-16">
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
  )
}
