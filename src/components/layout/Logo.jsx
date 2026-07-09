import { cn } from '@/lib/utils'
import logoSrc from '@/assets/rw.png'

const SIZE_MAP = {
  xs: 'h-6 max-h-6',
  sm: 'h-8 max-h-8',
  md: 'h-10 max-h-10',
  lg: 'h-12 max-h-12',
}

const MAX_WIDTH_MAP = {
  xs: 'max-w-[128px]',
  sm: 'max-w-[168px]',
  md: 'max-w-[190px]',
  lg: 'max-w-[220px]',
}

export function Logo({
  className,
  variant = 'default',
  showSubtitle = true,
  size = 'sm',
  align = 'left',
}) {
  const onDark = variant === 'onDark'
  const heightClass = SIZE_MAP[size] ?? SIZE_MAP.sm
  const maxWidthClass = MAX_WIDTH_MAP[size] ?? MAX_WIDTH_MAP.sm

  return (
    <div
      className={cn(
        'flex flex-col gap-1 max-w-full',
        align === 'center' ? 'items-center' : 'items-start',
        className,
      )}
    >
      <img
        src={logoSrc}
        alt="Sanlam Allianz"
        className={cn(
          'w-full h-auto object-contain select-none',
          heightClass,
          maxWidthClass,
          align === 'center' ? 'object-center' : 'object-left',
          onDark
            ? 'brightness-0 invert dark:brightness-100 dark:invert-0'
            : '',
        )}
        draggable={false}
      />
      {showSubtitle && (
        <p
          className={cn(
            'text-[9px] uppercase tracking-[0.16em] font-medium leading-none',
            align === 'center' && 'text-center',
            onDark
              ? 'text-primary-foreground/70'
              : 'text-muted-foreground',
          )}
        >
          Customer Portal
        </p>
      )}
    </div>
  )
}
