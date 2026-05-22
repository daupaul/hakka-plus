"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useContent } from "@/lib/store/content";
import { CardArticle } from "@/components/ui/card-article";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { SectionShell } from "@/components/front/home/section-shell";

const CATEGORIES = ["全部", "即時", "客家文化", "客語教育", "生活", "政策"] as const;

export default function NewsListPage() {
  const news = useContent((s) => s.news);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("全部");

  const filtered = useMemo(() => {
    let list = news.filter((n) => n.status === "published");
    if (category !== "全部") list = list.filter((n) => n.category === category);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (n) => n.title.toLowerCase().includes(q) || n.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return [...list].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }, [news, query, category]);

  const lead = filtered.find((n) => n.featured) ?? filtered[0];
  const secondary = filtered.filter((n) => n.id !== lead?.id).slice(0, 4);
  const agingTogether = filtered.filter((n) => n.tags.includes("銀髮") || n.tags.includes("長輩")).slice(0, 4);
  const speakWithoutFear = filtered.filter((n) => n.category === "客語教育" || n.tags.includes("客語")).slice(0, 4);
  const culture = filtered.filter((n) => n.category === "客家文化").slice(0, 6);
  const policy = filtered.filter((n) => n.category === "政策").slice(0, 4);
  const lifeNews = filtered.filter((n) => n.category === "生活").slice(0, 4);

  return (
    <>
      {/* Hero */}
      {lead && (
        <section className="relative">
          <div className="relative aspect-video lg:aspect-[21/9] max-h-[60vh] overflow-hidden bg-bg-deep">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={lead.image} alt={lead.title} className="size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/40 to-transparent" />
          </div>
          <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12 -mt-24 lg:-mt-40 relative z-10 pb-8">
            <Link href={`/news/${lead.slug}`} className="block max-w-3xl group">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="warm">突發</Badge>
                <Badge variant="outline">{lead.category}</Badge>
              </div>
              <h1 className="font-display text-3xl lg:text-5xl font-black tracking-tight text-text-primary leading-tight group-hover:text-accent transition-colors">
                {lead.title}
              </h1>
              {lead.subtitle && (
                <p className="mt-3 text-text-secondary text-base lg:text-lg max-w-2xl">{lead.subtitle}</p>
              )}
              <div className="mt-4 text-xs lg:text-sm text-text-muted">
                {lead.author && <>{lead.author} · </>}
                {new Date(lead.publishedAt).toLocaleString("zh-TW", { hour12: false, dateStyle: "medium", timeStyle: "short" })}
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Filters */}
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-muted" />
            <Input
              type="search"
              placeholder="搜尋新聞 / 議題 / 標籤…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
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
      </div>

      {/* Secondary 4 */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
          {secondary.map((n) => (
            <CardArticle key={n.id} item={n} />
          ))}
        </div>
      </section>

      {/* AGING TOGETHER */}
      {agingTogether.length > 0 && (
        <SectionShell eyebrow="AGING TOGETHER" title="與長輩一起的客家庄">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5">
            {agingTogether.map((n) => (
              <CardArticle key={n.id} item={n} variant="compact" />
            ))}
          </div>
        </SectionShell>
      )}

      {/* SPEAK HAKKA WITHOUT FEAR */}
      {speakWithoutFear.length > 0 && (
        <SectionShell eyebrow="SPEAK HAKKA WITHOUT FEAR" title="無懼開口說客語">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5">
            {speakWithoutFear.map((n) => (
              <CardArticle key={n.id} item={n} variant="compact" />
            ))}
          </div>
        </SectionShell>
      )}

      {/* STORIES WORTH STAYING FOR */}
      {culture.length > 0 && (
        <SectionShell eyebrow="STORIES WORTH STAYING FOR" title="值得駐足的客家故事">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
            {culture.map((n) => (
              <CardArticle key={n.id} item={n} variant="compact" />
            ))}
          </div>
        </SectionShell>
      )}

      {/* EXPLORE MORE */}
      {policy.length > 0 && (
        <SectionShell eyebrow="EXPLORE MORE" title="政策與制度">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
            {policy.map((n) => (
              <CardArticle key={n.id} item={n} />
            ))}
          </div>
        </SectionShell>
      )}

      {/* TELLING THE NEWS IN HAKKA */}
      {lifeNews.length > 0 && (
        <SectionShell eyebrow="TELLING THE NEWS IN HAKKA" title="用客語說生活">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
            {lifeNews.map((n) => (
              <CardArticle key={n.id} item={n} />
            ))}
          </div>
        </SectionShell>
      )}
    </>
  );
}
