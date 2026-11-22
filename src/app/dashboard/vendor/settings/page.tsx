import React from "react";
import { getSession } from "@/lib/core/server";
import { getUserById } from "@/lib/api/users";
import VendorProfileSettingsView from "@/app/components/vendor/VendorProfileSettingsView";

export default async function VendorProfileSettingsPage() {
  const session = await getSession();
  const dbUser = await getUserById(session?.user?.id || "");

  const subscriptionStatus = dbUser?.premium ? "PRO" : "FREE";

  return (
    <VendorProfileSettingsView
      initialName={dbUser?.name || session?.user?.name || ""}
      initialRestaurantName={
        dbUser?.restaurantName || dbUser?.businessName || ""
      }
      initialAddress={dbUser?.address || ""}
      initialPhone={dbUser?.phone || ""}
      initialAvatar={dbUser?.image || session?.user?.image || ""}
      role={(dbUser?.role || session?.user?.role || "VENDOR").toUpperCase()}
      subscription={subscriptionStatus}
    />
  );
}