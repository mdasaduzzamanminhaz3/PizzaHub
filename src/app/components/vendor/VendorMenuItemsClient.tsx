"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Pizza } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import VendorMenuItemCard, {
  VendorMenuItem,
} from "@/app/components/vendor/VendorMenuItemCard";
import PlanAllowanceBanner from "@/app/components/vendor/PlanAllowanceBanner";
import { deleteMenuItem } from "@/lib/actions/menuItems";

const FREE_PLAN_LIMIT = 3;

interface VendorMenuItemsClientProps {
  initialItems: VendorMenuItem[];
}

export default function VendorMenuItemsClient({
  initialItems,
}: VendorMenuItemsClientProps) {
  const [items, setItems] = useState<VendorMenuItem[]>(initialItems);

  const activeApprovedCount = items.filter(
    (item) => item.status === "Approved" && item.isActive
  ).length;

  const handleToggleActive = (itemId: string) => {
    const target = items.find((item) => item.id === itemId);
    if (!target) return;

    if (!target.isActive && activeApprovedCount >= FREE_PLAN_LIMIT) {
      toast.error(
        `Free Plan limit (${FREE_PLAN_LIMIT} active items) reached. Upgrade to Premium to activate more.`
      );
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, isActive: !item.isActive } : item
      )
    );
    toast.success(
      target.isActive ? "Item marked as Inactive." : "Item marked as Active."
    );
  };

const handleDelete = async (itemId: string) => {
    try {
      const result = await deleteMenuItem(itemId);

      if (result?.deletedCount > 0) {
        setItems((prev) => prev.filter((item) => item.id !== itemId));
        toast.success("Menu item removed.");
      } else {
        toast.error("Failed to remove menu item.");
      }
    } catch (error) {
      console.error("Delete menu item error:", error);
      toast.error("Something went wrong while deleting.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-orange-200/80 bg-white px-6 py-5 shadow-2xs">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-stone-950">
            My Menu Items
          </h1>
          <p className="text-sm text-stone-500 mt-0.5">
            Plan Allowance:{" "}
            <span className="font-bold text-stone-800">
              {activeApprovedCount} / {FREE_PLAN_LIMIT}
            </span>{" "}
            Active Items (Free Plan)
          </p>
        </div>

        <Link
          href="/dashboard/vendor/add-menu-item"
          className={cn(
            buttonVariants(),
            "w-fit rounded-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold px-5 h-10 shadow-sm shadow-red-600/20 gap-2"
          )}
        >
          <Plus className="h-4 w-4" />
          <span>Add New Item</span>
        </Link>
      </div>

      {/* Separated Plan Banner Component */}
      <PlanAllowanceBanner
        activeCount={activeApprovedCount}
        limit={FREE_PLAN_LIMIT}
        planName="Free Plan"
      />

      {/* 2-Column Menu Items Grid or Empty State */}
      {items.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {items.map((item) => (
            <VendorMenuItemCard
              key={item.id}
              item={item}
              onToggleActive={handleToggleActive}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-orange-200/80 bg-white p-10 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#dc2626] flex items-center justify-center mx-auto">
            <Pizza className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-extrabold text-stone-900">
            No menu items created yet
          </h3>
          <p className="text-sm text-stone-500 max-w-md mx-auto">
            Start by adding your first pizza or side dish for admin approval.
          </p>
          <Link
            href="/dashboard/vendor/add-menu-item"
            className={cn(
              buttonVariants(),
              "mt-2 inline-flex rounded-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold px-5 h-10 gap-2"
            )}
          >
            <Plus className="h-4 w-4" />
            <span>Add Your First Item</span>
          </Link>
        </div>
      )}
    </div>
  );
}