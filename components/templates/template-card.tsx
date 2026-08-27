'use client'

import { Check, Eye, Lock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TemplateThumbnail } from '@/components/templates/template-thumbnail'
import { TEMPLATE_PRICE_USD, type Template } from '@/lib/templates'
import { cn } from '@/lib/utils'

export function TemplateCard({
  template,
  selected,
  locked,
  onSelect,
  onPreview,
  onUnlock,
}: {
  template: Template
  selected: boolean
  locked: boolean
  onSelect: () => void
  onPreview: () => void
  onUnlock: () => void
}) {
  const primaryAction = locked ? onUnlock : onSelect

  return (
    <div
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border bg-card text-left transition-all duration-200',
        selected
          ? 'border-primary ring-2 ring-primary/30 shadow-lg shadow-primary/10'
          : 'border-border hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5',
      )}
    >
      {/* Clicking the artwork selects the template, or opens checkout when locked. */}
      <button
        type="button"
        onClick={primaryAction}
        aria-pressed={locked ? undefined : selected}
        aria-label={
          locked
            ? `Unlock ${template.name} template for $${TEMPLATE_PRICE_USD}`
            : `Use ${template.name} template`
        }
        className="relative block w-full overflow-hidden bg-muted/40 px-5 pt-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
      >
        <div className="overflow-hidden rounded-t-md shadow-md ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-[1.02] group-hover:-translate-y-1">
          <div className="relative aspect-[1/0.92] w-full overflow-hidden">
            <div className={cn(locked && 'blur-[3px] saturate-[0.55]')}>
              <TemplateThumbnail template={template} />
            </div>
            {locked && <span className="absolute inset-0 bg-foreground/10" aria-hidden="true" />}
          </div>
        </div>

        {/* Locked marker */}
        {locked && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-foreground/85 py-1 pl-2 pr-2.5 text-[11px] font-bold text-background shadow-md backdrop-blur-sm">
            <Lock className="size-3" aria-hidden="true" />${TEMPLATE_PRICE_USD}
          </span>
        )}

        {/* Selected veil + check */}
        {selected && !locked && (
          <span className="absolute right-3 top-3 grid size-7 place-items-center rounded-full bg-primary text-primary-foreground shadow-md motion-pop-in">
            <Check className="size-4" />
          </span>
        )}

        {/* Hover call-to-action */}
        {(locked || !selected) && (
          <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 bg-gradient-to-t from-foreground/70 to-transparent pb-3 pt-8 text-xs font-semibold text-background opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            {locked ? (
              <>
                <Lock className="size-3.5" />
                Unlock once, keep forever
              </>
            ) : (
              <>
                <Check className="size-3.5" />
                Click to use
              </>
            )}
          </span>
        )}
      </button>

      <div className="flex flex-col gap-3 border-t border-border p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold tracking-tight">{template.name}</h3>
              <Badge
                variant={locked ? 'default' : 'secondary'}
                className="h-5 px-1.5 text-[10px] font-semibold"
              >
                {locked ? 'Premium' : template.tag}
              </Badge>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">{template.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={selected && !locked ? 'default' : locked ? 'default' : 'outline'}
            className="flex-1"
            onClick={primaryAction}
            disabled={selected && !locked}
          >
            {locked ? (
              <>
                <Lock data-icon="inline-start" />
                Unlock ${TEMPLATE_PRICE_USD}
              </>
            ) : selected ? (
              <>
                <Check data-icon="inline-start" />
                In use
              </>
            ) : (
              'Use template'
            )}
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="size-9 shrink-0"
            onClick={onPreview}
            aria-label={`Preview ${template.name}`}
          >
            <Eye className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
