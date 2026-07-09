import { NavLink } from 'react-router'
import {
  LayoutDashboard,
  ShieldCheck,
  FileText,
  UserCircle,
  LogOut,
  Wallet,
  Bell,
  HeadphonesIcon,
  MessageSquare,
} from 'lucide-react'
import { Logo } from './Logo'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/authStore'

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/policies', label: 'Policies', icon: ShieldCheck },
  { to: '/claims', label: 'Claims', icon: FileText },
  { to: '/payments', label: 'Payments', icon: Wallet },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/services', label: 'Services', icon: HeadphonesIcon },
  { to: '/feedback', label: 'Feedback', icon: MessageSquare },
  { to: '/profile', label: 'Profile', icon: UserCircle },
]

export function Sidebar({ onNavigate, className }) {
  const logout = useAuthStore((s) => s.logout)

  return (
    <aside
      className={cn(
        'flex h-full w-[220px] flex-col rounded-2xl border border-border bg-card',
        'shadow-xl shadow-foreground/[0.04]',
        className,
      )}
    >
      <div className="flex h-14 shrink-0 items-center border-b border-border/60 px-4">
        <Logo size="sm" showSubtitle={false} className="w-full" />
      </div>

      <nav className="flex-1 px-2.5 py-3 space-y-0.5 overflow-y-auto">
        {nav.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-all duration-200',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-md shadow-foreground/10'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
              )
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border/60 p-3">
        <button
          onClick={logout}
          className="flex w-full items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  )
}
