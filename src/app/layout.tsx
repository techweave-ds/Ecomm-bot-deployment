import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "KnowledgeOS — The Operating System for Enterprise Knowledge",
  description: "KnowledgeOS helps enterprises measure, validate, and optimize the knowledge powering their AI systems. Make AI explainable, auditable, and trustworthy.",
}

const themeScript = `
try {
  const t = localStorage.getItem("theme")
  if (t === "dark" || (!t && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.documentElement.classList.add("dark")
  }
} catch(e) {}
`

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased text-base">
        {children}
      </body>
    </html>
  )
}
