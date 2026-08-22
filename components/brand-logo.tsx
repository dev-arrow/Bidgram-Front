import Image from 'next/image'
import { cn } from '@/lib/utils'

export function BrandLogo({
  className,
  markClassName,
  wordmark = true,
  tone = 'light',
  size = 40,
}: {
  className?: string
  markClassName?: string
  wordmark?: boolean
  tone?: 'light' | 'dark'
  size?: number
}) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <span
        className={cn(
          'relative grid shrink-0 place-items-center overflow-hidden rounded-xl bg-card shadow-sm ring-1 ring-black/5',
          markClassName,
        )}
        style={{ width: size, height: size }}
      >
        <Image
          src="/bidgram-logo.png"
          alt="Bidgram"
          width={size * 2}
          height={size * 2}
          className="size-full object-contain p-1"
          priority
        />
      </span>
      {wordmark ? (
        <span className="text-xl font-extrabold tracking-tight">
          <span className={tone === 'dark' ? 'text-card' : 'text-foreground'}>B</span>
          <span className="text-primary">idgram</span>
        </span>
      ) : null}
    </span>
  )
}
