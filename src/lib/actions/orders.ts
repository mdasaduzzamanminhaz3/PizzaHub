

"use server";

import { getSession, protectedMutation } from "@/lib/core/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export interface CreateOrderPayload {
  menuItemId: string;
  itemName: string;
  vendorId: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  deliveryDate: string;
  deliveryAddress: string;
  instructions?: string;
}

export const createPizzaOrder = async (payload: CreateOrderPayload) => {
  try {
    const session = await getSession();

    const orderData = {
      ...payload,
      customerId: session?.user?.id || "",
      customerEmail: session?.user?.email || "",
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


export const cancelPizzaOrder = async(orderId:string)=> {
    const api = `${BASE_URL}/orders/${orderId}/cancel`;
    const res = await protectedMutation(api,"PATCH",{});
    const data = res.json();
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
}