"use client";

import Link from "next/link";
import { Plus, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useContent } from "@/lib/store/content";
import { SectionShell } from "./section-shell";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function SectionFresh() {
  const videos = useContent((s) => s.videos);
  const fresh = [...videos]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  if (fresh.length < 3) return null;

  return (
    <SectionShell eyebrow="FRESH CONTENTS" title="熱門推薦" centered>
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-6">
          {fresh.map((v, i) => (
            <Card key={v.id} video={v} highlighted={i === 1} index={i + 1} />
          ))}
        </div>

        {/* Carousel arrows */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <button className="size-10 rounded-full border border-border text-text-secondary hover:border-accent hover:text-accent transition-colors flex items-center justify-center">
            <ChevronLeft className="size-4" />
          </button>
          <button className="size-10 rounded-full bg-accent text-text-inverse flex items-center justify-center hover:bg-accent-strong transition-colors">
            <Play className="size-4 ml-0.5" fill="currentColor" />
          </button>
          <button className="size-10 rounded-full border border-border text-text-secondary hover:border-accent hover:text-accent transition-colors flex items-center justify-center">
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </SectionShell>
  );
}

function Card({ video, highlighted, index }: { video: { id: string; slug: string; title: string; titleEn?: string; hero: string; duration: string }; highlighted: boolean; index: number }) {
  return (
    <div
      className={cn(
        "group relative",
        highlighted && "lg:-translate-y-2",
      )}
    >
      {highlighted && (
        <div className="absolute -inset-2 lg:-inset-3 rounded-2xl bg-accent/12 blur-2xl -z-10 pointer-events-none" />
      )}
      <Link
        href={`/watch/${video.slug}`}
        className={cn(
          "block relative aspect-[4/5] overflow-hidden rounded-xl lg:rounded-2xl bg-bg-deep border-2 transition-all",
          highlighted ? "border-accent" : "border-transparent hover:border-accent/40",
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={video.hero} alt={video.title} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className={cn("absolute inset-0 bg-gradient-to-t", highlighted ? "from-accent/40 via-bg-deep/40" : "from-bg-deep via-bg-deep/30 to-transparent")} />

        {/* Index pill top-left */}
        <div className="absolute top-3 left-3">
          <Badge variant={highlighted ? "default" : "outline"} className={highlighted ? "bg-accent text-text-inverse border-accent" : ""}>
            {index}
          </Badge>
        </div>

        {/* Title + 收藏 button bottom */}
        <div className="absolute inset-x-3 bottom-3 lg:inset-x-5 lg:bottom-5">
          <h3 className="font-display text-base sm:text-lg lg:text-2xl font-bold text-text-primary line-clamp-2">
            {video.title}
          </h3>
          {video.titleEn && (
            <p className="hidden lg:block text-[11px] text-text-muted uppercase tracking-wider mt-1 line-clamp-1">{video.titleEn}</p>
          )}
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); }}
            className="mt-2 lg:mt-3 inline-flex items-center gap-1 h-7 px-2.5 rounded-full bg-bg-deep/70 backdrop-blur-sm border border-border text-text-secondary hover:bg-accent hover:text-text-inverse hover:border-accent transition-colors"
          >
            <Plus className="size-3" />
            <span className="text-[11px] font-semibold">收藏</span>
          </button>
        </div>
      </Link>
    </div>
  );
}
