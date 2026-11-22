"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateUserProfile } from "@/lib/actions/profile";

interface VendorProfileSettingsViewProps {
  initialName?: string;
  initialRestaurantName?: string;
  initialAddress?: string;
  initialPhone?: string;
  initialAvatar?: string;
  role?: string;
  subscription?: string;
}

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80";

export default function VendorProfileSettingsView({
  initialName = "",
  initialRestaurantName = "",
  initialAddress = "",
  initialPhone = "",
  initialAvatar = "",
  role = "VENDOR",
  subscription = "FREE",
}: VendorProfileSettingsViewProps) {
  const router = useRouter();
  const [fullName, setFullName] = useState(initialName);
  const [restaurantName, setRestaurantName] = useState(initialRestaurantName);
  const [phone, setPhone] = useState(initialPhone);
  const [address, setAddress] = useState(initialAddress);
  const [avatarUrl, setAvatarUrl] = useState(initialAvatar || DEFAULT_AVATAR);
  const [isSaving, setIsSaving] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setAvatarUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fullName.trim()) {
      toast.error("Please enter your full name.");
      return;
    }

    setIsSaving(true);

    const res = await updateUserProfile({
      name: fullName,
      restaurantName,
      phone,
      address,
      image: avatarUrl,
    });

    setIsSaving(false);

    if (!res?.success) {
      toast.error(res?.message || "Failed to update profile.");
      return;
    }

    router.refresh();
    toast.success("Vendor profile updated successfully!");
  };

  return (
    <div className="rounded-3xl border border-orange-200/80 bg-white p-6 sm:p-8 shadow-2xs space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-stone-950">
          Profile Settings
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Update your personal details. Account role and subscription privileges
          are read-only.
        </p>
      </div>

      {/* Avatar Row */}
      <div className="flex items-center gap-4 pt-1">
        <img
          src={avatarUrl || DEFAULT_AVATAR}
          alt={fullName || "Vendor avatar"}
          className="h-14 w-14 rounded-2xl object-cover border border-orange-200/80 bg-[#FAF7F2]"
        />

        <label className="inline-flex h-9 items-center justify-center rounded-xl border border-stone-200 bg-white px-4 text-xs font-bold text-stone-700 hover:bg-[#FAF7F2] transition-colors cursor-pointer">
          <span>Change Avatar</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label
            htmlFor="vendor-full-name"
            className="block text-xs font-bold text-stone-800"
          >
            Full Name
          </label>
          <input
            id="vendor-full-name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full h-11 px-4 rounded-xl border border-stone-200/90 bg-white focus:border-[#dc2626] focus:outline-none text-sm font-medium text-stone-800 transition-all"
          />
        </div>

        {/* Restaurant Business Name */}
        <div className="space-y-1.5">
          <label
            htmlFor="restaurant-name"
            className="block text-xs font-bold text-stone-800"
          >
            Restaurant Business Name
          </label>
          <input
            id="restaurant-name"
            type="text"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            placeholder="Crust & Craft Pizzeria"
            className="w-full h-11 px-4 rounded-xl border border-stone-200/90 bg-white focus:border-[#dc2626] focus:outline-none text-sm font-medium text-stone-800 transition-all"
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-1.5">
          <label
            htmlFor="vendor-phone"
            className="block text-xs font-bold text-stone-800"
          >
            Phone Number
          </label>
          <input
            id="vendor-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="017XXXXXXXX"
            className="w-full h-11 px-4 rounded-xl border border-stone-200/90 bg-white focus:border-[#dc2626] focus:outline-none text-sm font-medium text-stone-800 transition-all"
          />
        </div>

        {/* Kitchen / Business Address */}
        <div className="space-y-1.5">
          <label
            htmlFor="vendor-address"
            className="block text-xs font-bold text-stone-800"
          >
            Kitchen / Business Address
          </label>
          <input
            id="vendor-address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Road 11, Banani, Dhaka"
            className="w-full h-11 px-4 rounded-xl border border-stone-200/90 bg-white focus:border-[#dc2626] focus:outline-none text-sm font-medium text-stone-800 transition-all"
          />
        </div>

        {/* Read-only Role & Subscription Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              htmlFor="vendor-role"
              className="block text-[11px] font-extrabold uppercase tracking-wider text-stone-400"
            >
              ACCOUNT ROLE (LOCKED)
            </label>
            <input
              id="vendor-role"
              type="text"
              value={role}
              readOnly
              disabled
              className="w-full h-11 px-4 rounded-xl border border-stone-200/80 bg-[#FAF7F2]/80 text-xs font-extrabold tracking-wider text-stone-500 uppercase cursor-not-allowed"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="vendor-subscription"
              className="block text-[11px] font-extrabold uppercase tracking-wider text-stone-400"
            >
              SUBSCRIPTION (STRIPE MANAGED)
            </label>
            <input
              id="vendor-subscription"
              type="text"
              value={subscription}
              readOnly
              disabled
              className="w-full h-11 px-4 rounded-xl border border-stone-200/80 bg-[#FAF7F2]/80 text-xs font-extrabold tracking-wider text-stone-500 uppercase cursor-not-allowed"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="h-11 px-6 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] disabled:opacity-60 active:scale-[0.99] text-white text-sm font-bold shadow-xs transition-all cursor-pointer"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}