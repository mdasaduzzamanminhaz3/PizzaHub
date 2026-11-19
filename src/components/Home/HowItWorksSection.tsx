"use client";

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import type { HowItWorksSectionProps, HowItWorksStep } from '@/types/home/how-it-works.types';

const defaultSteps: HowItWorksStep[] = [
  {
    id: 'browse-filter',
    stepNumber: '01',
    title: 'Browse & Filter Menu',
    description:
      'Filter pizzas by category, neighborhood location, or search your favorite toppings.',
  },
  {
    id: 'submit-order',
    stepNumber: '02',
    title: 'Submit Your Order Request',
    description:
      'Choose your delivery date, enter your address, and add special crust or spice notes.',
  },
  {
    id: 'vendor-delivers',
    stepNumber: '03',
    title: 'Vendor Accepts & Delivers',
    description:
      'The pizzeria confirms your order in real time and dispatches it hot to your doorstep.',
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

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  eyebrow = 'SIMPLE 3-STEP ORDERING',
  heading = 'How PizzaHub Works',
  steps = defaultSteps,
}) => {
  return (
    <section className="relative py-10 md:py-14 bg-[#FFFDFB] border-b border-orange-100/70">
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
        </motion.div>

        {/* 3-Step Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {steps.map((step) => (
            <motion.div
              key={step.id}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 320, damping: 24 }}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 sm:p-7 border border-stone-200/80 hover:border-orange-200 shadow-2xs hover:shadow-lg hover:shadow-orange-950/5 transition-all duration-200"
            >
              {/* Top Row: Red Step Badge + Faint Watermark Number */}
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#dc2626] text-xs font-bold text-white shadow-xs">
                  {step.stepNumber}
                </span>

                <span
                  aria-hidden="true"
                  className="select-none text-3xl font-black tracking-tight text-red-100/90 group-hover:text-red-200/80 transition-colors"
                >
                  {step.stepNumber}
                </span>
              </div>

              {/* Step Title */}
              <h3 className="text-base sm:text-lg font-bold text-stone-950 leading-snug group-hover:text-[#dc2626] transition-colors">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="mt-2 text-sm text-stone-500 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;