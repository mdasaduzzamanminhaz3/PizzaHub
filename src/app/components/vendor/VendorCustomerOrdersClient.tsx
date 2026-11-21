"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import IncomingOrderCard, {
  IncomingCustomerOrder,
} from "@/app/components/vendor/IncomingOrderCard";
import { acceptPizzaOrder, rejectPizzaOrder } from "@/lib/actions/orders";
import { toast } from "sonner";

interface VendorCustomerOrdersClientProps {
  initialOrders: IncomingCustomerOrder[];
}

export default function VendorCustomerOrdersClient({
  initialOrders,
}: VendorCustomerOrdersClientProps) {
  const router = useRouter();
  const [orders, setOrders] =
    useState<IncomingCustomerOrder[]>(initialOrders);

const handleAccept = async (orderId: string) => {
  const res = await acceptPizzaOrder(orderId);

  if (!res?.success) {
    toast.error(res?.message || "Failed to accept order.");
    return;
  }

  setOrders((prev) =>
    prev.map((item) =>
      item.id === orderId && item.status === "Pending"
        ? { ...item, status: "Accepted" }
        : item
    )
  );
  router.refresh();
  toast.success("Order accepted and status locked.");
};

const handleReject = async (orderId: string) => {
  const res = await rejectPizzaOrder(orderId);

  if (!res?.success) {
    toast.error(res?.message || "Failed to reject order.");
    return;
  }

  setOrders((prev) =>
    prev.map((item) =>
      item.id === orderId && item.status === "Pending"
        ? { ...item, status: "Rejected" }
        : item
    )
  );
  router.refresh();
  toast.info("Order rejected and status locked.");
};
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="rounded-3xl border border-orange-200/80 bg-white px-6 py-5 shadow-2xs">
        <h1 className="text-2xl font-extrabold tracking-tight text-stone-950">
          Incoming Customer Orders
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
          Accept or reject pending orders. Once decided, order status is locked.
        </p>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="rounded-3xl border border-orange-200/80 bg-white p-10 text-center">
          <p className="text-sm font-semibold text-stone-500">
            No incoming customer orders yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <IncomingOrderCard
              key={order.id}
              order={order}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          ))}
        </div>
      )}
    </div>
  );
}