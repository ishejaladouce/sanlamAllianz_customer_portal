import { useNavigate } from 'react-router'
import { AlertTriangle, Check, FileText } from 'lucide-react'
import { toast } from 'sonner'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { formatCurrency, formatDate, cn } from '@/lib/utils'
import { status } from '@/lib/statusStyles'
import { policies } from '@/data/mock'

const statusConfig = {
  Active: {
    label: 'In Force',
    text: 'text-muted-foreground',
    primaryLabel: 'Notify claim',
  },
  Dormant: {
    label: 'Dormant',
    border: status.attention.border,
    text: status.attention.text,
    accent: status.attention.text,
    primaryLabel: 'Pay outstanding',
  },
  'Paid Up': {
    label: 'Paid Up',
    border: status.active.border,
    text: status.active.text,
    accent: status.active.text,
    primaryLabel: 'Request surrender',
  },
  Lapsed: {
    label: 'Lapsed',
    border: status.attention.border,
    text: status.attention.text,
    accent: status.attention.text,
    primaryLabel: 'Contact support',
  },
}

function PolicyStat({ label, value, muted }) {
  return (
    <div>
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p
        className={cn(
          'mt-0.5 text-sm font-medium tabular-nums',
          muted ? 'text-muted-foreground' : 'text-foreground',
        )}
      >
        {value}
      </p>
    </div>
  )
}

function PolicyCard({ policy }) {
  const navigate = useNavigate()
  const config = statusConfig[policy.status] ?? statusConfig.Active
  const isDormant = policy.status === 'Dormant'
  const isPaidUp = policy.status === 'Paid Up'
  const needsAttention = isDormant || isPaidUp || policy.status === 'Lapsed'
  const missedPayments = policy.overdueMonths ?? 3

  const handleStatement = () => toast.success('Statement download started')
  const handleContract = () => toast.success('Contract download started')

  const handlePrimary = () => {
    if (isDormant) {
      navigate('/payments')
      return
    }
    if (isPaidUp) {
      navigate('/claims/new')
      return
    }
    navigate('/claims/new')
  }

  return (
    <article
      className={cn(
        'flex flex-col rounded-xl border border-border bg-card shadow-sm',
        'hover:shadow-md hover:border-foreground/10 transition-all duration-200 overflow-hidden',
        needsAttention && 'border-l-[3px]',
        needsAttention && config.border,
      )}
    >
      {isDormant && (
        <div className="flex items-start gap-2 border-b border-border/60 bg-secondary/50 px-4 py-2.5 text-[12px] leading-snug text-muted-foreground">
          <AlertTriangle className={cn('mt-0.5 h-3.5 w-3.5 shrink-0', config.accent)} />
          <span>
            <span className={cn('font-medium', config.accent)}>Dormant</span>
            {' — '}
            {missedPayments} missed payment{missedPayments === 1 ? '' : 's'}. Pay now to avoid
            lapsing.
          </span>
        </div>
      )}

      {isPaidUp && (
        <div className="flex items-start gap-2 border-b border-border/60 bg-secondary/50 px-4 py-2.5 text-[12px] leading-snug text-muted-foreground">
          <Check className={cn('mt-0.5 h-3.5 w-3.5 shrink-0', config.accent)} />
          <span>
            <span className={cn('font-medium', config.accent)}>Paid Up</span>
            {' — '}
            All scheduled premiums received. Maturity payout is set for{' '}
            {formatDate(policy.maturityDate)}.
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-mono text-base font-semibold text-foreground tracking-tight">
              {policy.policyNumber}
            </h3>
            <p className="mt-0.5 text-[13px] text-muted-foreground">{policy.fullPlanName}</p>
          </div>
          <span className={cn('shrink-0 text-xs font-medium', config.text)}>
            {config.label}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4">
          <PolicyStat label="Premium" value={formatCurrency(policy.premium)} />
          <PolicyStat label="Total paid" value={formatCurrency(policy.totalPaid)} />
          <PolicyStat
            label="Effective date"
            value={formatDate(policy.startDate)}
            muted
          />
          <PolicyStat
            label="Maturity date"
            value={formatDate(policy.maturityDate)}
            muted
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-2 border-t border-border/60 pt-4">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 min-w-[100px] bg-secondary/50 border-border/80 text-foreground"
            onClick={handleStatement}
          >
            Statement
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 min-w-[100px] bg-secondary/50 border-border/80 text-foreground"
            onClick={handleContract}
          >
            Contract
          </Button>
          <Button size="sm" className="flex-1 min-w-[120px]" onClick={handlePrimary}>
            <FileText className="h-3.5 w-3.5" />
            {config.primaryLabel}
          </Button>
        </div>
      </div>
    </article>
  )
}

export default function Policies() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My policies"
        description="View premiums, beneficiaries and maturity dates for all your cover."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {policies.map((policy) => (
          <PolicyCard key={policy.id} policy={policy} />
        ))}
      </div>
    </div>
  )
}
