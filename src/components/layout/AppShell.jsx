import { useState } from 'react'
import { Outlet } from 'react-router'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { BottomNav } from './BottomNav'
import { LiveChat } from './LiveChat'

export function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <div className="hidden lg:flex lg:flex-shrink-0 lg:p-4 lg:pr-0">
          <Sidebar className="sticky top-4 h-[calc(100vh-2rem)]" />
        </div>

        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex p-4">
            <div
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <div className="relative z-10 h-full">
              <Sidebar
                onNavigate={() => setMobileOpen(false)}
                className="h-full shadow-2xl"
              />
            </div>
          </div>
        )}

        <div className="flex flex-1 flex-col min-w-0 lg:pl-2">
          <Topbar onOpenSidebar={() => setMobileOpen(true)} />
          <main className="flex-1 px-4 pb-22 lg:px-5 lg:pb-6">
            <div className="max-w-6xl mx-auto w-full animate-fade-in">
              <Outlet />
            </div>
          </main>
          <BottomNav />
          <LiveChat />
        </div>
      </div>
    </div>
  )
}
