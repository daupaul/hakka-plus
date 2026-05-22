"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Eye, Share2, Bookmark, MessageCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useContent } from "@/lib/store/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardArticle } from "@/components/ui/card-article";
import { formatDateTime, formatNumber } from "@/lib/utils";

export default function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const news = useContent((s) => s.news);
  const item = news.find((n) => n.slug === slug);

  if (!item) notFound();

  const related = news
    .filter((n) => n.id !== item.id && (n.category === item.category || n.tags.some((t) => item.tags.includes(t))))
    .slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="relative aspect-video lg:aspect-[21/9] max-h-[55vh] overflow-hidden bg-bg-deep">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.image} alt={item.title} className="size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/40 to-transparent" />
        </div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 -mt-20 lg:-mt-32 relative z-10 pb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="warm">{item.category}</Badge>
            {item.source === "inews" && <Badge variant="muted">iNews 匯入</Badge>}
            {item.featured && <Badge variant="default">編輯精選</Badge>}
          </div>
          <h1 className="font-display text-3xl lg:text-5xl font-black tracking-tight text-text-primary leading-tight">
            {item.title}
          </h1>
          {item.subtitle && <p className="mt-3 text-text-secondary text-base lg:text-lg">{item.subtitle}</p>}
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs lg:text-sm text-text-muted">
            <span>{item.author ?? "客家電視台編輯室"}</span>
            <span>{formatDateTime(item.publishedAt)}</span>
            <span className="inline-flex items-center gap-1"><Eye className="size-3.5" /> {formatNumber(item.viewCount)}</span>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Button variant="secondary" size="sm"><Bookmark className="size-3.5" /> 收藏</Button>
            <Button variant="ghost" size="sm"><Share2 className="size-3.5" /> 分享</Button>
            {item.commentEnabled && (
              <Button variant="ghost" size="sm"><MessageCircle className="size-3.5" /> 評論</Button>
            )}
          </div>
        </div>
      </section>

      {/* Body + sidebar */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12 grid lg:grid-cols-12 gap-8 lg:gap-12 pb-10">
        <article className="lg:col-span-8 prose-zinc max-w-none">
          <div className="text-base lg:text-lg text-text-secondary leading-relaxed space-y-4">
            <p className="font-semibold text-text-primary text-lg lg:text-xl">{item.excerpt}</p>
            <ReactMarkdown>{item.body}</ReactMarkdown>
            <p>
              本則新聞由客家電視台採訪團隊整理。歡迎讀者透過 <Link href="/about/contact" className="text-accent hover:underline">回應表單</Link> 提供更多線索與建議。
            </p>
            <p>
              客家電視台新聞模組以 iNews FTP 自動匯入與編輯部人工撰寫兩種來源並行，每則新聞均經主編核可後發布，並可在 <Link href="/themes" className="text-accent hover:underline">主題訂閱</Link> 中追蹤相關標籤。
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <div className="text-xs text-text-muted mb-2">議題標籤</div>
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((t) => (
                <Link key={t} href={`/search?q=${encodeURIComponent(t)}`} className="text-xs px-2.5 py-1 rounded-full bg-bg-elevated border border-border text-text-secondary hover:border-accent hover:text-accent">
                  #{t}
                </Link>
              ))}
            </div>
          </div>
        </article>

        <aside className="lg:col-span-4 space-y-6">
          <div className="card p-5">
            <div className="section-title text-xs">RELATED COVERAGE</div>
            <ul className="mt-3 space-y-3">
              {related.map((r) => (
                <li key={r.id}>
                  <Link href={`/news/${r.slug}`} className="group flex items-start gap-3">
                    <div className="relative w-20 aspect-[4/3] shrink-0 overflow-hidden rounded-md bg-bg-deep">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={r.image} alt={r.title} className="size-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-text-primary line-clamp-2 group-hover:text-accent transition-colors">
                        {r.title}
                      </h4>
                      <div className="mt-1 text-[11px] text-text-muted">{new Date(r.publishedAt).toLocaleDateString("zh-TW")}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      {/* Related grid */}
      {related.length > 0 && (
        <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12 pb-12 lg:pb-16">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="section-title text-xs">CONTINUE READING</div>
              <h2 className="mt-2 font-display text-2xl lg:text-3xl font-extrabold text-text-primary">繼續閱讀相關報導</h2>
            </div>
            <Link href="/news" className="text-sm text-text-secondary hover:text-accent inline-flex items-center gap-1">
              所有新聞 <ChevronRight className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
            {related.map((r) => (
              <CardArticle key={r.id} item={r} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
