"use client";

import React from "react";
import { ShieldAlert, ShieldCheck, Ban, CheckCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ManagedRole = "customer" | "vendor" | "admin";
export type UserAccountStatus = "Active" | "Blocked";

export interface ManagedUserItem {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: ManagedRole;
  status: UserAccountStatus;
  isPremiumVendor?: boolean;
}

interface AdminUsersTableProps {
  users: ManagedUserItem[];
  onRoleChange?: (userId: string, nextRole: "customer" | "vendor") => void;
  onToggleBlock?: (userId: string) => void;
}

export default function AdminUsersTable({
  users,
  onRoleChange,
  onToggleBlock,
}: AdminUsersTableProps) {
  if (users.length === 0) {
    return (
      <div className="rounded-3xl border border-orange-200/80 bg-white p-10 text-center">
        <p className="text-sm font-bold text-stone-700">
          No matching users found.
        </p>
        <p className="text-xs text-stone-400 mt-1">
          Try clearing your search keyword or role filter.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-orange-200/80 bg-white shadow-2xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-orange-100 bg-[#FAF7F2]/70 text-[11px] font-bold uppercase tracking-wider text-stone-500">
              <th className="py-3.5 px-5">User</th>
              <th className="py-3.5 px-4">Role &amp; Quick Switch</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-5 text-right">Moderation</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-orange-100/70 text-xs sm:text-sm">
            {users.map((user) => {
              const isAdmin = user.role === "admin";
              const isBlocked = user.status === "Blocked";

              return (
                <tr
                  key={user.id}
                  className={cn(
                    "transition-colors hover:bg-[#FAF7F2]/50",
                    isBlocked && "bg-red-50/25"
                  )}
                >
                  {/* User Column */}
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar className="h-10 w-10 ring-2 ring-orange-200/70 shrink-0">
                        <AvatarImage src={user.image || ""} alt={user.name} />
                        <AvatarFallback className="bg-gradient-to-br from-[#dc2626] to-[#f97316] text-white text-xs font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="font-extrabold text-stone-950 truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-stone-500 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Role & Single-Click / Dropdown Switch */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {isAdmin ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-900 text-white px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider">
                        <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                        Admin
                      </span>
                    ) : (
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Single-click pill toggle between Customer & Vendor */}
                        <div className="inline-flex items-center rounded-full bg-[#FAF7F2] p-0.5 border border-orange-200/80">
                          <button
                            type="button"
                            onClick={() => onRoleChange?.(user.id, "customer")}
                            className={cn(
                              "rounded-full px-2.5 py-1 text-[11px] font-bold transition-all cursor-pointer",
                              user.role === "customer"
                                ? "bg-[#dc2626] text-white shadow-2xs"
                                : "text-stone-600 hover:text-stone-950"
                            )}
                          >
                            Customer
                          </button>
                          <button
                            type="button"
                            onClick={() => onRoleChange?.(user.id, "vendor")}
                            className={cn(
                              "rounded-full px-2.5 py-1 text-[11px] font-bold transition-all cursor-pointer",
                              user.role === "vendor"
                                ? "bg-[#dc2626] text-white shadow-2xs"
                                : "text-stone-600 hover:text-stone-950"
                            )}
                          >
                            Vendor
                          </button>
                        </div>


                      </div>
                    )}
                  </td>

                  {/* Status Column */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {isBlocked ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100/90 border border-red-200/80 px-3 py-0.5 text-xs font-bold text-[#dc2626]">
                        <ShieldAlert className="h-3.5 w-3.5" />
                        Blocked
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/90 border border-emerald-200/80 px-3 py-0.5 text-xs font-bold text-emerald-800">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Active
                      </span>
                    )}
                  </td>

                  {/* Moderation Action Column */}
                  <td className="py-3.5 px-5 text-right whitespace-nowrap">
                    {isAdmin ? (
                      <span className="text-xs font-semibold text-stone-400">
                        Protected
                      </span>
                    ) : isBlocked ? (
                      <Button
                        type="button"
                        onClick={() => onToggleBlock?.(user.id)}
                        className="h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 gap-1.5 cursor-pointer"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Unblock User</span>
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => onToggleBlock?.(user.id)}
                        className="h-8 rounded-full bg-red-50/90 hover:bg-red-100 text-[#dc2626] hover:text-[#b91c1c] text-xs font-bold px-3.5 gap-1.5 cursor-pointer"
                      >
                        <Ban className="h-3.5 w-3.5" />
                        <span>Block User</span>
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}