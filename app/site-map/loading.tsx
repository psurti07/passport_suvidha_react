import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">                
      <main className="flex-1">
        <section className="w-full py-12 md:py-16 lg:py-20 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <Skeleton className="h-12 w-64 mx-auto mb-4" />
              <Skeleton className="h-6 w-full max-w-md mx-auto" />
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-xl border-0 shadow-lg overflow-hidden h-full bg-white p-6">
                    <div className="h-1 w-full bg-gray-200 mb-6"></div>
                    <div className="flex items-center gap-2 mb-6">
                      <Skeleton className="h-5 w-5 rounded-full" />
                      <Skeleton className="h-6 w-32" />
                    </div>
                    <div className="space-y-4">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <Skeleton className="h-4 w-4 rounded-full" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-navy/5 rounded-xl p-6 border border-navy/10 mb-8">
                <Skeleton className="h-8 w-48 mb-4" />
                <Skeleton className="h-4 w-full mb-4" />
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <Skeleton className="h-10 w-24" />
                </div>
              </div>

              <div className="bg-teal/5 rounded-xl p-6 border border-teal/10">
                <Skeleton className="h-8 w-48 mb-4" />
                <Skeleton className="h-4 w-full mb-4" />
                <div className="flex flex-col sm:flex-row gap-4">
                  <Skeleton className="h-10 w-40" />
                  <Skeleton className="h-10 w-32" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>      
    </div>
  )
}

