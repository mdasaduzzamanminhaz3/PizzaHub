import React from "react";

export default function AdminDashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Top Header & Pending Review CTA Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-orange-200/80 bg-white px-6 py-5 shadow-2xs">
        <div className="space-y-2">
          <div className="h-7 w-64 rounded-xl bg-stone-200/85" />
          <div className="h-4 w-80 max-w-full rounded-lg bg-stone-100" />
        </div>
        <div className="h-10 w-56 rounded-full bg-amber-100/85" />
      </div>

      {/* 6 Stat Cards Skeleton (matches AdminStatCards lg:grid-cols-3) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-3xl border border-orange-200/80 bg-white p-5 shadow-2xs"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="h-3 w-28 rounded-md bg-stone-200/80" />
              <div className="h-8 w-8 shrink-0 rounded-xl bg-orange-100/80" />
            </div>
            <div className="mt-3 h-8 w-16 rounded-xl bg-stone-200/85" />
          </div>
        ))}
      </div>

      {/* Platform Order & Subscription Trend Chart Skeleton (matches h-64 Card) */}
      <div className="rounded-3xl border border-orange-200/80 bg-white p-6 shadow-sm shadow-orange-950/5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="space-y-1.5">
            <div className="h-5 w-60 rounded-lg bg-stone-200/85" />
            <div className="h-3.5 w-72 max-w-full rounded-lg bg-stone-100" />
          </div>
          <div className="h-7 w-24 rounded-full border border-orange-200/70 bg-[#FAF7F2]" />
        </div>

        {/* Chart Area Placeholder (h-64 = 256px) */}
        <div className="h-64 w-full rounded-2xl border border-orange-100 bg-[#FAF7F2]/70 p-4 flex flex-col justify-between">
          <div className="space-y-5 my-auto">
            <div className="h-px w-full border-t border-dashed border-orange-200/70" />
            <div className="h-px w-full border-t border-dashed border-orange-200/70" />
            <div className="h-px w-full border-t border-dashed border-orange-200/70" />
            <div className="h-px w-full border-t border-dashed border-orange-200/70" />
          </div>

          <div className="flex items-center justify-between px-2 pt-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} className="h-3 w-7 rounded-md bg-stone-200/70" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}