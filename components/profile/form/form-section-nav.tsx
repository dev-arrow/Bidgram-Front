'use client'

import { useEffect, useState, type RefObject } from 'react'
import { cn } from '@/lib/utils'

export type FormSectionLink = { id: string; label: string }

/**
 * Fixed (sticky) left-hand navigation for the long profile form. Tracks which
 * section is currently in view within the form's scroll container and lets the
 * user jump between sections with a smooth scroll.
 */
export function FormSectionNav({
  sections,
  scrollRef,
}: {
  sections: FormSectionLink[]
  scrollRef: RefObject<HTMLDivElement | null>
}) {
  const [active, setActive] = useState(sections[0]?.id ?? '')

  useEffect(() => {
    const root = scrollRef.current
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { root, rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    )
    sections.forEach((section) => {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [sections, scrollRef])

  function handleJump(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActive(id)
  }

  return (
    <nav aria-label="Form sections" className="flex flex-col gap-0.5">
      <p className="mb-2 px-3 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
        Sections
      </p>
      {sections.map((section) => {
        const isActive = active === section.id
        return (
          <button
            key={section.id}
            type="button"
            onClick={() => handleJump(section.id)}
            aria-current={isActive ? 'true' : undefined}
            className={cn(
              'group relative rounded-lg px-3 py-2 text-left text-sm transition-all duration-200',
              isActive
                ? 'bg-accent font-semibold text-primary'
                : 'text-muted-foreground hover:translate-x-0.5 hover:bg-muted hover:text-foreground',
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                'absolute top-1/2 left-0 h-4 w-0.5 -translate-y-1/2 rounded-full bg-primary transition-all duration-200',
                isActive ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0',
              )}
            />
            {section.label}
          </button>
        )
      })}
    </nav>
  )
}
