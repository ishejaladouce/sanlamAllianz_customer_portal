import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import {
  Plus,
  Search,
  Upload,
  AlertTriangle,
  ArrowRight,
  Clock,
  Hash,
} from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import {
  claims,
  getSlaProgress,
  getClaimDocumentProgress,
  claimNeedsAttention,
  getEstimatedDecisionDate,
  isFuneralUrgent,
} from '@/data/mock'
import { formatCurrency, formatDate, cn } from '@/lib/utils'
import { status } from '@/lib/statusStyles'

const filters = [
  { key: 'all', label: 'All' },
  { key: 'Under Review', label: 'Under Review' },
  { key: 'Pending Information', label: 'Pending Info' },
  { key: 'Paid', label: 'Paid' },
]

const statusConfig = {
  'Under Review': {
    label: 'Under review',
    text: status.active.text,
  },
  'Pending Information': {
    label: 'Pending info',
    border: status.attention.border,
    text: status.attention.text,
    accent: status.attention.text,
  },
  Paid: {
    label: 'Paid',
    text: 'text-muted-foreground',
  },
  Declined: {
    label: 'Declined',
    border: status.attention.border,
    text: status.attention.text,
    accent: status.attention.text,
  },
}

function slaBarColor(tone) {
  if (tone === 'success') return status.positive.bar
  if (tone === 'warning') return status.attention.bar
  return status.active.bar
}

function findClaimByReference(ref) {
  const q = ref.trim().toLowerCase()
  if (!q) return null
  return (
    claims.find((c) => c.reference.toLowerCase() === q) ??
    claims.find((c) => c.id.toLowerCase() === q) ??
    claims.find((c) => c.reference.toLowerCase().includes(q))
  )
}

function ClaimCard({ claim, onUpload }) {
  const navigate = useNavigate()
  const config = statusConfig[claim.status] ?? statusConfig['Under Review']
  const needsAttention = claimNeedsAttention(claim)
  const isPending = claim.status === 'Pending Information'
  const isPaid = claim.status === 'Paid'
  const sla = getSlaProgress(claim)
  const docs = getClaimDocumentProgress(claim)
  const urgent = isFuneralUrgent(claim)

  const nextStep = (() => {
    if (isPending) {
      const missing = claim.documents?.filter((d) => d.status === 'missing').map((d) => d.name)
      return missing?.length
        ? `Missing: ${missing.join(', ')}`
        : 'Upload required documents to continue'
    }
    if (isPaid && claim.paymentDate) {
      return `Paid ${formatDate(claim.paymentDate)} · ${claim.bankName ?? 'Bank'} ${claim.bankAccount ?? ''}`
    }
    if (claim.status === 'Under Review') {
      return `Assessing — est. decision by ${formatDate(getEstimatedDecisionDate(claim))}`
    }
    if (sla.overdue) return 'Past SLA — our team is prioritising your claim'
    return claim.notes ?? null
  })()

  const primaryAction = (() => {
    if (isPending) return { label: 'Upload documents', upload: true }
    if (isPaid) return { label: 'View payment' }
    return { label: 'View progress' }
  })()

  const handleCardClick = () => navigate(`/claims/${claim.id}`)

  return (
    <article
      className={cn(
        'group flex flex-col rounded-xl border border-border bg-card shadow-sm',
        'hover:shadow-md hover:border-foreground/10 transition-all duration-200 overflow-hidden cursor-pointer',
        needsAttention && 'border-l-[3px]',
        needsAttention && (config.border ?? status.attention.border),
      )}
      onClick={handleCardClick}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
      role="button"
      tabIndex={0}
    >
      {isPending && (
        <div
          className="flex items-start gap-2 border-b border-border/60 bg-secondary/50 px-4 py-2.5 text-[12px] leading-snug text-muted-foreground"
          onClick={(e) => e.stopPropagation()}
        >
          <AlertTriangle className={cn('mt-0.5 h-3.5 w-3.5 shrink-0', status.attention.text)} />
          <span>
            <span className={cn('font-medium', status.attention.text)}>Action required</span>
            {' — '}
            Upload missing documents to resume processing.
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold text-foreground leading-snug">
                {claim.claimType}
              </h3>
              {urgent && (
                <span className={cn('text-[10px] font-medium uppercase tracking-wide', status.attention.text)}>
                  24h priority
                </span>
              )}
            </div>
            <p className="mt-1 font-mono text-[11px] text-muted-foreground">
              {claim.reference} · {claim.claimCode} · {claim.policyNumber}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-sm font-semibold tabular-nums text-foreground">
              {formatCurrency(claim.amountClaimed)}
            </p>
            <span className={cn('text-xs font-medium', config.text)}>{config.label}</span>
          </div>
        </div>

        {!isPaid && docs.total > 0 && (
          <div className="mt-4 space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-muted-foreground">Documents</span>
              <span className="font-medium tabular-nums text-foreground">
                {docs.uploaded}/{docs.total}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
              <div
                className={cn(
                  'h-full rounded-full transition-all',
                  docs.pct === 100 ? status.positive.bar : status.active.bar,
                )}
                style={{ width: `${docs.pct}%` }}
              />
            </div>
          </div>
        )}

        <div className="mt-4 space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-muted-foreground">
              {isPaid ? 'SLA' : 'SLA progress'}
            </span>
            <span
              className={cn(
                'font-medium tabular-nums',
                sla.overdue ? status.attention.text : 'text-foreground',
              )}
            >
              {sla.label}
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
            <div
              className={cn('h-full rounded-full transition-all', slaBarColor(sla.tone))}
              style={{ width: `${Math.min(100, sla.pct)}%` }}
            />
          </div>
        </div>

        {nextStep && (
          <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground line-clamp-2">
            {nextStep}
          </p>
        )}

        <div
          className="mt-4 flex items-center justify-between border-t border-border/60 pt-3"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-[11px] text-muted-foreground">
            Submitted {formatDate(claim.submittedDate)}
          </span>
          <Button
            size="sm"
            variant={primaryAction.upload ? 'primary' : 'outline'}
            className={cn(
              'h-8 text-xs',
              !primaryAction.upload && 'bg-secondary/50 border-border/80',
            )}
            onClick={() =>
              primaryAction.upload ? onUpload(claim.id) : navigate(`/claims/${claim.id}`)
            }
          >
            {primaryAction.upload && <Upload className="h-3.5 w-3.5" />}
            {primaryAction.label}
            {!primaryAction.upload && <ArrowRight className="h-3.5 w-3.5" />}
          </Button>
        </div>
      </div>
    </article>
  )
}

export default function Claims() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [referenceQuery, setReferenceQuery] = useState('')

  const trackByReference = () => {
    const match = findClaimByReference(referenceQuery)
    if (!match) {
      toast.error('No claim found for that reference. Check the number and try again.')
      return
    }
    navigate(`/claims/${match.id}`)
  }

  const handleReferenceKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      trackByReference()
    }
  }

  const filtered = useMemo(() => {
    let list = claims
    if (filter !== 'all') list = list.filter((c) => c.status === filter)
    const q = query.trim().toLowerCase()
    if (!q) return list
    return list.filter(
      (c) =>
        c.reference.toLowerCase().includes(q) ||
        c.claimType.toLowerCase().includes(q) ||
        c.policyNumber.toLowerCase().includes(q) ||
        c.claimCode.toLowerCase().includes(q),
    )
  }, [filter, query])

  const attentionClaims = useMemo(
    () => filtered.filter(claimNeedsAttention),
    [filtered],
  )
  const regularClaims = useMemo(
    () => filtered.filter((c) => !claimNeedsAttention(c)),
    [filtered],
  )

  const filterCounts = useMemo(
    () => ({
      all: claims.length,
      'Under Review': claims.filter((c) => c.status === 'Under Review').length,
      'Pending Information': claims.filter((c) => c.status === 'Pending Information').length,
      Paid: claims.filter((c) => c.status === 'Paid').length,
    }),
    [],
  )

  const handleUpload = (id) => navigate(`/claims/${id}?upload=1`)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Your claims"
        description="Track withdrawals, refunds, maturity and other claim types."
        action={
          <Button onClick={() => navigate('/claims/new')}>
            <Plus className="h-4 w-4" />
            Start claim
          </Button>
        }
      />

      <Card className="border-border/80 shadow-sm">
        <CardContent className="p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-muted-foreground shrink-0" />
                <p className="text-sm font-medium text-foreground">Track by reference</p>
              </div>
              <p className="text-[12px] text-muted-foreground leading-relaxed">
                Enter the reference from your confirmation email, for example{' '}
                <span className="font-mono text-foreground/80">CLM-2025-0041</span>.
              </p>
            </div>
            <div className="flex w-full sm:w-auto gap-2 sm:min-w-[320px]">
              <Input
                value={referenceQuery}
                onChange={(e) => setReferenceQuery(e.target.value.toUpperCase())}
                onKeyDown={handleReferenceKeyDown}
                placeholder="CLM-2025-0041"
                className="h-10 font-mono text-sm bg-secondary/50 border-border/80"
              />
              <Button
                type="button"
                variant="outline"
                className="shrink-0"
                onClick={trackByReference}
                disabled={!referenceQuery.trim()}
              >
                Track
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by type, policy, or reference…"
            className="h-10 pl-10 bg-secondary/50 border-border/80"
          />
        </div>
        <div className="flex flex-wrap gap-2 p-1 rounded-2xl bg-secondary/80 border border-border/60 w-fit">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={cn(
                'rounded-xl px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200',
                filter === f.key
                  ? 'bg-card text-foreground shadow-sm border border-border/60'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {f.label}
              <span className="ml-1.5 text-xs opacity-60">{filterCounts[f.key]}</span>
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card/50 py-16 text-center">
          <p className="text-sm text-muted-foreground">No claims match your search.</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate('/claims/new')}>
            Start a claim
          </Button>
        </div>
      ) : (
        <>
          {attentionClaims.length > 0 && filter === 'all' && !query && (
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
                <Clock className={cn('h-4 w-4', status.attention.text)} />
                <span>
                  <span className="font-medium text-foreground">
                    {attentionClaims.length}
                  </span>{' '}
                  {attentionClaims.length === 1 ? 'claim needs' : 'claims need'} your attention
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {attentionClaims.map((c) => (
                  <ClaimCard key={c.id} claim={c} onUpload={handleUpload} />
                ))}
              </div>
            </section>
          )}

          {(regularClaims.length > 0 || filter !== 'all' || query) && (
            <section className="space-y-3">
              {attentionClaims.length > 0 && filter === 'all' && !query && (
                <h2 className="text-[13px] font-medium text-muted-foreground">All claims</h2>
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                {(filter === 'all' && !query ? regularClaims : filtered).map((c) => (
                  <ClaimCard key={c.id} claim={c} onUpload={handleUpload} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}
