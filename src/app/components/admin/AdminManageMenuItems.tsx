"use client";

import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import AdminMenuModerationCard, {
  AdminMenuItem,
  ModerationItemStatus,
} from "@/app/components/admin/AdminMenuModerationCard";
import { deleteMenuItem, updateMenuItemStatus } from "@/lib/actions/menuItems";

interface AdminManageMenuItemsClientProps {
  initialItems: AdminMenuItem[];
}

export default function AdminManageMenuItemsClient({
  initialItems,
}: AdminManageMenuItemsClientProps) {
  const [items, setItems] = useState<AdminMenuItem[]>(initialItems);
  const [statusFilter, setStatusFilter] = useState<"All" | ModerationItemStatus>(
    "All"
  );

  const visibleItems = useMemo(() => {
    if (statusFilter === "All") return items;
    return items.filter((item) => item.status === statusFilter);
  }, [items, statusFilter]);

  const handleApprove = async (itemId: string) => {
    try {
      const result = await updateMenuItemStatus(itemId, { status: "Approved" });

      if (result?.modifiedCount > 0 || result?.matchedCount > 0) {
        setItems((prev) =>
          prev.map((item) =>
            item.id === itemId ? { ...item, status: "Approved" } : item
          )
        );
        toast.success("Menu item approved for public storefront.");
      } else {
        toast.error("Failed to approve menu item.");
      }
    } catch (error) {
      console.error("Approve error:", error);
      toast.error("Something went wrong while approving.");
    }
  };

  const handleReject = async (itemId: string) => {
    try {
      const result = await updateMenuItemStatus(itemId, { status: "Rejected" });

      if (result?.modifiedCount > 0 || result?.matchedCount > 0) {
        setItems((prev) =>
          prev.map((item) =>
            item.id === itemId ? { ...item, status: "Rejected" } : item
          )
        );
        toast.info("Menu item rejected.");
      } else {
        toast.error("Failed to reject menu item.");
      }
    } catch (error) {
      console.error("Reject error:", error);
      toast.error("Something went wrong while rejecting.");
    }
  };

  const handleDelete = async (itemId: string) => {
    try {
      const result = await deleteMenuItem(itemId);

      if (result?.deletedCount > 0) {
        setItems((prev) => prev.filter((item) => item.id !== itemId));
        toast.success("Menu item permanently deleted.");
      } else {
        toast.error("Failed to delete menu item.");
      }
    } catch (error) {
      console.error("Admin delete error:", error);
      toast.error("Something went wrong while deleting.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header + Status Filter Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-orange-200/80 bg-white px-6 py-5 shadow-2xs">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-stone-950">
            Moderate Menu Items
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Approve pending dishes for the public storefront or reject
            inappropriate items.
          </p>
        </div>

        <select
          aria-label="Filter menu items by status"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as "All" | ModerationItemStatus)
          }
          className="h-10 w-fit rounded-2xl border border-orange-200/80 bg-[#FAF7F2]/70 px-3.5 text-xs sm:text-sm font-bold text-stone-800 outline-none focus:border-[#dc2626] cursor-pointer"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Moderation Cards List */}
      <div className="space-y-4">
        {visibleItems.length > 0 ? (
          visibleItems.map((item) => (
            <AdminMenuModerationCard
              key={item.id}
              item={item}
              onApprove={handleApprove}
              onReject={handleReject}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="rounded-3xl border border-orange-200/80 bg-white p-10 text-center">
            <p className="text-sm font-bold text-stone-700">
              No menu items in &ldquo;{statusFilter}&rdquo; status.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}