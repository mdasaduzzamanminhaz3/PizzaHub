"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FreeStarterPlanCardProps {
  isPremiumActive?: boolean;
  onSelectFree?: () => void;
}

const starterFeatures = [
  "Max 3 active menu items",
  "Basic vendor dashboard",
  "Customer order management",
];

export default function FreeStarterPlanCard({
  isPremiumActive = true,
  onSelectFree,
}: FreeStarterPlanCardProps) {
  return (
    <Card className="rounded-3xl border border-orange-200/80 bg-white shadow-2xs transition-all hover:border-orange-300">
      <CardContent className="p-6 flex flex-col justify-between h-full space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-stone-950">
              Free Starter
            </h2>
            {!isPremiumActive && (
              <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[11px] font-bold text-stone-600">
                Current Plan
              </span>
            )}
          </div>

          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-stone-950">$0</span>
            <span className="text-xs font-medium text-stone-500">/ month</span>
          </div>

          <ul className="space-y-2.5 pt-1">
            {starterFeatures.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-700"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {isPremiumActive ? (
          <div className="w-full rounded-2xl bg-[#FAF7F2] border border-orange-200/60 py-2.5 text-center text-xs font-bold text-stone-400">
            Included in Premium
          </div>
        ) : (
          <button
            type="button"
            onClick={onSelectFree}
            className="w-full rounded-2xl border border-orange-200/80 bg-white hover:bg-[#FAF7F2] py-2.5 text-center text-xs font-bold text-stone-800 transition-colors cursor-pointer"
          >
            Continue with Free Plan
          </button>
        )}
      </CardContent>
    </Card>
  );
}