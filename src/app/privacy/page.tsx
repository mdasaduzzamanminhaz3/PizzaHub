import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Database,
  CreditCard,
  UserCheck,
  FileText,
  ArrowRight,
  Lock,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PolicySection {
  id: string;
  title: string;
  summary: string;
  points: string[];
  icon: React.ComponentType<{ className?: string }>;
  badgeBg: string;
}

const policySections: PolicySection[] = [
  {
    id: "data-collection",
    title: "1. Information We Collect & How It Is Used",
    summary:
      "We collect only the details needed to authenticate your account, deliver pizza orders, and run kitchen & governance tools.",
    icon: Database,
    badgeBg: "bg-red-50 text-[#dc2626]",
    points: [
      "Account & Profile Details: Name, email address, profile avatar, phone number, and default delivery address used to personalize your dashboard and prefill order details.",
      "Order & Kitchen Records: Selected menu items, quantities, scheduled delivery dates, delivery addresses, special instructions, and order status updates shared between customers and relevant pizzerias.",
      "Session & Security Context: Authentication session data and account status checks to verify active access and prevent blocked accounts from placing orders or modifying resources.",
    ],
  },
  {
    id: "roles-moderation",
    title: "2. Role Access, Menu Moderation & Account Controls",
    summary:
      "PizzaHub enforces role-based workflows across Customers, Partner Vendors, and Administrators.",
    icon: UserCheck,
    badgeBg: "bg-orange-100/80 text-[#f97316]",
    points: [
      "Customer & Vendor Profiles: You can update personal profile fields such as name, phone number, avatar, and default delivery address in Settings, while your assigned account role remains locked.",
      "Menu Item Review: Dishes submitted by vendors start in Pending status so administrators can review quality and policy compliance before items appear on the public menu.",
      "Platform Governance: Administrators may search accounts, adjust eligible user roles, or block/unblock accounts to keep the marketplace safe and reliable.",
    ],
  },
  {
    id: "payments-ledger",
    title: "3. Stripe Subscriptions & Immutable Ledger",
    summary:
      "Vendor Pro plan billing is processed through Stripe, and transaction logs are preserved for audit integrity.",
    icon: CreditCard,
    badgeBg: "bg-amber-100/80 text-amber-800",
    points: [
      "Stripe Checkout Processing: Vendor subscription payments are handled through Stripe rather than storing raw card credentials directly on PizzaHub application pages.",
      "Immutable Financial Ledger: Subscription payment records in the platform transactions ledger are maintained as read-only audit records so historical billing activity stays consistent.",
    ],
  },
  {
    id: "retention-rights",
    title: "4. Data Retention, Cookies & Your Choices",
    summary:
      "We retain operational records as needed for service continuity, dispute resolution, and audit compliance.",
    icon: Lock,
    badgeBg: "bg-emerald-100/80 text-emerald-700",
    points: [
      "Essential Cookies & Sessions: Authentication cookies and session tokens are used to keep you signed in and protect dashboard routes.",
      "Order & Transaction History: Completed, pending, rejected, or cancelled orders and subscription ledger entries may be retained for operational history and financial auditing.",
      "Updates & Contact: If you have questions about your profile data or platform privacy practices, reach out via our Contact & Support page.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <section className="min-h-screen bg-[#FFFDFB] py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Card */}
        <div className="rounded-3xl border border-orange-200/80 bg-white p-7 sm:p-9 shadow-2xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 border border-red-100 px-3.5 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-[#dc2626]">
              <ShieldCheck className="h-3.5 w-3.5" />
              Privacy &amp; Policy
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF7F2] border border-orange-200/70 px-3 py-1 text-xs font-semibold text-stone-600">
              <FileText className="h-3.5 w-3.5 text-stone-500" />
              Last updated: November 2026
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-950">
              PizzaHub Privacy Policy &amp; Platform Terms
            </h1>
            <p className="text-sm sm:text-base text-stone-500 leading-relaxed max-w-3xl">
              This policy explains how PizzaHub handles account profiles,
              delivery order details, vendor kitchen listings, Stripe
              subscription billing, and platform moderation records.
            </p>
          </div>

          {/* Quick Jump Anchors */}
          <div className="flex flex-wrap gap-2 pt-1">
            {policySections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="rounded-full bg-[#FAF7F2] hover:bg-orange-100/70 border border-orange-200/75 px-3.5 py-1.5 text-xs font-bold text-stone-700 transition-colors"
              >
                {sec.title.replace(/^\d+\.\s*/, "")}
              </a>
            ))}
          </div>
        </div>

        {/* Policy Sections */}
        <div className="space-y-5">
          {policySections.map((section) => {
            const Icon = section.icon;
            return (
              <article
                key={section.id}
                id={section.id}
                className="scroll-mt-24 rounded-3xl border border-orange-200/80 bg-white p-6 sm:p-8 shadow-2xs space-y-4"
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl",
                      section.badgeBg
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-lg sm:text-xl font-extrabold text-stone-950">
                      {section.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-500">
                      {section.summary}
                    </p>
                  </div>
                </div>

                <ul className="space-y-2.5 pl-1 sm:pl-13.5 text-xs sm:text-sm text-stone-700 leading-relaxed list-disc marker:text-[#dc2626]">
                  {section.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="rounded-3xl border border-orange-200/80 bg-[#FAF7F2] p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-extrabold text-stone-950">
              Questions about your account or data on PizzaHub?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              Visit our Help &amp; FAQ center or contact support for direct
              assistance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link
              href="/help"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "rounded-full border-orange-200 bg-white text-stone-800 font-bold px-4 h-10 text-xs"
              )}
            >
              Help &amp; FAQ
            </Link>
            <Link
              href="/contact"
              className={cn(
                buttonVariants(),
                "rounded-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold px-5 h-10 text-xs gap-1.5"
              )}
            >
              <span>Contact Support</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}