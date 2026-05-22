"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useContent } from "@/lib/store/content";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";

const CATEGORIES = ["全部", "旅遊", "選物", "節慶", "工藝", "飲食"] as const;

export default function LifeListPage() {
  const curations = useContent((s) => s.curations);
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("全部");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = curations.filter((c) => c.status === "published");
    if (category !== "全部") list = list.filter((c) => c.category === category);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((c) => c.title.toLowerCase().includes(q) || c.tags.some((t) => t.toLowerCase().includes(q)));
    }
    return [...list].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }, [curations, category, query]);

  const lead = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
      <header className="mb-8 lg:mb-12">
        <div className="section-title text-xs">LIFE+ CURATION</div>
        <h1 className="mt-2 font-display text-3xl lg:text-5xl font-extrabold tracking-tight text-text-primary">
          生活+ · 客家文化策展
        </h1>
        <p className="mt-3 text-text-secondary text-sm lg:text-base max-w-2xl">
          {curations.length} 篇深度策展 — 從茶園、藍染、伯公樹下的孩子，到全球客家的離散。讓文化成為生活的一部分。
        </p>
      </header>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-muted" />
          <Input type="search" placeholder="搜尋策展主題..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9" />
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`h-9 px-4 rounded-full text-sm font-semibold border transition-colors ${
                category === c
                  ? "bg-accent text-text-inverse border-accent"
                  : "border-border text-text-secondary hover:border-accent hover:text-accent"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Lead curation */}
      {lead && (
        <Link href={`/life/${lead.slug}`} className="block mb-8 lg:mb-12 group">
          <div className="card overflow-hidden">
            <div className="grid lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={lead.cover} alt={lead.title} className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-4 left-4"><Badge variant="warm">{lead.category}</Badge></div>
              </div>
              <div className="lg:col-span-5 p-6 lg:p-10 flex flex-col justify-center bg-bg-elevated">
                <Badge variant="default">本月策展</Badge>
                <h2 className="mt-3 font-display text-2xl lg:text-4xl font-extrabold text-text-primary group-hover:text-accent transition-colors">
                  {lead.title}
                </h2>
                {lead.subtitle && <p className="mt-2 text-text-secondary text-sm lg:text-base">{lead.subtitle}</p>}
                <p className="mt-4 text-text-secondary text-sm lg:text-base line-clamp-3">{lead.summary}</p>
                <div className="mt-6 inline-flex items-center gap-1.5 text-accent text-sm font-semibold">
                  進入策展 <ArrowRight className="size-4" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Other curations grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5">
        {rest.map((c) => (
          <Link key={c.id} href={`/life/${c.slug}`} className="group card overflow-hidden hover:border-accent transition-colors">
            <div className="relative aspect-[16/10] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.cover} alt={c.title} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute top-3 left-3"><Badge variant="warm">{c.category}</Badge></div>
            </div>
            <div className="p-4 lg:p-5">
              <h3 className="font-display font-bold text-text-primary text-base lg:text-lg line-clamp-2 group-hover:text-accent transition-colors">
                {c.title}
              </h3>
              {c.subtitle && <p className="mt-1 text-xs text-text-muted line-clamp-1">{c.subtitle}</p>}
              <p className="mt-2 text-sm text-text-secondary line-clamp-2">{c.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
