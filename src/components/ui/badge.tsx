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
            "bg-success-light text-success-foreground": variant === "success",
            "bg-warning-light text-warning-foreground": variant === "warning",
            "bg-destructive-light text-destructive-foreground": variant === "danger",
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
