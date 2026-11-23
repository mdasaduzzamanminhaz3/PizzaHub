"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  HelpCircle,
  Pizza,
  Store,
  ShieldCheck,
  CreditCard,
  MessageSquare,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FaqCategory = "All" | "Customers" | "Vendors" | "Billing & Admin";

interface FaqItem {
  id: string;
  category: Exclude<FaqCategory, "All">;
  question: string;
  answer: string;
}

const categories: FaqCategory[] = [
  "All",
  "Customers",
  "Vendors",
  "Billing & Admin",
];

const faqs: FaqItem[] = [
  {
    id: "cust-1",
    category: "Customers",
    question: "How do I place a pizza delivery order on PizzaHub?",
    answer:
      "Browse the approved dishes on the Menu page, open any pizza's details view, choose your quantity, enter your delivery date, phone number, delivery address, and optional notes, then submit the order.",
  },
  {
    id: "cust-2",
    category: "Customers",
    question: "Can I cancel an order after placing it?",
    answer:
      "Yes, you can cancel an order from your Customer Orders dashboard while it is still pending before kitchen acceptance. Once a vendor accepts or rejects an order, its status is locked.",
  },
  {
    id: "cust-3",
    category: "Customers",
    question: "Why do I see fewer dishes on the public menu than expected?",
    answer:
      "Only dishes that are Admin-approved and marked Active by their pizzeria are shown on the public storefront so you only see available, verified items.",
  },
  {
    id: "vend-1",
    category: "Vendors",
    question: "How does the Free Plan menu item allowance work for vendors?",
    answer:
      "Free plan kitchens have a limit on active/created menu items (up to 3 items). Once you reach the Free plan limit, you will be prompted to upgrade to the Pro plan for expanded allowances and featured perks.",
  },
  {
    id: "vend-2",
    category: "Vendors",
    question: "What happens after I add a new menu item as a vendor?",
    answer:
      "Newly submitted items start in Pending status and go to the Admin moderation queue. Once approved by an Admin—and active on your end—they appear on the public menu.",
  },
  {
    id: "vend-3",
    category: "Vendors",
    question: "Can I change an order status after accepting or rejecting it?",
    answer:
      "No. To keep order tracking reliable for customers and kitchens, order decisions are locked once you accept or reject an incoming customer order.",
  },
  {
    id: "bill-1",
    category: "Billing & Admin",
    question: "How are vendor Pro plan upgrades and transactions handled?",
    answer:
      "Vendor Pro subscriptions are processed through Stripe, and resulting payment entries are recorded in the platform's read-only transactions ledger for auditability.",
  },
  {
    id: "bill-2",
    category: "Billing & Admin",
    question: "How do I update my profile name, phone, or default delivery address?",
    answer:
      "Open your dashboard Settings page to update your name, phone number, avatar, and default delivery address. Your account role remains locked for security.",
  },
];

const quickGuides = [
  {
    title: "Ordering & Tracking",
    description: "Place orders, check status updates, and cancel pending orders.",
    href: "/dashboard/customer/orders",
    icon: Pizza,
  },
  {
    title: "Kitchen & Plan Limits",
    description: "Manage menu items, incoming orders, and Pro plan upgrades.",
    href: "/dashboard/vendor/menu-items",
    icon: Store,
  },
  {
    title: "Subscriptions & Billing",
    description: "Review plan benefits and vendor subscription status.",
    href: "/dashboard/vendor/subscription",
    icon: CreditCard,
  },
];

export default function HelpFaqPage() {
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory>("All");
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    "cust-1": true,
    "vend-1": true,
  });

  const filteredFaqs = useMemo(() => {
    if (selectedCategory === "All") return faqs;
    return faqs.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="min-h-screen bg-[#FFFDFB] py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="rounded-3xl border border-orange-200/80 bg-white p-7 sm:p-9 shadow-2xs space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 border border-red-100 px-3.5 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-[#dc2626]">
            <HelpCircle className="h-3.5 w-3.5" />
            Help Center &amp; FAQ
          </span>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-950">
              How can we help you with PizzaHub?
            </h1>
            <p className="text-sm sm:text-base text-stone-500 max-w-2xl">
              Quick answers for pizza orders, vendor menu allowances, Pro
              subscriptions, and account settings.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-1">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer border",
                    active
                      ? "bg-[#dc2626] text-white border-[#dc2626] shadow-2xs"
                      : "bg-[#FAF7F2] text-stone-700 border-orange-200/75 hover:bg-orange-100/70"
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Shortcut Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickGuides.map((guide) => {
            const Icon = guide.icon;
            return (
              <Link
                key={guide.title}
                href={guide.href}
                className="rounded-3xl border border-orange-200/80 bg-white p-5 shadow-2xs hover:-translate-y-0.5 transition-all space-y-2.5 group"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-[#dc2626] group-hover:bg-red-100/80 transition-colors">
                  <Icon className="h-4 w-4" />
                </div>
                <h2 className="text-sm font-extrabold text-stone-950">
                  {guide.title}
                </h2>
                <p className="text-xs text-stone-500 leading-relaxed">
                  {guide.description}
                </p>
              </Link>
            );
          })}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((item) => {
            const isOpen = Boolean(openIds[item.id]);
            return (
              <div
                key={item.id}
                className="rounded-3xl border border-orange-200/80 bg-white shadow-2xs overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 hover:bg-[#FAF7F2]/60 transition-colors cursor-pointer"
                >
                  <div className="space-y-1 min-w-0">
                    <span className="inline-block rounded-full bg-[#FAF7F2] border border-orange-200/70 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-stone-600">
                      {item.category}
                    </span>
                    <p className="text-sm sm:text-base font-extrabold text-stone-950">
                      {item.question}
                    </p>
                  </div>

                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-stone-500 transition-transform duration-200",
                      isOpen && "rotate-180 text-[#dc2626]"
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-orange-100/80">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Footer Card */}
        <div className="rounded-3xl border border-orange-200/80 bg-[#FAF7F2] p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white border border-orange-200/70 text-[#dc2626]">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-stone-950">
                Still have a question about an order or kitchen setup?
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                Explore the menu or jump into your dashboard to check live order
                and subscription states.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href="/about"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "rounded-full border-orange-200 bg-white text-stone-800 font-bold px-4 h-10 text-xs"
              )}
            >
              About PizzaHub
            </Link>
            <Link
              href="/menu"
              className={cn(
                buttonVariants(),
                "rounded-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold px-5 h-10 text-xs gap-1.5"
              )}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Browse Menu</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}