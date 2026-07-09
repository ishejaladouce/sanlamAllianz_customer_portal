import { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import {
  Star,
  MessageSquareHeart,
  CheckCircle2,
  Sparkles,
  Clock,
  FileText,
  Compass,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useAuthStore } from '@/stores/authStore'
import { PageHeader } from '@/components/layout/PageHeader'
import { cn } from '@/lib/utils'

const topics = [
  { id: 'claims', label: 'Claims process', icon: FileText },
  { id: 'payments', label: 'Payments', icon: Clock },
  { id: 'policies', label: 'Policy management', icon: Compass },
  { id: 'portal', label: 'Portal experience', icon: Sparkles },
  { id: 'agent', label: 'Agent service', icon: MessageSquareHeart },
  { id: 'comms', label: 'Communication', icon: MessageSquareHeart },
]

const starLabels = ['', 'Needs improvement', 'Below expectations', 'Fair', 'Good', 'Excellent']

const speedOptions = ['Same day', '1–2 days', '3–5 days', 'Over 5 days', 'Not yet']
const clarityOptions = ['Very clear', 'Clear', 'Somewhat', 'Not clear']
const claimsOptions = ['Excellent', 'Good', 'Average', 'Poor']

const pastFeedback = [
  {
    stars: 4,
    topics: ['Claims process', 'Portal experience'],
    comment: 'Claims process was smooth once documents were uploaded.',
    date: 'Mar 2025',
  },
  {
    stars: 5,
    topics: ['Agent service'],
    comment: 'Very helpful agent when I called about my TEGANYA policy.',
    date: 'Jan 2025',
  },
]

const MAX_COMMENT = 500

function StarRating({ value, onChange }) {
  const [hover, setHover] = useState(0)
  const display = hover || value

  return (
    <div className="space-y-3">
      <div
        className="flex justify-center gap-1.5"
        onMouseLeave={() => setHover(0)}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            onMouseEnter={() => setHover(n)}
            className="group rounded-xl p-1.5 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15"
            aria-label={`Rate ${n} out of 5`}
          >
            <Star
              className={cn(
                'h-9 w-9 sm:h-10 sm:w-10 transition-all duration-150',
                n <= display
                  ? 'fill-amber-400 text-amber-400 drop-shadow-sm'
                  : 'text-muted-foreground/25 group-hover:text-muted-foreground/40',
              )}
            />
          </button>
        ))}
      </div>
      <p
        className={cn(
          'text-sm font-medium min-h-[1.25rem] transition-colors',
          display ? 'text-foreground' : 'text-muted-foreground',
        )}
      >
        {display ? starLabels[display] : 'Tap a star to rate your experience'}
      </p>
    </div>
  )
}

