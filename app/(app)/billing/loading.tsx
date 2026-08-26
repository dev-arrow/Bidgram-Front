import { PageHeaderSkeleton } from '@/components/page-header-skeleton'
import { Skeleton } from '@/components/ui/skeleton'

export default function BillingLoading() {
  return (
    <>
      <PageHeaderSkeleton />

      <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-6 py-6 lg:px-8">
        <Skeleton className="h-20 shrink-0 rounded-2xl" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-4 rounded-2xl border border-border p-6">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-8 w-28" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
              <Skeleton className="mt-2 h-10 w-full rounded-xl" />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-border p-6">
          <Skeleton className="h-5 w-40" />
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
