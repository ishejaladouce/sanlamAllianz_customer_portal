import { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Upload,
  AlertTriangle,
  X,
} from 'lucide-react'
import { OtpInput } from '@/components/ui/OtpInput'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/layout/Logo'
import { useAuthStore } from '@/stores/authStore'
import { cn, formatCurrency } from '@/lib/utils'
import { status } from '@/lib/statusStyles'
import {
  policies,
  rwBanks,
  maskNationalId,
  getClaimTypesForPlan,
  getClaimDocuments,
  getApprovalNotice,
  getPolicyById,
} from '@/data/mock'

const STEPS = [
  'Policy & type',
  'Verify identity',
  'Amount',
  'Documents',
  'Bank details',
  'Review',
]

export default function NewClaim() {
  const navigate = useNavigate()
  const authUser = useAuthStore((s) => s.user)

  const [step, setStep] = useState(0)
  const [policyId, setPolicyId] = useState('')
  const [claimType, setClaimType] = useState(null)
  const [otp, setOtp] = useState('')
  const [otpVerified, setOtpVerified] = useState(false)
  const [amount, setAmount] = useState('')
  const [documents, setDocuments] = useState({})
  const [bankName, setBankName] = useState('Equity Bank')
  const [accountNumber, setAccountNumber] = useState('')
  const [accountHolder, setAccountHolder] = useState(
    authUser?.name ?? 'BAHIZI JOSPIN RUGAMBA',
  )
  const [confirmed, setConfirmed] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const policy = getPolicyById(policyId)
  const applicableTypes = policy ? getClaimTypesForPlan(policy.plan) : []
  const requiredDocs = claimType ? getClaimDocuments(claimType.code) : []
  const amountNum = Number(amount.replace(/\D/g, '')) || 0
  const approvalNotice = getApprovalNotice(amountNum)

  const docsUploaded = requiredDocs.filter((d) => documents[d]).length
  const docsProgress = requiredDocs.length
    ? Math.round((docsUploaded / requiredDocs.length) * 100)
    : 0

  const canNext = (() => {
    switch (step) {
      case 0:
        return Boolean(policyId && claimType)
      case 1:
        return /^\d{6}$/.test(otp)
      case 2:
        return amountNum > 0
      case 3:
        return docsUploaded === requiredDocs.length
      case 4:
        return bankName && accountNumber.length >= 8 && accountHolder.trim()
      case 5:
        return confirmed
      default:
        return false
    }
  })()

  const verifyOtp = () => {
    if (/^\d{6}$/.test(otp)) {
      setOtpVerified(true)
      toast.success('Identity verified')
      return true
    }
    toast.error('Enter a valid 6-digit code')
    return false
  }

  const handleFile = (docName) => (e) => {
    const file = e.target.files?.[0]
    if (file) setDocuments((prev) => ({ ...prev, [docName]: file.name }))
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 800))
    setSubmitting(false)
    setSubmitted(true)
    toast.success('Claim submitted successfully')
  }

  const next = () => {
    if (step === 1 && !verifyOtp()) return
    if (step < STEPS.length - 1) setStep((s) => s + 1)
    else handleSubmit()
  }

  const back = () => setStep((s) => Math.max(0, s - 1))

  if (submitted) {
    const ref = `CLM-2025-${String(Math.floor(Math.random() * 9000) + 1000)}`
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center space-y-4">
            <div className={cn('mx-auto h-14 w-14 rounded-full flex items-center justify-center', status.positive.surface)}>
              <Check className={cn('h-7 w-7', status.positive.text)} />
            </div>
            <h1 className="text-xl font-semibold">Claim submitted</h1>
            <p className="text-sm text-muted-foreground">
              Your {claimType?.name} claim has been received.
            </p>
            <p className="font-mono text-lg font-semibold text-foreground">{ref}</p>
            <p className="text-xs text-muted-foreground">
              We will assess your claim within the applicable SLA period.
            </p>
            <Button className="w-full" onClick={() => navigate('/claims')}>
              View my claims
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="sm" showSubtitle={false} className="shrink-0" />
            <span className="text-sm font-medium text-foreground hidden sm:inline">
              New claim
            </span>
          </div>
          <button
            type="button"
            onClick={() => navigate('/claims')}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            Save &amp; exit
            <X className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex gap-1 mb-8 overflow-x-auto pb-1">
          {STEPS.map((label, i) => (
            <div
              key={label}
              className={cn(
                'flex-1 min-w-[72px] text-center',
                i <= step ? 'opacity-100' : 'opacity-40',
              )}
            >
              <div
                className={cn(
                  'h-1 rounded-full mb-2',
                  i < step && 'bg-primary',
                  i === step && 'bg-primary',
                  i > step && 'bg-border',
                )}
              />
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground truncate">
                {label}
              </p>
            </div>
          ))}
        </div>

        <Card>
          <CardContent className="p-6 sm:p-8 space-y-6">
            {step === 0 && (
              <>
                <div>
                  <h2 className="text-lg font-semibold">Select policy &amp; claim type</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Choose the policy and the type of claim you want to file.
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Policy</label>
                  <select
                    value={policyId}
                    onChange={(e) => {
                      setPolicyId(e.target.value)
                      setClaimType(null)
                    }}
                    className="w-full h-11 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select a policy</option>
                    {policies.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.policyNumber} — {p.plan} ({p.status})
                      </option>
                    ))}
                  </select>
                </div>
                {policy && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Claim type</label>
                    <div className="grid gap-2 max-h-64 overflow-y-auto">
                      {applicableTypes.map((t) => (
                        <button
                          key={t.code}
                          type="button"
                          onClick={() => setClaimType(t)}
                          className={cn(
                            'text-left rounded-lg border p-3 transition-colors',
                            claimType?.code === t.code
                              ? 'border-foreground bg-secondary'
                              : 'border-border hover:border-foreground/30',
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <Badge tone="outline" className="font-mono normal-case">
                              {t.code}
                            </Badge>
                            <span className="text-sm font-medium">{t.name}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {step === 1 && (
              <>
                <div>
                  <h2 className="text-lg font-semibold">Verify your identity</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    For your security, enter the 6-digit code sent to your mobile.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 font-mono">
                    ID: {maskNationalId(authUser?.nationalId ?? '')}
                  </p>
                </div>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  onComplete={() => setOtpVerified(true)}
                  autoFocus
                />
                {otpVerified && (
                  <p className={cn('text-sm flex items-center gap-1.5', status.positive.text)}>
                    <Check className="h-4 w-4" /> Verified
                  </p>
                )}
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <h2 className="text-lg font-semibold">Claim amount</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Enter the amount you wish to claim in RWF.
                  </p>
                </div>
                {policy && (
                  <p className="text-sm text-muted-foreground">
                    Sum assured:{' '}
                    <span className="font-mono font-medium text-foreground">
                      {formatCurrency(policy.sumAssured)}
                    </span>
                  </p>
                )}
                <div>
                  <label className="text-sm font-medium mb-2 block">Amount (RWF)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={amount}
                    onChange={(e) =>
                      setAmount(e.target.value.replace(/[^\d]/g, ''))
                    }
                    placeholder="0"
                    className="w-full h-12 rounded-lg border border-border bg-background px-4 font-mono text-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                {approvalNotice && (
                  <div className={cn('flex gap-2 rounded-lg border border-border/60 p-3 text-sm', status.attention.surface)}>
                    <AlertTriangle className={cn('h-4 w-4 shrink-0 mt-0.5', status.attention.text)} />
                    <span>{approvalNotice.message}</span>
                  </div>
                )}
              </>
            )}

            {step === 3 && (
              <>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold">Upload documents</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Required for {claimType?.code} — {claimType?.name}
                    </p>
                  </div>
                  <Badge tone="outline">{docsProgress}% complete</Badge>
                </div>
                <div className="space-y-3">
                  {requiredDocs.map((doc) => (
                    <div
                      key={doc}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border p-3"
                    >
                      <div>
                        <p className="text-sm font-medium">{doc}</p>
                        {documents[doc] && (
                          <p className="text-xs text-muted-foreground">{documents[doc]}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {documents[doc] ? (
                          <Badge tone="success">Uploaded</Badge>
                        ) : (
                          <Badge tone="warning">Required</Badge>
                        )}
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            className="hidden"
                            onChange={handleFile(doc)}
                          />
                          <span className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-accent">
                            <Upload className="h-3.5 w-3.5" />
                            Select file
                          </span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <div>
                  <h2 className="text-lg font-semibold">Bank details</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Payment will be made to this account after approval.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium mb-2 block">Bank name</label>
                    <select
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="w-full h-11 rounded-lg border border-border bg-background px-3 text-sm"
                    >
                      {rwBanks.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Account number
                    </label>
                    <input
                      value={accountNumber}
                      onChange={(e) =>
                        setAccountNumber(e.target.value.replace(/\D/g, ''))
                      }
                      className="w-full h-11 rounded-lg border border-border bg-background px-3 font-mono text-sm"
                      placeholder="Account number"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Account holder
                    </label>
                    <input
                      value={accountHolder}
                      onChange={(e) => setAccountHolder(e.target.value)}
                      className="w-full h-11 rounded-lg border border-border bg-background px-3 text-sm"
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Payment expected within 10 working days after approval for
                  withdrawal claims.
                </p>
              </>
            )}

            {step === 5 && (
              <>
                <div>
                  <h2 className="text-lg font-semibold">Review &amp; submit</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Confirm all details before submitting your claim.
                  </p>
                </div>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between gap-4 border-b border-border pb-2">
                    <dt className="text-muted-foreground">Policy</dt>
                    <dd className="font-mono font-medium text-right">
                      {policy?.policyNumber} · {policy?.plan}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-border pb-2">
                    <dt className="text-muted-foreground">Claim type</dt>
                    <dd className="text-right">
                      {claimType?.code} — {claimType?.name}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-border pb-2">
                    <dt className="text-muted-foreground">Amount</dt>
                    <dd className="font-mono font-medium">
                      {formatCurrency(amountNum)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-border pb-2">
                    <dt className="text-muted-foreground">Documents</dt>
                    <dd>{docsUploaded} of {requiredDocs.length} uploaded</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-border pb-2">
                    <dt className="text-muted-foreground">Bank</dt>
                    <dd className="text-right">
                      {bankName} · ****{accountNumber.slice(-4)}
                    </dd>
                  </div>
                </dl>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-sm text-muted-foreground">
                    I confirm all information is accurate and complete.
                  </span>
                </label>
              </>
            )}

            <div className="flex justify-between pt-4 border-t border-border">
              <Button
                variant="outline"
                onClick={back}
                disabled={step === 0}
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button onClick={next} disabled={!canNext || submitting}>
                {submitting ? (
                  'Submitting…'
                ) : step === STEPS.length - 1 ? (
                  'Submit claim'
                ) : (
                  <>
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
