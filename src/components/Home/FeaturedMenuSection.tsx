"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MenuItemCard from "./MenuItemCard";
import type { FeaturedMenuProps } from "@/types/home/menu.types";

const FeaturedMenuSection: React.FC<FeaturedMenuProps> = ({
  eyebrow = "FRESH FROM THE OVEN",
  heading = "Featured Menu Items",
  subheading = "Handcrafted pizzas and sides from our verified and Premium partner kitchens.",
  viewAllLabel = "View All Approved Items",
  viewAllHref = "/menu",
  items = [],
}) => {
  // শুধু Approved ও Active (এবং চাইলে isFeatured) আইটেম ফিল্টার করে নেওয়া হচ্ছে
  const featuredItems = items.filter(
    (item) => item.status === "Approved" && item.isActive !== false
  );

  if (featuredItems.length === 0) return null;

  return (
    <section className="relative py-16 md:py-24 bg-[#FFFDFB] border-b border-orange-100/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:mb-12"
        >
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#dc2626]">
              {eyebrow}
            </span>
            <h2 className="mt-1.5 text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
              {heading}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-500 max-w-2xl">
              {subheading}
            </p>
          </div>

          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-1 text-sm font-bold text-[#dc2626] hover:text-[#b91c1c] group shrink-0 self-start sm:self-end"
          >
            <span>{viewAllLabel}</span>
            <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Responsive Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: featuredItems.length > 3,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-6 py-2">
            {featuredItems.map((item) => (
              <CarouselItem
                key={item._id}
                className="pl-4 md:pl-6 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <MenuItemCard item={item} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Bottom Navigation Bar */}
          <div className="mt-8 flex items-center justify-between">
            <p className="text-xs font-semibold text-stone-400">
              Drag or use arrows to explore all {featuredItems.length} dishes
            </p>

            <div className="flex items-center gap-2.5">
              <CarouselPrevious className="static translate-y-0 h-10 w-10 rounded-xl border-orange-200 bg-white text-stone-700 hover:bg-orange-50 hover:text-[#dc2626] shadow-2xs" />
              <CarouselNext className="static translate-y-0 h-10 w-10 rounded-xl border-orange-200 bg-white text-stone-700 hover:bg-orange-50 hover:text-[#dc2626] shadow-2xs" />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default FeaturedMenuSection;