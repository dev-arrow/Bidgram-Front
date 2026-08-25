'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  CreditCard,
  FileText,
  LayoutTemplate,
  MessageSquareHeart,
  Settings,
  User,
  Wand2,
} from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'
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
      <Link href="/profile" className="w-fit">
        <BrandLogo tone="dark" size={34} />
      </Link>
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
