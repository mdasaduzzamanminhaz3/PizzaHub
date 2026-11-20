"use client";

import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { toast } from "sonner";
import FreeStarterPlanCard from "@/app/components/vendor/FreeStarterPlanCard";
import StripeBillingHistoryCard from "@/app/components/vendor/StripeBillingHistoryCard";
import PremiumKitchenPlanCard from "@/app/components/vendor/PremiumKitchenPlanCard";

export default function VendorSubscriptionPage() {
  const [isPremiumActive, setIsPremiumActive] = useState(true);

  return (
    <div className="space-y-6">
      {/* Page Header + Preview Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-orange-200/80 bg-white px-6 py-5 shadow-2xs">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-stone-950">
            Vendor Subscription Plan
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Upgrade via Stripe Checkout to unlock unlimited active dishes and
            homepage priority.
          </p>
        </div>

        {/* Preview State Toggle (Replace with real subscription state later) */}
        <div className="inline-flex items-center rounded-full bg-[#FAF7F2] p-1 border border-orange-200/80 w-fit">
          <button
            type="button"
            onClick={() => setIsPremiumActive(false)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer",
              !isPremiumActive
                ? "bg-[#dc2626] text-white shadow-2xs"
                : "text-stone-600 hover:text-stone-950"
            )}
          >
            Free View
          </button>
          <button
            type="button"
            onClick={() => setIsPremiumActive(true)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer",
              isPremiumActive
                ? "bg-[#dc2626] text-white shadow-2xs"
                : "text-stone-600 hover:text-stone-950"
            )}
          >
            Premium Active
          </button>
        </div>
      </div>

      {/* 2-Column Plan Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FreeStarterPlanCard
          isPremiumActive={isPremiumActive}
          onSelectFree={() => {
            setIsPremiumActive(false);
            toast.info("Switched preview to Free Starter.");
          }}
        />
        <PremiumKitchenPlanCard
          plan={{
            title: "Premium Kitchen",
            price: 29,
            activeUntil: "2026-12-19",
            isSubscribed: isPremiumActive,
            verifiedText:
              "Verified via Stripe Webhook • Unlimited Items Unlocked",
          }}
          onUpgradeClick={() => {
            setIsPremiumActive(true);
            toast.success("Switched preview to Premium Kitchen.");
          }}
        />
      </div>

      {/* Stripe Billing History Table */}
      <StripeBillingHistoryCard />
    </div>
  );
}