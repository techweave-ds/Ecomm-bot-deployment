import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "KnowledgeOS — The Operating System for Enterprise Knowledge",
  description: "KnowledgeOS helps enterprises measure, validate, and optimize the knowledge powering their AI systems. Make AI explainable, auditable, and trustworthy.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}
