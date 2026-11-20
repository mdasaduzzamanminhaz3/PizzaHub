"use client";

import React from "react";
import { Crown, CheckCircle2, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface PremiumPlanDetails {
  title?: string;
  price?: number;
  activeUntil?: string;
  isSubscribed?: boolean;
  verifiedText?: string;
}

interface PremiumKitchenPlanCardProps {
  plan?: PremiumPlanDetails;
  onUpgradeClick?: () => void;
}

const premiumFeatures = [
  { text: "active menu items", highlight: "Unlimited" },
  { text: "vendor badge", highlight: "Verified Premium" },
  { text: "Featured homepage menu placement", highlight: "" },
  { text: "All Free features included", highlight: "" },
];

export default function PremiumKitchenPlanCard({
  plan,
  onUpgradeClick,
}: PremiumKitchenPlanCardProps) {
  const title = plan?.title ?? "Premium Kitchen";
  const price = plan?.price ?? 29;
  const activeUntil = plan?.activeUntil ?? "2026-12-19";
  const isSubscribed = plan?.isSubscribed ?? true;
  const verifiedText =
    plan?.verifiedText ?? "Verified via Stripe Webhook • Unlimited Items Unlocked";

  return (
    <Card className="rounded-3xl border-[1.5px] border-amber-400/90 bg-white shadow-sm shadow-amber-950/5 relative overflow-hidden">
      <CardContent className="p-6 flex flex-col justify-between h-full space-y-6">
        <div className="space-y-4">
          {/* Top Title & Active Badge */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-amber-500 fill-amber-400/30" />
              <h2 className="text-lg font-extrabold text-stone-950">
                {title}
              </h2>
            </div>

            {isSubscribed && (
              <span className="rounded-full bg-amber-100 border border-amber-300/70 px-3 py-0.5 text-[11px] font-extrabold text-amber-900">
                Active until {activeUntil}
              </span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-stone-950">
              ${price}
            </span>
            <span className="text-xs font-medium text-stone-500">/ month</span>
          </div>

          {/* Feature Checklist */}
          <ul className="space-y-2.5 pt-1">
            {premiumFeatures.map((item) => (
              <li
                key={item.text}
                className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-700"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#dc2626]" />
                <span>
                  {item.highlight && (
                    <strong className="font-extrabold text-stone-950">
                      {item.highlight}{" "}
                    </strong>
                  )}
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Status Box or Upgrade CTA */}
        {isSubscribed ? (
          <div className="w-full rounded-2xl bg-[#FFFBEB] border border-amber-200/90 px-4 py-2.5 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-bold text-amber-900">
            <ShieldCheck className="h-4 w-4 text-amber-600 shrink-0" />
            <span className="truncate">{verifiedText}</span>
          </div>
        ) : (
          <Button
            type="button"
            onClick={onUpgradeClick}
            className="w-full h-11 rounded-2xl bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs sm:text-sm font-bold shadow-sm shadow-red-600/20 cursor-pointer"
          >
            Upgrade via Stripe Checkout (${price}/mo)
          </Button>
        )}
      </CardContent>
    </Card>
  );
}