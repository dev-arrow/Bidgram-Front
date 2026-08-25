'use client'

import { useEffect, useState } from 'react'
import { BadgeCheck, Rocket, Sparkles, TrendingUp, Wallet, Zap } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'

const STEPS = [
  {
    icon: Sparkles,
    title: 'Build your profile once',
    copy: 'Skills, history and voice — Bidgram learns how you write.',
  },
  {
    icon: Rocket,
    title: 'Auto-apply on autopilot',
    copy: 'Tailored proposals shipped the moment a match appears.',
  },
  {
    icon: BadgeCheck,
    title: 'Win more, spend less',
    copy: 'Pennies per bid, scored against a rubric before it sends.',
  },
]

const STATS = [
  { value: '4,200+', label: 'active bidders' },
  { value: '31%', label: 'avg reply rate' },
  { value: '$0.04', label: 'median / bid' },
]

const TICKER = [
  'Sofia landed a $6.4k retainer',
  '1,284 proposals shipped today',
  'Marcus won 3 bids this week',
  'Priya booked 12 interviews',
  'Avg. setup time: 2 minutes',
]

const BOOT_LINES = [
  'Creating your Bidgram workspace…',
  'Calibrating your writing voice…',
  'Indexing 240+ live job boards…',
  'You are ready to out-bid the room.',
]

function useTypewriter(lines: string[]) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')

  useEffect(() => {
    const full = lines[index]
    if (text.length < full.length) {
      const t = setTimeout(() => setText(full.slice(0, text.length + 1)), 28)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setText('')
      setIndex((i) => (i + 1) % lines.length)
    }, 1800)
    return () => clearTimeout(t)
  }, [text, index, lines])

  return { text, index }
}

export function RegisterHero() {
  const { text, index } = useTypewriter(BOOT_LINES)

  return (
    <section className="relative isolate flex flex-col gap-6 overflow-hidden bg-brand-navy px-8 py-10 text-sidebar-foreground lg:w-[48%] lg:px-14">
      {/* Aurora field */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-24 size-[30rem] animate-aurora rounded-full bg-primary/30 blur-[90px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -right-28 size-[24rem] animate-aurora-slow rounded-full bg-brand-orange/20 blur-[90px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/4 size-[26rem] animate-float rounded-full bg-primary/15 blur-[100px]"
      />
      <div aria-hidden="true" className="auth-grid pointer-events-none absolute inset-0" />

      {/* Orbiting spark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-24 left-16 hidden size-56 animate-orbit lg:block"
      >
        <span className="absolute top-0 left-1/2 size-2 -translate-x-1/2 rounded-full bg-brand-orange shadow-[0_0_18px_6px] shadow-brand-orange/50" />
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
            <TrendingUp className="size-3.5 text-brand-orange" aria-hidden="true" />
            Start bidding in minutes
          </span>

          <h1 className="max-w-lg text-4xl leading-[1.08] font-extrabold tracking-tight text-balance text-card lg:text-[3.25rem]">
            {['Set', 'it', 'up', 'once.'].map((word, i) => (
              <span
                key={word}
                className="mr-[0.3em] inline-block animate-fade-up"
                style={{ animationDelay: `${120 + i * 60}ms` }}
              >
                {word}
              </span>
            ))}
            <span className="inline-block animate-fade-up" style={{ animationDelay: '380ms' }}>
              Bidgram{' '}
              <span className="relative bg-gradient-to-r from-primary to-brand-orange bg-clip-text text-transparent">
                bids for you.
              </span>
            </span>
          </h1>

          <p
            className="max-w-md animate-fade-up text-base leading-relaxed text-sidebar-foreground/70"
            style={{ animationDelay: '440ms' }}
          >
            Create your account, tell us who you are, and let the engine ship tailored proposals
            while your competitors are still copy-pasting.
          </p>
        </div>

        {/* Live onboarding console */}
        <div
          className="max-w-md animate-fade-up overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04] backdrop-blur"
          style={{ animationDelay: '520ms' }}
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
            <span className="relative grid size-2 place-items-center">
              <span className="absolute size-2 animate-pulse-ring rounded-full bg-brand-orange" />
              <span className="size-2 rounded-full bg-brand-orange" />
            </span>
            <span className="text-[11px] font-semibold tracking-wide text-sidebar-foreground/70 uppercase">
              Setting up · live
            </span>
            <Zap className="ml-auto size-3.5 text-brand-orange" aria-hidden="true" />
          </div>
          <div className="px-4 py-3 font-mono text-[12.5px] leading-relaxed">
            <p className="flex min-h-10 items-start gap-2 text-sidebar-foreground/85">
              <span className="text-brand-orange">{'>'}</span>
              <span>
                {text}
                <span className="ml-0.5 inline-block h-4 w-[7px] translate-y-0.5 animate-caret bg-brand-orange" />
              </span>
            </p>
            <div className="mt-2 flex gap-1.5" aria-hidden="true">
              {BOOT_LINES.map((line, i) => (
                <span
                  key={line}
                  className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                    i === index ? 'bg-brand-orange' : 'bg-white/12'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Onboarding steps */}
        <ul className="flex max-w-md flex-col gap-3">
          {STEPS.map((item, i) => (
            <li
              key={item.title}
              className="group flex animate-fade-up items-start gap-3.5 rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur transition-all duration-300 hover:translate-x-1 hover:border-brand-orange/40 hover:bg-white/[0.09]"
              style={{ animationDelay: `${600 + i * 90}ms` }}
            >
              <span className="relative grid size-9 shrink-0 place-items-center rounded-xl bg-brand-orange/20 text-brand-orange transition-transform duration-300 group-hover:scale-110">
                <item.icon className="size-4.5" aria-hidden="true" />
                <span className="absolute -top-1.5 -left-1.5 grid size-4 place-items-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                  {i + 1}
                </span>
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

        {/* Stat row */}
        <dl className="flex max-w-md animate-fade-up gap-3" style={{ animationDelay: '900ms' }}>
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-1 flex-col gap-0.5 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2.5 backdrop-blur"
            >
              <dt className="order-2 text-[11px] leading-tight text-sidebar-foreground/55">
                {stat.label}
              </dt>
              <dd className="order-1 text-lg font-extrabold text-card">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Ticker */}
      <div
        className="relative shrink-0 animate-fade-up"
        style={{ animationDelay: '1000ms' }}
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
      </div>
    </section>
  )
}
