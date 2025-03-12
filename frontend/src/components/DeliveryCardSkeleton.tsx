const DeliveryCardSkeleton = () => {
  return (
    <div className="bg-white rounded shadow-lg p-6 relative w-full max-w-[752px] animate-pulse">
      <div className="mt-14 md:mt-0 md:grid md:grid-cols-2 md:gap-6">
        {/* Mobile skeleton */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-10 md:hidden">
          <div className="w-24 h-24 bg-gray-200 rounded-full" />
        </div>

        {/* Desktop skeleton */}
        <div className="hidden md:block">
          <div className="relative w-full aspect-square bg-gray-200 rounded" />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="text-center md:text-left space-y-4">
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded w-3/4" />
              <div className="h-20 bg-gray-200 rounded" />
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
              <div className="h-8 bg-gray-200 rounded w-1/3" />
            </div>

            <div className="flex gap-3 justify-between">
              <div className="w-1/2 h-10 bg-gray-200 rounded" />
              <div className="w-1/2 h-10 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeliveryCardSkeleton
