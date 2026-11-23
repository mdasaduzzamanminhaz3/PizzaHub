import React from "react";

export default function AdminManageUsersLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="rounded-3xl border border-orange-200/80 bg-white px-6 py-5 shadow-2xs space-y-2">
        <div className="h-7 w-60 rounded-xl bg-stone-200/85" />
        <div className="h-4 w-80 max-w-full rounded-lg bg-stone-100" />
      </div>

      {/* 6 Stat Cards Skeleton (matches AdminUsersStatCards lg:grid-cols-3) */}
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

      {/* Search & Role Filter Bar Skeleton */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="h-11 flex-1 rounded-2xl border border-orange-200/80 bg-white px-4 flex items-center">
          <div className="h-4 w-48 rounded-md bg-stone-100" />
        </div>
        <div className="h-11 w-full sm:w-36 rounded-2xl border border-orange-200/80 bg-white" />
      </div>

      {/* AdminUsersTable Skeleton */}
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
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-10 w-10 shrink-0 rounded-full bg-orange-100/80" />
                <div className="space-y-1.5">
                  <div className="h-4 w-36 rounded-lg bg-stone-200/80" />
                  <div className="h-3 w-48 rounded-lg bg-stone-100" />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className="h-6 w-20 rounded-full bg-orange-100/75" />
                <div className="h-6 w-18 rounded-full bg-emerald-100/80" />
                <div className="h-8 w-24 rounded-xl bg-stone-100" />
                <div className="h-8 w-20 rounded-xl bg-red-100/75" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}