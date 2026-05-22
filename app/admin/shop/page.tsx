"use client";

import { useRouter } from "next/navigation";
import { useContent } from "@/lib/store/content";
import { useUi } from "@/lib/store/ui";
import { DataTable, Edit, Trash2 } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatNumber } from "@/lib/utils";
import type { Product } from "@/lib/types";

export default function AdminShopPage() {
  const router = useRouter();
  const products = useContent((s) => s.products);
  const deleteProduct = useContent((s) => s.deleteProduct);
  const toast = useUi((s) => s.toast);

  return (
    <DataTable<Product>
      title="導購商品管理"
      description={`${products.length} 件選物商品 — 跳轉合作電商完成交易，本平台只負責內容關聯與導購統計`}
      data={products}
      searchKeys={["name"] as (keyof Product)[]}
      searchPlaceholder="搜尋商品..."
      filters={[
        {
          key: "category",
          label: "類別",
          values: ["茶葉", "工藝品", "客語教材", "食品", "服飾"].map((v) => ({ value: v, label: v })),
          filter: (row, v) => row.category === v,
        },
        {
          key: "platform",
          label: "電商",
          values: ["Shopee", "PChome", "客家好物網"].map((v) => ({ value: v, label: v })),
          filter: (row, v) => row.externalPlatform === v,
        },
      ]}
      columns={[
        {
          key: "name",
          header: "商品",
          cell: (p) => (
            <div className="flex items-center gap-3 min-w-[260px]">
              <div className="relative size-12 shrink-0 overflow-hidden rounded-md bg-bg-deep">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.name} className="size-full object-cover" />
              </div>
              <div className="font-semibold text-text-primary line-clamp-2">{p.name}</div>
            </div>
          ),
        },
        { key: "category", header: "類別", cell: (p) => <Badge variant="warm">{p.category}</Badge> },
        { key: "platform", header: "合作平台", cell: (p) => <Badge variant="muted">{p.externalPlatform}</Badge> },
        { key: "price", header: "售價", sortable: true, sortValue: (p) => p.price, cell: (p) => <span className="font-bold text-accent">{formatCurrency(p.price)}</span> },
        { key: "clicks", header: "點擊", sortable: true, sortValue: (p) => p.clickCount, cell: (p) => formatNumber(p.clickCount) },
      ]}
      actions={[
        { label: "編輯", icon: <Edit className="size-4" />, onClick: () => toast({ variant: "default", title: "編輯商品（POC 簡化）" }) },
        { label: "刪除", icon: <Trash2 className="size-4" />, variant: "danger", onClick: (p) => {
          if (confirm(`確定刪除「${p.name}」？`)) {
            deleteProduct(p.id);
            toast({ variant: "warning", title: "已刪除商品" });
          }
        } },
      ]}
    />
  );
}
