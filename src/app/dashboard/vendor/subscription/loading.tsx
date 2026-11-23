import React from "react";

export default function VendorSubscriptionLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Page Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-orange-200/80 bg-white px-6 py-5 shadow-2xs">
        <div className="space-y-2">
          <div className="h-7 w-64 rounded-xl bg-stone-200/80" />
          <div className="h-4 w-96 max-w-full rounded-lg bg-stone-100" />
        </div>
      </div>

      {/* 2-Column Plan Cards Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FreeStarterPlanCard Skeleton */}
        <div className="rounded-3xl border border-orange-200/80 bg-white p-6 space-y-5 shadow-2xs">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2">
              <div className="h-5 w-36 rounded-lg bg-stone-200/85" />
              <div className="h-3.5 w-52 rounded-lg bg-stone-100" />
            </div>
            <div className="h-6 w-20 rounded-full bg-stone-100" />
          </div>

          <div className="h-9 w-24 rounded-xl bg-stone-200/80" />

          <div className="space-y-2.5 pt-1">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <div className="h-4 w-4 rounded-full bg-orange-100/80" />
                <div className="h-3.5 w-56 max-w-full rounded-lg bg-stone-100" />
              </div>
            ))}
          </div>

          <div className="h-10 w-full rounded-full bg-stone-100 pt-2" />
        </div>

        {/* CheckoutTrigger / Premium Kitchen Card Skeleton */}
        <div className="rounded-3xl border border-orange-200/80 bg-white p-6 space-y-5 shadow-2xs">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2">
              <div className="h-5 w-40 rounded-lg bg-orange-100/90" />
              <div className="h-3.5 w-56 rounded-lg bg-stone-100" />
            </div>
            <div className="h-6 w-24 rounded-full bg-orange-100/80" />
          </div>

          <div className="flex items-baseline gap-2">
            <div className="h-9 w-20 rounded-xl bg-stone-200/85" />
            <div className="h-4 w-16 rounded-lg bg-stone-100" />
          </div>

          <div className="space-y-2.5 pt-1">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <div className="h-4 w-4 rounded-full bg-red-100/80" />
                <div className="h-3.5 w-60 max-w-full rounded-lg bg-stone-100" />
              </div>
            ))}
          </div>

          <div className="h-11 w-full rounded-full bg-red-100/85" />
        </div>
      </div>

      {/* StripeBillingHistoryCard Skeleton */}
      <div className="rounded-3xl border border-orange-200/80 bg-white p-6 space-y-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-1.5">
            <div className="h-5 w-48 rounded-lg bg-stone-200/85" />
            <div className="h-3.5 w-64 rounded-lg bg-stone-100" />
          </div>
          <div className="h-6 w-28 rounded-full bg-orange-100/75" />
        </div>

        {/* Table Header Bar */}
        <div className="h-10 w-full rounded-2xl bg-[#FAF7F2] border border-orange-100" />

        {/* Table Rows */}
        <div className="space-y-2.5">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-4 rounded-2xl border border-orange-100/80 px-4 py-3.5"
            >
              <div className="h-4 w-28 rounded-lg bg-stone-100" />
              <div className="h-4 w-36 hidden sm:block rounded-lg bg-stone-100" />
              <div className="h-4 w-16 rounded-lg bg-stone-200/75" />
              <div className="h-6 w-20 rounded-full bg-emerald-100/80" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}