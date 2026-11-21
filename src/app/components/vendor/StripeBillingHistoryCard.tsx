"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface BillingTransaction {
  _id: string;
  payment_date: string;
  payment_intent: string;
  payment_status: string;
}

export default function StripeBillingHistoryCard({
  transactions = [],
}: {
  transactions?: BillingTransaction[];
}) {
  return (
    <Card className="rounded-3xl border border-orange-200/80 bg-white shadow-2xs">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-base sm:text-lg font-extrabold text-stone-950">
          My Stripe Billing History
        </h2>

        {transactions.length === 0 ? (
          <p className="py-6 text-center text-xs sm:text-sm text-stone-500">
            No billing transactions found yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-orange-100 text-[11px] font-bold uppercase tracking-wider text-stone-400">
                  <th className="py-2.5 pr-4">Date</th>
                  <th className="py-2.5 px-4">Plan</th>
                  <th className="py-2.5 px-4">Amount</th>
                  <th className="py-2.5 px-4">Transaction ID</th>
                  <th className="py-2.5 pl-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orange-100/70 text-xs sm:text-sm">
                {transactions.map((tx) => {
                  const isPaid = tx.payment_status === "paid";

                  return (
                    <tr
                      key={tx._id}
                      className="hover:bg-[#FAF7F2]/60 transition-colors"
                    >
                      <td className="py-3.5 pr-4 font-medium text-stone-700 whitespace-nowrap">
                        {new Date(tx.payment_date).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-stone-950 whitespace-nowrap">
                        Lifetime Premium 
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-stone-800 whitespace-nowrap">
                        $29.00 USD
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs text-stone-500 whitespace-nowrap">
                        {tx.payment_intent}
                      </td>
                      <td className="py-3.5 pl-4 text-right whitespace-nowrap">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-bold",
                            isPaid
                              ? "bg-emerald-100/90 text-emerald-800 border-emerald-200/80"
                              : "bg-amber-100/90 text-amber-800 border-amber-200/80"
                          )}
                        >
                          {isPaid ? "Succeeded" : "Pending"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}