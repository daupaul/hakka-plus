"use client";

import { useRouter } from "next/navigation";
import { useContent } from "@/lib/store/content";
import { useUi } from "@/lib/store/ui";
import { DataTable, statusBadge, Edit, Trash2 } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatNumber } from "@/lib/utils";
import type { Curation } from "@/lib/types";

export default function AdminCurationsPage() {
  const router = useRouter();
  const curations = useContent((s) => s.curations);
  const deleteCuration = useContent((s) => s.deleteCuration);
  const toast = useUi((s) => s.toast);

  return (
    <DataTable<Curation>
      title="策展管理"
      description={`${curations.length} 篇生活+ 策展 — 旅遊、選物、節慶、工藝、飲食`}
      data={curations}
      searchKeys={["title"] as (keyof Curation)[]}
      searchPlaceholder="搜尋策展標題..."
      newHref="/admin/curations/new"
      newLabel="新增策展"
      filters={[
        {
          key: "category",
          label: "類別",
          values: ["旅遊", "選物", "節慶", "工藝", "飲食"].map((v) => ({ value: v, label: v })),
          filter: (row, v) => row.category === v,
        },
      ]}
      columns={[
        {
          key: "title",
          header: "策展",
          cell: (c) => (
            <div className="flex items-center gap-3 min-w-[320px]">
              <div className="relative w-20 aspect-video shrink-0 overflow-hidden rounded-md bg-bg-deep">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.cover} alt={c.title} className="size-full object-cover" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-text-primary line-clamp-2">{c.title}</div>
                <div className="text-xs text-text-muted mt-0.5 line-clamp-1">{c.subtitle ?? c.summary.slice(0, 30)}</div>
              </div>
            </div>
          ),
        },
        { key: "category", header: "類別", cell: (c) => <Badge variant="warm">{c.category}</Badge> },
        { key: "related", header: "關聯", cell: (c) => <span className="text-xs text-text-secondary">影視 {c.relatedVideos.length} · 商品 {c.relatedProducts.length} · 新聞 {c.relatedNews.length}</span> },
        { key: "views", header: "瀏覽", sortable: true, sortValue: (c) => c.viewCount, cell: (c) => formatNumber(c.viewCount) },
        { key: "publishedAt", header: "發布日", sortable: true, sortValue: (c) => c.publishedAt, cell: (c) => formatDate(c.publishedAt) },
        { key: "status", header: "狀態", cell: (c) => statusBadge(c.status) },
      ]}
      actions={[
        { label: "編輯", icon: <Edit className="size-4" />, onClick: (c) => router.push(`/admin/curations/${c.id}`) },
        { label: "刪除", icon: <Trash2 className="size-4" />, variant: "danger", onClick: (c) => {
          if (confirm(`確定刪除「${c.title}」？`)) {
            deleteCuration(c.id);
            toast({ variant: "warning", title: "已刪除策展" });
          }
        } },
      ]}
    />
  );
}
