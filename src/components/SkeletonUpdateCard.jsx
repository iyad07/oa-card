export default function SkeletonUpdateCard() {
  return (
    <div className="space-y-2 lg:flex lg:flex-row lg:gap-4 animate-pulse">
      {/* Left column skeleton (card) */}
      <div className="w-full lg:w-[90%] space-y-2">
        <div className="relative overflow-hidden rounded-2xl shadow-sm">
          <div className="h-96 rounded-2xl bg-gray-200" />
        </div>
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
        <div className="flex items-center gap-3">
          <div className="h-11 w-36 rounded bg-gray-200" />
          <div className="h-11 w-11 rounded bg-gray-200" />
        </div>
      </div>

      {/* Right column skeleton (actions list) */}
      <div className="hidden lg:block">
        <div className="space-y-3">
          <div className="h-5 w-24 rounded bg-gray-200" />
          <div className="h-5 w-28 rounded bg-gray-200" />
          <div className="h-5 w-20 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  )
}