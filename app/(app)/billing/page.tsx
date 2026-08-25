import type { Metadata } from 'next'
import { Bitcoin } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { BillingView } from '@/components/billing/billing-view'

export const metadata: Metadata = {
  title: 'Billing — Bidgram',
  description: 'Manage your Bidgram plan and pay with USDT, USDC, BTC, or ETH.',
}

export default function BillingPage() {
  return (
    <>
      <PageHeader
        title="Billing"
        description="Pick a plan and pay in crypto. No cards, no bank details, no chargebacks."
      />

      <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-6 py-6 lg:px-8">
        <div className="flex shrink-0 animate-fade-up flex-col gap-3 rounded-2xl border border-primary/20 bg-accent/60 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3.5">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-card text-primary shadow-sm">
              <Bitcoin className="size-5" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-semibold">Crypto-only billing</p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Bidgram does not accept credit or debit cards. We settle in{' '}
                <span className="font-semibold text-primary">USDT, USDC, BTC, and ETH</span> across
                the networks below.
              </p>
            </div>
          </div>
        </div>

        <BillingView />
      </div>
    </>
  )
}
