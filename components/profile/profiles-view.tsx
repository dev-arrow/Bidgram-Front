'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  BadgeCheck,
  Briefcase,
  LayoutGrid,
  Plus,
  Search,
  Table as TableIcon,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { ProfileCard } from '@/components/profile/profile-card'
import { useProfilesContext } from '@/components/profile/profiles-context'
import { ProfileTable } from '@/components/profile/profile-table'
import { totalApplications } from '@/lib/profiles'

export function ProfilesView() {
  const { profiles: allProfiles, activeCount } = useProfilesContext()
  const [query, setQuery] = useState('')
  const [view, setView] = useState<'grid' | 'table'>('grid')

  const stats = [
    { icon: Briefcase, label: 'Total profiles', value: allProfiles.length },
    { icon: Zap, label: 'Total applications', value: totalApplications(allProfiles) },
    { icon: BadgeCheck, label: 'In use', value: activeCount },
  ]

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return allProfiles
    return allProfiles.filter((profile) =>
      `${profile.name} ${profile.title}`.toLowerCase().includes(needle),
    )
  }, [query, allProfiles])

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex shrink-0 animate-fade-up flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <InputGroup className="h-10 sm:max-w-xs">
          <InputGroupAddon>
            <Search aria-hidden="true" />
          </InputGroupAddon>
          <InputGroupInput
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search profiles..."
            aria-label="Search profiles"
          />
        </InputGroup>

        <div className="flex items-center gap-3">
          <ToggleGroup
            value={[view]}
            onValueChange={(value) => {
              const next = value[0]
              if (next === 'grid' || next === 'table') setView(next)
            }}
            variant="outline"
            spacing={0}
            className="h-10"
          >
            <ToggleGroupItem value="grid" aria-label="Grid view" className="h-10 px-3">
              <LayoutGrid />
            </ToggleGroupItem>
            <ToggleGroupItem value="table" aria-label="Table view" className="h-10 px-3">
              <TableIcon />
            </ToggleGroupItem>
          </ToggleGroup>

          <Button className="h-10" render={<Link href="/profile/new" />} nativeButton={false}>
            <Plus data-icon="inline-start" />
            New profile
          </Button>
        </div>
      </div>

      <div className="grid shrink-0 animate-fade-up gap-4 sm:grid-cols-3">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="interactive-surface flex animate-fade-up items-center gap-4 rounded-2xl border border-border bg-card p-5"
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
              <stat.icon className="size-5" aria-hidden="true" />
            </span>
            <span className="flex flex-col">
              <span className="font-mono text-2xl font-bold tracking-tight">{stat.value}</span>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="flex-1">
        {filtered.length === 0 ? (
          <Empty className="rounded-2xl border border-dashed border-border bg-card">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Search />
              </EmptyMedia>
              <EmptyTitle>No profiles found</EmptyTitle>
              <EmptyDescription>
                Nothing matches &ldquo;{query}&rdquo;. Try a different keyword.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-5 p-1">
            {filtered.map((profile, index) => (
              <div
                key={profile.id}
                className="motion-pop-in"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <ProfileCard profile={profile} />
              </div>
            ))}
          </div>
        ) : (
          <div className="animate-fade-up">
            <ProfileTable profiles={filtered} />
          </div>
        )}
      </div>
    </div>
  )
}
