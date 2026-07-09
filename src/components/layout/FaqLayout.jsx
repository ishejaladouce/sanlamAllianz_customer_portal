import { Link, useNavigate } from 'react-router'
import { Logo } from '@/components/layout/Logo'
import { Button } from '@/components/ui/Button'
import { useAuthStore } from '@/stores/authStore'
import Faq from '@/pages/Faq'

export function FaqLayout() {
  const navigate = useNavigate()
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <Logo size="md" showSubtitle={false} />
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <Button size="sm" variant="outline" onClick={() => navigate('/dashboard')}>
                Back to portal
              </Button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-flex h-8 items-center px-3 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/login"
                  className="inline-flex h-8 items-center px-3 rounded-lg text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-8">
        <Faq />
      </main>
    </div>
  )
}
