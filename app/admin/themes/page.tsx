"use client";

import { useRouter } from "next/navigation";
import { useContent } from "@/lib/store/content";
import { useUi } from "@/lib/store/ui";
import { DataTable, Edit, Trash2 } from "@/components/admin/data-table";
import { formatNumber } from "@/lib/utils";
import type { Theme } from "@/lib/types";

export default function AdminThemesPage() {
  const router = useRouter();
  const themes = useContent((s) => s.themes);
  const deleteTheme = useContent((s) => s.deleteTheme);
  const toast = useUi((s) => s.toast);

  return (
    <DataTable<Theme>
      title="主題訂閱管理"
      description={`${themes.length} 個主題訂閱 — 跨類型標籤組合，前台 /themes 立即反映`}
      data={themes}
      searchKeys={["name", "slug"] as (keyof Theme)[]}
      searchPlaceholder="搜尋主題..."
      newHref="/admin/themes/new"
      newLabel="新增主題"
      columns={[
        {
          key: "name",
          header: "主題",
          cell: (t) => (
            <div className="flex items-center gap-3 min-w-[260px]">
              <div className="relative w-20 aspect-video shrink-0 overflow-hidden rounded-md bg-bg-deep">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.cover} alt={t.name} className="size-full object-cover" />
              </div>
              <div className="min-w-0">
                <div className="font-display font-bold text-text-primary">{t.name}</div>
                <div className="text-xs text-text-muted line-clamp-1">{t.description}</div>
              </div>
            </div>
          ),
        },
        { key: "slug", header: "Slug", cell: (t) => <code className="text-xs">{t.slug}</code> },
        { key: "tags", header: "關聯標籤數", cell: (t) => <span className="font-bold text-accent">{t.tagIds.length}</span> },
        { key: "subscribers", header: "訂閱數", sortable: true, sortValue: (t) => t.subscriberCount, cell: (t) => formatNumber(t.subscriberCount) },
      ]}
      actions={[
        { label: "編輯", icon: <Edit className="size-4" />, onClick: (t) => router.push(`/admin/themes/${t.id}`) },
        { label: "刪除", icon: <Trash2 className="size-4" />, variant: "danger", onClick: (t) => {
          if (confirm(`確定刪除「${t.name}」？`)) {
            deleteTheme(t.id);
            toast({ variant: "warning", title: "已刪除主題", description: t.name });
          }
        } },
      ]}
    />
  );
}
