'use client'

import { useState, type ComponentType } from 'react'
import {
  Bug,
  CircleCheck,
  Frown,
  Heart,
  Lightbulb,
  Meh,
  MessageSquareHeart,
  Paperclip,
  Send,
  Smile,
  Star,
} from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

type Category = 'bug' | 'idea' | 'praise' | 'other'

const CATEGORIES: readonly {
  id: Category
  label: string
  description: string
  icon: ComponentType<{ className?: string }>
}[] = [
  { id: 'bug', label: 'Bug', description: 'Something is broken', icon: Bug },
  { id: 'idea', label: 'Idea', description: 'Suggest a feature', icon: Lightbulb },
  { id: 'praise', label: 'Praise', description: 'Something you love', icon: Heart },
  { id: 'other', label: 'Other', description: 'Anything else', icon: MessageSquareHeart },
]

const SENTIMENTS: readonly {
  value: number
  label: string
  icon: ComponentType<{ className?: string }>
}[] = [
  { value: 1, label: 'Frustrated', icon: Frown },
  { value: 2, label: 'Neutral', icon: Meh },
  { value: 3, label: 'Happy', icon: Smile },
]

type SubmissionStatus = 'shipped' | 'planned' | 'reviewing'

const PAST_SUBMISSIONS: readonly {
  id: string
  subject: string
  category: Category
  date: string
  status: SubmissionStatus
}[] = [
  { id: 'f-412', subject: 'Let me pin a profile to the top', category: 'idea', date: 'Aug 12, 2026', status: 'shipped' },
  { id: 'f-388', subject: 'Cover letter cut off at 200 chars', category: 'bug', date: 'Jul 30, 2026', status: 'shipped' },
  { id: 'f-355', subject: 'Bulk reject from review queue', category: 'idea', date: 'Jul 18, 2026', status: 'planned' },
  { id: 'f-341', subject: 'Add Lightning payments', category: 'idea', date: 'Jul 4, 2026', status: 'reviewing' },
]

const STATUS_STYLES: Record<SubmissionStatus, string> = {
  shipped: 'bg-primary/10 text-primary',
  planned: 'bg-brand-orange/15 text-brand-orange',
  reviewing: 'bg-secondary text-secondary-foreground',
}

const MAX_MESSAGE = 1000

