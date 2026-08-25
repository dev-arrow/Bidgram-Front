import type { Metadata } from 'next'
import { RegisterForm } from '@/components/auth/register-form'
import { RegisterHero } from '@/components/auth/register-hero'

export const metadata: Metadata = {
  title: 'Create an account — Bidgram',
  description:
    'Create your Bidgram account and let the engine ship AI-tailored proposals for you — the cheapest bid, the highest quality.',
}

export default function RegisterPage() {
  return (
    <main className="flex min-h-svh flex-col lg:flex-row">
      <RegisterHero />

      <section className="relative flex flex-1 items-center justify-center overflow-hidden px-5 py-12 sm:px-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-0 size-72 animate-aurora-slow rounded-full bg-primary/8 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -right-10 size-72 animate-float rounded-full bg-brand-orange/8 blur-3xl"
        />
        <div className="relative w-full max-w-md">
          <RegisterForm />
        </div>
      </section>
    </main>
  )
}
