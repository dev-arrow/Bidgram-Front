'use client'

import { useRef, useState, type MouseEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Check, Eye, EyeOff, Fingerprint, Lock, Mail, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'pending' | 'done'

export function LoginForm() {
  const router = useRouter()
  const cardRef = useRef<HTMLDivElement>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function onPointerMove(event: MouseEvent<HTMLDivElement>) {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    el.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status !== 'idle') return
    setStatus('pending')
    setTimeout(() => setStatus('done'), 900)
    setTimeout(() => router.push('/profile'), 1700)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onPointerMove}
      className="spotlight relative isolate overflow-hidden rounded-3xl border border-border bg-card/80 p-7 shadow-[0_30px_80px_-60px_oklch(0.24_0.035_258/0.55)] backdrop-blur-xl sm:p-9"
    >
      {/* top accent line */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
      />

      <div className="relative flex flex-col gap-7">
        <header className="flex flex-col gap-2">
          <span
            className="inline-flex w-fit animate-fade-up items-center gap-1.5 rounded-full border border-primary/25 bg-accent px-2.5 py-1 text-[11px] font-semibold tracking-wide text-accent-foreground uppercase"
            style={{ animationDelay: '40ms' }}
          >
            <ShieldCheck className="size-3.5" aria-hidden="true" />
            Secure sign in
          </span>
          <h2
            className="animate-fade-up text-3xl font-extrabold tracking-tight text-balance"
            style={{ animationDelay: '90ms' }}
          >
            Welcome back
          </h2>
          <p
            className="animate-fade-up text-sm leading-relaxed text-muted-foreground"
            style={{ animationDelay: '140ms' }}
          >
            Sign in to keep your AI-tailored bids flowing.
          </p>
        </header>

        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <FloatField
            id="email"
            label="Work email"
            type="email"
            autoComplete="email"
            icon={<Mail className="size-4" aria-hidden="true" />}
            value={email}
            onChange={setEmail}
            delay={280}
          />

          <FloatField
            id="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            icon={<Lock className="size-4" aria-hidden="true" />}
            value={password}
            onChange={setPassword}
            delay={330}
            trailing={
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            }
          />

          <div
            className="flex animate-fade-up items-center justify-between gap-3"
            style={{ animationDelay: '380ms' }}
          >
            <div className="flex items-center gap-2.5">
              <Checkbox id="remember" name="remember" defaultChecked />
              <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">
                Keep me signed in
              </Label>
            </div>
            <Link
              href="/login"
              className="text-xs font-semibold text-primary transition-opacity hover:opacity-70"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={status !== 'idle'}
            className="group relative h-12 w-full animate-fade-up overflow-hidden text-[15px] font-semibold shadow-lg shadow-primary/25 transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-100"
            style={{ animationDelay: '430ms' }}
          >
            {/* sheen */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 animate-sheen bg-white/25 blur-md"
            />
            <span className="relative flex items-center justify-center gap-2">
              {status === 'pending' && <Spinner className="size-4" />}
              {status === 'done' && <Check className="size-4" />}
              {status === 'idle' ? 'Sign in' : status === 'pending' ? 'Signing you in' : 'Welcome back'}
              {status === 'idle' && (
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              )}
            </span>
          </Button>

          <p
            className="animate-fade-up text-center text-sm text-muted-foreground"
            style={{ animationDelay: '480ms' }}
          >
            New to Bidgram?{' '}
            <Link href="/register" className="font-semibold text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </form>

        <div
          className="flex animate-fade-up items-center justify-center gap-2 border-t border-border pt-5 text-xs text-muted-foreground"
          style={{ animationDelay: '520ms' }}
        >
          <Fingerprint className="size-3.5 text-primary" aria-hidden="true" />
          Protected by 256-bit encryption. We never post on your behalf.
        </div>
      </div>

      {/* Success wash */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 grid place-items-center bg-card/85 backdrop-blur-sm transition-opacity duration-300',
          status === 'done' ? 'opacity-100' : 'opacity-0',
        )}
      >
        {status === 'done' && (
          <span className="relative grid size-16 place-items-center motion-pop-in">
            <span className="absolute size-16 animate-pulse-ring rounded-full bg-primary/40" />
            <span className="grid size-16 place-items-center rounded-full bg-primary text-primary-foreground">
              <Check className="size-8" />
            </span>
          </span>
        )}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */

function FloatField({
  id,
  label,
  type,
  autoComplete,
  icon,
  trailing,
  value,
  onChange,
  delay,
}: {
  id: string
  label: string
  type: string
  autoComplete: string
  icon: React.ReactNode
  trailing?: React.ReactNode
  value: string
  onChange: (value: string) => void
  delay: number
}) {
  const filled = value.length > 0

  return (
    <div className="animate-fade-up" style={{ animationDelay: `${delay}ms` }}>
      <div className="field-glow group relative flex h-14 items-center gap-3 rounded-xl border border-input bg-background px-3.5">
        <span className="text-muted-foreground transition-colors duration-200 group-focus-within:text-primary">
          {icon}
        </span>

        <div className="relative flex-1">
          <label
            htmlFor={id}
            className={cn(
              'pointer-events-none absolute left-0 origin-left text-sm text-muted-foreground transition-all duration-200',
              filled
                ? 'top-0 scale-[0.82] font-semibold text-primary'
                : 'top-1/2 -translate-y-1/2 group-focus-within:top-0 group-focus-within:translate-y-0 group-focus-within:scale-[0.82] group-focus-within:font-semibold group-focus-within:text-primary',
            )}
          >
            {label}
          </label>
          <input
            id={id}
            name={id}
            type={type}
            autoComplete={autoComplete}
            required
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="peer h-14 w-full bg-transparent pt-5 text-sm font-medium outline-none placeholder:text-transparent"
          />
        </div>

        {trailing}

        {/* animated underline */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-3 h-[2px] w-[calc(100%-1.5rem)] origin-left scale-x-0 rounded-full bg-gradient-to-r from-primary to-brand-orange transition-transform duration-300 group-focus-within:scale-x-100"
        />
      </div>
    </div>
  )
}


