import type { Metadata } from 'next'
import { LoginForm } from '@/components/auth/login-form'
import { LoginHero } from '@/components/auth/login-hero'

export const metadata: Metadata = {
  title: 'Sign in — Bidgram',
  description:
    'Sign in to Bidgram to keep your AI-tailored proposals flowing — the cheapest bid, the highest quality.',
}

export default function LoginPage() {
  return (
    <main className="flex min-h-svh flex-col lg:flex-row">
      <LoginHero />

      <section className="relative flex flex-1 items-center justify-center overflow-hidden px-5 py-12 sm:px-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-0 size-72 animate-aurora-slow rounded-full bg-primary/8 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -left-10 size-72 animate-float rounded-full bg-brand-orange/8 blur-3xl"
        />
        <div className="relative w-full max-w-md">
          <LoginForm />
        </div>
      </section>
    </main>
  )
}
