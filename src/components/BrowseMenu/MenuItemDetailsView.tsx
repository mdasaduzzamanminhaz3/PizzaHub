"use client";

import React, { useState } from "react";
import {
  MapPin,
  Crown,
  ShoppingBag,
  Sparkles,
  Flame,
  Clock,
  Minus,
  Plus,
} from "lucide-react";
import type { MenuItem } from "@/types/home/menu.types";
import { toast } from "sonner";
import { createPizzaOrder } from "@/lib/actions/orders";

interface MenuItemDetailsViewProps {
  item: MenuItem;
  defaultAddress?: string;
  defaultPhone?: string;
}

export default function MenuItemDetailsView({
  item,
  defaultAddress = "",
  defaultPhone = "",
}: MenuItemDetailsViewProps) {
  const galleryImages = [
    item.image,
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
  ].filter(Boolean);

  const [selectedImage, setSelectedImage] = useState<string>(galleryImages[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [deliveryDate, setDeliveryDate] = useState<string>("");
  const [deliveryAddress, setDeliveryAddress] =
    useState<string>(defaultAddress);
  const [customerPhone, setCustomerPhone] = useState<string>(defaultPhone);
  const [instructions, setInstructions] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const orderTotal = (Number(item.price) * quantity).toFixed(2);

  const handleSubmitOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!deliveryDate || !deliveryAddress) {
      toast.error("Please fill in delivery date and delivery address.");
      return;
    }

    setIsSubmitting(true);

    const res = await createPizzaOrder({
      menuItemId: item._id || "",
      itemName: item.name,
      image: item.image || "",
      vendorId: item.vendorId || "",
      quantity,
      unitPrice: Number(item.price),
      totalAmount: Number(orderTotal),
      deliveryDate,
      deliveryAddress,
      customerPhone,
      instructions,
    });

    setIsSubmitting(false);

    if (!res?.success) {
      toast.error(res?.message || "Failed to place order");
      return;
    }

    toast.success("Order Submitted!");
    setQuantity(1);
    setDeliveryDate("");
    setInstructions("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Image Gallery + Dish Details Card */}
      <div className="lg:col-span-7 space-y-6">
        {/* Main Hero Photo */}
        <div className="relative overflow-hidden rounded-3xl bg-white border border-orange-200/70 shadow-sm aspect-[16/11]">
          <img
            src={selectedImage}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
          />

          {item.isFeatured && (
            <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50/95 backdrop-blur-xs border border-amber-200 text-amber-800 text-xs font-extrabold shadow-xs">
              <Crown className="w-3.5 h-3.5 text-amber-500" />
              <span>Featured Dish</span>
            </div>
          )}
        </div>

        {/* Thumbnails Row */}
        {galleryImages.length > 1 && (
          <div className="flex items-center gap-3">
            {galleryImages.map((imgUrl, idx) => {
              const isActive = selectedImage === imgUrl;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`relative w-20 h-16 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                    isActive
                      ? "border-[#dc2626] ring-2 ring-[#dc2626]/20 scale-105"
                      : "border-orange-200/70 opacity-75 hover:opacity-100"
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${item.name} preview ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        )}

        {/* Dish Info Card */}
        <div className="rounded-3xl bg-white border border-orange-200/75 p-6 sm:p-7 shadow-xs space-y-5">
          {/* Top Badges Row */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-50 border border-red-100 text-[#dc2626] text-xs font-extrabold">
              {item.category}
            </span>

            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500">
              <MapPin className="w-3.5 h-3.5 text-[#f97316]" />
              <span>Prepared in {item.location}</span>
            </span>
          </div>

          {/* Title & Price */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-950">
              {item.name}
            </h1>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#dc2626] shrink-0">
              ${Number(item.price).toFixed(2)}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base leading-relaxed text-stone-600">
            {item.description}
          </p>

          {/* Oven Highlights */}
          <div className="flex flex-wrap gap-3 pt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F2] text-xs font-semibold text-stone-700">
              <Flame className="w-3.5 h-3.5 text-[#dc2626]" />
              Brick-Oven Baked
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F2] text-xs font-semibold text-stone-700">
              <Clock className="w-3.5 h-3.5 text-[#f97316]" />
              Freshly Prepared to Order
            </span>
          </div>

          {/* Kitchen / Vendor Footer */}
          <div className="pt-4 border-t border-orange-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-orange-100 text-[#dc2626] font-extrabold text-sm flex items-center justify-center uppercase">
                {item.vendorId?.slice(0, 2) || "PH"}
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                  Prepared by
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-sm font-extrabold text-stone-900">
                    {item.vendorId}
                  </span>
                  {item.isFeatured && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-[11px] font-bold text-amber-700">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      Premium
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Sticky Delivery Order Card */}
      <div className="lg:col-span-5 lg:sticky lg:top-24">
        <form
          onSubmit={handleSubmitOrder}
          className="rounded-3xl bg-white border border-orange-200/80 p-6 sm:p-7 shadow-sm space-y-5"
        >
          <div>
            <h2 className="text-xl font-extrabold text-stone-950">
              Place Delivery Order
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-stone-500">
              Submit your order directly to the kitchen. Pay upon
              confirmation/delivery.
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between rounded-2xl bg-[#FAF7F2] border border-orange-200/60 px-4 py-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-stone-600">
              Quantity
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-8 h-8 rounded-xl bg-white border border-orange-200 text-stone-700 hover:border-[#dc2626] hover:text-[#dc2626] disabled:opacity-50 flex items-center justify-center transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center text-sm font-extrabold text-stone-900">
                {quantity}
              </span>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="w-8 h-8 rounded-xl bg-white border border-orange-200 text-stone-700 hover:border-[#dc2626] hover:text-[#dc2626] disabled:opacity-50 flex items-center justify-center transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Delivery Date */}
          <div className="space-y-1.5">
            <label
              htmlFor="delivery-date"
              className="block text-[11px] font-extrabold uppercase tracking-wider text-stone-600"
            >
              Delivery Date
            </label>
            <input
              id="delivery-date"
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-[#FAF7F2] border border-orange-200/70 focus:border-[#dc2626] focus:bg-white focus:outline-none text-sm font-medium text-stone-800 transition-all"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label
              htmlFor="customer-phone"
              className="block text-[11px] font-extrabold uppercase tracking-wider text-stone-600"
            >
              Phone Number
            </label>
            <input
              id="customer-phone"
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="017XXXXXXXX"
              className="w-full h-11 px-3.5 rounded-xl bg-[#FAF7F2] border border-orange-200/70 focus:border-[#dc2626] focus:bg-white focus:outline-none text-sm font-medium text-stone-800 placeholder:text-stone-400 transition-all"
            />
          </div>

          {/* Delivery Address */}
          <div className="space-y-1.5">
            <label
              htmlFor="delivery-address"
              className="block text-[11px] font-extrabold uppercase tracking-wider text-stone-600"
            >
              Delivery Address
            </label>
            <input
              id="delivery-address"
              type="text"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="House 24, Road 7, Dhanmondi, Dhaka"
              className="w-full h-11 px-3.5 rounded-xl bg-[#FAF7F2] border border-orange-200/70 focus:border-[#dc2626] focus:bg-white focus:outline-none text-sm font-medium text-stone-800 placeholder:text-stone-400 transition-all"
            />
          </div>

          {/* Special Instructions */}
          <div className="space-y-1.5">
            <label
              htmlFor="special-instructions"
              className="block text-[11px] font-extrabold uppercase tracking-wider text-stone-600"
            >
              Special Instructions / Message
            </label>
            <textarea
              id="special-instructions"
              rows={3}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Extra chili flakes, gate code, or crust notes..."
              className="w-full p-3.5 rounded-xl bg-[#FAF7F2] border border-orange-200/70 focus:border-[#dc2626] focus:bg-white focus:outline-none text-sm font-medium text-stone-800 placeholder:text-stone-400 resize-none transition-all"
            />
          </div>

          {/* Order Total Box */}
          <div className="rounded-2xl bg-[#FAF7F2] border border-orange-200/60 px-4 py-3.5 flex items-center justify-between">
            <span className="text-sm font-semibold text-stone-600">
              Order Total
            </span>
            <span className="text-xl font-extrabold text-stone-950">
              ${orderTotal}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] disabled:opacity-60 active:scale-[0.99] text-white text-sm font-extrabold inline-flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>
              {isSubmitting ? "Submitting Order..." : "Submit Pizza Order"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}