"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useContent } from "@/lib/store/content";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = ["全部", "民眾關懷", "新聞探索", "文化生活", "全球客家", "國際視野"];
const ANCHORS = [
  { name: "許麗鈞", role: "客台新聞主播" },
  { name: "李宛庭", role: "資深新聞節目主持人" },
  { name: "林佳華", role: "客台新聞主播" },
  { name: "陳怡平", role: "資深記者" },
  { name: "林宛悅", role: "客台主播" },
  { name: "林信君", role: "客台主播" },
];

export default function NewsListPage() {
  const news = useContent((s) => s.news);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("全部");

  const filtered = useMemo(() => {
    let list = news.filter((n) => n.status === "published");
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((n) => n.title.toLowerCase().includes(q) || n.tags.some((t) => t.toLowerCase().includes(q)));
    }
    return [...list].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }, [news, query]);

  const lead = filtered.find((n) => n.featured) ?? filtered[0];
  const agingTogether = filtered.filter((n) => n.tags.includes("銀髮") || n.tags.includes("長輩") || n.category === "客家文化").slice(0, 6);
  const speakWithoutFear = filtered.filter((n) => n.category === "客語教育" || n.tags.includes("客語")).slice(0, 6);
  const stories = filtered.filter((n) => n.featured || n.category === "客家文化").slice(0, 4);
  const explore = filtered.slice(0, 5);

  return (
    <>
      {/* Hero — single wide news card with overlay title */}
      {lead && (
        <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12 pt-6 lg:pt-10">
          <Link href={`/news/${lead.slug}`} className="group block card overflow-hidden">
            <div className="relative aspect-[21/9] lg:aspect-[21/8] overflow-hidden bg-bg-deep">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={lead.image} alt={lead.title} className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/95 via-bg-deep/40 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 lg:inset-x-12 lg:bottom-10 max-w-3xl">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="warm">{lead.category}</Badge>
                  <Badge variant="default">突發</Badge>
                </div>
                <h1 className="font-display text-2xl sm:text-3xl lg:text-5xl font-black text-text-primary leading-tight group-hover:text-accent transition-colors">
                  {lead.title}
                </h1>
                {lead.subtitle && <p className="mt-2 text-sm lg:text-base text-text-secondary">{lead.subtitle}</p>}
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Filter tabs row */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12 mt-6 lg:mt-8">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex flex-wrap gap-1.5">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "h-8 px-3 rounded-full text-xs font-semibold border transition-colors",
                  tab === t ? "bg-accent text-text-inverse border-accent" : "border-border text-text-secondary hover:text-text-primary",
                )}
              >{t}</button>
            ))}
          </div>
          <div className="relative flex-1 min-w-[180px] max-w-xs ml-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-muted" />
            <Input type="search" placeholder="搜尋..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9 h-9" />
          </div>
        </div>

        {/* Top secondary 5-card row */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
          {filtered.filter((n) => n.id !== lead?.id).slice(0, 5).map((n) => (
            <Link key={n.id} href={`/news/${n.slug}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-bg-deep">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={n.image} alt={n.title} loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="mt-2">
                <h3 className="text-sm font-semibold text-text-primary line-clamp-2 group-hover:text-accent transition-colors">{n.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* AGING TOGETHER — 6 portrait cards centered */}
      {agingTogether.length > 0 && (
        <Section eyebrow="AGING TOGETHER" title="老了怎麼伴">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
            {agingTogether.map((n) => (
              <Link key={n.id} href={`/news/${n.slug}`} className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-bg-deep">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={n.image} alt={n.title} loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <h3 className="mt-2 text-sm font-semibold text-text-primary line-clamp-2 group-hover:text-accent transition-colors text-center">{n.title}</h3>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* SPEAK HAKKA WITHOUT FEAR */}
      {speakWithoutFear.length > 0 && (
        <Section eyebrow="SPEAK HAKKA WITHOUT FEAR" title="客話母聲講">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
            {speakWithoutFear.map((n) => (
              <Link key={n.id} href={`/news/${n.slug}`} className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-bg-deep">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={n.image} alt={n.title} loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <h3 className="mt-2 text-sm font-semibold text-text-primary line-clamp-2 group-hover:text-accent transition-colors text-center">{n.title}</h3>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* STORIES WORTH STAYING FOR — 4 large landscape with tags */}
      {stories.length > 0 && (
        <Section eyebrow="STORIES WORTH STAYING FOR" title="值得你留下來的故事">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5 max-w-6xl mx-auto">
            {stories.map((n) => (
              <Link key={n.id} href={`/news/${n.slug}`} className="group">
                <div className="relative aspect-[5/4] overflow-hidden rounded-xl bg-bg-deep">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={n.image} alt={n.title} loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="mt-3 text-center">
                  <h3 className="font-display font-bold text-text-primary line-clamp-1 group-hover:text-accent transition-colors">{n.title}</h3>
                  <div className="mt-1.5"><Badge variant="default">影音</Badge></div>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* EXPLORE MORE — tabs + horizontal list */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
            <div>
              <div className="section-title text-[11px] lg:text-xs">EXPLORE MORE</div>
              <h2 className="mt-2 font-display text-2xl lg:text-3xl font-extrabold text-text-primary">延伸探索</h2>
            </div>
            <div className="flex items-center gap-1.5">
              {["熱品", "新聞", "節氣"].map((t, i) => (
                <button key={t} className={`h-8 px-3 rounded-full text-xs font-semibold border transition-colors ${i === 0 ? "bg-accent text-text-inverse border-accent" : "border-border text-text-secondary"}`}>{t}</button>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-2 lg:gap-3 max-w-5xl mx-auto">
            {explore.map((n) => (
              <Link key={n.id} href={`/news/${n.slug}`} className="group flex items-center gap-3 card p-3 hover:border-accent transition-colors">
                <div className="relative w-20 aspect-square shrink-0 overflow-hidden rounded-md bg-bg-deep">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={n.image} alt={n.title} loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Badge variant="warm">{n.category}</Badge>
                    <span className="text-[11px] text-text-muted">{new Date(n.publishedAt).toLocaleDateString("zh-TW")}</span>
                  </div>
                  <h4 className="mt-1 text-sm font-semibold text-text-primary line-clamp-1 group-hover:text-accent transition-colors">{n.title}</h4>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button className="size-10 rounded-full border border-border text-text-secondary hover:border-accent hover:text-accent flex items-center justify-center"><ChevronLeft className="size-4" /></button>
            <button className="size-10 rounded-full border border-border text-text-secondary hover:border-accent hover:text-accent flex items-center justify-center"><ChevronRight className="size-4" /></button>
          </div>
        </div>
      </section>

      {/* TELLING THE NEWS, IN HAKKA — 6 anchor portrait cards */}
      <Section eyebrow="TELLING THE NEWS, IN HAKKA" title="為你講新聞">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
          {ANCHORS.map((a, i) => (
            <div key={a.name} className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-bg-deep">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://picsum.photos/seed/anchor-${i}/600/800`} alt={a.name} loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="mt-3 text-center">
                <div className="font-display font-bold text-text-primary">{a.name}</div>
                <div className="mt-0.5 text-[11px] text-text-muted">{a.role}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="py-10 lg:py-14">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12">
        <div className="mb-6 text-center">
          <div className="section-title text-[11px] lg:text-xs">{eyebrow}</div>
          <h2 className="mt-2 font-display text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-text-primary">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}
