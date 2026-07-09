import { useState } from 'react'
import { X, ExternalLink } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { supportWhatsApp, maskNationalId } from '@/data/mock'
import { cn } from '@/lib/utils'

const QUICK_TOPICS = [
  { label: 'Policy enquiry', message: 'I have a question about my policy status.' },
  { label: 'File a claim', message: 'I need help filing or tracking a claim.' },
  { label: 'Premium payment', message: 'I need help with a premium payment or overdue balance.' },
  { label: 'Update my details', message: 'I want to update my contact or banking details.' },
]

function WhatsAppIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function buildWhatsAppUrl(message) {
  const text = encodeURIComponent(message)
  return `https://wa.me/${supportWhatsApp.number}?text=${text}`
}

function buildGreeting(user, body) {
  const name = user?.displayName ?? user?.name ?? 'Customer'
  const idLine = user?.nationalId
    ? `\nNational ID: ${maskNationalId(user.nationalId)}`
    : ''
  return `Hello ${supportWhatsApp.team},\n\nI'm ${name}.${idLine}\n\n${body}\n\nSent via the customer portal.`
}

export function LiveChat() {
  const user = useAuthStore((s) => s.user)
  const [open, setOpen] = useState(false)
  const [customMessage, setCustomMessage] = useState('')

  const openWhatsApp = (body) => {
    const url = buildWhatsAppUrl(buildGreeting(user, body))
    window.open(url, '_blank', 'noopener,noreferrer')
    setOpen(false)
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          'fixed z-40 flex items-center gap-2.5 rounded-full border border-border bg-card',
          'shadow-xl shadow-foreground/[0.08] hover:shadow-2xl hover:scale-[1.02]',
          'transition-all duration-300 bottom-24 right-4 lg:bottom-6 lg:right-6',
          'pl-2 pr-4 py-2 animate-float-y',
        )}
        aria-label="Chat on WhatsApp"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md">
          <WhatsAppIcon className="h-6 w-6" />
        </span>
        <span className="hidden sm:flex flex-col items-start text-left leading-tight">
          <span className="text-[13px] font-medium text-foreground">WhatsApp</span>
          <span className="text-[11px] text-muted-foreground">{supportWhatsApp.hours}</span>
        </span>
      </button>
    )
  }

  return (
    <div
      className={cn(
        'fixed z-40 flex flex-col overflow-hidden rounded-2xl border border-border bg-card',
        'shadow-2xl shadow-foreground/[0.12]',
        'bottom-24 right-4 w-[min(100vw-2rem,320px)] lg:bottom-6 lg:right-6',
      )}
      role="dialog"
      aria-label="Chat on WhatsApp"
    >
      <div className="flex items-center gap-3 border-b border-border/60 bg-[#25D366]/10 px-4 py-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm">
          <WhatsAppIcon className="h-5 w-5" />
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">{supportWhatsApp.team}</p>
          <p className="text-[11px] text-muted-foreground">{supportWhatsApp.display}</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="p-2 rounded-lg text-muted-foreground hover:bg-secondary transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="p-4 space-y-4 bg-secondary/30">
        <p className="text-[13px] leading-relaxed text-muted-foreground">
          Chat with a SanlamAllianz officer on WhatsApp. Pick a topic or write your message — we&apos;ll
          open WhatsApp with your details pre-filled.
        </p>

        <div className="flex flex-wrap gap-1.5">
          {QUICK_TOPICS.map((topic) => (
            <button
              key={topic.label}
              type="button"
              onClick={() => openWhatsApp(topic.message)}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-[11px] font-medium text-foreground hover:bg-secondary transition-colors"
            >
              {topic.label}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
            Your message
          </label>
          <textarea
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            rows={3}
            placeholder="Type your question…"
            className="w-full resize-none rounded-xl border border-border bg-background px-3 py-2.5 text-[13px] focus:outline-none focus:ring-4 focus:ring-foreground/[0.06]"
          />
        </div>

        <button
          type="button"
          onClick={() =>
            openWhatsApp(customMessage.trim() || 'I need assistance with my account.')
          }
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-xl py-2.5',
            'bg-[#25D366] text-white text-sm font-medium',
            'hover:bg-[#20bd5a] transition-colors shadow-md',
          )}
        >
          <WhatsAppIcon className="h-4 w-4" />
          Open WhatsApp
          <ExternalLink className="h-3.5 w-3.5 opacity-80" />
        </button>

        <p className="text-[10px] text-center text-muted-foreground">
          {supportWhatsApp.hours} · Typical reply within 2 hours
        </p>
      </div>
    </div>
  )
}
