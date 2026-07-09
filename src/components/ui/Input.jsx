import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export const Input = forwardRef(function Input({ className, type = 'text', ...props }, ref) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        'flex h-11 w-full rounded-xl border border-border bg-background px-3.5 py-2',
        'text-sm text-foreground placeholder:text-muted-foreground/60',
        'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-foreground/[0.06] focus-visible:border-foreground',
        'disabled:cursor-not-allowed disabled:opacity-50 transition-all',
        className,
      )}
      {...props}
    />
  )
})

export function Label({ className, ...props }) {
  return (
    <label
      className={cn('text-sm font-medium text-foreground mb-2 block', className)}
      {...props}
    />
  )
}

export function FieldError({ children }) {
  if (!children) return null
  return <p className="mt-1.5 text-xs text-destructive">{children}</p>
}