function OptionPills({ label, hint, options, value, onChange }) {
  return (
    <div className="space-y-2.5">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        {hint && (
          <p className="text-xs text-muted-foreground mt-0.5">{hint}</p>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = value === opt
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(selected ? '' : opt)}
              className={cn(
                'rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200',
                selected
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/20 hover:bg-secondary/60',
              )}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function PastFeedbackCard({ feedback }) {
  return (
    <article className="rounded-xl border border-border bg-card p-4 shadow-sm space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, n) => (
            <Star
              key={n}
              className={cn(
                'h-3.5 w-3.5',
                n < feedback.stars
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-muted-foreground/20',
              )}
            />
          ))}
        </div>
        <span className="text-[11px] text-muted-foreground tabular-nums shrink-0">
          {feedback.date}
        </span>
      </div>
      <p className="text-[13px] leading-relaxed text-foreground">
        &ldquo;{feedback.comment}&rdquo;
      </p>
      <div className="flex flex-wrap gap-1.5">
        {feedback.topics.map((t) => (
          <span
            key={t}
            className="rounded-full border border-border bg-secondary/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>
    </article>
  )
}

export default function Feedback() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const firstName = user?.displayName?.split(' ')[0] ?? 'there'

  const [stars, setStars] = useState(0)
  const [selectedTopics, setSelectedTopics] = useState([])
  const [speed, setSpeed] = useState('')
  const [clarity, setClarity] = useState('')
  const [claimsRating, setClaimsRating] = useState('')
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const toggleTopic = (id) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (stars < 1) return toast.error('Please select a star rating')
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 600))
    setSubmitting(false)
    setSubmitted(true)
    toast.success('Thank you for your feedback!')
  }

  const resetForm = () => {
    setStars(0)
    setSelectedTopics([])
    setSpeed('')
    setClarity('')
    setClaimsRating('')
    setComment('')
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto py-12 sm:py-16 animate-fade-in">
        <Card className="overflow-hidden shadow-xl shadow-foreground/[0.04]">
          <CardContent className="p-8 sm:p-10 text-center space-y-5">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
                Thank you, {firstName}
              </h1>
              <p className="text-[13px] text-muted-foreground leading-relaxed max-w-xs mx-auto">
                Your feedback has been received. It helps us improve the SanlamAllianz
                customer experience for everyone in Rwanda.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
              <Button variant="outline" onClick={resetForm}>
                Submit more feedback
              </Button>
              <Button onClick={() => navigate('/dashboard')}>
                Back to dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <PageHeader
        eyebrow="Your voice"
        title="Share your experience"
        description="A few minutes of your time helps us improve claims, payments, and how you use the portal."
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">
          <Card className="overflow-hidden border-border shadow-sm">
            <div className="border-b border-border/60 bg-secondary/30 px-6 py-8 sm:py-10">
              <div className="mx-auto max-w-sm text-center space-y-1">
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Overall rating
                </p>
                <StarRating value={stars} onChange={setStars} />
              </div>
            </div>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-3">
                <div>
                  <CardTitle className="text-base">What was this about?</CardTitle>
                  <CardDescription className="mt-1">
                    Select all areas that apply — optional.
                  </CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  {topics.map(({ id, label, icon: Icon }) => {
                    const selected = selectedTopics.includes(id)
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => toggleTopic(id)}
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-medium transition-all duration-200',
                          selected
                            ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                            : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/20 hover:bg-secondary/60',
                        )}
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0 opacity-80" />
                        {label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="h-px bg-border/60" />

              <div className="space-y-5">
                <p className="text-sm font-medium text-foreground">Quick questions</p>
                <OptionPills
                  label="How quickly were you helped?"
                  hint="For your most recent service request or enquiry."
                  options={speedOptions}
                  value={speed}
                  onChange={setSpeed}
                />
                <OptionPills
                  label="How clear was the information?"
                  options={clarityOptions}
                  value={clarity}
                  onChange={setClarity}
                />
                <OptionPills
                  label="Claims process"
                  hint="Skip if you have not filed a claim recently."
                  options={claimsOptions}
                  value={claimsRating}
                  onChange={setClaimsRating}
                />
              </div>

              <div className="h-px bg-border/60" />

              <div className="space-y-2">
                <div className="flex items-baseline justify-between gap-2">
                  <label htmlFor="feedback-comment" className="text-sm font-medium">
                    Anything else we should know?
                  </label>
                  <span className="text-[11px] text-muted-foreground tabular-nums">
                    {comment.length}/{MAX_COMMENT}
                  </span>
                </div>
                <textarea
                  id="feedback-comment"
                  value={comment}
                  onChange={(e) =>
                    setComment(e.target.value.slice(0, MAX_COMMENT))
                  }
                  rows={4}
                  className={cn(
                    'w-full rounded-xl border border-border bg-background px-4 py-3 text-[13px] leading-relaxed resize-none',
                    'placeholder:text-muted-foreground/50',
                    'focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/40 transition-all',
                  )}
                  placeholder="Tell us what went well, or what we could do better…"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              Your feedback is confidential and used only to improve our services.
            </p>
            <Button
              type="submit"
              disabled={submitting || stars < 1}
              className="sm:min-w-[160px]"
            >
              {submitting ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              ) : (
                'Submit feedback'
              )}
            </Button>
          </div>
        </form>

        <aside className="lg:col-span-2 space-y-4">
          <Card className="border-border/80 bg-secondary/20 shadow-none">
            <CardContent className="p-5 space-y-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MessageSquareHeart className="h-4 w-4" />
              </div>
              <p className="text-sm font-medium text-foreground">
                We read every response
              </p>
              <p className="text-[12px] leading-relaxed text-muted-foreground">
                Feedback is reviewed by our customer experience team and shared with
                the departments responsible for claims, payments, and portal
                improvements.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2 px-0.5">
              <h2 className="text-sm font-medium text-foreground">
                Your past feedback
              </h2>
              <span className="text-[11px] text-muted-foreground">
                {pastFeedback.length} submissions
              </span>
            </div>
            {pastFeedback.map((f, i) => (
              <PastFeedbackCard key={i} feedback={f} />
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
