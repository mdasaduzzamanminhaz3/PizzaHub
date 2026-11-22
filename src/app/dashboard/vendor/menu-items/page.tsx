import React from "react";
import { getVendorMenuItems } from "@/lib/actions/menuItems";
import VendorMenuItemsClient from "@/app/components/vendor/VendorMenuItemsClient";
import { MenuItem } from "@/types/home/menu.types";
import { VendorMenuItem } from "@/app/components/vendor/VendorMenuItemCard";

const normalizeStatus = (status: unknown): VendorMenuItem["status"] => {
  if (status === "Approved" || status === "Rejected" || status === "Pending") {
    return status;
  }
  return "Pending";
};

export default async function VendorMenuItemsPage() {
  const rawItems = await getVendorMenuItems();

  const formattedItems = Array.isArray(rawItems)
    ? rawItems.map((item: MenuItem) => ({
        ...item,
        id: item._id,
        price: Number(item.price),
        status: normalizeStatus(item.status),
        isActive: Boolean(item.isActive ?? true),
      }))
    : [];

  return <VendorMenuItemsClient initialItems={formattedItems} />;
}