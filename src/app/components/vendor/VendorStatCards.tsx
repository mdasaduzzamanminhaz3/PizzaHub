"use client";

import React from "react";
import { Pizza, CheckCircle2, Clock, BadgeCheck, Crown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface VendorOverviewStats {
  totalItems: number;
  activeApproved: number;
  pendingOrders: number;
  acceptedOrders: number;
  currentPlan: "Free" | "Pro" | string;
}

interface VendorStatCardsProps {
  stats: VendorOverviewStats;
}

export default function VendorStatCards({ stats }: VendorStatCardsProps) {
  const isPro = String(stats.currentPlan).toLowerCase() === "pro";

  const cards = [
    {
      label: "TOTAL MENU ITEMS",
      value: stats.totalItems,
      icon: Pizza,
      valueColor: "text-stone-950",
      badgeBg: "bg-orange-100 text-[#dc2626]",
      cardTint: "bg-white border-orange-200/80",
    },
    {
      label: "ACTIVE APPROVED",
      value: stats.activeApproved,
      icon: CheckCircle2,
      valueColor: "text-emerald-600",
      badgeBg: "bg-emerald-100/80 text-emerald-700",
      cardTint: "bg-[#F4FBF7] border-emerald-200/80",
    },
    {
      label: "PENDING ORDERS",
      value: stats.pendingOrders,
      icon: Clock,
      valueColor: "text-amber-600",
      badgeBg: "bg-amber-100/80 text-amber-700",
      cardTint: "bg-[#FFFBF2] border-amber-200/80",
    },
    {
      label: "ACCEPTED ORDERS",
      value: stats.acceptedOrders,
      icon: BadgeCheck,
      valueColor: "text-sky-700",
      badgeBg: "bg-sky-100/80 text-sky-700",
      cardTint: "bg-[#F4F9FE] border-sky-200/80",
    },
    {
      label: "CURRENT PLAN",
      value: stats.currentPlan || "Free",
      icon: Crown,
      valueColor: isPro ? "text-amber-600" : "text-stone-800",
      badgeBg: isPro
        ? "bg-amber-100 text-amber-700"
        : "bg-stone-100 text-stone-700",
      cardTint: isPro
        ? "bg-[#FFFBF2] border-amber-300/80"
        : "bg-white border-orange-200/80",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {cards.map((item) => {
        const Icon = item.icon;
        return (
          <Card
            key={item.label}
            className={cn(
              "rounded-3xl border shadow-2xs transition-all hover:-translate-y-0.5",
              item.cardTint
            )}
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                  {item.label}
                </span>
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl",
                    item.badgeBg
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
              </div>

              <p
                className={cn(
                  "mt-3 text-3xl font-black tracking-tight",
                  item.valueColor
                )}
              >
                {item.value}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}