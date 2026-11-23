"use server";

import { revalidatePath } from "next/cache";
import { getSession, protectedMutation } from "@/lib/core/server";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://pizzahub-server-olive.vercel.app";

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

    const res: any = await protectedMutation(
      `${BASE_URL}/users/${userId}`,
      "PATCH",
      payload
    );

    if (res && typeof res.ok === "boolean" && !res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return {
        success: false,
        message:
          errorData?.message || `Failed to update profile (${res.status}).`,
      };
    }

    if (res && typeof res === "object" && res.success === false) {
      return {
        success: false,
        message: res.message || "Failed to update profile.",
      };
    }

    revalidatePath("/dashboard");
    return { success: true, message: "Profile updated!" };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong.",
    };
  }
};