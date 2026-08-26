'use client'

import { useState } from 'react'
import {
  Check,
  ExternalLink,
  FileText,
  Infinity as InfinityIcon,
  Mail,
  Sparkles,
  TriangleAlert,
  Wallet,
  Zap,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { CryptoPaymentPanel } from '@/components/billing/crypto-payment-panel'
import {
  ALWAYS_INCLUDED,
  BALANCE,
  INVOICES,
  LEDGER,
  PLANS,
  REMAINING,
  formatAllowance,
  truncateHash,
  type InvoiceStatus,
  type Plan,
} from '@/lib/billing-data'
import { cn } from '@/lib/utils'

const STATUS_STYLES: Record<InvoiceStatus, { label: string; className: string }> = {
  confirmed: { label: 'Confirmed', className: 'bg-primary/10 text-primary' },
  pending: { label: 'Pending', className: 'bg-brand-orange/15 text-brand-orange' },
  failed: { label: 'Failed', className: 'bg-destructive/10 text-destructive' },
}

const INCLUDED_ICONS = [Sparkles, FileText, Mail, Zap, Zap] as const

/** Rules the user should know before paying, kept deliberately short. */
const GOOD_TO_KNOW = [
  'Only a submitted application is charged. Drafts, failed submissions and retries are free.',
  'Pack applications never expire and stack on top of whatever is already in your balance.',
  'Upgrade any time — a new pack adds to your balance instead of replacing it.',
  'Unlimited runs for 12 months and never auto-charges. Cancel by simply not renewing.',
  'Unused packs are refundable in crypto within 14 days if fewer than 50 applications were used.',
] as const

export function BillingView() {
  const [selectedId, setSelectedId] = useState<Plan['id']>('unlimited')

  const activePlan = PLANS.find((plan) => plan.id === BALANCE.planId) ?? PLANS[0]
  const selectedPlan = PLANS.find((plan) => plan.id === selectedId) ?? PLANS[3]

  const usedPct = Math.min(100, Math.round((BALANCE.used / BALANCE.granted) * 100))
  const dailyAvg = Math.round(
    BALANCE.weeklyBurn.reduce((total, day) => total + day, 0) / BALANCE.weeklyBurn.length,
  )
  const daysLeft = Math.max(1, Math.floor(REMAINING / Math.max(1, dailyAvg)))
  const lowBalance = REMAINING <= BALANCE.granted * 0.3
  const peakBurn = Math.max(...BALANCE.weeklyBurn)

  return (
    <div className="flex flex-col gap-6 pb-2">
      {/* Application balance — the only meter that matters */}
      <section
        aria-label="Application balance"
        className="animate-fade-up grid gap-6 rounded-2xl border border-border bg-card p-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_auto] lg:p-6"
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold text-muted-foreground">Applications remaining</p>
            <Badge variant="secondary">{activePlan.name} pack</Badge>
          </div>
          <p className="flex items-baseline gap-2">
            <span className="font-mono text-5xl leading-none font-extrabold tracking-tight tabular-nums">
              {REMAINING.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground">
              of {BALANCE.granted.toLocaleString()}
            </span>
          </p>
          <div
            className="h-2.5 w-full overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuenow={usedPct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Applications used"
          >
            <div
              className={cn(
                'h-full rounded-full transition-all duration-500',
                lowBalance ? 'bg-brand-orange' : 'bg-primary',
              )}
              style={{ width: `${usedPct}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {BALANCE.used.toLocaleString()} submitted since {BALANCE.purchasedOn} &middot; credits
            never expire
          </p>
        </div>

        <div className="flex flex-col gap-3 lg:border-x lg:border-border lg:px-6">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-xs font-semibold text-muted-foreground">Last 7 days</p>
            <p className="font-mono text-xs tabular-nums text-muted-foreground">
              <span className="font-bold text-foreground">{dailyAvg}</span> / day avg
            </p>
          </div>
          <div className="flex h-16 items-end gap-1.5" aria-hidden="true">
            {BALANCE.weeklyBurn.map((day, index) => (
              <div
                key={index}
                className="flex-1 origin-bottom animate-rise rounded-t-sm bg-primary/25"
                style={{
                  height: `${Math.max(12, (day / peakBurn) * 100)}%`,
                  animationDelay: `${index * 50}ms`,
                }}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            At this pace your balance lasts about{' '}
            <span className="font-semibold text-foreground">{daysLeft} more days</span>.
          </p>
        </div>

        <div className="flex flex-col gap-1 lg:items-end lg:text-right">
          <p className="text-xs font-semibold text-muted-foreground">Wallet credit</p>
          <p className="flex items-center gap-1.5 font-mono text-xl font-extrabold tabular-nums">
            <Wallet className="size-4 text-primary" aria-hidden="true" />$
            {BALANCE.walletCreditUsd.toFixed(2)}
          </p>
          <p className="max-w-[14rem] text-xs leading-relaxed text-muted-foreground">
            Overpayment from a past transaction. Applied to your next purchase automatically.
          </p>
        </div>
      </section>

      {lowBalance ? (
        <div
          role="status"
          className="animate-fade-up flex flex-col gap-3 rounded-2xl border border-brand-orange/30 bg-brand-orange/8 p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-3">
            <TriangleAlert
              className="mt-0.5 size-4 shrink-0 text-brand-orange"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-semibold">
                {REMAINING.toLocaleString()} applications left
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                When the balance hits zero, auto-apply pauses. Drafting, tailoring and auto-fill keep
                working — you just cannot submit until you top up.
              </p>
            </div>
          </div>
          <Button size="sm" onClick={() => setSelectedId('unlimited')} className="sm:shrink-0">
            Top up now
          </Button>
        </div>
      ) : null}

      {/* Always included */}
      <section
        aria-label="Included on every plan"
        className="animate-fade-up flex flex-col gap-4 rounded-2xl border border-border bg-card p-5"
      >
        <div className="flex flex-col gap-0.5">
          <h2 className="text-base font-bold tracking-tight">
            You pay for applications. Everything else is included.
          </h2>
          <p className="text-xs text-muted-foreground">
            No AI credits, no token counters, no per-feature charges — on every plan.
          </p>
        </div>
        <ul className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-5">
          {ALWAYS_INCLUDED.map((item, index) => {
            const Icon = INCLUDED_ICONS[index]
            return (
              <li
                key={item.label}
                className="flex items-start gap-2.5 rounded-xl border border-border bg-muted/25 p-3"
              >
                <Icon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                <div className="flex min-w-0 flex-col gap-0.5">
                  <p className="text-xs font-semibold">{item.label}</p>
                  <p className="text-[11px] text-muted-foreground">{item.note}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </section>

      {/* Plans */}
      <section aria-label="Plans" className="flex flex-col gap-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-base font-bold tracking-tight">Buy applications</h2>
            <p className="text-xs text-muted-foreground">
              Packs are one-time and never expire. Unlimited is a flat $100 for a full year.
            </p>
          </div>
        </div>

        <div
          role="radiogroup"
          aria-label="Choose a plan"
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {PLANS.map((plan, index) => {
            const selected = plan.id === selectedId
            const isCurrent = plan.id === BALANCE.planId
            const unlimited = plan.applications === null
            return (
              <button
                key={plan.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setSelectedId(plan.id)}
                style={{ animationDelay: `${index * 70}ms` }}
                className={cn(
                  'interactive-surface animate-fade-up relative flex flex-col gap-4 rounded-2xl border p-5 text-left',
                  selected
                    ? 'border-primary ring-1 ring-primary/30'
                    : 'border-border hover:border-primary/30',
                  unlimited ? 'bg-brand-navy text-primary-foreground' : 'bg-card',
                  selected && !unlimited ? 'bg-accent/50' : null,
                )}
              >
                {plan.bestValue ? (
                  <Badge className="absolute -top-2.5 right-4 bg-brand-orange text-brand-navy">
                    Best value
                  </Badge>
                ) : null}

                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold">{plan.name}</p>
                    {isCurrent ? (
                      <Badge variant="outline" className="text-[10px]">
                        Current
                      </Badge>
                    ) : null}
                  </div>
                  <p
                    className={cn(
                      'text-xs leading-relaxed',
                      unlimited ? 'text-primary-foreground/70' : 'text-muted-foreground',
                    )}
                  >
                    {plan.tagline}
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="flex items-baseline gap-1.5">
                    <span className="font-mono text-3xl leading-none font-extrabold tabular-nums">
                      ${plan.priceUsd}
                    </span>
                    <span
                      className={cn(
                        'text-xs',
                        unlimited ? 'text-primary-foreground/70' : 'text-muted-foreground',
                      )}
                    >
                      {plan.priceNote}
                    </span>
                  </p>
                  <p
                    className={cn(
                      'flex items-center gap-1.5 text-sm font-bold',
                      unlimited ? 'text-brand-orange' : 'text-primary',
                    )}
                  >
                    {unlimited ? (
                      <InfinityIcon className="size-4" aria-hidden="true" />
                    ) : null}
                    {unlimited
                      ? 'Unlimited applications'
                      : `${plan.applications?.toLocaleString()} applications`}
                  </p>
                  <p
                    className={cn(
                      'font-mono text-[11px] tabular-nums',
                      unlimited ? 'text-primary-foreground/60' : 'text-muted-foreground',
                    )}
                  >
                    {plan.perApplication}
                    {plan.applications === null ? '' : ' per application'}
                  </p>
                </div>

                <ul
                  className={cn(
                    'flex flex-col gap-1.5 border-t pt-3',
                    unlimited ? 'border-primary-foreground/15' : 'border-border',
                  )}
                >
                  {[
                    `${formatAllowance(plan.resumeTemplates)} resume templates`,
                    `${formatAllowance(plan.coverLetterTemplates)} cover letter templates`,
                    'All AI features, uncounted',
                    'Free auto-fill everywhere',
                  ].map((feature) => (
                    <li key={feature} className="flex items-start gap-1.5 text-xs">
                      <Check
                        className={cn(
                          'mt-0.5 size-3 shrink-0',
                          unlimited ? 'text-brand-orange' : 'text-primary',
                        )}
                        aria-hidden="true"
                      />
                      <span
                        className={cn(
                          'leading-relaxed',
                          unlimited ? 'text-primary-foreground/80' : 'text-muted-foreground',
                        )}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </button>
            )
          })}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        {/* Balance activity */}
        <section
          aria-label="Balance activity"
          className="animate-fade-up flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
        >
          <div className="flex flex-col gap-0.5 border-b border-border p-5">
            <h2 className="text-base font-bold tracking-tight">Balance activity</h2>
            <p className="text-xs text-muted-foreground">
              Every movement on your application balance, newest first.
            </p>
          </div>
          <ul className="flex flex-col divide-y divide-border">
            {LEDGER.map((entry) => (
              <li key={entry.id} className="flex items-center justify-between gap-4 px-5 py-3.5">
                <div className="flex min-w-0 flex-col gap-0.5">
                  <p className="truncate text-sm font-semibold">{entry.label}</p>
                  <p className="truncate text-xs text-muted-foreground">{entry.detail}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-0.5">
                  <span
                    className={cn(
                      'font-mono text-sm font-bold tabular-nums',
                      entry.delta > 0
                        ? 'text-primary'
                        : entry.delta < 0
                          ? 'text-foreground'
                          : 'text-muted-foreground',
                    )}
                  >
                    {entry.delta === 0
                      ? 'Free'
                      : `${entry.delta > 0 ? '+' : ''}${entry.delta.toLocaleString()}`}
                  </span>
                  <span className="text-[11px] whitespace-nowrap text-muted-foreground">
                    {entry.at}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t border-border bg-muted/20 p-5">
            <p className="mb-2.5 text-xs font-semibold">Good to know</p>
            <ul className="flex flex-col gap-1.5">
              {GOOD_TO_KNOW.map((rule) => (
                <li key={rule} className="flex items-start gap-2 text-xs">
                  <Check className="mt-0.5 size-3 shrink-0 text-primary" aria-hidden="true" />
                  <span className="leading-relaxed text-muted-foreground">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CryptoPaymentPanel plan={selectedPlan} totalUsd={selectedPlan.priceUsd} />
      </div>

      {/* Payment history */}
      <section
        aria-label="Payment history"
        className="animate-fade-up overflow-hidden rounded-2xl border border-border bg-card"
      >
        <div className="flex items-center justify-between gap-3 border-b border-border p-5">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-base font-bold tracking-tight">Payment history</h2>
            <p className="text-xs text-muted-foreground">
              Every payment settles straight into our wallet and is verifiable on-chain.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Receipt</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Purchase</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Paid in</TableHead>
                <TableHead>Transaction</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INVOICES.map((invoice) => {
                const status = STATUS_STYLES[invoice.status]
                return (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-mono text-xs font-semibold">{invoice.id}</TableCell>
                    <TableCell className="text-xs whitespace-nowrap text-muted-foreground">
                      {invoice.date}
                    </TableCell>
                    <TableCell className="text-xs whitespace-nowrap">{invoice.item}</TableCell>
                    <TableCell className="text-right font-mono text-xs tabular-nums">
                      ${invoice.amountUsd}
                    </TableCell>
                    <TableCell className="text-xs whitespace-nowrap">
                      <span className="font-mono font-semibold">
                        {invoice.amountCrypto} {invoice.asset}
                      </span>
                      <span className="ml-1.5 text-muted-foreground">{invoice.network}</span>
                    </TableCell>
                    <TableCell>
                      <a
                        href="#"
                        onClick={(event) => event.preventDefault()}
                        className="flex items-center gap-1 font-mono text-xs text-primary hover:underline"
                      >
                        {truncateHash(invoice.txHash)}
                        <ExternalLink className="size-3" aria-hidden="true" />
                      </a>
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={cn(
                          'inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold',
                          status.className,
                        )}
                      >
                        {status.label}
                      </span>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  )
}
