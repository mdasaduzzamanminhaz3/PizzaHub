import React from "react";
import { getAllUsersAdmin } from "@/lib/actions/users";
import type {
  ManagedRole,
  ManagedUserItem,
  UserAccountStatus,
} from "@/app/components/admin/AdminUsersTable";
import AdminManageUsersClient from "@/app/components/admin/AdminManageUsersClient";

const normalizeRole = (role: unknown): ManagedRole => {
  const r = String(role || "customer").toLowerCase();
  if (r === "admin") return "admin";
  if (r === "vendor") return "vendor";
  return "customer";
};

const normalizeStatus = (u: any): UserAccountStatus => {
  if (u?.blocked === true || String(u?.status || "").toLowerCase() === "blocked") {
    return "Blocked";
  }
  return "Active";
};

export default async function AdminManageUsersPage() {
  const rawUsers = await getAllUsersAdmin();

  const formattedUsers: ManagedUserItem[] = rawUsers.map((u: any) => ({
    id: String(u._id || u.id),
    name: u.name || "Unnamed User",
    email: u.email || "",
    image: u.image || "",
    role: normalizeRole(u.role),
    status: normalizeStatus(u),
    isPremiumVendor: Boolean(u.premium || u.isPremiumVendor),
  }));

  return <AdminManageUsersClient initialUsers={formattedUsers} />;
}