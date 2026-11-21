"use server";
import { getSession, protectedMutation } from "../core/server";

const BASE_URL= process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"
export const createMenuItem = async(data:unknown)=> {
    const api = `${BASE_URL}/menuItem/create`
    const res = await protectedMutation(api,"POST",data);
    return res.json();
}

export const getCurrentVendor = async() => {
    const session = await getSession();
    return {
        vendorId: session?.user.id || "",
        vendorName:session?.user.name || ""
    }
}

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