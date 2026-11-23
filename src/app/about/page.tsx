import React from "react";
import Link from "next/link";
import {
  Pizza,
  Flame,
  Store,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  MapPin,
  Clock,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const pillars = [
  {
    title: "For Pizza Lovers",
    description:
      "Discover brick-oven pizzas, gourmet classics, and neighborhood favorites across Dhaka with transparent pricing and live order status tracking.",
    icon: Pizza,
    badgeBg: "bg-red-50 text-[#dc2626]",
    cardTint: "bg-white border-orange-200/80",
  },
  {
    title: "For Partner Pizzerias",
    description:
      "Manage active menu items, accept or lock incoming kitchen orders, and scale with Pro plan perks like unlimited listings and featured visibility.",
    icon: Store,
    badgeBg: "bg-amber-100/80 text-amber-800",
    cardTint: "bg-[#FFFBF2] border-amber-200/80",
  },
  {
    title: "Trusted Moderation & Ledger",
    description:
      "Every dish goes through admin quality moderation, while vendor subscriptions and platform transactions stay auditable and reliable.",
    icon: ShieldCheck,
    badgeBg: "bg-emerald-100/80 text-emerald-700",
    cardTint: "bg-[#F4FBF7] border-emerald-200/80",
  },
];

const highlights = [
  {
    label: "BRICK-OVEN CRAFT",
    value: "Fresh to Order",
    detail: "Fermented dough & curated toppings baked hot",
    icon: Flame,
  },
  {
    label: "NEIGHBORHOOD COVERAGE",
    value: "Dhaka Hubs",
    detail: "Gulshan 2, Banani, Dhanmondi, Uttara & more",
    icon: MapPin,
  },
  {
    label: "ORDER TRANSPARENCY",
    value: "Real-Time Status",
    detail: "Pending, Accepted, Rejected & instant updates",
    icon: Clock,
  },
  {
    label: "VENDOR GROWTH",
    value: "Free & Pro Plans",
    detail: "Simple allowances with seamless Stripe upgrades",
    icon: Sparkles,
  },
];

export default function AboutPage() {
  return (
    <section className="min-h-screen bg-[#FFFDFB] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Section */}
        <div className="rounded-3xl border border-orange-200/80 bg-white p-7 sm:p-10 shadow-2xs">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 border border-red-100 px-3.5 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-[#dc2626]">
              <Flame className="h-3.5 w-3.5" />
              About PizzaHub
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-950 leading-[1.12]">
              Connecting neighborhood brick ovens with serious pizza cravings.
            </h1>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              PizzaHub is built for local pizzerias and everyday pizza lovers.
              Instead of generic food aggregators, we give verified kitchens a
              focused workspace to manage menus, handle orders cleanly, and grow
              their craft—while giving customers fast discovery and clear order
              tracking.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/menu"
                className={cn(
                  buttonVariants(),
                  "rounded-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold px-6 h-11 shadow-sm shadow-red-600/20 gap-2"
                )}
              >
                <span>Browse Pizza Menu</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/dashboard/vendor/subscription"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "rounded-full border-orange-200 bg-[#FAF7F2] hover:bg-orange-100/70 text-stone-800 font-bold px-5 h-11"
                )}
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </div>

        {/* Highlights Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="rounded-3xl border border-orange-200/80 bg-white p-5 shadow-2xs space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400">
                    {item.label}
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-50 text-[#dc2626]">
                    <Icon className="h-4 w-4" />
                  </span>
                </div>
                <p className="text-xl font-extrabold text-stone-950">
                  {item.value}
                </p>
                <p className="text-xs text-stone-500 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* Three Core Pillars */}
        <div className="space-y-5">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#dc2626]">
              HOW THE PLATFORM WORKS
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-950">
              Built for Every Role in the Kitchen Ecosystem
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className={cn(
                    "rounded-3xl border p-6 shadow-2xs space-y-4 transition-all hover:-translate-y-0.5",
                    pillar.cardTint
                  )}
                >
                  <div
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-2xl",
                      pillar.badgeBg
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-extrabold text-stone-950">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="rounded-3xl border border-orange-200/80 bg-[#FAF7F2] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-xl font-extrabold text-stone-950">
              Ready to taste fresh brick-oven pizza or launch your kitchen?
            </h3>
            <p className="text-sm text-stone-600">
              Explore approved dishes right now or head into your dashboard to
              manage orders and menus.
            </p>
          </div>

          <Link
            href="/menu"
            className={cn(
              buttonVariants(),
              "w-fit shrink-0 rounded-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold px-6 h-11 gap-2"
            )}
          >
            <Pizza className="h-4 w-4 -rotate-12" />
            <span>Explore Menu</span>
          </Link>
        </div>
      </div>
    </section>
  );
}