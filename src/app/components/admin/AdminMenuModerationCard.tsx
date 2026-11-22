"use client";

import React from "react";
import {
  Store,
  User,
  Phone,
  Crown,
  Check,
  X,
  Trash2,
  Eye,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ModerationItemStatus = "Pending" | "Approved" | "Rejected";

export interface AdminMenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  location: string;
  description: string;
  image: string;
  status: ModerationItemStatus;
  isActive?: boolean;
  isFeatured?: boolean;
  createdAt?: string;
  vendorId?: string;
  vendorName?: string;
  vendorEmail?: string;
  restaurantName?: string;
  vendorPhone?: string;
  vendorAddress?: string;
  vendorImage?: string;
  isVendorPremium?: boolean;
}

interface AdminMenuModerationCardProps {
  item: AdminMenuItem;
  onDetails?: (item: AdminMenuItem) => void;
  onApprove?: (itemId: string) => void;
  onReject?: (itemId: string) => void;
  onDelete?: (itemId: string) => void;
}

const statusStyles: Record<string, { badge: string; dot: string }> = {
  Pending: {
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
  },
  Approved: {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
  },
  Rejected: {
    badge: "bg-rose-50 text-rose-700 border-rose-200",
    dot: "bg-rose-500",
  },
};

export default function AdminMenuModerationCard({
  item,
  onDetails,
  onApprove,
  onReject,
  onDelete,
}: AdminMenuModerationCardProps) {
  const currentStatus = statusStyles[item.status] || statusStyles.Pending;

  return (
    <Card className="rounded-3xl border border-orange-200/80 bg-white shadow-2xs transition-all duration-200 hover:border-orange-300 hover:shadow-md hover:shadow-orange-950/5">
      <CardContent className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        {/* Left: Dish Image + Dish & Vendor Info */}
        <div className="flex items-start gap-4 min-w-0 flex-1">
          <div className="h-20 w-24 sm:h-24 sm:w-28 shrink-0 overflow-hidden rounded-2xl border border-orange-200/70 bg-[#FAF7F2]">
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="min-w-0 flex-1 space-y-1.5">
            {/* Title + Status + Price */}
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base sm:text-lg font-extrabold text-stone-950">
                {item.name}
              </h2>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold",
                  currentStatus.badge
                )}
              >
                <span
                  className={cn("h-1.5 w-1.5 rounded-full", currentStatus.dot)}
                />
                {item.status}
              </span>
              <span className="text-sm font-extrabold text-[#dc2626]">
                ${Number(item.price).toFixed(2)}
              </span>
            </div>

            {/* Category & Area */}
            <p className="text-xs text-stone-500 font-medium">
              <strong className="text-stone-700">{item.category}</strong> • Area:{" "}
              <strong className="text-stone-700">{item.location}</strong>
            </p>

            {/* Vendor Info Row */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-0.5 text-xs text-stone-700">
              <span className="inline-flex items-center gap-1 font-bold text-stone-900">
                <Store className="h-3.5 w-3.5 text-[#dc2626] shrink-0" />
                <span>{item.restaurantName || item.vendorName || "Kitchen"}</span>
              </span>

              {item.isVendorPremium && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-extrabold text-amber-800">
                  <Crown className="h-3 w-3 text-amber-500" />
                  <span>PRO Vendor</span>
                </span>
              )}

              {item.vendorName && (
                <span className="inline-flex items-center gap-1 text-stone-600">
                  <User className="h-3.5 w-3.5 text-[#f97316] shrink-0" />
                  <span>{item.vendorName}</span>
                </span>
              )}

              {item.vendorPhone && (
                <span className="inline-flex items-center gap-1 font-semibold text-stone-700">
                  <Phone className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>{item.vendorPhone}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Details + Approve / Reject / Delete */}
        <div className="flex flex-wrap items-center justify-end gap-2 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-orange-100">
          <Button
            type="button"
            variant="outline"
            onClick={() => onDetails?.(item)}
            className="h-9 rounded-xl border-orange-200/80 bg-[#FAF7F2]/70 hover:bg-orange-50 text-stone-800 text-xs font-bold px-3.5 gap-1.5 cursor-pointer"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Details</span>
          </Button>

          {item.status !== "Approved" && (
            <Button
              type="button"
              onClick={() => onApprove?.(item.id)}
              className="h-9 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 gap-1.5 cursor-pointer"
            >
              <Check className="h-3.5 w-3.5" />
              <span>Approve</span>
            </Button>
          )}

          {item.status !== "Rejected" && (
            <Button
              type="button"
              onClick={() => onReject?.(item.id)}
              className="h-9 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-3.5 gap-1.5 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
              <span>Reject</span>
            </Button>
          )}

          <Button
            type="button"
            variant="ghost"
            onClick={() => onDelete?.(item.id)}
            className="h-9 rounded-xl bg-red-50 hover:bg-red-100 text-[#dc2626] text-xs font-bold px-3 gap-1.5 cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Delete</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}