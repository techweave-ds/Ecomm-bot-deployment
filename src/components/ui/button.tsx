"use client"

import { forwardRef, type ButtonHTMLAttributes } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-primary text-white hover:bg-primary-dark shadow-sm": variant === "primary",
            "bg-accent text-white hover:opacity-90 shadow-sm": variant === "secondary",
            "border-2 border-gray-200 dark:border-gray-600 bg-card dark:bg-gray-800 hover:bg-card-hover text-foreground dark:text-gray-100 shadow-sm": variant === "outline",
            "hover:bg-gray-100 text-muted hover:text-foreground": variant === "ghost",
            "bg-danger text-white hover:opacity-90": variant === "danger",
          },
          {
            "h-8 px-3 text-xs rounded-lg gap-1.5": size === "sm",
            "h-10 px-4 text-sm rounded-xl gap-2": size === "md",
            "h-12 px-6 text-base rounded-xl gap-2": size === "lg",
          },
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    )
  },
)
Button.displayName = "Button"

export { Button, type ButtonProps }
