'use client'

import { useState } from 'react'
import { Check, ExternalLink, Wallet } from 'lucide-react'
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
  CURRENT_USAGE,
  INVOICES,
  PLANS,
  planPrice,
  truncateHash,
  type BillingCycle,
  type InvoiceStatus,
  type Plan,
} from '@/lib/billing-data'
import { cn } from '@/lib/utils'

const STATUS_STYLES: Record<InvoiceStatus, { label: string; className: string }> = {
  confirmed: { label: 'Confirmed', className: 'bg-primary/10 text-primary' },
  pending: { label: 'Pending', className: 'bg-brand-orange/15 text-brand-orange' },
  failed: { label: 'Failed', className: 'bg-destructive/10 text-destructive' },
}

export function BillingView() {
  const [cycle, setCycle] = useState<BillingCycle>(CURRENT_USAGE.cycle)
  const [selectedId, setSelectedId] = useState<Plan['id']>(CURRENT_USAGE.planId)

  const activePlan = PLANS.find((plan) => plan.id === CURRENT_USAGE.planId) ?? PLANS[1]
  const selectedPlan = PLANS.find((plan) => plan.id === selectedId) ?? activePlan
  const totalUsd = planPrice(selectedPlan, cycle)
  const usedPct = Math.min(
    100,
    Math.round((CURRENT_USAGE.bidsUsed / activePlan.bidsPerMonth) * 100),
  )

  return (
    <div className="flex flex-col gap-6 pb-2">
      {/* Current plan + usage */}
      <section
        aria-label="Current plan"
        className="animate-fade-up grid gap-4 rounded-2xl border border-border bg-card p-5 lg:grid-cols-3 lg:p-6"
      >
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold text-muted-foreground">Current plan</p>
          <div className="flex items-center gap-2">
            <p className="text-xl font-extrabold tracking-tight">{activePlan.name}</p>
            <Badge variant="secondary">{CURRENT_USAGE.cycle}</Badge>
          </div>
          <p className="text-xs text-muted-foreground">Renews {CURRENT_USAGE.renewsOn}</p>
        </div>

        <div className="flex flex-col gap-2 lg:border-x lg:border-border lg:px-6">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-xs font-semibold text-muted-foreground">Bids this cycle</p>
            <p className="font-mono text-xs tabular-nums">
              <span className="font-bold text-foreground">{CURRENT_USAGE.bidsUsed}</span>
              <span className="text-muted-foreground">
                {' / '}
                {activePlan.bidsPerMonth.toLocaleString()}
              </span>
            </p>
          </div>
          <div
            className="h-2 w-full overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuenow={usedPct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Bid quota used"
          >
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${usedPct}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {(activePlan.bidsPerMonth - CURRENT_USAGE.bidsUsed).toLocaleString()} bids remaining
          </p>
        </div>

        <div className="flex flex-col gap-1 lg:items-end">
          <p className="text-xs font-semibold text-muted-foreground">Wallet credit</p>
          <p className="flex items-center gap-1.5 font-mono text-xl font-extrabold tabular-nums">
            <Wallet className="size-4 text-primary" aria-hidden="true" />
            ${CURRENT_USAGE.creditUsd.toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground">Applied to your next invoice</p>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        {/* Plans */}
        <section aria-label="Plans" className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-bold tracking-tight">Choose a plan</h2>
            <div
              role="radiogroup"
              aria-label="Billing cycle"
              className="flex items-center gap-1 rounded-lg border border-border bg-muted/40 p-1"
            >
              {(['monthly', 'yearly'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={cycle === option}
                  onClick={() => setCycle(option)}
                  className={cn(
                    'rounded-md px-3 py-1.5 text-xs font-semibold capitalize transition-all duration-200',
                    cycle === option
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {option}
                  {option === 'yearly' ? (
                    <span className="ml-1.5 text-[10px] font-bold text-primary">-20%</span>
                  ) : null}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {PLANS.map((plan, index) => {
              const selected = plan.id === selectedId
              const isCurrent = plan.id === CURRENT_USAGE.planId && cycle === CURRENT_USAGE.cycle
              return (
                <button
                  key={plan.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setSelectedId(plan.id)}
                  style={{ animationDelay: `${index * 70}ms` }}
                  className={cn(
                    'interactive-surface animate-fade-up relative flex flex-col gap-3 rounded-2xl border p-5 text-left',
                    selected
                      ? 'border-primary bg-accent/50 ring-1 ring-primary/30'
                      : 'border-border bg-card hover:border-primary/30',
                  )}
                >
                  {plan.highlighted ? (
                    <Badge className="absolute -top-2.5 right-4">Most popular</Badge>
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
                    <p className="text-xs leading-relaxed text-muted-foreground">{plan.tagline}</p>
                  </div>

                  <p className="flex items-baseline gap-1">
                    <span className="font-mono text-2xl font-extrabold tabular-nums">
                      ${planPrice(plan, cycle)}
                    </span>
                    <span className="text-xs text-muted-foreground">/mo</span>
                  </p>

                  <p className="text-xs font-semibold text-primary">
                    {plan.bidsPerMonth.toLocaleString()} bids / month
                  </p>

                  <ul className="flex flex-col gap-1.5 border-t border-border pt-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-1.5 text-xs">
                        <Check className="mt-0.5 size-3 shrink-0 text-primary" aria-hidden="true" />
                        <span className="leading-relaxed text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              )
            })}
          </div>
        </section>

        <CryptoPaymentPanel plan={selectedPlan} cycle={cycle} totalUsd={totalUsd} />
      </div>

      {/* Invoice history */}
      <section
        aria-label="Payment history"
        className="animate-fade-up overflow-hidden rounded-2xl border border-border bg-card"
      >
        <div className="flex items-center justify-between gap-3 border-b border-border p-5">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-base font-bold tracking-tight">Payment history</h2>
            <p className="text-xs text-muted-foreground">
              Every payment is settled on-chain and verifiable.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Plan</TableHead>
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
                    <TableCell className="text-xs whitespace-nowrap">{invoice.plan}</TableCell>
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
