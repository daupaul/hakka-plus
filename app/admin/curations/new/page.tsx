"use client";

import { useState } from "react";
import { useContent } from "@/lib/store/content";
import { EntityForm, FormSection, FormField } from "@/components/admin/entity-form";
import { Input, Textarea } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { slugify } from "@/lib/utils";

const CATEGORIES = ["旅遊", "選物", "節慶", "工藝", "飲食"] as const;

export default function NewCurationPage() {
  const createCuration = useContent((s) => s.createCuration);
  const [data, setData] = useState({
    title: "",
    subtitle: "",
    category: "旅遊" as (typeof CATEGORIES)[number],
    summary: "",
    bodyText: "",
    cover: "",
    tags: "",
  });

  const set = <K extends keyof typeof data>(k: K, v: (typeof data)[K]) => setData((d) => ({ ...d, [k]: v }));

  return (
    <EntityForm
      isNew
      title="新增策展"
      backHref="/admin/curations"
      onSave={() => {
        if (!data.title) return false;
        const slug = slugify(data.title);
        createCuration({
          slug,
          title: data.title,
          subtitle: data.subtitle || undefined,
          category: data.category,
          cover: data.cover || `https://picsum.photos/seed/${slug}/1600/900`,
          summary: data.summary,
          body: data.bodyText.split("\n\n").map((p) => ({ type: "paragraph" as const, content: p.trim() })).filter((p) => p.content),
          relatedVideos: [], relatedProducts: [], relatedNews: [],
          tags: data.tags ? data.tags.split(/[,，、]/).map((s) => s.trim()).filter(Boolean) : [],
          publishedAt: new Date().toISOString(),
          status: "draft",
          viewCount: 0,
        });
        return true;
      }}
      sidebar={
        <>
          <FormSection title="主圖">
            <FormField label="封面 URL"><Input value={data.cover} onChange={(e) => set("cover", e.target.value)} /></FormField>
          </FormSection>
          <FormSection title="關聯">
            <Badge variant="warning">編輯後可在編輯頁設定關聯影視 / 商品 / 新聞</Badge>
          </FormSection>
        </>
      }
    >
      <FormSection title="策展內容">
        <FormField label="標題" required><Input value={data.title} onChange={(e) => set("title", e.target.value)} required /></FormField>
        <FormField label="副標題"><Input value={data.subtitle} onChange={(e) => set("subtitle", e.target.value)} /></FormField>
        <FormField label="類別">
          <select value={data.category} onChange={(e) => set("category", e.target.value as (typeof CATEGORIES)[number])} className="h-10 w-full rounded-lg border border-border bg-bg-elevated px-3 text-sm">
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </FormField>
        <FormField label="摘要" required><Textarea value={data.summary} onChange={(e) => set("summary", e.target.value)} required /></FormField>
        <FormField label="內文" hint="段落以空行分隔">
          <Textarea className="min-h-[280px]" value={data.bodyText} onChange={(e) => set("bodyText", e.target.value)} placeholder="第一段內容..." />
        </FormField>
        <FormField label="標籤"><Input value={data.tags} onChange={(e) => set("tags", e.target.value)} /></FormField>
      </FormSection>
    </EntityForm>
  );
}
