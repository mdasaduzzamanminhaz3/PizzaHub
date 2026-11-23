import React from "react";

export default function PartnerPizzeriasListSkeleton() {
  return (
    <section className="relative py-12 md:py-16 bg-[#FFFDFB] animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Skeleton */}
        <div className="mb-8 md:mb-10 space-y-2">
          <div className="h-3 w-48 rounded-md bg-red-100/85" />
          <div className="h-9 w-56 rounded-xl bg-stone-200/85" />
          <div className="h-4 w-80 max-w-full rounded-lg bg-stone-100" />
        </div>

        {/* 3-Column Partner Pizzerias Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-orange-200/80 bg-white p-5 shadow-2xs"
            >
              <div className="flex items-start gap-4">
                {/* Avatar Placeholder (h-16 w-16 rounded-2xl) */}
                <div className="h-16 w-16 shrink-0 rounded-2xl border border-orange-200/70 bg-orange-100/75" />

                {/* Card Content */}
                <div className="min-w-0 flex-1 space-y-2.5">
                  {/* Name & Pro Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="h-5 w-36 rounded-lg bg-stone-200/85" />
                    <div className="h-5 w-12 shrink-0 rounded-full bg-amber-100/80" />
                  </div>

                  {/* Location */}
                  <div className="h-3.5 w-24 rounded-md bg-stone-100" />

                  {/* Rating & Active Menu Pill */}
                  <div className="mt-3 flex items-center justify-between border-t border-orange-100 pt-3">
                    <div className="h-4 w-12 rounded-md bg-amber-100/70" />
                    <div className="h-6 w-28 rounded-full bg-[#FAF7F2] border border-orange-100" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}