"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { Bell, Users, Share2 } from "lucide-react";
import { useContent } from "@/lib/store/content";
import { useUi } from "@/lib/store/ui";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CardVideo } from "@/components/ui/card-video";
import { CardArticle } from "@/components/ui/card-article";
import { formatNumber } from "@/lib/utils";

export default function ThemeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const themes = useContent((s) => s.themes);
  const videos = useContent((s) => s.videos);
  const news = useContent((s) => s.news);
  const toast = useUi((s) => s.toast);

  const theme = themes.find((t) => t.slug === slug);
  if (!theme) notFound();

  // Match videos/news whose tags overlap with theme.tagIds (we treat tagIds loosely)
  const matchedVideos = videos.filter((v) => v.tags.some((tag) => theme.tagIds.some((tid) => tid.includes(tag) || tag.includes(tid.replace("tag-", ""))))).slice(0, 8);
  const matchedNews = news.filter((n) => n.tags.some((tag) => theme.tagIds.some((tid) => tid.includes(tag) || tag.includes(tid.replace("tag-", ""))))).slice(0, 6);

  return (
    <>
      <section className="relative">
        <div className="relative aspect-[21/9] max-h-[50vh] overflow-hidden bg-bg-deep">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={theme.cover} alt={theme.name} className="size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/30 to-transparent" />
        </div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 -mt-24 lg:-mt-32 relative z-10 pb-8">
          <Badge variant="warm">主題訂閱</Badge>
          <h1 className="mt-3 font-display text-3xl lg:text-5xl font-black tracking-tight text-text-primary">
            {theme.name}
          </h1>
          <p className="mt-3 text-text-secondary text-base lg:text-lg max-w-2xl">{theme.description}</p>
          <div className="mt-5 inline-flex items-center gap-2 text-sm text-text-muted">
            <Users className="size-4" /> {formatNumber(theme.subscriberCount)} 位訂閱者
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button size="lg" onClick={() => toast({ variant: "success", title: `已訂閱「${theme.name}」` })}>
              <Bell className="size-4" /> 訂閱主題
            </Button>
            <Button size="lg" variant="ghost"><Share2 className="size-4" /> 分享</Button>
          </div>
        </div>
      </section>

      {matchedVideos.length > 0 && (
        <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12 py-10">
          <h2 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary mb-4">相關影視</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5">
            {matchedVideos.map((v) => <CardVideo key={v.id} video={v} />)}
          </div>
        </section>
      )}

      {matchedNews.length > 0 && (
        <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12 py-10">
          <h2 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary mb-4">相關新聞</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5">
            {matchedNews.map((n) => <CardArticle key={n.id} item={n} variant="compact" />)}
          </div>
        </section>
      )}
    </>
  );
}
