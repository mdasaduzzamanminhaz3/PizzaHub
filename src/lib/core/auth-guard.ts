import { getSession } from "@/lib/core/server";
import { getUserById } from "@/lib/api/users";
import { redirect } from "next/navigation";

export async function getVerifiedUser() {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return { session: null, dbUser: null, isBlocked: false };
    }

    let dbUser = null;
    try {
      dbUser = await getUserById(session.user.id);
    } catch (userError) {
      console.error("getUserById failed in getVerifiedUser:", userError);
      return { session, dbUser: null, isBlocked: false };
    }

    const isBlocked = Boolean(dbUser?.isBlocked);
    return { session, dbUser, isBlocked };
  } catch (error) {
    console.error("getVerifiedUser error:", error);
    return { session: null, dbUser: null, isBlocked: false };
  }
}

export async function requireActiveUser(redirectTo = "/unauthorized") {
  const { session, dbUser, isBlocked } = await getVerifiedUser();

  if (!session?.user?.id) {
    redirect("/signIn");
  }

  if (isBlocked) {
    redirect(redirectTo);
  }

  return { session, dbUser };
}