"use client";

import AdminMenuModerationCard, { AdminMenuItem, ModerationItemStatus } from "@/app/components/admin/AdminMenuModerationCard";
import React, { useMemo, useState } from "react";

import { toast } from "sonner";

const initialModerationItems: AdminMenuItem[] = [
  {
    id: "adm-item-1",
    name: "Wood-Fired Garlic Rosemary Knots",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80",
    vendorName: "Crust & Craft Pizzeria",
    category: "Sides & Appetizers",
    price: 8.5,
    description:
      "Six warm hand-tied sourdough knots brushed with roasted garlic herb butter, sea salt flakes, served with warm marinara.",
    status: "Approved",
  },
  {
    id: "adm-item-2",
    name: "Sicilian Blood Orange & Tiramisu Duo",
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80",
    vendorName: "Il Forno Brick Oven",
    category: "Beverages & Desserts",
    price: 11.0,
    description:
      "Artisanal mascarpone espresso tiramisu paired with sparkling Sicilian blood orange soda.",
    status: "Approved",
  },
  {
    id: "adm-item-3",
    name: "Four Cheese Quattro Formaggi",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80",
    vendorName: "Crust & Craft Pizzeria",
    category: "Classic Pizzas",
    price: 19.5,
    description:
      "Mozzarella, gorgonzola dolce, fontina, and aged Parmigiano-Reggiano with cracked black pepper.",
    status: "Pending",
  },
  {
    id: "adm-item-4",
    name: "Experimental Pineapple Curry Slice",
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80",
    vendorName: "Crust & Craft Pizzeria",
    category: "Specialty / Gourmet Pizzas",
    price: 15.0,
    description:
      "Sweet pineapple chunks with yellow curry drizzle on a crispy pan crust.",
    status: "Rejected",
  },
];

export default function AdminManageMenuItemsPage() {
  const [items, setItems] = useState<AdminMenuItem[]>(initialModerationItems);
  const [statusFilter, setStatusFilter] = useState<"All" | ModerationItemStatus>(
    "All"
  );

  const visibleItems = useMemo(() => {
    if (statusFilter === "All") return items;
    return items.filter((item) => item.status === statusFilter);
  }, [items, statusFilter]);

  const handleApprove = (itemId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, status: "Approved" } : item
      )
    );
    toast.success("Menu item approved for public storefront.");
  };

  const handleReject = (itemId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, status: "Rejected" } : item
      )
    );
    toast.info("Menu item rejected.");
  };

  const handleDelete = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
    toast.success("Menu item permanently deleted.");
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