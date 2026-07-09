import { useNavigate } from 'react-router'
import {
  FileText,
  ArrowRight,
  AlertTriangle,
  Check,
  ShieldCheck,
  TrendingUp,
  CalendarClock,
  Sparkles,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useAuthStore } from '@/stores/authStore'
import { formatCurrency, formatShortDate, cn } from '@/lib/utils'
import { status } from '@/lib/statusStyles'
import {
  getActivePolicies,
  getDormantPolicies,
  getOpenClaims,
  getTotalReceivedPayments,
  getDashboardActivity,
  getClaimById,
  policies,
} from '@/data/mock'

const featuredClaim = getClaimById('clm_001')

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function StatCard({ icon: Icon, label, value, hint, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left w-full group"
    >
      <Card className="h-full transition-all duration-200 hover:shadow-2xl hover:shadow-foreground/[0.06] hover:border-foreground/15">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="h-9 w-9 rounded-lg bg-secondary border border-border/80 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors duration-200">
              <Icon className="h-4 w-4" />
            </div>
            {hint && (
              <Badge tone="subtle" className="shrink-0">
                {hint}
              </Badge>
            )}
          </div>
          <p className="mt-3 text-[13px] text-muted-foreground">{label}</p>
          <p className="mt-0.5 text-lg font-semibold tracking-tight tabular-nums">
            {value}
          </p>
        </CardContent>
      </Card>
    </button>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const firstName =
    user?.displayName?.split(' ')[0] ?? user?.name?.split(' ')[0] ?? 'there'
  const activeCount = getActivePolicies().length
  const openClaims = getOpenClaims()
  const dormant = getDormantPolicies()[0]
  const totalPaid = getTotalReceivedPayments()
  const nextMaturity = policies.find((p) => p.policyNumber === 'F425316')
  const activity = getDashboardActivity()
  const needsAttention = Boolean(dormant)

  return (
    <div className="space-y-6">
      {/* Welcome hero */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-foreground/[0.04] p-5 sm:p-6">
        <div
          className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-primary/[0.04]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-primary/[0.03]"
          aria-hidden
        />
        <div className="relative flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/80 px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" />
              {getGreeting()}, {firstName}
            </div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight leading-snug">
              {needsAttention
                ? 'One thing needs your attention'
                : 'Everything looks good'}
            </h1>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              {needsAttention
                ? 'Review your dormant policy and open claims to keep your cover active.'
                : 'Your policies, claims and payments — all in one calm place.'}
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm">
            <span
              className={cn(
                'h-2.5 w-2.5 rounded-full',
                needsAttention ? cn(status.attention.bar, 'animate-pulse') : 'bg-primary',
              )}
            />
            <span className="text-muted-foreground">
              {needsAttention ? '1 action required' : 'Portfolio healthy'}
            </span>
          </div>
        </div>
      </div>

      {dormant && (
        <div className={cn(
          'flex flex-wrap items-center justify-between gap-4 rounded-2xl border px-6 py-5',
          'border-border/60 bg-status-attention-surface',
        )}>
          <div className="flex items-start gap-4">
            <div className={cn('h-11 w-11 rounded-xl flex items-center justify-center shrink-0', status.attention.surface)}>
              <AlertTriangle className={cn('h-5 w-5', status.attention.text)} />
            </div>
            <div>
              <p className="font-medium text-foreground">
                Policy {dormant.policyNumber} is dormant
              </p>
              <p className="text-sm text-muted-foreground mt-1 max-w-md leading-relaxed">
                {formatCurrency(dormant.overdueAmount)} overdue · {dormant.overdueMonths}{' '}
                missed premiums on your {dormant.plan} plan.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="shrink-0"
            onClick={() => navigate('/payments')}
          >
            Pay outstanding
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* KPI grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={ShieldCheck}
          label="Active policies"
          value={activeCount}
          hint={`of ${policies.length}`}
          onClick={() => navigate('/policies')}
        />
        <StatCard
          icon={FileText}
          label="Open claims"
          value={openClaims.length}
          hint="In progress"
          onClick={() => navigate('/claims')}
        />
        <StatCard
          icon={TrendingUp}
          label="Received YTD"
          value={formatCurrency(totalPaid)}
          onClick={() => navigate('/payments')}
        />
        <StatCard
          icon={CalendarClock}
          label="Next maturity"
          value={formatShortDate(nextMaturity?.maturityDate)}
          hint={nextMaturity?.plan}
          onClick={() => navigate('/policies')}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent activity</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/claims')}>
              View all
            </Button>
          </CardHeader>
          <CardContent className="space-y-1 pt-2">
            {activity.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-4 rounded-xl px-3 py-3.5 hover:bg-secondary/60 transition-colors"
              >
                <div
                  className={cn(
                    'h-9 w-9 rounded-xl flex items-center justify-center shrink-0 border',
                    item.tone === 'success' && 'bg-secondary border-border',
                    item.tone === 'warning' && cn(status.attention.surface, 'border-border/60'),
                    item.tone === 'danger' && 'bg-destructive/10 border-destructive/20',
                  )}
                >
                  <span
                    className={cn(
                      'h-2 w-2 rounded-full',
                      item.tone === 'success' && 'bg-primary',
                      item.tone === 'warning' && status.attention.bar,
                      item.tone === 'danger' && 'bg-destructive',
                    )}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                </div>
                <span className="text-xs text-muted-foreground shrink-0 tabular-nums">
                  {formatShortDate(item.date)}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {featuredClaim && (
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Claim progress</CardTitle>
              <p className="text-xs text-muted-foreground font-mono mt-1">
                {featuredClaim.reference}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-5">
                {featuredClaim.claimType}
              </p>
              <ol className="space-y-4">
                {featuredClaim.journey.map((step, i) => (
                  <li key={step.step} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <span
                        className={cn(
                          'flex h-8 w-8 items-center justify-center rounded-xl text-xs border transition-colors',
                          step.done &&
                            'bg-primary text-primary-foreground border-primary shadow-sm',
                          step.active &&
                            'border-primary bg-primary/10 text-foreground ring-4 ring-primary/10',
                          !step.done &&
                            !step.active &&
                            'border-border text-muted-foreground bg-secondary/50',
                        )}
                      >
                        {step.done ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <span className="text-[11px] font-medium">{i + 1}</span>
                        )}
                      </span>
                      {i < featuredClaim.journey.length - 1 && (
                        <span className="w-px h-4 bg-border mt-1" />
                      )}
                    </div>
                    <div className="pt-1 min-w-0 flex-1">
                      <p
                        className={cn(
                          'text-sm',
                          step.active || step.done
                            ? 'font-medium text-foreground'
                            : 'text-muted-foreground',
                        )}
                      >
                        {step.step}
                      </p>
                      {step.date && (
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          {formatShortDate(step.date)}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
