import React from "react";

export default function PlatformTransactionsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header + Filter + Immutable Badge Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-orange-200/80 bg-white px-6 py-5 shadow-2xs">
        <div className="space-y-2">
          <div className="h-7 w-64 rounded-xl bg-stone-200/85" />
          <div className="h-4 w-80 max-w-full rounded-lg bg-stone-100" />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="h-10 w-32 rounded-full border border-orange-200/70 bg-[#FAF7F2]/70" />
          <div className="h-10 w-48 rounded-full bg-stone-200/85" />
        </div>
      </div>

      {/* TransactionsSummaryCards Skeleton (4 Cards Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-3xl border border-orange-200/80 bg-white p-5 shadow-2xs"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="h-3 w-28 rounded-md bg-stone-200/80" />
              <div className="h-8 w-8 shrink-0 rounded-xl bg-orange-100/80" />
            </div>
            <div className="mt-3 h-8 w-24 rounded-xl bg-stone-200/85" />
          </div>
        ))}
      </div>

      {/* PlatformTransactionsTable Skeleton */}
      <div className="rounded-3xl border border-orange-200/80 bg-white p-6 space-y-4 shadow-2xs">
        {/* Table Header Bar */}
        <div className="h-10 w-full rounded-2xl border border-orange-100 bg-[#FAF7F2]" />

        {/* Table Rows */}
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-orange-100/80 px-4 py-3.5"
            >
              <div className="space-y-1.5 min-w-0">
                <div className="h-4 w-44 rounded-lg bg-stone-200/80" />
                <div className="h-3 w-32 rounded-lg bg-stone-100" />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="h-4 w-28 hidden md:block rounded-lg bg-stone-100" />
                <div className="h-4 w-16 rounded-lg bg-stone-200/80" />
                <div className="h-6 w-22 rounded-full bg-emerald-100/80" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}