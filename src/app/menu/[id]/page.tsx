import React from "react";
import Link from "next/link";
import { ArrowLeft, Pizza } from "lucide-react";
import { getMenuItemById } from "@/lib/api/menuItems";
import { getSession } from "@/lib/core/server";
import { getUserById } from "@/lib/api/users";
import MenuItemDetailsView from "@/components/BrowseMenu/MenuItemDetailsView";

interface PageProps {
  params: Promise<{ id: string }>;
}

const MenuItemDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const [item, session] = await Promise.all([
    getMenuItemById(id),
    getSession(),
  ]);

  const dbUser = session?.user?.id
    ? await getUserById(session.user.id)
    : null;

  if (!item || !item._id) {
    return (
      <section className="min-h-[70vh] bg-[#FFFDFB] flex items-center justify-center px-4">
        <div className="max-w-md w-full rounded-2xl bg-white border border-orange-200/75 p-8 text-center shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#dc2626] flex items-center justify-center mx-auto">
            <Pizza className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-extrabold text-stone-900">
            Dish Not Found
          </h2>
          <p className="text-sm text-stone-500">
            This menu item may have been removed or is currently unavailable.
          </p>
          <Link
            href="/menu"
            className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Browse Menu</span>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#FFFDFB] py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Back Link */}
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-[#dc2626] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Browse Menu</span>
        </Link>

        {/* Main Details & Order Layout */}
        <MenuItemDetailsView
          item={item}
          defaultAddress={dbUser?.address || ""}
          defaultPhone={dbUser?.phone || ""}
        />
      </div>
    </section>
  );
};

export default MenuItemDetailsPage;