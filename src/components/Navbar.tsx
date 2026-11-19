"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Pizza, Menu } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Browse Menu', href: '#menu' },
  { name: 'Pizzerias', href: '#pizzerias' },
];

const Navbar: React.FC = () => {
  const [activeLink, setActiveLink] = useState<string>('Home');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-3 sm:top-4 z-50 w-full px-4 sm:px-6 lg:px-8 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto pointer-events-auto">
        {/* Floating Curved Bar Container */}
        <div className="flex items-center justify-between h-16 sm:h-18 px-4 sm:px-6 rounded-[1.75rem] lg:rounded-full bg-[#FFF8F3]/95 backdrop-blur-md border border-orange-200/80 shadow-lg shadow-orange-950/5">
          {/* Left: Brand Logo */}
          <a
            href="#home"
            onClick={() => setActiveLink('Home')}
            className="flex items-center gap-3 group focus:outline-none shrink-0"
          >
            <motion.div
              whileHover={{ rotate: -6, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-[#dc2626] to-[#f97316] flex items-center justify-center shadow-md shadow-red-500/20"
            >
              <Pizza className="w-5 h-5 text-white -rotate-12" strokeWidth={2.2} />
            </motion.div>

            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight leading-none text-gray-900">
                Pizza<span className="text-[#dc2626]">Hub</span>
              </span>
              <span className="text-[10px] font-semibold tracking-[0.14em] text-stone-500 uppercase mt-1">
                Artisan Pizza Delivery
              </span>
            </div>
          </a>

          {/* Center: Desktop Nav with Gliding Pill */}
          <nav className="hidden md:flex items-center gap-1.5 bg-orange-100/50 p-1.5 rounded-full border border-orange-200/50">
            {navLinks.map((link) => {
              const isActive = activeLink === link.name;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveLink(link.name)}
                  className={`relative px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
                    isActive
                      ? 'text-[#dc2626]'
                      : 'text-stone-600 hover:text-gray-900'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                      className="absolute inset-0 bg-white shadow-xs ring-1 ring-orange-200/70 rounded-full -z-10"
                    />
                  )}
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right: Desktop Auth Actions */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            <a
              href="#signin"
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'text-sm font-semibold text-stone-700 hover:text-[#dc2626] hover:bg-orange-100/60 rounded-full px-4 h-10'
              )}
            >
              Sign In
            </a>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <a
                href="#signup"
                className={cn(
                  buttonVariants(),
                  'rounded-full bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm font-semibold px-6 h-10 shadow-sm hover:shadow-md hover:shadow-red-600/20 transition-all'
                )}
              >
                Sign Up
              </a>
            </motion.div>
          </div>

          {/* Mobile: Base UI SheetTrigger using `render` prop */}
          <div className="flex md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full text-stone-700 hover:bg-orange-100/70"
                    aria-label="Open menu"
                  />
                }
              >
                <Menu className="w-6 h-6" />
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[300px] sm:w-[360px] bg-[#FFF8F3] border-l border-orange-200/70 flex flex-col justify-between"
              >
                <div>
                  <SheetHeader className="text-left pb-6 border-b border-orange-200/70">
                    <SheetTitle className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#dc2626] to-[#f97316] flex items-center justify-center">
                        <Pizza className="w-5 h-5 text-white -rotate-12" />
                      </div>
                      <span className="text-lg font-extrabold tracking-tight text-gray-900">
                        Pizza<span className="text-[#dc2626]">Hub</span>
                      </span>
                    </SheetTitle>
                  </SheetHeader>

                  <nav className="flex flex-col gap-2 mt-6">
                    {navLinks.map((link, idx) => {
                      const isActive = activeLink === link.name;
                      return (
                        <motion.a
                          key={link.name}
                          href={link.href}
                          initial={{ opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 * idx, duration: 0.25 }}
                          onClick={() => {
                            setActiveLink(link.name);
                            setIsOpen(false);
                          }}
                          className={`px-4 py-3 rounded-2xl text-base font-semibold transition-colors ${
                            isActive
                              ? 'bg-white text-[#dc2626] shadow-xs ring-1 ring-orange-200/70'
                              : 'text-stone-700 hover:bg-orange-100/50'
                          }`}
                        >
                          {link.name}
                        </motion.a>
                      );
                    })}
                  </nav>
                </div>

                <div className="flex flex-col gap-3 pt-6 border-t border-orange-200/70">
                  <a
                    href="#signin"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'w-full h-11 rounded-full bg-white border-orange-200/80 font-semibold text-stone-700 hover:bg-orange-50'
                    )}
                  >
                    Sign In
                  </a>
                  <a
                    href="#signup"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      buttonVariants(),
                      'w-full h-11 rounded-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold'
                    )}
                  >
                    Sign Up
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;