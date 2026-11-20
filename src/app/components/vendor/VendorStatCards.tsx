import React from "react";
import {
  UtensilsCrossed,
  CheckCircle2,
  Clock,
  Flame,
  Crown,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface VendorOverviewStats {
  totalItems: number;
  activeApproved: number;
  pendingOrders: number;
  acceptedOrders: number;
  currentPlan: string;
}

export default function VendorStatCards({
  stats,
}: {
  stats: VendorOverviewStats;
}) {
  const cards = [
    {
      label: "TOTAL ITEMS",
      value: stats.totalItems,
      icon: UtensilsCrossed,
      valueColor: "text-stone-950",
      badgeBg: "bg-stone-100 text-stone-700",
      cardTint: "bg-white border-orange-200/80",
      labelColor: "text-stone-500",
    },
    {
      label: "ACTIVE APPROVED",
      value: stats.activeApproved,
      icon: CheckCircle2,
      valueColor: "text-emerald-600",
      badgeBg: "bg-emerald-100/80 text-emerald-700",
      cardTint: "bg-white border-orange-200/80",
      labelColor: "text-stone-500",
    },
    {
      label: "PENDING ORDERS",
      value: stats.pendingOrders,
      icon: Clock,
      valueColor: "text-amber-600",
      badgeBg: "bg-amber-100/80 text-amber-700",
      cardTint: "bg-white border-orange-200/80",
      labelColor: "text-stone-500",
    },
    {
      label: "ACCEPTED ORDERS",
      value: stats.acceptedOrders,
      icon: Flame,
      valueColor: "text-[#dc2626]",
      badgeBg: "bg-red-100/80 text-[#dc2626]",
      cardTint: "bg-white border-orange-200/80",
      labelColor: "text-stone-500",
    },
    {
      label: "CURRENT PLAN",
      value: stats.currentPlan,
      icon: Crown,
      valueColor: "text-stone-950",
      badgeBg: "bg-amber-100 text-amber-700",
      cardTint: "bg-[#FFFBEB] border-amber-300/80",
      labelColor: "text-amber-800",
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
                <span
                  className={cn(
                    "text-[11px] font-bold uppercase tracking-wider",
                    item.labelColor
                  )}
                >
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