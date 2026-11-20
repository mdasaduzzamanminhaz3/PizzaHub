import React from "react";
import { headers } from "next/headers";
import { requireRole } from "@/lib/core/server";
import { auth } from "@/lib/auth";
import DashboardSidebar from "@/app/components/DashboardSidebar";

export default async function VendorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole("vendor");
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      <DashboardSidebar role="vendor" user={session?.user} />
      <div className="flex-1 w-full min-w-0">{children}</div>
    </div>
  );
}