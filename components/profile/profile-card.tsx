'use client'

import { useState } from 'react'
import {
  BadgeCheck,
  Briefcase,
  ChartColumn,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Pencil,
  Table as TableIcon,
  Trash2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { WeekAxis, WeekBarChart } from '@/components/profile/week-bar-chart'
import { WEEK_DAYS_LONG, weekTotal, type Profile } from '@/lib/profiles'
import { cn } from '@/lib/utils'

export function ProfileCard({ profile }: { profile: Profile }) {
  const [inUse, setInUse] = useState(profile.inUse)
  const [showTable, setShowTable] = useState(false)
  const total = weekTotal(profile)

  return (
    <Card
      className={cn(
        'group relative flex h-full flex-col gap-0 overflow-hidden py-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10',
        inUse ? 'border-primary/45' : 'border-border',
      )}
    >
      {/* Shipping-tag status indicator, pinned top-right */}
      <div className="pointer-events-none absolute right-3 top-3 z-10">
        <div
          className={cn(
            'relative flex h-8 items-center pr-3.5 pl-6 text-[10px] font-bold tracking-widest uppercase text-white',
            inUse ? 'bg-red-500' : 'bg-emerald-500',
          )}
          style={{ clipPath: 'polygon(0 50%, 22% 0, 100% 0, 100% 100%, 22% 100%)' }}
        >
          <span className="absolute top-1/2 left-2.5 size-1.5 -translate-y-1/2 rounded-full bg-white/85 ring-1 ring-black/15" />
          {inUse ? 'In use' : 'Idle'}
        </div>
      </div>
      <CardHeader className="px-5 pt-5 pr-24">
        <div className="flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {profile.initials}
          </span>
          <div className="flex min-w-0 flex-1 flex-col">
            <CardTitle className="truncate text-base font-bold">{profile.name}</CardTitle>
            <p className="truncate text-xs text-muted-foreground">{profile.title}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4 px-5 pt-4">
        <div className="grid gap-2 rounded-xl border border-border bg-muted/30 p-3 text-xs">
          <div className="flex items-center gap-2 truncate">
            <Mail className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
            <span className="truncate">{profile.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
            <span>{profile.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
            <span>{profile.address}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <p className="flex items-center gap-1.5 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
            <Briefcase className="size-3" aria-hidden="true" />
            Experience
          </p>
          {profile.experience.map((item) => (
            <div key={item.company} className="flex items-baseline justify-between gap-3 text-sm">
              <span className="truncate font-medium">{item.company}</span>
              <span className="shrink-0 text-xs text-muted-foreground">{item.period}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-1.5">
          <p className="flex items-center gap-1.5 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
            <GraduationCap className="size-3" aria-hidden="true" />
            Education
          </p>
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <span className="truncate">
              <span className="font-medium">{profile.education.school}</span>
              <span className="text-muted-foreground"> · {profile.education.degree}</span>
            </span>
            <span className="shrink-0 text-xs text-muted-foreground">
              {profile.education.period}
            </span>
          </div>
        </div>

        <div className="mt-auto rounded-xl border border-border bg-muted/40 p-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
              Last 7 days
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-primary">{total} applied</span>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      aria-label={showTable ? `Show ${profile.name} activity graph` : `Show ${profile.name} activity table`}
                      aria-pressed={showTable}
                      onClick={() => setShowTable((value) => !value)}
                    >
                      {showTable ? <ChartColumn /> : <TableIcon />}
                    </Button>
                  }
                />
                <TooltipContent>{showTable ? 'Graph view' : 'Table view'}</TooltipContent>
              </Tooltip>
            </div>
          </div>
          {showTable ? (
            <div className="mt-2">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="h-7 px-0 text-[10px] tracking-wider text-muted-foreground uppercase">Day</TableHead>
                    <TableHead className="h-7 px-0 text-right text-[10px] tracking-wider text-muted-foreground uppercase">Applied</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {profile.daily.map((value, index) => (
                    <TableRow key={index} className="hover:bg-transparent">
                      <TableCell className="px-0 py-1.5 text-xs">{WEEK_DAYS_LONG[index]}</TableCell>
                      <TableCell className="px-0 py-1.5 text-right font-mono text-xs font-semibold">{value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="mt-2 flex flex-col gap-1.5">
              <WeekBarChart data={profile.daily} />
              <WeekAxis />
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="mt-auto flex-col gap-3 bg-card px-5 py-4">
        <div className="flex w-full items-center gap-2">
          <Button
            variant={inUse ? 'default' : 'outline'}
            className="flex-1 rounded-full"
            aria-pressed={inUse}
            data-state={inUse ? 'using' : 'available'}
            title={inUse ? 'This profile is currently active' : 'Use this profile'}
            onClick={() => setInUse((value) => !value)}
          >
            <BadgeCheck data-icon="inline-start" />
            <span>{inUse ? 'Using profile' : 'Use profile'}</span>
          </Button>
          <Button variant="outline" size="icon" aria-label={`Edit ${profile.name}`}>
            <Pencil />
          </Button>
          <Button variant="outline" size="icon" aria-label={`Delete ${profile.name}`}>
            <Trash2 />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
