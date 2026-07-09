import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { Lock } from 'lucide-react'
import { OtpInput } from '@/components/ui/OtpInput'
import { Logo } from '@/components/layout/Logo'
import { useAuthStore } from '@/stores/authStore'
import { authenticateUser, maskNationalId } from '@/data/mock'
import { cn } from '@/lib/utils'

const RESEND_SECONDS = 30

export default function VerifyOtp() {
  const navigate = useNavigate()
  const location = useLocation()
  const setAuth = useAuthStore((s) => s.setAuth)

  const idNumber = location.state?.idNumber ?? ''
  const [otp, setOtp] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [resendIn, setResendIn] = useState(RESEND_SECONDS)

  useEffect(() => {
    if (!idNumber) navigate('/register', { replace: true })
  }, [idNumber, navigate])

  useEffect(() => {
    if (resendIn <= 0) return
    const t = setInterval(() => setResendIn((s) => s - 1), 1000)
    return () => clearInterval(t)
  }, [resendIn])

  const validOtp = /^\d{6}$/.test(otp)
  const maskedId = idNumber ? maskNationalId(idNumber) : ''

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validOtp) return
    setSubmitting(true)
    try {
      await new Promise((r) => setTimeout(r, 500))
      const account = authenticateUser(idNumber) ?? {
        ...{ displayName: 'New Member', name: 'NEW MEMBER', initials: 'NM', email: '' },
        nationalId: idNumber,
        id: 'usr_new',
      }
      setAuth(account, 'demo-token')
      toast.success('Account verified')
      navigate('/dashboard', { replace: true })
    } finally {
      setSubmitting(false)
    }
  }

  const resend = async () => {
    if (resendIn > 0) return
    await new Promise((r) => setTimeout(r, 200))
    setResendIn(RESEND_SECONDS)
    toast.success('New OTP sent')
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-card rounded-2xl shadow-xl shadow-foreground/[0.04] border border-border p-8 sm:p-10">
          <div className="flex justify-center mb-10 w-full">
            <Logo size="md" showSubtitle={false} align="center" />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-foreground tracking-tight leading-tight">
              Verify your identity
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              We sent a 6-digit code to the mobile linked to{' '}
              <span className="font-medium text-foreground">{maskedId}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="flex items-baseline justify-between mb-2.5">
                <label className="text-sm font-medium text-foreground">
                  Verification code
                </label>
                {resendIn > 0 ? (
                  <span className="text-xs text-muted-foreground tabular-nums">
                    Resend in {resendIn}s
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={resend}
                    className="text-xs font-medium text-foreground hover:underline"
                  >
                    Resend code
                  </button>
                )}
              </div>
              <OtpInput
                value={otp}
                onChange={setOtp}
                disabled={submitting}
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={!validOtp || submitting}
              className={cn(
                'w-full h-12 rounded-xl bg-primary text-primary-foreground font-medium text-sm',
                'hover:bg-primary/90 transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-foreground/10',
                'disabled:opacity-40 disabled:cursor-not-allowed',
                'inline-flex items-center justify-center gap-2 mt-2',
              )}
            >
              {submitting ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              ) : (
                'Verify'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-border/60 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
            <Lock className="h-3 w-3" />
            Protected with bank-grade encryption
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Wrong number?{' '}
          <Link
            to="/register"
            className="font-medium text-foreground hover:underline"
          >
            Start over
          </Link>
        </p>
      </div>
    </div>
  )
}
