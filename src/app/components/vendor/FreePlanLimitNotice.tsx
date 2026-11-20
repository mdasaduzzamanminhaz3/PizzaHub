"use client";

import React from "react";
import Link from "next/link";
import { Crown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FreePlanLimitNoticeProps {
  currentCount?: number;
  maxLimit?: number;
  pricePerMonth?: number;
}

export default function FreePlanLimitNotice({
  currentCount = 3,
  maxLimit = 3,
  pricePerMonth = 29,
}: FreePlanLimitNoticeProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-amber-300/80 bg-[#FFFBEB] px-6 py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 mb-3">
        <Crown className="h-6 w-6" />
      </div>

      <h2 className="text-lg sm:text-xl font-extrabold text-stone-950">
        Free Plan Limit Reached ({currentCount}/{maxLimit} Items)
      </h2>

      <p className="mt-1.5 max-w-md text-xs sm:text-sm text-amber-900/80 leading-relaxed">
        Upgrade to PizzaHub Premium via Stripe Checkout to publish unlimited
        menu items and earn featured placement.
      </p>

      <Link
        href="/dashboard/vendor/subscription"
        className={cn(
          buttonVariants(),
          "mt-5 h-11 rounded-2xl bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs sm:text-sm font-bold px-6 shadow-sm shadow-red-600/20"
        )}
      >
        Upgrade to Premium (${pricePerMonth}/mo)
      </Link>
    </div>
  );
}