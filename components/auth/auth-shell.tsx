import type { ReactNode } from 'react'
import { BadgeCheck, Sparkles, TrendingUp, Wallet } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'

const highlights = [
  {
    icon: Sparkles,
    title: 'AI-tailored proposals',
    copy: 'Every bid rewritten against the job post, in your voice.',
  },
  {
    icon: Wallet,
    title: 'The cheapest bid',
    copy: 'Pennies per application — no per-seat pricing games.',
  },
  {
    icon: BadgeCheck,
    title: 'Human-grade quality',
    copy: 'Reviewed against a scoring rubric before it ever ships.',
  },
]

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-svh flex-col lg:flex-row">
      <section className="relative isolate flex flex-col justify-between overflow-hidden bg-brand-navy px-8 py-10 text-sidebar-foreground lg:w-[46%] lg:px-14 lg:py-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-20 size-[26rem] animate-float rounded-full bg-primary/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-16 size-80 rounded-full bg-brand-orange/15 blur-3xl"
        />

        <BrandLogo tone="dark" size={44} className="relative animate-fade-up" />

        <div className="relative mt-12 flex flex-col gap-8 lg:mt-0">
          <div className="flex flex-col gap-4">
            <span className="inline-flex w-fit animate-fade-up items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-sidebar-foreground/80 backdrop-blur">
              <TrendingUp className="size-3.5 text-primary" aria-hidden="true" />
              AI-Tailor job applications
            </span>
            <h1 className="max-w-lg animate-fade-up text-4xl leading-tight font-extrabold tracking-tight text-balance text-card lg:text-5xl">
              The cheapest bid. The highest quality.
            </h1>
            <p className="max-w-md animate-fade-up text-base leading-relaxed text-sidebar-foreground/70">
              Bidgram studies each job post, writes the proposal your profile deserves, and
              submits it while your competitors are still copy-pasting.
            </p>
          </div>

          <ul className="flex max-w-md flex-col gap-4">
            {highlights.map((item, index) => (
              <li
                key={item.title}
                className="flex animate-fade-up items-start gap-3.5 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition-colors hover:border-primary/40 hover:bg-white/10"
                style={{ animationDelay: `${120 + index * 90}ms` }}
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/20 text-primary">
                  <item.icon className="size-4.5" aria-hidden="true" />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-card">{item.title}</span>
                  <span className="text-sm leading-relaxed text-sidebar-foreground/65">
                    {item.copy}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative mt-12 text-xs text-sidebar-foreground/50 lg:mt-0">
          Trusted by 4,200+ freelancers and hiring managers.
        </p>
      </section>

      <section className="flex flex-1 items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-md animate-fade-up">{children}</div>
      </section>
    </main>
  )
}
