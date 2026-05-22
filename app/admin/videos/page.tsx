"use client";

import { useRouter } from "next/navigation";
import { useContent } from "@/lib/store/content";
import { useUi } from "@/lib/store/ui";
import { DataTable, statusBadge, Edit, Copy, Trash2 } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatNumber } from "@/lib/utils";
import type { Video } from "@/lib/types";

export default function AdminVideosPage() {
  const router = useRouter();
  const videos = useContent((s) => s.videos);
  const deleteVideo = useContent((s) => s.deleteVideo);
  const createVideo = useContent((s) => s.createVideo);
  const toast = useUi((s) => s.toast);

  return (
    <DataTable<Video>
      title="影音管理"
      description={`${videos.length} 部節目 — 戲劇、紀錄片、綜藝、兒少、電影、短影音`}
      data={videos}
      searchKeys={["title", "titleEn", "director"] as (keyof Video)[]}
      searchPlaceholder="搜尋節目名稱、英文標題、導演..."
      newHref="/admin/videos/new"
      newLabel="新增節目"
      filters={[
        {
          key: "category",
          label: "類別",
          values: ["戲劇", "紀錄片", "綜藝", "兒少", "電影"].map((v) => ({ value: v, label: v })),
          filter: (row, v) => row.category === v,
        },
        {
          key: "status",
          label: "狀態",
          values: [
            { value: "published", label: "已發布" },
            { value: "draft", label: "草稿" },
            { value: "archived", label: "已下架" },
          ],
          filter: (row, v) => row.status === v,
        },
      ]}
      columns={[
        {
          key: "title",
          header: "節目",
          cell: (v) => (
            <div className="flex items-center gap-3 min-w-[280px]">
              <div className="relative w-14 aspect-[3/4] shrink-0 overflow-hidden rounded-md bg-bg-deep">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={v.poster} alt={v.title} className="size-full object-cover" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-text-primary line-clamp-1">{v.title}</div>
                <div className="text-xs text-text-muted mt-0.5">{v.titleEn ?? "—"}</div>
              </div>
            </div>
          ),
        },
        { key: "category", header: "類別", cell: (v) => <Badge variant="outline">{v.category}</Badge> },
        { key: "episodes", header: "集數", cell: (v) => `${v.episodeCount} 集` },
        { key: "paywall", header: "付費", cell: (v) => <Badge variant={v.paywall === "free" ? "muted" : v.paywall === "subscriber" ? "warm" : "warning"}>{v.paywall === "free" ? "免費" : v.paywall === "subscriber" ? "會員" : `NT$${v.price}`}</Badge> },
        { key: "views", header: "觀看", sortable: true, sortValue: (v) => v.viewCount, cell: (v) => formatNumber(v.viewCount) },
        { key: "publishedAt", header: "發布日", sortable: true, sortValue: (v) => v.publishedAt, cell: (v) => formatDate(v.publishedAt) },
        { key: "status", header: "狀態", cell: (v) => statusBadge(v.status) },
      ]}
      actions={[
        { label: "編輯", icon: <Edit className="size-4" />, onClick: (v) => router.push(`/admin/videos/${v.id}`) },
        { label: "複製", icon: <Copy className="size-4" />, onClick: (v) => {
          const newId = createVideo({ ...v, title: `${v.title} (副本)`, slug: `${v.slug}-copy`, status: "draft" });
          toast({ variant: "success", title: "已複製為新草稿", description: `ID: ${newId}` });
        } },
        { label: "刪除", icon: <Trash2 className="size-4" />, variant: "danger", onClick: (v) => {
          if (confirm(`確定刪除「${v.title}」？此操作無法復原。`)) {
            deleteVideo(v.id);
            toast({ variant: "warning", title: "已刪除節目", description: v.title });
          }
        } },
      ]}
    />
  );
}
