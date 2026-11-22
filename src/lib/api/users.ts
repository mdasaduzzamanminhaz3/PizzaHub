
"use server";

import { authFetch } from "../core/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
export const getUserPremiumById = async(userId:string)=> {
    try {
        const api = `${BASE_URL}/users/${userId}/premium`
        const res = await authFetch(api);
        return res.json();
    } catch (error) {
        console.error("Error fething user premium:",error);
        return null
    }
} 



export const getUserById = async(userId:string)=> {
    if(!userId) return null;
    const res = await authFetch(`${BASE_URL}/users/${userId}`);
    return await res.json();
}