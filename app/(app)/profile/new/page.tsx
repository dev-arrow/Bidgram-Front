import type { Metadata } from 'next'
import { ProfileForm } from '@/components/profile/form/profile-form'

export const metadata: Metadata = {
  title: 'Create profile — Bidgram',
}

export default function NewProfilePage() {
  return <ProfileForm />
}
