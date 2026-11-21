import React, { Suspense } from "react";
import { Pizza } from "lucide-react";
import MenuItemCard from "@/components/Home/MenuItemCard";
import { getMenuItems } from "@/lib/api/menuItems";
import { MenuItem } from "@/types/home/menu.types";
import MenuFilterBar from "@/components/BrowseMenu/MenuFilterBar";

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    category?: string;
    location?: string;
  }>;
}) {
  const params = await searchParams;
  const query = new URLSearchParams();

  if (params.search){
      query.set("search", params.search);
    } 
  if (params.category && params.category !== "All Categories") {
    query.set("category", params.category);
  }
  if (params.location && params.location !== "All Locations") {
    query.set("location", params.location);
  }

const menuItems: MenuItem[] = await getMenuItems(query.toString());
const visibleMenuItems = Array.isArray(menuItems)
    ? menuItems.filter(
        (item) => item.status === "Approved" && item.isActive === true
      )
    : [];
  return (
    <section id="menu" className="relative py-12 md:py-16 bg-[#FFFDFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Live Count */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#dc2626]">
              ARTISAN KITCHEN CATALOG
            </span>
            <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-950">
              Browse Pizza Menu
            </h1>
            <p className="mt-1.5 text-sm sm:text-base text-stone-500 font-medium">
              Showing approved &amp; active dishes from local pizzerias.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 self-start sm:self-end px-4 py-2 rounded-full bg-orange-50/90 border border-orange-200/70 text-xs font-bold text-stone-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Showing {menuItems.length} dishes</span>
          </div>
        </div>

        {/* Filter Bar */}
        <Suspense fallback={<div className="h-24 rounded-2xl bg-white border border-orange-200/75 mb-9" />}>
          <MenuFilterBar />
        </Suspense>

        {/* Cards Grid */}
        {visibleMenuItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleMenuItems.map((item) => (
              <MenuItemCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white border border-orange-200/70 p-10 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#dc2626] flex items-center justify-center mx-auto">
              <Pizza className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-stone-900">
              No matching pizzas found
            </h3>
            <p className="text-sm text-stone-500 max-w-md mx-auto">
              Try clearing your search keyword or switching category and location filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}