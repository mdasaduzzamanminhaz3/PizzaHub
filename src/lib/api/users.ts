


const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
export const getUserPremiumById = async(userId:string)=> {
    try {
        const res = await fetch(`${BASE_URL}/users/${userId}/premium`)
        return res.json();
    } catch (error) {
        console.error("Error fething user premium:",error);
        return null
    }
} 