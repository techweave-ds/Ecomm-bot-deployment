"use client"

import { MarketingNav } from "@/components/marketing/marketing-nav"
import { Footer } from "@/components/marketing/footer"

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MarketingNav />
      <main>{children}</main>
      <Footer />
    </>
  )
}
