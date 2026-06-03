import { type TextareaHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoExpand?: boolean
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, autoExpand, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoExpand) {
        e.target.style.height = "auto"
        e.target.style.height = `${e.target.scrollHeight}px`
      }
      onChange?.(e)
    }

    return (
      <textarea
        ref={ref}
        className={cn(
          "flex w-full rounded-xl border border-border bg-card px-4 py-3 text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none min-h-[48px]",
          className,
        )}
        onChange={handleChange}
        {...props}
      />
    )
  },
)
Textarea.displayName = "Textarea"

export { Textarea }