export function FeedbackView() {
  const [category, setCategory] = useState<Category>('idea')
  const [sentiment, setSentiment] = useState<number | null>(null)
  const [rating, setRating] = useState<number>(0)
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const canSubmit = subject.trim().length > 2 && message.trim().length > 9

  function submit() {
    if (!canSubmit) return
    setSubmitted(true)
    toast.success('Feedback sent', { description: 'Thank you. The team reads every submission.' })
  }

  function reset() {
    setCategory('idea')
    setSentiment(null)
    setRating(0)
    setSubject('')
    setMessage('')
    setSubmitted(false)
  }

  return (
    <div className="grid gap-6 pb-2 xl:grid-cols-[minmax(0,1fr)_340px]">
      {/* Form */}
      {submitted ? (
        <section
          aria-label="Feedback sent"
          className="animate-fade-up flex flex-col items-center justify-center gap-4 rounded-2xl border border-primary/30 bg-accent/50 p-10 text-center"
        >
          <span className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground">
            <CircleCheck className="size-7" aria-hidden="true" />
          </span>
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold tracking-tight">Feedback sent</h2>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              We read every submission and reply to bugs within two business days.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={reset}>
            Send more feedback
          </Button>
        </section>
      ) : (
        <section
          aria-label="Send feedback"
          className="animate-fade-up flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
        >
          <div className="flex items-start gap-3.5 border-b border-border p-5 lg:p-6">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-primary">
              <MessageSquareHeart className="size-5" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-0.5">
              <h2 className="text-base font-bold tracking-tight">Tell us what to fix next</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Specific reports get shipped fastest. Include the job posting or profile if it helps.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 p-5 lg:p-6">
            {/* Category */}
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold">What kind of feedback is this?</p>
              <div
                role="radiogroup"
                aria-label="Feedback category"
                className="grid grid-cols-2 gap-2.5 sm:grid-cols-4"
              >
                {CATEGORIES.map((item) => {
                  const selected = category === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setCategory(item.id)}
                      className={cn(
                        'interactive-surface flex flex-col items-start gap-1.5 rounded-xl border p-3',
                        selected
                          ? 'border-primary bg-accent/70 ring-1 ring-primary/30'
                          : 'border-border hover:border-primary/30',
                      )}
                    >
                      <span
                        className={cn(
                          'grid size-7 place-items-center rounded-full transition-colors',
                          selected
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground',
                        )}
                      >
                        <item.icon className="size-3.5" />
                      </span>
                      <span
                        className={cn('text-sm font-bold', selected && 'text-primary')}
                      >
                        {item.label}
                      </span>
                      <span className="text-[11px] leading-snug text-muted-foreground">
                        {item.description}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Subject + message */}
            <Field>
              <FieldLabel htmlFor="subject" className="text-sm font-semibold">
                Subject
              </FieldLabel>
              <Input
                id="subject"
                value={subject}
                placeholder="Cover letter ignores the character limit"
                className="h-9"
                onChange={(event) => setSubject(event.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="message" className="text-sm font-semibold">
                Details
              </FieldLabel>
              <Textarea
                id="message"
                value={message}
                rows={7}
                maxLength={MAX_MESSAGE}
                placeholder={
                  category === 'bug'
                    ? 'What did you expect to happen, and what happened instead?'
                    : 'What would you like Bidgram to do differently?'
                }
                className="resize-y text-sm"
                onChange={(event) => setMessage(event.target.value)}
              />
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">
                  {message.length} / {MAX_MESSAGE}
                </p>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Paperclip data-icon="inline-start" />
                  Attach screenshot
                </Button>
              </div>
            </Field>

            {/* Sentiment */}
            <div className="flex flex-col gap-2 border-t border-border pt-5">
              <p className="text-sm font-semibold">
                How do you feel about Bidgram right now?
                <span className="ml-1.5 text-xs font-normal text-muted-foreground">Optional</span>
              </p>
              <div role="radiogroup" aria-label="Sentiment" className="flex gap-2">
                {SENTIMENTS.map((item) => {
                  const selected = sentiment === item.value
                  return (
                    <button
                      key={item.value}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      aria-label={item.label}
                      onClick={() => setSentiment(item.value)}
                      className={cn(
                        'flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition-all duration-200',
                        selected
                          ? 'border-primary bg-accent/70 text-primary ring-1 ring-primary/30'
                          : 'border-border text-muted-foreground hover:border-primary/30 hover:bg-muted/50',
                      )}
                    >
                      <item.icon className="size-4" />
                      {item.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Rating */}
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold">
                Rate your experience
                <span className="ml-1.5 text-xs font-normal text-muted-foreground">Optional</span>
              </p>
              <div className="flex items-center gap-1" role="radiogroup" aria-label="Star rating">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={rating === value}
                    aria-label={`${value} star${value === 1 ? '' : 's'}`}
                    onClick={() => setRating(value)}
                    className="rounded-md p-0.5 transition-transform duration-200 hover:scale-110"
                  >
                    <Star
                      className={cn(
                        'size-6 transition-colors',
                        value <= rating
                          ? 'fill-brand-orange text-brand-orange'
                          : 'text-muted-foreground/40',
                      )}
                    />
                  </button>
                ))}
                {rating > 0 ? (
                  <span className="ml-2 text-xs font-semibold text-muted-foreground">
                    {rating} / 5
                  </span>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-relaxed text-muted-foreground">
                Sent as <span className="font-semibold text-foreground">jane@example.com</span>
              </p>
              <Button onClick={submit} disabled={!canSubmit}>
                <Send data-icon="inline-start" />
                Send feedback
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Past submissions */}
      <aside className="flex flex-col gap-4">
        <section
          aria-label="Your past feedback"
          className="animate-fade-up overflow-hidden rounded-2xl border border-border bg-card"
          style={{ animationDelay: '70ms' }}
        >
          <div className="border-b border-border p-5">
            <h2 className="text-base font-bold tracking-tight">Your past feedback</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {PAST_SUBMISSIONS.filter((item) => item.status === 'shipped').length} of{' '}
              {PAST_SUBMISSIONS.length} shipped
            </p>
          </div>
          <ul className="divide-y divide-border">
            {PAST_SUBMISSIONS.map((item) => (
              <li key={item.id} className="flex flex-col gap-1.5 p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm leading-snug font-medium text-pretty">{item.subject}</p>
                  <span
                    className={cn(
                      'shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize',
                      STATUS_STYLES[item.status],
                    )}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="font-mono">{item.id}</span> &middot; {item.date}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-label="Response times"
          className="animate-fade-up rounded-2xl border border-primary/20 bg-accent/60 p-5"
          style={{ animationDelay: '140ms' }}
        >
          <h2 className="text-sm font-bold tracking-tight">What happens next</h2>
          <ul className="mt-3 flex flex-col gap-3">
            {[
              { label: 'Bugs', value: 'Reply within 2 business days' },
              { label: 'Ideas', value: 'Reviewed in the weekly roadmap' },
              { label: 'Praise', value: 'Shared with the whole team' },
            ].map((row) => (
              <li key={row.label} className="flex flex-col gap-0.5">
                <Badge variant="secondary" className="w-fit">
                  {row.label}
                </Badge>
                <span className="text-xs leading-relaxed text-muted-foreground">{row.value}</span>
              </li>
            ))}
          </ul>
        </section>
      </aside>
    </div>
  )
}
