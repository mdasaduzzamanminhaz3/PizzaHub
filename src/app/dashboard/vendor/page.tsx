import React from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { Plus } from "lucide-react";
import { auth } from "@/lib/auth";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import VendorStatCards, {
  VendorOverviewStats,
} from "@/app/components/vendor/VendorStatCards";
import WeeklyKitchenVolumeChart from "@/app/components/vendor/WeeklyKitchenVolumeChart";
import { getUserById } from "@/lib/api/users";
import { getVendorOrders } from "@/lib/api/orders";
import { getVendorMenuItems } from "@/lib/actions/menuItems";

export const dynamic = "force-dynamic";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

const getDayName = (dateValue: unknown) => {
  if (!dateValue) return null;
  const date = new Date(String(dateValue));
  if (Number.isNaN(date.getTime())) return null;
  const dayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
  return dayMap[date.getDay()];
};

export default async function VendorDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const vendorId = session?.user?.id || "";

  const [dbUser, rawMenuItems, rawOrders] = await Promise.all([
    vendorId ? getUserById(vendorId) : Promise.resolve(null),
    getVendorMenuItems(),
    vendorId ? getVendorOrders(vendorId) : Promise.resolve([]),
  ]);

  const menuItems = Array.isArray(rawMenuItems) ? rawMenuItems : [];
  const orders = Array.isArray(rawOrders) ? rawOrders : [];

  const vendorName = dbUser?.name || session?.user?.name || "";
  const pizzeriaName =
    dbUser?.restaurantName ||
    dbUser?.businessName ||
    (vendorName ? `${vendorName}'s Pizzeria` : "Crust & Craft Pizzeria");

  const stats: VendorOverviewStats = {
    totalItems: menuItems.length,
    activeApproved: menuItems.filter(
      (item: any) =>
        String(item?.status || "").toLowerCase() === "approved" &&
        item?.isActive !== false
    ).length,
    pendingOrders: orders.filter(
      (ord: any) => String(ord?.status || "").toLowerCase() === "pending"
    ).length,
    acceptedOrders: orders.filter(
      (ord: any) => String(ord?.status || "").toLowerCase() === "accepted"
    ).length,
    currentPlan: dbUser?.premium ? "Pro" : "Free",
  };

  const counts: Record<string, number> = {
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
    Sun: 0,
  };

  for (const ord of orders) {
    const day = getDayName(ord?.createdAt || ord?.deliveryDate);
    if (day) {
      counts[day] += Number(ord?.quantity || 1);
    }
  }

  const volumeData = DAYS.map((day) => ({
    day,
    orders: counts[day],
    volume: counts[day],
  }));

  return (
    <div className="space-y-6">
      {/* Top Header & Add Menu Item CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-orange-200/80 bg-white px-6 py-5 shadow-2xs">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-stone-950">
            {pizzeriaName}
          </h1>
          <p className="text-sm text-stone-500 mt-0.5">
            Manage your brick-oven menu and incoming customer orders.
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
          <span>Add Menu Item</span>
        </Link>
      </div>

      {/* Separated 5 Stat Cards Component */}
      <VendorStatCards stats={stats} />

      {/* Separated Weekly Kitchen Order Volume Chart Component */}
      <WeeklyKitchenVolumeChart data={volumeData} />
    </div>
  );
}