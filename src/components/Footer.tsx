"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import type {
  FooterContactInfo,
  FooterLinkItem,
  FooterProps,
  FooterSocialItem,
} from '@/types/home/footer.types';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import Link from 'next/link';

const defaultSocials: FooterSocialItem[] = [
  {
    id: 'x',
    label: 'X (Twitter)',
    shortCode: <FaXTwitter className="w-4 h-4" />,
    href: 'https://x.com/',
  },
  {
    id: 'ig',
    label: 'Instagram',
    shortCode: <FaInstagram className="w-4 h-4" />,
    href: 'https://www.instagram.com/',
  },
  {
    id: 'fb',
    label: 'Facebook',
    shortCode: <FaFacebook className="w-4 h-4" />,
    href: 'https://www.facebook.com/',
  },
];

const defaultExploreLinks: FooterLinkItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Browse Pizza Menu', href: '/menu' },
  { label: 'Partner Pizzerias', href: '/pizzerias' },
  { label: 'Become a Restaurant Vendor', href: '/vendor' },
];

const defaultCompanyLinks: FooterLinkItem[] = [
  { label: 'About PizzaHub', href: '/about' },
  { label: 'Help & FAQ', href: '/help' },
  { label: 'Contact Support', href: '/contact' },
  { label: 'Privacy Policy & Terms', href: '/privacy' },
];

const defaultContact: FooterContactInfo = {
  address: 'Level 4, Brick Oven Plaza, Gulshan Avenue, Dhaka 1212',
  phone: '+880 9612-749924 (10 AM – 11 PM)',
  email: 'support@pizzahub.com',
};

const Footer: React.FC<FooterProps> = ({
  brandName = 'Pizza',
  brandHighlight = 'Hub',
  tagline = 'Connecting neighborhood wood-fired pizzerias with pizza lovers. Freshly baked, tracked in real time, and delivered piping hot to your door.',
  socials = defaultSocials,
  exploreLinks = defaultExploreLinks,
  companyLinks = defaultCompanyLinks,
  contact = defaultContact,
  copyrightText = '© 2026 PizzaHub Technologies Ltd. All rights reserved.',
}) => {
  return (
    <footer className="bg-[#FFF4EB] text-stone-700 border-t border-orange-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12"
        >
          {/* Column 1: Brand & Socials */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#dc2626] to-[#f97316] flex items-center justify-center shadow-sm shadow-red-500/20 group-hover:scale-105 group-hover:-rotate-6 transition-transform duration-200">
                <Image
                  src="/PizzaHub.png"
                  height={40}
                  width={40}
                  alt="pizzahub-logo"
                />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-stone-950">
                {brandName}
                <span className="text-[#dc2626]">{brandHighlight}</span>
              </span>
            </Link>

            <p className="text-sm text-stone-600 leading-relaxed max-w-xs">
              {tagline}
            </p>

            {/* Social Badges */}
            <div className="flex items-center gap-2 pt-1">
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  aria-label={social.label}
                  className="h-9 w-9 rounded-xl bg-white hover:bg-[#dc2626] border border-orange-200/80 hover:border-[#dc2626] text-stone-700 hover:text-white inline-flex items-center justify-center shadow-2xs transition-all duration-200"
                >
                  {social.shortCode}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="lg:col-span-2 space-y-3.5">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#9a3412]">
              EXPLORE
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1 text-stone-600 hover:text-[#dc2626] transition-colors group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-0.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company & Legal */}
          <div className="lg:col-span-3 space-y-3.5">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#9a3412]">
              COMPANY &amp; LEGAL
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1 text-stone-600 hover:text-[#dc2626] transition-colors group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-0.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="lg:col-span-3 space-y-3.5">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#9a3412]">
              CONTACT US
            </h3>
            <ul className="space-y-3 text-sm text-stone-600">
              <li className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-white border border-orange-200/80 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#dc2626]" />
                </div>
                <span className="leading-relaxed">{contact.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-white border border-orange-200/80 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5 text-[#dc2626]" />
                </div>
                <span>{contact.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-white border border-orange-200/80 flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5 text-[#dc2626]" />
                </div>
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-[#dc2626] font-medium transition-colors"
                >
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Bottom Copyright & Utility Links */}
        <div className="pt-6 border-t border-orange-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-stone-500">
          <p>{copyrightText}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;