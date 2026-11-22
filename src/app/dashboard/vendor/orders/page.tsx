import React from "react";
import { getSession } from "@/lib/core/server";
import VendorCustomerOrdersClient from "@/app/components/vendor/VendorCustomerOrdersClient";
import type { IncomingCustomerOrder } from "@/app/components/vendor/IncomingOrderCard";
import { getVendorOrders } from "@/lib/api/orders";

export default async function VendorCustomerOrdersPage() {
  const session = await getSession();
  const vendorId = session?.user?.id || "";

  const rawOrders = await getVendorOrders(vendorId);
  const list = Array.isArray(rawOrders) ? rawOrders : [];

  const formattedOrders: IncomingCustomerOrder[] = list.map((ord: any) => {
    const idStr = String(ord._id || ord.id);
    return {
id: idStr,
    orderCode: ord.orderCode || `#${idStr.slice(-6)}`,
    pizzaName: ord.itemName || ord.pizzaName || "Brick-Oven Pizza",
    status: ord.status || "Pending",
    customerName: ord.customerName || "Customer",
    customerEmail: ord.customerEmail || "",
    customerPhone: ord.customerPhone || ord.phone || "",
    deliveryDate: ord.deliveryDate || "",
    address: ord.deliveryAddress || ord.address || "",
    note: ord.instructions || ord.note || "",
    quantity: Number(ord.quantity || 1),
    totalAmount: Number(ord.totalAmount ?? ord.price ?? 0),
    requestedOn: ord.createdAt ? String(ord.createdAt).split("T")[0] : "",
    };
  });

  return <VendorCustomerOrdersClient initialOrders={formattedOrders} />;
}