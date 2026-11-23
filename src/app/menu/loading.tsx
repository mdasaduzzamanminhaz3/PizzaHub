import React from "react";

export default function MenuPageLoading() {
  return (
    <section className="relative py-12 md:py-16 bg-[#FFFDFB] animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Live Count Pill Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
          <div className="space-y-2">
            <div className="h-3 w-40 rounded-md bg-red-100/85" />
            <div className="h-9 w-60 rounded-xl bg-stone-200/85" />
            <div className="h-4 w-80 max-w-full rounded-lg bg-stone-100" />
          </div>

          <div className="h-9 w-40 self-start sm:self-end rounded-full bg-orange-50/90 border border-orange-200/70" />
        </div>

        {/* Filter Bar Skeleton */}
        <div className="rounded-2xl bg-white border border-orange-200/75 p-4 mb-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 shadow-2xs">
          <div className="h-11 rounded-xl border border-orange-100 bg-[#FAF7F2]/80" />
          <div className="h-11 rounded-xl border border-orange-100 bg-[#FAF7F2]/80" />
          <div className="h-11 rounded-xl border border-orange-100 bg-[#FAF7F2]/80" />
          <div className="h-11 rounded-xl border border-orange-100 bg-[#FAF7F2]/80" />
        </div>

        {/* 3-Column MenuItemCard Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-orange-200/75 bg-white overflow-hidden shadow-2xs"
            >
              {/* Dish Image Placeholder */}
              <div className="h-48 w-full bg-orange-100/75 border-b border-orange-100" />

              {/* Dish Content */}
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="h-5 w-40 rounded-lg bg-stone-200/85" />
                  <div className="h-5 w-14 shrink-0 rounded-lg bg-red-100/80" />
                </div>

                <div className="space-y-1.5">
                  <div className="h-3.5 w-full rounded-md bg-stone-100" />
                  <div className="h-3.5 w-4/5 rounded-md bg-stone-100" />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-orange-100/80">
                  <div className="h-3.5 w-28 rounded-md bg-stone-100" />
                  <div className="h-9 w-28 rounded-full bg-red-100/85" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}