import React from "react";
import Link from "next/link";
import { ShieldAlert, Home, LayoutDashboard, LogIn } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-[80vh] bg-[#FAF7F2] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl rounded-3xl border border-orange-200/80 bg-white p-7 sm:p-10 text-center shadow-sm shadow-orange-950/5 space-y-6">
        {/* Top Icon + 403 Badge */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#dc2626] to-[#f97316] text-white shadow-md shadow-red-600/20">
            <ShieldAlert className="h-8 w-8" />
          </div>

          <span className="inline-flex items-center rounded-full border border-red-200/80 bg-red-50/70 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#dc2626]">
            403 • Unauthorized Access
          </span>
        </div>

        {/* Heading & Description */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-950">
            You don&apos;t have permission for this area
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
            This page is restricted based on your account role or sign-in status.
            Switch to an authorized account or head back to your dashboard.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <Link
            href="/dashboard"
            className={cn(
              buttonVariants(),
              "rounded-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold px-5 h-10 shadow-sm shadow-red-600/20 gap-2"
            )}
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Go to Dashboard</span>
          </Link>

          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-full border-orange-200/80 bg-[#FAF7F2]/70 hover:bg-orange-50 text-stone-800 font-bold px-5 h-10 gap-2"
            )}
          >
            <LogIn className="h-4 w-4 text-[#dc2626]" />
            <span>Sign In</span>
          </Link>

          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "rounded-full text-stone-600 hover:text-stone-950 hover:bg-stone-100 font-bold px-4 h-10 gap-1.5"
            )}
          >
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}