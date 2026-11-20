import React from "react";
import { headers } from "next/headers";
import { requireRole } from "@/lib/core/server";
import { auth } from "@/lib/auth";
import DashboardSidebar from "@/app/components/DashboardSidebar";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole("admin");
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      <DashboardSidebar role="admin" user={session?.user} />
      <div className="flex-1 w-full min-w-0">{children}</div>
    </div>
  );
}