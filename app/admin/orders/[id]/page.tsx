"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText, RefreshCw, Mail } from "lucide-react";
import ordersSeed from "@/lib/mock/orders.json";
import type { Order } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUi } from "@/lib/store/ui";
import { formatDateTime, formatCurrency } from "@/lib/utils";

const ORDERS = ordersSeed as unknown as Order[];

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const toast = useUi((s) => s.toast);
  const order = ORDERS.find((o) => o.id === id);
  if (!order) notFound();

  return (
    <div className="space-y-6 max-w-4xl">
      <Link href="/admin/orders" className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-accent">
        <ArrowLeft className="size-4" /> 回訂單列表
      </Link>

      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <Badge variant={order.status === "completed" ? "success" : order.status === "pending" ? "warning" : order.status === "refunded" ? "outline" : "danger"}>
            {order.status === "completed" ? "已完成" : order.status === "pending" ? "待付款" : order.status === "refunded" ? "已退款" : "失敗"}
          </Badge>
          <h1 className="mt-2 font-display text-2xl lg:text-3xl font-extrabold text-text-primary">訂單 #{order.id}</h1>
          <div className="mt-1 text-sm text-text-muted">建立於 {formatDateTime(order.createdAt)}</div>
        </div>
        <div className="flex gap-2">
          {order.invoiceNo && <Button variant="secondary" onClick={() => toast({ variant: "default", title: "已寄送發票", description: order.invoiceNo })}><FileText className="size-4" /> 重新開發票</Button>}
          {order.status === "completed" && <Button variant="ghost" onClick={() => { if (confirm("確定退款？")) toast({ variant: "warning", title: "退款處理中", description: `將於 7 個工作天內退至原付款方式` }); }}><RefreshCw className="size-4" /> 退款</Button>}
          <Button variant="ghost" onClick={() => toast({ variant: "default", title: "已寄出通知" })}><Mail className="size-4" /> 通知會員</Button>
        </div>
      </div>

      <Card>
        <CardContent>
          <h2 className="font-display text-lg font-bold text-text-primary mb-4">訂單明細</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <Field label="會員" value={order.memberName} link={`/admin/members/${order.memberId}`} />
            <Field label="會員 ID" value={order.memberId} mono />
            <Field label="品項" value={order.itemName} />
            <Field label="類別" value={order.type === "subscription" ? "訂閱" : order.type === "single-purchase" ? "單片購買" : "選物商品"} />
            <Field label="金額" value={formatCurrency(order.amount)} highlight />
            <Field label="付款方式" value={order.paymentMethod === "credit-card" ? "信用卡" : order.paymentMethod === "atm" ? "ATM 轉帳" : order.paymentMethod === "apple-pay" ? "Apple Pay" : order.paymentMethod === "google-pay" ? "Google Pay" : "超商代碼"} />
            {order.paidAt && <Field label="付款時間" value={formatDateTime(order.paidAt)} />}
            {order.refundedAt && <Field label="退款時間" value={formatDateTime(order.refundedAt)} />}
            {order.invoiceNo && <Field label="發票號碼" value={order.invoiceNo} mono />}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Field({ label, value, link, mono, highlight }: { label: string; value: string; link?: string; mono?: boolean; highlight?: boolean }) {
  const content = <span className={`${mono ? "font-mono text-sm" : ""} ${highlight ? "font-display text-lg font-bold text-accent" : "font-semibold text-text-primary"}`}>{value}</span>;
  return (
    <div>
      <div className="text-xs text-text-muted">{label}</div>
      <div className="mt-1">{link ? <Link href={link} className="hover:text-accent underline-offset-4 hover:underline">{content}</Link> : content}</div>
    </div>
  );
}
