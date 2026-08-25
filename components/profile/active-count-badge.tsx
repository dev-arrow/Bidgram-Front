'use client'

import { BadgeCheck } from 'lucide-react'
import { useProfilesContext } from '@/components/profile/profiles-context'

export function ActiveCountBadge() {
  const { activeCount } = useProfilesContext()

  return (
    <span className="flex w-fit shrink-0 items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
      <BadgeCheck className="size-3.5" aria-hidden="true" />
      {activeCount} active
    </span>
  )
}
