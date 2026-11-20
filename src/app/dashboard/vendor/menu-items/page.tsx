"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { toast } from "sonner";
import VendorMenuItemCard, { VendorMenuItem } from "@/app/components/vendor/VendorMenuItemCard";
import PlanAllowanceBanner from "@/app/components/vendor/PlanAllowanceBanner";

const FREE_PLAN_LIMIT = 3;

const initialMenuItems: VendorMenuItem[] = [
  {
    id: "menu-1",
    name: "Garden Pesto Primavera",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    category: "Vegetarian Pizzas",
    price: 18.0,
    status: "Approved",
    isActive: true,
  },
  {
    id: "menu-2",
    name: "Wood-Fired Garlic Rosemary Knots",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80",
    category: "Sides & Appetizers",
    price: 8.5,
    status: "Approved",
    isActive: true,
  },
  {
    id: "menu-3",
    name: "Four Cheese Quattro Formaggi",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80",
    category: "Classic Pizzas",
    price: 19.5,
    status: "Pending",
    isActive: true,
  },
  {
    id: "menu-4",
    name: "Experimental Pineapple Curry Melt",
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80",
    category: "Specialty / Gourmet Pizzas",
    price: 15.0,
    status: "Rejected",
    isActive: false,
  },
];

export default function VendorMenuItemsPage() {
  const [items, setItems] = useState<VendorMenuItem[]>(initialMenuItems);

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

  const handleDelete = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
    toast.success("Menu item removed.");
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

      {/* 2-Column Menu Items Grid */}
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
    </div>
  );
}