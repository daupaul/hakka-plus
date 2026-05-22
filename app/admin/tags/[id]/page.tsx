"use client";

import { use, useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { useContent } from "@/lib/store/content";
import { EntityForm, FormSection, FormField } from "@/components/admin/entity-form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const CATEGORIES = ["飲食", "地點", "節慶", "工藝", "影視", "人物"] as const;

export default function EditTagPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const tags = useContent((s) => s.tags);
  const updateTag = useContent((s) => s.updateTag);
  const deleteTag = useContent((s) => s.deleteTag);
  const item = tags.find((t) => t.id === id);
  const [data, setData] = useState(item);
  useEffect(() => setData(item), [item]);

  if (!item || !data) {
    if (tags.length > 0) notFound();
    return <div className="text-text-muted">Loading…</div>;
  }
  const set = <K extends keyof typeof data>(k: K, v: (typeof data)[K]) => setData((d) => d ? { ...d, [k]: v } : d);

  const relatedTags = tags.filter((t) => data.relatedTagIds.includes(t.id));

  return (
    <EntityForm
      title={`編輯：#${item.name}`}
      backHref="/admin/tags"
      onSave={() => { if (data) updateTag(id, data); }}
      onDelete={() => deleteTag(id)}
      sidebar={
        <FormSection title="關聯標籤">
          {relatedTags.length === 0 ? (
            <div className="text-xs text-text-muted">尚未設定關聯</div>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {relatedTags.map((t) => <Badge key={t.id} variant="default">#{t.name}</Badge>)}
            </div>
          )}
        </FormSection>
      }
    >
      <FormSection title="基本資訊">
        <FormField label="名稱" required><Input value={data.name} onChange={(e) => set("name", e.target.value)} /></FormField>
        <FormField label="類別">
          <select value={data.category} onChange={(e) => set("category", e.target.value as (typeof CATEGORIES)[number])} className="h-10 w-full rounded-lg border border-border bg-bg-elevated px-3 text-sm">
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </FormField>
        <FormField label="同義詞" hint="用逗號分隔，搜尋時會一併命中">
          <Input value={data.synonyms.join(", ")} onChange={(e) => set("synonyms", e.target.value.split(/[,，、]/).map(s => s.trim()).filter(Boolean))} />
        </FormField>
        <FormField label="內容數量"><Input type="number" value={data.contentCount} onChange={(e) => set("contentCount", Number(e.target.value))} /></FormField>
      </FormSection>
    </EntityForm>
  );
}
