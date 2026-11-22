"use server";

import { getSession, protectedMutation } from "@/lib/core/server";
import { getUserById } from "@/lib/api/users";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export interface CreateOrderPayload {
  menuItemId: string;
  itemName: string;
  image?: string;
  vendorId: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  deliveryDate: string;
  deliveryAddress: string;
  customerPhone?: string;
  instructions?: string;
}

function isNextRedirectError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const err = error as { digest?: string; message?: string };
  return (
    (typeof err.digest === "string" && err.digest.startsWith("NEXT_REDIRECT")) ||
    err.message === "NEXT_REDIRECT"
  );
}

export const createPizzaOrder = async (payload: CreateOrderPayload) => {
  try {
    const session = await getSession();
    const userId = session?.user?.id || "";

    if (!userId) {
      return {
        success: false,
        code: "UNAUTHORIZED",
        message: "Please sign in first to place an order.",
      };
    }

    const dbUser = await getUserById(userId);

    if (Boolean(dbUser?.isBlocked)) {
      return {
        success: false,
        code: "BLOCKED",
        message: "Your account has been blocked by an admin.",
      };
    }

    if (dbUser?.role && dbUser.role !== "customer") {
      return {
        success: false,
        code: "FORBIDDEN",
        message: "Only customer accounts can place pizza orders.",
      };
    }

    const orderData = {
      ...payload,
      customerId: userId,
      customerName: dbUser?.name || session?.user?.name || "Customer",
      customerEmail: dbUser?.email || session?.user?.email || "",
      customerPhone: payload.customerPhone || dbUser?.phone || "",
      deliveryAddress: payload.deliveryAddress || dbUser?.address || "",
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    const res = await protectedMutation(
      `${BASE_URL}/orders/create`,
      "POST",
      orderData
    );

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || `Order failed (Status ${res.status})`,
      };
    }

    return {
      success: true,
      message: "Order Submitted!",
      data,
    };
  } catch (error: unknown) {
    if (isNextRedirectError(error)) {
      throw error;
    }
    console.error("Create order action error:", error);
    return {
      success: false,
      message: "Server connection error while placing order.",
    };
  }
};

export const cancelPizzaOrder = async (orderId: string) => {
  try {
    const session = await getSession();
    const userId = session?.user?.id || "";
    if (!userId) {
      return {
        success: false,
        code: "UNAUTHORIZED",
        message: "Please sign in first.",
      };
    }

    const dbUser = await getUserById(userId);
    if (Boolean(dbUser?.isBlocked)) {
      return {
        success: false,
        code: "BLOCKED",
        message: "Your account has been blocked by an admin.",
      };
    }

    const api = `${BASE_URL}/orders/${orderId}/cancel`;
    const res = await protectedMutation(api, "PATCH", {});
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Failed to cancel order",
      };
    }

    return {
      success: true,
      message: "Order cancelled!",
      data,
    };
  } catch (error: unknown) {
    if (isNextRedirectError(error)) {
      throw error;
    }
    console.error("Cancel order action error:", error);
    return {
      success: false,
      message: "Failed to cancel order",
    };
  }
};

const updateOrderStatus = async (
  orderId: string,
  status: "Accepted" | "Rejected"
) => {
  try {
    const session = await getSession();
    const userId = session?.user?.id || "";
    if (!userId) {
      return {
        success: false,
        code: "UNAUTHORIZED",
        message: "Please sign in first.",
      };
    }

    const dbUser = await getUserById(userId);
    if (Boolean(dbUser?.isBlocked)) {
      return {
        success: false,
        code: "BLOCKED",
        message: "Your account has been blocked by an admin.",
      };
    }

    const res = await protectedMutation(
      `${BASE_URL}/orders/${orderId}/status`,
      "PATCH",
      { status }
    );

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || `Failed to mark order as ${status}`,
      };
    }

    return {
      success: true,
      message: `Order ${status.toLowerCase()}!`,
      data,
    };
  } catch (error: unknown) {
    if (isNextRedirectError(error)) {
      throw error;
    }
    console.error("Update order status action error:", error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const acceptPizzaOrder = async (orderId: string) =>
  updateOrderStatus(orderId, "Accepted");

export const rejectPizzaOrder = async (orderId: string) =>
  updateOrderStatus(orderId, "Rejected");