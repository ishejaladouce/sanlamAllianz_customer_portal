import { cn } from '@/lib/utils'

const tones = {
  default: 'bg-secondary text-secondary-foreground border-border',
  outline: 'bg-transparent border-border text-foreground',
  subtle: 'bg-foreground/5 text-foreground border-transparent',
  success: 'bg-secondary text-foreground border-border',
  warning: 'bg-status-attention-surface text-foreground border-border/60',
  danger: 'bg-destructive/10 text-destructive border-destructive/20',
  accent: 'bg-primary text-primary-foreground border-transparent',
}

export function Badge({ className, tone = 'default', children, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5',
        'text-xs font-medium',
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
