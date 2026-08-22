'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowRight,
  Briefcase,
  Eye,
  EyeOff,
  Gavel,
  Lock,
  Mail,
  User,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Spinner } from '@/components/ui/spinner'

const roles = [
  {
    value: 'manager',
    label: 'Manager',
    copy: 'Post work, review AI applications, pick winners.',
    icon: Briefcase,
  },
  {
    value: 'bidder',
    label: 'Bidder',
    copy: 'Auto-apply with tailored proposals at the lowest cost.',
    icon: Gavel,
  },
]

export function RegisterForm() {
  const router = useRouter()
  const [role, setRole] = useState('bidder')
  const [showPassword, setShowPassword] = useState(false)
  const [pending, setPending] = useState(false)

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setTimeout(() => router.push('/profile'), 700)
  }

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h2 className="text-3xl font-extrabold tracking-tight text-balance">
          Create your account
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Two minutes to set up, then Bidgram bids while you sleep.
        </p>
      </header>

      <form onSubmit={onSubmit}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Full name</FieldLabel>
            <InputGroup className="h-11">
              <InputGroupAddon>
                <User aria-hidden="true" />
              </InputGroupAddon>
              <InputGroupInput
                id="name"
                name="name"
                autoComplete="name"
                placeholder="Jane Doe"
                required
              />
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="register-email">Work email</FieldLabel>
            <InputGroup className="h-11">
              <InputGroupAddon>
                <Mail aria-hidden="true" />
              </InputGroupAddon>
              <InputGroupInput
                id="register-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                required
              />
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="register-password">Password</FieldLabel>
            <InputGroup className="h-11">
              <InputGroupAddon>
                <Lock aria-hidden="true" />
              </InputGroupAddon>
              <InputGroupInput
                id="register-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="At least 8 characters"
                minLength={8}
                required
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  size="icon-xs"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((value) => !value)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </Field>

          <FieldSet>
            <FieldLegend variant="label">I am joining as a</FieldLegend>
            <RadioGroup
              name="role"
              value={role}
              onValueChange={(value) => setRole(String(value))}
              className="grid gap-3 sm:grid-cols-2"
            >
              {roles.map((option) => (
                <FieldLabel
                  key={option.value}
                  htmlFor={option.value}
                  className="cursor-pointer transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <Field orientation="horizontal">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                      <option.icon className="size-4.5" aria-hidden="true" />
                    </span>
                    <span className="flex flex-1 flex-col gap-0.5">
                      <span className="text-sm font-semibold">{option.label}</span>
                      <span className="text-xs leading-relaxed font-normal text-muted-foreground">
                        {option.copy}
                      </span>
                    </span>
                    <RadioGroupItem id={option.value} value={option.value} />
                  </Field>
                </FieldLabel>
              ))}
            </RadioGroup>
          </FieldSet>

          <Field orientation="horizontal">
            <Checkbox id="terms" name="terms" required />
            <FieldLabel htmlFor="terms" className="text-sm font-normal">
              I agree to the Terms of Service and Privacy Policy
            </FieldLabel>
          </Field>

          <Button type="submit" size="lg" className="h-11 w-full" disabled={pending}>
            {pending ? <Spinner data-icon="inline-start" /> : null}
            Create account
            {pending ? null : <ArrowRight data-icon="inline-end" />}
          </Button>

          <FieldDescription className="text-center">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-primary no-underline">
              Sign in
            </Link>
          </FieldDescription>
        </FieldGroup>
      </form>
    </div>
  )
}
