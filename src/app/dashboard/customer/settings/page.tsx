import React from "react";
import { getSession } from "@/lib/core/server";
import { getUserById } from "@/lib/api/users";
import ProfileSettingsView from "@/app/components/customer/ProfileSettingsView";

export default async function ProfileSettingsPage() {
  const session = await getSession();
  const dbUser = await getUserById(session?.user?.id || "");

  return (
    <ProfileSettingsView
      initialName={dbUser?.name || session?.user?.name || ""}
      initialAddress={dbUser?.address || ""}
      initialPhone={dbUser?.phone || ""}
      initialAvatar={dbUser?.image || session?.user?.image || ""}
      role={(dbUser?.role || session?.user?.role || "CUSTOMER").toUpperCase()}
    />
  );
}