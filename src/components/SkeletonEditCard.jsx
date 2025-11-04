export default function SkeletonEditCard() {
  return (
    <div className="rounded-2xl bg-[#F3F8F8] shadow-sm lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0 space-y-6 animate-pulse">
      {/* Left column: form skeleton */}
      <div className="space-y-6 p-4 rounded-xl">
        {/* Brand header (mobile only) */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="h-6 w-32 rounded bg-gray-200" />
        </div>

        {/* Back link */}
        <div className="h-4 w-20 rounded bg-gray-200" />

        {/* Page title */}
        <div className="h-7 w-2/3 rounded bg-gray-200" />

        {/* Full name */}
        <div className="space-y-2">
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="h-11 w-full rounded-xl bg-gray-200" />
        </div>

        {/* Phone number */}
        <div className="space-y-2">
          <div className="h-4 w-28 rounded bg-gray-200" />
          <div className="h-11 w-full rounded-xl bg-gray-200" />
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gray-200" />

        {/* Social Links heading */}
        <div className="h-4 w-24 rounded bg-gray-200" />

        {/* Social link rows */}
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-gray-200" />
            <div className="h-11 flex-1 rounded-xl bg-gray-200" />
          </div>
        ))}

        {/* Actions */}
        <div className="h-11 w-full rounded-xl bg-gray-200" />
      </div>

      {/* Right column: live preview card skeleton (hidden on mobile) */}
      <div className="hidden lg:block space-y-7 bg-white rounded-2xl p-4">
        <div className="h-96 rounded-2xl bg-gray-200" />
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
        <div className="flex items-center gap-2 justify-between">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-9 w-9 rounded-full bg-gray-200" />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="h-11 w-36 rounded bg-gray-200" />
          <div className="h-11 w-11 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  )
}