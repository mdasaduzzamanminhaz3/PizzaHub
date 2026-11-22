"use client";

import React from "react";
import {
  User,
  Phone,
  Calendar,
  MapPin,
  MessageSquareQuote,
  Check,
  X,
  Lock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type IncomingOrderStatus =
  | "Pending"
  | "Accepted"
  | "Rejected"
  | "Cancelled";

export interface IncomingCustomerOrder {
  id: string;
  orderCode: string;
  pizzaName: string;
  status: IncomingOrderStatus;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  deliveryDate: string;
  address: string;
  note?: string;
  quantity?: number;
  totalAmount?: number;
  requestedOn?: string;
}

interface IncomingOrderCardProps {
  order: IncomingCustomerOrder;
  onDetails?: (order: IncomingCustomerOrder) => void;
  onAccept?: (orderId: string) => void;
  onReject?: (orderId: string) => void;
}

const statusStyles: Record<
  string,
  { badge: string; dot: string; label: string }
> = {
  Pending: {
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
    label: "Pending",
  },
  Accepted: {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
    label: "Accepted",
  },
  Rejected: {
    badge: "bg-rose-50 text-rose-700 border-rose-200",
    dot: "bg-rose-500",
    label: "Rejected",
  },
  Cancelled: {
    badge: "bg-stone-100 text-stone-600 border-stone-200",
    dot: "bg-stone-400",
    label: "Cancelled",
  },
};

export default function IncomingOrderCard({
  order,
  onDetails,
  onAccept,
  onReject,
}: IncomingOrderCardProps) {
  const currentStatus = statusStyles[order.status] || statusStyles.Pending;
  const isPending = order.status === "Pending";

  return (
    <Card className="rounded-3xl border border-orange-200/80 bg-white shadow-2xs transition-all duration-200 hover:border-orange-300 hover:shadow-md hover:shadow-orange-950/5">
      <CardContent className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        {/* Left: Order Info */}
        <div className="space-y-2 min-w-0 flex-1">
          {/* Order Code + Pizza Name + Status Badge */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-bold text-stone-400">
              {order.orderCode}
            </span>
            <h2 className="text-base sm:text-lg font-extrabold text-stone-950">
              {order.pizzaName}
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
              {order.status}
            </span>
          </div>

          {/* Customer Line (Name + Email + Phone) */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-[13px] text-stone-600">
            <span className="inline-flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-[#f97316] shrink-0" />
              <span className="font-semibold text-stone-500">Customer:</span>
              <strong className="text-stone-900">{order.customerName}</strong>
              {order.customerEmail && (
                <span className="text-stone-500">({order.customerEmail})</span>
              )}
            </span>

            {order.customerPhone && (
              <>
                <span className="text-stone-300">•</span>
                <span className="inline-flex items-center gap-1 font-semibold text-stone-800">
                  <Phone className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>{order.customerPhone}</span>
                </span>
              </>
            )}
          </div>

          {/* Delivery Date & Address */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-[13px] text-stone-600">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-[#dc2626] shrink-0" />
              <span className="font-semibold text-stone-500">
                Delivery Date:
              </span>
              <strong className="text-stone-900">{order.deliveryDate}</strong>
            </span>
            <span className="text-stone-300">•</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-stone-400 shrink-0" />
              <span className="font-semibold text-stone-500">Address:</span>
              <span className="text-stone-700">{order.address}</span>
            </span>
          </div>

          {/* Customer Note Pill */}
          {order.note && (
            <div className="pt-1">
              <div className="inline-flex items-start gap-2 rounded-xl border border-amber-200/80 bg-[#FFFBEB] px-3 py-1.5 text-xs text-amber-950">
                <MessageSquareQuote className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="font-bold text-amber-900">Note:</strong>{" "}
                  &ldquo;{order.note}&rdquo;
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right: Details + Accept / Reject or Locked State */}
        <div className="flex flex-wrap items-center justify-end gap-2.5 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-orange-100">
          <Button
            type="button"
            variant="outline"
            onClick={() => onDetails?.(order)}
            className="h-9 rounded-xl border-orange-200/80 bg-[#FAF7F2]/70 hover:bg-orange-50 text-stone-800 text-xs font-bold px-3.5 cursor-pointer"
          >
            Details
          </Button>

          {isPending ? (
            <>
              <Button
                type="button"
                onClick={() => onAccept?.(order.id)}
                className="h-9 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 gap-1.5 shadow-2xs cursor-pointer"
              >
                <Check className="h-3.5 w-3.5" />
                <span>Accept Order</span>
              </Button>

              <Button
                type="button"
                onClick={() => onReject?.(order.id)}
                className="h-9 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs font-bold px-4 gap-1.5 shadow-2xs cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
                <span>Reject</span>
              </Button>
            </>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF7F2] border border-orange-200/70 px-3.5 py-1.5 text-xs font-bold text-stone-500">
              <Lock className="h-3.5 w-3.5 text-stone-400" />
              <span>Status Locked</span>
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}