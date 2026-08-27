/**
 * Billing model — one billable resource only: submitted job applications.
 *
 * Everything else (AI resume generation, tailoring, cover letters, AI answers
 * to screening questions, auto-fill) is included and never consumes credits.
 *
 * Starter / Growth / Pro are one-time application packs that never expire.
 * Unlimited is a $100/year subscription with a fair-use ceiling applied
 * internally (never surfaced as a hard limit in the UI).
 */

export type PlanId = 'starter' | 'growth' | 'pro' | 'unlimited'

export type Plan = {
  id: PlanId
  name: string
  tagline: string
  priceUsd: number
  /** One-time credit pack, or a yearly subscription. */
  kind: 'pack' | 'subscription'
  /** Billing frequency shown next to the price. */
  priceNote: string
  /** `null` means unlimited. */
  applications: number | null
  resumeTemplates: number | null
  coverLetterTemplates: number | null
  /** Effective cost per application, for the value line. */
  perApplication: string
  bestValue?: boolean
}

export const PLANS: readonly Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Try the whole workflow on a real search.',
    priceUsd: 10,
    kind: 'pack',
    priceNote: 'one-time',
    applications: 2000,
    resumeTemplates: 3,
    coverLetterTemplates: 1,
    perApplication: '$0.005',
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'A focused, full-time job hunt.',
    priceUsd: 20,
    kind: 'pack',
    priceNote: 'one-time',
    applications: 5000,
    resumeTemplates: 6,
    coverLetterTemplates: 3,
    perApplication: '$0.004',
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'High-volume applying across many roles.',
    priceUsd: 50,
    kind: 'pack',
    priceNote: 'one-time',
    applications: 15000,
    resumeTemplates: 10,
    coverLetterTemplates: 6,
    perApplication: '$0.003',
  },
  {
    id: 'unlimited',
    name: 'Unlimited',
    tagline: 'Stop counting. Apply for a whole year.',
    priceUsd: 100,
    kind: 'subscription',
    priceNote: 'per year',
    applications: null,
    resumeTemplates: null,
    coverLetterTemplates: null,
    perApplication: 'no limit',
    bestValue: true,
  },
] as const

/** Included on every plan, at no extra cost and with no separate credits. */
export const ALWAYS_INCLUDED = [
  { label: 'AI resume generation', note: 'Unlimited generations' },
  { label: 'Resume tailoring per job', note: 'Unlimited rewrites' },
  { label: 'AI cover letters', note: 'Unlimited drafts' },
  { label: 'AI screening answers', note: 'Unlimited answers' },
  { label: 'Auto-fill on any job board', note: 'Always free' },
] as const

export type CryptoAsset = {
  symbol: 'USDT' | 'USDC' | 'BTC' | 'ETH'
  name: string
  /** Networks the asset can be sent on, cheapest first. */
  networks: readonly string[]
  /** Indicative USD price used to quote the payable amount. */
  usdRate: number
  /** Decimal places shown when quoting an amount. */
  precision: number
  /** Destination wallet per asset (mock, front-end only). */
  address: string
}

export const CRYPTO_ASSETS: readonly CryptoAsset[] = [
  {
    symbol: 'USDT',
    name: 'Tether',
    networks: ['TRC-20', 'ERC-20', 'BEP-20'],
    usdRate: 1,
    precision: 2,
    address: 'TQ5nrGz8ux9bJqYw3vKdM2fHsPa7RcVeBn',
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    networks: ['Base', 'ERC-20', 'Solana'],
    usdRate: 1,
    precision: 2,
    address: '0x7a4F1c9E2bD35a8C06fE49b7D1c8Ba53E92fD4c1',
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    networks: ['Bitcoin', 'Lightning'],
    usdRate: 96400,
    precision: 6,
    address: 'bc1qk8v3xn7pm2ldg9y4jrs0fzt6ecwq5haub31nvd',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    networks: ['Base', 'Arbitrum', 'ERC-20'],
    usdRate: 3120,
    precision: 5,
    address: '0x2Fb91Ae6cD48037fA15E9c3B7d206aE84c15FbD9',
  },
] as const

