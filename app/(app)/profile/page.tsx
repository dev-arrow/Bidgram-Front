import type { Metadata } from 'next'
import { Bell, Search, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { ActiveCountBadge } from '@/components/profile/active-count-badge'
import { ProfilesProvider } from '@/components/profile/profiles-context'
import { ProfilesView } from '@/components/profile/profiles-view'

export const metadata: Metadata = {
  title: 'Profiles — Bidgram',
}

export default function ProfilePage() {
  return (
    <>
      <header className="sticky top-0 z-10 flex flex-col gap-4 border-b border-border bg-background/85 px-6 py-5 backdrop-blur-md lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-extrabold tracking-tight">Profiles</h1>
          <p className="text-sm text-muted-foreground">
            Create and manage the bid profiles you use to apply for jobs.
          </p>
        </div>
        <div className="flex items-center gap-3">
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

      <ProfilesProvider>
        <div className="flex min-h-0 flex-1 flex-col gap-6 px-6 py-6 lg:px-8">
          <div className="flex shrink-0 animate-fade-up flex-col gap-3 rounded-2xl border border-primary/20 bg-accent/60 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3.5">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-card text-primary shadow-sm">
                <Zap className="size-5" aria-hidden="true" />
              </span>
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-semibold">Chrome extension</p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Profiles marked <span className="font-semibold text-primary">In use</span> are
                  available to auto-apply from the extension.
                </p>
              </div>
            </div>
            <ActiveCountBadge />
          </div>

          <ProfilesView />
        </div>
      </ProfilesProvider>
    </>
  )
}
