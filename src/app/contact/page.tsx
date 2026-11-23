"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  Pizza,
  Store,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type InquiryTopic =
  | "Order & Delivery Support"
  | "Vendor & Pro Subscription"
  | "Menu Moderation & Account"
  | "General Feedback";

const inquiryTopics: InquiryTopic[] = [
  "Order & Delivery Support",
  "Vendor & Pro Subscription",
  "Menu Moderation & Account",
  "General Feedback",
];

const supportChannels = [
  {
    label: "SUPPORT EMAIL",
    value: "support@pizzahub.app",
    detail: "Order & vendor assistance within business hours",
    icon: Mail,
    badgeBg: "bg-red-50 text-[#dc2626]",
  },
  {
    label: "OPERATIONS HUB",
    value: "Dhaka, Bangladesh",
    detail: "Serving Gulshan 2, Banani, Dhanmondi, Uttara & more",
    icon: MapPin,
    badgeBg: "bg-orange-100/80 text-[#f97316]",
  },
  {
    label: "KITCHEN & SUPPORT HOURS",
    value: "Daily • 10:00 AM – 11:00 PM",
    detail: "Live order tracking & partner kitchen support",
    icon: Clock,
    badgeBg: "bg-amber-100/80 text-amber-800",
  },
];

export default function ContactSupportPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<InquiryTopic>("Order & Delivery Support");
  const [orderOrItemRef, setOrderOrItemRef] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }

    setSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 450));
      const ticketCode = `PH-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedRef(ticketCode);
      toast.success(`Support request received (${ticketCode}).`);
      setOrderOrItemRef("");
      setMessage("");
    } catch {
      toast.error("Could not send your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#FFFDFB] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Header */}
        <div className="rounded-3xl border border-orange-200/80 bg-white p-7 sm:p-9 shadow-2xs space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 border border-red-100 px-3.5 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-[#dc2626]">
            <Send className="h-3.5 w-3.5" />
            Contact &amp; Support
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-950">
            Need help with an order, kitchen listing, or plan?
          </h1>

          <p className="text-sm sm:text-base text-stone-500 max-w-2xl">
            Reach out for customer delivery questions, vendor Free/Pro plan
            allowance help, or menu moderation support.
          </p>
        </div>

        {/* Main 12-Column Grid: Form + Support Info & Shortcuts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: Support Request Form */}
          <div className="lg:col-span-7 rounded-3xl border border-orange-200/80 bg-white p-6 sm:p-8 shadow-2xs space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-stone-950">
                Send a Support Message
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                Include your order ID or dish name if your message is about a
                specific order or menu item.
              </p>
            </div>

            {submittedRef && (
              <div className="rounded-2xl border border-emerald-200 bg-[#F4FBF7] p-4 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-stone-700 space-y-0.5">
                  <p className="font-extrabold text-emerald-800">
                    Message logged — Reference #{submittedRef}
                  </p>
                  <p>
                    Our support team has noted your{" "}
                    <span className="font-semibold">{topic}</span> request and
                    will follow up via{" "}
                    <span className="font-semibold">{email || "your email"}</span>.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="contact-name"
                    className="text-xs font-bold text-stone-800"
                  >
                    Full Name <span className="text-[#dc2626]">*</span>
                  </Label>
                  <Input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="h-11 rounded-2xl bg-[#FAF7F2]/60 border-orange-200/80 focus-visible:border-[#dc2626]"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="contact-email"
                    className="text-xs font-bold text-stone-800"
                  >
                    Email Address <span className="text-[#dc2626]">*</span>
                  </Label>
                  <Input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="h-11 rounded-2xl bg-[#FAF7F2]/60 border-orange-200/80 focus-visible:border-[#dc2626]"
                  />
                </div>
              </div>

              {/* Topic & Optional Reference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="contact-topic"
                    className="text-xs font-bold text-stone-800"
                  >
                    Topic
                  </Label>
                  <select
                    id="contact-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value as InquiryTopic)}
                    className="h-11 w-full rounded-2xl border border-orange-200/80 bg-[#FAF7F2]/60 px-3.5 text-sm font-medium text-stone-900 outline-none focus:border-[#dc2626]"
                  >
                    {inquiryTopics.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="contact-ref"
                    className="text-xs font-bold text-stone-800"
                  >
                    Order ID or Dish Name (Optional)
                  </Label>
                  <Input
                    id="contact-ref"
                    type="text"
                    value={orderOrItemRef}
                    onChange={(e) => setOrderOrItemRef(e.target.value)}
                    placeholder="e.g., ORD-1042 or Margherita"
                    className="h-11 rounded-2xl bg-[#FAF7F2]/60 border-orange-200/80 focus-visible:border-[#dc2626]"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="contact-message"
                  className="text-xs font-bold text-stone-800"
                >
                  How can we help? <span className="text-[#dc2626]">*</span>
                </Label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your question, order issue, or vendor subscription request..."
                  className="w-full rounded-2xl border border-orange-200/80 bg-[#FAF7F2]/60 p-3.5 text-sm text-stone-900 placeholder:text-stone-400 outline-none focus:border-[#dc2626]"
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="h-11 rounded-2xl bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm font-bold px-6 shadow-sm shadow-red-600/20 gap-2 cursor-pointer"
              >
                <Send className="h-4 w-4" />
                <span>{submitting ? "Sending..." : "Send Support Request"}</span>
              </Button>
            </form>
          </div>

          {/* Right 5 Columns: Support Channels & Quick Links */}
          <div className="lg:col-span-5 space-y-4">
            {supportChannels.map((channel) => {
              const Icon = channel.icon;
              return (
                <div
                  key={channel.label}
                  className="rounded-3xl border border-orange-200/80 bg-white p-5 shadow-2xs space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400">
                      {channel.label}
                    </span>
                    <span
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-xl",
                        channel.badgeBg
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                  </div>
                  <p className="text-base font-extrabold text-stone-950">
                    {channel.value}
                  </p>
                  <p className="text-xs text-stone-500">{channel.detail}</p>
                </div>
              );
            })}

            {/* Helpful Navigation Box */}
            <div className="rounded-3xl border border-orange-200/80 bg-[#FAF7F2] p-6 space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-stone-950">
                  Quick Self-Service Links
                </h3>
                <p className="text-xs text-stone-600">
                  Check common answers or jump directly to your menu and vendor
                  tools.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <Link
                  href="/help"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "rounded-full border-orange-200 bg-white text-stone-800 font-bold px-4 h-9 text-xs gap-1.5"
                  )}
                >
                  <HelpCircle className="h-3.5 w-3.5 text-[#dc2626]" />
                  <span>Read FAQ</span>
                </Link>

                <Link
                  href="/menu"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "rounded-full border-orange-200 bg-white text-stone-800 font-bold px-4 h-9 text-xs gap-1.5"
                  )}
                >
                  <Pizza className="h-3.5 w-3.5 text-[#dc2626]" />
                  <span>Browse Menu</span>
                </Link>

                <Link
                  href="/dashboard/vendor/subscription"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "rounded-full border-orange-200 bg-white text-stone-800 font-bold px-4 h-9 text-xs gap-1.5"
                  )}
                >
                  <Store className="h-3.5 w-3.5 text-[#dc2626]" />
                  <span>Vendor Plans</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}