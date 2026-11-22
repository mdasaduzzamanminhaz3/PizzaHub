"use server";

import { authFetch } from "../core/server";


const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
export const getUserPaymentsById = async (userId: string) => {
  try {
    const res = await authFetch(`${BASE_URL}/payments?userId=${userId}`);
    return res.json();
  } catch (error) {
    console.error("Error fetching user payments:", error);
    return [];
  }
};

export const getAllPaymentsAdmin = async () => {
  const res = await authFetch(`${BASE_URL}/payments`);
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
};