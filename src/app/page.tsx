import CategorySection from "@/components/Home/CategorySection";
import FeaturedMenuSection from "@/components/Home/FeaturedMenuSection";
import Hero from "@/components/Home/Hero";
import HowItWorksSection from "@/components/Home/HowItWorksSection";
import WhyChooseSection from "@/components/Home/WhyChooseSection";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedMenuSection />
      <CategorySection />
      <WhyChooseSection />
      <HowItWorksSection/>
    </>
  );
}
