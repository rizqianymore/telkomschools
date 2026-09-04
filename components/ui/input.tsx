import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-md border border-neutral-300 bg-white px-3.5 py-2 text-sm text-neutral-900 transition-colors outline-none placeholder:text-neutral-400 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100",
        className
      )}
      {...props}
    />
  )
}

export { Input }
