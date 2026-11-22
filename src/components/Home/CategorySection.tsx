"use client";

import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Pizza } from 'lucide-react';
import type { CategorySectionProps, PizzaCategory } from '@/types/home/category.types';

const defaultCategories: PizzaCategory[] = [
  { id: 'classic', name: 'Classic Pizzas', itemCount: 1, href: 'menu?category=classic' },
  { id: 'vegetarian', name: 'Vegetarian Pizzas', itemCount: 1, href: 'menu?category=vegetarian' },
  { id: 'meat-lovers', name: 'Meat Lovers', itemCount: 2, href: 'menu?category=meat-lovers' },
  { id: 'specialty', name: 'Specialty / Gourmet Pizzas', itemCount: 1, href: '#menu?category=specialty' },
  { id: 'sides', name: 'Sides & Appetizers', itemCount: 1, href: 'menu?category=sides' },
  { id: 'beverages', name: 'Beverages & Desserts', itemCount: 1, href: 'menu?category=beverages' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const CategorySection: React.FC<CategorySectionProps> = ({
  eyebrow = 'CRAVING SOMETHING SPECIFIC?',
  heading = 'Explore by Pizza Category',
  subheading = 'Select a category below to filter our live menu immediately.',
  categories = defaultCategories,
  onSelectCategory,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleCardClick = (category: PizzaCategory) => {
    setSelectedId(category.id);
    onSelectCategory?.(category.id);
  };

  return (
    <section className="relative py-10 md:py-12 bg-[#FFFDFB] border-b border-orange-100/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-8 md:mb-10"
        >
          <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#f97316]">
            {eyebrow}
          </span>
          <h2 className="mt-1.5 text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-950">
            {heading}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-500 font-medium">
            {subheading}
          </p>
        </motion.div>

        {/* 6-Column Responsive Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {categories.map((category) => {
            const isSelected = selectedId === category.id;

            return (
              <motion.a
                key={category.id}
                href={category.href || `category-${category.id}`}
                variants={cardVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCardClick(category)}
                className={`group flex flex-col items-center justify-center text-center px-3.5 py-6 rounded-2xl border transition-all duration-200 ${
                  isSelected
                    ? 'bg-orange-50/90 border-[#dc2626]/50 shadow-md shadow-orange-500/10'
                    : 'bg-[#FAF7F2] hover:bg-white border-orange-100/80 hover:border-orange-200 shadow-2xs hover:shadow-lg hover:shadow-orange-950/5'
                }`}
              >
                {/* Rounded Peach Icon Container */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${
                    isSelected
                      ? 'bg-[#dc2626] text-white shadow-sm'
                      : 'bg-[#FDE8D7] text-[#dc2626]'
                  }`}
                >
                  <Pizza className="w-6 h-6 -rotate-12" strokeWidth={2.2} />
                </div>

                {/* Category Title */}
                <h3 className="text-sm font-bold text-stone-900 leading-snug group-hover:text-[#dc2626] transition-colors">
                  {category.name}
                </h3>

                {/* Item Count */}
                <span className="mt-1 text-xs font-medium text-stone-400">
                  {category.itemCount} items
                </span>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CategorySection;