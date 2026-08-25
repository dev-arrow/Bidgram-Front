'use client'

import { useState, type ComponentType, type ReactNode } from 'react'
import {
  Bell,
  Bot,
  Globe,
  KeyRound,
  Laptop,
  LogOut,
  Save,
  ShieldCheck,
  Smartphone,
  Trash2,
  User,
  Zap,
} from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

const TIMEZONES = [
  'UTC',
  'America/New_York',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Berlin',
  'Asia/Kolkata',
  'Asia/Singapore',
] as const

const TONES = ['Professional', 'Direct', 'Warm', 'Technical'] as const
const LANGUAGES = ['English (US)', 'English (UK)', 'Spanish', 'German', 'French'] as const

type SessionEntry = {
  id: string
  device: string
  location: string
  lastActive: string
  current?: boolean
  icon: ComponentType<{ className?: string }>
}

const SESSIONS: readonly SessionEntry[] = [
  {
    id: 's1',
    device: 'Chrome on macOS',
    location: 'Berlin, DE',
    lastActive: 'Active now',
    current: true,
    icon: Laptop,
  },
  { id: 's2', device: 'Bidgram extension', location: 'Berlin, DE', lastActive: '2 hours ago', icon: Zap },
  { id: 's3', device: 'Safari on iPhone', location: 'Munich, DE', lastActive: '3 days ago', icon: Smartphone },
]

