import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { ChevronDown, Mail, Search } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Input } from '@/components/ui/Input'
import { faqCategories, searchFaq } from '@/data/faq'
import { cn } from '@/lib/utils'

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left hover:bg-secondary/40 transition-colors"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-foreground leading-snug pr-2">
          {item.question}
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-muted-foreground transition-transform mt-0.5',
            open && 'rotate-180',
          )}
        />
      </button>
      {open && (
        <div className="px-5 pb-4 text-[13px] leading-relaxed text-muted-foreground border-t border-border/60 pt-3">
          {item.answer}
        </div>
      )}
    </div>
  )
}

export default function Faq() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [openId, setOpenId] = useState(null)

  const results = useMemo(() => searchFaq(query, category), [query, category])

  const grouped = useMemo(() => {
    if (category !== 'all' || query.trim()) {
      return [{ id: 'results', label: query.trim() ? 'Search results' : faqCategories.find((c) => c.id === category)?.label, items: results }]
    }
    return faqCategories
      .filter((c) => c.id !== 'all')
      .map((cat) => ({
        id: cat.id,
        label: cat.label,
        items: results.filter((item) => item.category === cat.id),
      }))
      .filter((g) => g.items.length > 0)
  }, [results, category, query])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Help & FAQ"
        description="A guide to using the SanlamAllianz customer portal — policies, claims, payments, and more."
      />

      <div className="rounded-2xl border border-border bg-card shadow-sm p-5 sm:p-6 space-y-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search help topics…"
            className="h-11 pl-10 bg-secondary/50 border-border/80"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {faqCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors',
                category === cat.id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border text-muted-foreground hover:text-foreground hover:bg-secondary',
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {results.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-14 text-center">
          <p className="text-sm text-muted-foreground">No topics match your search.</p>
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setCategory('all')
            }}
            className="mt-3 text-sm font-medium text-foreground hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {grouped.map((group) => (
            <section key={group.id} className="space-y-3">
              <h2 className="text-[13px] font-medium text-muted-foreground uppercase tracking-wide">
                {group.label}
              </h2>
              <div className="space-y-2">
                {group.items.map((item) => (
                  <FaqItem
                    key={item.id}
                    item={item}
                    open={openId === item.id}
                    onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      <div className="rounded-xl border border-border bg-secondary/40 px-5 py-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[13px] text-muted-foreground">
          Still need help? Our team is available during business hours.
        </p>
        <a
          href="mailto:support@sanlamallianz.com"
          className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:underline"
        >
          <Mail className="h-4 w-4" />
          support@sanlamallianz.com
        </a>
      </div>
    </div>
  )
}

/** Compact FAQ link block for auth pages */
export function FaqPublicBanner() {
  return (
    <p className="text-center text-[13px] text-muted-foreground">
      New to the portal?{' '}
      <Link to="/faq" className="font-medium text-foreground hover:underline">
        Read the FAQ guide
      </Link>
    </p>
  )
}
