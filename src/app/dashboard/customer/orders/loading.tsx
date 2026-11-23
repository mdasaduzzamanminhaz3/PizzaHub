import React from "react";

export default function CustomerOrdersLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Page Header & Order More CTA Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-orange-200/80 bg-white px-6 py-5 shadow-2xs">
        <div className="space-y-2">
          <div className="h-7 w-48 rounded-xl bg-stone-200/85" />
          <div className="h-4 w-80 max-w-full rounded-lg bg-stone-100" />
        </div>
        <div className="h-10 w-36 rounded-full bg-red-100/85" />
      </div>

      {/* PizzaOrderCard List Skeleton */}
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-3xl border border-orange-200/80 bg-white p-5 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4"
          >
            {/* Left Pizza & Order Details */}
            <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
              <div className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-2xl border border-orange-100 bg-orange-100/75" />

              <div className="space-y-2 min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="h-5 w-44 rounded-lg bg-stone-200/85" />
                  <div className="h-5 w-20 rounded-full bg-amber-100/80" />
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                  <div className="h-3.5 w-32 rounded-lg bg-stone-100" />
                  <div className="h-3.5 w-28 rounded-lg bg-stone-100" />
                  <div className="h-3.5 w-20 rounded-lg bg-stone-100" />
                </div>

                <div className="h-3.5 w-52 max-w-full rounded-lg bg-stone-100" />
              </div>
            </div>

            {/* Right Action Buttons (Details & Cancel) */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <div className="h-9 w-22 rounded-full border border-orange-200/70 bg-[#FAF7F2]" />
              <div className="h-9 w-22 rounded-full bg-red-100/80" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}