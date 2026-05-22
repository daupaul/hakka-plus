"use client";

import { useRouter } from "next/navigation";
import { useContent } from "@/lib/store/content";
import { useUi } from "@/lib/store/ui";
import { DataTable, statusBadge, Edit, Copy, Trash2 } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatNumber } from "@/lib/utils";
import type { NewsItem } from "@/lib/types";

export default function AdminNewsPage() {
  const router = useRouter();
  const news = useContent((s) => s.news);
  const deleteNews = useContent((s) => s.deleteNews);
  const toast = useUi((s) => s.toast);

  return (
    <DataTable<NewsItem>
      title="新聞管理"
      description={`${news.length} 則新聞 — 對應 v2 評委 Q10/M4 補強的「6+6 新聞模組」`}
      data={news}
      searchKeys={["title", "author"] as (keyof NewsItem)[]}
      searchPlaceholder="搜尋新聞標題、記者..."
      newHref="/admin/news/new"
      newLabel="新增新聞"
      filters={[
        {
          key: "category",
          label: "類別",
          values: ["即時", "客家文化", "客語教育", "生活", "政策"].map((v) => ({ value: v, label: v })),
          filter: (row, v) => row.category === v,
        },
        {
          key: "source",
          label: "來源",
          values: [
            { value: "manual", label: "編輯撰寫" },
            { value: "inews", label: "iNews 匯入" },
          ],
          filter: (row, v) => row.source === v,
        },
      ]}
      columns={[
        {
          key: "title",
          header: "新聞",
          cell: (n) => (
            <div className="flex items-center gap-3 min-w-[320px]">
              <div className="relative w-20 aspect-[4/3] shrink-0 overflow-hidden rounded-md bg-bg-deep">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={n.image} alt={n.title} className="size-full object-cover" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-text-primary line-clamp-2">{n.title}</div>
                <div className="text-xs text-text-muted mt-0.5 line-clamp-1">{n.author ?? "—"}</div>
              </div>
            </div>
          ),
        },
        { key: "category", header: "類別", cell: (n) => <Badge variant="outline">{n.category}</Badge> },
        { key: "source", header: "來源", cell: (n) => <Badge variant={n.source === "inews" ? "muted" : "default"}>{n.source === "inews" ? "iNews" : "編輯"}</Badge> },
        { key: "featured", header: "精選", cell: (n) => n.featured ? <Badge variant="warm">精選</Badge> : <span className="text-text-muted text-xs">—</span> },
        { key: "views", header: "閱讀", sortable: true, sortValue: (n) => n.viewCount, cell: (n) => formatNumber(n.viewCount) },
        { key: "publishedAt", header: "發布日", sortable: true, sortValue: (n) => n.publishedAt, cell: (n) => formatDate(n.publishedAt) },
        { key: "status", header: "狀態", cell: (n) => statusBadge(n.status) },
      ]}
      actions={[
        { label: "編輯", icon: <Edit className="size-4" />, onClick: (n) => router.push(`/admin/news/${n.id}`) },
        { label: "刪除", icon: <Trash2 className="size-4" />, variant: "danger", onClick: (n) => {
          if (confirm(`確定刪除「${n.title}」？`)) {
            deleteNews(n.id);
            toast({ variant: "warning", title: "已刪除新聞", description: n.title });
          }
        } },
      ]}
    />
  );
}
