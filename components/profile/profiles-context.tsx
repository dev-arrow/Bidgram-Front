'use client'

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { profiles as initialProfiles, type Profile } from '@/lib/profiles'

type ProfilesContextValue = {
  profiles: Profile[]
  activeCount: number
  toggleInUse: (id: string) => void
  deleteProfile: (id: string) => void
}

const ProfilesContext = createContext<ProfilesContextValue | null>(null)

/**
 * Holds the shared "in use" state for every profile so the Chrome extension
 * banner, the "In use" stat card, and each profile's own toggle (grid card or
 * table row) always agree on the current count — flipping one profile's
 * toggle anywhere on the page updates every other place that count appears.
 */
export function ProfilesProvider({ children }: { children: ReactNode }) {
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles)

  const toggleInUse = (id: string) => {
    setProfiles((prev) =>
      prev.map((profile) => (profile.id === id ? { ...profile, inUse: !profile.inUse } : profile)),
    )
  }

  const deleteProfile = (id: string) => {
    setProfiles((prev) => prev.filter((profile) => profile.id !== id))
  }

  const activeCount = useMemo(
    () => profiles.filter((profile) => profile.inUse).length,
    [profiles],
  )

  return (
    <ProfilesContext.Provider value={{ profiles, activeCount, toggleInUse, deleteProfile }}>
      {children}
    </ProfilesContext.Provider>
  )
}

export function useProfilesContext() {
  const context = useContext(ProfilesContext)
  if (!context) {
    throw new Error('useProfilesContext must be used within a ProfilesProvider')
  }
  return context
}
