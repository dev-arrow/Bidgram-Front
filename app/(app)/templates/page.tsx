import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { TemplatesView } from '@/components/templates/templates-view'

export const metadata: Metadata = {
  title: 'Templates — Bidgram',
  description:
    'Browse résumé and cover letter templates and pick the one Bidgram uses for your applications.',
}

export default function TemplatesPage() {
  return (
    <>
      <PageHeader
        title="Templates"
        description="Pick a résumé and cover letter style. Click any card to make it your active template."
      />

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-6 py-6 lg:px-8">
        <TemplatesView />
      </div>
    </>
  )
}
