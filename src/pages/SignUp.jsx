import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { Eye, EyeOff, Lock, User } from 'lucide-react'
import { Logo } from '@/components/layout/Logo'
import { cn } from '@/lib/utils'

export default function SignUp() {
  const navigate = useNavigate()
  const [idNumber, setIdNumber] = useState('')
  const [idError, setIdError] = useState('')
  const [showId, setShowId] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const idInputRef = useRef(null)
  useEffect(() => {
    idInputRef.current?.focus()
  }, [])

  const validId = /^\d{16}$/.test(idNumber.trim())

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validId) return setIdError('Please enter a valid 16-digit national ID')
    setIdError('')
    setSubmitting(true)
    try {
      await new Promise((r) => setTimeout(r, 500))
      toast.success('OTP sent to your mobile')
      navigate('/verify-otp', { state: { idNumber } })
    } finally {
      setSubmitting(false)
    }
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
              Create your account
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Get started with your Rwandan national ID
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
                  placeholder="16-digit national ID"
                  className={cn(
                    'w-full h-12 rounded-xl bg-background text-foreground placeholder:text-muted-foreground/50',
                    'border pl-10 pr-10 text-[15px]',
                    'focus:outline-none focus:ring-4 focus:ring-foreground/[0.06] focus:border-foreground transition-all',
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
              {idError ? (
                <p className="mt-2 text-xs text-destructive">{idError}</p>
              ) : (
                <p className="mt-2 text-xs text-muted-foreground">
                  We&apos;ll send a verification code to the mobile linked to
                  your ID.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!validId || submitting}
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
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-foreground hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
