'use client'

import {
  BriefcaseBusiness, Building2, CalendarClock, CheckCircle2, ClipboardList, Download, FileText,
  Globe2, GraduationCap, Link2, ListChecks, Mail, MapPin, Phone, Share2, ShieldCheck,
  Sparkles, Star, Zap,
} from 'lucide-react'
import type { Application } from '@/lib/application-review-data'

/* ------------------------------------------------------------------ */
/* Shared primitives                                                   */
/* ------------------------------------------------------------------ */

function SectionHeading({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <h3 className="flex items-center gap-2 text-sm font-bold">
      <Icon className="size-4 text-primary" aria-hidden="true" />
      {children}
    </h3>
  )
}

function SkillChips({ items, tone = 'muted' }: { items: string[]; tone?: 'primary' | 'muted' }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className={`rounded-full border px-3 py-1 text-xs font-medium ${
            tone === 'primary'
              ? 'border-primary/20 bg-accent text-accent-foreground'
              : 'border-border bg-muted text-muted-foreground'
          }`}
        >
          {item}
        </span>
      ))}
    </div>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-sm leading-6 text-muted-foreground">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/60" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/* ------------------------------------------------------------------ */
/* JD tab                                                              */
/* ------------------------------------------------------------------ */

export function JobDescriptionTab({ current }: { current: Application }) {
  const { jd } = current
  return (
    <article className="min-h-0 flex-1 overflow-y-auto mx-auto w-full max-w-3xl space-y-8 p-6 lg:p-8 xl:max-h-[calc(100svh-21rem)]">
      <div className="grid grid-cols-1 gap-4 rounded-xl border border-border bg-card p-5 sm:grid-cols-3">
        {[
          { icon: MapPin, label: 'Location', value: jd.location },
          { icon: BriefcaseBusiness, label: 'Employment Type', value: jd.employmentType },
          { icon: ShieldCheck, label: 'Visa Sponsorship', value: jd.visaSponsorship },
          { icon: CalendarClock, label: 'Job Expiration', value: jd.expirationDate },
          { icon: Link2, label: 'Job Link', value: jd.jobLink, href: jd.jobLink },
        ].map((meta) => (
          <div key={meta.label}>
            <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <meta.icon className="size-3.5" aria-hidden="true" />
              {meta.label}
            </p>
            {meta.href ? (
              <a href={meta.href} target="_blank" rel="noopener noreferrer" className="mt-1 block truncate text-sm font-semibold text-primary underline-offset-2 hover:underline">
                {meta.value}
              </a>
            ) : (
              <p className="mt-1 text-sm font-semibold">{meta.value}</p>
            )}
          </div>
        ))}
      </div>

      <section className="space-y-3">
        <SectionHeading icon={Zap}>Required Skills</SectionHeading>
        <SkillChips items={jd.requiredSkills} tone="primary" />
      </section>

      <section className="space-y-3">
        <SectionHeading icon={Star}>Bonus Skills</SectionHeading>
        <SkillChips items={jd.bonusSkills} />
      </section>

      <section className="space-y-2">
        <SectionHeading icon={Building2}>About Company</SectionHeading>
        <p className="text-sm leading-7 text-muted-foreground">{jd.aboutCompany}</p>
      </section>

      <section className="space-y-2">
        <SectionHeading icon={FileText}>About Role</SectionHeading>
        <p className="text-sm leading-7 text-muted-foreground">{jd.aboutRole}</p>
      </section>

      <section className="space-y-3">
        <SectionHeading icon={ListChecks}>Responsibilities</SectionHeading>
        <BulletList items={jd.responsibilities} />
      </section>

      <section className="space-y-3">
        <SectionHeading icon={CheckCircle2}>Requirements</SectionHeading>
        <BulletList items={jd.requirements} />
      </section>

      <section className="space-y-3">
        <SectionHeading icon={Sparkles}>Nice to have</SectionHeading>
        <BulletList items={jd.niceToHave} />
      </section>

      <section className="space-y-3">
        <SectionHeading icon={Star}>We offer / Benefits</SectionHeading>
        <BulletList items={jd.benefits} />
      </section>
    </article>
  )
}

/* ------------------------------------------------------------------ */
/* Resume tab — rendered as the applied resume template                */
/* ------------------------------------------------------------------ */

export function ResumeTab({ current }: { current: Application }) {
  const { resume } = current
  return (
    <div className="min-h-0 flex-1 overflow-y-auto mx-auto w-full max-w-3xl p-6 lg:p-8 xl:max-h-[calc(100svh-21rem)]">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <FileText className="size-4 text-primary" aria-hidden="true" />
          Applied with the <span className="font-semibold text-foreground">{resume.template}</span> template
        </p>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 rounded-lg border border-input bg-card px-3 py-1.5 text-xs font-semibold hover:bg-muted">
            <Download className="size-3.5" /> Download PDF
          </button>
        </div>
      </div>

      {/* Resume "page" mimicking the Corporate template */}
      <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
        <div className="border-b-2 border-[#003366] px-8 pt-8 pb-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-[#003366]">{resume.fullName}</h2>
              <p className="mt-0.5 text-sm font-semibold text-slate-600">{resume.title}</p>
            </div>
            <div className="text-right text-[11px] leading-5 text-slate-500">
              <p className="flex items-center justify-end gap-1.5"><Mail className="size-3" /> {resume.email}</p>
              <p className="flex items-center justify-end gap-1.5"><Phone className="size-3" /> {resume.phone}</p>
              <p className="flex items-center justify-end gap-1.5"><MapPin className="size-3" /> {resume.location}</p>
              {resume.linkedin ? (
                <p className="flex items-center justify-end gap-1.5"><Globe2 className="size-3" /> {resume.linkedin}</p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="space-y-6 px-8 py-6 text-slate-700">
          <ResumeSection title="Summary">
            <p className="text-[13px] leading-6 text-slate-600">{resume.summary}</p>
          </ResumeSection>

          <ResumeSection title="Technical Skills">
            <div className="flex flex-wrap gap-1.5">
              {resume.skills.map((skill) => (
                <span key={skill} className="rounded bg-[#E8EEF4] px-2 py-1 text-[11px] font-medium text-[#003366]">
                  {skill}
                </span>
              ))}
            </div>
          </ResumeSection>

          <ResumeSection title="Professional Experience">
            <div className="space-y-5">
              {resume.experience.map((exp) => (
                <div key={`${exp.company}-${exp.role}`}>
                  <div className="flex items-baseline justify-between gap-3">
                    <h4 className="text-sm font-bold text-slate-900">{exp.role}</h4>
                    <span className="text-[11px] font-bold text-[#003366]">{exp.duration}</span>
                  </div>
                  <p className="text-xs text-slate-500">{exp.company}</p>
                  <ul className="mt-2 space-y-1.5">
                    {exp.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2 text-[12px] leading-5 text-slate-600">
                        <span className="text-[#003366]">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ResumeSection>

          <ResumeSection title="Education">
            <div className="space-y-2">
              {resume.education.map((edu) => (
                <div key={edu.school} className="flex items-baseline justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{edu.degree}</p>
                    <p className="text-xs text-slate-500">{edu.school}</p>
                  </div>
                  <span className="text-[11px] font-bold text-[#003366]">{edu.year}</span>
                </div>
              ))}
            </div>
          </ResumeSection>
        </div>
      </div>
    </div>
  )
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <span className="size-4 rounded-sm bg-[#003366]" aria-hidden="true" />
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#003366]">{title}</h3>
      </div>
      <div className="pl-6">{children}</div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Cover letter tab                                                    */
/* ------------------------------------------------------------------ */

export function CoverLetterTab({ current }: { current: Application }) {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto mx-auto w-full max-w-3xl p-6 lg:p-8 xl:max-h-[calc(100svh-21rem)]">
      <div className="rounded-xl border border-border bg-card p-6 lg:p-8">
        <div className="mb-6 flex items-center gap-3 border-b border-border pb-5">
          <div className="grid size-10 place-items-center rounded-lg bg-accent text-primary">
            <Mail className="size-4" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Cover letter</p>
            <h3 className="text-base font-bold">{current.company} — {current.title}</h3>
          </div>
        </div>
        <div className="space-y-4">
          {current.coverLetter.map((paragraph, index) => (
            <p key={index} className="whitespace-pre-line text-sm leading-7 text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* QA tab — answered application form                                  */
/* ------------------------------------------------------------------ */

export function QATab({ current }: { current: Application }) {
  const { qa } = current
  return (
    <div className="min-h-0 flex-1 overflow-y-auto mx-auto w-full max-w-3xl space-y-4 p-6 lg:p-8 xl:max-h-[calc(100svh-21rem)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ClipboardList className="size-4 text-primary" aria-hidden="true" />
          <div>
            <p className="text-xs font-medium text-muted-foreground">Application form</p>
            <h3 className="text-base font-bold">{qa.length} questions answered</h3>
          </div>
        </div>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-green-600">
          <CheckCircle2 className="size-4" /> Complete
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {qa.map((item) => (
          <div
            key={item.question}
            className={`rounded-xl border border-border bg-card p-4 ${item.type === 'long' ? 'sm:col-span-2' : ''}`}
          >
            <p className="mb-2 text-xs font-semibold text-foreground">{item.question}</p>
            <div
              className={`rounded-lg border border-border bg-muted/50 px-3.5 py-2.5 text-sm text-muted-foreground ${
                item.type === 'long' ? 'leading-6' : ''
              }`}
            >
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Screenshots tab                                                     */
/* ------------------------------------------------------------------ */

export function ScreenshotsTab({ current }: { current: Application }) {
  return (
    <div className="mx-auto max-w-4xl space-y-4 p-6 lg:p-8">
      <div className="flex items-center gap-2">
        <Share2 className="size-4 text-primary" aria-hidden="true" />
        <div>
          <p className="text-xs font-medium text-muted-foreground">Application screenshots</p>
          <h3 className="text-base font-bold">{current.screenshots.length} captures</h3>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {current.screenshots.map((shot) => (
          <figure key={shot.title} className="interactive-surface overflow-hidden rounded-xl border border-border bg-card">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-3 py-2">
              <span className="flex gap-1" aria-hidden="true">
                <span className="size-2 rounded-full bg-red-400" />
                <span className="size-2 rounded-full bg-amber-400" />
                <span className="size-2 rounded-full bg-green-400" />
              </span>
              <span className="ml-1 flex-1 truncate rounded bg-card px-2 py-1 text-[10px] text-muted-foreground">
                {shot.url}
              </span>
            </div>
            {/* Faux captured page */}
            <div className="relative aspect-video bg-gradient-to-br from-muted to-accent/40 p-4">
              <div className="space-y-2">
                <div className="h-3 w-1/2 rounded bg-foreground/15" />
                <div className="h-2 w-3/4 rounded bg-foreground/10" />
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="h-6 rounded bg-card/80" />
                  <div className="h-6 rounded bg-card/80" />
                </div>
                <div className="h-6 w-full rounded bg-card/80" />
                <div className="h-6 w-full rounded bg-card/80" />
              </div>
              <span className="absolute right-3 bottom-3 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                Captured
              </span>
            </div>
            <figcaption className="border-t border-border px-4 py-3">
              <p className="text-sm font-semibold">{shot.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{shot.caption}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">{shot.capturedAt}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Router                                                              */
/* ------------------------------------------------------------------ */

export function DetailContent({ tab, current }: { tab: string; current: Application }) {
  switch (tab) {
    case 'resume':
      return <ResumeTab current={current} />
    case 'cover':
      return <CoverLetterTab current={current} />
    case 'qa':
      return <QATab current={current} />
    case 'screens':
      return <ScreenshotsTab current={current} />
    case 'jd':
    default:
      return <JobDescriptionTab current={current} />
  }
}
