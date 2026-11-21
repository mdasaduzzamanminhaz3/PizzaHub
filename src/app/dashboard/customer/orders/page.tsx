import React from "react";
import { getSession } from "@/lib/core/server";
import { getCustomerOrders } from "@/lib/api/orders";

import type { PizzaOrderItem } from "@/app/components/customer/PizzaOrderCard";
import CustomerOrdersClient from "@/app/components/customer/CustomerOrdersClient";

export default async function CustomerOrdersPage() {
  const session = await getSession();
  const userId = session?.user?.id || "";

  const rawOrders = await getCustomerOrders(userId);
  const list = Array.isArray(rawOrders) ? rawOrders : [];

  const formattedOrders: PizzaOrderItem[] = list.map((ord: any) => ({
    id: String(ord._id || ord.id),
    pizzaName: ord.itemName || ord.pizzaName || "Brick-Oven Pizza",
    image:
      ord.image ||
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80",
    status: ord.status || "Pending",
    vendorName: ord.vendorName || ord.vendorId || "Kitchen",
    deliveryDate: ord.deliveryDate || "",
    address: ord.deliveryAddress || ord.address || "",
    requestedOn: ord.createdAt
      ? String(ord.createdAt).split("T")[0]
      : "",
    price: Number(ord.totalAmount ?? ord.price ?? 0),
    quantity: Number(ord.quantity || 1),
  }));

  return <CustomerOrdersClient initialOrders={formattedOrders} />;
}