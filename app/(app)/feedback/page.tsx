import type { Metadata } from 'next'
import { FeedbackView } from '@/components/feedback/feedback-view'
import { PageHeader } from '@/components/page-header'

export const metadata: Metadata = {
  title: 'Feedback — Bidgram',
  description: 'Report a bug, suggest a feature, or tell the Bidgram team what is working.',
}

export default function FeedbackPage() {
  return (
    <>
      <PageHeader
        title="Feedback"
        description="Report a bug or suggest a feature. Every submission reaches the team building Bidgram."
      />

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 py-6 lg:px-8">
        <FeedbackView />
      </div>
    </>
  )
}
