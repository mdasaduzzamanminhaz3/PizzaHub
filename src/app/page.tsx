import CategorySection from "@/components/Home/CategorySection";
import FeaturedMenuSection from "@/components/Home/FeaturedMenuSection";
import Hero from "@/components/Home/Hero";
import HowItWorksSection from "@/components/Home/HowItWorksSection";
import WhyChooseSection from "@/components/Home/WhyChooseSection";
import PartnerPizzeriasList from "@/components/Home/PartnerPizzeriasList";
import { loadPartnerPizzerias } from "@/app/pizzerias/page";
import { getMenuItems } from "@/lib/api/menuItems";

export default async function Home() {
  const [menuItems, pizzerias] = await Promise.all([
    getMenuItems(),
    loadPartnerPizzerias(),
  ]);

  return (
    <>
      <Hero />
      <FeaturedMenuSection items={menuItems} />
      <CategorySection />
      <PartnerPizzeriasList pizzerias={pizzerias} />
      <WhyChooseSection />
      <HowItWorksSection />
    </>
  );
}