"use client";

import { useContent } from "@/lib/store/content";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Film, Newspaper, ShoppingBag } from "lucide-react";

export default function TagUniversePage() {
  const tags = useContent((s) => s.tags);
  const videos = useContent((s) => s.videos);
  const news = useContent((s) => s.news);
  const products = useContent((s) => s.products);
  const curations = useContent((s) => s.curations);

  // Pick top 8 tags by contentCount
  const topTags = [...tags].sort((a, b) => b.contentCount - a.contentCount).slice(0, 8);

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">內容宇宙視覺化</h1>
        <p className="mt-1 text-sm text-text-secondary">標籤跨類型串聯：影視 ↔ 新聞 ↔ 策展 ↔ 選物</p>
      </div>

      <Card>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="relative">
              <div className="size-32 rounded-full bg-accent flex items-center justify-center font-display font-extrabold text-text-inverse text-xl">
                <Sparkles className="size-8" />
              </div>
              <div className="absolute inset-0 size-32 rounded-full border-2 border-accent animate-ping opacity-20" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {topTags.map((t) => {
          const v = videos.filter((x) => x.tags.some((tag) => tag.includes(t.name))).length;
          const n = news.filter((x) => x.tags.some((tag) => tag.includes(t.name))).length;
          const c = curations.filter((x) => x.tags.some((tag) => tag.includes(t.name))).length;
          const p = products.filter((x) => x.tags.some((tag) => tag.includes(t.name))).length;
          return (
            <Card key={t.id} className="hover:border-accent transition-colors">
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-display text-2xl font-extrabold text-accent">#{t.name}</span>
                  <Badge variant="warm">{t.category}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <Mini icon={<Film className="size-3" />} label="影視" count={v} />
                  <Mini icon={<Newspaper className="size-3" />} label="新聞" count={n} />
                  <Mini icon={<Sparkles className="size-3" />} label="策展" count={c} />
                  <Mini icon={<ShoppingBag className="size-3" />} label="選物" count={p} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function Mini({ icon, label, count }: { icon: React.ReactNode; label: string; count: number }) {
  return (
    <div className="flex items-center justify-between p-2 rounded bg-bg-base">
      <span className="inline-flex items-center gap-1 text-text-secondary">{icon} {label}</span>
      <span className="font-bold text-text-primary">{count}</span>
    </div>
  );
}
