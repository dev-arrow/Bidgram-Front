import type { Metadata } from 'next'
import { FileText, MessagesSquare, PenLine, Wand2 } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { PromptSection } from '@/components/prompt/prompt-section'
import { PROMPT_DEFINITIONS } from '@/lib/prompt-data'

export const metadata: Metadata = {
  title: 'Prompts — Bidgram',
  description:
    'Control the prompts Bidgram uses to write your resume, cover letter, and screening answers.',
}

const PROMPT_ICONS = {
  resume: FileText,
  'cover-letter': PenLine,
  qa: MessagesSquare,
} as const

export default function PromptPage() {
  return (
    <>
      <PageHeader
        title="Prompts"
        description="Control how Bidgram writes on your behalf. Every application uses these three prompts."
      />

      <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-6 py-6 lg:px-8">
        <div className="flex shrink-0 animate-fade-up flex-col gap-3 rounded-2xl border border-primary/20 bg-accent/60 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3.5">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-card text-primary shadow-sm">
              <Wand2 className="size-5" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-semibold">How prompts are applied</p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                These prompts apply to <span className="font-semibold text-primary">all bid profiles</span>.
                Variables like <code className="font-mono">{'{{job_title}}'}</code> are filled in from
                the posting and the profile used to apply.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 pb-2">
          {PROMPT_DEFINITIONS.map((definition, index) => (
            <PromptSection
              key={definition.id}
              definition={definition}
              style={{ animationDelay: `${index * 70}ms` }}
            />
          ))}
        </div>
      </div>
    </>
  )
}
