"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import MenuItemCard from './MenuItemCard';
import type { FeaturedMenuProps, MenuItem } from '@/types/home/menu.types';

const defaultMenuItems: MenuItem[] = [
  {
    id: 'margherita-verace',
    title: 'Margherita Verace DOP',
    category: 'Classic Pizzas',
    isPremium: true,
    price: 16.5,
    description:
      'San Marzano crushed tomatoes, fresh fior di latte mozzarella, sweet basil leaves, and cold-pressed extra virgin olive oil.',
    kitchenName: 'Il Forno Brick Oven',
    location: 'Gulshan 2',
    imageUrl:
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'diavola-pepperoni',
    title: 'Diavola Pepperoni Inferno',
    category: 'Meat Lovers',
    isPremium: true,
    price: 21.0,
    description:
      'Crispy cupped beef pepperoni, spicy Calabrian chili honey drizzle, smoked provolone, and crushed plum tomato sauce.',
    kitchenName: 'Napoli Heat Kitchen',
    location: 'Banani',
    imageUrl:
      'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'truffle-burrata',
    title: 'Truffle Burrata & Wild Mushroom',
    category: 'Specialty / Gourmet',
    isPremium: true,
    price: 24.5,
    description:
      'Roasted cremini & porcini mushrooms, creamy Pugliese burrata placed post-bake, black truffle cream, and fresh thyme.',
    kitchenName: 'Il Forno Brick Oven',
    location: 'Gulshan 2',
    imageUrl:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'quattro-formaggi',
    title: 'Quattro Formaggi Artisanal',
    category: 'Cheese Lovers',
    isPremium: false,
    price: 19.0,
    description:
      'Aged Parmigiano-Reggiano, creamy Gorgonzola Dolce, smoked Scamorza, and fior di latte on a 48-hour sourdough base.',
    kitchenName: 'Crosta Artisan Bakehouse',
    location: 'Dhanmondi',
    imageUrl:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'smoky-bbq-chicken',
    title: 'Wood-Smoked BBQ Chicken Feast',
    category: 'Signature Pizzas',
    isPremium: true,
    price: 22.0,
    description:
      'Char-grilled herb chicken, caramelized red onions, roasted bell peppers, smoked gouda, and house bourbon BBQ glaze.',
    kitchenName: 'Ember & Crust',
    location: 'Uttara',
    imageUrl:
      'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'mediterranean-pesto',
    title: 'Genovese Pesto & Sun-Dried Tomato',
    category: 'Veggie Gourmet',
    isPremium: false,
    price: 18.5,
    description:
      'Stone-ground basil pine-nut pesto, marinated artichoke hearts, Kalamata olives, baby spinach, and whipped ricotta.',
    kitchenName: 'Verde Woodfire',
    location: 'Baridhara',
    imageUrl:
      'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=900&q=85',
  },
];

const FeaturedMenuSection: React.FC<FeaturedMenuProps> = ({
  eyebrow = 'FRESH FROM THE OVEN',
  heading = 'Featured Menu Items',
  subheading = 'Handcrafted pizzas and sides from our verified and Premium partner kitchens.',
  viewAllLabel = 'View All Approved Items',
  viewAllHref = '#all-menu',
  items = defaultMenuItems,
}) => {
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

          <a
            href={viewAllHref}
            className="inline-flex items-center gap-1 text-sm font-bold text-[#dc2626] hover:text-[#b91c1c] group shrink-0 self-start sm:self-end"
          >
            <span>{viewAllLabel}</span>
            <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </motion.div>

        {/* Responsive Carousel (No useEffect / useState needed) */}
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-6 py-2">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-4 md:pl-6 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <MenuItemCard item={item} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Bottom Navigation Bar: Swipe Hint + Prev/Next Controls */}
          <div className="mt-8 flex items-center justify-between">
            <p className="text-xs font-semibold text-stone-400">
              Drag or use arrows to explore all {items.length} dishes
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