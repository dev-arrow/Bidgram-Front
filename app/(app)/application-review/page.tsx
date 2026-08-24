import type { Metadata } from 'next'
import { ApplicationReviewView } from '@/components/application-review/application-review-view'

export const metadata: Metadata = {
  title: 'Application Review — Bidgram',
  description: 'Review and organize your Bidgram job applications.',
}

export default function ApplicationReviewPage() {
  return <ApplicationReviewView />
}
