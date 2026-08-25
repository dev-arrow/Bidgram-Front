'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Check } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import {
  AddressLinksSection,
  ProfileDetailsSection,
  ResumeUploadSection,
} from '@/components/profile/form/personal-sections'
import {
  CertificationsSection,
  EducationSection,
  LanguagesSection,
  ReferencesSection,
  WorkExperienceSection,
} from '@/components/profile/form/history-sections'
import {
  ApplicationDefaultsSection,
  PreferencesSection,
} from '@/components/profile/form/application-sections'
import {
  FormSectionNav,
  type FormSectionLink,
} from '@/components/profile/form/form-section-nav'
import type { Profile } from '@/lib/profiles'

const FORM_SECTIONS: FormSectionLink[] = [
  { id: 'section-resume', label: 'Resume' },
  { id: 'section-details', label: 'Profile details' },
  { id: 'section-address', label: 'Address & links' },
  { id: 'section-experience', label: 'Work experience' },
  { id: 'section-education', label: 'Education' },
  { id: 'section-certifications', label: 'Certifications' },
  { id: 'section-languages', label: 'Languages' },
  { id: 'section-references', label: 'References' },
  { id: 'section-defaults', label: 'Application defaults' },
  { id: 'section-preferences', label: 'Preferences' },
]

export type ProfileDefaults = {
  firstName: string
  lastName: string
  email: string
  phone: string
  title: string
  city: string
  state: string
}

function toDefaults(profile?: Profile): ProfileDefaults {
  if (!profile) {
    return { firstName: '', lastName: '', email: '', phone: '', title: '', city: '', state: '' }
  }
  const [firstName, ...rest] = profile.name.split(' ')
  const [city, state] = profile.address.split(',').map((part) => part.trim())
  return {
    firstName,
    lastName: rest.join(' '),
    email: profile.email,
    phone: profile.phone,
    title: profile.title,
    city: city ?? '',
    state: state ?? '',
  }
}

export function ProfileForm({ profile }: { profile?: Profile }) {
  const router = useRouter()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [pending, setPending] = useState(false)
  const isEditing = Boolean(profile)
  const defaults = toDefaults(profile)

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setTimeout(() => {
      toast.success(isEditing ? 'Profile updated' : 'Profile created', {
        description: isEditing
          ? 'Your changes have been saved.'
          : 'Your new bid profile is ready to use.',
      })
      router.push('/profile')
    }, 800)
  }

  return (
    <form onSubmit={onSubmit} className="flex min-h-0 flex-1 flex-col">
      <header className="z-10 flex shrink-0 flex-col gap-3 border-b border-border bg-background/85 px-6 py-5 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Back to profiles"
            render={<Link href="/profile" />}
            nativeButton={false}
          >
            <ArrowLeft />
          </Button>
          <div className="flex flex-col gap-0.5">
            <h1 className="text-2xl font-extrabold tracking-tight">
              {isEditing ? 'Edit profile' : 'Create profile'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isEditing
                ? `Update the details for ${profile?.name}.`
                : 'Fill in the details Bidgram uses to auto-apply on your behalf.'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" render={<Link href="/profile" />} nativeButton={false}>
            Cancel
          </Button>
          <Button type="submit" disabled={pending}>
            {pending ? <Spinner data-icon="inline-start" /> : <Check data-icon="inline-start" />}
            {isEditing ? 'Save changes' : 'Create profile'}
          </Button>
        </div>
      </header>

      <div className="mx-auto flex max-w-4xl flex-col gap-5 px-6 py-6 lg:px-8">
        <ResumeUploadSection />
        <ProfileDetailsSection defaults={defaults} />
        <AddressLinksSection defaults={defaults} />
        <WorkExperienceSection />
        <EducationSection />
        <CertificationsSection />
        <LanguagesSection />
        <ReferencesSection />
        <ApplicationDefaultsSection />
        <PreferencesSection />

        <div className="flex items-center justify-end gap-2 pb-4">
          <Button type="button" variant="outline" render={<Link href="/profile" />} nativeButton={false}>
            Cancel
          </Button>
          <Button type="submit" disabled={pending}>
            {pending ? <Spinner data-icon="inline-start" /> : <Check data-icon="inline-start" />}
            {isEditing ? 'Save changes' : 'Create profile'}
          </Button>
        </div>
      </div>
    </form>
  )
}
