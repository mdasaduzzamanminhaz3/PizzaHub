import React from "react";
import {
  Users,
  Store,
  UserCheck,
  UtensilsCrossed,
  Clock,
  Receipt,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface AdminOverviewStats {
  totalUsers: number;
  totalVendors: number;
  totalCustomers: number;
  totalMenuItems: number;
  pendingMenuItems: number;
  totalTransactions: number;
}

export default function AdminStatCards({
  stats,
}: {
  stats: AdminOverviewStats;
}) {
  const cards = [
    {
      label: "TOTAL USERS",
      value: stats.totalUsers,
      icon: Users,
      valueColor: "text-stone-950",
      badgeBg: "bg-stone-100 text-stone-700",
      cardTint: "bg-white border-orange-200/80",
      labelColor: "text-stone-500",
    },
    {
      label: "TOTAL VENDORS",
      value: stats.totalVendors,
      icon: Store,
      valueColor: "text-stone-950",
      badgeBg: "bg-orange-100/80 text-[#dc2626]",
      cardTint: "bg-white border-orange-200/80",
      labelColor: "text-stone-500",
    },
    {
      label: "TOTAL CUSTOMERS",
      value: stats.totalCustomers,
      icon: UserCheck,
      valueColor: "text-stone-950",
      badgeBg: "bg-emerald-100/80 text-emerald-700",
      cardTint: "bg-white border-orange-200/80",
      labelColor: "text-stone-500",
    },
    {
      label: "TOTAL MENU ITEMS",
      value: stats.totalMenuItems,
      icon: UtensilsCrossed,
      valueColor: "text-stone-950",
      badgeBg: "bg-[#FAF7F2] text-stone-700 border border-orange-200/60",
      cardTint: "bg-white border-orange-200/80",
      labelColor: "text-stone-500",
    },
    {
      label: "PENDING MENU ITEMS",
      value: stats.pendingMenuItems,
      icon: Clock,
      valueColor: "text-stone-950",
      badgeBg: "bg-amber-100 text-amber-700",
      cardTint: "bg-[#FFFBEB] border-amber-300/80",
      labelColor: "text-amber-800",
    },
    {
      label: "TOTAL TRANSACTIONS",
      value: stats.totalTransactions,
      icon: Receipt,
      valueColor: "text-stone-950",
      badgeBg: "bg-red-50 text-[#dc2626]",
      cardTint: "bg-white border-orange-200/80",
      labelColor: "text-stone-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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