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
  const [selectedOrder, setSelectedOrder] =
    useState<IncomingCustomerOrder | null>(null);

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
              onDetails={(item) => setSelectedOrder(item)}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          ))}
        </div>
      )}

      {/* Order & Customer Details Modal */}
      {selectedOrder && (
        <div
          onClick={() => setSelectedOrder(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-3xl border border-orange-200/80 bg-white p-6 shadow-xl space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-extrabold text-stone-950">
                  {selectedOrder.pizzaName}
                </h3>
                <p className="text-xs text-stone-500">
                  Order Code: {selectedOrder.orderCode} • ID: {selectedOrder.id}
                </p>
              </div>
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-[#dc2626]">
                {selectedOrder.status}
              </span>
            </div>

            <div className="space-y-2 rounded-2xl bg-[#FAF7F2] p-4 text-xs text-stone-700 border border-orange-200/60">
              <p>
                <strong>Customer Name:</strong> {selectedOrder.customerName}
              </p>
              {selectedOrder.customerEmail && (
                <p>
                  <strong>Customer Email:</strong> {selectedOrder.customerEmail}
                </p>
              )}
              <p>
                <strong>Phone Number:</strong>{" "}
                {selectedOrder.customerPhone || "Not provided"}
              </p>
              {selectedOrder.quantity !== undefined && (
                <p>
                  <strong>Quantity:</strong> {selectedOrder.quantity}
                </p>
              )}
              {selectedOrder.totalAmount !== undefined && (
                <p>
                  <strong>Total Amount:</strong> ${selectedOrder.totalAmount}
                </p>
              )}
              <p>
                <strong>Delivery Date:</strong> {selectedOrder.deliveryDate}
              </p>
              <p>
                <strong>Delivery Address:</strong> {selectedOrder.address}
              </p>
              {selectedOrder.requestedOn && (
                <p>
                  <strong>Requested On:</strong> {selectedOrder.requestedOn}
                </p>
              )}
              {selectedOrder.note && (
                <p>
                  <strong>Customer Note:</strong> &ldquo;{selectedOrder.note}
                  &rdquo;
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="rounded-full bg-[#dc2626] hover:bg-[#b91c1c] px-5 py-2 text-xs font-bold text-white cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}