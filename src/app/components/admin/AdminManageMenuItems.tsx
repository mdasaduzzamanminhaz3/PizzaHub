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
  const [selectedItem, setSelectedItem] = useState<AdminMenuItem | null>(null);

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
        setSelectedItem((prev) =>
          prev?.id === itemId ? { ...prev, status: "Approved" } : prev
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
        setSelectedItem((prev) =>
          prev?.id === itemId ? { ...prev, status: "Rejected" } : prev
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
        if (selectedItem?.id === itemId) {
          setSelectedItem(null);
        }
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
              onDetails={(dish) => setSelectedItem(dish)}
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

      {/* Full Dish & Vendor Details Modal */}
      {selectedItem && (
        <div
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border border-orange-200/80 bg-white p-6 shadow-xl space-y-4"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-extrabold text-stone-950">
                  {selectedItem.name}
                </h3>
                <p className="text-xs text-stone-500">
                  Item ID: {selectedItem.id} • {selectedItem.category}
                </p>
              </div>
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-[#dc2626]">
                {selectedItem.status}
              </span>
            </div>

            {/* Dish Preview */}
            {selectedItem.image && (
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-44 object-cover rounded-2xl border border-orange-200/70"
              />
            )}

            {/* Dish Info */}
            <div className="space-y-1.5 rounded-2xl bg-[#FAF7F2] p-4 text-xs text-stone-700 border border-orange-200/60">
              <p>
                <strong>Price:</strong> ${Number(selectedItem.price).toFixed(2)}
              </p>
              <p>
                <strong>Area / Location:</strong> {selectedItem.location || "N/A"}
              </p>
              {selectedItem.createdAt && (
                <p>
                  <strong>Submitted On:</strong> {selectedItem.createdAt}
                </p>
              )}
              <div className="pt-1">
                <strong>Description:</strong>
                <p className="mt-1 whitespace-pre-line text-stone-600">
                  {selectedItem.description}
                </p>
              </div>
            </div>

            {/* Vendor Full Information */}
            <div className="space-y-2 rounded-2xl bg-orange-50/50 p-4 text-xs text-stone-700 border border-orange-200/70">
              <div className="flex items-center gap-3 pb-1">
                {selectedItem.vendorImage && (
                  <img
                    src={selectedItem.vendorImage}
                    alt={selectedItem.vendorName || "Vendor"}
                    className="h-10 w-10 rounded-xl object-cover border border-orange-200"
                  />
                )}
                <div>
                  <p className="font-extrabold text-stone-900">
                    {selectedItem.restaurantName || "PizzaHub Kitchen"}
                  </p>
                  <p className="text-[11px] font-semibold text-stone-500">
                    {selectedItem.isVendorPremium
                      ? "Premium (PRO) Vendor"
                      : "Standard (FREE) Vendor"}
                  </p>
                </div>
              </div>

              <p>
                <strong>Vendor Name:</strong> {selectedItem.vendorName || "N/A"}
              </p>
              <p>
                <strong>Vendor Email:</strong>{" "}
                {selectedItem.vendorEmail || "N/A"}
              </p>
              <p>
                <strong>Phone Number:</strong>{" "}
                {selectedItem.vendorPhone || "N/A"}
              </p>
              <p>
                <strong>Vendor Address:</strong>{" "}
                {selectedItem.vendorAddress || "N/A"}
              </p>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
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