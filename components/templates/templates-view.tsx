'use client'

import { useEffect, useMemo, useState } from 'react'
import { Check, FileText, Lock, PenLine, Sparkles, Wallet, X } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { TemplateCard } from '@/components/templates/template-card'
import { TemplateThumbnail } from '@/components/templates/template-thumbnail'
import { BALANCE } from '@/lib/billing-data'
import {
  COVER_LETTER_TEMPLATES,
  DEFAULT_SELECTION,
  OWNED_TEMPLATE_IDS,
  RESUME_TEMPLATES,
  TEMPLATE_PRICE_USD,
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
  const [checkout, setCheckout] = useState<Template | null>(null)
  const [owned, setOwned] = useState<string[]>([...OWNED_TEMPLATE_IDS])
  const [walletCredit, setWalletCredit] = useState(BALANCE.walletCreditUsd)

  const templates = category === 'resume' ? RESUME_TEMPLATES : COVER_LETTER_TEMPLATES
  const selectedId = selection[category]
  const selectedTemplate = useMemo(
    () => templates.find((t) => t.id === selectedId),
    [templates, selectedId],
  )

  const isLocked = (template: Template) => Boolean(template.premium) && !owned.includes(template.id)
  const lockedCount = templates.filter(isLocked).length

  function handleSelect(template: Template) {
    if (isLocked(template)) {
      setCheckout(template)
      return
    }
    if (selection[template.category] === template.id) return
    setSelection((prev) => ({ ...prev, [template.category]: template.id }))
    toast.success(`${template.name} selected`, {
      description: `Bidgram will use it for every ${
        template.category === 'resume' ? 'résumé' : 'cover letter'
      } from now on.`,
    })
  }

  function handleUnlock(template: Template) {
    setOwned((prev) => [...prev, template.id])
    setWalletCredit((prev) => Math.max(0, prev - TEMPLATE_PRICE_USD))
    setSelection((prev) => ({ ...prev, [template.category]: template.id }))
    setCheckout(null)
    setPreview(null)
    toast.success(`${template.name} unlocked`, {
      description: `Yours permanently — $${TEMPLATE_PRICE_USD.toFixed(2)} taken from wallet credit.`,
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

        <div className="flex flex-wrap items-center gap-3">
          {lockedCount > 0 && (
            <span className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-xs font-medium text-muted-foreground">
              <Lock className="size-3.5" aria-hidden="true" />
              {lockedCount} premium · ${TEMPLATE_PRICE_USD} each, one-time
            </span>
          )}

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
                locked={isLocked(template)}
                onSelect={() => handleSelect(template)}
                onPreview={() => setPreview(template)}
                onUnlock={() => setCheckout(template)}
              />
            </div>
          ))}
        </div>
      </div>

      {preview && (
        <PreviewOverlay
          template={preview}
          selected={selection[preview.category] === preview.id}
          locked={isLocked(preview)}
          onClose={() => setPreview(null)}
          onSelect={() => {
            handleSelect(preview)
            if (!isLocked(preview)) setPreview(null)
          }}
        />
      )}

      {checkout && (
        <UnlockDialog
          template={checkout}
          walletCredit={walletCredit}
          onClose={() => setCheckout(null)}
          onConfirm={() => handleUnlock(checkout)}
        />
      )}
    </div>
  )
}

function UnlockDialog({
  template,
  walletCredit,
  onClose,
  onConfirm,
}: {
  template: Template
  walletCredit: number
  onClose: () => void
  onConfirm: () => void
}) {
  const [pending, setPending] = useState(false)
  const affordable = walletCredit >= TEMPLATE_PRICE_USD

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  function confirm() {
    setPending(true)
    window.setTimeout(onConfirm, 700)
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Unlock ${template.name}`}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm motion-slide-down"
      />

      <div className="motion-pop-in relative z-10 flex w-full max-w-[420px] flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <div className="flex items-start gap-4">
          <div className="w-20 shrink-0 overflow-hidden rounded-md shadow-md ring-1 ring-black/10">
            <div className="aspect-[1/1.3] w-full">
              <TemplateThumbnail template={template} />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-primary">
              One-time unlock
            </span>
            <h2 className="text-xl font-extrabold tracking-tight text-balance">{template.name}</h2>
            <p className="text-xs leading-relaxed text-muted-foreground text-pretty">
              Buy it once and it stays on your account forever — no renewal, no per-use charge.
            </p>
          </div>
        </div>

        <div className="flex items-baseline justify-between rounded-xl border border-border bg-muted/40 px-4 py-3">
          <span className="text-sm font-medium text-muted-foreground">Total due</span>
          <span className="text-2xl font-extrabold tracking-tight">
            ${TEMPLATE_PRICE_USD.toFixed(2)}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3">
            <span className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-full bg-accent text-primary">
                <Wallet className="size-4" aria-hidden="true" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-sm font-bold">Wallet credit</span>
                <span className="text-[11px] text-muted-foreground">
                  ${walletCredit.toFixed(2)} available
                </span>
              </span>
            </span>
            {affordable ? (
              <Check className="size-4 text-primary" aria-label="Sufficient balance" />
            ) : (
              <span className="text-[11px] font-semibold text-destructive">Too low</span>
            )}
          </div>

          {!affordable && (
            <p className="text-xs leading-relaxed text-muted-foreground">
              Top up with crypto on the{' '}
              <Link href="/billing" className="font-semibold text-primary underline">
                billing page
              </Link>{' '}
              — overpayments land here as credit you can spend on templates.
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button className="flex-1" onClick={confirm} disabled={!affordable || pending}>
            {pending ? (
              'Unlocking…'
            ) : (
              <>
                <Lock data-icon="inline-start" />
                Unlock for ${TEMPLATE_PRICE_USD}
              </>
            )}
          </Button>
          <Button variant="outline" onClick={onClose} disabled={pending}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}

function PreviewOverlay({
  template,
  selected,
  locked,
  onClose,
  onSelect,
}: {
  template: Template
  selected: boolean
  locked: boolean
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
          <div className="relative w-full max-w-[720px] overflow-hidden rounded-xl shadow-2xl ring-1 ring-black/10">
            <div className="aspect-[794/1123] w-full">
              <TemplateThumbnail template={template} />
            </div>
            {locked && (
              <span className="absolute left-0 top-6 flex items-center gap-1.5 rounded-r-full bg-foreground/85 py-1.5 pl-4 pr-3.5 text-xs font-bold text-background shadow-lg backdrop-blur-sm">
                <Lock className="size-3.5" aria-hidden="true" />
                Premium · ${TEMPLATE_PRICE_USD}
              </span>
            )}
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

          {locked && (
            <p className="rounded-xl border border-border bg-muted/30 px-3 py-2.5 text-xs leading-relaxed text-muted-foreground">
              Preview is free. Unlocking costs ${TEMPLATE_PRICE_USD} once and keeps the template on
              your account for good — exports never watermark it.
            </p>
          )}

          <div className="mt-auto flex items-center gap-3">
            <Button className="flex-1" onClick={onSelect} disabled={selected && !locked}>
              {locked ? (
                <>
                  <Lock data-icon="inline-start" />
                  Unlock for ${TEMPLATE_PRICE_USD}
                </>
              ) : selected ? (
                'Already in use'
              ) : (
                'Use this template'
              )}
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
