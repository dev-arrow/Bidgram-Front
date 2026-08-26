import { Skeleton } from '@/components/ui/skeleton'

/**
 * Loading placeholder that mirrors PageHeader's layout so route transitions
 * don't cause a layout jump once the real header mounts.
 */
export function PageHeaderSkeleton() {
  return (
    <header className="sticky top-0 z-10 flex flex-col gap-4 border-b border-border bg-background/85 px-6 py-5 backdrop-blur-md lg:flex-row lg:items-center lg:justify-between lg:px-8">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-64 rounded-xl" />
        <Skeleton className="size-10 shrink-0 rounded-xl" />
      </div>
    </header>
  )
}
