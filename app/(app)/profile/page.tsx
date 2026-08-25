import type { Metadata } from 'next'
import { Zap } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { ActiveCountBadge } from '@/components/profile/active-count-badge'
import { ProfilesProvider } from '@/components/profile/profiles-context'
import { ProfilesView } from '@/components/profile/profiles-view'

export const metadata: Metadata = {
  title: 'Profiles — Bidgram',
}

export default function ProfilePage() {
  return (
    <>
      <PageHeader
        title="Profiles"
        description="Create and manage the bid profiles you use to apply for jobs."
      />

      <ProfilesProvider>
        <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-6 py-6 lg:px-8">
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
