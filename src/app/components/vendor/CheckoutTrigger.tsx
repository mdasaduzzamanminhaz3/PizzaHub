"use client";

import React from "react";
import { toast } from "sonner";
import PremiumKitchenPlanCard, {
  PremiumPlanDetails,
} from "@/app/components/vendor/PremiumKitchenPlanCard";

interface CheckoutTriggerProps {
  plan: PremiumPlanDetails;
}

export default function CheckoutTrigger({ plan }: CheckoutTriggerProps) {
  const handleUpgradeClick = async () => {
    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
      });

      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        toast.error(
          `Unexpected server response (Status ${res.status}). Check /api/checkout_sessions route path.`
        );
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.error || "Failed to start checkout.");
        return;
      }

      if (data?.url) {
        window.location.href = data.url;
      } else {
        toast.error("Checkout URL not received.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <PremiumKitchenPlanCard
      plan={plan}
      onUpgradeClick={handleUpgradeClick}
    />
  );
}