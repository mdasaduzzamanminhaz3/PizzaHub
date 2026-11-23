import React from "react";

export default function VendorAddMenuItemLoading() {
  return (
    <div className="rounded-3xl border border-orange-200/80 bg-white p-6 sm:p-8 shadow-2xs space-y-6 animate-pulse">
      {/* Header + Plan Usage Pill Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="h-7 w-52 rounded-xl bg-stone-200/85" />
          <div className="h-4 w-80 max-w-full rounded-lg bg-stone-100" />
        </div>
        <div className="h-8 w-44 rounded-full border border-orange-200/70 bg-[#FAF7F2]" />
      </div>

      {/* Form Skeleton */}
      <div className="space-y-5">
        {/* Row 1: Item Name & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <div className="h-3.5 w-24 rounded-lg bg-stone-200/75" />
            <div className="h-11 w-full rounded-2xl border border-orange-200/60 bg-[#FAF7F2]/80" />
          </div>
          <div className="space-y-1.5">
            <div className="h-3.5 w-20 rounded-lg bg-stone-200/75" />
            <div className="h-11 w-full rounded-2xl border border-orange-200/60 bg-[#FAF7F2]/80" />
          </div>
        </div>

        {/* Row 2: Price & Restaurant Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <div className="h-3.5 w-24 rounded-lg bg-stone-200/75" />
            <div className="h-11 w-full rounded-2xl border border-orange-200/60 bg-[#FAF7F2]/80" />
          </div>
          <div className="space-y-1.5">
            <div className="h-3.5 w-40 rounded-lg bg-stone-200/75" />
            <div className="h-11 w-full rounded-2xl border border-orange-200/60 bg-[#FAF7F2]/80" />
          </div>
        </div>

        {/* Row 3: Description Textarea */}
        <div className="space-y-1.5">
          <div className="h-3.5 w-24 rounded-lg bg-stone-200/75" />
          <div className="h-24 w-full rounded-2xl border border-orange-200/60 bg-[#FAF7F2]/80" />
        </div>

        {/* Row 4: ImgBB Upload Dashed Box */}
        <div className="space-y-1.5">
          <div className="h-3.5 w-52 rounded-lg bg-stone-200/75" />
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-orange-200 bg-[#FAF7F2]/80 px-4 py-8 space-y-3">
            <div className="h-10 w-10 rounded-full bg-orange-100/85" />
            <div className="h-3.5 w-40 rounded-lg bg-stone-200/75" />
            <div className="h-9 w-48 rounded-full bg-stone-200/85" />
          </div>
        </div>

        {/* Submit CTA Button */}
        <div className="pt-1">
          <div className="h-11 w-56 rounded-2xl bg-red-100/85" />
        </div>
      </div>
    </div>
  );
}