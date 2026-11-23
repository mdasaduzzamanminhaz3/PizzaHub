"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateUserProfile } from "@/lib/actions/profile";
import Image from "next/image";

interface ProfileSettingsViewProps {
  initialName?: string;
  initialAddress?: string;
  initialPhone?: string;
  initialAvatar?: string;
  role?: string;
}

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80";

async function uploadToImgBB(file: File): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_IMAGEBB_API_KEY;
  if (!apiKey) {
    throw new Error("ImgBB API key is not configured.");
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  if (!response.ok || !data?.success || !data?.data?.url) {
    throw new Error(data?.error?.message || "Failed to upload avatar.");
  }

  return data.data.url as string;
}
export default function ProfileSettingsView({
  initialName = "",
  initialAddress = "",
  initialPhone = "",
  initialAvatar = "",
  role = "CUSTOMER",
}: ProfileSettingsViewProps) {
  const router = useRouter();
  const [fullName, setFullName] = useState(initialName);
  const [defaultAddress, setDefaultAddress] = useState(initialAddress);
  const [phone, setPhone] = useState(initialPhone);
  const [avatarUrl, setAvatarUrl] = useState(initialAvatar || DEFAULT_AVATAR);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      e.target.value = "";
      return;
    }

    setIsUploadingAvatar(true);
    try {
      const uploadedUrl = await uploadToImgBB(file);
      setAvatarUrl(uploadedUrl);
      toast.success("Avatar uploaded!");
    } catch (error: any) {
      toast.error(error?.message || "Failed to upload image.");
    } finally {
      setIsUploadingAvatar(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fullName.trim()) {
      toast.error("Please enter your full name.");
      return;
    }

    if (isUploadingAvatar) {
      toast.error("Please wait for the image upload to finish.");
      return;
    }

    setIsSaving(true);

    const res = await updateUserProfile({
      name: fullName,
      address: defaultAddress,
      phone,
      image: avatarUrl,
    });

    setIsSaving(false);

    if (!res?.success) {
      toast.error(res?.message || "Failed to update profile.");
      return;
    }

    router.refresh();
    toast.success("Profile updated successfully!");
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
        <Image
          src={avatarUrl || DEFAULT_AVATAR}
          alt={fullName || "User avatar"}
          width={56}
          height={56}
          unoptimized={avatarUrl.startsWith("data:")}
          className="h-14 w-14 rounded-2xl object-cover border border-orange-200/80 bg-[#FAF7F2]"
        />
        <label className="inline-flex h-9 items-center justify-center rounded-xl border border-stone-200 bg-white px-4 text-xs font-bold text-stone-700 hover:bg-[#FAF7F2] transition-colors cursor-pointer">
          <span>{isUploadingAvatar ? "Uploading..." : "Change Avatar"}</span>
          <input
            type="file"
            accept="image/*"
            disabled={isUploadingAvatar || isSaving}
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
            htmlFor="full-name"
            className="block text-xs font-bold text-stone-800"
          >
            Full Name
          </label>
          <input
            id="full-name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full h-11 px-4 rounded-xl border border-stone-200/90 bg-white focus:border-[#dc2626] focus:outline-none text-sm font-medium text-stone-800 transition-all"
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-1.5">
          <label
            htmlFor="phone-number"
            className="block text-xs font-bold text-stone-800"
          >
            Phone Number
          </label>
          <input
            id="phone-number"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="017XXXXXXXX"
            className="w-full h-11 px-4 rounded-xl border border-stone-200/90 bg-white focus:border-[#dc2626] focus:outline-none text-sm font-medium text-stone-800 transition-all"
          />
        </div>

        {/* Default Delivery Address */}
        <div className="space-y-1.5">
          <label
            htmlFor="default-address"
            className="block text-xs font-bold text-stone-800"
          >
            Default Delivery Address
          </label>
          <input
            id="default-address"
            type="text"
            value={defaultAddress}
            onChange={(e) => setDefaultAddress(e.target.value)}
            placeholder="House 24, Road 7, Dhanmondi, Dhaka"
            className="w-full h-11 px-4 rounded-xl border border-stone-200/90 bg-white focus:border-[#dc2626] focus:outline-none text-sm font-medium text-stone-800 transition-all"
          />
        </div>

        {/* Account Role (Locked) */}
        <div className="space-y-1.5">
          <label
            htmlFor="account-role"
            className="block text-[11px] font-extrabold uppercase tracking-wider text-stone-400"
          >
            ACCOUNT ROLE (LOCKED)
          </label>
          <input
            id="account-role"
            type="text"
            value={role}
            readOnly
            disabled
            className="w-44 h-11 px-4 rounded-xl border border-stone-200/80 bg-[#FAF7F2]/80 text-xs font-extrabold tracking-wider text-stone-500 uppercase cursor-not-allowed"
          />
        </div>

        {/* Save Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSaving || isUploadingAvatar}
            className="h-11 px-6 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] disabled:opacity-60 active:scale-[0.99] text-white text-sm font-bold shadow-xs transition-all cursor-pointer"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}