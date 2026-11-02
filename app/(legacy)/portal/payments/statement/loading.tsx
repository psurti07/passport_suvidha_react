import { Skeleton } from "@/components/ui/skeleton"

export default function StatementLoading() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Page header skeleton */}
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-40" />
        <div>
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>
      </div>

      {/* Month selector and actions skeleton */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Skeleton className="h-10 w-64" />
        <div className="flex flex-wrap gap-3">
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-36" />
        </div>
      </div>

      {/* Statement card skeleton */}
      <Skeleton className="h-[500px] w-full rounded-xl" />

      {/* Statement archive skeleton */}
      <Skeleton className="h-64 w-full rounded-xl" />
    </div>
  )
}

