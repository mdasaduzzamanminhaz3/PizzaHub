"use server";
import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";
import { getUserById } from "../api/users";


export const getSession = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return session;
  } catch (error) {
    console.error("getSession failed:", error);
    return null;
  }
};

export const getToken = async()=> {
    const session = await getSession();
    if(!session || !session?.session.token){
        redirect('/unauthorized')
    }
    return session?.session.token;
}

export const requireRole = async(role:string)=> {
    const session = await getSession();
    if(!session || session?.user.role !== role){
        redirect('/unauthorized')
    }
    const dbUser = await getUserById(session.user.id);
    if (Boolean(dbUser?.isBlocked)) {
    redirect("/unauthorized");
  }
    return session
}

export const protectedMutation = async(api:string, method:string, data?:unknown)=>{
const token = await getToken();
const res = await fetch(api,{
    method:method,
    headers:{
        'content-type':'application/json',
        authorization:`Bearer ${token}`
    },
    body:data? JSON.stringify(data):null
})
if(res.status===401 || res.status===403){
    redirect('/unauthorized')
}
return res;
}

export const authFetch = async(api:string)=>{
        const token = await getToken();
        const res = await fetch(api,{
            headers:{
                authorization: `Bearer ${token}`
            }
        })
        return res;
    }