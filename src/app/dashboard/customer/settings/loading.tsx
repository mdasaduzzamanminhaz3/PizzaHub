import React from "react";

export default function CustomerSettingsLoading() {
  return (
    <div className="rounded-3xl border border-orange-200/80 bg-white p-6 sm:p-8 shadow-2xs space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-7 w-44 rounded-xl bg-stone-200/85" />
        <div className="h-4 w-80 max-w-full rounded-lg bg-stone-100" />
      </div>

      {/* Avatar Row Skeleton */}
      <div className="flex items-center gap-4 pt-1">
        <div className="h-14 w-14 shrink-0 rounded-2xl border border-orange-200/70 bg-orange-100/80" />
        <div className="h-9 w-32 rounded-xl border border-stone-200/80 bg-stone-100" />
      </div>

      {/* Form Skeleton */}
      <div className="space-y-5 max-w-2xl">
        {/* Full Name, Phone Number & Default Delivery Address */}
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="h-3.5 w-36 rounded-lg bg-stone-200/75" />
            <div className="h-11 w-full rounded-xl border border-stone-200/70 bg-[#FAF7F2]/80" />
          </div>
        ))}

        {/* Account Role (Locked - w-44) */}
        <div className="space-y-1.5">
          <div className="h-3 w-36 rounded-lg bg-stone-100" />
          <div className="h-11 w-44 rounded-xl border border-stone-200/70 bg-[#FAF7F2]" />
        </div>

        {/* Save Button Skeleton */}
        <div className="pt-2">
          <div className="h-11 w-32 rounded-xl bg-red-100/85" />
        </div>
      </div>
    </div>
  );
}