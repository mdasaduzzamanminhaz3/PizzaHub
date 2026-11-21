import React from "react";
import { AdminMenuItem, ModerationItemStatus } from "@/app/components/admin/AdminMenuModerationCard";
import { getAllMenuItemsAdmin } from "@/lib/actions/menuItems";
import { MenuItem } from "@/types/home/menu.types";
import AdminManageMenuItemsClient from "@/app/components/admin/AdminManageMenuItems";

const normalizeStatus = (status: unknown): ModerationItemStatus => {
  const val = String(status || "").toLowerCase();
  if (val === "approved") return "Approved";
  if (val === "rejected") return "Rejected";
  return "Pending";
};

export default async function AdminManageMenuItemsPage() {
  const rawItems = await getAllMenuItemsAdmin();

  const formattedItems: AdminMenuItem[] = Array.isArray(rawItems)
    ? rawItems.map((item: MenuItem) => ({
        id: String(item._id ),
        name: item.name || "",
        image: item.image || "",
        vendorName: item.vendorName || "Unknown Vendor",
        category: item.category || "",
        price: Number(item.price || 0),
        description: item.description || "",
        status: normalizeStatus(item.status),
      }))
    : [];

  return <AdminManageMenuItemsClient initialItems={formattedItems} />;
}