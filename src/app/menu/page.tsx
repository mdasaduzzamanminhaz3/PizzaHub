"use client";

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, RotateCcw, Pizza } from 'lucide-react';
import MenuItemCard from '@/components/Home/MenuItemCard';
import type { BrowseMenuProps } from '@/types/browse-menu.types';
import { MenuItem } from '@/types/home/menu.types';

const defaultBrowseItems: MenuItem[] = [
  {
    id: 'garden-pesto-primavera',
    title: 'Garden Pesto Primavera',
    category: 'Vegetarian Pizzas',
    isPremium: false,
    price: 18.0,
    description:
      'Genovese basil pesto base, blistered cherry tomatoes, marinated artichokes, Kalamata olives, baby spinach, and mozzarella.',
    kitchenName: 'Crust & Craft Pizzeria',
    location: 'Dhanmondi',
    imageUrl:
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'wood-fired-garlic-rosemary',
    title: 'Wood-Fired Garlic Rosemary Knots',
    category: 'Sides & Appetizers',
    isPremium: false,
    price: 8.5,
    description:
      'Six warm hand-tied sourdough knots brushed with roasted garlic herb butter, sea salt flakes, served with warm marinara.',
    kitchenName: 'Crust & Craft Pizzeria',
    location: 'Dhanmondi',
    imageUrl:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'diavola-pepperoni-inferno',
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
    id: 'truffle-burrata-wild',
    title: 'Truffle Burrata & Wild Mushroom',
    category: 'Specialty / Gourmet Pizzas',
    isPremium: true,
    price: 24.5,
    description:
      'Roasted cremini & porcini mushrooms, creamy Pugliese burrata placed post-bake, black truffle cream, and fresh thyme.',
    kitchenName: 'Il Forno Brick Oven',
    location: 'Gulshan 2',
    imageUrl:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'classic-margherita-dop',
    title: 'Margherita Verace DOP',
    category: 'Classic Pizzas',
    isPremium: true,
    price: 16.5,
    description:
      'San Marzano crushed tomatoes, fresh fior di latte mozzarella, sweet basil leaves, and cold-pressed extra virgin olive oil.',
    kitchenName: 'Il Forno Brick Oven',
    location: 'Gulshan 2',
    imageUrl:
      'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'smoky-bbq-chicken',
    title: 'Wood-Smoked BBQ Chicken Feast',
    category: 'Meat Lovers',
    isPremium: false,
    price: 22.0,
    description:
      'Char-grilled herb chicken, caramelized red onions, roasted bell peppers, smoked gouda, and house bourbon BBQ glaze.',
    kitchenName: 'Ember & Crust',
    location: 'Uttara',
    imageUrl:
      'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=900&q=85',
  },
];

const defaultCategories = [
  'All Categories',
  'Classic Pizzas',
  'Vegetarian Pizzas',
  'Meat Lovers',
  'Specialty / Gourmet Pizzas',
  'Sides & Appetizers',
];

const defaultLocations = [
  'All Locations',
  'Dhanmondi',
  'Gulshan 2',
  'Banani',
  'Uttara',
];

const BrowseMenuSection: React.FC<BrowseMenuProps> = ({
  heading = 'Browse Pizza Menu',
  subheading = 'Showing approved & active dishes from local pizzerias.',
  items = defaultBrowseItems,
  categories = defaultCategories,
  locations = defaultLocations,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [selectedLocation, setSelectedLocation] = useState<string>('All Locations');

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return items.filter((item) => {
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.kitchenName.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === 'All Categories' || item.category === selectedCategory;

      const matchesLocation =
        selectedLocation === 'All Locations' || item.location === selectedLocation;

      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [items, searchQuery, selectedCategory, selectedLocation]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All Categories' ||
    selectedLocation !== 'All Locations';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedLocation('All Locations');
  };

  return (
    <section id="menu" className="relative py-12 md:py-16 bg-[#FFFDFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Live Count */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7"
        >
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#dc2626]">
              ARTISAN KITCHEN CATALOG
            </span>
            <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-950">
              {heading}
            </h1>
            <p className="mt-1.5 text-sm sm:text-base text-stone-500 font-medium">
              {subheading}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 self-start sm:self-end px-4 py-2 rounded-full bg-orange-50/90 border border-orange-200/70 text-xs font-bold text-stone-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>
              Showing {filteredItems.length} of {items.length} dishes
            </span>
          </div>
        </motion.div>

        {/* Modern Floating Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl bg-white p-3.5 sm:p-4 border border-orange-200/75 shadow-sm mb-9"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="relative md:col-span-6">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pizza name or ingredients..."
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#FAF7F2] border border-orange-200/60 focus:border-[#dc2626] focus:bg-white focus:outline-none text-sm font-medium text-stone-800 placeholder:text-stone-400 transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="relative md:col-span-3">
              <Filter className="w-4 h-4 text-[#dc2626] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                aria-label="Filter by category"
                className="w-full h-11 pl-10 pr-8 rounded-xl bg-[#FAF7F2] border border-orange-200/60 focus:border-[#dc2626] focus:bg-white focus:outline-none text-sm font-semibold text-stone-700 cursor-pointer transition-all"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div className="relative md:col-span-3">
              <MapPin className="w-4 h-4 text-[#f97316] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                aria-label="Filter by neighborhood"
                className="w-full h-11 pl-10 pr-8 rounded-xl bg-[#FAF7F2] border border-orange-200/60 focus:border-[#dc2626] focus:bg-white focus:outline-none text-sm font-semibold text-stone-700 cursor-pointer transition-all"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filter Reset Row */}
          {hasActiveFilters && (
            <div className="mt-3 pt-3 border-t border-orange-100 flex items-center justify-between gap-2 text-xs">
              <span className="text-stone-500 font-medium">
                Active filters applied
              </span>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 font-bold text-[#dc2626] hover:text-[#b91c1c] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          )}
        </motion.div>

        {/* Cards Grid using existing MenuItemCard component */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white border border-orange-200/70 p-10 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#dc2626] flex items-center justify-center mx-auto">
              <Pizza className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-stone-900">
              No matching pizzas found
            </h3>
            <p className="text-sm text-stone-500 max-w-md mx-auto">
              Try clearing your search keyword or switching category and location filters.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm font-bold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Show All Dishes</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BrowseMenuSection;