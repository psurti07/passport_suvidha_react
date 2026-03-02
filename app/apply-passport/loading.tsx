export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute h-12 w-12 rounded-full border-4 border-navy/20"></div>
          <div className="absolute h-12 w-12 rounded-full border-4 border-t-navy animate-spin"></div>
        </div>
        <p className="text-muted-foreground">Loading application form...</p>
      </div>
    </div>
  )
}

