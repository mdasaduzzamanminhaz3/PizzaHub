"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter, MapPin, RotateCcw } from "lucide-react";

const defaultCategories = [
  "All Categories",
  "Classic Pizzas",
  "Vegetarian Pizzas",
  "Meat Lovers",
  "Specialty / Gourmet Pizzas",
  "Sides & Appetizers",
  "Beverages & Desserts",
];

const defaultLocations = [
  "All Locations",
  "Dhanmondi",
  "Gulshan 2",
  "Banani",
  "Uttara",
];

export default function MenuFilterBar({
  categories = defaultCategories,
  locations = defaultLocations,
}: {
  categories?: string[];
  locations?: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "All Categories";
  const selectedLocation = searchParams.get("location") || "All Locations";

  const updateQuery = (key: string, value: string, defaultVal: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === defaultVal) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const qs = params.toString();
    router.replace(qs ? `?${qs}` : "?", { scroll: false });
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategory !== "All Categories" ||
    selectedLocation !== "All Locations";

  return (
    <div className="rounded-2xl bg-white p-3.5 sm:p-4 border border-orange-200/75 shadow-sm mb-9">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="relative md:col-span-6">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            defaultValue={searchQuery}
            onChange={(e) => updateQuery("search", e.target.value, "")}
            placeholder="Search pizza name or ingredients..."
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#FAF7F2] border border-orange-200/60 focus:border-[#dc2626] focus:bg-white focus:outline-none text-sm font-medium text-stone-800 placeholder:text-stone-400 transition-all"
          />
        </div>

        <div className="relative md:col-span-3">
          <Filter className="w-4 h-4 text-[#dc2626] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={selectedCategory}
            onChange={(e) =>
              updateQuery("category", e.target.value, "All Categories")
            }
            aria-label="Filter by category"
            className="w-full h-11 pl-10 pr-8 rounded-xl bg-[#FAF7F2] border border-orange-200/60 focus:border-[#dc2626] focus:bg-white focus:outline-none text-sm font-semibold text-stone-700 cursor-pointer transition-all"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="relative md:col-span-3">
          <MapPin className="w-4 h-4 text-[#f97316] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={selectedLocation}
            onChange={(e) =>
              updateQuery("location", e.target.value, "All Locations")
            }
            aria-label="Filter by neighborhood"
            className="w-full h-11 pl-10 pr-8 rounded-xl bg-[#FAF7F2] border border-orange-200/60 focus:border-[#dc2626] focus:bg-white focus:outline-none text-sm font-semibold text-stone-700 cursor-pointer transition-all"
          >
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-3 pt-3 border-t border-orange-100 flex items-center justify-between gap-2 text-xs">
          <span className="text-stone-500 font-medium">
            Active filters applied
          </span>
          <button
            type="button"
            onClick={() => router.replace("?", { scroll: false })}
            className="inline-flex items-center gap-1.5 font-bold text-[#dc2626] hover:text-[#b91c1c] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      )}
    </div>
  );
}