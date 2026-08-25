import type { ReactNode } from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import { MobileNav } from '@/components/mobile-nav'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-svh bg-background">
      <AppSidebar />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <MobileNav />
        {children}
      </div>
    </div>
  )
}
