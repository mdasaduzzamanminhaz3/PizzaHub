"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid,
  ClipboardList,
  Settings,
  UtensilsCrossed,
  PlusCircle,
  Crown,
  Users,
  Receipt,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export type DashboardRole = "customer" | "vendor" | "admin";

export interface SidebarUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const roleNavItems: Record<DashboardRole, NavItem[]> = {
  customer: [
    { label: "Overview", href: "/dashboard/customer", icon: LayoutGrid },
    { label: "My Orders", href: "/dashboard/customer/orders", icon: ClipboardList },
    { label: "Profile Settings", href: "/dashboard/customer/settings", icon: Settings },
  ],
  vendor: [
    { label: "Overview", href: "/dashboard/vendor", icon: LayoutGrid },
    { label: "My Menu Items", href: "/dashboard/vendor/menu-items", icon: UtensilsCrossed },
    { label: "Add Menu Item", href: "/dashboard/vendor/add-menu-item", icon: PlusCircle },
    { label: "Customer Orders", href: "/dashboard/vendor/orders", icon: ClipboardList },
    { label: "Subscription", href: "/dashboard/vendor/subscription", icon: Crown },
    { label: "Profile Settings", href: "/dashboard/vendor/settings", icon: Settings },
  ],
  admin: [
    { label: "Overview", href: "/dashboard/admin", icon: LayoutGrid },
    { label: "Manage Users", href: "/dashboard/admin/users", icon: Users },
    { label: "Manage Menu Items", href: "/dashboard/admin/menu-items", icon: UtensilsCrossed },
    { label: "Transactions", href: "/dashboard/admin/transactions", icon: Receipt },
  ],
};

export default function DashboardSidebar({
  role,
  user,
}: {
  role: DashboardRole;
  user?: SidebarUser | null;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const items = roleNavItems[role] || roleNavItems.customer;

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("Signed out successfully!");
    router.replace("/signIn");
    router.refresh();
  };

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="rounded-3xl border border-orange-200/80 bg-white p-4 shadow-sm shadow-orange-950/5 lg:sticky lg:top-24">
        {/* User Profile Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-orange-100">
          <Avatar className="h-11 w-11 ring-2 ring-orange-200/80 shrink-0">
            <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
            <AvatarFallback className="bg-gradient-to-br from-[#dc2626] to-[#f97316] text-white text-sm font-bold">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-sm font-extrabold text-stone-900 truncate">
              {user?.name || "PizzaHub User"}
            </p>
            <span className="mt-1 inline-block rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-600">
              {role}
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="mt-4 flex flex-col gap-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all",
                  isActive
                    ? "bg-[#dc2626] text-white shadow-xs shadow-red-600/20"
                    : "text-stone-700 hover:bg-[#FAF7F2] hover:text-stone-950"
                )}
              >
                <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-white" : "text-stone-500")} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sign Out */}
        <div className="mt-4 pt-3 border-t border-orange-100">
          <button
            type="button"
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#dc2626] hover:bg-red-50 transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}