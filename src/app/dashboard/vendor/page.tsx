import React from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { Plus } from "lucide-react";
import { auth } from "@/lib/auth";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import VendorStatCards, { VendorOverviewStats } from "@/app/components/vendor/VendorStatCards";
import WeeklyKitchenVolumeChart from "@/app/components/vendor/WeeklyKitchenVolumeChart";


export default async function VendorDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const pizzeriaName = session?.user?.name
    ? `${session.user.name}'s Pizzeria`
    : "Crust & Craft Pizzeria";

  const stats: VendorOverviewStats = {
    totalItems: 4,
    activeApproved: 2,
    pendingOrders: 1,
    acceptedOrders: 0,
    currentPlan: "Free",
  };

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
      <WeeklyKitchenVolumeChart />
    </div>
  );
}