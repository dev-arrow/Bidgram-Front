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
  'Senior product designer with 8+ years crafting intuitive, accessible digital products across fintech and SaaS. I lead cross-functional teams from research through launch, turning complex problems into clean, measurable experiences.'

const SKILLS = [
  'Product Strategy',
  'UX Research',
  'Design Systems',
  'Figma',
  'Prototyping',
  'Usability Testing',
  'Accessibility',
  'Design Ops',
]

const EXPERIENCE = [
  {
    role: 'Lead Product Designer',
    org: 'Northwind Labs',
    period: '2021 — Present',
    bullets: [
      'Own end-to-end design for an analytics platform serving 2M+ active users.',
      'Built a design system that cut design-to-dev handoff time by 40%.',
    ],
  },
  {
    role: 'Senior UX Designer',
    org: 'Brightwave',
    period: '2018 — 2021',
    bullets: [
      'Redesigned onboarding and lifted activation by 27% in two quarters.',
      'Ran 40+ usability sessions that shaped the product roadmap.',
    ],
  },
]

const EDUCATION = [
  { degree: 'M.A. Interaction Design', org: 'Parsons School of Design', period: '2016' },
  { degree: 'B.A. Visual Communication', org: 'New York University', period: '2014' },
]

const LETTER_BODY = [
  "I'm writing to express my strong interest in the Senior Product Designer role at Northwind Labs. With over eight years designing user-centered products for fintech and SaaS companies, I'm confident I can help your team ship experiences customers love.",
  'In my current role I lead design for a platform used by more than two million people. I introduced a scalable design system that reduced handoff time by 40% and partnered closely with engineering and research to keep quality high while moving quickly.',
  "I'd welcome the chance to bring the same rigor and craft to your team. Thank you for your time and consideration — I look forward to speaking with you.",
]

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
    fontSize: 34,
    fontWeight: 700,
    lineHeight: 1.05,
    letterSpacing: template.letterspacedName ? '0.14em' : '-0.01em',
    textTransform: template.uppercaseName ? 'uppercase' : 'none',
  }
  const contacts = ['jane.doe@email.com', '+1 (555) 010-2345', 'New York, NY', 'janedoe.design']

  if (header === 'band') {
    return (
      <div style={{ backgroundColor: style.headline, color: style.onBand, padding: '38px 52px 30px' }}>
        <div style={{ ...nameStyle, color: style.onBand }}>Jane Doe</div>
        <div style={{ marginTop: 10, height: 3, width: 60, backgroundColor: style.accent }} />
        <div style={{ marginTop: 12, fontSize: 12.5, fontWeight: 600, color: style.accent }}>
          Senior Product Designer
        </div>
        <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 18, fontSize: 11.5, opacity: 0.85 }}>
          {contacts.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
      </div>
    )
  }

  if (header === 'corporate') {
    return (
      <div style={{ padding: '40px 52px 20px', borderBottom: `2.5px solid ${style.headline}` }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
          <div>
            <div style={{ ...nameStyle, color: style.headline }}>Jane Doe</div>
            <div style={{ marginTop: 6, fontSize: 13, fontWeight: 600, color: style.accent }}>
              Senior Product Designer
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3, fontSize: 11.5, opacity: 0.75 }}>
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
      <div style={{ padding: '44px 52px 22px', textAlign: 'center', borderBottom: `1px solid ${rgba(style.accent, 0.4)}` }}>
        <div style={{ ...nameStyle, color: style.headline }}>Jane Doe</div>
        <div style={{ marginTop: 8, fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', color: style.accent, textTransform: 'uppercase' }}>
          Senior Product Designer
        </div>
        <div style={{ margin: '14px auto 0', height: 2, width: 48, backgroundColor: style.accent }} />
        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 14, fontSize: 11.5, opacity: 0.75 }}>
          {contacts.map((c, i) => (
            <span key={c} style={{ display: 'flex', gap: 14 }}>
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
    <div style={{ padding: '40px 52px 20px', borderBottom: `2.5px solid ${style.accent}` }}>
      <div style={{ ...nameStyle, color: style.headline }}>Jane Doe</div>
      <div style={{ marginTop: 6, fontSize: 13, fontWeight: 600, color: style.accent }}>
        Senior Product Designer
      </div>
      <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 18, fontSize: 11.5, opacity: 0.75 }}>
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
    <div style={{ flex: 1, padding: '26px 52px 44px', display: 'flex', flexDirection: 'column', gap: 22 }}>
      <Section title="Profile" template={template}>
        <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.55 }}>{SUMMARY}</p>
      </Section>

      <Section title="Skills" template={template}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {SKILLS.map((skill) => (
            <span
              key={skill}
              style={{
                fontSize: 11.5,
                fontWeight: 500,
                padding: '5px 11px',
                borderRadius: 6,
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

      <Section title="Experience" template={template}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {EXPERIENCE.map((job) => (
            <ExperienceItem key={job.role} job={job} template={template} />
          ))}
        </div>
      </Section>

      <Section title="Education" template={template}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {EDUCATION.map((ed) => (
            <div key={ed.degree} style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: style.headline }}>{ed.degree}</div>
                <div style={{ fontSize: 11.5, opacity: 0.8 }}>{ed.org}</div>
              </div>
              <div style={{ fontSize: 11.5, fontWeight: 600, opacity: 0.65, whiteSpace: 'nowrap' }}>{ed.period}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
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
    <div style={barred ? { borderLeft: `2.5px solid ${style.accent}`, paddingLeft: 14 } : undefined}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16 }}>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: style.headline }}>{job.role}</div>
        <div style={{ fontSize: 11.5, fontWeight: 600, opacity: 0.65, whiteSpace: 'nowrap' }}>{job.period}</div>
      </div>
      <div style={{ marginTop: 2, fontSize: 12.5, fontWeight: 600, color: style.accent }}>{job.org}</div>
      <ul style={{ margin: '8px 0 0', paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
        {job.bullets.map((b) => (
          <li key={b} style={{ display: 'flex', gap: 8, fontSize: 12, lineHeight: 1.5 }}>
            <span style={{ marginTop: 6, height: 4, width: 4, borderRadius: 999, backgroundColor: style.accent, flexShrink: 0 }} />
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
    <div style={{ flex: 1, padding: '30px 52px 44px', display: 'flex', flexDirection: 'column', gap: 20, textAlign: centered ? 'center' : 'left' }}>
      <div style={{ fontSize: 12, opacity: 0.7 }}>March 12, 2025</div>

      <div style={{ fontSize: 12.5, lineHeight: 1.5 }}>
        <div style={{ fontWeight: 700, color: style.headline }}>Hiring Manager</div>
        <div>Northwind Labs</div>
        <div style={{ opacity: 0.75 }}>500 Market Street, San Francisco, CA 94103</div>
      </div>

      <div style={{ fontSize: 13, fontWeight: 600, color: style.headline }}>Dear Hiring Manager,</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {LETTER_BODY.map((p, i) => (
          <p key={i} style={{ margin: 0, fontSize: 12.5, lineHeight: 1.65 }}>
            {p}
          </p>
        ))}
      </div>

      <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4, alignItems: centered ? 'center' : 'flex-start' }}>
        <div style={{ fontSize: 12.5 }}>Sincerely,</div>
        <div style={{ height: 2, width: 64, backgroundColor: style.accent }} />
        <div style={{ fontSize: 14, fontWeight: 700, color: style.headline }}>Jane Doe</div>
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
    <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {marker && <span style={{ height: 12, width: 12, borderRadius: 3, backgroundColor: style.accent }} />}
        <h3
          style={{
            margin: 0,
            fontSize: 12.5,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: titleColor,
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
