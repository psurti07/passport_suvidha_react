import { Skeleton } from "@/components/ui/skeleton"

export default function PaymentMethodsLoading() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Page header skeleton */}
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-40" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-5 w-96" />
          </div>
          <Skeleton className="h-10 w-48" />
        </div>
      </div>

      {/* Payment methods list skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
      </div>

      {/* Information card skeleton */}
      <Skeleton className="h-48 w-full rounded-xl" />
    </div>
  )
}

