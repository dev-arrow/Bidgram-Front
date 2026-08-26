'use client'

import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import type { Template } from '@/lib/templates'

/**
 * Faithful, fully-populated preview of a résumé / cover-letter template.
 *
 * The document is rendered once at a fixed A4 pixel size (794 × 1123) with real
 * sample copy and real font sizes, then uniformly scaled to whatever container
 * it sits in. This keeps the same crisp, content-rich artwork whether it is a
 * small card thumbnail (which crops to the top) or the large preview overlay
 * (which shows the whole page). Colours mirror the @react-pdf template styles,
 * so inline styles are used deliberately instead of theme tokens.
 */
const PAGE_W = 794
const PAGE_H = 1123

export function TemplateThumbnail({ template }: { template: Template }) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => setScale(el.clientWidth / PAGE_W)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden bg-white" aria-hidden="true">
      <div
        style={{
          width: PAGE_W,
          height: PAGE_H,
          transformOrigin: 'top left',
          transform: `scale(${scale})`,
          opacity: scale ? 1 : 0,
        }}
      >
        <TemplateDocument template={template} />
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Sample content                                                            */
/* -------------------------------------------------------------------------- */

const SUMMARY =
  'Senior product designer with 8+ years crafting intuitive, accessible digital products across fintech and SaaS. I lead cross-functional teams from discovery research through launch, translating ambiguous problems into clean, measurable experiences that move revenue and retention.'

const SKILLS = [
  'Product Strategy',
  'UX Research',
  'Design Systems',
  'Figma',
  'Prototyping',
  'Usability Testing',
  'Accessibility (WCAG 2.2)',
  'Design Ops',
  'Data Visualisation',
  'Service Blueprints',
  'A/B Experimentation',
  'Workshop Facilitation',
]

const EXPERIENCE = [
  {
    role: 'Lead Product Designer',
    org: 'Northwind Labs',
    location: 'New York, NY',
    period: '2021 — Present',
    bullets: [
      'Own end-to-end design for an analytics platform serving 2M+ monthly active users across 38 markets.',
      'Built and governed a 240-component design system that cut design-to-dev handoff time by 40%.',
      'Introduced a quarterly research cadence — 60+ interviews a year now feed the product roadmap directly.',
      'Mentor four designers and run the weekly critique that raised design QA pass rates to 96%.',
    ],
  },
  {
    role: 'Senior UX Designer',
    org: 'Brightwave',
    location: 'Brooklyn, NY',
    period: '2018 — 2021',
    bullets: [
      'Redesigned onboarding end-to-end and lifted activation by 27% within two quarters.',
      'Ran 40+ moderated usability sessions and turned findings into a prioritised backlog with PM and engineering.',
      'Shipped a WCAG 2.1 AA accessibility overhaul across 60 screens, removing 300+ audit violations.',
    ],
  },
  {
    role: 'Product Designer',
    org: 'Coastline Studio',
    location: 'Remote',
    period: '2015 — 2018',
    bullets: [
      'Delivered 20+ client engagements spanning fintech dashboards, marketplaces and mobile banking.',
      'Standardised the studio design workflow, reducing average project ramp-up from three weeks to five days.',
    ],
  },
]

const EDUCATION = [
  { degree: 'M.A. Interaction Design', org: 'Parsons School of Design', period: '2016' },
  { degree: 'B.A. Visual Communication', org: 'New York University', period: '2014' },
]

const CERTIFICATIONS = [
  'Nielsen Norman Group — UX Certification',
  'IDEO U — Designing for Impact',
  'Google — Advanced Data Analytics',
]

const PROJECTS = [
  {
    name: 'Atlas Design System',
    detail: 'Open-source token pipeline adopted by 12 internal teams and 4 partner products.',
  },
  {
    name: 'Pulse Reporting Suite',
    detail: 'Self-serve dashboard builder that reduced ad-hoc report requests by 62%.',
  },
]

const AWARDS = [
  'Webby Award — Best Financial Services UX, 2023',
  'Fast Company Innovation by Design, finalist 2022',
]

const LANGUAGES = ['English — Native', 'Spanish — Professional', 'German — Conversational']

