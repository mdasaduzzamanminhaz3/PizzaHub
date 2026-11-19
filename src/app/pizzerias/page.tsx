"use client";

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import type {
  PartnerPizzeria,
  PartnerPizzeriasSectionProps,
} from '@/types/pizzeria.types';
import PartnerPizzeriaCard from '@/components/Pizzerias/PartnerPizzeriaCard';

const defaultPizzerias: PartnerPizzeria[] = [
  {
    id: 'il-forno-brick-oven',
    name: 'Il Forno Brick Oven',
    location: 'Gulshan 2',
    rating: 4.9,
    activeMenuCount: 3,
    isPremium: true,
    avatarUrl:
      'https://images.unsplash.com/photo-1577219491135-ce391730fb4c?auto=format&fit=crop&w=400&q=80',
    avatarAlt: 'Chef at Il Forno Brick Oven',
  },
  {
    id: 'crust-and-craft-pizzeria',
    name: 'Crust & Craft Pizzeria',
    location: 'Dhanmondi',
    rating: 4.7,
    activeMenuCount: 2,
    isPremium: false,
    avatarUrl:
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80',
    avatarAlt: 'Pizzaiolo at Crust & Craft Pizzeria',
  },
  {
    id: 'napoli-heat-kitchen',
    name: 'Napoli Heat Kitchen',
    location: 'Banani',
    rating: 4.8,
    activeMenuCount: 2,
    isPremium: true,
    avatarUrl:
      'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=400&q=80',
    avatarAlt: 'Chef at Napoli Heat Kitchen',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const PartnerPizzeriasSection: React.FC<PartnerPizzeriasSectionProps> = ({
  eyebrow = 'VERIFIED NEIGHBORHOOD KITCHENS',
  heading = 'Partner Pizzerias',
  subheading = 'Explore verified local kitchens delivering across Dhaka neighborhoods.',
  pizzerias = defaultPizzerias,
}) => {
  return (
    <section id="pizzerias" className="relative py-12 md:py-16 bg-[#FFFDFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 md:mb-10"
        >
          <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#dc2626]">
            {eyebrow}
          </span>
          <h2 className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-950">
            {heading}
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-stone-500 font-medium">
            {subheading}
          </p>
        </motion.div>

        {/* 3-Column Responsive Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {pizzerias.map((pizzeria) => (
            <motion.div key={pizzeria.id} variants={itemVariants}>
              <PartnerPizzeriaCard pizzeria={pizzeria} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerPizzeriasSection;