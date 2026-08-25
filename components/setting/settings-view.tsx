'use client'

import { useState, type ComponentType, type ReactNode } from 'react'
import {
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
import { useLanguage } from '@/components/language-provider'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { isLocaleId, LOCALES } from '@/lib/i18n'

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
  // Interface language (applies app-wide via LanguageProvider)
  const { locale, setLocale, t } = useLanguage()

  // Account
  const [fullName, setFullName] = useState('Jane Doe')
  const [email, setEmail] = useState('jane@example.com')
  const [timezone, setTimezone] = useState<string>('Europe/Berlin')

  // AI
  const [tone, setTone] = useState<string>('Professional')
  const [language, setLanguage] = useState<string>('English (US)')

  // Security
  const [twoFactor, setTwoFactor] = useState(false)
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [changingPassword, setChangingPassword] = useState(false)

  function save() {
    toast.success('Settings saved', { description: 'Your preferences apply to new bids right away.' })
  }

  function resetPasswordForm() {
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setPasswordError(null)
  }

  async function handleChangePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPasswordError(null)

    if (!currentPassword) {
      setPasswordError('Enter your current password.')
      return
    }
    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters.')
      return
    }
    if (newPassword === currentPassword) {
      setPasswordError('New password must be different from your current password.')
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation do not match.')
      return
    }

    setChangingPassword(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 700))
      toast.success('Password updated', { description: 'Use your new password next time you sign in.' })
      setPasswordDialogOpen(false)
      resetPasswordForm()
    } finally {
      setChangingPassword(false)
    }
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
        icon={Globe}
        title={t.settingsLanguageTitle}
        description={t.settingsLanguageDescription}
        style={{ animationDelay: '70ms' }}
      >
        <Field className="sm:max-w-sm">
          <FieldLabel htmlFor="interface-language" className="text-sm font-semibold">
            {t.interfaceLanguage}
          </FieldLabel>
          <Select
            value={locale}
            onValueChange={(value) => {
              if (isLocaleId(value)) setLocale(value)
            }}
          >
            <SelectTrigger id="interface-language" className="h-9 w-full">
              <SelectValue placeholder="Select a language">
                {(value: string) => {
                  const option = LOCALES.find((item) => item.id === value)
                  if (!option) return 'Select a language'
                  return option.nativeLabel === option.label
                    ? option.label
                    : `${option.nativeLabel} (${option.label})`
                }}
              </SelectValue>
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              <SelectGroup>
                {LOCALES.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.nativeLabel} ({option.label})
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">{t.settingsLanguageHint}</p>
        </Field>
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
              <Dialog
                open={passwordDialogOpen}
                onOpenChange={(open) => {
                  setPasswordDialogOpen(open)
                  if (!open) resetPasswordForm()
                }}
              >
                <DialogTrigger render={<Button variant="outline" size="sm" />}>
                  <KeyRound data-icon="inline-start" />
                  Change password
                </DialogTrigger>
                <DialogContent>
                  <form onSubmit={handleChangePassword}>
                    <DialogHeader>
                      <DialogTitle>Change password</DialogTitle>
                      <DialogDescription>
                        Choose a new password with at least 8 characters.
                      </DialogDescription>
                    </DialogHeader>
                    <FieldGroup className="mt-4">
                      <Field data-invalid={passwordError ? true : undefined}>
                        <FieldLabel htmlFor="current-password">Current password</FieldLabel>
                        <Input
                          id="current-password"
                          type="password"
                          autoComplete="current-password"
                          value={currentPassword}
                          aria-invalid={passwordError ? true : undefined}
                          onChange={(event) => setCurrentPassword(event.target.value)}
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="new-password">New password</FieldLabel>
                        <Input
                          id="new-password"
                          type="password"
                          autoComplete="new-password"
                          value={newPassword}
                          onChange={(event) => setNewPassword(event.target.value)}
                        />
                        <FieldDescription>At least 8 characters.</FieldDescription>
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="confirm-password">Confirm new password</FieldLabel>
                        <Input
                          id="confirm-password"
                          type="password"
                          autoComplete="new-password"
                          value={confirmPassword}
                          onChange={(event) => setConfirmPassword(event.target.value)}
                        />
                      </Field>
                      {passwordError ? <FieldError>{passwordError}</FieldError> : null}
                    </FieldGroup>
                    <DialogFooter className="mt-2">
                      <DialogClose render={<Button type="button" variant="outline" />}>
                        Cancel
                      </DialogClose>
                      <Button type="submit" disabled={changingPassword}>
                        {changingPassword ? <Spinner data-icon="inline-start" /> : <KeyRound data-icon="inline-start" />}
                        Update password
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
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

