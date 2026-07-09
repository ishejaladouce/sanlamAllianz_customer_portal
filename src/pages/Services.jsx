import { useMemo, useState } from 'react'
import { Plus, Search, X } from 'lucide-react'
import { toast } from 'sonner'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { policies, serviceRequests } from '@/data/mock'
import { cn, formatRelativeTime } from '@/lib/utils'
import { status } from '@/lib/statusStyles'

const statusStyles = {
  Resolved: {
    border: status.positive.border,
    text: status.positive.text,
    bar: status.positive.bar,
    label: 'Resolved',
  },
  'In Progress': {
    border: status.active.border,
    text: status.active.text,
    bar: status.active.bar,
    label: 'In progress',
  },
  Pending: {
    border: status.attention.border,
    text: status.attention.text,
    bar: status.attention.bar,
    label: 'Pending',
  },
}

function ServiceRequestCard({ request }) {
  const style = statusStyles[request.status] ?? statusStyles.Pending
  const showProgress = request.status !== 'Resolved'

  return (
    <article
      className={cn(
        'group relative flex flex-col rounded-xl border border-border bg-card',
        'shadow-sm hover:shadow-md hover:border-foreground/10',
        'transition-all duration-200 overflow-hidden border-l-[3px]',
        style.border,
      )}
    >
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-foreground leading-snug">
              {request.title}
            </h3>
            <p className="mt-1 font-mono text-[11px] text-muted-foreground">
              {request.reference}
            </p>
          </div>
          <span className={cn('shrink-0 text-xs font-medium', style.text)}>
            {style.label}
          </span>
        </div>

        <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground line-clamp-2">
          {request.description}
        </p>

        {showProgress && (
          <div className="mt-4 space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-muted-foreground">
                {request.status === 'Pending' ? 'Pending' : 'Progress'}
              </span>
              <span className="font-medium tabular-nums text-foreground">
                {request.progress}%
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
              <div
                className={cn('h-full rounded-full transition-all duration-500', style.bar)}
                style={{ width: `${request.progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-[11px] text-muted-foreground">
          <span>{formatRelativeTime(request.updatedDate)}</span>
          <span className="font-mono">{request.policyNumber}</span>
        </div>
      </div>
    </article>
  )
}

function NewRequestModal({ open, onClose }) {
  const [category, setCategory] = useState('Contract Update')
  const [policyNumber, setPolicyNumber] = useState('')
  const [description, setDescription] = useState('')

  if (!open) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!policyNumber || !description.trim()) {
      toast.error('Please fill in all fields')
      return
    }
    toast.success('Service request submitted')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close"
      />
      <div className="relative w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
          <h2 className="text-base font-semibold">New service request</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm"
            >
              <option>Contract Update</option>
              <option>Claims — General</option>
              <option>Claims — Underwriting</option>
              <option>Payments</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Policy</label>
            <select
              value={policyNumber}
              onChange={(e) => setPolicyNumber(e.target.value)}
              className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm"
            >
              <option value="">Select a policy</option>
              {policies.map((p) => (
                <option key={p.id} value={p.policyNumber}>
                  {p.policyNumber} — {p.plan}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Describe what you need help with…"
              className="w-full resize-none rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-foreground/[0.06]"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Submit request</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Services() {
  const [query, setQuery] = useState('')
  const [showNewRequest, setShowNewRequest] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return serviceRequests
    return serviceRequests.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.reference.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.policyNumber.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Service requests"
        description="Contract updates, underwriting queries, and general assistance."
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search requests…"
            className="h-11 pl-10 bg-secondary/50 border-border/80"
          />
        </div>
        <Button
          className="h-11 shrink-0 px-5"
          onClick={() => setShowNewRequest(true)}
        >
          <Plus className="h-4 w-4" />
          New request
        </Button>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card/50 py-16 text-center">
          <p className="text-sm text-muted-foreground">No requests match your search.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((request) => (
            <ServiceRequestCard key={request.id} request={request} />
          ))}
        </div>
      )}

      <NewRequestModal
        open={showNewRequest}
        onClose={() => setShowNewRequest(false)}
      />
    </div>
  )
}
