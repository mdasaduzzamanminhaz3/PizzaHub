import React from "react";
import {
  AdminMenuItem,
  ModerationItemStatus,
} from "@/app/components/admin/AdminMenuModerationCard";
import { getAllMenuItemsAdmin } from "@/lib/actions/menuItems";
import AdminManageMenuItemsClient from "@/app/components/admin/AdminManageMenuItems";

const normalizeStatus = (status: unknown): ModerationItemStatus => {
  const val = String(status || "").toLowerCase();
  if (val === "approved") return "Approved";
  if (val === "rejected") return "Rejected";
  return "Pending";
};

export default async function AdminManageMenuItemsPage() {
  const rawItems = await getAllMenuItemsAdmin();
  const list = Array.isArray(rawItems) ? rawItems : [];

  const formattedItems: AdminMenuItem[] = list.map((item: any) => ({
    id: String(item._id || item.id),
    name: item.name || "Untitled Pizza",
    category: item.category || "Classic Pizzas",
    price: Number(item.price || 0),
    location: item.location || "",
    description: item.description || "",
    image: item.image || "",
    status: normalizeStatus(item.status),
    isActive: Boolean(item.isActive ?? true),
    isFeatured: Boolean(item.isFeatured),
    createdAt: item.createdAt ? String(item.createdAt).split("T")[0] : "",
    vendorId: item.vendorId || "",
    vendorName: item.vendorName || "Vendor",
    vendorEmail: item.vendorEmail || "",
    restaurantName:
      item.restaurantName || item.vendorName || "PizzaHub Kitchen",
    vendorPhone: item.vendorPhone || "",
    vendorAddress: item.vendorAddress || "",
    vendorImage: item.vendorImage || "",
    isVendorPremium: Boolean(item.isVendorPremium),
  }));

  return <AdminManageMenuItemsClient initialItems={formattedItems} />;
}