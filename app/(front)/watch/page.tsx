"use client";

import { useState, useMemo } from "react";
import { useContent } from "@/lib/store/content";
import { CardVideo } from "@/components/ui/card-video";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";

const CATEGORIES = ["全部", "戲劇", "紀錄片", "綜藝", "兒少", "電影"] as const;
const SORT_OPTIONS = [
  { value: "newest", label: "最新上架" },
  { value: "popular", label: "最多觀看" },
  { value: "rating", label: "評分最高" },
] as const;

export default function WatchListPage() {
  const videos = useContent((s) => s.videos);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("全部");
  const [sortBy, setSortBy] = useState<(typeof SORT_OPTIONS)[number]["value"]>("newest");

  const filtered = useMemo(() => {
    let list = videos.filter((v) => v.status === "published");
    if (category !== "全部") list = list.filter((v) => v.category === category);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.titleEn?.toLowerCase().includes(q) ||
          v.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    if (sortBy === "newest")
      list = [...list].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    if (sortBy === "popular") list = [...list].sort((a, b) => b.viewCount - a.viewCount);
    if (sortBy === "rating") list = [...list].sort((a, b) => b.likeCount - a.likeCount);
    return list;
  }, [videos, query, category, sortBy]);

  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
      <header className="mb-8 lg:mb-10">
        <div className="section-title text-xs">VIDEO LIBRARY</div>
        <h1 className="mt-2 font-display text-3xl lg:text-5xl font-extrabold tracking-tight text-text-primary">
          影視 / 節目
        </h1>
        <p className="mt-3 text-text-secondary text-sm lg:text-base max-w-2xl">
          {videos.length} 部客家自製戲劇、紀錄片、綜藝與兒少節目。從《星雲下的黑潮島嶼》到《伯公樹下的孩子》，每一部都是日常有客的故事。
        </p>
      </header>

      <div className="mb-6 lg:mb-8 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-muted" />
          <Input
            type="search"
            placeholder="搜尋節目名稱、標籤、演員…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2 text-xs lg:text-sm text-text-secondary">
          <SlidersHorizontal className="size-4" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="h-10 rounded-lg border border-border bg-bg-elevated px-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
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

      <div className="mb-4 text-xs text-text-muted flex items-center gap-2">
        共 <span className="text-text-primary font-semibold">{filtered.length}</span> 部節目
        {category !== "全部" && <Badge variant="default">{category}</Badge>}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-text-secondary">沒有符合條件的節目</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-5">
          {filtered.map((v) => (
            <CardVideo key={v.id} video={v} />
          ))}
        </div>
      )}
    </div>
  );
}
