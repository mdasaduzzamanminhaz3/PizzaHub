"use client";

import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";
import AdminUsersTable, { ManagedUserItem } from "@/app/components/admin/AdminUsersTable";
import AdminUsersStatCards from "@/app/components/admin/AdminUsersStatCards";

const initialUsers: ManagedUserItem[] = [
  {
    id: "usr-1",
    name: "Amina Rahman",
    email: "amina.customer@pizzahub.com",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    role: "customer",
    status: "Active",
  },
  {
    id: "usr-2",
    name: "Marco Rossi",
    email: "marco@fornobrick.com",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    role: "vendor",
    status: "Active",
    isPremiumVendor: true,
  },
  {
    id: "usr-3",
    name: "Tariq Hasan",
    email: "tariq@crustcraft.com",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    role: "vendor",
    status: "Active",
    isPremiumVendor: false,
  },
  {
    id: "usr-4",
    name: "Elena Vance",
    email: "elena@napoliheat.com",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    role: "vendor",
    status: "Active",
    isPremiumVendor: true,
  },
  {
    id: "usr-5",
    name: "Zayed Chowdhury",
    email: "admin@pizzahub.com",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    role: "admin",
    status: "Active",
  },
  {
    id: "usr-6",
    name: "Rafiul Islam",
    email: "rafi@example.com",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
    role: "customer",
    status: "Blocked",
  },
];

export default function AdminManageUsersPage() {
  const [users, setUsers] = useState<ManagedUserItem[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "customer" | "vendor" | "admin">("all");

  const stats = useMemo(() => {
    const totalUsers = users.length;
    const activeUsers = users.filter((u) => u.status === "Active").length;
    const blockedUsers = users.filter((u) => u.status === "Blocked").length;
    const customerUsers = users.filter((u) => u.role === "customer").length;
    const vendorUsers = users.filter((u) => u.role === "vendor").length;
    const premiumVendors = users.filter(
      (u) => u.role === "vendor" && u.isPremiumVendor
    ).length;

    return {
      totalUsers,
      activeUsers,
      blockedUsers,
      customerUsers,
      vendorUsers,
      premiumVendors,
    };
  }, [users]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q);
      return matchesRole && matchesQuery;
    });
  }, [users, searchQuery, roleFilter]);

  const handleRoleChange = (userId: string, nextRole: "customer" | "vendor") => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId && u.role !== "admin" ? { ...u, role: nextRole } : u))
    );
    toast.success(`User role updated to ${nextRole}.`);
  };

  const handleToggleBlock = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId || u.role === "admin") return u;
        const nextStatus = u.status === "Active" ? "Blocked" : "Active";
        toast.info(
          nextStatus === "Blocked"
            ? `${u.name} has been blocked.`
            : `${u.name} has been unblocked.`
        );
        return { ...u, status: nextStatus };
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-orange-200/80 bg-white px-6 py-5 shadow-2xs">
        <h1 className="text-2xl font-extrabold tracking-tight text-stone-950">
          Manage Registered Users
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
          Search users, switch roles between customer and vendor, and manage platform access.
        </p>
      </div>

      {/* Top 6 Stat Cards */}
      <AdminUsersStatCards stats={stats} />

      {/* Search & Role Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="h-4 w-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 rounded-2xl border-orange-200/80 bg-white pl-10 focus-visible:border-[#dc2626]"
          />
        </div>

        <select
          aria-label="Filter users by role"
          value={roleFilter}
          onChange={(e) =>
            setRoleFilter(
              e.target.value as "all" | "customer" | "vendor" | "admin"
            )
          }
          className="h-11 rounded-2xl border border-orange-200/80 bg-white px-4 text-xs sm:text-sm font-bold text-stone-800 outline-none focus:border-[#dc2626] cursor-pointer"
        >
          <option value="all">All Roles</option>
          <option value="customer">Customer</option>
          <option value="vendor">Vendor</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Users Table Component */}
      <AdminUsersTable
        users={filteredUsers}
        onRoleChange={handleRoleChange}
        onToggleBlock={handleToggleBlock}
      />
    </div>
  );
}