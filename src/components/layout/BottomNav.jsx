import { NavLink } from 'react-router'
import {
  LayoutDashboard,
  ShieldCheck,
  FileText,
  Wallet,
  UserCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const items = [
  { to: '/dashboard', label: 'Home', icon: LayoutDashboard, end: true },
  { to: '/policies', label: 'Policies', icon: ShieldCheck },
  { to: '/claims', label: 'Claims', icon: FileText },
  { to: '/payments', label: 'Pay', icon: Wallet },
  { to: '/profile', label: 'Profile', icon: UserCircle },
]

export function BottomNav() {
  return (
    <nav className="lg:hidden fixed bottom-4 inset-x-4 z-40">
      <div className="flex items-stretch justify-around h-16 rounded-2xl border border-border bg-card/95 backdrop-blur-md shadow-xl shadow-foreground/[0.08] px-1">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                'flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl mx-0.5 my-1.5 text-[10px] font-medium transition-all',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-md shadow-foreground/10'
                  : 'text-muted-foreground',
              )
            }
          >
            <Icon className="h-[18px] w-[18px]" />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
