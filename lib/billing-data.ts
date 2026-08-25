export type BillingCycle = 'monthly' | 'yearly'

export type Plan = {
  id: 'starter' | 'pro' | 'scale'
  name: string
  tagline: string
  monthlyUsd: number
  /** Per-month price when billed for a full year. */
  yearlyUsd: number
  bidsPerMonth: number
  features: readonly string[]
  highlighted?: boolean
}

export const PLANS: readonly Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Test the water on a single profile.',
    monthlyUsd: 12,
    yearlyUsd: 9,
    bidsPerMonth: 60,
    features: ['1 bid profile', 'Default prompts', 'Email support'],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'For an active, full-time search.',
    monthlyUsd: 29,
    yearlyUsd: 23,
    bidsPerMonth: 400,
    features: [
      '5 bid profiles',
      'Custom prompts',
      'Chrome extension auto-apply',
      'Priority support',
    ],
    highlighted: true,
  },
  {
    id: 'scale',
    name: 'Scale',
    tagline: 'Agencies bidding on behalf of clients.',
    monthlyUsd: 79,
    yearlyUsd: 63,
    bidsPerMonth: 2000,
    features: [
      'Unlimited bid profiles',
      'Custom prompts + A/B testing',
      'Team seats & shared history',
      'Dedicated success manager',
    ],
  },
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
  /** Deposit address per asset (mock, front-end only). */
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
    networks: ['ERC-20', 'Base', 'Solana'],
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
    networks: ['ERC-20', 'Base', 'Arbitrum'],
    usdRate: 3120,
    precision: 5,
    address: '0x2Fb91Ae6cD48037fA15E9c3B7d206aE84c15FbD9',
  },
] as const

export type InvoiceStatus = 'confirmed' | 'pending' | 'failed'

export type Invoice = {
  id: string
  date: string
  plan: string
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
    date: 'Aug 1, 2026',
    plan: 'Pro — monthly',
    amountUsd: 29,
    asset: 'USDT',
    amountCrypto: '29.00',
    network: 'TRC-20',
    status: 'confirmed',
    txHash: '9f3c7a1e58b04d2fa6c9e3b7d105af82c64e9b3a7f1d0c58e2b9a4f6d3c8e1b70',
  },
  {
    id: 'BG-1987',
    date: 'Jul 1, 2026',
    plan: 'Pro — monthly',
    amountUsd: 29,
    asset: 'USDC',
    amountCrypto: '29.00',
    network: 'Base',
    status: 'confirmed',
    txHash: '4b8e2d0f96a15c73e8d4b1a7f2c609e35d7a8b4c1f6e0d92a3b5c7e8f1a0d4b62',
  },
  {
    id: 'BG-1902',
    date: 'Jun 1, 2026',
    plan: 'Pro — monthly',
    amountUsd: 29,
    asset: 'ETH',
    amountCrypto: '0.00929',
    network: 'Arbitrum',
    status: 'confirmed',
    txHash: 'c17d5f3a0e924b68d1c5a9f4b2e70d836a1c4f9b5e2d8a06c3f7b1e4d9a2c5083',
  },
  {
    id: 'BG-1855',
    date: 'May 1, 2026',
    plan: 'Starter — monthly',
    amountUsd: 12,
    asset: 'BTC',
    amountCrypto: '0.000124',
    network: 'Lightning',
    status: 'confirmed',
    txHash: '2a9f4c8e1b7d305a6f2c9e4b8d1a7053f6c2b9e4a8d105c3f7b2e9a4d6c8f1035',
  },
] as const

/** Current usage against the active plan, for the meter on the billing page. */
export const CURRENT_USAGE = {
  planId: 'pro' as Plan['id'],
  cycle: 'monthly' as BillingCycle,
  bidsUsed: 268,
  renewsOn: 'Sep 1, 2026',
  /** Prepaid credit left over from previous overpayments. */
  creditUsd: 6.4,
}

/** Quotes the crypto amount payable for a USD total. */
export function quoteAmount(asset: CryptoAsset, usd: number): string {
  return (usd / asset.usdRate).toFixed(asset.precision)
}

export function planPrice(plan: Plan, cycle: BillingCycle): number {
  return cycle === 'monthly' ? plan.monthlyUsd : plan.yearlyUsd
}

/** Shortens a long hash for display: first 8 and last 6 characters. */
export function truncateHash(hash: string): string {
  return `${hash.slice(0, 8)}...${hash.slice(-6)}`
}
