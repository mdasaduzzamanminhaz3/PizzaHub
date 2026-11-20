"use client";

import React from "react";
import { Check, X, Trash2, Store, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ModerationItemStatus = "Approved" | "Pending" | "Rejected";

export interface AdminMenuItem {
  id: string;
  name: string;
  image: string;
  vendorName: string;
  category: string;
  price: number;
  description: string;
  status: ModerationItemStatus;
}

interface AdminMenuModerationCardProps {
  item: AdminMenuItem;
  onApprove?: (itemId: string) => void;
  onReject?: (itemId: string) => void;
  onDelete?: (itemId: string) => void;
}

const statusBadgeConfig: Record<
  ModerationItemStatus,
  { pill: string; dot: string }
> = {
  Approved: {
    pill: "bg-emerald-100/90 text-emerald-800 border-emerald-200/80",
    dot: "bg-emerald-500",
  },
  Pending: {
    pill: "bg-amber-100/90 text-amber-800 border-amber-200/80",
    dot: "bg-amber-500",
  },
  Rejected: {
    pill: "bg-red-100/90 text-[#dc2626] border-red-200/80",
    dot: "bg-[#dc2626]",
  },
};

export default function AdminMenuModerationCard({
  item,
  onApprove,
  onReject,
  onDelete,
}: AdminMenuModerationCardProps) {
  const badge = statusBadgeConfig[item.status];

  return (
    <Card className="group rounded-3xl border border-orange-200/80 bg-white shadow-2xs transition-all duration-200 hover:border-orange-300 hover:shadow-md hover:shadow-orange-950/5">
      <CardContent className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Dish Image + Metadata */}
        <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
          <div className="relative h-20 w-24 sm:h-22 sm:w-28 shrink-0 overflow-hidden rounded-2xl border border-orange-200/70 bg-[#FAF7F2]">
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="min-w-0 flex-1 space-y-1">
            {/* Dish Name + Status Badge */}
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-base sm:text-lg font-extrabold text-stone-950 truncate">
                {item.name}
              </h2>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold",
                  badge.pill
                )}
              >
                <span className={cn("h-1.5 w-1.5 rounded-full", badge.dot)} />
                {item.status}
              </span>
            </div>

            {/* Vendor • Category • Price */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-[13px] text-stone-600">
              <span className="inline-flex items-center gap-1">
                <Store className="h-3.5 w-3.5 text-[#f97316] shrink-0" />
                <span className="text-stone-500">Vendor:</span>
                <strong className="font-bold text-stone-900">
                  {item.vendorName}
                </strong>
              </span>

              <span className="text-stone-300">•</span>

              <span className="inline-flex items-center gap-1 font-medium text-stone-600">
                <Tag className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                {item.category}
              </span>

              <span className="text-stone-300">•</span>

              <span className="font-extrabold text-stone-950">
                ${item.price.toFixed(2)}
              </span>
            </div>

            {/* Short Description */}
            <p className="text-xs text-stone-500 line-clamp-1 sm:line-clamp-2 pt-0.5">
              {item.description}
            </p>
          </div>
        </div>

        {/* Right: Moderation Action Buttons */}
        <div className="flex flex-wrap items-center justify-end gap-2 shrink-0 pt-2.5 lg:pt-0 border-t lg:border-t-0 border-orange-100">
          {item.status !== "Approved" && (
            <Button
              type="button"
              onClick={() => onApprove?.(item.id)}
              className="h-9 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 gap-1.5 shadow-2xs cursor-pointer"
            >
              <Check className="h-3.5 w-3.5" />
              <span>Approve</span>
            </Button>
          )}

          {item.status !== "Rejected" && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => onReject?.(item.id)}
              className="h-9 rounded-xl bg-amber-100/80 hover:bg-amber-200/80 text-amber-900 text-xs font-bold px-4 gap-1.5 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
              <span>Reject</span>
            </Button>
          )}

          <Button
            type="button"
            variant="ghost"
            onClick={() => onDelete?.(item.id)}
            className="h-9 rounded-xl bg-red-50/90 hover:bg-red-100 text-[#dc2626] hover:text-[#b91c1c] text-xs font-bold px-3.5 gap-1.5 cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Delete</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}