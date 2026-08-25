'use client'

import { useRef, useState, type ComponentType } from 'react'
import {
  Check,
  Copy,
  FileText,
  Lock,
  MessagesSquare,
  Pencil,
  PenLine,
  RotateCcw,
  Sparkles,
} from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import type { PromptDefinition, PromptId, PromptMode } from '@/lib/prompt-data'
import { cn } from '@/lib/utils'

/**
 * Icons live here rather than on the page because component references cannot
 * be serialized across the Server -> Client Component boundary.
 */
const PROMPT_ICONS: Record<PromptId, ComponentType<{ className?: string }>> = {
  resume: FileText,
  'cover-letter': PenLine,
  qa: MessagesSquare,
}

/**
 * One prompt (Resume / Cover Letter / QA) with the two options the product
 * requires: run Bidgram's default prompt, or edit your own and save it.
 *
 * The saved custom text is kept in state even while "Use default" is active,
 * so toggling between the two options is non-destructive.
 */
export function PromptSection({
  definition,
  style,
}: {
  definition: PromptDefinition
  style?: React.CSSProperties
}) {
  const Icon = PROMPT_ICONS[definition.id]
  const [mode, setMode] = useState<PromptMode>('default')
  const [savedCustom, setSavedCustom] = useState<string | null>(null)
  const [draft, setDraft] = useState(definition.defaultPrompt)
  const [copied, setCopied] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const activeText = mode === 'custom' ? (savedCustom ?? definition.defaultPrompt) : definition.defaultPrompt
  const isDirty = mode === 'custom' && draft !== (savedCustom ?? definition.defaultPrompt)
  const matchesDefault = draft.trim() === definition.defaultPrompt.trim()

  function selectDefault() {
    setMode('default')
  }

  function selectCustom() {
    // Seed the editor from whatever is currently in effect.
    setDraft(savedCustom ?? definition.defaultPrompt)
    setMode('custom')
  }

  function save() {
    const next = draft.trim()
    if (!next) {
      toast.error('Prompt cannot be empty')
      return
    }
    setSavedCustom(next)
    setDraft(next)
    toast.success(`${definition.title} saved`, {
      description: `Bidgram will use your custom prompt for every ${definition.output.toLowerCase()}.`,
    })
  }

  function discard() {
    setDraft(savedCustom ?? definition.defaultPrompt)
  }

  function restoreDefaultText() {
    setDraft(definition.defaultPrompt)
    textareaRef.current?.focus()
  }

  async function copyActive() {
    try {
      await navigator.clipboard.writeText(activeText)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      toast.error('Could not copy to clipboard')
    }
  }

  /** Inserts a placeholder at the caret so users don't have to type them. */
  function insertVariable(variable: string) {
    const node = textareaRef.current
    if (!node) return
    const start = node.selectionStart ?? draft.length
    const end = node.selectionEnd ?? draft.length
    setDraft(`${draft.slice(0, start)}${variable}${draft.slice(end)}`)
    requestAnimationFrame(() => {
      node.focus()
      const caret = start + variable.length
      node.setSelectionRange(caret, caret)
    })
  }

  return (
    <section
      className="animate-fade-up overflow-hidden rounded-2xl border border-border bg-card"
      style={style}
      aria-labelledby={`${definition.id}-heading`}
    >
      <div className="flex flex-col gap-4 border-b border-border p-5 lg:flex-row lg:items-start lg:justify-between lg:p-6">
        <div className="flex items-start gap-3.5">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-primary">
            <Icon className="size-5" />
          </span>
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 id={`${definition.id}-heading`} className="text-base font-bold tracking-tight">
                {definition.title}
              </h2>
              <Badge variant={mode === 'custom' ? 'default' : 'secondary'} className="gap-1">
                {mode === 'custom' ? (
                  <>
                    <Pencil className="size-3" aria-hidden="true" />
                    Custom
                  </>
                ) : (
                  <>
                    <Sparkles className="size-3" aria-hidden="true" />
                    Default
                  </>
                )}
              </Badge>
            </div>
            <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
              {definition.description}
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="shrink-0 self-start"
          onClick={copyActive}
          aria-label={`Copy ${definition.title}`}
        >
          {copied ? <Check data-icon="inline-start" /> : <Copy data-icon="inline-start" />}
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>

      <div className="p-5 lg:p-6">
        {/* The two required options. */}
        <div
          role="radiogroup"
          aria-label={`${definition.title} source`}
          className="grid gap-3 sm:grid-cols-2"
        >
          <OptionCard
            role="radio"
            selected={mode === 'default'}
            icon={Sparkles}
            title="Use default"
            description="Bidgram's tuned prompt. Maintained and improved for you."
            onSelect={selectDefault}
          />
          <OptionCard
            role="radio"
            selected={mode === 'custom'}
            icon={Pencil}
            title="Edit and save"
            description={
              savedCustom
                ? 'Your saved prompt. Edit it any time.'
                : 'Write your own prompt and save it to this account.'
            }
            onSelect={selectCustom}
          />
        </div>

        <div className="mt-5">
          {mode === 'default' ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Lock className="size-3.5" aria-hidden="true" />
                Read-only. Choose &ldquo;Edit and save&rdquo; to customise.
              </div>
              <pre className="max-h-72 overflow-auto rounded-xl border border-border bg-muted/40 p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap text-muted-foreground">
                {definition.defaultPrompt}
              </pre>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="mr-1 text-xs font-semibold">Insert variable</span>
                {definition.variables.map((variable) => (
                  <button
                    key={variable}
                    type="button"
                    onClick={() => insertVariable(variable)}
                    className="rounded-md border border-border bg-muted/50 px-2 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:border-primary/40 hover:bg-accent hover:text-primary"
                  >
                    {variable}
                  </button>
                ))}
              </div>

              <Textarea
                ref={textareaRef}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                rows={14}
                aria-label={`${definition.title} text`}
                className="resize-y font-mono text-xs leading-relaxed"
              />

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">
                  {draft.length.toLocaleString()} characters
                  {isDirty ? (
                    <span className="ml-2 font-semibold text-brand-orange">Unsaved changes</span>
                  ) : savedCustom ? (
                    <span className="ml-2 font-semibold text-primary">Saved</span>
                  ) : null}
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={restoreDefaultText}
                    disabled={matchesDefault}
                  >
                    <RotateCcw data-icon="inline-start" />
                    Reset to default
                  </Button>
                  <Button variant="outline" size="sm" onClick={discard} disabled={!isDirty}>
                    Discard
                  </Button>
                  <Button size="sm" onClick={save} disabled={!isDirty}>
                    <Check data-icon="inline-start" />
                    Save prompt
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function OptionCard({
  selected,
  icon: Icon,
  title,
  description,
  onSelect,
  role,
}: {
  selected: boolean
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
  onSelect: () => void
  role?: string
}) {
  return (
    <button
      type="button"
      role={role}
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        'interactive-surface flex items-start gap-3 rounded-xl border p-4 text-left',
        selected
          ? 'border-primary bg-accent/70 ring-1 ring-primary/30'
          : 'border-border bg-card hover:border-primary/30',
      )}
    >
      <span
        className={cn(
          'mt-0.5 grid size-8 shrink-0 place-items-center rounded-full transition-colors',
          selected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
        )}
      >
        <Icon className="size-4" />
      </span>
      <span className="flex flex-col gap-0.5">
        <span className={cn('text-sm font-bold', selected && 'text-primary')}>{title}</span>
        <span className="text-xs leading-relaxed text-muted-foreground">{description}</span>
      </span>
    </button>
  )
}
