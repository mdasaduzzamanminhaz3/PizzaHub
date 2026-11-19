"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Crown, MapPin, Star, UtensilsCrossed } from 'lucide-react';
import type { PartnerPizzeriaCardProps } from '@/types/pizzeria.types';

const PartnerPizzeriaCard: React.FC<PartnerPizzeriaCardProps> = ({ pizzeria }) => {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      className="group relative flex flex-col justify-between rounded-[1.75rem] bg-white p-6 border border-orange-200/75 shadow-2xs hover:shadow-xl hover:shadow-orange-950/5 hover:border-orange-300/80 transition-all duration-300"
    >
      {/* Top Accent Bar on Hover */}
      <div className="absolute inset-x-6 top-0 h-1 rounded-b-full bg-gradient-to-r from-[#dc2626] to-[#f97316] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Header Row: Avatar + Name/Location + Premium Badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="relative shrink-0">
              <img
                src={pizzeria.avatarUrl}
                alt={pizzeria.avatarAlt}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-orange-100 group-hover:ring-orange-200 transition-all"
              />
              <span
                title="Verified Kitchen"
                className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white"
              />
            </div>

            <div className="min-w-0">
              <h3 className="text-lg font-extrabold text-stone-950 leading-snug truncate group-hover:text-[#dc2626] transition-colors">
                {pizzeria.name}
              </h3>
              <div className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-stone-500">
                <MapPin className="w-3.5 h-3.5 text-[#dc2626] shrink-0" />
                <span className="truncate">{pizzeria.location}</span>
              </div>
            </div>
          </div>

          {pizzeria.isPremium && (
            <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-[11px] font-bold shadow-2xs">
              <Crown className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>Premium</span>
            </span>
          )}
        </div>

        {/* Metrics Pill Box */}
        <div className="mt-5 rounded-2xl bg-[#FAF7F2] border border-orange-100/90 px-4 py-3 flex items-center justify-between gap-2 text-xs sm:text-sm">
          <div className="inline-flex items-center gap-1.5 font-bold text-stone-900">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
            <span>{pizzeria.rating.toFixed(1)}</span>
            <span className="font-medium text-stone-500">Rating</span>
          </div>

          <span className="h-4 w-px bg-orange-200/80" />

          <div className="inline-flex items-center gap-1.5 font-semibold text-stone-600">
            <UtensilsCrossed className="w-3.5 h-3.5 text-[#f97316] shrink-0" />
            <span>
              <strong className="font-bold text-stone-900">
                {pizzeria.activeMenuCount}
              </strong>{' '}
              Active Menu Items
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Action CTA */}
      <div className="mt-5">
        <a
          href={pizzeria.href || `#kitchen-${pizzeria.id}`}
          className="w-full h-11 rounded-xl bg-stone-950 group-hover:bg-[#dc2626] text-white text-sm font-bold px-5 inline-flex items-center justify-center gap-2 shadow-xs transition-colors duration-200"
        >
          <span>Explore Kitchen Menu</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </a>
      </div>
    </motion.article>
  );
};

export default PartnerPizzeriaCard;