import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className }) {
  const { theme, setTheme } = useTheme()

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-xl border border-border bg-muted/60 p-0.5',
        className,
      )}
      role="group"
      aria-label="Theme"
    >
      {[
        { value: 'light', icon: Sun, label: 'Light mode' },
        { value: 'dark', icon: Moon, label: 'Dark mode' },
      ].map(({ value, icon: Icon, label }) => {
        const active = theme === value
        return (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            aria-label={label}
            aria-pressed={active}
            className={cn(
              'inline-flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200',
              active
                ? 'bg-card text-foreground shadow-sm ring-1 ring-border/60'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <Icon className="h-4 w-4" />
          </button>
        )
      })}
    </div>
  )
}
