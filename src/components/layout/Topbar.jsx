import { Bell, Menu, Search, CircleHelp } from 'lucide-react'
import { useNavigate } from 'react-router'
import { useAuthStore } from '@/stores/authStore'
import { initials, cn } from '@/lib/utils'
import { notifications } from '@/data/mock'
import { ThemeToggle } from '@/components/layout/ThemeToggle'

export function Topbar({ onOpenSidebar }) {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const unreadCount = notifications.filter((n) => !n.read).length
  const displayName = user?.displayName ?? user?.name ?? 'Guest'
  const userInitials = user?.initials ?? initials(user?.name ?? 'Guest')

  const iconBtn =
    'inline-flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors'

  return (
    <header className="sticky top-0 z-30 px-4 lg:px-0 pt-4 pb-2">
      <div className="flex h-12 items-center gap-3 rounded-2xl border border-border bg-card/90 backdrop-blur-md px-3.5 shadow-xl shadow-foreground/[0.03]">
        <button
          type="button"
          onClick={onOpenSidebar}
          className={cn(iconBtn, 'lg:hidden')}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="relative hidden md:block flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search policies, claims…"
            className="h-9 w-full rounded-xl border border-border bg-background pl-9 pr-3 text-[13px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-4 focus:ring-foreground/[0.06] focus:border-foreground transition-all"
          />
        </div>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => navigate('/faq')}
            className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3 rounded-xl text-[13px] font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <CircleHelp className="h-4 w-4" />
            FAQ
          </button>
          <button
            type="button"
            onClick={() => navigate('/faq')}
            className={cn(iconBtn, 'sm:hidden')}
            aria-label="Help and FAQ"
          >
            <CircleHelp className="h-5 w-5" />
          </button>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => navigate('/notifications')}
            className={cn(iconBtn, 'relative')}
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive ring-2 ring-card" />
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-secondary transition-colors ml-1"
          >
            <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-[11px] font-semibold shadow-md shadow-foreground/10">
              {userInitials}
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <p className="text-[13px] font-medium text-foreground">{displayName}</p>
              <p className="text-[11px] text-muted-foreground">
                {user?.phone || user?.email}
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}
