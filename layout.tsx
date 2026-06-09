"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { KnowledgeHealthBanner } from "@/components/lab/knowledge-banner"
import {
  Beaker,
  LayoutDashboard,
  FileText,
  GitBranch,
  BarChart3,
  Settings,
  Sparkles,
  Gauge,
  Wrench,
} from "lucide-react"

const navItems = [
  { href: "/lab", label: "Home", icon: Beaker, exact: true },
  { href: "/lab/workspace", label: "Workspace", icon: LayoutDashboard },
  { href: "/lab/builder", label: "Builder", icon: Wrench },
  { href: "/lab/documents", label: "Documents", icon: FileText },
  { href: "/lab/pipeline", label: "Pipeline", icon: GitBranch },
  { href: "/lab/dashboard", label: "Dashboard", icon: Gauge },
  { href: "/lab/insights", label: "Insights", icon: BarChart3 },
  { href: "/lab/settings", label: "Settings", icon: Settings },
]

export default function LabLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="flex h-14 items-center justify-between px-6">
          <Link href="/lab" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-sm tracking-tight">
              TechWeave DS AI Lab
            </span>
          </Link>
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "bg-primary-light text-primary"
                      : "text-muted hover:text-foreground hover:bg-gray-100",
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </header>
      <KnowledgeHealthBanner />
      <main>{children}</main>
    </div>
  )
}
