import { useNavigate } from 'react-router'
import {
  FileText,
  ArrowRight,
  AlertTriangle,
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
  policies,
} from '@/data/mock'

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

const claimStatusLabel = {
  'Under Review': 'Under review',
  'Pending Information': 'Pending info',
}

function OpenClaimProgress({ claim, onView }) {
  const activeStep =
    claim.journey?.find((s) => s.active) ??
    claim.journey?.find((s) => !s.done)
  const statusLabel = claimStatusLabel[claim.status] ?? claim.status
  const needsAction = claim.status === 'Pending Information'

  return (
    <button
      type="button"
      onClick={() => onView(claim.id)}
      className="w-full text-left rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:border-foreground/15 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground leading-snug truncate">
            {claim.claimType}
          </p>
          <p className="text-[11px] font-mono text-muted-foreground mt-0.5">
            {claim.reference}
          </p>
        </div>
        <span
          className={cn(
            'text-[11px] font-medium shrink-0',
            needsAction ? status.attention.text : status.active.text,
          )}
        >
          {statusLabel}
        </span>
      </div>

      {claim.journey?.length > 0 && (
        <div className="mt-3 flex gap-1">
          {claim.journey.map((step) => (
            <span
              key={step.step}
              className={cn(
                'h-1 flex-1 rounded-full',
                step.done && 'bg-primary',
                step.active && !step.done && 'bg-primary/35',
                !step.done && !step.active && 'bg-border',
              )}
              title={step.step}
            />
          ))}
        </div>
      )}

      <div className="mt-3 flex items-center justify-between gap-2">
        <p className="text-[12px] text-muted-foreground truncate">
          {activeStep
            ? `Current: ${activeStep.step}`
            : 'Processing complete'}
        </p>
        <span className="text-[11px] font-medium text-foreground shrink-0 inline-flex items-center gap-0.5">
          View
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
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

        {openClaims.length > 0 ? (
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between gap-2">
              <div>
                <CardTitle>Open claims</CardTitle>
                <p className="text-xs text-muted-foreground mt-1">
                  {openClaims.length} in progress — tap to see full journey
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('/claims')}>
                All claims
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {openClaims.map((claim) => (
                <OpenClaimProgress
                  key={claim.id}
                  claim={claim}
                  onView={(id) => navigate(`/claims/${id}`)}
                />
              ))}
            </CardContent>
          </Card>
        ) : (
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Claims</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                No open claims right now.
              </p>
              <Button variant="outline" size="sm" onClick={() => navigate('/claims')}>
                View claim history
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
