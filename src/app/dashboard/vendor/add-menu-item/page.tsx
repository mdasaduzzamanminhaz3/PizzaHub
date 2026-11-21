import React from "react";
import { redirect } from "next/navigation";
import AddMenuItemForm from "@/app/components/vendor/AddMenuItemForm";
import { getVendorMenuItemCount } from "@/lib/api/menuItems";
import { getUserPremiumById } from "@/lib/api/users";
import { getSession } from "@/lib/core/server";

const FREE_PLAN_LIMIT = 3;

export default async function VendorAddMenuItemPage() {
  const session = await getSession();
  const userId = session?.user?.id || "";

  const [countData, premiumData] = await Promise.all([
    getVendorMenuItemCount(userId),
    getUserPremiumById(userId),
  ]);

  const itemCount = Number(countData?.count ?? 0);
  const isPremium = Boolean(premiumData?.premium);

  if (!isPremium && itemCount >= FREE_PLAN_LIMIT) {
    redirect("/dashboard/vendor/subscription");
  }

  return (
    <div className="rounded-3xl border border-orange-200/80 bg-white p-6 sm:p-8 shadow-2xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-stone-950">
            Add New Menu Item
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Items are saved with status{" "}
            <strong className="text-stone-800">Pending</strong> until reviewed
            by an Admin.
          </p>
        </div>

        <div className="rounded-full bg-[#FAF7F2] px-4 py-1.5 border border-orange-200/80 text-xs font-bold text-stone-700 w-fit">
          {isPremium ? (
            <span className="text-emerald-700">
              Premium Plan: Unlimited Items ({itemCount} added)
            </span>
          ) : (
            <>
              Free Plan Usage:{" "}
              <span className="text-stone-950">
                {itemCount} / {FREE_PLAN_LIMIT}
              </span>
            </>
          )}
        </div>
      </div>

      <AddMenuItemForm />
    </div>
  );
}