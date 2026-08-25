import type { ReactNode } from 'react'
import { Bell, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'

/**
 * Sticky page header shared by every screen in the (app) group so the
 * title/search/notifications row stays identical across routes.
 */
export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string
  description: string
  actions?: ReactNode
}) {
  return (
    <header className="sticky top-0 z-10 flex flex-col gap-4 border-b border-border bg-background/85 px-6 py-5 backdrop-blur-md lg:flex-row lg:items-center lg:justify-between lg:px-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center gap-3">
        {actions}
        <InputGroup className="h-10 lg:w-64">
          <InputGroupAddon>
            <Search aria-hidden="true" />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search..." aria-label="Search Bidgram" />
        </InputGroup>
        <Button variant="outline" size="icon" className="relative size-10" aria-label="Notifications">
          <Bell />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-brand-orange ring-2 ring-card" />
        </Button>
      </div>
    </header>
  )
}
