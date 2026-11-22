"use server";
import { revalidatePath } from "next/cache";
import { getUserById } from "../api/users";
import { getSession, protectedMutation } from "../core/server";
import { MenuItemUpdatePayload } from "@/app/components/vendor/EditMenuItemModal";

const BASE_URL= process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"
export const createMenuItem = async (data: Record<string, any>) => {
  const vendor = await getCurrentVendor();

  const finalPayload = {
    ...data,
    vendorId: vendor.vendorId || data.vendorId,
    vendorName: vendor.vendorName || data.vendorName,
    vendorEmail: vendor.vendorEmail,
    restaurantName: vendor.restaurantName,
    vendorPhone: vendor.vendorPhone,
    vendorAddress: vendor.vendorAddress,
    vendorImage: vendor.vendorImage,
    isVendorPremium: vendor.isVendorPremium,
    isFeatured: vendor.isVendorPremium ? true : Boolean(data.isFeatured),
    status: data.status || "Pending",
    isActive: data.isActive ?? true,
    createdAt: data.createdAt || new Date().toISOString(),
  };

  const api = `${BASE_URL}/menuItem/create`;
  const res = await protectedMutation(api, "POST", finalPayload);
  return res.json();
};

export const getCurrentVendor = async () => {
  const session = await getSession();
  const userId = session?.user?.id || "";
  const dbUser = userId ? await getUserById(userId) : null;

  return {
    vendorId: userId,
    vendorName: dbUser?.name || session?.user?.name || "Vendor",
    vendorEmail: dbUser?.email || session?.user?.email || "",
    restaurantName:
      dbUser?.restaurantName ||
      dbUser?.businessName ||
      dbUser?.name ||
      "PizzaHub Kitchen",
    vendorPhone: dbUser?.phone || "",
    vendorAddress: dbUser?.address || "",
    vendorImage: dbUser?.image || session?.user?.image || "",
    isVendorPremium: Boolean(dbUser?.premium),
  };
};
export const getVendorMenuItems = async () => {
  const session = await getSession();
  const vendorId = session?.user?.id;
  if (!vendorId) {
    return [];
  }
  const res = await fetch(
    `${BASE_URL}/menuItems?vendorId=${vendorId}`,
    { cache: "no-store" }
  );
  if (!res.ok) return [];
  return res.json();
};

export const getAllMenuItemsAdmin = async()=> {
    const res = await fetch(`${BASE_URL}/menuItems?admin=true`);
    if(!res.ok){
        return [];
    }
    return res.json();
}

export const deleteMenuItem = async (id:string)=> {
    const api = `${BASE_URL}/menuItems/${id}`;
    const res = await protectedMutation(api,"DELETE");
    return res.json();
}

export const updateMenuItemStatus = async (id:string, updates:{isActive?:boolean;status?:string;isFeatured?:boolean})=> {
    const api =`${BASE_URL}/menuItems/${id}`;
    const res = await protectedMutation(api,"PATCH",updates);
    return res.json();
}

export async function updateVendorMenuItem(
  itemId: string,
  payload: MenuItemUpdatePayload
) {
  try {
    const res = await protectedMutation(
      `${BASE_URL}/menuItems/${itemId}`,
      "PATCH",
      payload
    );

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        code: data?.code || (res.status === 403 ? "FORBIDDEN" : "ERROR"),
        message: data?.message || "Failed to update menu item.",
      };
    }

    revalidatePath("/dashboard/vendor/menu-items");
    revalidatePath("/menu");

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update menu item.",
    };
  }
}