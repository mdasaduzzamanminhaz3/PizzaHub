"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Pizza } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import PizzaOrderCard, { PizzaOrderItem } from "@/app/components/customer/PizzaOrderCard";

const initialOrders: PizzaOrderItem[] = [
  {
    id: "ord-1",
    pizzaName: "Margherita Verace DOP",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80",
    status: "Pending",
    vendorName: "Il Forno Brick Oven",
    deliveryDate: "2026-11-20",
    address: "House 24, Road 7, Dhanmondi, Dhaka",
    requestedOn: "2026-11-19",
    price: 950,
    quantity: 1,
  },
  {
    id: "ord-2",
    pizzaName: "Diavola Pepperoni Inferno",
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80",
    status: "Accepted",
    vendorName: "Napoli Heat Kitchen",
    deliveryDate: "2026-11-18",
    address: "House 24, Road 7, Dhanmondi, Dhaka",
    requestedOn: "2026-11-17",
    price: 1180,
    quantity: 1,
  },
  {
    id: "ord-3",
    pizzaName: "Garden Pesto Primavera",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    status: "Rejected",
    vendorName: "Crust & Craft Pizzeria",
    deliveryDate: "2026-11-14",
    address: "House 24, Road 7, Dhanmondi, Dhaka",
    requestedOn: "2026-11-13",
    price: 890,
    quantity: 1,
  },
  {
    id: "ord-4",
    pizzaName: "Wood-Fired Garlic Rosemary Knots",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80",
    status: "Pending",
    vendorName: "Crust & Craft Pizzeria",
    deliveryDate: "2026-11-22",
    address: "House 24, Road 7, Dhanmondi, Dhaka",
    requestedOn: "2026-11-19",
    price: 450,
    quantity: 2,
  },
];

export default function CustomerOrdersPage() {
  const [orders, setOrders] = useState<PizzaOrderItem[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<PizzaOrderItem | null>(
    null
  );

  const handleCancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((item) =>
        item.id === orderId ? { ...item, status: "Rejected" } : item
      )
    );
    toast.success("Order cancelled.");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-orange-200/80 bg-white px-6 py-5 shadow-2xs">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-stone-950">
            My Pizza Orders
          </h1>
          <p className="text-sm text-stone-500 mt-0.5">
            View order status or cancel pending orders before kitchen acceptance.
          </p>
        </div>

        <Link
          href="/menu"
          className={cn(
            buttonVariants(),
            "w-fit rounded-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold px-5 h-10 shadow-sm shadow-red-600/20 gap-2"
          )}
        >
          <Pizza className="h-4 w-4 -rotate-12" />
          <span>Order More</span>
        </Link>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <PizzaOrderCard
            key={order.id}
            order={order}
            onDetails={(item) => setSelectedOrder(item)}
            onCancel={handleCancelOrder}
          />
        ))}
      </div>

      {/* Simple Details Modal */}
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
                  Order ID: {selectedOrder.id}
                </p>
              </div>
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-[#dc2626]">
                {selectedOrder.status}
              </span>
            </div>

            <div className="space-y-2 rounded-2xl bg-[#FAF7F2] p-4 text-xs text-stone-700 border border-orange-200/60">
              <p>
                <strong>Vendor:</strong> {selectedOrder.vendorName}
              </p>
              <p>
                <strong>Delivery Date:</strong> {selectedOrder.deliveryDate}
              </p>
              <p>
                <strong>Address:</strong> {selectedOrder.address}
              </p>
              <p>
                <strong>Requested On:</strong> {selectedOrder.requestedOn}
              </p>
              {selectedOrder.price && (
                <p>
                  <strong>Total Price:</strong> ৳{selectedOrder.price}
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