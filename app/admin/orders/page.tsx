"use client";

import ordersSeed from "@/lib/mock/orders.json";
import type { Order } from "@/lib/types";
import { DataTable, Edit } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { formatDateTime, formatCurrency } from "@/lib/utils";
import { useRouter } from "next/navigation";

const ORDERS = ordersSeed as unknown as Order[];

export default function AdminOrdersPage() {
  const router = useRouter();
  return (
    <DataTable<Order>
      title="訂單列表"
      description="會員訂閱、單片購買、選物商品訂單"
      data={ORDERS}
      searchKeys={["memberName", "itemName", "invoiceNo"] as (keyof Order)[]}
      searchPlaceholder="搜尋會員、商品、發票號..."
      filters={[
        {
          key: "status",
          label: "狀態",
          values: [
            { value: "completed", label: "已完成" },
            { value: "paid", label: "已付款" },
            { value: "pending", label: "待付款" },
            { value: "refunded", label: "已退款" },
            { value: "failed", label: "失敗" },
          ],
          filter: (o, v) => o.status === v,
        },
        {
          key: "type",
          label: "類別",
          values: [
            { value: "subscription", label: "訂閱" },
            { value: "single-purchase", label: "單片" },
            { value: "product", label: "選物" },
          ],
          filter: (o, v) => o.type === v,
        },
      ]}
      columns={[
        { key: "id", header: "訂單編號", cell: (o) => <code className="text-xs">#{o.id}</code> },
        { key: "member", header: "會員", cell: (o) => o.memberName },
        { key: "item", header: "品項", cell: (o) => <div className="min-w-[180px]"><div className="font-semibold text-text-primary line-clamp-1">{o.itemName}</div><div className="text-xs text-text-muted">{o.type === "subscription" ? "訂閱" : o.type === "single-purchase" ? "單片" : "選物"}</div></div> },
        { key: "amount", header: "金額", sortable: true, sortValue: (o) => o.amount, cell: (o) => <span className="font-bold text-text-primary">{formatCurrency(o.amount)}</span> },
        { key: "payment", header: "付款方式", cell: (o) => <Badge variant="muted">{o.paymentMethod === "credit-card" ? "信用卡" : o.paymentMethod === "atm" ? "ATM" : o.paymentMethod === "apple-pay" ? "Apple Pay" : o.paymentMethod === "google-pay" ? "Google Pay" : "超商"}</Badge> },
        { key: "status", header: "狀態", cell: (o) => <Badge variant={o.status === "completed" ? "success" : o.status === "pending" ? "warning" : o.status === "refunded" ? "outline" : o.status === "failed" ? "danger" : "default"}>{o.status === "completed" ? "已完成" : o.status === "pending" ? "待付款" : o.status === "refunded" ? "已退款" : o.status === "failed" ? "失敗" : "已付款"}</Badge> },
        { key: "createdAt", header: "建立時間", sortable: true, sortValue: (o) => o.createdAt, cell: (o) => <span className="text-xs">{formatDateTime(o.createdAt)}</span> },
      ]}
      actions={[
        { label: "查看詳情", icon: <Edit className="size-4" />, onClick: (o) => router.push(`/admin/orders/${o.id}`) },
      ]}
    />
  );
}
