import { getSession } from "../core/server";


const BASE_URL= process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const getMenuItems = async(query="")=>{
    const res = await fetch(`${BASE_URL}/menuItems?${query}`)
    return res.json();
}


export const getMenuItemById = async(menuItemId:string)=> {
    const res = await fetch(`${BASE_URL}/menuItems/${menuItemId}`)
    return res.json()
}


export const getVendorMenuItemCount = async (vendorId?: string) => {
  const session = await getSession();
  const targetVendorId = vendorId || session?.user?.id;

  if (!targetVendorId) {
    return { count: 0 };
  }

  const res = await fetch(
    `${BASE_URL}/menuItems/count?vendorId=${targetVendorId}`);

  if (!res.ok) {
    return { count: 0 };
  }

  return res.json();
};