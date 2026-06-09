"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function BuildBotRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/lab/builder")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-sm font-bold">K</span>
        </div>
        <p className="text-sm text-muted">Redirecting to Builder...</p>
      </div>
    </div>
  )
}
