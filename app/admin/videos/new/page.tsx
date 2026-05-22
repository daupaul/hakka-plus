"use client";

import { useState } from "react";
import { useContent } from "@/lib/store/content";
import { EntityForm, FormSection, FormField } from "@/components/admin/entity-form";
import { Input, Textarea } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { slugify } from "@/lib/utils";

const CATEGORIES = ["戲劇", "紀錄片", "綜藝", "兒少", "電影", "短影音"] as const;

export default function NewVideoPage() {
  const createVideo = useContent((s) => s.createVideo);
  const [data, setData] = useState({
    title: "",
    titleEn: "",
    category: "戲劇" as (typeof CATEGORIES)[number],
    description: "",
    director: "",
    cast: "",
    year: new Date().getFullYear(),
    episodeCount: 1,
    duration: "45:00",
    subtitles: "繁中,客語",
    paywall: "free" as "free" | "subscriber" | "paid",
    price: 0,
    tags: "",
    poster: "",
    hero: "",
  });

  const set = <K extends keyof typeof data>(key: K, value: (typeof data)[K]) => setData((d) => ({ ...d, [key]: value }));

  return (
    <EntityForm
      isNew
      title="新增節目"
      backHref="/admin/videos"
      saveLabel="建立節目"
      onSave={() => {
        if (!data.title) return false;
        const slug = slugify(data.titleEn || data.title);
        createVideo({
          slug,
          title: data.title,
          titleEn: data.titleEn || undefined,
          category: data.category,
          description: data.description,
          director: data.director || undefined,
          cast: data.cast ? data.cast.split(/[,，、]/).map((s) => s.trim()).filter(Boolean) : undefined,
          year: data.year,
          episodeCount: data.episodeCount,
          duration: data.duration,
          subtitles: data.subtitles.split(/[,，、]/).map((s) => s.trim()).filter(Boolean),
          paywall: data.paywall,
          price: data.paywall === "paid" ? data.price : undefined,
          tags: data.tags ? data.tags.split(/[,，、]/).map((s) => s.trim()).filter(Boolean) : [],
          poster: data.poster || `https://picsum.photos/seed/${slug}-poster/800/1200`,
          hero: data.hero || `https://picsum.photos/seed/${slug}-hero/1920/1080`,
          publishedAt: new Date().toISOString(),
          status: "draft",
          viewCount: 0,
          likeCount: 0,
        });
        return true;
      }}
      sidebar={
        <>
          <FormSection title="發布設定">
            <FormField label="付費方式">
              <select
                value={data.paywall}
                onChange={(e) => set("paywall", e.target.value as typeof data.paywall)}
                className="h-10 w-full rounded-lg border border-border bg-bg-elevated px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="free">免費</option>
                <option value="subscriber">會員訂閱</option>
                <option value="paid">單片付費</option>
              </select>
            </FormField>
            {data.paywall === "paid" && (
              <FormField label="單片售價 (NT$)">
                <Input type="number" value={data.price} onChange={(e) => set("price", Number(e.target.value))} />
              </FormField>
            )}
          </FormSection>
          <FormSection title="影音檔案">
            <FormField label="封面海報 URL" hint="留空使用隨機封面">
              <Input value={data.poster} onChange={(e) => set("poster", e.target.value)} placeholder="https://..." />
            </FormField>
            <FormField label="主視覺 URL" hint="留空使用隨機">
              <Input value={data.hero} onChange={(e) => set("hero", e.target.value)} placeholder="https://..." />
            </FormField>
            <Badge variant="warning">POC 不真實處理影片轉碼</Badge>
          </FormSection>
        </>
      }
    >
      <FormSection title="基本資訊">
        <FormField label="節目名稱" required>
          <Input value={data.title} onChange={(e) => set("title", e.target.value)} required />
        </FormField>
        <FormField label="英文名稱">
          <Input value={data.titleEn} onChange={(e) => set("titleEn", e.target.value)} />
        </FormField>
        <FormField label="類別">
          <select
            value={data.category}
            onChange={(e) => set("category", e.target.value as (typeof CATEGORIES)[number])}
            className="h-10 w-full rounded-lg border border-border bg-bg-elevated px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </FormField>
        <FormField label="節目簡介" required>
          <Textarea value={data.description} onChange={(e) => set("description", e.target.value)} required />
        </FormField>
      </FormSection>

      <FormSection title="製作資訊">
        <FormField label="導演">
          <Input value={data.director} onChange={(e) => set("director", e.target.value)} />
        </FormField>
        <FormField label="主演" hint="用逗號分隔">
          <Input value={data.cast} onChange={(e) => set("cast", e.target.value)} placeholder="演員一, 演員二, 演員三" />
        </FormField>
        <div className="grid sm:grid-cols-3 gap-4">
          <FormField label="年份"><Input type="number" value={data.year} onChange={(e) => set("year", Number(e.target.value))} /></FormField>
          <FormField label="集數"><Input type="number" value={data.episodeCount} onChange={(e) => set("episodeCount", Number(e.target.value))} /></FormField>
          <FormField label="每集時長" hint="例：47:30"><Input value={data.duration} onChange={(e) => set("duration", e.target.value)} /></FormField>
        </div>
        <FormField label="字幕語言" hint="用逗號分隔">
          <Input value={data.subtitles} onChange={(e) => set("subtitles", e.target.value)} />
        </FormField>
        <FormField label="標籤" hint="用逗號分隔，用於內容宇宙關聯">
          <Input value={data.tags} onChange={(e) => set("tags", e.target.value)} placeholder="茶, 美濃, 紀實" />
        </FormField>
      </FormSection>
    </EntityForm>
  );
}
