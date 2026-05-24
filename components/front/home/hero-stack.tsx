"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Play, Plus, ChevronLeft, ChevronRight, Radio } from "lucide-react";
import { useContent } from "@/lib/store/content";
import type { Video } from "@/lib/types";
import { ClockDisplay } from "@/components/ui/clock-display";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// 客語時段詞彙（設計稿明確指定）
const HAKKA_SLOTS = [
  { hour: 5, label: "朝晨", description: "客家庄的清晨從晒穀場與菜園開始。", english: "Dawn",
    /** 時段背景漸層 — 清晨柔光金黃 */
    glow: "radial-gradient(circle at 70% 30%, rgba(255,200,120,0.18), transparent 60%), linear-gradient(180deg, #1a1a14 0%, #0a0f0d 100%)",
    halo: "rgba(255,200,120,0.3)" },
  { hour: 11, label: "當晝", description: "高山雲海剛散開，午後的客庄一片靜謐。", english: "Midday",
    glow: "radial-gradient(circle at 50% 30%, rgba(180,220,255,0.12), transparent 60%), linear-gradient(180deg, #0a1922 0%, #0a0f0d 100%)",
    halo: "rgba(180,220,255,0.25)" },
  { hour: 14, label: "晝邊", description: "午後三點，伯公樹下的搖椅、阿婆的擂茶碗。", english: "Afternoon",
    glow: "radial-gradient(circle at 30% 50%, rgba(0,255,148,0.10), transparent 60%), linear-gradient(180deg, #0a1922 0%, #0a0f0d 100%)",
    halo: "rgba(0,255,148,0.2)" },
  { hour: 17, label: "暗哺", description: "夕陽剛落，客家庄的廚房升起炊煙。", english: "Dusk",
    /** 暗哺時段最有戲：橙紅落日漸層 */
    glow: "radial-gradient(circle at 80% 80%, rgba(255,120,60,0.30), transparent 50%), radial-gradient(circle at 20% 30%, rgba(220,80,40,0.20), transparent 60%), linear-gradient(180deg, #1a0d08 0%, #0a0a0d 100%)",
    halo: "rgba(255,120,60,0.4)" },
  { hour: 20, label: "暗夜", description: "晚飯後的客家八音、慢轉的廣播、漸暗的廳堂。", english: "Night",
    glow: "radial-gradient(circle at 50% 20%, rgba(120,80,180,0.18), transparent 60%), linear-gradient(180deg, #0d0a18 0%, #060906 100%)",
    halo: "rgba(120,80,180,0.3)" },
  { hour: 23, label: "夜深", description: "客庄最寂靜的時刻，伯公樹下、田埂遠處的犬吠。", english: "Late Night",
    glow: "radial-gradient(circle at 50% 40%, rgba(40,60,90,0.20), transparent 60%), linear-gradient(180deg, #060c12 0%, #060906 100%)",
    halo: "rgba(40,60,90,0.25)" },
];

function currentSlotLabel(hour: number) {
  if (hour >= 5 && hour < 11) return HAKKA_SLOTS[0];
  if (hour >= 11 && hour < 14) return HAKKA_SLOTS[1];
  if (hour >= 14 && hour < 17) return HAKKA_SLOTS[2];
  if (hour >= 17 && hour < 20) return HAKKA_SLOTS[3];
  if (hour >= 20 && hour < 23) return HAKKA_SLOTS[4];
  return HAKKA_SLOTS[5];
}

