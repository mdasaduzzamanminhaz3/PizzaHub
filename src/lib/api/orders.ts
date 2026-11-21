const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const getCustomerOrders = async (userId: string) => {
  try {
    const res = await fetch(`${BASE_URL}/orders?customerId=${userId}`);

    if (!res.ok) {
      console.error("GET /orders failed with status:", res.status);
      return [];
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching customer orders:", error);
    return [];
  }
};

export const getVendorOrders = async (vendorId: string) => {
  try {
    const res = await fetch(`${BASE_URL}/orders?vendorId=${vendorId}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching vendor orders:", error);
    return [];
  }
};