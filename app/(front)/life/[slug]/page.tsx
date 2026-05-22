"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, MapPin, Heart } from "lucide-react";
import { useContent } from "@/lib/store/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardVideo } from "@/components/ui/card-video";

export default function LifeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const curations = useContent((s) => s.curations);
  const videos = useContent((s) => s.videos);
  const products = useContent((s) => s.products);
  const c = curations.find((x) => x.slug === slug);
  if (!c) notFound();

  const relatedVideos = videos.filter((v) => c.relatedVideos.includes(v.id));
  const relatedProducts = products.filter((p) => c.relatedProducts.includes(p.id));
  const moreCurations = curations.filter((x) => x.id !== c.id && x.category === c.category).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[60vh] lg:h-[70vh] overflow-hidden bg-bg-deep">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.cover} alt={c.title} className="size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 lg:p-12">
            <div className="mx-auto max-w-4xl">
              <Badge variant="warm">{c.category}</Badge>
              <h1 className="mt-3 font-display text-3xl lg:text-6xl font-black tracking-tight text-text-primary leading-tight">
                {c.title}
              </h1>
              {c.subtitle && <p className="mt-3 text-text-secondary text-base lg:text-lg">{c.subtitle}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* Long-form */}
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-0 py-12 lg:py-16">
        <p className="text-lg lg:text-xl text-text-primary font-semibold leading-relaxed mb-8">
          {c.summary}
        </p>
        <div className="space-y-6 text-text-secondary text-base lg:text-lg leading-loose">
          {c.body.map((b, i) => {
            if (b.type === "heading") {
              return (
                <h2 key={i} className="font-display text-2xl lg:text-3xl font-bold text-text-primary mt-10 mb-4">
                  {b.content}
                </h2>
              );
            }
            if (b.type === "image") {
              return (
                <figure key={i} className="my-8 -mx-4 lg:mx-0">
                  <div className="relative aspect-video lg:aspect-[16/9] overflow-hidden rounded-xl bg-bg-deep">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={b.content} alt={b.caption ?? ""} className="size-full object-cover" />
                  </div>
                  {b.caption && <figcaption className="mt-2 text-sm text-text-muted text-center">{b.caption}</figcaption>}
                </figure>
              );
            }
            if (b.type === "quote") {
              return (
                <blockquote key={i} className="pl-6 border-l-4 border-accent my-6">
                  <p className="text-lg lg:text-xl font-display text-text-primary leading-relaxed italic">{b.content}</p>
                </blockquote>
              );
            }
            return (
              <p key={i} className="leading-loose">
                {b.content}
              </p>
            );
          })}
        </div>

        {/* Locations */}
        {c.locations && c.locations.length > 0 && (
          <div className="mt-12 card p-5">
            <div className="section-title text-xs">LOCATIONS · 地圖標記</div>
            <ul className="mt-3 space-y-3">
              {c.locations.map((l) => (
                <li key={l.id} className="flex items-start gap-3">
                  <MapPin className="size-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-text-primary">{l.name}</div>
                    {l.description && <div className="text-sm text-text-secondary">{l.description}</div>}
                    <div className="text-xs text-text-muted mt-1 font-mono">{l.lat.toFixed(4)}, {l.lng.toFixed(4)}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tags */}
        <div className="mt-10 pt-6 border-t border-border">
          <div className="text-xs text-text-muted mb-2">議題標籤</div>
          <div className="flex flex-wrap gap-1.5">
            {c.tags.map((t) => (
              <Link key={t} href={`/search?q=${encodeURIComponent(t)}`} className="text-xs px-2.5 py-1 rounded-full bg-bg-elevated border border-border text-text-secondary hover:border-accent hover:text-accent">
                #{t}
              </Link>
            ))}
          </div>
        </div>
      </article>

      {/* Where to Next - Related products */}
      {relatedProducts.length > 0 && (
        <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12 py-10">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="section-title text-xs">WHERE TO NEXT</div>
              <h2 className="mt-2 font-display text-2xl lg:text-3xl font-extrabold text-text-primary">把策展帶回家</h2>
            </div>
            <Link href="/shop" className="text-sm text-text-secondary hover:text-accent inline-flex items-center gap-1">
              客家選物 <ChevronRight className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5">
            {relatedProducts.map((p) => (
              <Link key={p.id} href={`/shop/${p.id}`} className="group card overflow-hidden hover:border-accent transition-colors">
                <div className="relative aspect-square overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.name} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <Badge variant="muted" className="absolute top-2 left-2">{p.externalPlatform}</Badge>
                </div>
                <div className="p-3">
                  <div className="text-[10px] uppercase text-text-muted tracking-wider">{p.category}</div>
                  <h4 className="mt-1 text-sm font-semibold text-text-primary line-clamp-2 group-hover:text-accent">{p.name}</h4>
                  <div className="mt-1.5 text-sm font-display font-bold text-accent">NT${p.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Explore More - related videos */}
      {relatedVideos.length > 0 && (
        <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12 py-10">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="section-title text-xs">EXPLORE MORE</div>
              <h2 className="mt-2 font-display text-2xl lg:text-3xl font-extrabold text-text-primary">繼續觀看相關影視</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5">
            {relatedVideos.map((v) => (
              <CardVideo key={v.id} video={v} />
            ))}
          </div>
        </section>
      )}

      {/* JOIN US */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12 py-10 lg:py-16">
        <div className="card p-8 lg:p-14 text-center bg-gradient-to-br from-accent/15 via-bg-elevated to-bg-elevated">
          <Heart className="size-10 mx-auto text-accent" />
          <h2 className="mt-4 font-display text-3xl lg:text-5xl font-extrabold text-text-primary">JOIN US</h2>
          <p className="mt-3 text-text-secondary text-sm lg:text-base max-w-md mx-auto">
            訂閱「{c.category}」主題，下一篇策展上線時，第一個收到通知。
          </p>
          <Button className="mt-6" size="lg" asChild>
            <Link href="/themes">設定主題訂閱</Link>
          </Button>
        </div>
      </section>

      {/* More curations */}
      {moreCurations.length > 0 && (
        <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12 pb-12">
          <h3 className="font-display text-xl lg:text-2xl font-bold text-text-primary mb-4">同類型策展</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-5">
            {moreCurations.map((m) => (
              <Link key={m.id} href={`/life/${m.slug}`} className="group card overflow-hidden hover:border-accent transition-colors">
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.cover} alt={m.title} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-3 lg:p-4">
                  <div className="text-xs text-text-muted">{m.category}</div>
                  <h4 className="mt-1 font-semibold text-text-primary line-clamp-2 group-hover:text-accent transition-colors">{m.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
