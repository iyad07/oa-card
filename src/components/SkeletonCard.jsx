export default function SkeletonCard() {
  return (
    <div className="space-y-2 animate-pulse">
      {/* Hero skeleton: match BrandHero layout (h-96 with 80% hero, 20% identity strip) */}
      <div className="relative overflow-hidden rounded-2xl shadow-sm">
        <div className="relative bg-[#F3F8F8] h-96">
          {/* Top hero area */}
          <div className="absolute top-0 left-0 right-0 h-[80%] rounded-2xl overflow-hidden">
            <div className="h-full w-full bg-gray-200" />
          </div>
          {/* Identity strip */}
          <div className="absolute bottom-0 left-0 right-0 z-0 bg-[#F3F8F8] py-3 px-4 h-[20%]">
            <div className="flex items-center justify-between">
              <div className="flex flex-col justify-between">
                <div className="h-5 w-40 rounded bg-gray-200" />
                <div className="mt-1 h-4 w-56 rounded bg-gray-200" />
              </div>
              <div className="h-6 w-6 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Contacts skeleton */}
      <div className="rounded-2xl bg-white p-2 shadow-sm">
        <div className="space-y-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-4 w-4 rounded bg-gray-200" />
              <div className="flex-1">
                <div className="h-3 w-2/3 rounded bg-gray-200" />
                <div className="mt-1 h-3 w-1/3 rounded bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social skeleton */}
      <div className="flex items-center gap-2 justify-between">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-9 w-9 rounded-full bg-gray-200" />
        ))}
      </div>

      {/* Actions skeleton */}
      <div className="flex items-center gap-3">
        <div className="h-11 flex-1 rounded bg-gray-200" />
        <div className="h-11 w-11 rounded bg-gray-200" />
      </div>
    </div>
  )
}