export function SettingsView() {
  // Account
  const [fullName, setFullName] = useState('Jane Doe')
  const [email, setEmail] = useState('jane@example.com')
  const [timezone, setTimezone] = useState<string>('Europe/Berlin')

  // Bidding
  const [autoApply, setAutoApply] = useState(true)
  const [dailyCap, setDailyCap] = useState<number[]>([25])
  const [minMatch, setMinMatch] = useState<number[]>([70])
  const [skipApplied, setSkipApplied] = useState(true)

  // AI
  const [tone, setTone] = useState<string>('Professional')
  const [language, setLanguage] = useState<string>('English (US)')
  const [reviewBeforeSend, setReviewBeforeSend] = useState(false)

  // Notifications
  const [emailDigest, setEmailDigest] = useState(true)
  const [bidFailures, setBidFailures] = useState(true)
  const [productNews, setProductNews] = useState(false)

  // Security
  const [twoFactor, setTwoFactor] = useState(false)

  function save() {
    toast.success('Settings saved', { description: 'Your preferences apply to new bids right away.' })
  }

  return (
    <div className="flex flex-col gap-5 pb-2">
      <SettingsSection
        icon={User}
        title="Account"
        description="Your identity across Bidgram and on generated applications."
        style={{ animationDelay: '0ms' }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="full-name" className="text-sm font-semibold">
              Full name
            </FieldLabel>
            <Input
              id="full-name"
              value={fullName}
              className="h-9"
              onChange={(event) => setFullName(event.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="email" className="text-sm font-semibold">
              Email
            </FieldLabel>
            <Input
              id="email"
              type="email"
              value={email}
              className="h-9"
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </Field>
          <Field className="sm:col-span-2">
            <FieldLabel htmlFor="timezone" className="text-sm font-semibold">
              Timezone
            </FieldLabel>
            <Select value={timezone} onValueChange={(value) => setTimezone(String(value))}>
              <SelectTrigger id="timezone" className="h-9 w-full sm:w-72">
                <SelectValue placeholder="Select a timezone" />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                <SelectGroup>
                  {TIMEZONES.map((zone) => (
                    <SelectItem key={zone} value={zone}>
                      {zone}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Bids are scheduled and reported in this timezone.
            </p>
          </Field>
        </div>
      </SettingsSection>

      <SettingsSection
        icon={Zap}
        title="Bidding"
        description="How aggressively Bidgram applies on your behalf."
        style={{ animationDelay: '70ms' }}
      >
        <div className="flex flex-col gap-5">
          <ToggleRow
            id="auto-apply"
            label="Auto-apply from the extension"
            description="Submit applications automatically for postings that clear your match threshold."
            checked={autoApply}
            onCheckedChange={setAutoApply}
          />

          <div
            className={cn(
              'flex flex-col gap-6 border-t border-border pt-5 transition-opacity',
              !autoApply && 'pointer-events-none opacity-50',
            )}
          >
            <SliderRow
              label="Daily bid cap"
              value={dailyCap[0]}
              display={`${dailyCap[0]} bids / day`}
              min={5}
              max={100}
              step={5}
              onChange={setDailyCap}
              hint="Hard stop. Bidgram never exceeds this, even with matches queued."
            />
            <SliderRow
              label="Minimum match score"
              value={minMatch[0]}
              display={`${minMatch[0]}%`}
              min={40}
              max={95}
              step={5}
              onChange={setMinMatch}
              hint="Postings below this score are skipped instead of applied to."
            />
          </div>

          <div className="border-t border-border pt-5">
            <ToggleRow
              id="skip-applied"
              label="Skip companies you've already applied to"
              description="Avoids duplicate applications within a 30-day window."
              checked={skipApplied}
              onCheckedChange={setSkipApplied}
            />
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        icon={Bot}
        title="AI defaults"
        description="Voice and language used when your prompts don't specify one."
        style={{ animationDelay: '140ms' }}
      >
        <div className="flex flex-col gap-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="tone" className="text-sm font-semibold">
                Writing tone
              </FieldLabel>
              <Select value={tone} onValueChange={(value) => setTone(String(value))}>
                <SelectTrigger id="tone" className="h-9 w-full">
                  <SelectValue placeholder="Select a tone" />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false}>
                  <SelectGroup>
                    {TONES.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="language" className="text-sm font-semibold">
                Output language
              </FieldLabel>
              <Select value={language} onValueChange={(value) => setLanguage(String(value))}>
                <SelectTrigger id="language" className="h-9 w-full">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false}>
                  <SelectGroup>
                    {LANGUAGES.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </div>

          <div className="border-t border-border pt-5">
            <ToggleRow
              id="review-before-send"
              label="Hold applications for my review"
              description="Queue each generated application for approval instead of submitting it."
              checked={reviewBeforeSend}
              onCheckedChange={setReviewBeforeSend}
            />
          </div>

          <p className="flex items-start gap-2 rounded-xl border border-border bg-muted/30 px-3.5 py-3 text-xs leading-relaxed text-muted-foreground">
            <Globe className="mt-px size-3.5 shrink-0 text-primary" aria-hidden="true" />
            Prompt text always wins over these defaults. Edit them on the{' '}
            <span className="font-semibold text-foreground">Prompt</span> page.
          </p>
        </div>
      </SettingsSection>

      <SettingsSection
        icon={Bell}
        title="Notifications"
        description="What Bidgram emails you about."
        style={{ animationDelay: '210ms' }}
      >
        <div className="flex flex-col gap-5">
          <ToggleRow
            id="email-digest"
            label="Daily digest"
            description="One email summarising the bids submitted and any replies received."
            checked={emailDigest}
            onCheckedChange={setEmailDigest}
          />
          <div className="border-t border-border pt-5">
            <ToggleRow
              id="bid-failures"
              label="Bid failures"
              description="Alert me immediately when an application fails to submit."
              checked={bidFailures}
              onCheckedChange={setBidFailures}
            />
          </div>
          <div className="border-t border-border pt-5">
            <ToggleRow
              id="product-news"
              label="Product news"
              description="Occasional updates about new Bidgram features."
              checked={productNews}
              onCheckedChange={setProductNews}
            />
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        icon={ShieldCheck}
        title="Security"
        description="Protect your account and review where you're signed in."
        style={{ animationDelay: '280ms' }}
      >
        <div className="flex flex-col gap-5">
          <ToggleRow
            id="two-factor"
            label="Two-factor authentication"
            description="Require a one-time code from your authenticator app at sign-in."
            checked={twoFactor}
            onCheckedChange={(next) => {
              setTwoFactor(next)
              toast.success(next ? 'Two-factor enabled' : 'Two-factor disabled')
            }}
          />

          <div className="flex flex-col gap-3 border-t border-border pt-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold">Active sessions</p>
              <Button variant="outline" size="sm" onClick={() => toast.success('Signed out everywhere else')}>
                <LogOut data-icon="inline-start" />
                Revoke all others
              </Button>
            </div>
            <ul className="flex flex-col gap-2">
              {SESSIONS.map((session) => (
                <li
                  key={session.id}
                  className="flex items-center gap-3 rounded-xl border border-border bg-muted/20 px-3.5 py-3"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-card text-muted-foreground ring-1 ring-border">
                    <session.icon className="size-4" />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="flex items-center gap-2 text-sm font-medium">
                      <span className="truncate">{session.device}</span>
                      {session.current ? (
                        <Badge variant="secondary" className="shrink-0 text-[10px]">
                          This device
                        </Badge>
                      ) : null}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {session.location} &middot; {session.lastActive}
                    </p>
                  </div>
                  {!session.current ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="shrink-0 text-muted-foreground"
                      onClick={() => toast.success(`${session.device} signed out`)}
                    >
                      Revoke
                    </Button>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-border pt-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-semibold">Password</p>
                <p className="text-xs text-muted-foreground">Last changed 4 months ago</p>
              </div>
              <Button variant="outline" size="sm">
                <KeyRound data-icon="inline-start" />
                Change password
              </Button>
            </div>
          </div>
        </div>
      </SettingsSection>

      {/* Danger zone */}
      <section
        aria-label="Danger zone"
        className="animate-fade-up rounded-2xl border border-destructive/30 bg-destructive/5 p-5 lg:p-6"
        style={{ animationDelay: '350ms' }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-destructive/10 text-destructive">
              <Trash2 className="size-5" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-0.5">
              <h2 className="text-base font-bold tracking-tight">Delete account</h2>
              <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
                Permanently removes your profiles, prompts, and application history. This cannot be
                undone.
              </p>
            </div>
          </div>
          <Button variant="destructive" size="sm">
            Delete account
          </Button>
        </div>
      </section>

      {/* Sticky save bar */}
      <div className="sticky bottom-0 -mx-6 flex items-center justify-between gap-3 border-t border-border bg-background/90 px-6 py-3 backdrop-blur-md lg:-mx-8 lg:px-8">
        <p className="text-xs text-muted-foreground">Changes apply to bids submitted after saving.</p>
        <Button onClick={save}>
          <Save data-icon="inline-start" />
          Save changes
        </Button>
      </div>
    </div>
  )
}

function SettingsSection({
  icon: Icon,
  title,
  description,
  children,
  style,
}: {
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
  children: ReactNode
  style?: React.CSSProperties
}) {
  return (
    <section
      className="animate-fade-up rounded-2xl border border-border bg-card p-5 lg:p-6"
      style={style}
      aria-label={title}
    >
      <div className="flex items-start gap-3.5">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-primary">
          <Icon className="size-5" />
        </span>
        <div className="flex flex-col gap-0.5">
          <h2 className="text-base font-bold tracking-tight">{title}</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  )
}

function ToggleRow({
  id,
  label,
  description,
  checked,
  onCheckedChange,
}: {
  id: string
  label: string
  description: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex flex-col gap-0.5">
        <label htmlFor={id} className="text-sm font-semibold">
          {label}
        </label>
        <p className="max-w-prose text-xs leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="mt-1 shrink-0"
      />
    </div>
  )
}

function SliderRow({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
  hint,
}: {
  label: string
  value: number
  display: string
  min: number
  max: number
  step: number
  onChange: (value: number[]) => void
  hint: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold">{label}</p>
        <Badge variant="secondary" className="font-mono tabular-nums">
          {display}
        </Badge>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(next) => onChange(next as number[])}
        aria-label={label}
      />
      <p className="text-xs leading-relaxed text-muted-foreground">{hint}</p>
    </div>
  )
}
