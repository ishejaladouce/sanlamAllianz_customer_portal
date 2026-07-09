import { cn } from '@/lib/utils'

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-card text-card-foreground border border-border',
        'shadow-xl shadow-foreground/[0.04]',
        className,
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }) {
  return (
    <div
      className={cn('px-5 pt-5 pb-3 border-b border-border/60', className)}
      {...props}
    />
  )
}

export function CardTitle({ className, ...props }) {
  return (
    <h3
      className={cn('text-sm font-semibold text-foreground tracking-tight', className)}
      {...props}
    />
  )
}

export function CardDescription({ className, ...props }) {
  return (
    <p className={cn('text-sm text-muted-foreground mt-1', className)} {...props} />
  )
}

export function CardContent({ className, ...props }) {
  return <div className={cn('p-5', className)} {...props} />
}

export function CardFooter({ className, ...props }) {
  return (
    <div
      className={cn(
        'px-6 py-4 border-t border-border/60 flex items-center gap-3',
        className,
      )}
      {...props}
    />
  )
}
