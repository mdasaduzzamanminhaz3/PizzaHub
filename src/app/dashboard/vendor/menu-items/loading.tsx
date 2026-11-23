import React from "react";

export default function VendorMenuItemsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Page Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-orange-200/80 bg-white px-6 py-5 shadow-2xs">
        <div className="space-y-2">
          <div className="h-7 w-44 rounded-xl bg-stone-200/80" />
          <div className="h-4 w-64 rounded-lg bg-stone-100" />
        </div>
        <div className="h-10 w-36 rounded-full bg-red-100/80" />
      </div>

      {/* PlanAllowanceBanner Skeleton */}
      <div className="rounded-3xl border border-orange-200/80 bg-orange-50/70 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-2 flex-1">
          <div className="h-4 w-48 rounded-lg bg-orange-200/70" />
          <div className="h-3 w-72 max-w-full rounded-lg bg-orange-200/50" />
        </div>
        <div className="h-2.5 w-full sm:w-44 rounded-full bg-orange-200/70" />
      </div>

      {/* 2-Column VendorMenuItemCard Grid Skeleton */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-3xl border border-orange-200/80 bg-white p-4 flex items-center gap-4 shadow-2xs"
          >
            {/* Square Thumbnail */}
            <div className="h-20 w-20 sm:h-22 sm:w-22 shrink-0 rounded-2xl border border-orange-100 bg-orange-100/75" />

            {/* Content & Action Buttons */}
            <div className="min-w-0 flex-1 space-y-2">
              {/* Title + Status Pill */}
              <div className="flex items-start justify-between gap-2">
                <div className="h-4 w-40 rounded-lg bg-stone-200/85" />
                <div className="h-5 w-18 shrink-0 rounded-full bg-emerald-100/80" />
              </div>

              {/* Category + Price */}
              <div className="h-3.5 w-36 rounded-lg bg-stone-100" />

              {/* Edit, Set Active/Inactive & Delete Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <div className="h-8 w-16 rounded-full bg-orange-100/80" />
                <div className="h-8 w-24 rounded-full bg-stone-100" />
                <div className="h-8 w-18 rounded-full bg-red-100/70" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}