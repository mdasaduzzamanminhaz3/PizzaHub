"use client";

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Flame, Clock, Award, Truck } from 'lucide-react';
import type {
  WhyChooseFeature,
  WhyChooseIconName,
  WhyChooseSectionProps,
} from '@/types/home/why-choose.types';

const defaultFeatures: WhyChooseFeature[] = [
  {
    id: 'artisan-quality',
    icon: 'flame',
    title: 'Artisan Brick-Oven Quality',
    description:
      'Every listed menu item is admin-reviewed to ensure authentic ingredients and clear descriptions.',
  },
  {
    id: 'scheduled-delivery',
    icon: 'clock',
    title: 'Scheduled Delivery Dates',
    description:
      'Order for tonight or schedule ahead for weekend parties with custom instructions.',
  },
  {
    id: 'verified-vendors',
    icon: 'award',
    title: 'Verified Local Vendors',
    description:
      'Support independent neighborhood pizzerias with transparent vendor ratings and areas.',
  },
  {
    id: 'direct-kitchen-status',
    icon: 'truck',
    title: 'Direct Kitchen Status',
    description:
      'Track every stage from Pending to Accepted directly from your Customer Dashboard.',
  },
];

const renderFeatureIcon = (icon: WhyChooseIconName) => {
  switch (icon) {
    case 'flame':
      return <Flame className="w-5 h-5 text-[#dc2626]" strokeWidth={2.2} />;
    case 'clock':
      return <Clock className="w-5 h-5 text-[#dc2626]" strokeWidth={2.2} />;
    case 'award':
      return <Award className="w-5 h-5 text-[#dc2626]" strokeWidth={2.2} />;
    case 'truck':
      return <Truck className="w-5 h-5 text-[#dc2626]" strokeWidth={2.2} />;
    default:
      return <Flame className="w-5 h-5 text-[#dc2626]" strokeWidth={2.2} />;
  }
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

const WhyChooseSection: React.FC<WhyChooseSectionProps> = ({
  eyebrow = 'THE PIZZAHUB STANDARD',
  heading = 'Why Choose PizzaHub?',
  subheading = 'Built from the ground up for authentic pizzerias and hungry customers who care about quality.',
  features = defaultFeatures,
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
          <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#dc2626]">
            {eyebrow}
          </span>
          <h2 className="mt-1.5 text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-950">
            {heading}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-500 font-medium">
            {subheading}
          </p>
        </motion.div>

        {/* 4-Column Feature Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 320, damping: 24 }}
              className="group flex flex-col items-start rounded-2xl bg-white p-5 sm:p-6 border border-stone-200/80 hover:border-orange-200 shadow-2xs hover:shadow-lg hover:shadow-orange-950/5 transition-all duration-200"
            >
              {/* Soft Rose/Peach Icon Square */}
              <div className="w-11 h-11 rounded-xl bg-red-50/90 border border-red-100/80 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                {renderFeatureIcon(feature.icon)}
              </div>

              {/* Card Title */}
              <h3 className="text-base sm:text-[17px] font-bold text-stone-950 leading-snug group-hover:text-[#dc2626] transition-colors">
                {feature.title}
              </h3>

              {/* Card Description */}
              <p className="mt-2 text-sm text-stone-500 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseSection;