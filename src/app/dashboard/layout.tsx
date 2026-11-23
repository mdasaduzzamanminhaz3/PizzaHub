import { requireActiveUser } from "@/lib/core/auth-guard";
import React from "react";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireActiveUser("/unauthorized");
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#FAF7F2] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">{children}</div>
    </div>
  );
}