'use client'

import { useState } from 'react'
import { Trash2, TriangleAlert } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useProfilesContext } from '@/components/profile/profiles-context'

/**
 * Trash button that opens a confirmation dialog before removing a profile.
 * Shared by both the profile grid card and the profile table row so the
 * delete-with-confirm behavior stays identical everywhere.
 */
export function DeleteProfileButton({
  id,
  name,
  size = 'icon',
}: {
  id: string
  name: string
  size?: 'icon' | 'icon-sm'
}) {
  const { deleteProfile } = useProfilesContext()
  const [open, setOpen] = useState(false)

  function handleDelete() {
    deleteProfile(id)
    setOpen(false)
    toast.success('Profile deleted', {
      description: `${name} has been removed.`,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button variant="outline" size={size} aria-label={`Delete ${name}`} />}
      >
        <Trash2 />
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <span className="grid size-11 place-items-center rounded-full bg-destructive/10 text-destructive">
            <TriangleAlert className="size-5" aria-hidden="true" />
          </span>
          <DialogTitle>Delete profile?</DialogTitle>
          <DialogDescription>
            This will permanently remove{' '}
            <span className="font-semibold text-foreground">{name}</span> and its application
            history. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 data-icon="inline-start" />
            Delete profile
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
