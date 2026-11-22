"use server";

import { getSession, protectedMutation } from "@/lib/core/server";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export interface UpdateProfilePayload {
  name: string;
  restaurantName?: string;
  address: string;
  phone: string;
  image?: string;
}

export const updateUserProfile = async (payload: UpdateProfilePayload) => {
  try {
    const session = await getSession();
    const userId = session?.user?.id;

    if (!userId) {
      return { success: false, message: "Unauthorized session." };
    }

    const res = await protectedMutation(
      `${BASE_URL}/users/${userId}`,
      "PATCH",
      payload
    );

    if (typeof (res as any)?.ok === "boolean" && !res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return {
        success: false,
        message: errorData?.message || "Failed to update profile.",
      };
    }

    return { success: true, message: "Profile updated!" };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong.",
    };
  }
};