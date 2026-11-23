import React from "react";

export default function MenuItemDetailsLoading() {
  return (
    <section className="min-h-screen bg-[#FFFDFB] py-8 md:py-12 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Back Link Skeleton */}
        <div className="h-5 w-40 rounded-lg bg-stone-200/75 mb-6" />

        {/* Main Details & Order Layout Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Image Gallery + Dish Details Card */}
          <div className="lg:col-span-7 space-y-6">
            {/* Main Hero Photo (aspect-[16/11]) */}
            <div className="aspect-[16/11] w-full rounded-3xl bg-orange-100/75 border border-orange-200/70 shadow-sm" />

            {/* Thumbnails Row */}
            <div className="flex items-center gap-3">
              <div className="w-20 h-16 rounded-2xl bg-orange-100/80 border-2 border-[#dc2626]/40" />
              <div className="w-20 h-16 rounded-2xl bg-orange-100/60 border border-orange-200/70" />
            </div>

            {/* Dish Info Card */}
            <div className="rounded-3xl bg-white border border-orange-200/75 p-6 sm:p-7 shadow-xs space-y-5">
              {/* Top Badges Row */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="h-6 w-32 rounded-full bg-red-50 border border-red-100" />
                <div className="h-4 w-36 rounded-lg bg-stone-100" />
              </div>

              {/* Title & Price */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div className="h-8 w-3/5 rounded-xl bg-stone-200/85" />
                <div className="h-8 w-20 rounded-xl bg-red-100/85" />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="h-4 w-full rounded-md bg-stone-100" />
                <div className="h-4 w-full rounded-md bg-stone-100" />
                <div className="h-4 w-2/3 rounded-md bg-stone-100" />
              </div>

              {/* Oven Highlights */}
              <div className="flex flex-wrap gap-3 pt-1">
                <div className="h-8 w-36 rounded-xl bg-[#FAF7F2]" />
                <div className="h-8 w-44 rounded-xl bg-[#FAF7F2]" />
              </div>

              {/* Kitchen / Vendor Footer */}
              <div className="pt-4 border-t border-orange-100 flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-orange-100/80" />
                <div className="space-y-1.5">
                  <div className="h-3 w-20 rounded-md bg-stone-100" />
                  <div className="h-4 w-32 rounded-md bg-stone-200/80" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Delivery Order Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-white border border-orange-200/80 p-6 sm:p-7 shadow-sm space-y-5">
              <div className="space-y-1.5">
                <div className="h-6 w-44 rounded-lg bg-stone-200/85" />
                <div className="h-4 w-72 max-w-full rounded-md bg-stone-100" />
              </div>

              {/* Quantity Selector Box */}
              <div className="h-14 w-full rounded-2xl bg-[#FAF7F2] border border-orange-200/60" />

              {/* Delivery Date, Phone & Address */}
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="h-3 w-28 rounded-md bg-stone-200/75" />
                  <div className="h-11 w-full rounded-xl bg-[#FAF7F2] border border-orange-200/70" />
                </div>
              ))}

              {/* Special Instructions Textarea */}
              <div className="space-y-1.5">
                <div className="h-3 w-40 rounded-md bg-stone-200/75" />
                <div className="h-20 w-full rounded-xl bg-[#FAF7F2] border border-orange-200/70" />
              </div>

              {/* Order Total Box */}
              <div className="h-13 w-full rounded-2xl bg-[#FAF7F2] border border-orange-200/60" />

              {/* Submit Button */}
              <div className="h-12 w-full rounded-xl bg-red-100/85" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}