const LETTER_BODY = [
  "I'm writing to express my strong interest in the Senior Product Designer role at Northwind Labs. With over eight years designing user-centered products for fintech and SaaS companies, I'm confident I can help your team ship experiences customers genuinely love — and measure the difference afterwards.",
  'In my current role I lead design for a platform used by more than two million people each month. I introduced a scalable design system that reduced engineering handoff time by 40%, partnered with research to build a continuous interview cadence, and kept quality high while the team doubled in size.',
]

const LETTER_BULLETS = [
  'Lifted onboarding activation by 27% in two quarters through a research-led redesign.',
  'Built and governed a 240-component design system now used by 12 internal teams.',
  'Led a WCAG 2.1 AA accessibility overhaul across 60 screens ahead of an enterprise launch.',
  'Mentored four designers and established the critique ritual the team still runs weekly.',
]

const LETTER_CLOSING =
  "What draws me to Northwind specifically is your commitment to shipping small, learning fast and letting evidence settle debates — the way I already prefer to work. I'd welcome the chance to bring the same rigor and craft to your team, and I've attached a portfolio of case studies covering the work above. Thank you for your time and consideration."

/* -------------------------------------------------------------------------- */
/*  Document                                                                  */
/* -------------------------------------------------------------------------- */

function TemplateDocument({ template }: { template: Template }) {
  const { style, font } = template
  const fontFamily =
    font === 'serif' ? 'Georgia, "Times New Roman", serif' : 'Helvetica, Arial, sans-serif'

  return (
    <div
      style={{
        width: PAGE_W,
        height: PAGE_H,
        backgroundColor: style.bg,
        color: style.body,
        fontFamily,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <DocHeader template={template} />
      {template.category === 'resume' ? (
        <ResumeBody template={template} />
      ) : (
        <LetterBody template={template} />
      )}
    </div>
  )
}

function DocHeader({ template }: { template: Template }) {
  const { style, header } = template
  const nameStyle: CSSProperties = {
    fontSize: 32,
    fontWeight: 700,
    lineHeight: 1.05,
    letterSpacing: template.letterspacedName ? '0.14em' : '-0.01em',
    textTransform: template.uppercaseName ? 'uppercase' : 'none',
  }
  const contacts = [
    'jane.doe@email.com',
    '+1 (555) 010-2345',
    'New York, NY',
    'janedoe.design',
    'linkedin.com/in/janedoe',
  ]

  if (header === 'band') {
    return (
      <div style={{ backgroundColor: style.headline, color: style.onBand, padding: '30px 52px 24px' }}>
        <div style={{ ...nameStyle, color: style.onBand }}>Jane Doe</div>
        <div style={{ marginTop: 8, height: 3, width: 60, backgroundColor: style.accent }} />
        <div style={{ marginTop: 10, fontSize: 12.5, fontWeight: 600, color: style.accent }}>
          Senior Product Designer · Design Systems &amp; Fintech
        </div>
        <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 11, opacity: 0.85 }}>
          {contacts.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
      </div>
    )
  }

  if (header === 'corporate') {
    return (
      <div style={{ padding: '32px 52px 16px', borderBottom: `2.5px solid ${style.headline}` }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
          <div>
            <div style={{ ...nameStyle, color: style.headline }}>Jane Doe</div>
            <div style={{ marginTop: 6, fontSize: 12.5, fontWeight: 600, color: style.accent }}>
              Senior Product Designer · Design Systems &amp; Fintech
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2, fontSize: 11, opacity: 0.75 }}>
            {contacts.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (header === 'centered') {
    return (
      <div style={{ padding: '34px 52px 18px', textAlign: 'center', borderBottom: `1px solid ${rgba(style.accent, 0.4)}` }}>
        <div style={{ ...nameStyle, color: style.headline }}>Jane Doe</div>
        <div style={{ marginTop: 8, fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', color: style.accent, textTransform: 'uppercase' }}>
          Senior Product Designer · Design Systems &amp; Fintech
        </div>
        <div style={{ margin: '12px auto 0', height: 2, width: 48, backgroundColor: style.accent }} />
        <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 12, fontSize: 11, opacity: 0.75 }}>
          {contacts.map((c, i) => (
            <span key={c} style={{ display: 'flex', gap: 12 }}>
              {i > 0 && <span style={{ opacity: 0.5 }}>·</span>}
              {c}
            </span>
          ))}
        </div>
      </div>
    )
  }

  // left
  return (
    <div style={{ padding: '32px 52px 16px', borderBottom: `2.5px solid ${style.accent}` }}>
      <div style={{ ...nameStyle, color: style.headline }}>Jane Doe</div>
      <div style={{ marginTop: 6, fontSize: 12.5, fontWeight: 600, color: style.accent }}>
        Senior Product Designer · Design Systems &amp; Fintech
      </div>
      <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 11, opacity: 0.75 }}>
        {contacts.map((c) => (
          <span key={c}>{c}</span>
        ))}
      </div>
    </div>
  )
}

function ResumeBody({ template }: { template: Template }) {
  const { style } = template
  const solidChip = template.id === 'bold'

  return (
    <div style={{ flex: 1, padding: '18px 52px 30px', display: 'flex', flexDirection: 'column', gap: 15 }}>
      <Section title="Profile" template={template}>
        <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.5 }}>{SUMMARY}</p>
      </Section>

      <Section title="Core Competencies" template={template}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {SKILLS.map((skill) => (
            <span
              key={skill}
              style={{
                fontSize: 10.5,
                fontWeight: 500,
                padding: '4px 9px',
                borderRadius: 5,
                color: solidChip ? '#ffffff' : style.headline,
                backgroundColor: solidChip ? style.headline : rgba(style.accent, 0.12),
                border: solidChip ? 'none' : `1px solid ${rgba(style.accent, 0.45)}`,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </Section>

      <Section title="Professional Experience" template={template}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {EXPERIENCE.map((job) => (
            <ExperienceItem key={job.role} job={job} template={template} />
          ))}
        </div>
      </Section>

      <Section title="Selected Projects" template={template}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {PROJECTS.map((p) => (
            <div key={p.name} style={{ display: 'flex', gap: 7, fontSize: 11, lineHeight: 1.45 }}>
              <Dot color={style.accent} />
              <span>
                <span style={{ fontWeight: 700, color: style.headline }}>{p.name} — </span>
                <span>{p.detail}</span>
              </span>
            </div>
          ))}
        </div>
      </Section>

      <div style={{ display: 'flex', gap: 32 }}>
        <div style={{ flex: 1 }}>
          <Section title="Education" template={template}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {EDUCATION.map((ed) => (
                <div key={ed.degree}>
                  <div style={{ fontSize: 11.5, fontWeight: 700, color: style.headline }}>{ed.degree}</div>
                  <div style={{ fontSize: 10.5, opacity: 0.8 }}>
                    {ed.org} · {ed.period}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
        <div style={{ flex: 1 }}>
          <Section title="Certifications" template={template}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {CERTIFICATIONS.map((c) => (
                <div key={c} style={{ display: 'flex', gap: 7, fontSize: 10.5, lineHeight: 1.4 }}>
                  <Dot color={style.accent} />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 32 }}>
        <div style={{ flex: 1 }}>
          <Section title="Awards" template={template}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {AWARDS.map((a) => (
                <div key={a} style={{ display: 'flex', gap: 7, fontSize: 10.5, lineHeight: 1.4 }}>
                  <Dot color={style.accent} />
                  <span>{a}</span>
                </div>
              ))}
            </div>
          </Section>
        </div>
        <div style={{ flex: 1 }}>
          <Section title="Languages" template={template}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {LANGUAGES.map((l) => (
                <div key={l} style={{ display: 'flex', gap: 7, fontSize: 10.5, lineHeight: 1.4 }}>
                  <Dot color={style.accent} />
                  <span>{l}</span>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}

function Dot({ color }: { color: string }) {
  return (
    <span
      style={{
        marginTop: 5,
        height: 3.5,
        width: 3.5,
        borderRadius: 999,
        backgroundColor: color,
        flexShrink: 0,
      }}
    />
  )
}

function ExperienceItem({
  job,
  template,
}: {
  job: (typeof EXPERIENCE)[number]
  template: Template
}) {
  const { style } = template
  const barred = template.id === 'tech'

  return (
    <div style={barred ? { borderLeft: `2.5px solid ${style.accent}`, paddingLeft: 12 } : undefined}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16 }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: style.headline }}>{job.role}</div>
        <div style={{ fontSize: 10.5, fontWeight: 600, opacity: 0.65, whiteSpace: 'nowrap' }}>{job.period}</div>
      </div>
      <div style={{ marginTop: 1, display: 'flex', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ fontSize: 11.5, fontWeight: 600, color: style.accent }}>{job.org}</div>
        <div style={{ fontSize: 10.5, opacity: 0.6, whiteSpace: 'nowrap' }}>{job.location}</div>
      </div>
      <ul style={{ margin: '6px 0 0', paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {job.bullets.map((b) => (
          <li key={b} style={{ display: 'flex', gap: 7, fontSize: 11, lineHeight: 1.45 }}>
            <Dot color={style.accent} />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function LetterBody({ template }: { template: Template }) {
  const { style, header } = template
  const centered = header === 'centered'

  return (
    <div
      style={{
        flex: 1,
        padding: '24px 52px 34px',
        display: 'flex',
        flexDirection: 'column',
        gap: 15,
        textAlign: centered ? 'center' : 'left',
      }}
    >
      <div style={{ fontSize: 11, opacity: 0.7 }}>March 12, 2025</div>

      <div style={{ fontSize: 11.5, lineHeight: 1.45 }}>
        <div style={{ fontWeight: 700, color: style.headline }}>Ms. Alex Rivera — Hiring Manager</div>
        <div>Design Team · Northwind Labs</div>
        <div style={{ opacity: 0.75 }}>500 Market Street, San Francisco, CA 94103</div>
      </div>

      <div style={{ fontSize: 12, fontWeight: 700, color: style.headline }}>Dear Ms. Rivera,</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        {LETTER_BODY.map((p, i) => (
          <p key={i} style={{ margin: 0, fontSize: 11.5, lineHeight: 1.6 }}>
            {p}
          </p>
        ))}
      </div>

      <div
        style={{
          padding: centered ? '12px 16px' : '12px 14px',
          borderRadius: 8,
          textAlign: 'left',
          backgroundColor: rgba(style.accent, 0.08),
          borderLeft: centered ? 'none' : `2.5px solid ${style.accent}`,
          borderTop: centered ? `2.5px solid ${style.accent}` : 'none',
        }}
      >
        <div
          style={{
            fontSize: 10.5,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: style.headline,
          }}
        >
          What I would bring
        </div>
        <ul style={{ margin: '8px 0 0', paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
          {LETTER_BULLETS.map((b) => (
            <li key={b} style={{ display: 'flex', gap: 7, fontSize: 11, lineHeight: 1.45 }}>
              <Dot color={style.accent} />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.6 }}>{LETTER_CLOSING}</p>

      <div
        style={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          alignItems: centered ? 'center' : 'flex-start',
        }}
      >
        <div style={{ fontSize: 11.5 }}>Sincerely,</div>
        <div style={{ height: 2, width: 64, backgroundColor: style.accent }} />
        <div style={{ fontSize: 13, fontWeight: 700, color: style.headline }}>Jane Doe</div>
        <div style={{ fontSize: 10.5, opacity: 0.7 }}>
          jane.doe@email.com · +1 (555) 010-2345 · janedoe.design
        </div>
      </div>
    </div>
  )
}

function Section({
  title,
  template,
  children,
}: {
  title: string
  template: Template
  children: ReactNode
}) {
  const { style, header } = template
  const marker = header === 'corporate'
  const titleColor = header === 'band' ? style.headline : style.accent

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {marker && <span style={{ height: 10, width: 10, borderRadius: 3, backgroundColor: style.accent }} />}
        <h3
          style={{
            margin: 0,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: titleColor,
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </h3>
        <span style={{ flex: 1, height: 1, backgroundColor: rgba(style.accent, 0.3) }} />
      </div>
      {children}
    </section>
  )
}

function rgba(hex: string, alpha: number) {
  const h = hex.replace('#', '')
  const r = Number.parseInt(h.substring(0, 2), 16)
  const g = Number.parseInt(h.substring(2, 4), 16)
  const b = Number.parseInt(h.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
