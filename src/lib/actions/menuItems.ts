"use server";
import { getUserById } from "../api/users";
import { getSession, protectedMutation } from "../core/server";

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
export const getVendorMenuItems = async() => {
    const session = await getSession();
    const vendorId = session?.user.id;
    if(!vendorId){
        return []
    }
    const res = await fetch(`${BASE_URL}/menuItems?vendorId=${encodeURIComponent(vendorId)}`);
    return res.json()
}

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