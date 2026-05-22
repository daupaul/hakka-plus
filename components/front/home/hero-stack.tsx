"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Play, Plus, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useContent } from "@/lib/store/content";
import type { Video } from "@/lib/types";
import { ClockDisplay } from "@/components/ui/clock-display";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function HeroStack() {
  const videos = useContent((s) => s.videos);
  const featured = videos.filter((v) => v.featured).slice(0, 3);
  const stackList = videos.slice(3, 9); // for right-column list under clock
  const [time, setTime] = useState<{ hhmm: string; ss: string }>({ hhmm: "12:24", ss: "00" });
  const [now, setNow] = useState<Date>(new Date(2026, 4, 22, 12, 24, 0));

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setNow(d);
      setTime({ hhmm: `${pad(d.getHours())}:${pad(d.getMinutes())}`, ss: pad(d.getSeconds()) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const slot = currentSlot(now.getHours());

  if (featured.length === 0) return null;

  const [left, center, right] = [featured[0], featured[1] ?? featured[0], featured[2] ?? featured[0]];

  return (
    <section className="relative pt-6 sm:pt-10 lg:pt-14 pb-12 lg:pb-16">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12">
        {/* 3-card hero — center prominent with green frame (single card on mobile) */}
        <div className="relative">
          <div className="hidden sm:grid grid-cols-[1fr_1.8fr_1fr] lg:grid-cols-[1fr_2fr_1fr] gap-3 lg:gap-6 items-center">
            <HeroSideCard video={left} side="left" />
            <HeroCenterCard video={center} />
            <HeroSideCard video={right} side="right" />
          </div>
          <div className="sm:hidden max-w-sm mx-auto">
            <HeroCenterCard video={center} />
          </div>

          {/* center card meta info (below center only) */}
          <div className="mt-4 lg:mt-6 grid grid-cols-1 sm:grid-cols-[1fr_1.8fr_1fr] lg:grid-cols-[1fr_2fr_1fr] gap-3 lg:gap-6">
            <div />
            <div className="text-center">
              <h1 className="font-display text-2xl sm:text-3xl lg:text-5xl font-black tracking-tight text-text-primary">
                {center.title}
              </h1>
              <div className="mt-2 flex items-center justify-center gap-3 text-xs lg:text-sm text-text-secondary">
                <span>{center.duration}</span>
                <span className="opacity-40">·</span>
                <span>EP1</span>
                <span className="opacity-40">·</span>
                <span>共 {center.episodeCount} 集</span>
                <button
                  type="button"
                  className="ml-2 inline-flex items-center gap-1 h-8 px-3 rounded-full border border-border text-text-secondary hover:border-accent hover:text-accent transition-colors"
                >
                  <Plus className="size-3.5" />
                  <span className="text-xs">收藏</span>
                </button>
              </div>
            </div>
            <div />
          </div>

          {/* Carousel arrows */}
          <button className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-bg-elevated/80 backdrop-blur-md border border-border text-text-secondary hover:text-accent hover:border-accent items-center justify-center transition-colors">
            <ChevronLeft className="size-5" />
          </button>
          <button className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-bg-elevated/80 backdrop-blur-md border border-border text-text-secondary hover:text-accent hover:border-accent items-center justify-center transition-colors">
            <ChevronRight className="size-5" />
          </button>
        </div>

        {/* 24hr clock band + vertical card list (mockup: clock left, list right) */}
        <div className="mt-12 lg:mt-20 grid gap-6 lg:gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-7">
            <div className="flex items-end gap-4 lg:gap-6">
              <ClockDisplay time={time.hhmm} label={slot.label} size="xl" />
              <span className="hidden sm:inline mb-3 lg:mb-6 clock-numerals text-text-muted text-xl lg:text-3xl">:{time.ss}</span>
            </div>
            <button
              type="button"
              className="mt-6 lg:mt-10 inline-flex items-center justify-center size-10 lg:size-12 rounded-full bg-accent-soft text-accent border border-accent/30 hover:bg-accent hover:text-text-inverse transition-colors"
              aria-label="現在播放"
            >
              <Play className="size-4 lg:size-5 ml-0.5" fill="currentColor" />
            </button>
            <p className="mt-6 text-text-secondary text-sm lg:text-base max-w-md">{slot.description}</p>
          </div>

          <ul className="lg:col-span-5 space-y-2 lg:space-y-3">
            <li className="text-[10px] uppercase tracking-[0.18em] text-text-muted px-1">尚未公開的相見</li>
            {stackList.map((v) => (
              <li key={v.id}>
                <Link href={`/watch/${v.slug}`} className="group flex items-center gap-3 card p-2 lg:p-2.5 bg-bg-elevated/60 hover:border-accent transition-colors">
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
      {/* Green glow halo */}
      <div className="absolute -inset-3 lg:-inset-5 rounded-2xl lg:rounded-3xl bg-accent/15 blur-2xl -z-10 pointer-events-none" />
      <Link
        href={`/watch/${video.slug}`}
        className="group block relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-square overflow-hidden rounded-2xl lg:rounded-3xl border-2 border-accent bg-bg-deep shadow-[0_0_60px_-12px_var(--color-accent)]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={video.hero} alt={video.title} className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/40 via-transparent to-bg-deep/40" />

        {/* Top center pill: 首播 */}
        <div className="absolute top-3 lg:top-5 left-1/2 -translate-x-1/2">
          <Badge variant="default" className="bg-accent text-text-inverse border-accent shadow-lg">首播 · NEW</Badge>
        </div>

        {/* Center play button on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="size-16 lg:size-20 rounded-full bg-accent text-text-inverse flex items-center justify-center shadow-[0_0_40px_var(--color-accent)]">
            <Play className="size-6 lg:size-8 ml-1" fill="currentColor" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function HeroSideCard({ video, side }: { video: Video; side: "left" | "right" }) {
  return (
    <Link
      href={`/watch/${video.slug}`}
      className={cn(
        "group block relative aspect-[3/4] sm:aspect-square overflow-hidden rounded-xl lg:rounded-2xl bg-bg-deep transition-all",
        "opacity-70 hover:opacity-100",
        side === "left" ? "-mr-2 sm:-mr-6 lg:-mr-8" : "-ml-2 sm:-ml-6 lg:-ml-8",
      )}
      style={{
        transform: side === "left" ? "perspective(800px) rotateY(8deg)" : "perspective(800px) rotateY(-8deg)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={video.hero} alt={video.title} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/30 to-transparent" />
      <div className="absolute inset-x-2 bottom-2 lg:inset-x-4 lg:bottom-4">
        <div className="text-[10px] lg:text-xs text-text-muted">{video.category}</div>
        <div className="mt-0.5 text-xs lg:text-sm font-semibold text-text-primary line-clamp-1">{video.title}</div>
      </div>
    </Link>
  );
}

function pad(n: number) { return String(n).padStart(2, "0"); }

interface Slot { label: string; description: string }
function currentSlot(hour: number): Slot {
  if (hour >= 5 && hour < 11) return { label: "晨光", description: "客家庄的早晨從晒穀場與菜園開始。" };
  if (hour >= 11 && hour < 14) return { label: "日午", description: "高山雲海剛散開，午後的客庄一片靜謐。" };
  if (hour >= 14 && hour < 17) return { label: "午後", description: "午後三點，伯公樹下的搖椅、阿婆的擂茶碗。" };
  if (hour >= 17 && hour < 20) return { label: "暗夜", description: "夕陽剛落，客家庄的廚房升起炊煙。" };
  if (hour >= 20 && hour < 23) return { label: "夜深", description: "晚飯後的客家八音、慢轉的廣播、漸暗的廳堂。" };
  return { label: "凌晨", description: "客庄最寂靜的時刻，伯公樹下、夥房瓦上、田埂遠處的犬吠。" };
}
