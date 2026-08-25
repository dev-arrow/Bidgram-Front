'use client'

import { useEffect, useState } from 'react'
import { BadgeCheck, Sparkles, TrendingUp, Wallet, Zap } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'

const HIGHLIGHTS = [
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
    copy: 'Scored against a rubric before it ever ships.',
  },
]

const TICKER = [
  'Sofia landed a $6.4k retainer',
  '1,284 proposals shipped today',
  'Avg. reply rate 31%',
  'Marcus won 3 bids this week',
  'Median cost per bid: $0.04',
  'Priya booked 12 interviews',
]

const DRAFT_LINES = [
  'Analysing job post — "Senior Product Designer"…',
  'Matching 14 signals from your Bidgram profile…',
  'Drafting proposal · tone: confident, concise…',
  'Quality score 96 / 100 — ready to submit.',
]

/** Typewriter that cycles through the draft log, one character at a time. */
function useTypewriter(lines: string[]) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')

  useEffect(() => {
    const full = lines[index]
    if (text.length < full.length) {
      const t = setTimeout(() => setText(full.slice(0, text.length + 1)), 26)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setText('')
      setIndex((i) => (i + 1) % lines.length)
    }, 1900)
    return () => clearTimeout(t)
  }, [text, index, lines])

  return { text, index }
}

export function LoginHero() {
  const { text, index } = useTypewriter(DRAFT_LINES)

  return (
    <section className="relative isolate flex flex-col gap-6 overflow-hidden bg-brand-navy px-8 py-10 text-sidebar-foreground lg:w-[48%] lg:px-14">
      {/* Aurora field */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-24 size-[30rem] animate-aurora rounded-full bg-primary/30 blur-[90px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -left-28 size-[24rem] animate-aurora-slow rounded-full bg-brand-orange/20 blur-[90px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-1/4 size-[26rem] animate-float rounded-full bg-primary/15 blur-[100px]"
      />
      <div aria-hidden="true" className="auth-grid pointer-events-none absolute inset-0" />

      {/* Orbiting spark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-24 right-16 hidden size-56 animate-orbit lg:block"
      >
        <span className="absolute top-0 left-1/2 size-2 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_18px_6px] shadow-primary/50" />
      </div>

      <div className="relative shrink-0 animate-fade-up">
        <BrandLogo tone="dark" size={44} />
      </div>

      <div className="relative flex flex-1 flex-col justify-center gap-6">
        <div className="flex flex-col gap-4">
          <span
            className="inline-flex w-fit animate-fade-up items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-sidebar-foreground/80 backdrop-blur"
            style={{ animationDelay: '60ms' }}
          >
            <TrendingUp className="size-3.5 text-primary" aria-hidden="true" />
            AI-tailored job applications
          </span>

          <h1 className="max-w-lg text-4xl leading-[1.08] font-extrabold tracking-tight text-balance text-card lg:text-[3.25rem]">
            {['The', 'cheapest', 'bid.'].map((word, i) => (
              <span
                key={word}
                className="mr-[0.3em] inline-block animate-fade-up"
                style={{ animationDelay: `${120 + i * 70}ms` }}
              >
                {word}
              </span>
            ))}
            <span className="inline-block animate-fade-up" style={{ animationDelay: '340ms' }}>
              The highest{' '}
              <span className="relative bg-gradient-to-r from-primary to-brand-orange bg-clip-text text-transparent">
                quality.
              </span>
            </span>
          </h1>

          <p
            className="max-w-md animate-fade-up text-base leading-relaxed text-sidebar-foreground/70"
            style={{ animationDelay: '420ms' }}
          >
            Bidgram studies each job post, writes the proposal your profile deserves, and submits it
            while your competitors are still copy-pasting.
          </p>
        </div>

        {/* Live drafting console */}
        <div
          className="max-w-md animate-fade-up overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04] backdrop-blur"
          style={{ animationDelay: '500ms' }}
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
            <span className="relative grid size-2 place-items-center">
              <span className="absolute size-2 animate-pulse-ring rounded-full bg-primary" />
              <span className="size-2 rounded-full bg-primary" />
            </span>
            <span className="text-[11px] font-semibold tracking-wide text-sidebar-foreground/70 uppercase">
              Bidgram engine · live
            </span>
            <Zap className="ml-auto size-3.5 text-brand-orange" aria-hidden="true" />
          </div>
          <div className="px-4 py-3 font-mono text-[12.5px] leading-relaxed">
            <p className="flex min-h-10 items-start gap-2 text-sidebar-foreground/85">
              <span className="text-primary">{'>'}</span>
              <span>
                {text}
                <span className="ml-0.5 inline-block h-4 w-[7px] translate-y-0.5 animate-caret bg-primary" />
              </span>
            </p>
            <div className="mt-2 flex gap-1.5" aria-hidden="true">
              {DRAFT_LINES.map((line, i) => (
                <span
                  key={line}
                  className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                    i === index ? 'bg-primary' : 'bg-white/12'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <ul className="flex max-w-md flex-col gap-3">
          {HIGHLIGHTS.map((item, index) => (
            <li
              key={item.title}
              className="group flex animate-fade-up items-start gap-3.5 rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur transition-all duration-300 hover:translate-x-1 hover:border-primary/40 hover:bg-white/[0.09]"
              style={{ animationDelay: `${580 + index * 90}ms` }}
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/20 text-primary transition-transform duration-300 group-hover:scale-110">
                <item.icon className="size-4.5" aria-hidden="true" />
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-card">{item.title}</span>
                <span className="text-sm leading-relaxed text-sidebar-foreground/65">{item.copy}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Ticker */}
      <div
        className="relative shrink-0 animate-fade-up"
        style={{ animationDelay: '900ms' }}
        aria-hidden="true"
      >
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
          <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
            {[...TICKER, ...TICKER].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="flex items-center gap-2 text-xs text-sidebar-foreground/55"
              >
                <span className="size-1 rounded-full bg-brand-orange" />
                {item}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-4 text-xs text-sidebar-foreground/50">
          Trusted by 4,200+ freelancers and hiring managers.
        </p>
      </div>
    </section>
  )
}