export function HeroStack() {
  const videos = useContent((s) => s.videos);
  const featured = videos.filter((v) => v.featured).slice(0, 3);
  const stackList = videos.slice(3, 8);

  const [time, setTime] = useState({ hhmm: "12:24", ss: "00", date: "5月 22 日" });
  const [now, setNow] = useState<Date>(new Date(2026, 4, 24, 12, 24, 0));

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setNow(d);
      setTime({
        hhmm: `${pad(d.getHours())}:${pad(d.getMinutes())}`,
        ss: pad(d.getSeconds()),
        date: `${d.getMonth() + 1}月 ${d.getDate()} 日`,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const slot = currentSlotLabel(now.getHours());

  if (featured.length === 0) return null;

  const [left, center, right] = [
    featured[0],
    featured[1] ?? featured[0],
    featured[2] ?? featured[0],
  ];

  return (
    <section className="relative pt-4 sm:pt-8 lg:pt-12 pb-10 lg:pb-14">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12">
        {/* === HERO 3-card carousel === */}
        <div className="relative">
          {/* Desktop: 3 cards horizontal with center prominent */}
          <div className="hidden sm:grid grid-cols-[1fr_1.8fr_1fr] lg:grid-cols-[1fr_2fr_1fr] gap-2 lg:gap-4 items-center">
            <HeroSideCard video={left} side="left" />
            <HeroCenterCard video={center} />
            <HeroSideCard video={right} side="right" />
          </div>

          {/* Mobile: single card */}
          <div className="sm:hidden max-w-sm mx-auto">
            <HeroCenterCard video={center} />
          </div>

          {/* Metadata row under center card (mockup: date + live indicator + 收藏) */}
          <div className="mt-3 lg:mt-4 grid grid-cols-1 sm:grid-cols-[1fr_1.8fr_1fr] lg:grid-cols-[1fr_2fr_1fr] gap-2 lg:gap-4">
            <div className="hidden sm:block" />
            <div className="flex items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs lg:text-sm text-text-secondary flex-wrap">
              <span className="text-text-muted">{time.date}</span>
              <span className="opacity-30">/</span>
              <span className="text-text-muted">{slot.label}</span>
              <span className="opacity-30">/</span>
              <span className="font-mono text-text-primary">GMT+8 {time.hhmm}:{time.ss}</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/15 text-accent ml-1">
                <Radio className="size-2.5 animate-pulse" />
                <span className="text-[10px] font-bold">LIVE</span>
              </span>
            </div>
            <div className="hidden sm:block" />
          </div>

          {/* Carousel arrows — only visible on desktop */}
          <button className="hidden lg:flex absolute -left-2 top-1/2 -translate-y-1/2 size-10 rounded-full bg-bg-elevated/80 backdrop-blur-md border border-border text-text-secondary hover:text-accent hover:border-accent items-center justify-center transition-colors">
            <ChevronLeft className="size-5" />
          </button>
          <button className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 size-10 rounded-full bg-bg-elevated/80 backdrop-blur-md border border-border text-text-secondary hover:text-accent hover:border-accent items-center justify-center transition-colors">
            <ChevronRight className="size-5" />
          </button>
        </div>

        {/* === 24hr Clock band: separate dark gradient card with time-of-day mood === */}
        <motion.div
          key={slot.label}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          className="mt-10 lg:mt-14 relative overflow-hidden rounded-2xl lg:rounded-3xl border border-border-strong"
        >
          {/* Time-of-day mood gradient — changes with slot */}
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-1000"
            style={{ background: slot.glow }}
          />
          {/* Subtle horizon line at the bottom (cinematic) */}
          <div
            className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
            style={{ background: `linear-gradient(to top, ${slot.halo}, transparent)` }}
          />

          <div className="relative grid lg:grid-cols-12 gap-6 lg:gap-8 p-6 sm:p-8 lg:p-12">
            {/* Left: big clock */}
            <div className="lg:col-span-7">
              <div className="flex items-baseline gap-3 lg:gap-5">
                <ClockDisplay time={time.hhmm} label={slot.label} size="xl" />
                <span className="hidden sm:inline clock-numerals text-text-muted text-xl lg:text-3xl mb-3 lg:mb-6">:{time.ss}</span>
              </div>
              <p className="mt-6 text-text-secondary text-sm lg:text-base max-w-md leading-relaxed">{slot.description}</p>
              <div className="mt-6 flex items-center gap-2">
                <button
                  type="button"
                  className="inline-flex items-center justify-center size-10 lg:size-12 rounded-full bg-accent text-text-inverse hover:scale-105 transition-transform"
                  aria-label="現在播放"
                >
                  <Play className="size-4 lg:size-5 ml-0.5" fill="currentColor" />
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center size-10 lg:size-12 rounded-full border border-border-strong text-text-secondary hover:border-accent hover:text-accent transition-colors"
                  aria-label="上一個時段"
                >
                  <ChevronLeft className="size-4 lg:size-5" />
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center size-10 lg:size-12 rounded-full border border-border-strong text-text-secondary hover:border-accent hover:text-accent transition-colors"
                  aria-label="下一個時段"
                >
                  <ChevronRight className="size-4 lg:size-5" />
                </button>
              </div>
            </div>

            {/* Right: vertical card stack */}
            <div className="lg:col-span-5">
              <div className="text-[10px] uppercase tracking-[0.18em] text-text-muted mb-3 px-1">尚未公開的相見</div>
              <ul className="space-y-2 lg:space-y-2.5">
                {stackList.map((v) => (
                  <li key={v.id}>
                    <Link
                      href={`/watch/${v.slug}`}
                      className="group flex items-center gap-3 card p-2 lg:p-2.5 bg-bg-elevated/60 hover:border-accent transition-colors"
                    >
                      <div className="relative w-20 sm:w-24 aspect-video shrink-0 overflow-hidden rounded-md bg-bg-deep">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={v.hero} alt={v.title} loading="lazy" className="size-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] text-text-muted uppercase tracking-wide">{v.category}</div>
                        <div className="mt-0.5 text-sm font-semibold text-text-primary line-clamp-2 group-hover:text-accent transition-colors">
                          {v.title}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HeroCenterCard({ video }: { video: Video }) {
  return (
    <motion.div
      initial={{ y: 16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
      className="relative"
    >
      <div className="absolute -inset-3 lg:-inset-5 rounded-2xl lg:rounded-3xl bg-accent/15 blur-2xl -z-10 pointer-events-none" />
      <Link
        href={`/watch/${video.slug}`}
        className="group block relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-2xl lg:rounded-3xl border-[3px] border-accent bg-bg-deep shadow-[0_0_60px_-12px_var(--color-accent)]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={video.hero} alt={video.title} className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/60 via-transparent to-bg-deep/20" />

        {/* TOP: small "首播 / category" pill */}
        <div className="absolute top-3 lg:top-5 left-1/2 -translate-x-1/2 flex gap-1.5">
          <Badge variant="default" className="bg-accent text-text-inverse border-accent text-[10px] shadow-lg">劇情</Badge>
        </div>

        {/* CENTER: title + right-side play button */}
        <div className="absolute inset-x-3 bottom-3 lg:inset-x-6 lg:bottom-6">
          <div className="flex items-end justify-between gap-3">
            <h2 className="font-display text-base sm:text-xl lg:text-3xl font-black text-text-primary line-clamp-2 leading-tight">
              {video.title}
            </h2>
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); }}
              aria-label="播放"
              className="shrink-0 size-9 lg:size-11 rounded-full bg-accent text-text-inverse flex items-center justify-center shadow-[0_0_24px_var(--color-accent)] hover:scale-105 transition-transform"
            >
              <Play className="size-4 lg:size-5 ml-0.5" fill="currentColor" />
            </button>
          </div>
          {/* metadata + favorite button */}
          <div className="mt-2 flex items-center gap-2 text-[10px] lg:text-xs text-text-muted">
            <span>{video.duration}</span>
            <span className="opacity-40">/</span>
            <span>EP1</span>
            <span className="opacity-40">/</span>
            <span>共 {video.episodeCount} 集</span>
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); }}
              className="ml-auto inline-flex items-center gap-1 h-6 px-2 rounded-full border border-border text-text-secondary hover:border-accent hover:text-accent transition-colors"
            >
              <Plus className="size-3" />
              <span className="text-[10px]">收藏</span>
            </button>
          </div>
        </div>

        {/* Corner brackets effect on hover */}
        <CornerBrackets />
      </Link>
    </motion.div>
  );
}

function HeroSideCard({ video, side }: { video: Video; side: "left" | "right" }) {
  return (
    <Link
      href={`/watch/${video.slug}`}
      className={cn(
        "group block relative aspect-[3/4] overflow-hidden rounded-xl lg:rounded-2xl bg-bg-deep transition-all opacity-60 hover:opacity-100",
        side === "left" ? "-mr-3 sm:-mr-6" : "-ml-3 sm:-ml-6",
      )}
      style={{
        transform: side === "left" ? "perspective(800px) rotateY(8deg)" : "perspective(800px) rotateY(-8deg)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={video.hero} alt={video.title} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/30 to-transparent" />
      <div className="absolute inset-x-2 bottom-2 lg:inset-x-4 lg:bottom-4">
        <div className="text-[10px] text-text-muted">{video.category}</div>
        <div className="mt-0.5 text-xs lg:text-sm font-semibold text-text-primary line-clamp-1">{video.title}</div>
      </div>
      <CornerBrackets />
    </Link>
  );
}

function CornerBrackets() {
  return (
    <>
      <span className="pointer-events-none absolute top-2 left-2 w-5 h-5 border-l-2 border-t-2 border-accent rounded-tl opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="pointer-events-none absolute top-2 right-2 w-5 h-5 border-r-2 border-t-2 border-accent rounded-tr opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="pointer-events-none absolute bottom-2 left-2 w-5 h-5 border-l-2 border-b-2 border-accent rounded-bl opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="pointer-events-none absolute bottom-2 right-2 w-5 h-5 border-r-2 border-b-2 border-accent rounded-br opacity-0 group-hover:opacity-100 transition-opacity" />
    </>
  );
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}
