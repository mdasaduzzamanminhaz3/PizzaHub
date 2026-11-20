import React from "react";
import { DollarSign, CheckCircle2, AlertTriangle, Receipt } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface LedgerSummaryStats {
  totalRevenue: string;
  succeededCount: number;
  failedCount: number;
  totalRecords: number;
}

export default function TransactionsSummaryCards({
  stats,
}: {
  stats: LedgerSummaryStats;
}) {
  const items = [
    {
      label: "SUCCEEDED REVENUE",
      value: stats.totalRevenue,
      icon: DollarSign,
      valueColor: "text-stone-950",
      badgeBg: "bg-orange-100/80 text-[#dc2626]",
      cardTint: "bg-white border-orange-200/80",
    },
    {
      label: "SUCCEEDED PAYMENTS",
      value: stats.succeededCount,
      icon: CheckCircle2,
      valueColor: "text-emerald-600",
      badgeBg: "bg-emerald-100/80 text-emerald-700",
      cardTint: "bg-white border-orange-200/80",
    },
    {
      label: "FAILED PAYMENTS",
      value: stats.failedCount,
      icon: AlertTriangle,
      valueColor: "text-[#dc2626]",
      badgeBg: "bg-red-100/80 text-[#dc2626]",
      cardTint: "bg-[#FFF6F6] border-red-200/80",
    },
    {
      label: "TOTAL LEDGER ENTRIES",
      value: stats.totalRecords,
      icon: Receipt,
      valueColor: "text-stone-950",
      badgeBg: "bg-[#FAF7F2] text-stone-700 border border-orange-200/70",
      cardTint: "bg-white border-orange-200/80",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {items.map((item) => {
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
                  "mt-3 text-2xl sm:text-3xl font-black tracking-tight",
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