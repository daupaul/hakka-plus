"use client";

import { useState, useRef, useEffect } from "react";
import { Heart, MessageCircle, Share2, Music, Play, Pause } from "lucide-react";
import shortsSeed from "@/lib/mock/shorts.json";
import type { Short } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/utils";

const SHORTS = shortsSeed as unknown as Short[];

export default function ShortsPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            setActiveIdx(idx);
          }
        });
      },
      { root: el, threshold: 0.7 },
    );
    el.querySelectorAll<HTMLElement>("[data-reel]").forEach((node) => obs.observe(node));
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-[calc(100vh-4rem)] lg:h-[calc(100vh-4.5rem)] overflow-y-scroll snap-y snap-mandatory scroll-pretty bg-bg-deep"
    >
      {SHORTS.map((s, idx) => (
        <article
          key={s.id}
          data-reel
          data-idx={idx}
          className="relative h-full w-full snap-start flex items-center justify-center"
        >
          <div className="relative h-full w-full max-w-[480px] mx-auto bg-bg-base overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.poster} alt={s.title} className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-base/95 via-transparent to-transparent" />

            {/* Center play/pause */}
            <button
              onClick={() => setPlaying(!playing)}
              aria-label={playing ? "暫停" : "播放"}
              className="absolute inset-0 m-auto size-20 rounded-full bg-bg-base/50 backdrop-blur-sm text-text-primary flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
            >
              {playing ? <Pause className="size-8" fill="currentColor" /> : <Play className="size-8 ml-1" fill="currentColor" />}
            </button>

            {/* Bottom info */}
            <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="size-10 rounded-full overflow-hidden border border-accent">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.channelAvatar} alt={s.channelName} className="size-full object-cover" />
                </div>
                <div>
                  <div className="font-semibold text-text-primary text-sm">{s.channelName}</div>
                  <Badge variant="muted">追蹤</Badge>
                </div>
              </div>
              <h2 className="font-display font-bold text-text-primary text-lg lg:text-xl line-clamp-2">{s.title}</h2>
              <p className="mt-1 text-text-secondary text-sm line-clamp-2">{s.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-bg-base/60 text-accent">#{t}</span>
                ))}
              </div>
              <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-text-muted">
                <Music className="size-3" /> 原音 · {s.duration}
              </div>
            </div>

            {/* Right interaction rail */}
            <aside className="absolute right-3 bottom-32 flex flex-col items-center gap-4 z-10">
              <button className="flex flex-col items-center group" aria-label="按讚">
                <div className="size-12 rounded-full bg-bg-base/60 backdrop-blur-sm text-text-primary group-hover:text-accent transition-colors inline-flex items-center justify-center">
                  <Heart className="size-5" />
                </div>
                <span className="text-xs text-text-primary mt-1">{formatNumber(s.likeCount)}</span>
              </button>
              <button className="flex flex-col items-center group" aria-label="留言">
                <div className="size-12 rounded-full bg-bg-base/60 backdrop-blur-sm text-text-primary group-hover:text-accent transition-colors inline-flex items-center justify-center">
                  <MessageCircle className="size-5" />
                </div>
                <span className="text-xs text-text-primary mt-1">{formatNumber(s.commentCount)}</span>
              </button>
              <button className="flex flex-col items-center group" aria-label="分享">
                <div className="size-12 rounded-full bg-bg-base/60 backdrop-blur-sm text-text-primary group-hover:text-accent transition-colors inline-flex items-center justify-center">
                  <Share2 className="size-5" />
                </div>
                <span className="text-xs text-text-primary mt-1">{formatNumber(s.shareCount)}</span>
              </button>
            </aside>

            {/* Index indicator */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-1">
              {SHORTS.map((_, i) => (
                <div key={i} className={`h-0.5 w-6 rounded-full ${i === activeIdx ? "bg-accent" : "bg-text-muted/30"}`} />
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
