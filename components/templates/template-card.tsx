'use client'

import { Check, Eye } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TemplateThumbnail } from '@/components/templates/template-thumbnail'
import type { Template } from '@/lib/templates'
import { cn } from '@/lib/utils'

export function TemplateCard({
  template,
  selected,
  onSelect,
  onPreview,
}: {
  template: Template
  selected: boolean
  onSelect: () => void
  onPreview: () => void
}) {
  return (
    <div
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border bg-card text-left transition-all duration-200',
        selected
          ? 'border-primary ring-2 ring-primary/30 shadow-lg shadow-primary/10'
          : 'border-border hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5',
      )}
    >
      {/* Clickable preview area — clicking it selects the template. */}
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        aria-label={`Use ${template.name} template`}
        className="relative block w-full overflow-hidden bg-muted/40 px-5 pt-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
      >
        <div className="overflow-hidden rounded-t-md shadow-md ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-[1.02] group-hover:-translate-y-1">
          <div className="aspect-[1/0.92] w-full overflow-hidden">
            <TemplateThumbnail template={template} />
          </div>
        </div>

        {/* Selected veil + check */}
        {selected && (
          <span className="absolute right-3 top-3 grid size-7 place-items-center rounded-full bg-primary text-primary-foreground shadow-md motion-pop-in">
            <Check className="size-4" />
          </span>
        )}

        {/* Hover call-to-action */}
        {!selected && (
          <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 bg-gradient-to-t from-foreground/70 to-transparent pb-3 pt-8 text-xs font-semibold text-background opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <Check className="size-3.5" />
            Click to use
          </span>
        )}
      </button>

      <div className="flex flex-col gap-3 border-t border-border p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold tracking-tight">{template.name}</h3>
              <Badge variant="secondary" className="h-5 px-1.5 text-[10px] font-semibold">
                {template.tag}
              </Badge>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">{template.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={selected ? 'default' : 'outline'}
            className="flex-1"
            onClick={onSelect}
            disabled={selected}
          >
            {selected ? (
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
