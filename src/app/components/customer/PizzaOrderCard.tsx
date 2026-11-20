"use client";

import React from "react";
import { MapPin, Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type OrderStatus = "Pending" | "Accepted" | "Rejected";

export interface PizzaOrderItem {
  id: string;
  pizzaName: string;
  image: string;
  status: OrderStatus;
  vendorName: string;
  deliveryDate: string;
  address: string;
  requestedOn: string;
  price?: number;
  quantity?: number;
}

interface PizzaOrderCardProps {
  order: PizzaOrderItem;
  onDetails?: (order: PizzaOrderItem) => void;
  onCancel?: (orderId: string) => void;
}

const statusStyles: Record<
  OrderStatus,
  { badge: string; dot: string }
> = {
  Pending: {
    badge: "bg-amber-100/90 text-amber-800 border-amber-200/80",
    dot: "bg-amber-500",
  },
  Accepted: {
    badge: "bg-emerald-100/90 text-emerald-800 border-emerald-200/80",
    dot: "bg-emerald-500",
  },
  Rejected: {
    badge: "bg-red-100/90 text-[#dc2626] border-red-200/80",
    dot: "bg-[#dc2626]",
  },
};

export default function PizzaOrderCard({
  order,
  onDetails,
  onCancel,
}: PizzaOrderCardProps) {
  const currentStatus = statusStyles[order.status];
  const canCancel = order.status === "Pending";

  return (
    <Card className="group rounded-3xl border border-orange-200/80 bg-white shadow-2xs transition-all duration-200 hover:border-orange-300 hover:shadow-md hover:shadow-orange-950/5">
      <CardContent className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Pizza Image + Order Details */}
        <div className="flex items-start sm:items-center gap-4 min-w-0">
          <div className="relative h-20 w-24 sm:h-22 sm:w-28 shrink-0 overflow-hidden rounded-2xl border border-orange-200/70 bg-[#FAF7F2]">
            <img
              src={order.image}
              alt={order.pizzaName}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="min-w-0 space-y-1">
            {/* Title + Status Badge */}
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-base sm:text-lg font-extrabold text-stone-950 truncate">
                {order.pizzaName}
              </h2>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold",
                  currentStatus.badge
                )}
              >
                <span className={cn("h-1.5 w-1.5 rounded-full", currentStatus.dot)} />
                {order.status}
              </span>
            </div>

            {/* Vendor & Delivery Date */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-[13px] text-stone-600 font-medium">
              <span>
                Vendor: <strong className="text-stone-800">{order.vendorName}</strong>
              </span>
              <span className="text-stone-300">•</span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-[#f97316]" />
                Delivery Date: <strong className="text-stone-800">{order.deliveryDate}</strong>
              </span>
            </div>

            {/* Address */}
            <p className="flex items-center gap-1 text-xs text-stone-600">
              <MapPin className="h-3.5 w-3.5 text-[#dc2626] shrink-0" />
              <span className="truncate">Address: {order.address}</span>
            </p>

            {/* Requested Date */}
            <p className="flex items-center gap-1 text-[11px] text-stone-400 pt-0.5">
              <Clock className="h-3 w-3 shrink-0" />
              <span>Requested on {order.requestedOn}</span>
            </p>
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-orange-100">
          <Button
            type="button"
            variant="outline"
            onClick={() => onDetails?.(order)}
            className="h-9 rounded-full border-orange-200/80 bg-[#FAF7F2]/70 hover:bg-orange-50 text-stone-800 text-xs font-bold px-4 cursor-pointer"
          >
            Details
          </Button>

          {canCancel && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => onCancel?.(order.id)}
              className="h-9 rounded-full bg-red-50/90 hover:bg-red-100 text-[#dc2626] hover:text-[#b91c1c] text-xs font-bold px-4 cursor-pointer"
            >
              Cancel Order
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}