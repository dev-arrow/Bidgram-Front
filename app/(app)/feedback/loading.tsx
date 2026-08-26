import { PageHeaderSkeleton } from '@/components/page-header-skeleton'
import { Skeleton } from '@/components/ui/skeleton'

export default function FeedbackLoading() {
  return (
    <>
      <PageHeaderSkeleton />

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 py-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-5">
          <div className="flex gap-2">
            <Skeleton className="h-9 w-28 rounded-lg" />
            <Skeleton className="h-9 w-28 rounded-lg" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-32 w-full rounded-xl" />
          </div>
          <Skeleton className="h-10 w-32 self-end rounded-xl" />
        </div>
      </div>
    </>
  )
}
