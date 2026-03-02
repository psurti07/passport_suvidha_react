import { Skeleton } from "@/components/ui/skeleton"

export default function AddPaymentMethodLoading() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Page header skeleton */}
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-40" />
        <div>
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>
      </div>

      {/* Payment method form skeleton */}
      <Skeleton className="h-[700px] w-full rounded-xl" />

      {/* Security information skeleton */}
      <Skeleton className="h-32 w-full rounded-xl" />
    </div>
  )
}

