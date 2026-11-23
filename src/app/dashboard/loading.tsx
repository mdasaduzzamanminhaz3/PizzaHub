import React from "react";

export default function DashboardGlobalLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Top Header Card Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-orange-200/80 bg-white px-6 py-5 shadow-2xs">
        <div className="space-y-2">
          <div className="h-7 w-52 rounded-xl bg-stone-200/80" />
          <div className="h-4 w-72 max-w-full rounded-lg bg-stone-100" />
        </div>
        <div className="h-10 w-36 rounded-full bg-orange-100/80" />
      </div>

      {/* Summary KPI Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-3xl border border-orange-200/80 bg-white p-5 space-y-3 shadow-2xs"
          >
            <div className="flex items-center justify-between">
              <div className="h-3.5 w-24 rounded-lg bg-stone-100" />
              <div className="h-8 w-8 rounded-xl bg-orange-100/80" />
            </div>
            <div className="h-7 w-20 rounded-xl bg-stone-200/80" />
            <div className="h-3 w-32 rounded-lg bg-stone-100" />
          </div>
        ))}
      </div>

      {/* Main Content Block Skeleton */}
      <div className="rounded-3xl border border-orange-200/80 bg-white p-6 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="h-5 w-44 rounded-lg bg-stone-200/80" />
          <div className="h-8 w-28 rounded-full bg-orange-100/75" />
        </div>

        <div className="space-y-3 pt-1">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-4 rounded-2xl border border-orange-100 bg-[#FAF7F2]/60 px-4 py-3.5"
            >
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                <div className="h-11 w-11 shrink-0 rounded-xl bg-orange-100/80" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-4 w-44 rounded-lg bg-stone-200/80" />
                  <div className="h-3 w-60 max-w-full rounded-lg bg-stone-100" />
                </div>
              </div>
              <div className="h-7 w-20 shrink-0 rounded-full bg-stone-200/70" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}