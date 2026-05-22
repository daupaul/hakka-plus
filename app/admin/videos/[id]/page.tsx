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

const CATEGORIES = ["戲劇", "紀錄片", "綜藝", "兒少", "電影", "短影音"] as const;

export default function EditVideoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const videos = useContent((s) => s.videos);
  const updateVideo = useContent((s) => s.updateVideo);
  const deleteVideo = useContent((s) => s.deleteVideo);
  const publishVideo = useContent((s) => s.publishVideo);
  const toast = useUi((s) => s.toast);

  const video = videos.find((v) => v.id === id);
  const [data, setData] = useState(video);

  useEffect(() => setData(video), [video]);

  if (!video || !data) {
    if (videos.length > 0) notFound();
    return <div className="text-text-muted">Loading…</div>;
  }

  const set = <K extends keyof typeof data>(key: K, value: (typeof data)[K]) => setData((d) => d ? { ...d, [key]: value } : d);

  return (
    <EntityForm
      title={`編輯：${video.title}`}
      backHref="/admin/videos"
      onSave={() => {
        if (data) updateVideo(id, data);
      }}
      onDelete={() => deleteVideo(id)}
      sidebar={
        <>
          <FormSection title="發布狀態">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={data.status === "published" ? "success" : data.status === "draft" ? "muted" : "outline"}>
                {data.status === "published" ? "已發布" : data.status === "draft" ? "草稿" : data.status === "review" ? "審核中" : "已下架"}
              </Badge>
            </div>
            <FormField label="狀態">
              <select
                value={data.status}
                onChange={(e) => set("status", e.target.value as typeof data.status)}
                className="h-10 w-full rounded-lg border border-border bg-bg-elevated px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="draft">草稿</option>
                <option value="review">審核中</option>
                <option value="published">已發布</option>
                <option value="archived">已下架</option>
              </select>
            </FormField>
            <Button
              type="button"
              variant="primary"
              className="w-full"
              onClick={() => {
                publishVideo(id);
                toast({ variant: "success", title: "已發布", description: video.title });
              }}
            >立即發布</Button>
            <Link href={`/watch/${video.slug}`} target="_blank" className="text-sm text-accent inline-flex items-center gap-1.5 hover:underline">
              <Eye className="size-3.5" /> 前台預覽
            </Link>
          </FormSection>

          <FormSection title="統計">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Stat label="觀看" value={video.viewCount.toLocaleString()} />
              <Stat label="按讚" value={video.likeCount.toLocaleString()} />
              <Stat label="評分" value={video.rating ?? "—"} />
              <Stat label="集數" value={`${video.episodeCount} 集`} />
            </div>
          </FormSection>

          <FormSection title="影音檔案">
            <FormField label="封面海報"><Input value={data.poster} onChange={(e) => set("poster", e.target.value)} /></FormField>
            <FormField label="主視覺"><Input value={data.hero} onChange={(e) => set("hero", e.target.value)} /></FormField>
            <div className="aspect-video bg-bg-deep rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.hero} alt="hero preview" className="size-full object-cover" />
            </div>
          </FormSection>
        </>
      }
    >
      <FormSection title="基本資訊">
        <FormField label="節目名稱" required>
          <Input value={data.title} onChange={(e) => set("title", e.target.value)} required />
        </FormField>
        <FormField label="英文名稱">
          <Input value={data.titleEn ?? ""} onChange={(e) => set("titleEn", e.target.value)} />
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
        <FormField label="簡介">
          <Textarea value={data.description} onChange={(e) => set("description", e.target.value)} />
        </FormField>
      </FormSection>

      <FormSection title="製作資訊">
        <FormField label="導演"><Input value={data.director ?? ""} onChange={(e) => set("director", e.target.value)} /></FormField>
        <FormField label="主演" hint="用逗號分隔">
          <Input
            value={(data.cast ?? []).join(", ")}
            onChange={(e) => set("cast", e.target.value.split(/[,，、]/).map((s) => s.trim()).filter(Boolean))}
          />
        </FormField>
        <div className="grid sm:grid-cols-3 gap-4">
          <FormField label="年份"><Input type="number" value={data.year} onChange={(e) => set("year", Number(e.target.value))} /></FormField>
          <FormField label="集數"><Input type="number" value={data.episodeCount} onChange={(e) => set("episodeCount", Number(e.target.value))} /></FormField>
          <FormField label="時長"><Input value={data.duration} onChange={(e) => set("duration", e.target.value)} /></FormField>
        </div>
        <FormField label="字幕"><Input value={data.subtitles.join(", ")} onChange={(e) => set("subtitles", e.target.value.split(/[,，、]/).map(s => s.trim()).filter(Boolean))} /></FormField>
        <FormField label="標籤"><Input value={data.tags.join(", ")} onChange={(e) => set("tags", e.target.value.split(/[,，、]/).map(s => s.trim()).filter(Boolean))} /></FormField>
      </FormSection>

      <FormSection title="付費設定">
        <div className="grid sm:grid-cols-2 gap-4">
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
            <FormField label="售價 (NT$)"><Input type="number" value={data.price ?? 0} onChange={(e) => set("price", Number(e.target.value))} /></FormField>
          )}
        </div>
      </FormSection>
    </EntityForm>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-text-muted">{label}</div>
      <div className="mt-0.5 font-display font-bold text-text-primary">{value}</div>
    </div>
  );
}
