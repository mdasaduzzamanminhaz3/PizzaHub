import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function DashboardIndexPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signIn");
  }

  const role = (session.user as { role?: string }).role;

  if (role === "admin") redirect("/dashboard/admin");
  if (role === "vendor") redirect("/dashboard/vendor");
  redirect("/dashboard/customer");
}