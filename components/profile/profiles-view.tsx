'use client'

import { useMemo, useState } from 'react'
import {
  BadgeCheck,
  Briefcase,
  LayoutGrid,
  Plus,
  Search,
  Table as TableIcon,
  Zap,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { ProfileCard } from '@/components/profile/profile-card'
import { ProfileTable } from '@/components/profile/profile-table'
import { profiles as allProfiles, totalApplications } from '@/lib/profiles'

const stats = [
  { icon: Briefcase, label: 'Total profiles', value: allProfiles.length },
  { icon: Zap, label: 'Total applications', value: totalApplications() },
  {
    icon: BadgeCheck,
    label: 'In use',
    value: allProfiles.filter((profile) => profile.inUse).length,
  },
]

export function ProfilesView() {
  const [query, setQuery] = useState('')
  const [view, setView] = useState<'grid' | 'table'>('grid')

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return allProfiles
    return allProfiles.filter((profile) =>
      `${profile.name} ${profile.title}`.toLowerCase().includes(needle),
    )
  }, [query])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex animate-fade-up flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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

          <Button
            className="h-10"
            onClick={() => toast.success('New profile', { description: 'Profile builder coming soon.' })}
          >
            <Plus data-icon="inline-start" />
            New profile
          </Button>
        </div>
      </div>

      <div className="grid animate-fade-up gap-4 sm:grid-cols-3">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="flex animate-fade-up items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-shadow duration-300 hover:shadow-md"
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
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {filtered.map((profile, index) => (
            <div
              key={profile.id}
              className="animate-fade-up"
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
  )
}
