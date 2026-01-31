export function SkeletonCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl p-6 backdrop-blur-xl bg-gradient-to-br from-white/5 via-white/5 to-white/5 border border-white/10 animate-pulse">
      <div className="h-6 w-3/4 bg-white/10 rounded mb-4" />
      <div className="h-4 w-1/2 bg-white/10 rounded mb-2" />
      <div className="h-4 w-1/3 bg-white/10 rounded" />
    </div>
  )
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2 animate-pulse">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-white/10 rounded"
          style={{ width: `${100 - (i * 20)}%` }}
        />
      ))}
    </div>
  )
}
