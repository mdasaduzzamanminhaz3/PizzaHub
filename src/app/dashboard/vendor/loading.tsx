import React from "react";

export default function VendorOverviewLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* 5 Stat Cards Skeleton (matches VendorStatCards grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-3xl border border-orange-200/80 bg-white p-5 shadow-2xs"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="h-3 w-24 rounded-md bg-stone-200/80" />
              <div className="h-8 w-8 shrink-0 rounded-xl bg-orange-100/80" />
            </div>
            <div className="mt-3 h-8 w-16 rounded-xl bg-stone-200/85" />
          </div>
        ))}
      </div>

      {/* Weekly Kitchen Order Volume Chart Skeleton (matches h-72 Card) */}
      <div className="rounded-3xl border border-orange-200/80 bg-white p-6 shadow-sm shadow-orange-950/5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="space-y-1.5">
            <div className="h-5 w-52 rounded-lg bg-stone-200/85" />
            <div className="h-3.5 w-64 rounded-lg bg-stone-100" />
          </div>
          <div className="h-7 w-28 rounded-full border border-orange-200/70 bg-[#FAF7F2]" />
        </div>

        {/* Chart Area Placeholder (h-72 = 288px) */}
        <div className="h-72 w-full rounded-2xl border border-orange-100 bg-[#FAF7F2]/70 p-4 flex flex-col justify-between">
          <div className="space-y-6 my-auto">
            <div className="h-px w-full border-t border-dashed border-orange-200/70" />
            <div className="h-px w-full border-t border-dashed border-orange-200/70" />
            <div className="h-px w-full border-t border-dashed border-orange-200/70" />
            <div className="h-px w-full border-t border-dashed border-orange-200/70" />
          </div>

          <div className="flex items-center justify-between px-2 pt-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div
                key={day}
                className="h-3 w-7 rounded-md bg-stone-200/70"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}