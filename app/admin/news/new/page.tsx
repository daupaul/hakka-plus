"use client";

import { useState } from "react";
import { useContent } from "@/lib/store/content";
import { EntityForm, FormSection, FormField } from "@/components/admin/entity-form";
import { Input, Textarea } from "@/components/ui/input";
import { slugify } from "@/lib/utils";

const CATEGORIES = ["即時", "客家文化", "客語教育", "生活", "政策"] as const;

export default function NewNewsPage() {
  const createNews = useContent((s) => s.createNews);
  const [data, setData] = useState({
    title: "",
    subtitle: "",
    category: "客家文化" as (typeof CATEGORIES)[number],
    excerpt: "",
    body: "",
    author: "",
    image: "",
    tags: "",
    featured: false,
  });

  const set = <K extends keyof typeof data>(k: K, v: (typeof data)[K]) => setData((d) => ({ ...d, [k]: v }));

  return (
    <EntityForm
      isNew
      title="新增新聞"
      backHref="/admin/news"
      onSave={() => {
        if (!data.title) return false;
        const slug = slugify(data.title);
        createNews({
          slug,
          title: data.title,
          subtitle: data.subtitle || undefined,
          category: data.category,
          excerpt: data.excerpt,
          body: data.body || data.excerpt,
          author: data.author || "客家電視台編輯室",
          image: data.image || `https://picsum.photos/seed/${slug}/1600/900`,
          publishedAt: new Date().toISOString(),
          tags: data.tags ? data.tags.split(/[,，、]/).map(s => s.trim()).filter(Boolean) : [],
          status: "draft",
          source: "manual",
          featured: data.featured,
          viewCount: 0,
          commentEnabled: true,
        });
        return true;
      }}
      sidebar={
        <>
          <FormSection title="發布設定">
            <FormField label="編輯精選">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={data.featured} onChange={(e) => set("featured", e.target.checked)} className="size-4" />
                <span className="text-sm text-text-secondary">列為今日重點</span>
              </label>
            </FormField>
          </FormSection>
          <FormSection title="主圖">
            <FormField label="封面圖 URL"><Input value={data.image} onChange={(e) => set("image", e.target.value)} /></FormField>
          </FormSection>
        </>
      }
    >
      <FormSection title="新聞內容">
        <FormField label="標題" required><Input value={data.title} onChange={(e) => set("title", e.target.value)} required /></FormField>
        <FormField label="副標題"><Input value={data.subtitle} onChange={(e) => set("subtitle", e.target.value)} /></FormField>
        <FormField label="類別">
          <select value={data.category} onChange={(e) => set("category", e.target.value as (typeof CATEGORIES)[number])} className="h-10 w-full rounded-lg border border-border bg-bg-elevated px-3 text-sm">
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </FormField>
        <FormField label="記者署名"><Input value={data.author} onChange={(e) => set("author", e.target.value)} /></FormField>
        <FormField label="摘要" required><Textarea value={data.excerpt} onChange={(e) => set("excerpt", e.target.value)} required /></FormField>
        <FormField label="內文（支援 Markdown）" hint="可使用 **粗體**、*斜體*、## 標題">
          <Textarea className="min-h-[280px] font-mono text-xs" value={data.body} onChange={(e) => set("body", e.target.value)} />
        </FormField>
        <FormField label="標籤"><Input value={data.tags} onChange={(e) => set("tags", e.target.value)} placeholder="義民, 新竹, 節慶" /></FormField>
      </FormSection>
    </EntityForm>
  );
}
