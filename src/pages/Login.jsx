import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { Eye, EyeOff, Lock, User } from 'lucide-react'
import { OtpInput } from '@/components/ui/OtpInput'
import { Logo } from '@/components/layout/Logo'
import { useAuthStore } from '@/stores/authStore'
import { authenticateUser } from '@/data/mock'
import { cn } from '@/lib/utils'

const RESEND_SECONDS = 30

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const setAuth = useAuthStore((s) => s.setAuth)

  const [idNumber, setIdNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [idError, setIdError] = useState('')
  const [showId, setShowId] = useState(true)
  const [otpSent, setOtpSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [resendIn, setResendIn] = useState(0)

  const idInputRef = useRef(null)

  useEffect(() => {
    idInputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (resendIn <= 0) return
    const t = setInterval(() => setResendIn((s) => s - 1), 1000)
    return () => clearInterval(t)
  }, [resendIn])

  const validId = /^\d{16}$/.test(idNumber.trim())
  const validOtp = /^\d{6}$/.test(otp)
  const primaryDisabled = submitting || (otpSent ? !validOtp : !validId)

  const sendOtp = async () => {
    if (!validId) return setIdError('Please enter a valid 16-digit national ID')
    const account = authenticateUser(idNumber.trim())
    if (!account) {
      setIdError('No account found for this ID. Demo: 1199680011973101')
      return
    }
    setIdError('')
    setSubmitting(true)
    try {
      await new Promise((r) => setTimeout(r, 500))
      setOtpSent(true)
      setResendIn(RESEND_SECONDS)
      toast.success('OTP sent to your mobile')
    } finally {
      setSubmitting(false)
    }
  }

  const verify = async () => {
    if (!validOtp) return
    setSubmitting(true)
    try {
      await new Promise((r) => setTimeout(r, 500))
      const account = authenticateUser(idNumber.trim())
      if (!account) {
        toast.error('Account not found')
        return
      }
      setAuth(account, 'demo-token')
      navigate(location.state?.from?.pathname ?? '/dashboard', { replace: true })
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

  const useDifferentId = () => {
    setOtpSent(false)
    setOtp('')
    setResendIn(0)
    setTimeout(() => idInputRef.current?.focus(), 0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    otpSent ? verify() : sendOtp()
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md animate-fade-in">
        <div className="flex justify-end mb-3">
          <Link
            to="/faq"
            className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            FAQ guide →
          </Link>
        </div>
        <div className="bg-card rounded-2xl shadow-xl shadow-foreground/[0.04] border border-border p-8 sm:p-10">
          <div className="flex justify-center mb-10 w-full">
            <Logo size="md" showSubtitle={false} align="center" />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-foreground tracking-tight leading-tight">
              {otpSent ? 'Enter your code' : 'Welcome back'}
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              {otpSent
                ? 'We sent a 6-digit code to your mobile.'
                : 'Sign in with your Rwandan national ID'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="id"
                className="block text-sm font-medium text-foreground mb-2"
              >
                National ID
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  id="id"
                  ref={idInputRef}
                  type={showId ? 'text' : 'password'}
                  inputMode="numeric"
                  autoComplete="off"
                  maxLength={16}
                  value={idNumber}
                  onChange={(e) => {
                    setIdNumber(
                      e.target.value.replace(/\D/g, '').slice(0, 16),
                    )
                    if (idError) setIdError('')
                  }}
                  disabled={otpSent}
                  placeholder="16-digit national ID"
                  className={cn(
                    'w-full h-12 rounded-xl bg-background text-foreground placeholder:text-muted-foreground/50',
                    'border pl-10 pr-10 text-[15px]',
                    'focus:outline-none focus:ring-4 focus:ring-foreground/[0.06] focus:border-foreground transition-all',
                    'disabled:opacity-60',
                    idError ? 'border-destructive' : 'border-border',
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowId((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showId ? 'Hide ID' : 'Show ID'}
                  tabIndex={-1}
                >
                  {showId ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </button>
              </div>
              {idError && (
                <p className="mt-2 text-xs text-destructive">{idError}</p>
              )}
            </div>

            {otpSent && (
              <div className="animate-fade-up">
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
            )}

            <button
              type="submit"
              disabled={primaryDisabled}
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
              ) : otpSent ? (
                'Sign in'
              ) : (
                'Continue'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-border/60 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
            <Lock className="h-3 w-3" />
            Protected with bank-grade encryption
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {otpSent ? (
            <>
              Wrong number?{' '}
              <button
                type="button"
                onClick={useDifferentId}
                className="font-medium text-foreground hover:underline"
              >
                Use a different ID
              </button>
            </>
          ) : (
            <>
              Don&apos;t have an account?{' '}
              <Link
                to="/register"
                className="font-medium text-foreground hover:underline"
              >
                Create one
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
