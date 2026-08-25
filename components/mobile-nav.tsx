'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  CreditCard,
  FileText,
  LayoutTemplate,
  LogOut,
  MessageSquareHeart,
  Settings,
  User,
  Wallet,
  Wand2,
} from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CURRENT_USAGE } from '@/lib/billing-data'
import { cn } from '@/lib/utils'

const items = [
  { label: 'Profile', href: '/profile', icon: User },
  { label: 'Review', href: '/application-review', icon: FileText },
  { label: 'Templates', href: '/templates', icon: LayoutTemplate },
  { label: 'Prompt', href: '/prompt', icon: Wand2 },
  { label: 'Billing', href: '/billing', icon: CreditCard },
  { label: 'Setting', href: '/setting', icon: Settings },
  { label: 'Feedback', href: '/feedback', icon: MessageSquareHeart },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <div className="sticky top-0 z-20 flex flex-col gap-2 bg-sidebar px-4 py-3 text-sidebar-foreground lg:hidden">
      <div className="flex items-center justify-between gap-3">
        <Link href="/profile" className="w-fit">
          <BrandLogo tone="dark" size={34} />
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/billing"
            className="flex items-center gap-2 rounded-full border border-sidebar-border bg-sidebar-accent/50 px-3 py-1.5"
          >
            <Wallet className="size-3.5 text-sidebar-foreground/60" aria-hidden="true" />
            <span className="text-sm font-bold tabular-nums">
              ${CURRENT_USAGE.creditUsd.toFixed(2)}
            </span>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger
              className="grid size-9 shrink-0 place-items-center rounded-full bg-sidebar-primary text-xs font-bold text-sidebar-primary-foreground"
              aria-label="Account menu"
            >
              JD
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={8}>
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  <span className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">Jane Doe</span>
                    <span className="text-xs text-muted-foreground">Bidder</span>
                  </span>
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem render={<Link href="/profile" />}>
                  <User />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/setting" />}>
                  <Settings />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem render={<Link href="/login" />} variant="destructive">
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <nav aria-label="Main" className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1">
        {items.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
                active
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'bg-sidebar-accent/60 text-sidebar-foreground/70',
              )}
            >
              <item.icon className="size-3.5" aria-hidden="true" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
