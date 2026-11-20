import React from "react";
import {
  Users,
  UserCheck,
  UserX,
  ShoppingBag,
  Store,
  Crown,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface UsersSummaryStats {
  totalUsers: number;
  activeUsers: number;
  blockedUsers: number;
  customerUsers: number;
  vendorUsers: number;
  premiumVendors: number;
}

export default function AdminUsersStatCards({
  stats,
}: {
  stats: UsersSummaryStats;
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
      label: "TOTAL ACTIVE USERS",
      value: stats.activeUsers,
      icon: UserCheck,
      valueColor: "text-emerald-600",
      badgeBg: "bg-emerald-100/80 text-emerald-700",
      cardTint: "bg-white border-orange-200/80",
      labelColor: "text-stone-500",
    },
    {
      label: "TOTAL BLOCKED USERS",
      value: stats.blockedUsers,
      icon: UserX,
      valueColor: "text-[#dc2626]",
      badgeBg: "bg-red-100/80 text-[#dc2626]",
      cardTint: "bg-[#FFF6F6] border-red-200/80",
      labelColor: "text-[#dc2626]",
    },
    {
      label: "TOTAL CUSTOMER USERS",
      value: stats.customerUsers,
      icon: ShoppingBag,
      valueColor: "text-stone-950",
      badgeBg: "bg-orange-100/80 text-[#f97316]",
      cardTint: "bg-white border-orange-200/80",
      labelColor: "text-stone-500",
    },
    {
      label: "TOTAL VENDOR USERS",
      value: stats.vendorUsers,
      icon: Store,
      valueColor: "text-stone-950",
      badgeBg: "bg-[#FAF7F2] text-stone-800 border border-orange-200/70",
      cardTint: "bg-white border-orange-200/80",
      labelColor: "text-stone-500",
    },
    {
      label: "PREMIUM VENDORS",
      value: stats.premiumVendors,
      icon: Crown,
      valueColor: "text-amber-900",
      badgeBg: "bg-amber-100 text-amber-700",
      cardTint: "bg-[#FFFBEB] border-amber-300/80",
      labelColor: "text-amber-800",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
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
            <CardContent className="p-4">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={cn(
                    "text-[10px] font-extrabold uppercase tracking-wider leading-tight",
                    item.labelColor
                  )}
                >
                  {item.label}
                </span>
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-xl",
                    item.badgeBg
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>
              </div>
              <p
                className={cn(
                  "mt-2.5 text-2xl font-black tracking-tight",
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