"use client";

import { use, useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useContent } from "@/lib/store/content";
import { useUi } from "@/lib/store/ui";
import { EntityForm, FormSection, FormField } from "@/components/admin/entity-form";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

const CATEGORIES = ["即時", "客家文化", "客語教育", "生活", "政策"] as const;

export default function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const news = useContent((s) => s.news);
  const updateNews = useContent((s) => s.updateNews);
  const deleteNews = useContent((s) => s.deleteNews);
  const publishNews = useContent((s) => s.publishNews);
  const toast = useUi((s) => s.toast);

  const item = news.find((n) => n.id === id);
  const [data, setData] = useState(item);
  useEffect(() => setData(item), [item]);

  if (!item || !data) {
    if (news.length > 0) notFound();
    return <div className="text-text-muted">Loading…</div>;
  }

  const set = <K extends keyof typeof data>(k: K, v: (typeof data)[K]) => setData((d) => d ? { ...d, [k]: v } : d);

  return (
    <EntityForm
      title={`編輯：${item.title}`}
      backHref="/admin/news"
      onSave={() => { if (data) updateNews(id, data); }}
      onDelete={() => deleteNews(id)}
      sidebar={
        <>
          <FormSection title="發布狀態">
            <div className="mb-3">
              <Badge variant={data.status === "published" ? "success" : data.status === "draft" ? "muted" : "warning"}>
                {data.status === "published" ? "已發布" : data.status === "draft" ? "草稿" : data.status === "review" ? "審核中" : "已下架"}
              </Badge>
            </div>
            <FormField label="狀態">
              <select value={data.status} onChange={(e) => set("status", e.target.value as typeof data.status)} className="h-10 w-full rounded-lg border border-border bg-bg-elevated px-3 text-sm">
                <option value="draft">草稿</option>
                <option value="review">審核中</option>
                <option value="published">已發布</option>
                <option value="archived">已下架</option>
              </select>
            </FormField>
            <Button type="button" className="w-full" onClick={() => { publishNews(id); toast({ variant: "success", title: "已發布" }); }}>立即發布</Button>
            <Link href={`/news/${item.slug}`} target="_blank" className="text-sm text-accent inline-flex items-center gap-1.5 hover:underline">
              <Eye className="size-3.5" /> 前台預覽
            </Link>
          </FormSection>
          <FormSection title="新聞屬性">
            <FormField label="編輯精選">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={data.featured} onChange={(e) => set("featured", e.target.checked)} className="size-4" />
                <span className="text-sm">列為頭條</span>
              </label>
            </FormField>
            <FormField label="開放評論">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={data.commentEnabled} onChange={(e) => set("commentEnabled", e.target.checked)} className="size-4" />
                <span className="text-sm">允許讀者留言</span>
              </label>
            </FormField>
            <FormField label="來源">
              <select value={data.source} onChange={(e) => set("source", e.target.value as typeof data.source)} className="h-10 w-full rounded-lg border border-border bg-bg-elevated px-3 text-sm">
                <option value="manual">編輯撰寫</option>
                <option value="inews">iNews 匯入</option>
              </select>
            </FormField>
          </FormSection>
          <FormSection title="主圖">
            <FormField label="封面"><Input value={data.image} onChange={(e) => set("image", e.target.value)} /></FormField>
            <div className="aspect-video bg-bg-deep rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.image} alt="preview" className="size-full object-cover" />
            </div>
          </FormSection>
        </>
      }
    >
      <FormSection title="新聞內容">
        <FormField label="標題" required><Input value={data.title} onChange={(e) => set("title", e.target.value)} required /></FormField>
        <FormField label="副標題"><Input value={data.subtitle ?? ""} onChange={(e) => set("subtitle", e.target.value)} /></FormField>
        <FormField label="類別">
          <select value={data.category} onChange={(e) => set("category", e.target.value as (typeof CATEGORIES)[number])} className="h-10 w-full rounded-lg border border-border bg-bg-elevated px-3 text-sm">
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </FormField>
        <FormField label="記者署名"><Input value={data.author ?? ""} onChange={(e) => set("author", e.target.value)} /></FormField>
        <FormField label="摘要"><Textarea value={data.excerpt} onChange={(e) => set("excerpt", e.target.value)} /></FormField>
        <FormField label="內文 (Markdown)"><Textarea className="min-h-[280px] font-mono text-xs" value={data.body} onChange={(e) => set("body", e.target.value)} /></FormField>
        <FormField label="標籤"><Input value={data.tags.join(", ")} onChange={(e) => set("tags", e.target.value.split(/[,，、]/).map(s => s.trim()).filter(Boolean))} /></FormField>
      </FormSection>
    </EntityForm>
  );
}
