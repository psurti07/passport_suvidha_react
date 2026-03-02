import { Skeleton } from "@/components/ui/skeleton"

export default function PaymentReceiptLoading() {
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

      {/* Action buttons skeleton */}
      <div className="flex flex-wrap gap-3">
        <Skeleton className="h-10 w-36" />
        <Skeleton className="h-10 w-36" />
        <Skeleton className="h-10 w-36" />
        <Skeleton className="h-10 w-36" />
      </div>

      {/* Receipt card skeleton */}
      <Skeleton className="h-[600px] w-full rounded-xl" />

      {/* Related transactions skeleton */}
      <Skeleton className="h-64 w-full rounded-xl" />
    </div>
  )
}

