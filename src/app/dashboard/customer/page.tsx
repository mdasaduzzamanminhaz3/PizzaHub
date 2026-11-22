import React from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { Pizza, ShoppingBag, Clock, CheckCircle2, XCircle } from "lucide-react";
import { auth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import WeeklyCravingsChart, { CravingPoint } from "@/app/components/customer/WeeklyCravingsChart";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

const DAY_ORDER = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

const getDayLabel = (rawDate: unknown): (typeof DAY_ORDER)[number] | null => {
  if (!rawDate) return null;
  const parsed = new Date(String(rawDate));
  if (Number.isNaN(parsed.getTime())) return null;
  const map: Record<number, (typeof DAY_ORDER)[number]> = {
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
    0: "Sun",
  };
  return map[parsed.getDay()] || null;
};

async function getCustomerOrders(userId?: string, email?: string) {
  try {
    const params = new URLSearchParams();
    if (userId) params.set("customerId", userId);
    else if (email) params.set("customerEmail", email);
    else return [];

    const res = await fetch(`${BASE_URL}/orders?${params.toString()}`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

interface StatCardItem {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  valueColor: string;
  badgeBg: string;
  cardTint: string;
}

export default async function CustomerDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userName = session?.user?.name || "Amina Rahman";
  const orders = await getCustomerOrders(
    session?.user?.id,
    session?.user?.email
  );

  const totalOrders = orders.length;
  const pendingCount = orders.filter(
    (o: any) => String(o?.status || "pending").toLowerCase() === "pending"
  ).length;
  const acceptedCount = orders.filter(
    (o: any) => String(o?.status || "").toLowerCase() === "accepted"
  ).length;
  const rejectedCount = orders.filter(
    (o: any) => String(o?.status || "").toLowerCase() === "rejected"
  ).length;

const cravingsByDay: Record<string, number> = {
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
    if (day) {
      cravingsByDay[day] += Number(ord?.quantity || 1);
    }
  }

  const cravingsData: CravingPoint[] = DAY_ORDER.map((day) => ({
    day,
    cravings: cravingsByDay[day],
  }));

  const stats: StatCardItem[] = [
    {
      label: "TOTAL ORDERS",
      value: totalOrders,
      icon: ShoppingBag,
      valueColor: "text-stone-950",
      badgeBg: "bg-stone-100 text-stone-700",
      cardTint: "bg-white border-orange-200/80",
    },
    {
      label: "PENDING",
      value: pendingCount,
      icon: Clock,
      valueColor: "text-amber-600",
      badgeBg: "bg-amber-100/80 text-amber-700",
      cardTint: "bg-[#FFFBF2] border-amber-200/80",
    },
    {
      label: "ACCEPTED",
      value: acceptedCount,
      icon: CheckCircle2,
      valueColor: "text-emerald-600",
      badgeBg: "bg-emerald-100/80 text-emerald-700",
      cardTint: "bg-[#F4FBF7] border-emerald-200/80",
    },
    {
      label: "REJECTED",
      value: rejectedCount,
      icon: XCircle,
      valueColor: "text-[#dc2626]",
      badgeBg: "bg-red-100/80 text-[#dc2626]",
      cardTint: "bg-[#FFF6F6] border-red-200/80",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header & Primary CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-orange-200/80 bg-white px-6 py-5 shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-stone-950">
            Customer Dashboard
          </h1>
          <p className="text-sm text-stone-500 mt-0.5">
            Welcome back,{" "}
            <span className="font-semibold text-stone-700">{userName}</span>.
            Track your pizza deliveries.
          </p>
        </div>

        <Link
          href="/menu"
          className={cn(
            buttonVariants(),
            "w-fit rounded-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold px-5 h-10 shadow-sm shadow-red-600/20 gap-2"
          )}
        >
          <Pizza className="h-4 w-4 -rotate-12" />
          <span>Order New Pizza</span>
        </Link>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.label}
              className={cn(
                "rounded-3xl border shadow-2xs transition-all hover:-translate-y-0.5",
                item.cardTint
              )}
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                    {item.label}
                  </span>
                  <span
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-xl",
                      item.badgeBg
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                </div>
                <p
                  className={cn(
                    "mt-3 text-3xl font-black tracking-tight",
                    item.valueColor
                  )}
                >
                  {item.value}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Separated Chart Component */}
      <WeeklyCravingsChart data={cravingsData} />
    </div>
  );
}