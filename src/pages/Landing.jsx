import { Navigate, useNavigate, Link } from 'react-router'
import { ArrowRight, Shield, FileText, Wallet } from 'lucide-react'
import { Logo } from '@/components/layout/Logo'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { useAuthStore } from '@/stores/authStore'
import { formatCurrency, cn } from '@/lib/utils'
import { status } from '@/lib/statusStyles'

export default function Landing() {
  const navigate = useNavigate()
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Logo size="md" showSubtitle={false} />
          <div className="flex items-center gap-3">
            <Link
              to="/faq"
              className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              FAQ
            </Link>
            <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground border border-border rounded-full px-3 py-1">
              <span className="font-medium text-foreground">EN</span>
              <span>·</span>
              <span>FR</span>
              <span>·</span>
              <span>RW</span>
            </div>
            <Button variant="outline" onClick={() => navigate('/login')}>
              Sign in
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-semibold text-foreground tracking-tight leading-[1.1]">
                Your insurance, powerfully simple.
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                One secure portal for your SanlamAllianz policies, claims and
                payments in Rwanda.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button onClick={() => navigate('/register')}>
                Get started
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={() => navigate('/login')}>
                See how it works
              </Button>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5" />
                Bank-grade encryption
              </span>
              <span>Real-time claim tracking</span>
              <span>EN · FR · RW</span>
            </div>
          </div>

          <div className="relative h-[420px] hidden sm:block">
            <Card className="absolute top-0 right-0 w-[280px] shadow-xl shadow-foreground/5 rotate-2 z-10">
              <CardContent className="p-5 space-y-3">
                <Badge tone="success">Active</Badge>
                <p className="font-mono text-sm font-semibold">F425316</p>
                <p className="text-sm font-medium">NTABARA</p>
                <p className="font-mono text-lg font-semibold">
                  {formatCurrency(20000)}
                  <span className="text-xs font-sans text-muted-foreground">/mo</span>
                </p>
              </CardContent>
            </Card>

            <Card className="absolute top-24 left-0 w-[260px] shadow-lg shadow-foreground/5 -rotate-1 z-20">
              <CardContent className="p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="font-mono text-xs">CLM-2025-0041</span>
                </div>
                <p className="text-sm font-medium">Under Review</p>
                <p className="text-xs text-muted-foreground">ADW Claim · TEGANYA</p>
              </CardContent>
            </Card>

            <Card className="absolute bottom-4 right-8 w-[270px] shadow-lg shadow-foreground/5 rotate-1 z-30">
              <CardContent className="p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <Wallet className={cn('h-4 w-4', status.positive.text)} />
                  <span className={cn('text-sm font-medium', status.positive.text)}>
                    Payment received
                  </span>
                </div>
                <p className="font-mono text-lg font-semibold">
                  {formatCurrency(1800000)}
                </p>
                <p className="text-xs text-muted-foreground">Apr 2, 2025</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
