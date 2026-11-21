"use client";

import React, { useMemo, useState } from "react";
import { Lock } from "lucide-react";
import PlatformTransactionsTable, {
  PlatformTransactionRecord,
  TransactionStatus,
} from "@/app/components/admin/PlatformTransactionsTable";
import TransactionsSummaryCards from "@/app/components/admin/TransactionsSummaryCards";

const initialTransactions: PlatformTransactionRecord[] = [
  {
    id: "tx-101",
    vendorName: "Il Forno Brick Oven",
    planName: "Lifetime Premium",
    amount: "$29.00",
    currency: "USD",
    stripeSessionId: "cs_live_a1B2c3D4e5F6g7H8i9J0",
    status: "Succeeded",
    date: "2026-11-01",
  },
  {
    id: "tx-102",
    vendorName: "Napoli Heat Kitchen",
    planName: "Lifetime Premium",
    amount: "$29.00",
    currency: "USD",
    stripeSessionId: "cs_live_z9Y8x7W6v5U4t3S2r1Q0",
    status: "Succeeded",
    date: "2026-10-15",
  },
  {
    id: "tx-103",
    vendorName: "Crust & Craft Pizzeria",
    planName: "Lifetime Premium",
    amount: "$29.00",
    currency: "USD",
    stripeSessionId: "cs_live_f4G5h6J7k8L9m0N1b2V3",
    status: "Failed",
    date: "2026-10-08",
  },
];

export default function AdminTransactionsPage() {
  const [records] = useState<PlatformTransactionRecord[]>(initialTransactions);
  const [statusFilter, setStatusFilter] = useState<"All" | TransactionStatus>(
    "All",
  );

  const summary = useMemo(() => {
    const succeeded = records.filter((r) => r.status === "Succeeded");
    const failed = records.filter((r) => r.status === "Failed");
    const revenueSum = succeeded.reduce((acc, item) => {
      const numeric = parseFloat(item.amount.replace(/[^0-9.]/g, "")) || 0;
      return acc + numeric;
    }, 0);

    return {
      totalRevenue: `$${revenueSum.toFixed(2)}`,
      succeededCount: succeeded.length,
      failedCount: failed.length,
      totalRecords: records.length,
    };
  }, [records]);

  const filteredRecords = useMemo(() => {
    if (statusFilter === "All") return records;
    return records.filter((r) => r.status === statusFilter);
  }, [records, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Header + Immutable Badge + Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-orange-200/80 bg-white px-6 py-5 shadow-2xs">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-stone-950">
            Platform Transactions Ledger
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Read-only audit log of vendor Stripe subscription payments.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            aria-label="Filter transactions by status"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as "All" | TransactionStatus)
            }
            className="h-10 rounded-full border border-orange-200/80 bg-[#FAF7F2]/70 px-3.5 text-xs font-bold text-stone-800 outline-none focus:border-[#dc2626] cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Succeeded">Succeeded</option>
            <option value="Failed">Failed</option>
            <option value="Pending">Pending</option>
          </select>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-900 text-white px-3.5 py-2 text-xs font-bold shadow-2xs">
            <Lock className="h-3.5 w-3.5 text-amber-400" />
            <span>Immutable Financial Records</span>
          </span>
        </div>
      </div>

      {/* Separated Summary Cards */}
      <TransactionsSummaryCards stats={summary} />

      {/* Separated Read-Only Ledger Table */}
      <PlatformTransactionsTable records={filteredRecords} />
    </div>
  );
}
