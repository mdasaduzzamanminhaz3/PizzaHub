import React from "react";
import { getAllPaymentsAdmin } from "@/lib/api/payments";
import type {
  PlatformTransactionRecord,
  TransactionStatus,
} from "@/app/components/admin/PlatformTransactionsTable";
import PlatformTransactionsClient from "@/app/components/admin/PlatformTransactionsClient";

const normalizeStatus = (status: string): TransactionStatus => {
  const s = (status || "").toLowerCase();
  if (s === "complete" || s === "paid" || s === "succeeded") return "Succeeded";
  if (s === "failed") return "Failed";
  return "Pending";
};

export default async function AdminTransactionsPage() {
  const payments = await getAllPaymentsAdmin();
  const list = Array.isArray(payments) ? payments : [];

  const records: PlatformTransactionRecord[] = list.map((tx: any, i: number) => ({
    id: String(tx._id || `tx-${i + 1}`),
    vendorName: tx.vendor_email || "Vendor",
    planName: "Lifetime Premium",
    amount: "$29.00",
    currency: "USD",
    stripeSessionId: tx.sessionId || tx.payment_intent || "N/A",
    status: normalizeStatus(tx.status || tx.payment_status),
    date: tx.payment_date ? String(tx.payment_date).split("T")[0] : "",
  }));

  return <PlatformTransactionsClient initialRecords={records} />;
}