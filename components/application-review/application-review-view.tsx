'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Archive, BriefcaseBusiness, Building2, CalendarDays, Check, ChevronLeft, ChevronRight,
  Clock3, CircleUserRound, FileText, Filter, Globe2, Link2,
  MoreHorizontal, Paperclip, PenLine, Search, UserRound,
  X, CheckCircle2, CircleAlert,
} from 'lucide-react'
import {
  applications,
  getApplicationDate,
  REFERENCE_DATE,
  reviewProfiles as profiles,
  reviewTabs as tabs,
} from '@/lib/application-review-data'
import { DetailContent } from '@/components/application-review/detail-tabs'

const weekFilters: Record<string, (date: Date) => boolean> = {
  'This week': (date) => (REFERENCE_DATE.getTime() - date.getTime()) / (24 * 60 * 60 * 1000) <= 7,
  'Last week': (date) => { const diff = (REFERENCE_DATE.getTime() - date.getTime()) / (24 * 60 * 60 * 1000); return diff > 7 && diff <= 14 },
  'This month': (date) => date.getMonth() === REFERENCE_DATE.getMonth() && date.getFullYear() === REFERENCE_DATE.getFullYear(),
  'All time': () => true,
}

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

const APPLICATIONS_PER_PAGE = 10

const DEFAULT_RANGE_END = toIsoDate(REFERENCE_DATE)
const DEFAULT_RANGE_START = toIsoDate(new Date(REFERENCE_DATE.getTime() - 6 * 24 * 60 * 60 * 1000))

// Tailwind's JIT scanner only picks up complete class names that appear literally
// in source, so profile accent colors are mapped here (not built at runtime via
// string concatenation) to guarantee the utility classes are generated. Kept in
// sync with the bg-* accents assigned per profile in lib/application-review-data.ts.
const profileTextColor: Record<string, string> = {
  'senior-react-dev': 'text-violet-600',
  'ui-ux-specialist': 'text-blue-600',
  'budget-copywriter': 'text-amber-600',
  'backend-engineer': 'text-emerald-600',
  'growth-marketer': 'text-rose-600',
  'mobile-developer': 'text-cyan-600',
  'brand-strategist': 'text-orange-600',
  'data-analyst': 'text-fuchsia-600',
  'technical-writer': 'text-teal-600',
  'fullstack-builder': 'text-indigo-600',
}

