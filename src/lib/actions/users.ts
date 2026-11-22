"use server";

import { protectedMutation } from "@/lib/core/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const getAllUsersAdmin = async () => {
  const res = await fetch(`${BASE_URL}/users`, { cache: "no-store" });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
};

export const updateUserRoleAdmin = async (
  userId: string,
  role: "customer" | "vendor"
) => {
  const res = await protectedMutation(`${BASE_URL}/users/${userId}`, "PATCH", {
    role,
  });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    return {
      success: false,
      message: data?.message || "Failed to update user role.",
    };
  }

  return {
    success: true,
    message: `User role updated to ${role}.`,
    modifiedCount: Number(data?.modifiedCount ?? 1),
  };
};

export const toggleUserBlockAdmin = async (
  userId: string,
  nextBlocked: boolean
) => {
  const res = await protectedMutation(`${BASE_URL}/users/${userId}`, "PATCH", {
    blocked: nextBlocked,
  });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    return {
      success: false,
      message: data?.message || "Failed to update user status.",
    };
  }

  return {
    success: true,
    message: nextBlocked ? "User blocked." : "User unblocked.",
    modifiedCount: Number(data?.modifiedCount ?? 1),
  };
};