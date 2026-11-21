"use client";

import React, { useRef, useState } from "react";
import { CloudUpload, X, Loader2, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createMenuItem, getCurrentVendor } from "@/lib/actions/menuItems";

const categories = [
  "Classic Pizzas",
  "Specialty / Gourmet Pizzas",
  "Vegetarian Pizzas",
  "Meat Lovers",
  "Sides & Appetizers",
  "Beverages & Desserts",
];

const locations = [
  "Gulshan 2",
  "Banani",
  "Dhanmondi",
  "Uttara",
  "Mirpur",
  "Bashundhara R/A",
];

export default function AddMenuItemForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setImagePreview(localUrl);

    try {
      setUploadingImage(true);
      const imgFormData = new FormData();
      imgFormData.append("image", file);

      const apiKey = process.env.NEXT_PUBLIC_IMAGEBB_API_KEY;
      if (!apiKey) {
        setUploadedImageUrl(localUrl);
        toast.info("Preview ready (ImgBB API key will upload on live env).");
        setUploadingImage(false);
        return;
      }

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: imgFormData,
      });
      const result = await res.json();

      if (result.success) {
        setUploadedImageUrl(result.data.url);
        toast.success("Pizza photo uploaded to ImgBB!");
      } else {
        toast.error("Failed to upload image. Please try again.");
        setImagePreview(null);
      }
    } catch (err) {
      console.error(err);
      toast.error("Image upload error.");
      setImagePreview(null);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setUploadedImageUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = e.currentTarget;
  const formData = new FormData(form);
  const rawData = Object.fromEntries(formData.entries());

  const name = String(rawData.name || "").trim();
  const description = String(rawData.description || "").trim();
  const price = Number(rawData.price);
  const image = uploadedImageUrl || imagePreview || "";

  if (!name || !price || !description) {
    toast.error("Please fill out all required fields.");
    return;
  }

  if (!image) {
    toast.error("Please upload a pizza photo first.");
    return;
  }

  try {
    setSubmitting(true);
    const { vendorId, vendorName } = await getCurrentVendor();

    const payload = {
      ...rawData,
      name,
      description,
      price,
      image,
      vendorId,
      vendorName,
      status: "Pending",
      isActive: true,
      isFeatured: false,
      createdAt: new Date(),
    };

    const result = await createMenuItem(payload);

    if (result?.acknowledged) {
      toast.success("Menu item submitted for Admin review!");
      form.reset();
      handleRemoveImage();
    } else {
      toast.error("Failed to save menu item.");
    }
  } catch (error) {
    console.error("Create menu item error:", error);
    toast.error("Something went wrong while submitting.");
  } finally {
    setSubmitting(false);
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Row 1: Item Name & Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="itemName" className="text-xs font-bold text-stone-800">
            Item Name <span className="text-[#dc2626]">*</span>
          </Label>
          <Input
            id="itemName"
            name="name"
            type="text"
            required
            placeholder="e.g., Calabrian Honey Soppressata"
            className="h-11 rounded-2xl bg-[#FAF7F2]/60 border-orange-200/80 focus-visible:border-[#dc2626]"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="category" className="text-xs font-bold text-stone-800">
            Category <span className="text-[#dc2626]">*</span>
          </Label>
          <select
            id="category"
            name="category"
            defaultValue={categories[0]}
            className="h-11 w-full rounded-2xl border border-orange-200/80 bg-[#FAF7F2]/60 px-3.5 text-sm font-medium text-stone-900 outline-none focus:border-[#dc2626]"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 2: Price & Restaurant Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="price" className="text-xs font-bold text-stone-800">
            Price (USD) <span className="text-[#dc2626]">*</span>
          </Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            placeholder="19.50"
            className="h-11 rounded-2xl bg-[#FAF7F2]/60 border-orange-200/80 focus-visible:border-[#dc2626]"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="location" className="text-xs font-bold text-stone-800">
            Restaurant Area / Location <span className="text-[#dc2626]">*</span>
          </Label>
          <select
            id="location"
            name="location"
            defaultValue={locations[0]}
            className="h-11 w-full rounded-2xl border border-orange-200/80 bg-[#FAF7F2]/60 px-3.5 text-sm font-medium text-stone-900 outline-none focus:border-[#dc2626]"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 3: Description */}
      <div className="space-y-1.5">
        <Label htmlFor="description" className="text-xs font-bold text-stone-800">
          Description <span className="text-[#dc2626]">*</span>
        </Label>
        <textarea
          id="description"
          name="description"
          rows={3}
          required
          placeholder="Describe dough fermentation, cheese blend, and toppings..."
          className="w-full rounded-2xl border border-orange-200/80 bg-[#FAF7F2]/60 p-3.5 text-sm text-stone-900 placeholder:text-stone-400 outline-none focus:border-[#dc2626]"
        />
      </div>

      {/* Row 4: Item Image Upload Box (ImgBB) */}
      <div className="space-y-1.5">
        <Label className="text-xs font-bold text-stone-800">
          Item Image (Required — Hosted via ImgBB){" "}
          <span className="text-[#dc2626]">*</span>
        </Label>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        {imagePreview ? (
          <div className="relative flex flex-col sm:flex-row items-center gap-4 rounded-2xl border border-orange-200 bg-[#FAF7F2] p-4">
            <img
              src={imagePreview}
              alt="Pizza preview"
              className="h-24 w-28 rounded-xl object-cover border border-orange-200/80"
            />
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <p className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />
                {uploadingImage
                  ? "Uploading to ImgBB..."
                  : "Photo Ready for Submission"}
              </p>
              <p className="text-xs text-stone-500 mt-0.5 truncate">
                {uploadedImageUrl || "Selected pizza image"}
              </p>
            </div>
            <button
              type="button"
              onClick={handleRemoveImage}
              aria-label="Remove image"
              className="inline-flex items-center gap-1 rounded-full bg-white border border-orange-200 px-3 py-1.5 text-xs font-bold text-[#dc2626] hover:bg-red-50 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
              Remove
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-orange-300 bg-[#FAF7F2] px-4 py-8 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100/80 text-[#f97316] mb-2">
              {uploadingImage ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <CloudUpload className="h-5 w-5" />
              )}
            </div>
            <p className="text-xs font-bold text-stone-800 mb-3">
              Select Pizza Photo to Upload
            </p>
            <button
              type="button"
              disabled={uploadingImage}
              onClick={() => fileInputRef.current?.click()}
              className="rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold px-5 py-2.5 shadow-2xs transition-colors cursor-pointer"
            >
              {uploadingImage
                ? "Uploading to ImgBB..."
                : "Choose File & Upload to ImgBB"}
            </button>
          </div>
        )}
      </div>

      {/* Submit CTA */}
      <div className="pt-1">
        <Button
          type="submit"
          disabled={uploadingImage || submitting}
          className="h-11 rounded-2xl bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm font-bold px-6 shadow-sm shadow-red-600/20 cursor-pointer"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Item for Admin Review"
          )}
        </Button>
      </div>
    </form>
  );
}