/** The user's application balance. Credits from packs never expire. */
export const BALANCE = {
  planId: 'growth' as PlanId,
  granted: 5000,
  used: 3684,
  purchasedOn: 'Jun 4, 2026',
  /** Applications submitted in the last 7 days, oldest first. */
  weeklyBurn: [22, 31, 18, 44, 39, 27, 52] as readonly number[],
  /** Leftover from an overpaid transaction, applied to the next purchase. */
  walletCreditUsd: 6.4,
}

export const REMAINING = BALANCE.granted - BALANCE.used

export type LedgerEntry = {
  id: string
  label: string
  detail: string
  /** Negative deducts applications, positive tops up. */
  delta: number
  at: string
}

/** Recent movements on the application balance. */
export const LEDGER: readonly LedgerEntry[] = [
  {
    id: 'L-3312',
    label: 'Application submitted',
    detail: 'Senior Frontend Engineer · Linear',
    delta: -1,
    at: 'Today, 14:22',
  },
  {
    id: 'L-3311',
    label: 'Application submitted',
    detail: 'Product Engineer · Ramp',
    delta: -1,
    at: 'Today, 13:48',
  },
  {
    id: 'L-3310',
    label: 'Draft discarded',
    detail: 'Never submitted — nothing charged',
    delta: 0,
    at: 'Today, 13:05',
  },
  {
    id: 'L-3309',
    label: 'Submission failed',
    detail: 'Portal rejected the upload — credit returned',
    delta: 1,
    at: 'Yesterday, 18:31',
  },
  {
    id: 'L-3308',
    label: 'Growth pack purchased',
    detail: '5,000 applications · paid 20.00 USDC',
    delta: 5000,
    at: 'Jun 4, 2026',
  },
] as const

export type InvoiceStatus = 'confirmed' | 'pending' | 'failed'

export type Invoice = {
  id: string
  date: string
  item: string
  amountUsd: number
  asset: CryptoAsset['symbol']
  amountCrypto: string
  network: string
  status: InvoiceStatus
  txHash: string
}

export const INVOICES: readonly Invoice[] = [
  {
    id: 'BG-2041',
    date: 'Jun 4, 2026',
    item: 'Growth — 5,000 applications',
    amountUsd: 20,
    asset: 'USDC',
    amountCrypto: '20.00',
    network: 'Base',
    status: 'confirmed',
    txHash: '9f3c7a1e58b04d2fa6c9e3b7d105af82c64e9b3a7f1d0c58e2b9a4f6d3c8e1b70',
  },
  {
    id: 'BG-1987',
    date: 'Mar 18, 2026',
    item: 'Starter — 2,000 applications',
    amountUsd: 10,
    asset: 'USDT',
    amountCrypto: '10.00',
    network: 'TRC-20',
    status: 'confirmed',
    txHash: '4b8e2d0f96a15c73e8d4b1a7f2c609e35d7a8b4c1f6e0d92a3b5c7e8f1a0d4b62',
  },
  {
    id: 'BG-1902',
    date: 'Feb 2, 2026',
    item: 'Starter — 2,000 applications',
    amountUsd: 10,
    asset: 'ETH',
    amountCrypto: '0.00321',
    network: 'Arbitrum',
    status: 'confirmed',
    txHash: 'c17d5f3a0e924b68d1c5a9f4b2e70d836a1c4f9b5e2d8a06c3f7b1e4d9a2c5083',
  },
] as const

/** Quotes the crypto amount payable for a USD total. */
export function quoteAmount(asset: CryptoAsset, usd: number): string {
  return (usd / asset.usdRate).toFixed(asset.precision)
}

/** "5,000" or "Unlimited" for a nullable allowance. */
export function formatAllowance(value: number | null): string {
  return value === null ? 'Unlimited' : value.toLocaleString()
}

/** Shortens a long hash for display: first 8 and last 6 characters. */
export function truncateHash(hash: string): string {
  return `${hash.slice(0, 8)}...${hash.slice(-6)}`
}
