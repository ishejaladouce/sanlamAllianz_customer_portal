import { cn } from '@/lib/utils'

export function PageHeader({ eyebrow, title, description, action, className }) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-end justify-between gap-3 mb-6',
        className,
      )}
    >
      <div className="space-y-1 max-w-2xl">
        {eyebrow && (
          <p className="text-[11px] font-medium text-muted-foreground tracking-wide uppercase">
            {eyebrow}
          </p>
        )}
        <h1 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight leading-snug">
          {title}
        </h1>
        {description && (
          <p className="text-[13px] text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
