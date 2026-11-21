"use server";
import { protectedMutation } from "../core/server";

const BASE_URL= process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"
export const createMenuItem = async(data:unknown)=> {
    const api = `${BASE_URL}/menuItem/create`
    const res = await protectedMutation(api,"POST",data);
    return res.json();
}