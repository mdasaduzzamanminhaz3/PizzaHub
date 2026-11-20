import React from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AdminStatCards, { AdminOverviewStats } from "@/app/components/admin/AdminStatCards";
import PlatformTrendChart from "@/app/components/admin/PlatformTrendChart";

export default function AdminDashboardPage() {
  const stats: AdminOverviewStats = {
    totalUsers: 6,
    totalVendors: 3,
    totalCustomers: 2,
    totalMenuItems: 9,
    pendingMenuItems: 1,
    totalTransactions: 3,
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Pending Review CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-orange-200/80 bg-white px-6 py-5 shadow-2xs">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-stone-950">
            Admin Governance Console
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Platform metrics, user moderation, menu approval, and immutable
            ledger.
          </p>
        </div>

        <Link
          href="/dashboard/admin/menu-items"
          className={cn(
            buttonVariants(),
            "w-fit rounded-full bg-[#f59e0b] hover:bg-[#d97706] text-stone-950 font-bold px-4 h-10 shadow-2xs gap-2"
          )}
        >
          <Clock className="h-4 w-4 text-stone-900" />
          <span>Review {stats.pendingMenuItems} Pending Menu Item(s)</span>
        </Link>
      </div>

      {/* Separated 6 Stat Cards Component */}
      <AdminStatCards stats={stats} />

      {/* Separated Trend Chart Component */}
      <PlatformTrendChart />
    </div>
  );
}