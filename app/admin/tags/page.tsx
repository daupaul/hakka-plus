"use client";

import { useContent } from "@/lib/store/content";
import { useUi } from "@/lib/store/ui";
import { DataTable, Edit, Trash2 } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import type { Tag } from "@/lib/types";

export default function AdminTagsPage() {
  const router = useRouter();
  const tags = useContent((s) => s.tags);
  const deleteTag = useContent((s) => s.deleteTag);
  const toast = useUi((s) => s.toast);

  return (
    <DataTable<Tag>
      title="標籤池"
      description={`${tags.length} 個跨類型標籤，用於影視 ↔ 新聞 ↔ 策展 ↔ 選物的內容宇宙串聯`}
      data={tags}
      searchKeys={["name"] as (keyof Tag)[]}
      searchPlaceholder="搜尋標籤..."
      newHref="/admin/tags/new"
      newLabel="新增標籤"
      filters={[
        {
          key: "category",
          label: "類別",
          values: ["飲食", "地點", "節慶", "工藝", "影視", "人物"].map((v) => ({ value: v, label: v })),
          filter: (row, v) => row.category === v,
        },
      ]}
      columns={[
        { key: "name", header: "標籤", cell: (t) => <div><span className="font-display font-bold text-text-primary">#{t.name}</span><div className="text-xs text-text-muted mt-0.5">{t.id}</div></div> },
        { key: "category", header: "類別", cell: (t) => <Badge variant="warm">{t.category}</Badge> },
        { key: "synonyms", header: "同義詞", cell: (t) => <span className="text-xs text-text-secondary">{t.synonyms.length === 0 ? "—" : t.synonyms.join(", ")}</span> },
        { key: "related", header: "關聯標籤", cell: (t) => <span className="text-xs text-text-secondary">{t.relatedTagIds.length} 個</span> },
        { key: "content", header: "內容數量", sortable: true, sortValue: (t) => t.contentCount, cell: (t) => <span className="font-bold text-accent">{t.contentCount}</span> },
      ]}
      actions={[
        { label: "編輯", icon: <Edit className="size-4" />, onClick: (t) => router.push(`/admin/tags/${t.id}`) },
        { label: "刪除", icon: <Trash2 className="size-4" />, variant: "danger", onClick: (t) => {
          if (confirm(`確定刪除 #${t.name}？`)) {
            deleteTag(t.id);
            toast({ variant: "warning", title: "已刪除標籤" });
          }
        } },
      ]}
    />
  );
}
