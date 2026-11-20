"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface BillingTransaction {
  id: string;
  date: string;
  plan: string;
  amount: string;
  stripeSession: string;
  status: "Succeeded" | "Pending" | "Failed";
}

const defaultTransactions: BillingTransaction[] = [
  {
    id: "tx-1",
    date: "2026-11-01",
    plan: "Premium Monthly",
    amount: "$29.00 USD",
    stripeSession: "cs_live_a1B2c3D4e5F6g7H819J0",
    status: "Succeeded",
  },
];

const statusBadgeMap: Record<BillingTransaction["status"], string> = {
  Succeeded: "bg-emerald-100/90 text-emerald-800 border-emerald-200/80",
  Pending: "bg-amber-100/90 text-amber-800 border-amber-200/80",
  Failed: "bg-red-100/90 text-[#dc2626] border-red-200/80",
};

export default function StripeBillingHistoryCard({
  transactions = defaultTransactions,
}: {
  transactions?: BillingTransaction[];
}) {
  return (
    <Card className="rounded-3xl border border-orange-200/80 bg-white shadow-2xs">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-base sm:text-lg font-extrabold text-stone-950">
          My Stripe Billing History
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-orange-100 text-[11px] font-bold uppercase tracking-wider text-stone-400">
                <th className="py-2.5 pr-4">Date</th>
                <th className="py-2.5 px-4">Plan</th>
                <th className="py-2.5 px-4">Amount</th>
                <th className="py-2.5 px-4">Stripe Session</th>
                <th className="py-2.5 pl-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-100/70 text-xs sm:text-sm">
              {transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-[#FAF7F2]/60 transition-colors"
                >
                  <td className="py-3.5 pr-4 font-medium text-stone-700 whitespace-nowrap">
                    {tx.date}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-stone-950 whitespace-nowrap">
                    {tx.plan}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-stone-800 whitespace-nowrap">
                    {tx.amount}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs text-stone-500 whitespace-nowrap">
                    {tx.stripeSession}
                  </td>
                  <td className="py-3.5 pl-4 text-right whitespace-nowrap">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-bold",
                        statusBadgeMap[tx.status]
                      )}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}