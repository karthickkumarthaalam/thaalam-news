function Bone({ w = "w-full", h = "h-4", mb = "mb-0" }) {
  return (
    <div
      className={`${w} ${h} ${mb} rounded bg-gradient-to-r from-[#E8E4DF] via-[#F0ECE7] to-[#E8E4DF] bg-[length:1200px_100%] animate-shimmer`}
    />
  );
}

export function BigSkeleton() {
  return (
    <div>
      <div className="w-full -[400px] md:h-[280px] sm:h-[220px] mb-4 bg-gradient-to-r from-[#E8E4DF] via-[#F0ECE7] to-[#E8E4DF] bg-[length:1200px_100%] animate-shimmer" />
      <div className="h-[3px] bg-[#E8E4DF] mb-4" />
      <Bone w="w-[80px]" h="h-[11px]" mb="mb-2" />
      <Bone w="w-[90%]" h="h-[26px]" mb="mb-2" />
      <Bone w="w-[72%]" h="h-[26px]" mb="mb-3" />
      <Bone w="w-full" h="h-[14px]" mb="mb-1" />
      <Bone w="w-[85%]" h="h-[14px]" mb="mb-1" />
      <Bone w="w-[60%]" h="h-[14px]" />
    </div>
  );
}

export function NewsDetailsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="overflow-hidden rounded-2xl mb-6">
        <div className="w-full h-[240px] sm:h-[320px] md:h-[460px] bg-gradient-to-r from-[#E8E4DF] via-[#F5F2EE] to-[#E8E4DF] bg-[length:1200px_100%] animate-shimmer" />
      </div>

      <div className="flex items-center gap-4 mb-4">
        <Bone w="w-[90px]" h="h-[12px]" />
        <Bone w="w-[120px]" h="h-[12px]" />
      </div>

      <div className="mb-5">
        <Bone w="w-[95%]" h="h-[34px]" mb="mb-3" />
        <Bone w="w-[72%]" h="h-[34px]" />
      </div>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#E8E4DF] via-[#F5F2EE] to-[#E8E4DF] bg-[length:1200px_100%] animate-shimmer" />
        <div className="flex flex-col gap-2">
          <Bone w="w-[120px]" h="h-[12px]" />
          <Bone w="w-[90px]" h="h-[10px]" />
        </div>
      </div>

      <div className="space-y-3 mb-8">
        <Bone w="w-full" h="h-[16px]" />
        <Bone w="w-[96%]" h="h-[16px]" />
        <Bone w="w-[93%]" h="h-[16px]" />
        <Bone w="w-[88%]" h="h-[16px]" />
        <Bone w="w-[98%]" h="h-[16px]" />
        <Bone w="w-[74%]" h="h-[16px]" />
      </div>

      <div className="p-5 rounded-2xl border border-[#ECE7E1] bg-[#FAF8F5] mb-8">
        <Bone w="w-[150px]" h="h-[14px]" mb="mb-4" />
        <Bone w="w-full" h="h-[15px]" mb="mb-2" />
        <Bone w="w-[90%]" h="h-[15px]" mb="mb-2" />
        <Bone w="w-[68%]" h="h-[15px]" />
      </div>

      <div className="space-y-3 mb-10">
        <Bone w="w-full" h="h-[16px]" />
        <Bone w="w-[95%]" h="h-[16px]" />
        <Bone w="w-[87%]" h="h-[16px]" />
        <Bone w="w-[92%]" h="h-[16px]" />
        <Bone w="w-[65%]" h="h-[16px]" />
      </div>

      <div className="flex flex-wrap gap-3 pt-5 border-t border-[#ECE7E1]">
        <Bone w="w-[90px]" h="h-[36px]" />
        <Bone w="w-[110px]" h="h-[36px]" />
        <Bone w="w-[80px]" h="h-[36px]" />
      </div>
    </div>
  );
}

export function SideSkeleton() {
  return (
    <div className="pb-5 mb-5 border-b border-gray-200 last:border-none last:mb-0">
      <div className="w-full h-[140px] mb-3 bg-gradient-to-r from-[#E8E4DF] via-[#F0ECE7] to-[#E8E4DF] bg-[length:1200px_100%] animate-shimmer" />
      <Bone w="w-[60px]" h="h-[10px]" mb="mb-2" />
      <Bone w="w-[95%]" h="h-[14px]" mb="mb-1" />
      <Bone w="w-[75%]" h="h-[14px]" />
    </div>
  );
}

export function SmallSkeleton() {
  return (
    <div>
      <div className="w-full h-[200px] mb-3 bg-gradient-to-r from-[#E8E4DF] via-[#F0ECE7] to-[#E8E4DF] bg-[length:1200px_100%] animate-shimmer" />
      <Bone w="w-[55px]" h="h-[11px]" mb="mb-2" />
      <Bone w="w-[95%]" h="h-[16px]" mb="mb-1" />
      <Bone w="w-[70%]" h="h-[16px]" />
    </div>
  );
}

export function CompactSkeleton() {
  return (
    <div className="p-5 border-r border-gray-200 last:border-0">
      <Bone w="w-[50px]" h="h-[9px]" mb="mb-2" />
      <Bone w="w-full" h="h-[14px]" mb="mb-1" />
      <Bone w="w-[90%]" h="h-[14px]" mb="mb-1" />
      <Bone w="w-[70%]" h="h-[14px]" mb="mb-3" />
      <Bone w="w-full" h="h-[12px]" mb="mb-1" />
      <Bone w="w-[80%]" h="h-[12px]" mb="mb-3" />
      <Bone w="w-[55px]" h="h-[9px]" />
    </div>
  );
}
