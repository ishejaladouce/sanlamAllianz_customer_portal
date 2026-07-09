import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router'
import {
  ArrowLeft,
  Check,
  Upload,
  FileText,
  AlertTriangle,
} from 'lucide-react'
import { toast } from 'sonner'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  getClaimById,
  getSlaProgress,
  getEstimatedDecisionDate,
  isFuneralUrgent,
} from '@/data/mock'
import { formatCurrency, formatDate, formatShortDate, cn } from '@/lib/utils'
import { status } from '@/lib/statusStyles'

const statusText = {
  'Under Review': status.active.text,
  'Pending Information': status.attention.text,
  Paid: 'text-muted-foreground',
}

export default function ClaimDetail() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const claim = getClaimById(id)
  const focusUpload = searchParams.get('upload') === '1'

  useEffect(() => {
    if (focusUpload) {
      document.getElementById('documents')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [focusUpload])

  const [docState, setDocState] = useState(() =>
    claim?.documents?.map((d) => ({ ...d })) ?? [],
  )

  const docs = useMemo(
    () =>
      docState.length
        ? {
            uploaded: docState.filter((d) => d.status === 'uploaded').length,
            total: docState.length,
            pct: Math.round(
              (docState.filter((d) => d.status === 'uploaded').length / docState.length) * 100,
            ),
          }
        : { uploaded: 0, total: 0, pct: 100 },
    [docState],
  )

  if (!claim) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => navigate('/claims')}>
          <ArrowLeft className="h-4 w-4" />
          Back to claims
        </Button>
        <p className="text-muted-foreground">Claim not found.</p>
      </div>
    )
  }

  const sla = getSlaProgress(claim)
  const isPaid = claim.status === 'Paid'
  const isPending = claim.status === 'Pending Information'

  const handleUpload = (docName) => (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setDocState((prev) =>
      prev.map((d) => (d.name === docName ? { ...d, status: 'uploaded' } : d)),
    )
    toast.success(`${docName} uploaded`)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <Button variant="ghost" className="-ml-2" onClick={() => navigate('/claims')}>
        <ArrowLeft className="h-4 w-4" />
        Back to claims
      </Button>

      <PageHeader
        title={claim.claimType}
        description={`${claim.reference} · ${claim.claimCode} · ${claim.policyNumber} · ${claim.plan}`}
        action={
          !isPaid && (
            <span className={cn('text-sm font-medium', statusText[claim.status])}>
              {claim.status === 'Under Review' ? 'Under review' : claim.status}
            </span>
          )
        }
      />

      {isFuneralUrgent(claim) && (
        <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-secondary/50 px-4 py-3 text-[13px] text-muted-foreground">
          <AlertTriangle className={cn('h-4 w-4 shrink-0', status.attention.text)} />
          <span>
            <span className={cn('font-medium', status.attention.text)}>24-hour priority</span> — Funeral
            claims are processed within one working day once documents are complete.
          </span>
        </div>
      )}

      {isPending && (
        <div className="flex items-start gap-2 rounded-xl border border-border/60 bg-secondary/50 px-4 py-3 text-[13px] text-muted-foreground">
          <AlertTriangle className={cn('mt-0.5 h-4 w-4 shrink-0', status.attention.text)} />
          <span>{claim.notes}</span>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <p className="text-[11px] text-muted-foreground">Amount claimed</p>
            <p className="mt-1 text-lg font-semibold tabular-nums">
              {formatCurrency(claim.amountClaimed)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-[11px] text-muted-foreground">Submitted</p>
            <p className="mt-1 text-sm font-medium">{formatDate(claim.submittedDate)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-[11px] text-muted-foreground">
              {isPaid ? 'Paid on' : 'Est. decision'}
            </p>
            <p className="mt-1 text-sm font-medium">
              {isPaid
                ? formatDate(claim.paymentDate)
                : formatDate(getEstimatedDecisionDate(claim))}
            </p>
          </CardContent>
        </Card>
      </div>

      {isPaid && claim.paymentDate && (
        <Card>
          <CardContent className="p-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">Payment received</p>
              <p className="text-[13px] text-muted-foreground mt-1">
                {formatCurrency(claim.amountApproved ?? claim.amountClaimed)} via{' '}
                {claim.paymentMethod} · {claim.bankName} {claim.bankAccount}
              </p>
            </div>
            <div className={cn('h-10 w-10 rounded-full flex items-center justify-center', status.positive.surface)}>
              <Check className={cn('h-5 w-5', status.positive.text)} />
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Claim journey</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              {claim.journey.map((step, i) => (
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
                    {i < claim.journey.length - 1 && (
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
                    {step.issue && (
                      <p className={cn('text-[11px] mt-0.5', status.attention.text)}>{step.issue}</p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card id={focusUpload ? 'documents' : undefined}>
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <CardTitle>Documents</CardTitle>
              {docState.length > 0 && (
                <span className="text-xs text-muted-foreground tabular-nums">
                  {docs.uploaded}/{docs.total}
                </span>
              )}
            </div>
            {docState.length > 0 && (
              <div className="h-1.5 overflow-hidden rounded-full bg-secondary mt-2">
                <div
                  className={cn(
                    'h-full rounded-full transition-all',
                    docs.pct === 100 ? status.positive.bar : status.active.bar,
                  )}
                  style={{ width: `${docs.pct}%` }}
                />
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-3">
            {docState.length === 0 ? (
              <p className="text-sm text-muted-foreground">No documents on file.</p>
            ) : (
              docState.map((doc) => (
                <div
                  key={doc.name}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border p-3"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-sm font-medium truncate">{doc.name}</span>
                  </div>
                  {doc.status === 'uploaded' ? (
                    <span className={cn('text-xs font-medium flex items-center gap-1', status.positive.text)}>
                      <Check className="h-3.5 w-3.5" />
                      Uploaded
                    </span>
                  ) : (
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleUpload(doc.name)}
                      />
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary transition-colors">
                        <Upload className="h-3.5 w-3.5" />
                        Upload
                      </span>
                    </label>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {!isPaid && (
        <Card>
          <CardContent className="p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="text-[13px] text-muted-foreground">
              SLA:{' '}
              <span
                className={cn(
                  'font-medium',
                  sla.overdue ? status.attention.text : 'text-foreground',
                )}
              >
                {sla.label}
              </span>
              {claim.assignedOfficer && (
                <span className="ml-2">· Assigned to {claim.assignedOfficer}</span>
              )}
            </div>
            {claim.notes && !isPending && (
              <p className="text-[12px] text-muted-foreground w-full">{claim.notes}</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
