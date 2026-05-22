"use client";

import Link from "next/link";
import { useContent } from "@/lib/store/content";
import { SectionShell } from "./section-shell";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

export function SectionHeadlines() {
  const news = useContent((s) => s.news);
  const sorted = [...news]
    .filter((n) => n.status === "published")
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 6);

  if (sorted.length === 0) return null;

  return (
    <SectionShell eyebrow="HAKKA HEADLINES" title="客庄大小事" centered>
      <div className="relative">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4 max-w-7xl mx-auto">
          {sorted.map((n, i) => (
            <Link key={n.id} href={`/news/${n.slug}`} className="group block">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-bg-deep">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={n.image} alt={n.title} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
                {n.featured && (
                  <div className="absolute top-2 left-2"><Badge variant="warm">精選</Badge></div>
                )}
              </div>
              <div className="mt-3 text-center">
                <h3 className="font-display text-sm font-bold text-text-primary line-clamp-2 group-hover:text-accent transition-colors">
                  {n.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center">
          <Link href="/news" className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline">
            更多新聞 <ChevronRight className="size-4" />
          </Link>
        </div>
      </div>
    </SectionShell>
  );
}
