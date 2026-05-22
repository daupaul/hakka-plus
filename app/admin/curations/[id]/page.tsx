"use client";

import { use, useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useContent } from "@/lib/store/content";
import { EntityForm, FormSection, FormField } from "@/components/admin/entity-form";
import { Input, Textarea } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

const CATEGORIES = ["旅遊", "選物", "節慶", "工藝", "飲食"] as const;

export default function EditCurationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const curations = useContent((s) => s.curations);
  const updateCuration = useContent((s) => s.updateCuration);
  const deleteCuration = useContent((s) => s.deleteCuration);

  const item = curations.find((c) => c.id === id);
  const [data, setData] = useState(item);
  useEffect(() => setData(item), [item]);

  if (!item || !data) {
    if (curations.length > 0) notFound();
    return <div className="text-text-muted">Loading…</div>;
  }

  const set = <K extends keyof typeof data>(k: K, v: (typeof data)[K]) => setData((d) => d ? { ...d, [k]: v } : d);

  return (
    <EntityForm
      title={`編輯：${item.title}`}
      backHref="/admin/curations"
      onSave={() => { if (data) updateCuration(id, data); }}
      onDelete={() => deleteCuration(id)}
      sidebar={
        <>
          <FormSection title="發布狀態">
            <FormField label="狀態">
              <select value={data.status} onChange={(e) => set("status", e.target.value as typeof data.status)} className="h-10 w-full rounded-lg border border-border bg-bg-elevated px-3 text-sm">
                <option value="draft">草稿</option>
                <option value="published">已發布</option>
                <option value="archived">已下架</option>
              </select>
            </FormField>
            <Link href={`/life/${item.slug}`} target="_blank" className="text-sm text-accent inline-flex items-center gap-1.5 hover:underline">
              <Eye className="size-3.5" /> 前台預覽
            </Link>
          </FormSection>
          <FormSection title="主圖">
            <FormField label="封面"><Input value={data.cover} onChange={(e) => set("cover", e.target.value)} /></FormField>
            <div className="aspect-video bg-bg-deep rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.cover} alt="preview" className="size-full object-cover" />
            </div>
          </FormSection>
          <FormSection title="關聯">
            <div className="text-xs text-text-muted">這篇策展連動的內容：</div>
            <div className="space-y-1.5 text-sm">
              <div>影視：<Badge variant="default">{data.relatedVideos.length}</Badge></div>
              <div>商品：<Badge variant="warm">{data.relatedProducts.length}</Badge></div>
              <div>新聞：<Badge variant="outline">{data.relatedNews.length}</Badge></div>
            </div>
          </FormSection>
        </>
      }
    >
      <FormSection title="策展內容">
        <FormField label="標題" required><Input value={data.title} onChange={(e) => set("title", e.target.value)} required /></FormField>
        <FormField label="副標題"><Input value={data.subtitle ?? ""} onChange={(e) => set("subtitle", e.target.value)} /></FormField>
        <FormField label="類別">
          <select value={data.category} onChange={(e) => set("category", e.target.value as (typeof CATEGORIES)[number])} className="h-10 w-full rounded-lg border border-border bg-bg-elevated px-3 text-sm">
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </FormField>
        <FormField label="摘要"><Textarea value={data.summary} onChange={(e) => set("summary", e.target.value)} /></FormField>
        <FormField label="標籤"><Input value={data.tags.join(", ")} onChange={(e) => set("tags", e.target.value.split(/[,，、]/).map(s => s.trim()).filter(Boolean))} /></FormField>
      </FormSection>

      <FormSection title="內文段落" description={`目前 ${data.body.length} 段內容`}>
        {data.body.map((b, i) => (
          <div key={i} className="card p-3 bg-bg-base">
            <div className="text-xs text-text-muted mb-1">{b.type === "paragraph" ? "段落" : b.type === "image" ? "圖片" : b.type === "quote" ? "引用" : "小標"}</div>
            <textarea
              value={b.content}
              onChange={(e) => {
                const next = [...data.body];
                next[i] = { ...next[i], content: e.target.value };
                set("body", next);
              }}
              className="w-full bg-transparent text-sm text-text-primary focus:outline-none resize-y min-h-[60px]"
            />
          </div>
        ))}
      </FormSection>
    </EntityForm>
  );
}
