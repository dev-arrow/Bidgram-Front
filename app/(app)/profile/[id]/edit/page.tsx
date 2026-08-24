import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProfileForm } from '@/components/profile/form/profile-form'
import { getProfileById } from '@/lib/profile-form'

export const metadata: Metadata = {
  title: 'Edit profile — Bidgram',
}

export default async function EditProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const profile = getProfileById(id)
  if (!profile) notFound()
  return <ProfileForm profile={profile} />
}
