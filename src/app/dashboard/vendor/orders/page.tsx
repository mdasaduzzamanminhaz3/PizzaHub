"use client";

import IncomingOrderCard, { IncomingCustomerOrder } from "@/app/components/vendor/IncomingOrderCard";
import React, { useState } from "react";

import { toast } from "sonner";

const initialIncomingOrders: IncomingCustomerOrder[] = [
  {
    id: "ord-501",
    orderCode: "#ord-501",
    pizzaName: "Margherita Verace DOP",
    status: "Pending",
    customerName: "Amina Rahman",
    customerEmail: "amina.customer@pizzahub.com",
    deliveryDate: "2026-11-20",
    address: "House 24, Road 7, Dhanmondi, Dhaka",
    note: "Please include extra chili flakes and napkins. Ring bell #2.",
  },
  {
    id: "ord-502",
    orderCode: "#ord-502",
    pizzaName: "Diavola Pepperoni Inferno",
    status: "Accepted",
    customerName: "Rafiqul Islam",
    customerEmail: "rafiq.islam@pizzahub.com",
    deliveryDate: "2026-11-20",
    address: "Road 11, Banani, Dhaka",
    note: "Extra crispy crust if possible.",
  },
];

export default function VendorCustomerOrdersPage() {
  const [orders, setOrders] =
    useState<IncomingCustomerOrder[]>(initialIncomingOrders);

  const handleAccept = (orderId: string) => {
    setOrders((prev) =>
      prev.map((item) =>
        item.id === orderId && item.status === "Pending"
          ? { ...item, status: "Accepted" }
          : item
      )
    );
    toast.success("Order accepted and status locked.");
  };

  const handleReject = (orderId: string) => {
    setOrders((prev) =>
      prev.map((item) =>
        item.id === orderId && item.status === "Pending"
          ? { ...item, status: "Rejected" }
          : item
      )
    );
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
    </div>
  );
}