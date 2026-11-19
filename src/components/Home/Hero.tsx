"use client";

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Flame, CheckCircle2, Star } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { HeroProps } from '@/types/home/hero.types';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const defaultFeatures: string[] = [
  'Verified Local Kitchens',
  'Live Order Tracking',
  'Custom Delivery Dates',
];

const defaultFeaturedKitchen = {
  label: 'FEATURED KITCHEN',
  name: 'Il Forno Brick Oven',
  rating: 4.9,
  bakeTemp: '485°C Bake',
  imageUrl:
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=85',
  imageAlt: 'Wood-fired sourdough artisan pizza on wooden board',
};

const Hero: React.FC<HeroProps> = ({
  badgeText = 'Wood-Fired Perfection In 30 Mins',
  titlePrefix = 'Hot & Fresh Pizza Delivered to',
  titleHighlight = 'Your Door',
  description = 'Discover top-rated neighborhood pizzerias, hand-stretched sourdough crusts, and gourmet toppings. Place scheduled or immediate delivery orders with real-time kitchen status updates.',
  primaryAction = { label: 'Explore Pizza Menu', href: '#menu' },
  secondaryAction = { label: 'Browse Pizzerias', href: '#pizzerias' },
  features = defaultFeatures,
  featuredKitchen = defaultFeaturedKitchen,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FDEEE4] via-[#FFF6F0] to-[#FFFDFB] py-16 md:py-24 lg:py-28 border-b border-orange-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center"
        >
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 md:space-y-8">
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-orange-200/80 shadow-2xs"
            >
              <Flame className="w-4 h-4 text-[#dc2626]" strokeWidth={2.4} />
              <span className="text-xs font-bold uppercase tracking-wider text-[#9a3412]">
                {badgeText}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.08]"
            >
              {titlePrefix}{' '}
              <span className="text-[#dc2626]">{titleHighlight}</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="max-w-xl text-base md:text-lg text-stone-600 font-medium leading-relaxed"
            >
              {description}
            </motion.p>

            {/* CTA Links */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <a
                  href={primaryAction.href}
                  className={cn(
                    buttonVariants(),
                    'h-13 rounded-2xl bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold px-8 text-base shadow-lg shadow-red-600/15 hover:shadow-red-600/25 transition-all inline-flex items-center gap-2'
                  )}
                >
                  <span>{primaryAction.label}</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <a
                  href={secondaryAction.href}
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'h-13 rounded-2xl border-orange-200/80 hover:border-orange-300 bg-white text-stone-800 hover:text-[#dc2626] font-bold px-8 text-base shadow-sm hover:bg-orange-50/70 transition-all'
                  )}
                >
                  {secondaryAction.label}
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 border-t border-orange-200/60 w-full"
            >
              {features.map((item) => (
                <div key={item} className="flex items-center gap-2 text-stone-600">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" strokeWidth={2.4} />
                  <span className="text-sm font-semibold">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column */}
          <motion.div
            variants={fadeUp}
            className="lg:col-span-5 w-full flex justify-center lg:justify-end"
          >
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="relative w-full max-w-lg"
            >
              <div className="absolute -inset-2 bg-gradient-to-tr from-orange-200/60 to-red-200/40 rounded-[2.25rem] blur-xl -z-10" />

              <div className="relative overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl bg-stone-900">
                <img
                  src={featuredKitchen.imageUrl}
                  alt={featuredKitchen.imageAlt}
                  className="w-full h-[360px] sm:h-[420px] object-cover transition-transform duration-500 hover:scale-105"
                />

                <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-stone-950/85 backdrop-blur-md border border-white/10 p-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                      {featuredKitchen.label}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5 text-white font-bold text-sm sm:text-base">
                      <span>{featuredKitchen.name}</span>
                      <span className="text-stone-400">•</span>
                      <span className="inline-flex items-center gap-1">
                        {featuredKitchen.rating.toFixed(1)}
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      </span>
                    </div>
                  </div>

                  <span className="shrink-0 px-3.5 py-1.5 rounded-xl bg-[#dc2626] text-white text-xs font-bold shadow-sm">
                    {featuredKitchen.bakeTemp}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;