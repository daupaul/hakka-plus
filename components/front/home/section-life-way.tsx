"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useContent } from "@/lib/store/content";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

const TABS = [
  { id: "all", label: "全部" },
  { id: "旅遊", label: "旅遊" },
  { id: "節慶", label: "節慶" },
  { id: "工藝", label: "工藝" },
  { id: "飲食", label: "飲食" },
] as const;

export function SectionLifeWay() {
  const curations = useContent((s) => s.curations);
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("all");

  const filtered = useMemo(() => {
    const list = tab === "all" ? curations : curations.filter((c) => c.category === tab);
    return [...list].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, 5);
  }, [curations, tab]);

  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-6 lg:mb-8">
          <div>
            <div className="section-title text-[11px] lg:text-xs">LIVE THE HAKKA WAY</div>
            <h2 className="mt-2 font-display text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-text-primary">
              踩著客家過生活
            </h2>
          </div>
          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "h-8 px-3 rounded-full text-xs font-semibold border transition-colors",
                  tab === t.id
                    ? "bg-accent text-text-inverse border-accent"
                    : "border-border text-text-secondary hover:text-text-primary",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal list — image left, content right + date stamp */}
        <ul className="space-y-2 lg:space-y-3 max-w-5xl mx-auto">
          {filtered.map((c) => (
            <li key={c.id}>
              <Link
                href={`/life/${c.slug}`}
                className="group flex items-center gap-3 lg:gap-5 card p-3 lg:p-4 bg-bg-elevated/60 hover:border-accent transition-colors"
              >
                <div className="relative w-20 sm:w-28 lg:w-32 aspect-video shrink-0 overflow-hidden rounded-lg bg-bg-deep">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.cover} alt={c.title} loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Badge variant="warm">{c.category}</Badge>
                    <span className="hidden sm:inline text-[11px] text-text-muted">{formatDate(c.publishedAt)}</span>
                  </div>
                  <h3 className="mt-1.5 font-display text-sm lg:text-base font-bold text-text-primary line-clamp-2 group-hover:text-accent transition-colors">
                    {c.title}
                  </h3>
                  <p className="hidden lg:block mt-1 text-xs text-text-muted line-clamp-1">{c.summary}</p>
                </div>
                <ArrowUpRight className="hidden lg:inline size-4 text-text-muted group-hover:text-accent transition-colors" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button className="size-10 rounded-full border border-border text-text-secondary hover:border-accent hover:text-accent transition-colors flex items-center justify-center">
            <ChevronLeft className="size-4" />
          </button>
          <button className="size-10 rounded-full border border-border text-text-secondary hover:border-accent hover:text-accent transition-colors flex items-center justify-center">
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
