import React from "react";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import { protectedMutation } from "@/lib/core/server";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function PaymentSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { session_id } = await searchParams;

  let isVerified = false;
  let message = "Invalid payment session.";

  if (session_id) {
    const res = await protectedMutation(
      `${BASE_URL}/payments/checkout-verify`,
      "POST",
      { sessionId: session_id }
    );

    try {
      const data = await res.json();
      isVerified = Boolean(data?.success);
      message =
        data?.message ||
        (isVerified ? "Payment verified!" : "Verification failed.");
    } catch (error) {
      console.error("Verify error:", error);
      message = "Could not connect to server for verification.";
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 rounded-3xl border border-orange-200/80 bg-white p-8 text-center shadow-2xs space-y-4">
      {isVerified ? (
        <>
          <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
          <h1 className="text-2xl font-extrabold text-stone-950">
            Payment Successful!
          </h1>
          <p className="text-sm text-stone-600">
            Your Premium Kitchen plan is now active. You can add unlimited menu
            items.
          </p>
          <Link
            href="/dashboard/vendor/add-menu-item"
            className="inline-block rounded-full bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm font-bold px-6 py-2.5"
          >
            Add Unlimited Menu Items
          </Link>
        </>
      ) : (
        <>
          <XCircle className="h-12 w-12 text-red-600 mx-auto" />
          <h1 className="text-xl font-extrabold text-stone-950">
            Payment Verification Issue
          </h1>
          <p className="text-sm text-stone-600">{message}</p>
          <Link
            href="/dashboard/vendor/subscription"
            className="inline-block rounded-full bg-stone-900 text-white text-sm font-bold px-6 py-2.5"
          >
            Back to Subscription
          </Link>
        </>
      )}
    </div>
  );
}