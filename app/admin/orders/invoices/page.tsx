"use client";

import ordersSeed from "@/lib/mock/orders.json";
import type { Order } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { useUi } from "@/lib/store/ui";
import { formatDate, formatCurrency } from "@/lib/utils";

const ORDERS = (ordersSeed as unknown as Order[]).filter((o) => o.invoiceNo);

export default function InvoicesPage() {
  const toast = useUi((s) => s.toast);
  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">發票管理</h1>
          <p className="mt-1 text-sm text-text-secondary">電子發票自動開立、查詢、重新寄送。</p>
        </div>
        <Button onClick={() => toast({ variant: "success", title: "已下載對帳單", description: "Excel 檔已產出 (2026-05 全月)" })}><Download className="size-4" /> 下載月對帳單</Button>
      </div>

      <div className="grid sm:grid-cols-4 gap-3">
        <Stat label="本月已開立" value="284" />
        <Stat label="本月作廢" value="3" tone="warning" />
        <Stat label="待寄送" value="0" tone="good" />
        <Stat label="累計總額" value="NT$2.84M" />
      </div>

      <Card><CardContent className="p-0">
        <table className="w-full text-sm">
          <thead className="bg-bg-elevated border-b border-border"><tr>
            <th className="text-left p-3 text-xs text-text-muted">發票號碼</th>
            <th className="text-left p-3 text-xs text-text-muted">買受人</th>
            <th className="text-left p-3 text-xs text-text-muted">品項</th>
            <th className="text-left p-3 text-xs text-text-muted">金額</th>
            <th className="text-left p-3 text-xs text-text-muted">開立日</th>
            <th className="text-left p-3 text-xs text-text-muted">狀態</th>
            <th />
          </tr></thead>
          <tbody>
            {ORDERS.map((o) => (
              <tr key={o.id} className="border-b border-border last:border-b-0 hover:bg-bg-elevated/40">
                <td className="p-3 font-mono text-xs">{o.invoiceNo}</td>
                <td className="p-3">{o.memberName}</td>
                <td className="p-3">{o.itemName}</td>
                <td className="p-3 font-bold">{formatCurrency(o.amount)}</td>
                <td className="p-3 text-xs text-text-muted">{o.paidAt ? formatDate(o.paidAt) : "—"}</td>
                <td className="p-3"><Badge variant={o.status === "refunded" ? "outline" : "success"}>{o.status === "refunded" ? "作廢" : "已開立"}</Badge></td>
                <td className="p-3 text-right">
                  <Button size="sm" variant="ghost" onClick={() => toast({ variant: "default", title: "已寄送發票", description: o.invoiceNo })}>
                    <FileText className="size-3.5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent></Card>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "good" | "warning" }) {
  return (
    <Card><CardContent>
      <div className="text-xs uppercase tracking-wider text-text-muted">{label}</div>
      <div className={`mt-2 font-display text-3xl font-extrabold ${tone === "warning" ? "text-warning" : tone === "good" ? "text-success" : "text-text-primary"}`}>{value}</div>
    </CardContent></Card>
  );
}
