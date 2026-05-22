"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useContent } from "@/lib/store/content";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CardVideo } from "@/components/ui/card-video";
import { CardArticle } from "@/components/ui/card-article";

const TRENDING = ["茶", "義民", "客家小炒", "藍染", "桐花", "美濃", "客語", "六堆"];

function SearchInner() {
  const params = useSearchParams();
  const initial = params.get("q") ?? "";
  const [query, setQuery] = useState(initial);
  const [filter, setFilter] = useState<"all" | "video" | "news" | "curation" | "product">("all");

  const videos = useContent((s) => s.videos);
  const news = useContent((s) => s.news);
  const curations = useContent((s) => s.curations);
  const products = useContent((s) => s.products);

  const result = useMemo(() => {
    if (!query.trim()) return { videos: [], news: [], curations: [], products: [] };
    const q = query.toLowerCase();
    return {
      videos: videos.filter((v) => v.title.toLowerCase().includes(q) || v.tags.some((t) => t.toLowerCase().includes(q))),
      news: news.filter((n) => n.title.toLowerCase().includes(q) || n.tags.some((t) => t.toLowerCase().includes(q))),
      curations: curations.filter((c) => c.title.toLowerCase().includes(q) || c.tags.some((t) => t.toLowerCase().includes(q))),
      products: products.filter((p) => p.name.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q))),
    };
  }, [query, videos, news, curations, products]);

  const total = result.videos.length + result.news.length + result.curations.length + result.products.length;

  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
      <header className="mb-8 max-w-3xl">
        <div className="section-title text-xs">SEARCH</div>
        <h1 className="mt-2 font-display text-3xl lg:text-5xl font-extrabold tracking-tight text-text-primary">全站搜尋</h1>
        <div className="mt-6 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-text-muted" />
          <Input
            autoFocus
            type="search"
            placeholder="輸入關鍵字 — 影視、新聞、策展、選物 都會搜"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-14 pl-12 pr-12 text-base"
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label="清除" className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary">
              <X className="size-5" />
            </button>
          )}
        </div>
      </header>

      {!query.trim() && (
        <section className="card p-6">
          <div className="section-title text-xs flex items-center gap-2"><TrendingUp className="size-3.5" /> 熱門搜尋</div>
          <div className="mt-4 flex flex-wrap gap-2">
            {TRENDING.map((t) => (
              <button key={t} onClick={() => setQuery(t)} className="px-4 h-9 rounded-full border border-border bg-bg-elevated text-text-secondary hover:border-accent hover:text-accent text-sm">
                {t}
              </button>
            ))}
          </div>
        </section>
      )}

      {query.trim() && (
        <>
          <div className="mb-6 flex items-center justify-between">
            <div className="text-sm text-text-secondary">
              共找到 <span className="text-text-primary font-bold">{total}</span> 筆結果
            </div>
            <div className="flex flex-wrap gap-2">
              {(["all", "video", "news", "curation", "product"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`h-8 px-3 rounded-full text-xs font-semibold border transition-colors ${
                    filter === f ? "bg-accent text-text-inverse border-accent" : "border-border text-text-secondary"
                  }`}
                >
                  {f === "all" ? "全部" : f === "video" ? `影視 ${result.videos.length}` : f === "news" ? `新聞 ${result.news.length}` : f === "curation" ? `策展 ${result.curations.length}` : `選物 ${result.products.length}`}
                </button>
              ))}
            </div>
          </div>

          {total === 0 && (
            <div className="card p-12 text-center">
              <div className="text-lg font-bold text-text-primary">沒有符合「{query}」的結果</div>
              <p className="mt-2 text-text-secondary text-sm">請改用其他關鍵字，或試試上方的熱門搜尋。</p>
            </div>
          )}

          {(filter === "all" || filter === "video") && result.videos.length > 0 && (
            <section className="mb-10">
              <h2 className="font-display text-xl font-bold text-text-primary mb-4">影視 <Badge variant="default">{result.videos.length}</Badge></h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {result.videos.slice(0, 10).map((v) => <CardVideo key={v.id} video={v} />)}
              </div>
            </section>
          )}

          {(filter === "all" || filter === "news") && result.news.length > 0 && (
            <section className="mb-10">
              <h2 className="font-display text-xl font-bold text-text-primary mb-4">新聞 <Badge variant="default">{result.news.length}</Badge></h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {result.news.slice(0, 8).map((n) => <CardArticle key={n.id} item={n} variant="compact" />)}
              </div>
            </section>
          )}

          {(filter === "all" || filter === "curation") && result.curations.length > 0 && (
            <section className="mb-10">
              <h2 className="font-display text-xl font-bold text-text-primary mb-4">策展 <Badge variant="default">{result.curations.length}</Badge></h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {result.curations.map((c) => (
                  <Link key={c.id} href={`/life/${c.slug}`} className="card overflow-hidden hover:border-accent transition-colors">
                    <div className="relative aspect-video">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={c.cover} alt={c.title} className="size-full object-cover" />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-semibold text-text-primary line-clamp-2">{c.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {(filter === "all" || filter === "product") && result.products.length > 0 && (
            <section className="mb-10">
              <h2 className="font-display text-xl font-bold text-text-primary mb-4">選物 <Badge variant="default">{result.products.length}</Badge></h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {result.products.map((p) => (
                  <Link key={p.id} href={`/shop/${p.id}`} className="card overflow-hidden hover:border-accent transition-colors">
                    <div className="relative aspect-square">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.image} alt={p.name} className="size-full object-cover" />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-semibold text-text-primary line-clamp-2">{p.name}</h3>
                      <div className="mt-1 text-sm font-bold text-accent">NT${p.price}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-text-muted">Loading…</div>}>
      <SearchInner />
    </Suspense>
  );
}
