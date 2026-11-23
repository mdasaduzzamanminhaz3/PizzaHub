"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Store } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { MenuItemCardProps } from '@/types/home/menu.types';
import Link from 'next/link';
import Image from 'next/image';

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      className="group h-full flex flex-col bg-white rounded-[1.75rem] border border-orange-200/60 shadow-sm hover:shadow-xl hover:shadow-orange-950/5 overflow-hidden transition-shadow duration-300"
    >
      {/* Top Image Wrapper */}
      <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-stone-100">
      <Image
          src={item.image || '/PizzaHub.png'}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Subtle Dark Top Gradient for Badge Legibility */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/35 to-transparent pointer-events-none" />

        {/* Category Pill (Top Left) */}
        <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-stone-800 text-xs font-bold shadow-sm">
          {item.category}
        </span>

        {/* Premium Badge (Top Right)
        {item. && (
          <span className="absolute top-3.5 right-3.5 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-sm">
            <Crown className="w-3.5 h-3.5 fill-white" />
            <span>Premium</span>
          </span>
        )} */}
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* Title & Price Row */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-extrabold text-stone-900 leading-snug line-clamp-1 group-hover:text-[#dc2626] transition-colors">
            {item.name}
          </h3>
          <span className="shrink-0 text-lg font-extrabold text-[#dc2626]">
            ${item.price.toFixed(2)}
          </span>
        </div>

        {/* Description */}
        <p className="mt-2 text-sm text-stone-500 leading-relaxed line-clamp-2 flex-1">
          {item.description}
        </p>

        {/* Kitchen & Location Meta */}
        <div className="mt-5 pt-4 border-t border-orange-100/80 flex items-center justify-between gap-2 text-xs font-semibold text-stone-600">
          <div className="inline-flex items-center gap-1.5 truncate">
            <Store className="w-3.5 h-3.5 text-orange-500 shrink-0" />
            <span className="truncate">{item.vendorName}</span>
          </div>

          <div className="inline-flex items-center gap-1 text-stone-400 shrink-0">
            <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span>{item.location}</span>
          </div>
        </div>

        {/* Full-width Action CTA */}
        <div className="mt-4">
          <Link
            href={`/menu/${item._id}`}
            className={cn(
              buttonVariants(),
              'w-full h-11 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm font-bold shadow-sm hover:shadow-md hover:shadow-red-600/20 transition-all inline-flex items-center justify-center gap-2'
            )}
          >
            <span>View Details</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default MenuItemCard;