"use client";

import { useContent } from "@/lib/store/content";
import { CardArticle } from "@/components/ui/card-article";
import { SectionShell } from "./section-shell";

export function SectionHeadlines() {
  const news = useContent((s) => s.news);
  const sorted = [...news]
    .filter((n) => n.status === "published")
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  const lead = sorted.find((n) => n.featured) ?? sorted[0];
  const rest = sorted.filter((n) => n.id !== lead?.id).slice(0, 5);

  if (!lead) return null;

  return (
    <SectionShell eyebrow="HAKKA HEADLINES" title="客家頭條" href="/news">
      <div className="grid gap-4 lg:gap-5 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <CardArticle item={lead} variant="wide" />
        </div>
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
          {rest.slice(0, 4).map((item) => (
            <CardArticle key={item.id} item={item} variant="compact" />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
