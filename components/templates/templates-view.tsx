'use client'

import { useEffect, useMemo, useState } from 'react'
import { FileText, PenLine, Sparkles, X } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { TemplateCard } from '@/components/templates/template-card'
import { TemplateThumbnail } from '@/components/templates/template-thumbnail'
import {
  COVER_LETTER_TEMPLATES,
  DEFAULT_SELECTION,
  RESUME_TEMPLATES,
  type Template,
  type TemplateCategory,
} from '@/lib/templates'
import { cn } from '@/lib/utils'

const TABS: { id: TemplateCategory; label: string; icon: typeof FileText }[] = [
  { id: 'resume', label: 'Resume', icon: FileText },
  { id: 'cover-letter', label: 'Cover Letter', icon: PenLine },
]

export function TemplatesView() {
  const [category, setCategory] = useState<TemplateCategory>('resume')
  const [selection, setSelection] = useState<Record<TemplateCategory, string>>(DEFAULT_SELECTION)
  const [preview, setPreview] = useState<Template | null>(null)

  const templates = category === 'resume' ? RESUME_TEMPLATES : COVER_LETTER_TEMPLATES
  const selectedId = selection[category]
  const selectedTemplate = useMemo(
    () => templates.find((t) => t.id === selectedId),
    [templates, selectedId],
  )

  function handleSelect(template: Template) {
    if (selection[template.category] === template.id) return
    setSelection((prev) => ({ ...prev, [template.category]: template.id }))
    toast.success(`${template.name} selected`, {
      description: `Bidgram will use it for every ${
        template.category === 'resume' ? 'résumé' : 'cover letter'
      } from now on.`,
    })
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6">
      {/* Tabs + active summary */}
      <div className="flex shrink-0 animate-fade-up flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="tablist"
          aria-label="Document type"
          className="inline-flex w-fit items-center gap-1 rounded-full border border-border bg-card p-1"
        >
          {TABS.map((tab) => {
            const active = category === tab.id
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={active}
                onClick={() => setCategory(tab.id)}
                className={cn(
                  'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200',
                  active
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <tab.icon className="size-4" aria-hidden="true" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {selectedTemplate && (
          <div className="flex items-center gap-3 rounded-full border border-primary/20 bg-accent/60 py-1.5 pl-2 pr-4">
            <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground">
              <Sparkles className="size-4" aria-hidden="true" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[11px] font-medium text-muted-foreground">Currently in use</span>
              <span className="text-sm font-bold text-primary">{selectedTemplate.name}</span>
            </span>
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5 p-1">
          {templates.map((template, index) => (
            <div
              key={template.id}
              className="motion-pop-in"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <TemplateCard
                template={template}
                selected={selection[template.category] === template.id}
                onSelect={() => handleSelect(template)}
                onPreview={() => setPreview(template)}
              />
            </div>
          ))}
        </div>
      </div>

      {preview && (
        <PreviewOverlay
          template={preview}
          selected={selection[preview.category] === preview.id}
          onClose={() => setPreview(null)}
          onSelect={() => {
            handleSelect(preview)
            setPreview(null)
          }}
        />
      )}
    </div>
  )
}

function PreviewOverlay({
  template,
  selected,
  onClose,
  onSelect,
}: {
  template: Template
  selected: boolean
  onClose: () => void
  onSelect: () => void
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex"
      role="dialog"
      aria-modal="true"
      aria-label={`${template.name} preview`}
    >
      <button
        type="button"
        aria-label="Close preview"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm motion-slide-down"
      />

      <div className="motion-pop-in relative z-10 flex h-full w-full flex-col overflow-hidden bg-card shadow-2xl lg:flex-row">
        {/* Fullscreen preview */}
        <div className="flex min-h-0 flex-1 items-start justify-center overflow-y-auto bg-muted/40 p-4 sm:p-6 lg:p-10">
          <div className="w-full max-w-[720px] overflow-hidden rounded-xl shadow-2xl ring-1 ring-black/10">
            <div className="aspect-[794/1123] w-full">
              <TemplateThumbnail template={template} />
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="flex shrink-0 flex-col gap-5 overflow-y-auto border-t border-border p-6 lg:w-[400px] lg:border-t-0 lg:border-l lg:p-8">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                {template.category === 'resume' ? 'Résumé template' : 'Cover letter template'}
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight text-balance">{template.name}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
                {template.description}
              </p>
            </div>
            <Button variant="ghost" size="icon" className="size-9 shrink-0" onClick={onClose} aria-label="Close">
              <X className="size-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <Swatch label="Heading" color={template.style.headline} />
            <Swatch label="Accent" color={template.style.accent} />
            <Swatch label="Paper" color={template.style.bg} />
          </div>

          <dl className="grid grid-cols-2 gap-3 text-sm">
            <Meta term="Typeface" value={template.font === 'serif' ? 'Serif' : 'Sans-serif'} />
            <Meta
              term="Header"
              value={
                template.header === 'band'
                  ? 'Colour band'
                  : template.header === 'centered'
                    ? 'Centered'
                    : template.header === 'corporate'
                      ? 'Split rule'
                      : 'Left aligned'
              }
            />
          </dl>

          <div className="mt-auto flex items-center gap-3">
            <Button className="flex-1" onClick={onSelect} disabled={selected}>
              {selected ? 'Already in use' : 'Use this template'}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Swatch({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-muted/40 py-1 pl-1.5 pr-3">
      <span
        className="size-5 rounded-full ring-1 ring-black/10"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  )
}

function Meta({ term, value }: { term: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-xl border border-border bg-muted/30 px-3 py-2">
      <dt className="text-[11px] font-medium text-muted-foreground">{term}</dt>
      <dd className="text-sm font-bold">{value}</dd>
    </div>
  )
}
