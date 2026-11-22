import React from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AdminStatCards, {
  AdminOverviewStats,
} from "@/app/components/admin/AdminStatCards";
import PlatformTrendChart, {
  type PlatformTrendPoint,
} from "@/app/components/admin/PlatformTrendChart";
import { getAllUsersAdmin } from "@/lib/actions/users";
import { getAllMenuItemsAdmin } from "@/lib/actions/menuItems";
import { getAllPaymentsAdmin } from "@/lib/api/payments";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

const DAY_ORDER = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

const getDayLabel = (rawDate: unknown): (typeof DAY_ORDER)[number] | null => {
  if (!rawDate) return null;
  const parsed = new Date(String(rawDate));
  if (Number.isNaN(parsed.getTime())) return null;
  const jsDay = parsed.getDay(); // 0 = Sun, 1 = Mon ... 6 = Sat
  const map: Record<number, (typeof DAY_ORDER)[number]> = {
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
    0: "Sun",
  };
  return map[jsDay] || null;
};

async function getAllOrdersAdmin() {
  try {
    const res = await fetch(`${BASE_URL}/orders`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function AdminDashboardPage() {
  const [rawUsers, rawMenuItems, rawPayments, rawOrders] = await Promise.all([
    getAllUsersAdmin(),
    getAllMenuItemsAdmin(),
    getAllPaymentsAdmin(),
    getAllOrdersAdmin(),
  ]);

  const users = Array.isArray(rawUsers) ? rawUsers : [];
  const menuItems = Array.isArray(rawMenuItems) ? rawMenuItems : [];
  const payments = Array.isArray(rawPayments) ? rawPayments : [];
  const orders = Array.isArray(rawOrders) ? rawOrders : [];

  const totalVendors = users.filter(
    (u: any) => String(u?.role || "").toLowerCase() === "vendor"
  ).length;

  const totalCustomers = users.filter(
    (u: any) => String(u?.role || "").toLowerCase() === "customer"
  ).length;

  const pendingMenuItems = menuItems.filter(
    (item: any) =>
      String(item?.status || "pending").toLowerCase() === "pending"
  ).length;

  const stats: AdminOverviewStats = {
    totalUsers: users.length,
    totalVendors,
    totalCustomers,
    totalMenuItems: menuItems.length,
    pendingMenuItems,
    totalTransactions: payments.length,
  };

  // দিন অনুযায়ী Orders + Payments + MenuItems অ্যাক্টিভিটি গণনা
  const countsByDay: Record<string, number> = {
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
    Sun: 0,
  };

  for (const ord of orders) {
    const day = getDayLabel(ord?.createdAt || ord?.deliveryDate);
    if (day) countsByDay[day] += 1;
  }

  for (const pay of payments) {
    const day = getDayLabel(pay?.payment_date || pay?.createdAt);
    if (day) countsByDay[day] += 1;
  }

  for (const menu of menuItems) {
    const day = getDayLabel(menu?.createdAt);
    if (day) countsByDay[day] += 1;
  }

  const trendData: PlatformTrendPoint[] = DAY_ORDER.map((day) => ({
    day,
    activity: countsByDay[day],
  }));

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

      {/* Dynamic Trend Chart Component */}
      <PlatformTrendChart data={trendData} />
    </div>
  );
}