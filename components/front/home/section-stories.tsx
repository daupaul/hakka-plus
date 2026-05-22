"use client";

import Link from "next/link";
import { useContent } from "@/lib/store/content";
import { SectionShell } from "./section-shell";
import { cn } from "@/lib/utils";

export function SectionStories() {
  const videos = useContent((s) => s.videos);
  const stories = videos.filter((v) => v.category === "戲劇" || v.category === "紀錄片").slice(0, 5);

  return (
    <SectionShell eyebrow="STORIES WORTH STAYING FOR" title="值得你留下來的故事" centered>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-5 max-w-6xl mx-auto">
        {stories.map((v, i) => (
          <Link
            key={v.id}
            href={`/watch/${v.slug}`}
            className="group block"
          >
            <div className={cn(
              "relative overflow-hidden rounded-xl aspect-[3/4] bg-bg-deep border transition-all",
              i === 1 ? "border-accent" : "border-transparent hover:border-accent/40",
            )}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={v.poster} alt={v.title} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/90 via-transparent to-transparent" />
            </div>
            <div className="mt-3 text-center">
              <h3 className="font-display text-sm lg:text-base font-bold text-text-primary line-clamp-1 group-hover:text-accent transition-colors">
                {v.title}
              </h3>
              <div className={cn(
                "mx-auto mt-1.5 h-0.5 rounded-full transition-all",
                i === 1 ? "w-10 bg-accent" : "w-6 bg-border group-hover:bg-accent group-hover:w-10",
              )} />
              <p className="mt-1.5 text-[11px] text-accent">{v.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </SectionShell>
  );
}
