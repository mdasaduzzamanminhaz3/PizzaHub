


const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
export const getUserPaymentsById = async (userId: string) => {
  try {
    const res = await fetch(`${BASE_URL}/payments?userId=${userId}`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.error("Error fetching user payments:", error);
    return [];
  }
};