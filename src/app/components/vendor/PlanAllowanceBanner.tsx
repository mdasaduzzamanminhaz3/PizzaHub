"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Crown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PlanAllowanceBannerProps {
  activeCount: number;
  limit: number;
  planName?: string;
}

export default function PlanAllowanceBanner({
  activeCount,
  limit,
  planName = "Free Plan",
}: PlanAllowanceBannerProps) {
  const isLimitReached = activeCount >= limit;

  return (
    <div
      className={cn(
        "rounded-3xl border px-5 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all",
        isLimitReached
          ? "bg-gradient-to-r from-[#FFFBEB] via-[#FFF7ED] to-[#FFFBEB] border-amber-300/90 shadow-2xs"
          : "bg-white border-orange-200/80 shadow-2xs"
      )}
    >
      <div className="flex items-start sm:items-center gap-3.5">
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl",
            isLimitReached
              ? "bg-amber-100 text-amber-700"
              : "bg-orange-100 text-[#dc2626]"
          )}
        >
          {isLimitReached ? (
            <Crown className="h-5 w-5" />
          ) : (
            <Sparkles className="h-5 w-5" />
          )}
        </span>

        <div className="space-y-0.5">
          <p className="text-sm font-bold text-stone-900">
            {isLimitReached ? (
              <>
                You have reached the{" "}
                <span className="font-extrabold text-amber-900">
                  {limit}-item limit
                </span>{" "}
                on the {planName}. Upgrade to Premium for unlimited menu items
                and featured homepage placement!
              </>
            ) : (
              <>
                You are using{" "}
                <span className="font-extrabold text-stone-950">
                  {activeCount} of {limit}
                </span>{" "}
                active menu slots on the {planName}.
              </>
            )}
          </p>
          <p className="text-xs text-stone-500">
            Inactive items remain saved in your kitchen without counting toward
            active slots.
          </p>
        </div>
      </div>

      <Link
        href="/dashboard/vendor/subscription"
        className={cn(
          buttonVariants(),
          "w-fit shrink-0 rounded-full bg-gradient-to-r from-amber-500 to-[#f97316] hover:from-amber-600 hover:to-[#ea580c] text-white text-xs font-extrabold px-5 h-10 shadow-sm shadow-orange-500/20"
        )}
      >
        Upgrade to Premium
      </Link>
    </div>
  );
}