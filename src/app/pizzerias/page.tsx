import PartnerPizzeriasList from "@/components/Home/PartnerPizzeriasList";
import { getMenuItems } from "@/lib/api/menuItems";
import { getAllUsersAdmin } from "@/lib/actions/users";
import type { PartnerPizzeria } from "@/types/pizzeria.types";

const fallbackAvatars = [
  "https://images.unsplash.com/photo-1577219491135-ce391730fb4c?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=400&q=80",
];

export async function loadPartnerPizzerias(): Promise<PartnerPizzeria[]> {
  const [rawMenuItems, rawUsers] = await Promise.all([
    getMenuItems(),
    getAllUsersAdmin(),
  ]);

  const menuItems = Array.isArray(rawMenuItems) ? rawMenuItems : [];
  const users = Array.isArray(rawUsers) ? rawUsers : [];

  const vendors = users.filter(
    (u: any) =>
      String(u?.role || "").toLowerCase() === "vendor" && u?.blocked !== true
  );

  return vendors.map((vendor: any, idx: number) => {
    const vendorId = String(vendor?._id || vendor?.id || `vendor-${idx}`);
    const vendorEmail = String(vendor?.email || "").toLowerCase();

    const approvedCount = menuItems.filter((item: any) => {
      const sameVendor =
        String(item?.vendorId || "") === vendorId ||
        (vendorEmail &&
          String(item?.vendorEmail || "").toLowerCase() === vendorEmail);
      const isApproved =
        String(item?.status || "").toLowerCase() === "approved" &&
        item?.isActive !== false;
      return sameVendor && isApproved;
    }).length;

    const pizzeriaName =
      vendor?.restaurantName ||
      vendor?.businessName ||
      (vendor?.name ? `${vendor.name}'s Pizzeria` : "Partner Pizzeria");

    const rating = Number(vendor?.rating);

    return {
      id: vendorId,
      name: pizzeriaName,
      location: vendor?.location || vendor?.area || "Dhaka",
      rating: Number.isFinite(rating) && rating > 0 ? rating : 4.8,
      activeMenuCount: approvedCount,
      isPremium: Boolean(vendor?.premium || vendor?.isPremium),
      avatarUrl:
        vendor?.image ||
        vendor?.avatarUrl ||
        fallbackAvatars[idx % fallbackAvatars.length],
      avatarAlt: `Chef at ${pizzeriaName}`,
    };
  });
}

export default async function PizzeriasPage() {
  const pizzerias = await loadPartnerPizzerias();

  return (
    <main className="min-h-screen bg-[#FFFDFB]">
      <PartnerPizzeriasList pizzerias={pizzerias} />
    </main>
  );
}