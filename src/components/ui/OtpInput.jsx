import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

export function OtpInput({
  length = 6,
  value = '',
  onChange,
  onComplete,
  disabled = false,
  autoFocus = false,
  className,
}) {
  const refs = useRef([])

  useEffect(() => {
    if (autoFocus && !disabled) refs.current[0]?.focus()
  }, [autoFocus, disabled])

  const update = (next) => {
    const clean = next.replace(/\D/g, '').slice(0, length)
    onChange?.(clean)
    if (clean.length === length) onComplete?.(clean)
  }

  const handleChange = (i) => (e) => {
    const digit = e.target.value.replace(/\D/g, '').slice(-1)
    if (!digit) return
    const slots = Array.from({ length }, (_, idx) => value[idx] ?? '')
    slots[i] = digit
    update(slots.join(''))
    if (i < length - 1) refs.current[i + 1]?.focus()
  }

  const handleKey = (i) => (e) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      const slots = Array.from({ length }, (_, idx) => value[idx] ?? '')
      if (slots[i]) {
        slots[i] = ''
        update(slots.join(''))
      } else if (i > 0) {
        refs.current[i - 1]?.focus()
        slots[i - 1] = ''
        update(slots.join(''))
      }
    } else if (e.key === 'ArrowLeft' && i > 0) {
      e.preventDefault()
      refs.current[i - 1]?.focus()
    } else if (e.key === 'ArrowRight' && i < length - 1) {
      e.preventDefault()
      refs.current[i + 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    const text = e.clipboardData?.getData('text') ?? ''
    const digits = text.replace(/\D/g, '').slice(0, length)
    if (!digits) return
    e.preventDefault()
    update(digits)
    const nextIdx = Math.min(digits.length, length - 1)
    refs.current[nextIdx]?.focus()
  }

  return (
    <div className={cn('flex gap-2 justify-between', className)}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={value[i] ?? ''}
          onChange={handleChange(i)}
          onKeyDown={handleKey(i)}
          onPaste={handlePaste}
          disabled={disabled}
          aria-label={`Digit ${i + 1}`}
          className={cn(
            'h-12 w-full max-w-[52px] text-center text-lg font-semibold rounded-xl',
            'border border-border bg-background text-foreground',
            'focus:outline-none focus:ring-4 focus:ring-foreground/[0.06] focus:border-foreground',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            'transition-all',
          )}
        />
      ))}
    </div>
  )
}
