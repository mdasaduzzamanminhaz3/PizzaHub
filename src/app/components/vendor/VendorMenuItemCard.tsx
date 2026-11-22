"use client";

import React, { useState } from "react";
import { Pencil, Trash2, EyeOff, Eye, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import EditMenuItemModal, {
  MenuItemUpdatePayload,
} from "./EditMenuItemModal";

export type MenuApprovalStatus = "Approved" | "Pending" | "Rejected";

export interface VendorMenuItem {
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
  status: MenuApprovalStatus;
  isActive: boolean;
  description?: string;
  location?: string;
}

interface VendorMenuItemCardProps {
  item: VendorMenuItem;
  onToggleActive?: (itemId: string) => void;
  onDelete?: (itemId: string) => void;
  onEdit?: (
    itemId: string,
    payload: MenuItemUpdatePayload
  ) => Promise<void> | void;
}

const approvalBadgeStyles: Record<
  MenuApprovalStatus,
  { badge: string; dot: string }
> = {
  Approved: {
    badge: "bg-emerald-100/90 text-emerald-800 border-emerald-200/80",
    dot: "bg-emerald-500",
  },
  Pending: {
    badge: "bg-amber-100/90 text-amber-800 border-amber-200/80",
    dot: "bg-amber-500",
  },
  Rejected: {
    badge: "bg-red-100/90 text-[#dc2626] border-red-200/80",
    dot: "bg-[#dc2626]",
  },
};

export default function VendorMenuItemCard({
  item,
  onToggleActive,
  onDelete,
  onEdit,
}: VendorMenuItemCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const statusStyle = approvalBadgeStyles[item.status];
  const canToggleActive = item.status === "Approved";

  return (
    <>
      <Card
        className={cn(
          "group rounded-3xl border bg-white shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-orange-950/5",
          item.status === "Rejected"
            ? "border-red-200/80"
            : "border-orange-200/80 hover:border-orange-300",
          !item.isActive &&
            item.status === "Approved" &&
            "opacity-80 bg-[#FAF7F2]/50"
        )}
      >
        <CardContent className="p-4 flex items-center gap-4">
          {/* Square Thumbnail */}
          <div className="relative h-20 w-20 sm:h-22 sm:w-22 shrink-0 overflow-hidden rounded-2xl border border-orange-200/70 bg-[#FAF7F2]">
            <Image
              src={item.image || "/PizzaHub.png"}
              alt={item.name}
              fill
              sizes="(max-width: 640px) 80px, 88px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {!item.isActive && item.status === "Approved" && (
              <span className="absolute inset-x-0 bottom-0 z-10 bg-stone-900/75 py-0.5 text-center text-[10px] font-bold uppercase tracking-wider text-white">
                Inactive
              </span>
            )}
          </div>

          {/* Content & Actions */}
          <div className="min-w-0 flex-1 space-y-1.5">
            {/* Title + Status Pill */}
            <div className="flex items-start justify-between gap-2">
              <h2
                title={item.name}
                className="text-sm sm:text-base font-extrabold text-stone-950 truncate"
              >
                {item.name}
              </h2>
              <span
                className={cn(
                  "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold",
                  statusStyle.badge
                )}
              >
                <span
                  className={cn("h-1.5 w-1.5 rounded-full", statusStyle.dot)}
                />
                {item.status}
              </span>
            </div>

            {/* Category + Price */}
            <p className="text-xs text-stone-500 font-medium truncate">
              {item.category} <span className="mx-1 text-stone-300">•</span>{" "}
              <span className="font-bold text-stone-800">
                ${item.price.toFixed(2)}
              </span>
            </p>

            {/* Rejection Note if Rejected */}
            {item.status === "Rejected" && (
              <p className="flex items-center gap-1 text-[11px] font-semibold text-[#dc2626]">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">
                  Rejected by Admin — hidden from public Browse Menu.
                </span>
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsEditOpen(true)}
                className="h-8 rounded-full border-orange-200/80 bg-orange-50/70 hover:bg-orange-100 text-stone-800 text-xs font-bold px-3.5 gap-1.5 cursor-pointer"
              >
                <Pencil className="h-3.5 w-3.5 text-[#dc2626]" />
                <span>Edit</span>
              </Button>

              {canToggleActive && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onToggleActive?.(item.id)}
                  className="h-8 rounded-full border-orange-200/80 bg-[#FAF7F2]/80 hover:bg-orange-50 text-stone-700 text-xs font-bold px-3.5 gap-1.5 cursor-pointer"
                >
                  {item.isActive ? (
                    <>
                      <EyeOff className="h-3.5 w-3.5 text-stone-500" />
                      <span>Set Inactive</span>
                    </>
                  ) : (
                    <>
                      <Eye className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Set Active</span>
                    </>
                  )}
                </Button>
              )}

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onDelete?.(item.id)}
                className="h-8 rounded-full bg-red-50/90 hover:bg-red-100 text-[#dc2626] hover:text-[#b91c1c] text-xs font-bold px-3.5 gap-1.5 cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <EditMenuItemModal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        item={item}
        onSave={async (payload) => {
          await onEdit?.(item.id, payload);
          setIsEditOpen(false);
        }}
      />
    </>
  );
}