"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { MapPin, Star, UtensilsCrossed, Crown } from "lucide-react";
import type { PartnerPizzeria } from "@/types/pizzeria.types";
import Image from "next/image";

const defaultPizzerias: PartnerPizzeria[] = [
  {
    id: "il-forno-brick-oven",
    name: "Il Forno Brick Oven",
    location: "Gulshan 2",
    rating: 4.9,
    activeMenuCount: 3,
    isPremium: true,
    avatarUrl:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb4c?auto=format&fit=crop&w=400&q=80",
    avatarAlt: "Chef at Il Forno Brick Oven",
  },
  {
    id: "crust-and-craft-pizzeria",
    name: "Crust & Craft Pizzeria",
    location: "Dhanmondi",
    rating: 4.7,
    activeMenuCount: 2,
    isPremium: false,
    avatarUrl:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80",
    avatarAlt: "Pizzaiolo at Crust & Craft Pizzeria",
  },
  {
    id: "napoli-heat-kitchen",
    name: "Napoli Heat Kitchen",
    location: "Banani",
    rating: 4.8,
    activeMenuCount: 2,
    isPremium: true,
    avatarUrl:
      "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=400&q=80",
    avatarAlt: "Chef at Napoli Heat Kitchen",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function PartnerPizzeriasList({
  pizzerias,
}: {
  pizzerias?: PartnerPizzeria[];
}) {
  const list =
    pizzerias && pizzerias.length > 0 ? pizzerias : defaultPizzerias;

  return (
    <section id="pizzerias" className="relative py-12 md:py-16 bg-[#FFFDFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-10">
          <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#dc2626]">
            VERIFIED NEIGHBORHOOD KITCHENS
          </span>
          <h2 className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-950">
            Partner Pizzerias
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-stone-500 font-medium">
            Explore verified local kitchens delivering across Dhaka neighborhoods.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {list.map((pizzeria) => (
            <motion.div
              key={pizzeria.id}
              variants={itemVariants}
              className="group rounded-3xl border border-orange-200/80 bg-white p-5 shadow-2xs transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-orange-950/5"
            >
              <div className="flex items-start gap-4">
                <Image
                  src={pizzeria.avatarUrl}
                  alt={pizzeria.avatarAlt || pizzeria.name}
                  height={64}
                  width={64}
                  className="h-16 w-16 shrink-0 rounded-2xl object-cover border border-orange-200/70"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="truncate text-lg font-extrabold text-stone-950">
                      {pizzeria.name}
                    </h3>
                    {pizzeria.isPremium && (
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-800">
                        <Crown className="h-3 w-3" />
                        Pro
                      </span>
                    )}
                  </div>

                  <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-stone-500">
                    <MapPin className="h-3.5 w-3.5 text-[#dc2626] shrink-0" />
                    <span className="truncate">{pizzeria.location}</span>
                  </p>

                  <div className="mt-3 flex items-center justify-between border-t border-orange-100 pt-3 text-xs font-bold">
                    <span className="inline-flex items-center gap-1 text-amber-600">
                      <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                      {Number(pizzeria.rating || 4.8).toFixed(1)}
                    </span>

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF7F2] px-3 py-1 text-stone-700">
                      <UtensilsCrossed className="h-3.5 w-3.5 text-[#dc2626]" />
                      {pizzeria.activeMenuCount} Active Menu
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}