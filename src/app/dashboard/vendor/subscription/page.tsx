import React from "react";
import { getSession } from "@/lib/core/server";
import { getUserPremiumById } from "@/lib/api/users";
import { getUserPaymentsById } from "@/lib/api/payments";
import FreeStarterPlanCard from "@/app/components/vendor/FreeStarterPlanCard";
import StripeBillingHistoryCard from "@/app/components/vendor/StripeBillingHistoryCard";
import CheckoutTrigger from "@/app/components/vendor/CheckoutTrigger";

export default async function VendorSubscriptionPage() {
  const session = await getSession();
  const userId = session?.user?.id || "";

  const [premiumData, paymentData] = await Promise.all([
    getUserPremiumById(userId),
    getUserPaymentsById(userId),
  ]);

  const isPremiumActive = Boolean(premiumData?.premium);
  const transactions = Array.isArray(paymentData) ? paymentData : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-orange-200/80 bg-white px-6 py-5 shadow-2xs">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-stone-950">
            Vendor Subscription Plan
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Upgrade via Stripe Checkout to unlock unlimited active dishes and
            homepage priority.
          </p>
        </div>
      </div>

      {/* 2-Column Plan Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FreeStarterPlanCard isPremiumActive={isPremiumActive} />

        <CheckoutTrigger
          plan={{
            title: "Premium Kitchen",
            price: 29,
            activeUntil: "2026-12-19",
            isSubscribed: isPremiumActive,
            verifiedText:
              "Verified via Stripe Webhook • Unlimited Items Unlocked",
          }}
        />
      </div>

      {/* Stripe Billing History Table */}
      <StripeBillingHistoryCard transactions={transactions} />
    </div>
  );
}