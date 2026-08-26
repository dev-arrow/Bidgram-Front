'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Check, CircleCheck, Copy, RefreshCw, ShieldCheck, TriangleAlert } from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import {
  CRYPTO_ASSETS,
  formatAllowance,
  quoteAmount,
  type CryptoAsset,
  type Plan,
} from '@/lib/billing-data'
import { cn } from '@/lib/utils'

/** Quotes are locked for 15 minutes, then must be refreshed. */
const QUOTE_TTL_SECONDS = 15 * 60

type PaymentStatus = 'idle' | 'confirming' | 'confirmed'

/** Builds a wallet-openable payment URI for the QR code. */
function paymentUri(asset: CryptoAsset, amount: string): string {
  switch (asset.symbol) {
    case 'BTC':
      return `bitcoin:${asset.address}?amount=${amount}`
    case 'ETH':
      return `ethereum:${asset.address}?value=${amount}`
    default:
      return asset.address
  }
}

function formatCountdown(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export function CryptoPaymentPanel({ plan, totalUsd }: { plan: Plan; totalUsd: number }) {
  const [asset, setAsset] = useState<CryptoAsset>(CRYPTO_ASSETS[0])
  const [network, setNetwork] = useState<string>(CRYPTO_ASSETS[0].networks[0])
  const [status, setStatus] = useState<PaymentStatus>('idle')
  const [secondsLeft, setSecondsLeft] = useState(QUOTE_TTL_SECONDS)
  const [copied, setCopied] = useState<'address' | 'amount' | null>(null)
  const confirmTimer = useRef<number | undefined>(undefined)

  const amount = useMemo(() => quoteAmount(asset, totalUsd), [asset, totalUsd])
  const expired = secondsLeft <= 0

  // Countdown for the locked quote.
  useEffect(() => {
    if (status === 'confirmed') return
    const id = window.setInterval(() => {
      setSecondsLeft((current) => (current <= 0 ? 0 : current - 1))
    }, 1000)
    return () => window.clearInterval(id)
  }, [status])

  // Clear any in-flight confirmation simulation on unmount.
  useEffect(() => () => window.clearTimeout(confirmTimer.current), [])

  function selectAsset(next: CryptoAsset) {
    setAsset(next)
    setNetwork(next.networks[0])
    setStatus('idle')
    setSecondsLeft(QUOTE_TTL_SECONDS)
  }

  function refreshQuote() {
    setSecondsLeft(QUOTE_TTL_SECONDS)
    setStatus('idle')
    toast.success('Quote refreshed', { description: 'Rate locked for another 15 minutes.' })
  }

  async function copy(value: string, which: 'address' | 'amount') {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(which)
      window.setTimeout(() => setCopied(null), 1600)
    } catch {
      toast.error('Could not copy to clipboard')
    }
  }

  function markAsSent() {
    setStatus('confirming')
    // Front-end only: stands in for watching the chain for confirmations.
    confirmTimer.current = window.setTimeout(() => {
      setStatus('confirmed')
      toast.success('Payment detected on-chain', {
        description:
          plan.kind === 'pack'
            ? `${formatAllowance(plan.applications)} applications added to your balance.`
            : 'Unlimited applications active for the next 12 months.',
      })
    }, 2600)
  }

  if (status === 'confirmed') {
    return (
      <section
        aria-label="Payment confirmed"
        className="animate-fade-up flex flex-col items-center gap-4 rounded-2xl border border-primary/30 bg-accent/50 p-8 text-center"
      >
        <span className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground">
          <CircleCheck className="size-7" aria-hidden="true" />
        </span>
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-bold tracking-tight">Payment received</h2>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            {plan.kind === 'pack' ? (
              <>
                <span className="font-semibold text-foreground">
                  {formatAllowance(plan.applications)} applications
                </span>{' '}
                were added to your balance. They never expire.
              </>
            ) : (
              <>
                <span className="font-semibold text-foreground">Unlimited</span> is active for the
                next 12 months.
              </>
            )}{' '}
            The transaction is recorded below.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setStatus('idle')}>
          Make another payment
        </Button>
      </section>
    )
  }

  return (
    <section
      aria-label="Crypto checkout"
      className="animate-fade-up flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
    >
      <div className="flex items-center justify-between gap-3 border-b border-border p-5">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-base font-bold tracking-tight">Pay with crypto</h2>
          <p className="text-xs text-muted-foreground">
            {plan.name} &middot;{' '}
            {plan.kind === 'pack'
              ? `${formatAllowance(plan.applications)} applications`
              : 'Unlimited for 12 months'}
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-xl font-bold tabular-nums">${totalUsd}</p>
          <p className="text-[11px] text-muted-foreground">{plan.priceNote}</p>
        </div>
      </div>

      <div className="flex flex-col gap-5 p-5">
        {/* Asset selection */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold">Pay with</p>
          <div className="grid grid-cols-4 gap-2">
            {CRYPTO_ASSETS.map((item) => (
              <button
                key={item.symbol}
                type="button"
                aria-pressed={asset.symbol === item.symbol}
                onClick={() => selectAsset(item)}
                className={cn(
                  'flex flex-col items-center gap-0.5 rounded-xl border px-2 py-2.5 transition-all duration-200',
                  asset.symbol === item.symbol
                    ? 'border-primary bg-accent/70 ring-1 ring-primary/30'
                    : 'border-border hover:border-primary/30 hover:bg-muted/50',
                )}
              >
                <span
                  className={cn(
                    'text-sm font-bold',
                    asset.symbol === item.symbol ? 'text-primary' : 'text-foreground',
                  )}
                >
                  {item.symbol}
                </span>
                <span className="text-[10px] text-muted-foreground">{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Network selection */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold">Network</p>
          <div className="flex flex-wrap gap-2">
            {asset.networks.map((item, index) => (
              <button
                key={item}
                type="button"
                aria-pressed={network === item}
                onClick={() => setNetwork(item)}
                className={cn(
                  'flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all duration-200',
                  network === item
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border text-muted-foreground hover:border-primary/30 hover:bg-muted/50',
                )}
              >
                {item}
                {index === 0 ? (
                  <span
                    className={cn(
                      'rounded px-1 py-0.5 text-[9px] font-bold uppercase',
                      network === item
                        ? 'bg-primary-foreground/20 text-primary-foreground'
                        : 'bg-accent text-primary',
                    )}
                  >
                    Low fee
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </div>

        {/* Amount + address */}
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-muted/30 p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-[11px] font-semibold text-muted-foreground">Amount due</p>
              <p className="font-mono text-lg font-bold tabular-nums">
                {amount} <span className="text-sm text-muted-foreground">{asset.symbol}</span>
              </p>
              <button
                type="button"
                onClick={() => copy(amount, 'amount')}
                className="flex w-fit items-center gap-1 text-[11px] font-medium text-primary hover:underline"
              >
                {copied === 'amount' ? (
                  <Check className="size-3" aria-hidden="true" />
                ) : (
                  <Copy className="size-3" aria-hidden="true" />
                )}
                {copied === 'amount' ? 'Copied' : 'Copy amount'}
              </button>
            </div>

            <div className="shrink-0 rounded-lg bg-white p-2 ring-1 ring-border">
              <QRCodeSVG
                value={paymentUri(asset, amount)}
                size={92}
                level="M"
                bgColor="#ffffff"
                fgColor="#2c3040"
                aria-label={`${asset.symbol} payment QR code`}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 border-t border-border pt-3">
            <p className="text-[11px] font-semibold text-muted-foreground">
              {asset.symbol} deposit address &middot; {network}
            </p>
            <div className="flex items-center gap-2">
              <code className="min-w-0 flex-1 truncate rounded-md bg-card px-2 py-1.5 font-mono text-[11px] ring-1 ring-border">
                {asset.address}
              </code>
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="Copy deposit address"
                onClick={() => copy(asset.address, 'address')}
              >
                {copied === 'address' ? <Check /> : <Copy />}
              </Button>
            </div>
          </div>
        </div>

        {/* Quote timer */}
        <div
          className={cn(
            'flex items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5',
            expired ? 'border-destructive/30 bg-destructive/5' : 'border-border bg-muted/20',
          )}
        >
          {expired ? (
            <>
              <span className="flex items-center gap-2 text-xs font-medium text-destructive">
                <TriangleAlert className="size-3.5" aria-hidden="true" />
                Quote expired
              </span>
              <Button variant="outline" size="sm" onClick={refreshQuote}>
                <RefreshCw data-icon="inline-start" />
                Refresh
              </Button>
            </>
          ) : (
            <>
              <span className="text-xs text-muted-foreground">Rate locked for</span>
              <Badge variant="secondary" className="font-mono tabular-nums">
                {formatCountdown(secondsLeft)}
              </Badge>
            </>
          )}
        </div>

        <Button
          className="w-full"
          size="lg"
          disabled={expired || status === 'confirming'}
          onClick={markAsSent}
        >
          {status === 'confirming' ? (
            <>
              <Spinner data-icon="inline-start" />
              Waiting for confirmations...
            </>
          ) : (
            `I've sent the payment`
          )}
        </Button>

        <p className="flex items-start gap-2 text-[11px] leading-relaxed text-muted-foreground">
          <ShieldCheck className="mt-px size-3.5 shrink-0 text-primary" aria-hidden="true" />
          Send only <span className="font-semibold text-foreground">{asset.symbol}</span> on the{' '}
          <span className="font-semibold text-foreground">{network}</span> network to this address.
          Payments go straight to our wallet — no processor in between. Funds sent on another network
          cannot be recovered. Applications are credited after 2 network confirmations.
        </p>
      </div>
    </section>
  )
}
