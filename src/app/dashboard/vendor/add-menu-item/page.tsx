"use client";

import React, { useState } from "react";

import { cn } from "@/lib/utils";
import FreePlanLimitNotice from "@/app/components/vendor/FreePlanLimitNotice";
import AddMenuItemForm from "@/app/components/vendor/AddMenuItemForm";

export default function VendorAddMenuItemPage() {
  const [isLimitReached, setIsLimitReached] = useState(false);

  return (
    <div className="rounded-3xl border border-orange-200/80 bg-white p-6 sm:p-8 shadow-2xs space-y-6">
      {/* Header + State Preview Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-stone-950">
            Add New Menu Item
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Items are saved with status{" "}
            <strong className="text-stone-800">Pending</strong> until reviewed
            by an Admin.
          </p>
        </div>

        {/* Preview Toggle (Replace with real plan & item count check later) */}
        <div className="inline-flex items-center rounded-full bg-[#FAF7F2] p-1 border border-orange-200/80 w-fit">
          <button
            type="button"
            onClick={() => setIsLimitReached(false)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer",
              !isLimitReached
                ? "bg-[#dc2626] text-white shadow-2xs"
                : "text-stone-600 hover:text-stone-950"
            )}
          >
            Add Form
          </button>
          <button
            type="button"
            onClick={() => setIsLimitReached(true)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer",
              isLimitReached
                ? "bg-[#dc2626] text-white shadow-2xs"
                : "text-stone-600 hover:text-stone-950"
            )}
          >
            Limit Reached (3/3)
          </button>
        </div>
      </div>

      {/* Render Form or Free Plan Limit Notice */}
      {isLimitReached ? (
        <FreePlanLimitNotice currentCount={3} maxLimit={3} pricePerMonth={29} />
      ) : (
        <AddMenuItemForm />
      )}
    </div>
  );
}