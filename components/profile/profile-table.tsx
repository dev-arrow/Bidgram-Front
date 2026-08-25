'use client'

import Link from 'next/link'
import { BadgeCheck, Pencil, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useProfilesContext } from '@/components/profile/profiles-context'
import { DeleteProfileButton } from '@/components/profile/delete-profile-button'
import { WeekAxis, WeekBarChart } from '@/components/profile/week-bar-chart'
import { weekTotal, type Profile } from '@/lib/profiles'
import { cn } from '@/lib/utils'

function ProfileRow({ profile }: { profile: Profile }) {
  const { toggleInUse } = useProfilesContext()
  const inUse = profile.inUse

  return (
    <TableRow>
      <TableCell className="px-4 py-3.5">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              'grid size-4 shrink-0 place-items-center rounded-full',
              inUse ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground/50',
            )}
            aria-hidden="true"
          >
            <BadgeCheck className="size-3" />
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{profile.name}</span>
            <span className="text-xs text-muted-foreground">{profile.title}</span>
          </div>
        </div>
      </TableCell>
      <TableCell className="px-4 py-3.5">
        <div className="flex flex-col">
          <span className="text-sm font-medium">{profile.experience[0].company}</span>
          <span className="text-xs text-muted-foreground">
            {profile.experience[0].period}
            {profile.experience.length > 1 ? ` · +${profile.experience.length - 1}` : ''}
          </span>
        </div>
      </TableCell>
      <TableCell className="px-4 py-3.5">
        <div className="flex flex-col">
          <span className="text-sm font-medium">{profile.education.school}</span>
          <span className="text-xs text-muted-foreground">
            {profile.education.degree} · {profile.education.period}
          </span>
        </div>
      </TableCell>
      <TableCell className="px-4 py-3.5">
        <div className="flex w-40 flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-primary">{weekTotal(profile)} applied</span>
          </div>
          <WeekBarChart data={profile.daily} height={32} />
          <WeekAxis />
        </div>
      </TableCell>
      <TableCell className="px-4 py-3.5">
        <span className="flex items-center gap-1.5 text-sm font-semibold">
          <Zap className="size-3.5 text-primary" aria-hidden="true" />
          {profile.using}
        </span>
      </TableCell>
      <TableCell className="px-4 py-3.5">
        <div className="flex items-center justify-end gap-2">
          <Button
            variant={inUse ? 'default' : 'outline'}
            size="sm"
            aria-pressed={inUse}
            title={inUse ? 'This profile is currently active' : 'Use this profile'}
            onClick={() => toggleInUse(profile.id)}
          >
            <BadgeCheck data-icon="inline-start" />
            {inUse ? 'In use' : 'Use'}
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label={`Edit ${profile.name}`}
            render={<Link href={`/profile/${profile.id}/edit`} />}
            nativeButton={false}
          >
            <Pencil />
          </Button>
          <DeleteProfileButton id={profile.id} name={profile.name} size="icon-sm" />
        </div>
      </TableCell>
    </TableRow>
  )
}

export function ProfileTable({ profiles }: { profiles: Profile[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="px-4 py-3 text-[10px] tracking-widest text-muted-foreground uppercase">
              Profile
            </TableHead>
            <TableHead className="px-4 text-[10px] tracking-widest text-muted-foreground uppercase">
              Experience
            </TableHead>
            <TableHead className="px-4 text-[10px] tracking-widest text-muted-foreground uppercase">
              Education
            </TableHead>
            <TableHead className="px-4 text-[10px] tracking-widest text-muted-foreground uppercase">
              Last 7 days
            </TableHead>
            <TableHead className="px-4 text-[10px] tracking-widest text-muted-foreground uppercase">
              Using
            </TableHead>
            <TableHead className="px-4 text-right text-[10px] tracking-widest text-muted-foreground uppercase">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profiles.map((profile) => (
            <ProfileRow key={profile.id} profile={profile} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
