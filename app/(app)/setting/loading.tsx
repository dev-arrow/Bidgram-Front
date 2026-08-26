import { PageHeaderSkeleton } from '@/components/page-header-skeleton'
import { Skeleton } from '@/components/ui/skeleton'

export default function SettingLoading() {
  return (
    <>
      <PageHeaderSkeleton />

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 py-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-5 rounded-2xl border border-border p-6">
              <div className="flex items-center gap-3">
                <Skeleton className="size-9 shrink-0 rounded-lg" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-64" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Skeleton className="h-11 rounded-xl" />
                <Skeleton className="h-11 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
