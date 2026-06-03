import { type HTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "outline"
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
          {
            "bg-primary-light text-primary": variant === "default",
            "bg-emerald-50 text-emerald-700": variant === "success",
            "bg-amber-50 text-amber-700": variant === "warning",
            "bg-red-50 text-red-700": variant === "danger",
            "border border-border text-muted": variant === "outline",
          },
          className,
        )}
        {...props}
      />
    )
  },
)
Badge.displayName = "Badge"

export { Badge, type BadgeProps }
