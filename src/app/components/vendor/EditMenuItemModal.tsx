"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { VendorMenuItem } from "./VendorMenuItemCard";

export interface MenuItemUpdatePayload {
  name: string;
  category: string;
  price: number;
  image: string;
  location?: string;
  description?: string;
}

interface EditMenuItemModalProps {
  open: boolean;
  onClose: () => void;
  item: VendorMenuItem;
  onSave: (payload: MenuItemUpdatePayload) => Promise<void> | void;
}

const categories = [
  "Classic Pizzas",
  "Vegetarian Pizzas",
  "Meat Lovers",
  "Specialty / Gourmet Pizzas",
  "Sides & Appetizers",
  "Beverages & Desserts",
];

export default function EditMenuItemModal({
  open,
  onClose,
  item,
  onSave,
}: EditMenuItemModalProps) {
  const [name, setName] = useState(item.name);
  const [category, setCategory] = useState(item.category);
  const [price, setPrice] = useState(String(item.price));
  const [image, setImage] = useState(item.image || "");
  const [location, setLocation] = useState(item.location || "");
  const [description, setDescription] = useState(item.description || "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setName(item.name);
      setCategory(item.category);
      setPrice(String(item.price));
      setImage(item.image || "");
      setLocation(item.location || "");
      setDescription(item.description || "");
      setError(null);
    }
  }, [open, item]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const numericPrice = Number(price);
    if (!name.trim()) {
      setError("Dish name is required.");
      return;
    }
    if (Number.isNaN(numericPrice) || numericPrice <= 0) {
      setError("Please enter a valid price greater than 0.");
      return;
    }

    try {
      setSubmitting(true);
      await onSave({
        name: name.trim(),
        category,
        price: numericPrice,
        image: image.trim() || "/PizzaHub.png",
        location: location.trim() || undefined,
        description: description.trim() || undefined,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update menu item."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/50 backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-menu-item-title"
      onClick={() => {
        if (!submitting) onClose();
      }}
    >
      <div
        className="w-full max-w-lg rounded-3xl border border-orange-200/80 bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-orange-100 pb-3.5">
          <div>
            <h3
              id="edit-menu-item-title"
              className="text-lg font-extrabold text-stone-950"
            >
              Edit Menu Item
            </h3>
            <p className="text-xs text-stone-500">
              Update dish details for your pizzeria catalog.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            aria-label="Close modal"
            className="rounded-full p-1.5 text-stone-400 hover:bg-orange-50 hover:text-stone-700 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-[#dc2626]">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Dish Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 px-3.5 rounded-xl bg-[#FAF7F2] border border-orange-200/70 focus:border-[#dc2626] focus:bg-white focus:outline-none text-sm font-medium text-stone-900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-[#FAF7F2] border border-orange-200/70 focus:border-[#dc2626] focus:bg-white focus:outline-none text-sm font-semibold text-stone-800"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full h-10 px-3.5 rounded-xl bg-[#FAF7F2] border border-orange-200/70 focus:border-[#dc2626] focus:bg-white focus:outline-none text-sm font-medium text-stone-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="/PizzaHub.png"
                className="w-full h-10 px-3.5 rounded-xl bg-[#FAF7F2] border border-orange-200/70 focus:border-[#dc2626] focus:bg-white focus:outline-none text-sm font-medium text-stone-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Dhanmondi"
                className="w-full h-10 px-3.5 rounded-xl bg-[#FAF7F2] border border-orange-200/70 focus:border-[#dc2626] focus:bg-white focus:outline-none text-sm font-medium text-stone-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description of ingredients or crust..."
              className="w-full p-3 rounded-xl bg-[#FAF7F2] border border-orange-200/70 focus:border-[#dc2626] focus:bg-white focus:outline-none text-sm font-medium text-stone-900"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-orange-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              disabled={submitting}
              className="h-9 rounded-full px-4 text-xs font-bold cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={submitting}
              className="h-9 rounded-full bg-[#dc2626] hover:bg-[#b91c1c] text-white px-5 text-xs font-bold cursor-pointer"
            >
              {submitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}