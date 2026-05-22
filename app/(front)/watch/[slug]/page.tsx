"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Play, Heart, Share2, ChevronRight, Subtitles, Eye } from "lucide-react";
import { useContent } from "@/lib/store/content";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CardVideo } from "@/components/ui/card-video";
import { formatNumber } from "@/lib/utils";

export default function WatchDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const videos = useContent((s) => s.videos);
  const video = videos.find((v) => v.slug === slug);

  if (!video) {
    notFound();
  }

  const moreToWatch = videos
    .filter(
      (v) =>
        v.id !== video.id && (v.category === video.category || v.tags.some((t) => video.tags.includes(t))),
    )
    .slice(0, 4);

  return (
    <>
      {/* Hero with mock player */}
      <section className="relative bg-bg-deep">
        <div className="relative aspect-video lg:aspect-[21/9] max-h-[68vh] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={video.hero} alt={video.title} className="size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/30 to-transparent" />
          <button
            type="button"
            aria-label="播放預覽"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-16 lg:size-24 rounded-full bg-accent text-text-inverse flex items-center justify-center shadow-[0_0_60px_-12px_rgba(0,255,148,0.6)] hover:scale-105 transition-transform"
          >
            <Play className="size-7 lg:size-10 ml-1" fill="currentColor" />
          </button>
        </div>
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12 -mt-24 lg:-mt-32 relative z-10 pb-8">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="default">{video.category}</Badge>
              {video.year && <Badge variant="outline">{video.year}</Badge>}
              {video.rating && <Badge variant="muted">{video.rating}</Badge>}
              {video.paywall === "subscriber" && <Badge variant="warm">會員訂閱</Badge>}
              {video.paywall === "paid" && <Badge variant="warning">付費 NT${video.price}</Badge>}
            </div>
            <h1 className="font-display text-3xl lg:text-5xl font-black tracking-tight text-text-primary leading-tight">
              {video.title}
            </h1>
            {video.titleEn && (
              <p className="mt-1 text-text-muted text-sm lg:text-base uppercase tracking-wider">{video.titleEn}</p>
            )}
            <p className="mt-4 text-text-secondary text-sm lg:text-base max-w-2xl">{video.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button size="lg">
                <Play className="size-4" fill="currentColor" /> 立即播放
              </Button>
              <Button size="lg" variant="secondary">
                <Heart className="size-4" /> 加入我的清單
              </Button>
              <Button size="lg" variant="ghost">
                <Share2 className="size-4" /> 分享
              </Button>
            </div>
            <div className="mt-4 flex items-center gap-4 text-xs text-text-muted">
              <span className="inline-flex items-center gap-1">
                <Eye className="size-3" /> {formatNumber(video.viewCount)} 次觀看
              </span>
              <span className="inline-flex items-center gap-1">
                <Subtitles className="size-3" /> {video.subtitles.join(" / ")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs: 集數 / 資訊 */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12 py-10 lg:py-14 grid lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-8">
          <div className="section-title text-xs">EPISODES</div>
          <h2 className="mt-2 font-display text-2xl lg:text-3xl font-extrabold text-text-primary">
            全 {video.episodeCount} 集
          </h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            {Array.from({ length: Math.min(video.episodeCount, 8) }).map((_, i) => (
              <Link
                key={i}
                href="#"
                className="group card overflow-hidden flex items-center gap-3 p-3 hover:border-accent transition-colors"
              >
                <div className="relative w-24 sm:w-28 aspect-video shrink-0 overflow-hidden rounded-lg bg-bg-deep">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://picsum.photos/seed/${video.slug}-ep${i + 1}/600/400`}
                    alt={`第 ${i + 1} 集`}
                    className="size-full object-cover"
                  />
                  <div className="absolute inset-0 bg-bg-deep/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="size-5 text-accent" fill="currentColor" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-text-muted">第 {i + 1} 集</div>
                  <div className="mt-1 font-semibold text-text-primary text-sm line-clamp-2 group-hover:text-accent">
                    {video.title} EP{i + 1}
                  </div>
                  <div className="mt-1 text-xs text-text-muted">{video.duration}</div>
                </div>
              </Link>
            ))}
          </div>
          {video.episodeCount > 8 && (
            <div className="mt-4 text-center">
              <Button variant="secondary">查看全部 {video.episodeCount} 集</Button>
            </div>
          )}
        </div>

        <aside className="lg:col-span-4">
          <div className="section-title text-xs">INFORMATION</div>
          <div className="mt-2 card p-5 space-y-4">
            {video.director && (
              <InfoRow label="導演" value={video.director} />
            )}
            {video.cast && video.cast.length > 0 && (
              <InfoRow label="主演" value={video.cast.join("、")} />
            )}
            <InfoRow label="年份" value={String(video.year)} />
            <InfoRow label="集數" value={`${video.episodeCount} 集`} />
            <InfoRow label="時長" value={video.duration} />
            <InfoRow label="字幕" value={video.subtitles.join(" / ")} />
            <div className="pt-2 border-t border-border">
              <div className="text-xs text-text-muted mb-2">標籤</div>
              <div className="flex flex-wrap gap-1.5">
                {video.tags.map((t) => (
                  <Link
                    key={t}
                    href={`/search?q=${encodeURIComponent(t)}`}
                    className="text-xs px-2.5 py-1 rounded-full bg-bg-elevated border border-border text-text-secondary hover:border-accent hover:text-accent"
                  >
                    #{t}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </section>

      {/* More to watch */}
      {moreToWatch.length > 0 && (
        <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12 pb-12 lg:pb-16">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="section-title text-xs">MORE TO WATCH</div>
              <h2 className="mt-2 font-display text-2xl lg:text-3xl font-extrabold text-text-primary">
                你可能也會喜歡
              </h2>
            </div>
            <Link href="/watch" className="text-sm text-text-secondary hover:text-accent inline-flex items-center gap-1">
              更多節目 <ChevronRight className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5">
            {moreToWatch.map((v) => (
              <CardVideo key={v.id} video={v} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-text-muted">{label}</div>
      <div className="mt-1 text-sm text-text-primary">{value}</div>
    </div>
  );
}
