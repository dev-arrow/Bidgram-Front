'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Spinner } from '@/components/ui/spinner'

export function LoginForm() {
  const router = useRouter()
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
        <h2 className="text-3xl font-extrabold tracking-tight text-balance">Welcome back</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Sign in to keep your AI-tailored bids flowing.
        </p>
      </header>

      <form onSubmit={onSubmit}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Work email</FieldLabel>
            <InputGroup className="h-11">
              <InputGroupAddon>
                <Mail aria-hidden="true" />
              </InputGroupAddon>
              <InputGroupInput
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                required
              />
            </InputGroup>
          </Field>

          <Field>
            <div className="flex items-center justify-between gap-2">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Link
                href="/login"
                className="text-xs font-medium text-primary transition-opacity hover:opacity-70"
              >
                Forgot password?
              </Link>
            </div>
            <InputGroup className="h-11">
              <InputGroupAddon>
                <Lock aria-hidden="true" />
              </InputGroupAddon>
              <InputGroupInput
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••"
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

          <Field orientation="horizontal">
            <Checkbox id="remember" name="remember" defaultChecked />
            <FieldLabel htmlFor="remember" className="text-sm font-normal">
              Keep me signed in for 30 days
            </FieldLabel>
          </Field>

          <Button type="submit" size="lg" className="h-11 w-full" disabled={pending}>
            {pending ? <Spinner data-icon="inline-start" /> : null}
            Sign in
            {pending ? null : <ArrowRight data-icon="inline-end" />}
          </Button>

          <FieldDescription className="text-center">
            New to Bidgram?{' '}
            <Link href="/register" className="font-semibold text-primary no-underline">
              Create an account
            </Link>
          </FieldDescription>
        </FieldGroup>
      </form>
    </div>
  )
}
