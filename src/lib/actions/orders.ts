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

export const createPizzaOrder = async (payload: CreateOrderPayload) => {
  try {
    const session = await getSession();
    const userId = session?.user?.id || "";
    const dbUser = userId ? await getUserById(userId) : null;

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
  } catch (error: any) {
    console.error("Create order action error:", error);
    return {
      success: false,
      message: error?.message || "Server connection error",
    };
  }
};

export const cancelPizzaOrder = async (orderId: string) => {
  try {
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
  } catch (error: any) {
    console.error("Cancel order action error:", error);
    return {
      success: false,
      message: error?.message || "Failed to cancel order",
    };
  }
};

const updateOrderStatus = async (
  orderId: string,
  status: "Accepted" | "Rejected"
) => {
  try {
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
  } catch (error: any) {
    console.error("Update order status action error:", error);
    return {
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
};

export const acceptPizzaOrder = async (orderId: string) =>
  updateOrderStatus(orderId, "Accepted");

export const rejectPizzaOrder = async (orderId: string) =>
  updateOrderStatus(orderId, "Rejected");