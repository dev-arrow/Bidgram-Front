'use client'

import { useRef, useState, type MouseEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowRight,
  Briefcase,
  Check,
  Eye,
  EyeOff,
  Gavel,
  Lock,
  Mail,
  Sparkles,
  User,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'pending' | 'done'

const ROLES = [
  {
    value: 'bidder',
    label: 'Bidder',
    copy: 'Auto-apply with tailored proposals at the lowest cost.',
    icon: Gavel,
  },
  {
    value: 'manager',
    label: 'Manager',
    copy: 'Post work, review AI applications, pick winners.',
    icon: Briefcase,
  },
]

/** Returns a 0–4 strength score plus a human label + accent width. */
function scorePassword(value: string) {
  let score = 0
  if (value.length >= 8) score++
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++
  if (/\d/.test(value)) score++
  if (/[^A-Za-z0-9]/.test(value)) score++
  const labels = ['Too short', 'Weak', 'Fair', 'Good', 'Strong']
  return { score, label: labels[score] }
}

export function RegisterForm() {
  const router = useRouter()
  const cardRef = useRef<HTMLDivElement>(null)
  const [role, setRole] = useState('bidder')
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const strength = scorePassword(password)

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
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
      />

      <div className="relative flex flex-col gap-6">
        <header className="flex flex-col gap-2">
          <span
            className="inline-flex w-fit animate-fade-up items-center gap-1.5 rounded-full border border-primary/25 bg-accent px-2.5 py-1 text-[11px] font-semibold tracking-wide text-accent-foreground uppercase"
            style={{ animationDelay: '40ms' }}
          >
            <Sparkles className="size-3.5" aria-hidden="true" />
            Free to start
          </span>
          <h2
            className="animate-fade-up text-3xl font-extrabold tracking-tight text-balance"
            style={{ animationDelay: '90ms' }}
          >
            Create your account
          </h2>
          <p
            className="animate-fade-up text-sm leading-relaxed text-muted-foreground"
            style={{ animationDelay: '140ms' }}
          >
            Two minutes to set up, then Bidgram bids while you sleep.
          </p>
        </header>

        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <FloatField
            id="name"
            label="Full name"
            type="text"
            autoComplete="name"
            icon={<User className="size-4" aria-hidden="true" />}
            value={name}
            onChange={setName}
            delay={190}
          />

          <FloatField
            id="register-email"
            label="Work email"
            type="email"
            autoComplete="email"
            icon={<Mail className="size-4" aria-hidden="true" />}
            value={email}
            onChange={setEmail}
            delay={240}
          />

          <div className="flex flex-col gap-2">
            <FloatField
              id="register-password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              icon={<Lock className="size-4" aria-hidden="true" />}
              value={password}
              onChange={setPassword}
              delay={290}
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

            {/* Password strength meter */}
            <div
              className={cn(
                'flex items-center gap-3 overflow-hidden transition-all duration-300',
                password ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0',
              )}
            >
              <div className="flex flex-1 gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className={cn(
                      'h-1.5 flex-1 rounded-full transition-all duration-300',
                      i < strength.score
                        ? strength.score <= 1
                          ? 'bg-destructive'
                          : strength.score <= 2
                            ? 'bg-brand-orange'
                            : 'bg-primary'
                        : 'bg-border',
                    )}
                  />
                ))}
              </div>
              <span className="w-16 shrink-0 text-right text-[11px] font-semibold text-muted-foreground">
                {strength.label}
              </span>
            </div>
          </div>

          {/* Role selector */}
          <fieldset
            className="flex animate-fade-up flex-col gap-2.5"
            style={{ animationDelay: '340ms' }}
          >
            <legend className="mb-1 text-sm font-medium">I am joining as a</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {ROLES.map((option) => {
                const active = role === option.value
                return (
                  <button
                    type="button"
                    key={option.value}
                    onClick={() => setRole(option.value)}
                    aria-pressed={active}
                    className={cn(
                      'group relative flex items-start gap-3 overflow-hidden rounded-2xl border p-3 text-left transition-all duration-300 hover:-translate-y-0.5',
                      active
                        ? 'border-primary/50 bg-accent shadow-lg shadow-primary/10'
                        : 'border-border bg-background hover:border-primary/30',
                    )}
                  >
                    <span
                      className={cn(
                        'grid size-9 shrink-0 place-items-center rounded-xl transition-colors duration-300',
                        active
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-accent text-accent-foreground group-hover:bg-primary/15',
                      )}
                    >
                      <option.icon className="size-4.5" aria-hidden="true" />
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold">{option.label}</span>
                      <span className="text-xs leading-relaxed text-muted-foreground">
                        {option.copy}
                      </span>
                    </span>
                    <span
                      className={cn(
                        'absolute top-2.5 right-2.5 grid size-4 place-items-center rounded-full border transition-all duration-300',
                        active
                          ? 'scale-100 border-primary bg-primary text-primary-foreground'
                          : 'scale-0 border-border',
                      )}
                    >
                      <Check className="size-3" />
                    </span>
                  </button>
                )
              })}
            </div>
            <input type="hidden" name="role" value={role} />
          </fieldset>

          <div
            className="flex animate-fade-up items-center gap-2.5"
            style={{ animationDelay: '390ms' }}
          >
            <Checkbox id="terms" name="terms" required />
            <Label htmlFor="terms" className="text-sm font-normal text-muted-foreground">
              I agree to the{' '}
              <span className="font-semibold text-primary">Terms</span> and{' '}
              <span className="font-semibold text-primary">Privacy Policy</span>
            </Label>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={status !== 'idle'}
            className="group relative h-12 w-full animate-fade-up overflow-hidden text-[15px] font-semibold shadow-lg shadow-primary/25 transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-100"
            style={{ animationDelay: '440ms' }}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 animate-sheen bg-white/25 blur-md"
            />
            <span className="relative flex items-center justify-center gap-2">
              {status === 'pending' && <Spinner className="size-4" />}
              {status === 'done' && <Check className="size-4" />}
              {status === 'idle'
                ? 'Create account'
                : status === 'pending'
                  ? 'Creating your account'
                  : 'Welcome to Bidgram'}
              {status === 'idle' && (
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              )}
            </span>
          </Button>

          <p
            className="animate-fade-up text-center text-sm text-muted-foreground"
            style={{ animationDelay: '490ms' }}
          >
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </form>
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

        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-3 h-[2px] w-[calc(100%-1.5rem)] origin-left scale-x-0 rounded-full bg-gradient-to-r from-primary to-brand-orange transition-transform duration-300 group-focus-within:scale-x-100"
        />
      </div>
    </div>
  )
}
