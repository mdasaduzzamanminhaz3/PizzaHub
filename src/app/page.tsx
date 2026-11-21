import CategorySection from "@/components/Home/CategorySection";
import FeaturedMenuSection from "@/components/Home/FeaturedMenuSection";
import Hero from "@/components/Home/Hero";
import HowItWorksSection from "@/components/Home/HowItWorksSection";
import WhyChooseSection from "@/components/Home/WhyChooseSection";
import { getMenuItems } from "@/lib/api/menuItems";

export default async function Home() {
  const menuItems = await getMenuItems();
  return (
    <>
      <Hero />
      <FeaturedMenuSection items={menuItems}/>
      <CategorySection />
      <WhyChooseSection />
      <HowItWorksSection/>
    </>
  );
}
