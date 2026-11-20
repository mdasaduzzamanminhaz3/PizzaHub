"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type TransactionStatus = "Succeeded" | "Failed" | "Pending";

export interface PlatformTransactionRecord {
  id: string;
  vendorName: string;
  planName: string;
  amount: string;
  currency: string;
  stripeSessionId: string;
  status: TransactionStatus;
  date: string;
}

const statusPillMap: Record<TransactionStatus, string> = {
  Succeeded: "bg-emerald-100/90 text-emerald-800 border-emerald-200/80",
  Failed: "bg-red-100/90 text-[#dc2626] border-red-200/80",
  Pending: "bg-amber-100/90 text-amber-800 border-amber-200/80",
};

export default function PlatformTransactionsTable({
  records,
}: {
  records: PlatformTransactionRecord[];
}) {
  return (
    <Card className="rounded-3xl border border-orange-200/80 bg-white shadow-2xs overflow-hidden">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-orange-100 bg-[#FAF7F2]/70 text-[11px] font-bold uppercase tracking-wider text-stone-400">
                <th className="py-3.5 px-5">Vendor</th>
                <th className="py-3.5 px-4">Plan</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Stripe Session ID</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-5 text-right">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-orange-100/70 text-xs sm:text-sm">
              {records.map((row) => (
                <tr
                  key={row.id}
                  className="transition-colors hover:bg-[#FAF7F2]/50"
                >
                  <td className="py-4 px-5 font-extrabold text-stone-950">
                    {row.vendorName}
                  </td>

                  <td className="py-4 px-4 font-semibold text-stone-700 leading-snug">
                    {row.planName}
                  </td>

                  <td className="py-4 px-4 font-extrabold text-stone-950 leading-snug whitespace-nowrap">
                    <div>{row.amount}</div>
                    <div className="text-[11px] font-bold text-stone-500">
                      {row.currency}
                    </div>
                  </td>

                  <td className="py-4 px-4 font-mono text-xs text-stone-500 whitespace-nowrap">
                    {row.stripeSessionId}
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-bold",
                        statusPillMap[row.status]
                      )}
                    >
                      {row.status}
                    </span>
                  </td>

                  <td className="py-4 px-5 text-right font-medium text-stone-600 whitespace-nowrap">
                    {row.date}
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