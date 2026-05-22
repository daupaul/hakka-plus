"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Play, Plus, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import { useContent } from "@/lib/store/content";
import { Badge } from "@/components/ui/badge";
import { CardVideo } from "@/components/ui/card-video";

export default function WatchDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const videos = useContent((s) => s.videos);
  const video = videos.find((v) => v.slug === slug);
  if (!video) notFound();

  const moreToWatch = videos
    .filter((v) => v.id !== video.id && (v.category === video.category || v.tags.some((t) => video.tags.includes(t))))
    .slice(0, 5);
  const allSiblings = videos.filter((v) => v.id !== video.id).slice(0, 6);
  const specials = videos.filter((v) => v.featured && v.id !== video.id).slice(0, 4);

  return (
    <>
      {/* Hero with mock player */}
      <section className="relative">
        <div className="relative aspect-video lg:aspect-[21/9] max-h-[68vh] overflow-hidden bg-bg-deep">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={video.hero} alt={video.title} className="size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/20 to-transparent" />
          <button type="button" aria-label="播放預覽" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-16 lg:size-20 rounded-full bg-accent text-text-inverse flex items-center justify-center shadow-[0_0_60px_-12px_var(--color-accent)] hover:scale-105 transition-transform">
            <Play className="size-6 lg:size-8 ml-1" fill="currentColor" />
          </button>
        </div>

        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12 -mt-20 lg:-mt-32 relative z-10 pb-8">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div className="max-w-3xl">
              <Badge variant="warm">{video.category}</Badge>
              <h1 className="mt-3 font-display text-3xl lg:text-5xl font-black tracking-tight text-text-primary leading-tight">
                {video.title}
              </h1>
              <div className="mt-2 flex items-center gap-3 text-sm text-text-secondary flex-wrap">
                <span className="inline-flex items-center gap-1.5"><Badge variant="default">EP{video.episodeCount}</Badge>《{video.title}》最終回</span>
                <span className="text-text-muted">{video.year} · 共 {video.episodeCount} 集</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" className="size-12 lg:size-14 rounded-full bg-accent text-text-inverse flex items-center justify-center hover:scale-105 transition-transform" aria-label="播放"><Play className="size-5 lg:size-6 ml-0.5" fill="currentColor" /></button>
              <button type="button" className="size-12 lg:size-14 rounded-full border border-border text-text-secondary hover:border-accent hover:text-accent transition-colors flex items-center justify-center" aria-label="收藏"><Plus className="size-5" /></button>
              <button type="button" className="size-12 lg:size-14 rounded-full border border-border text-text-secondary hover:border-accent hover:text-accent transition-colors flex items-center justify-center" aria-label="分享"><Share2 className="size-5" /></button>
            </div>
          </div>

          {/* Two green callout boxes side by side */}
          <div className="mt-8 lg:mt-10 grid lg:grid-cols-2 gap-3 lg:gap-5">
            <div className="card p-5 lg:p-6 bg-accent-soft border-accent/40">
              <div className="flex items-center gap-2 mb-3">
                <span className="size-5 rounded-full bg-accent inline-flex items-center justify-center"><svg className="size-3 text-text-inverse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg></span>
                <h3 className="font-display font-bold text-text-primary">本集簡介</h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {video.description}
              </p>
            </div>
            <div className="card p-5 lg:p-6 bg-accent-soft border-accent/40">
              <div className="flex items-center gap-2 mb-3">
                <span className="size-5 rounded-full bg-accent inline-flex items-center justify-center"><svg className="size-3 text-text-inverse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg></span>
                <h3 className="font-display font-bold text-text-primary">關於本劇</h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {video.year} 年播出，由 {video.director ?? "客家電視台製作團隊"} 執導，{video.cast?.slice(0, 3).join("、") ?? "客家電視台"} 領銜主演。
                共 {video.episodeCount} 集，每集 {video.duration}，是 {video.category} 類型作品。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 前導預告 row */}
      <CarouselRow title="前導預告" eyebrow="EPISODES" slugBase={video.slug} items={Array.from({ length: 4 }).map((_, i) => ({ id: `${video.id}-ep${i + 1}`, title: `EPISODE ${i + 1}`, subtitle: i === 0 ? "壓尼粒物：登島見證感" : i === 1 ? "前線預備：等候電話" : i === 2 ? "尾隘背後：暴雪的影紛舌調" : "正式啟動", image: `https://picsum.photos/seed/${video.slug}-ep${i + 1}/800/450` }))} />

      {/* 第一季 row */}
      <CarouselRow title="第一季" eyebrow="SEASON 1" slugBase={video.slug} items={Array.from({ length: 6 }).map((_, i) => ({ id: `${video.id}-s1ep${i + 1}`, title: `EPISODE ${i + 1}`, subtitle: "", image: `https://picsum.photos/seed/${video.slug}-s1ep${i + 1}/800/450` }))} highlighted={2} />

      {/* 特別企劃 row */}
      {specials.length > 0 && (
        <section className="py-8 lg:py-10">
          <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12">
            <div className="mb-6">
              <div className="section-title text-[11px] lg:text-xs">SPECIAL</div>
              <h2 className="mt-2 font-display text-xl sm:text-2xl font-extrabold text-text-primary">特別企劃</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5">
              {specials.map((v, i) => (
                <Link key={v.id} href={`/watch/${v.slug}`} className="group">
                  <div className="relative aspect-video overflow-hidden rounded-xl bg-bg-deep">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={v.hero} alt={v.title} loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="mt-2 text-xs text-text-muted">EPISODE {i + 1}</div>
                  <h3 className="text-sm font-semibold text-text-primary line-clamp-1 group-hover:text-accent">{v.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* INFORMATION section */}
      <section className="py-12 lg:py-16 bg-bg-elevated/30">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12 grid lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="section-title text-xs">INFORMATION</div>
            <h2 className="mt-2 font-display text-2xl lg:text-3xl font-extrabold text-text-primary">詳情</h2>
          </div>
          <div className="lg:col-span-8 space-y-6">
            <p className="text-base lg:text-lg text-text-primary leading-relaxed">
              {video.year} 年播出當代政治記敘語境，記者門在動盪的環境中尋求，三代政權以權謀的政、客往少年以溫情凝聚眾人，在黑暗時期間奮起。
            </p>
            <InfoBlock label="製作團隊">
              <Row k="編劇" v={video.director ?? "—"} />
              <Row k="導演" v={video.director ?? "—"} />
              <Row k="製片人" v="客家電視台" />
              <Row k="美術" v="李翊君" />
              <Row k="攝影" v="王志強" />
            </InfoBlock>
            <InfoBlock label="演員陣容">
              <Row k="主演" v={video.cast?.join("、") ?? "—"} />
              <Row k="配音" v="許冠英、王志良、何超" />
            </InfoBlock>
            <InfoBlock label="製作資訊">
              <Row k="集數" v={`${video.episodeCount} 集`} />
              <Row k="出品" v="2025-12" />
              <Row k="類型" v={video.category} />
              <Row k="字幕" v={video.subtitles.join(" / ")} />
            </InfoBlock>
          </div>
        </div>
      </section>

      {/* MORE TO WATCH */}
      {moreToWatch.length > 0 && (
        <section className="py-10 lg:py-16">
          <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12">
            <div className="flex items-end justify-between mb-6">
              <div>
                <div className="section-title text-[11px] lg:text-xs">MORE TO WATCH</div>
                <h2 className="mt-2 font-display text-2xl lg:text-3xl font-extrabold text-text-primary">延伸觀賞</h2>
              </div>
              <Link href="/watch" className="text-sm text-text-secondary hover:text-accent inline-flex items-center gap-1">更多 <ChevronRight className="size-4" /></Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-5">
              {moreToWatch.map((v) => <CardVideo key={v.id} video={v} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function CarouselRow({ title, eyebrow, items, highlighted = -1, slugBase }: {
  title: string; eyebrow: string;
  items: { id: string; title: string; subtitle: string; image: string }[];
  highlighted?: number;
  slugBase: string;
}) {
  return (
    <section className="py-8 lg:py-10">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12">
        <div className="flex items-end justify-between mb-5">
          <div>
            <div className="section-title text-[11px] lg:text-xs">{eyebrow}</div>
            <h2 className="mt-2 font-display text-xl sm:text-2xl font-extrabold text-text-primary">{title}</h2>
          </div>
          <div className="flex items-center gap-1.5">
            <button className="size-9 rounded-full border border-border text-text-secondary hover:border-accent hover:text-accent flex items-center justify-center transition-colors"><ChevronLeft className="size-4" /></button>
            <button className="size-9 rounded-full border border-border text-text-secondary hover:border-accent hover:text-accent flex items-center justify-center transition-colors"><ChevronRight className="size-4" /></button>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {items.map((it, i) => (
            <Link key={it.id} href={`/watch/${slugBase}`} className="group">
              <div className={`relative aspect-video overflow-hidden rounded-lg bg-bg-deep border-2 transition-all ${i === highlighted ? "border-accent" : "border-transparent hover:border-accent/40"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.image} alt={it.title} loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-x-2 bottom-2 text-[10px] font-mono text-text-primary bg-bg-deep/70 backdrop-blur-sm px-1.5 py-0.5 rounded inline-block w-fit">{it.title}</div>
              </div>
              {it.subtitle && <div className="mt-1.5 text-xs text-text-muted line-clamp-1">{it.subtitle}</div>}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function InfoBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="card p-5 lg:p-6 bg-bg-base">
      <div className="text-xs uppercase tracking-wider text-accent font-semibold mb-3">{label}</div>
      <dl className="space-y-2">{children}</dl>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid grid-cols-[80px_1fr] gap-3 text-sm">
      <dt className="text-text-muted">{k}</dt>
      <dd className="text-text-primary">{v}</dd>
    </div>
  );
}