export function ApplicationReviewView() {
  const [selected, setSelected] = useState(1)
  const [checked, setChecked] = useState<number[]>([1])
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>(['senior-react-dev'])
  const [query, setQuery] = useState('')
  const [tab, setTab] = useState('jd')
  const [dateOpen, setDateOpen] = useState(false)
  const [weekOpen, setWeekOpen] = useState(false)
  const [bidderOpen, setBidderOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [startDate, setStartDate] = useState(DEFAULT_RANGE_START)
  const [endDate, setEndDate] = useState(DEFAULT_RANGE_END)
  const [dateRangeActive, setDateRangeActive] = useState(false)
  const [selectedBidder, setSelectedBidder] = useState('All bidders')
  const [selectedWeek, setSelectedWeek] = useState('This week')
  const [sortOpen, setSortOpen] = useState(false)
  const [sortBy, setSortBy] = useState<'applied' | 'bidder' | 'az' | 'company'>('applied')
  const [page, setPage] = useState(1)
  const current = applications.find((item) => item.id === selected) ?? applications[0]
  const filtered = useMemo(() => applications.filter((item) => {
    const itemDate = getApplicationDate(item.date, item.appliedHoursAgo)
    const inRange = dateRangeActive && startDate && endDate
      ? itemDate >= new Date(startDate) && itemDate <= new Date(endDate)
      : weekFilters[selectedWeek](itemDate)
    return selectedProfiles.includes(item.profileId) && inRange && `${item.title} ${item.company} ${item.bidderName}`.toLowerCase().includes(query.toLowerCase())
  }), [query, selectedProfiles, selectedWeek, startDate, endDate, dateRangeActive])
  const sorted = useMemo(() => [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'bidder':
        return a.bidderName.localeCompare(b.bidderName)
      case 'az':
        return a.title.localeCompare(b.title)
      case 'company':
        return a.company.localeCompare(b.company)
      case 'applied':
      default:
        return getApplicationDate(b.date, b.appliedHoursAgo).getTime() - getApplicationDate(a.date, a.appliedHoursAgo).getTime()
    }
  }), [filtered, sortBy])
  const totalPages = Math.max(1, Math.ceil(sorted.length / APPLICATIONS_PER_PAGE))
  useEffect(() => setPage(1), [query, selectedProfiles, selectedWeek, startDate, endDate, dateRangeActive, sortBy])
  useEffect(() => { if (page > totalPages) setPage(totalPages) }, [page, totalPages])
  const paged = useMemo(
    () => sorted.slice((page - 1) * APPLICATIONS_PER_PAGE, page * APPLICATIONS_PER_PAGE),
    [sorted, page],
  )
  const toggle = (id: number) => setChecked((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id])
  const toggleProfile = (id: string) => setSelectedProfiles((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id])
  const getProfile = (id: string) => profiles.find((profile) => profile.id === id)
  const profileNameClasses = (id: string) => profileTextColor[id] ?? 'text-foreground'

  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <header className="sticky top-0 z-30 flex flex-col gap-4 border-b border-border bg-background px-6 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div><p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">Workspace</p><h1 className="text-2xl font-extrabold tracking-tight">Application review</h1><p className="mt-1 text-sm text-muted-foreground">Review, compare, and organize your submitted applications.</p></div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative"><Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search applications..." className="h-10 w-56 rounded-lg border border-input bg-card pl-9 pr-3 text-sm outline-none ring-primary/20 placeholder:text-muted-foreground focus:ring-4" /></div>
          <button type="button" aria-label="More options" className="grid size-10 place-items-center rounded-lg border border-input bg-card"><MoreHorizontal className="size-4" /></button>
        </div>
      </header>
      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-muted/30 px-6 py-3 text-sm lg:px-8"><span className="font-semibold">Filter by:</span><div className="relative"><button type="button" onClick={() => { setDateOpen(!dateOpen); setWeekOpen(false); setBidderOpen(false) }} className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2">{dateRangeActive ? `${startDate} – ${endDate}` : 'Last 7 days'} <CalendarDays className="size-3.5 text-muted-foreground" /></button>{dateOpen && <div onMouseLeave={() => setDateOpen(false)} className="motion-slide-down absolute top-full left-0 z-20 mt-2 flex gap-2 rounded-xl border border-border bg-card p-3 shadow-lg"><label className="text-xs font-semibold text-muted-foreground">Start<input type="date" value={startDate} onChange={(e) => { setStartDate(e.target.value); setDateRangeActive(true) }} className="mt-1 block rounded-md border px-2 py-1.5 text-sm font-normal" /></label><label className="text-xs font-semibold text-muted-foreground">End<input type="date" value={endDate} onChange={(e) => { setEndDate(e.target.value); setDateRangeActive(true) }} className="mt-1 block rounded-md border px-2 py-1.5 text-sm font-normal" /></label></div>}</div><div className="relative"><button type="button" onClick={() => { setWeekOpen(!weekOpen); setDateOpen(false); setBidderOpen(false) }} className="rounded-lg border bg-card px-3 py-2">{selectedWeek}</button>{weekOpen && <div onMouseLeave={() => setWeekOpen(false)} className="motion-slide-down absolute top-full left-0 z-20 mt-2 w-40 rounded-xl border border-border bg-card p-1.5 shadow-lg">{['This week', 'Last week', 'This month', 'All time'].map((week) => <button key={week} type="button" onClick={() => { setSelectedWeek(week); setWeekOpen(false); setDateRangeActive(false); setStartDate(DEFAULT_RANGE_START); setEndDate(DEFAULT_RANGE_END) }} aria-pressed={selectedWeek === week} className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-accent ${selectedWeek === week ? 'font-semibold text-primary' : ''}`}>{week}{selectedWeek === week && <Check className="size-3.5" />}</button>)}</div>}</div><div className="relative"><button type="button" onClick={() => { setBidderOpen(!bidderOpen); setDateOpen(false); setWeekOpen(false) }} className="hidden items-center gap-2 rounded-lg border bg-card px-3 py-2">{selectedBidder} <UserRound className="size-3.5 text-muted-foreground" /></button>{bidderOpen && <div className="absolute top-full left-0 z-20 mt-2 w-48 rounded-xl border border-border bg-card p-1.5 shadow-lg">{['All bidders', ...profiles.map((profile) => profile.name)].map((bidder) => <button key={bidder} type="button" onClick={() => { setSelectedBidder(bidder); setBidderOpen(false) }} className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-accent">{bidder}</button>)}</div>}</div><button type="button" onClick={() => { setStartDate(DEFAULT_RANGE_START); setEndDate(DEFAULT_RANGE_END); setDateRangeActive(false); setSelectedWeek('This week'); setSelectedBidder('All bidders') }} className="ml-auto text-xs font-semibold text-primary">Clear all</button></div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden xl:flex-row">
        <aside className="flex w-full shrink-0 flex-col overflow-y-auto border-b border-border bg-card/50 xl:w-[390px] xl:border-r xl:border-b-0">
          <div className="relative flex flex-col border-b border-border px-5 py-4">
            <div className="flex items-center justify-between"><div><p className="text-[11px] font-semibold uppercase tracking-wider text-primary">Review profiles</p><h2 className="mt-1 font-bold">Select profiles</h2></div><span className="rounded-full bg-accent px-2 py-1 text-[11px] font-semibold text-primary">{selectedProfiles.length} selected</span></div>
            <div className="relative order-2 mt-3"><button type="button" onClick={() => setProfileOpen(!profileOpen)} aria-expanded={profileOpen} className="flex w-full items-center justify-between rounded-lg border border-input bg-card px-3 py-2.5 text-left text-sm hover:border-primary/50"><span className="text-muted-foreground">Select profiles</span><span className="flex items-center gap-2"><span className="text-xs font-semibold text-primary">{selectedProfiles.length} selected</span><ChevronRight className="size-4 rotate-90 text-muted-foreground" /></span></button><div className="mt-2 flex items-center gap-3 px-1"><button type="button" onClick={() => setSelectedProfiles(profiles.map((profile) => profile.id))} className="text-xs font-semibold text-primary hover:underline">Select all</button><button type="button" onClick={() => setSelectedProfiles([])} className="text-xs font-semibold text-muted-foreground hover:text-foreground hover:underline">Unselect all</button></div>{profileOpen && <div onMouseLeave={() => setProfileOpen(false)} className="motion-pop-in absolute top-full left-0 right-0 z-10 mt-12 rounded-xl border border-border bg-card p-2 shadow-lg">{profiles.map((profile) => <button key={profile.id} type="button" onClick={() => toggleProfile(profile.id)} aria-pressed={selectedProfiles.includes(profile.id)} className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left hover:bg-accent"><span className={`grid size-7 place-items-center rounded-md ${profile.color} text-[9px] font-bold text-white`}>{profile.initials}</span><span className="min-w-0 flex-1"><span className="block truncate text-xs font-semibold">{profile.name}</span><span className="block truncate text-[10px] text-muted-foreground">{profile.role}</span></span>{selectedProfiles.includes(profile.id) && <Check className="size-4 text-primary" />}</button>)}</div>}</div><div className="order-1 mt-2 flex gap-1.5 overflow-x-auto pb-1">{profiles.filter((profile) => selectedProfiles.includes(profile.id)).map((profile) => <div key={profile.id} className="flex shrink-0 items-center gap-1.5 rounded-lg border border-primary/25 bg-accent/50 px-2 py-1.5"><span className={`grid size-5 place-items-center rounded-md ${profile.color} text-[8px] font-bold text-white`}>{profile.initials}</span><span className="text-[11px] font-semibold">{profile.name}</span><button type="button" onClick={() => toggleProfile(profile.id)} aria-label={`Remove ${profile.name}`} className="text-primary"><X className="size-3" /></button></div>)}</div>
          </div>
          <div className="flex items-center justify-between border-b border-border px-5 py-4"><div><h2 className="font-bold">Applications</h2><p className="mt-0.5 text-xs text-muted-foreground">{filtered.length} applications found</p></div><div className="relative"><button type="button" onClick={() => setSortOpen(!sortOpen)} aria-expanded={sortOpen} aria-label="Sort applications" className={`rounded-md p-2 text-muted-foreground hover:bg-muted ${sortOpen ? 'bg-muted text-foreground' : ''}`}><Filter className="size-4" /></button>{sortOpen && <div onMouseLeave={() => setSortOpen(false)} className="motion-slide-down absolute top-full right-0 z-20 mt-2 w-44 rounded-xl border border-border bg-card p-1.5 shadow-lg"><p className="px-3 py-1.5 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">Sort by</p>{([{ value: 'applied', label: 'Applied time' }, { value: 'bidder', label: 'Bidder' }, { value: 'az', label: 'A-Z' }, { value: 'company', label: 'Company' }] as const).map((option) => <button key={option.value} type="button" onClick={() => { setSortBy(option.value); setSortOpen(false) }} aria-pressed={sortBy === option.value} className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm ${sortBy === option.value ? 'bg-accent font-semibold text-primary' : 'hover:bg-muted'}`}>{option.label}{sortBy === option.value && <Check className="size-3.5" />}</button>)}</div>}</div></div>
          <div className="flex flex-col gap-2 p-4">{paged.map((item, index) => <article key={item.id} onClick={() => setSelected(item.id)} style={{ animationDelay: `${index * 45}ms` }} className={`interactive-surface relative animate-fade-up cursor-pointer overflow-hidden rounded-xl border p-3.5 transition-all ${selected === item.id ? 'border-primary bg-accent/35 shadow-sm' : 'border-border bg-card hover:border-primary/40'}`}><span aria-hidden="true" className={`pointer-events-none absolute inset-y-0 left-0 w-1 origin-top bg-primary transition-transform duration-300 ${selected === item.id ? 'scale-y-100' : 'scale-y-0'}`} /><div className="flex gap-3"><div className={`-ml-1 grid size-9 shrink-0 place-items-center rounded-lg ${profiles.find((profile) => profile.id === item.profileId)?.color ?? 'bg-muted'} text-[10px] font-bold text-white`}>{profiles.find((profile) => profile.id === item.profileId)?.initials}</div><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><h3 className="truncate text-sm font-bold">{item.title}</h3></div><p className={`mt-1.5 flex items-center gap-1.5 truncate text-sm font-bold ${profileNameClasses(item.profileId)}`}><CircleUserRound className="size-3.5 shrink-0" />{getProfile(item.profileId)?.name}</p><p className="mt-1 flex items-center gap-1.5 truncate text-xs text-muted-foreground"><Building2 className="size-3.5 shrink-0" />{item.company}</p></div></div><div className="mt-4 flex items-center justify-between text-xs text-muted-foreground"><span className="flex items-center gap-1.5"><PenLine className="size-3.5" />Applied by <strong className="font-bold text-primary">{item.bidderName}</strong></span></div><div className="mt-3 flex items-center justify-between text-xs text-muted-foreground"><span className="flex items-center gap-1.5"><Clock3 className="size-3.5" />Applied {item.applied}</span></div></article>)}{sorted.length === 0 && <p className="p-4 text-sm text-muted-foreground">No applications match the current filters.</p>}</div>
          {sorted.length > 0 && (
            <div className="flex items-center justify-between gap-2 border-t border-border px-4 py-3">
              <button
                type="button"
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={page === 1}
                className="flex items-center gap-1 rounded-lg border border-input bg-card px-2.5 py-1.5 text-xs font-semibold text-foreground disabled:pointer-events-none disabled:opacity-40"
              >
                <ChevronLeft className="size-3.5" />
                Prev
              </button>
              <p className="text-xs text-muted-foreground">
                Page <span className="font-semibold text-foreground">{page}</span> of {totalPages}
              </p>
              <button
                type="button"
                onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-1 rounded-lg border border-input bg-card px-2.5 py-1.5 text-xs font-semibold text-foreground disabled:pointer-events-none disabled:opacity-40"
              >
                Next
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          )}
        </aside>

        <section className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-background"><div className="border-b border-border bg-card px-6 py-5 lg:px-8"><div key={current.id} className="flex animate-fade-up flex-wrap items-start justify-between gap-4"><div className="flex gap-3"><div className={`relative grid size-11 place-items-center overflow-hidden rounded-xl ${profiles.find((profile) => profile.id === current.profileId)?.color ?? 'bg-slate-900'} text-xs font-bold text-white`}>{profiles.find((profile) => profile.id === current.profileId)?.initials ?? 'GG'}<span aria-hidden="true" className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-sheen" /></div><div><h2 className="text-lg font-extrabold">{current.title}</h2><p className={`mt-1.5 flex items-center gap-1.5 text-sm font-bold ${profileNameClasses(current.profileId)}`}><CircleUserRound className="size-3.5" />{getProfile(current.profileId)?.name}</p><p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground"><Building2 className="size-3.5" />{current.company}</p><div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground"><span className="flex items-center gap-1.5"><Globe2 className="size-3.5" />{current.location}</span><span className="flex items-center gap-1.5"><BriefcaseBusiness className="size-3.5" />{current.jd.employmentType}</span><span className="flex items-center gap-1.5"><PenLine className="size-3.5" />Applied by <strong className="font-bold text-primary">{current.bidderName}</strong></span><span className="ml-auto flex items-center gap-1.5"><Clock3 className="size-3.5" />Applied {current.applied}</span></div></div></div></div><nav className="mt-5 flex gap-1 overflow-x-auto" aria-label="Application details tabs">{tabs.map((item) => <button key={item.value} type="button" onClick={() => setTab(item.value)} className={`flex shrink-0 items-center gap-2 border-b-2 px-3 py-2 text-sm font-medium transition-colors ${tab === item.value ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}><FileText className="size-4" />{item.label}{'badge' in item && item.badge && <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-primary">{item.badge}</span>}</button>)}</nav></div><div key={`${current.id}-${tab}`} className="flex min-h-0 flex-1 animate-fade-up flex-col overflow-hidden"><DetailContent tab={tab} current={current} /></div></section>
      </div>
    </main>
  )
}
