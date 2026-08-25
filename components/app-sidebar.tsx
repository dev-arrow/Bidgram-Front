'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ChevronsUpDown,
  CreditCard,
  FileText,
  LayoutTemplate,
  LogOut,
  MessageSquareHeart,
  Plus,
  Settings,
  Sparkles,
  User,
  Wallet,
  Wand2,
} from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'
import { useLanguage } from '@/components/language-provider'
import { Button } from '@/components/ui/button'
import { CURRENT_USAGE } from '@/lib/billing-data'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/profile', icon: User },
  { href: '/application-review', icon: FileText },
  { href: '/templates', icon: LayoutTemplate },
  { href: '/prompt', icon: Wand2 },
  { href: '/billing', icon: CreditCard },
  { href: '/setting', icon: Settings },
  { href: '/feedback', icon: MessageSquareHeart },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const balanceLabel = `$${CURRENT_USAGE.creditUsd.toFixed(2)}`

  return (
    <aside className="sticky top-0 hidden h-svh w-72 shrink-0 flex-col gap-6 bg-sidebar px-4 py-5 text-sidebar-foreground lg:flex">
      <Link href="/profile" className="px-1">
        <BrandLogo tone="dark" size={40} />
      </Link>

      <nav aria-label="Main" className="flex flex-col gap-1">
        {navItems.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                active
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-sidebar-primary/25'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
              )}
            >
              <item.icon
                className={cn(
                  'size-4.5 shrink-0 transition-transform duration-200',
                  !active && 'group-hover:scale-110',
                )}
                aria-hidden="true"
              />
              {t.nav[item.href] ?? item.href}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-4">
        {/* Current wallet balance, always visible in the menu. */}
        <Link
          href="/billing"
          className="flex items-center gap-3 rounded-2xl border border-sidebar-border bg-sidebar-accent/40 px-3.5 py-3 transition-colors hover:border-sidebar-primary/50 hover:bg-sidebar-accent"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sidebar-primary/15 text-sidebar-primary-foreground">
            <Wallet className="size-4.5" aria-hidden="true" />
          </span>
          <span className="flex flex-1 flex-col">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-sidebar-foreground/55">
              {t.balance}
            </span>
            <span className="text-lg font-extrabold leading-tight tabular-nums">
              {balanceLabel}
            </span>
          </span>
          <Plus className="size-4 text-sidebar-foreground/50" aria-hidden="true" />
        </Link>

        <div className="relative overflow-hidden rounded-2xl bg-sidebar-primary p-4 text-sidebar-primary-foreground">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-8 -right-6 size-24 rounded-full bg-white/20 blur-2xl"
          />
          <p className="relative flex items-center gap-1.5 text-sm font-bold">
            <Sparkles className="size-4" aria-hidden="true" />
            Go Pro
          </p>
          <p className="relative mt-1 text-xs leading-relaxed text-primary-foreground/80">
            Unlimited AI proposals, lowest bid cost.
          </p>
          <Button
            variant="secondary"
            size="sm"
            className="relative mt-3 w-full bg-card text-primary hover:bg-card/90"
          >
            Upgrade plan
          </Button>
        </div>

        <div className="border-t border-sidebar-border pt-4">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-xl px-1 py-1.5 text-left transition-colors hover:bg-sidebar-accent"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sidebar-primary text-xs font-bold text-sidebar-primary-foreground">
              JD
            </span>
            <span className="flex flex-1 flex-col">
              <span className="text-sm font-semibold">Jane Doe</span>
              <span className="text-xs text-sidebar-foreground/55">Bidder</span>
            </span>
            <ChevronsUpDown className="size-4 text-sidebar-foreground/50" aria-hidden="true" />
          </button>

          <Link
            href="/login"
            className="mt-2 flex items-center gap-3 rounded-xl px-2 py-2.5 text-sm text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <LogOut className="size-4.5" aria-hidden="true" />
            Log out
          </Link>
        </div>
      </div>
    </aside>
  )
}
