"use client";

import { use, useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Eye } from "lucide-react";
import { useContent } from "@/lib/store/content";
import { EntityForm, FormSection, FormField } from "@/components/admin/entity-form";
import { Input, Textarea } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function EditThemePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const themes = useContent((s) => s.themes);
  const updateTheme = useContent((s) => s.updateTheme);
  const deleteTheme = useContent((s) => s.deleteTheme);

  const item = themes.find((t) => t.id === id);
  const [data, setData] = useState(item);
  useEffect(() => setData(item), [item]);

  if (!item || !data) {
    if (themes.length > 0) notFound();
    return <div className="text-text-muted">Loading…</div>;
  }
  const set = <K extends keyof typeof data>(k: K, v: (typeof data)[K]) => setData((d) => d ? { ...d, [k]: v } : d);

  return (
    <EntityForm
      title={`編輯：${item.name}`}
      backHref="/admin/themes"
      onSave={() => { if (data) updateTheme(id, data); }}
      onDelete={() => deleteTheme(id)}
      sidebar={
        <>
          <FormSection title="統計">
            <div className="text-xs text-text-muted">訂閱數</div>
            <div className="mt-1 font-display text-3xl font-extrabold text-accent">{item.subscriberCount.toLocaleString()}</div>
            <Link href={`/themes/${item.slug}`} target="_blank" className="text-sm text-accent inline-flex items-center gap-1.5 hover:underline">
              <Eye className="size-3.5" /> 前台預覽
            </Link>
          </FormSection>
          <FormSection title="封面預覽">
            <div className="aspect-video bg-bg-base rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.cover} alt="cover" className="size-full object-cover" />
            </div>
          </FormSection>
          <FormSection title="關聯標籤">
            <div className="flex flex-wrap gap-1.5">
              {data.tagIds.map((t) => <Badge key={t} variant="default">{t}</Badge>)}
              {data.tagIds.length === 0 && <span className="text-xs text-text-muted">尚未設定</span>}
            </div>
          </FormSection>
        </>
      }
    >
      <FormSection title="主題資訊">
        <FormField label="主題名稱" required><Input value={data.name} onChange={(e) => set("name", e.target.value)} required /></FormField>
        <FormField label="描述"><Textarea value={data.description} onChange={(e) => set("description", e.target.value)} /></FormField>
        <FormField label="封面圖 URL"><Input value={data.cover} onChange={(e) => set("cover", e.target.value)} /></FormField>
        <FormField label="關聯標籤 ID" hint="用逗號分隔">
          <Input value={data.tagIds.join(", ")} onChange={(e) => set("tagIds", e.target.value.split(/[,，、]/).map(s => s.trim()).filter(Boolean))} />
        </FormField>
        <FormField label="訂閱數（手動調整）"><Input type="number" value={data.subscriberCount} onChange={(e) => set("subscriberCount", Number(e.target.value))} /></FormField>
      </FormSection>
    </EntityForm>
  );
}
