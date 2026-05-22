"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Plus, ChevronDown, MapPin } from "lucide-react";
import { useContent } from "@/lib/store/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

const TIMELINE_DEMO = [
  { time: "08:00", title: "蒸籠收尾，收束遠景", body: "清晨從茶園腳邊出發，先看蒸籠完工的最後一刻；蒸氣與晨霧交疊，是茶人最珍視的時刻。" },
  { time: "09:00", title: "漫步茶園", body: "跟著茶農走進梯田，學認小綠葉蟬與茶芽的關係。這是『東方美人茶』成名的開端。" },
  { time: "12:00", title: "午簡留白", body: "湖畔客家小館品嚐當日新鮮野菜、客家小炒，搭配在地擂茶。" },
  { time: "14:00", title: "品味慢活體驗", body: "與在地茶師學手作擂茶、書包款式茶具設計、買回家自製的茶包工藝體驗。" },
];

export default function LifeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const curations = useContent((s) => s.curations);
  const products = useContent((s) => s.products);
  const c = curations.find((x) => x.slug === slug);
  if (!c) notFound();

  const [openItem, setOpenItem] = useState<string | null>("09:00");
  const whereToNext = curations.filter((x) => x.id !== c.id).slice(0, 3);
  const moreList = curations.filter((x) => x.id !== c.id && x.category === c.category).slice(0, 4);
  const [exploreTab, setExploreTab] = useState<"商品" | "新聞" | "節氣">("商品");

  return (
    <>
      {/* Hero — image left wide + sidebar right with small image + green CTA */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12 pt-6 lg:pt-10">
        <div className="grid lg:grid-cols-12 gap-3 lg:gap-5">
          <div className="lg:col-span-9 relative card overflow-hidden">
            <div className="relative aspect-[16/10] lg:aspect-[16/9] overflow-hidden bg-bg-deep">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.cover} alt={c.title} className="size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/95 via-bg-deep/30 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 lg:inset-x-10 lg:bottom-10 max-w-2xl">
                <div className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold">{formatDate(c.publishedAt)} · {c.category}</div>
                <h1 className="mt-2 font-display text-3xl lg:text-5xl font-black text-text-primary leading-tight">{c.title}</h1>
                {c.subtitle && <p className="mt-2 text-text-secondary text-sm lg:text-base">{c.subtitle}</p>}
              </div>
            </div>
          </div>
          <aside className="lg:col-span-3 space-y-3">
            <div className="relative aspect-video lg:aspect-square overflow-hidden rounded-xl bg-bg-deep">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://picsum.photos/seed/${c.slug}-side/800/800`} alt="side" className="size-full object-cover" />
            </div>
            <div className="card p-5 bg-accent text-text-inverse border-accent">
              <div className="text-[11px] uppercase tracking-wider font-semibold opacity-80">客+ 會員優惠</div>
              <div className="mt-1 font-display text-3xl font-extrabold">85<span className="text-lg">折</span></div>
              <div className="mt-1 text-sm opacity-90">本期策展商品優惠</div>
              <button className="mt-4 inline-flex items-center gap-1 h-9 px-4 rounded-full bg-text-inverse text-accent font-semibold text-xs hover:opacity-90">
                立即兌換 <ChevronRight className="size-3.5" />
              </button>
            </div>
          </aside>
        </div>
      </section>

      {/* Centered title with green corner brackets */}
      <section className="py-12 lg:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center relative">
          <div className="absolute -top-4 left-0 w-12 h-12 border-l-2 border-t-2 border-accent rounded-tl-lg" />
          <div className="absolute -top-4 right-0 w-12 h-12 border-r-2 border-t-2 border-accent rounded-tr-lg" />
          <div className="absolute -bottom-4 left-0 w-12 h-12 border-l-2 border-b-2 border-accent rounded-bl-lg" />
          <div className="absolute -bottom-4 right-0 w-12 h-12 border-r-2 border-b-2 border-accent rounded-br-lg" />
          <p className="font-display text-2xl lg:text-3xl font-bold text-accent leading-relaxed">
            {c.title}
          </p>
          <p className="mt-3 text-text-secondary text-base lg:text-lg">{c.subtitle ?? "感受客家的日常節奏"}</p>
        </div>
      </section>

      {/* Long-form content */}
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-0 pb-12 lg:pb-16">
        <p className="text-lg lg:text-xl text-text-primary font-semibold leading-relaxed mb-8">{c.summary}</p>
        <div className="space-y-6 text-text-secondary text-base lg:text-lg leading-loose">
          {c.body.map((b, i) => {
            if (b.type === "heading") {
              return <h2 key={i} className="font-display text-2xl lg:text-3xl font-bold text-text-primary mt-10 mb-4">{b.content}</h2>;
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
            return <p key={i} className="leading-loose">{b.content}</p>;
          })}
        </div>

        {/* Timeline accordion at bottom */}
        <div className="mt-12 space-y-2">
          {TIMELINE_DEMO.map((item) => {
            const open = openItem === item.time;
            return (
              <div key={item.time} className="card overflow-hidden">
                <button onClick={() => setOpenItem(open ? null : item.time)} className="w-full text-left p-4 lg:p-5 flex items-center gap-4 hover:bg-bg-elevated transition-colors">
                  <Badge variant="default" className={open ? "bg-accent text-text-inverse border-accent" : ""}>{item.time}</Badge>
                  <span className="flex-1 font-semibold text-text-primary">{item.title}</span>
                  <ChevronDown className={`size-4 text-text-muted transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
                {open && <div className="px-4 lg:px-5 pb-5 border-t border-border pt-4 text-sm text-text-secondary leading-relaxed">{item.body}</div>}
              </div>
            );
          })}
        </div>
      </article>

      {/* WHERE TO NEXT — 2-3 large cards with tag overlay */}
      {whereToNext.length > 0 && (
        <section className="py-10 lg:py-14">
          <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12">
            <div className="flex items-end justify-between mb-6">
              <div>
                <div className="section-title text-[11px] lg:text-xs">WHERE TO NEXT</div>
                <h2 className="mt-2 font-display text-2xl lg:text-3xl font-extrabold text-text-primary">下一站去哪裡？</h2>
              </div>
              <div className="flex gap-1.5">
                <button className="size-9 rounded-full border border-border text-text-secondary hover:border-accent hover:text-accent flex items-center justify-center"><ChevronLeft className="size-4" /></button>
                <button className="size-9 rounded-full border border-border text-text-secondary hover:border-accent hover:text-accent flex items-center justify-center"><ChevronRight className="size-4" /></button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5">
              {whereToNext.map((n) => (
                <Link key={n.id} href={`/life/${n.slug}`} className="group block card overflow-hidden hover:border-accent transition-colors">
                  <div className="relative aspect-[5/3] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={n.cover} alt={n.title} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <Badge variant="default" className="bg-accent text-text-inverse border-accent">商品</Badge>
                      <Badge variant="default" className="bg-accent text-text-inverse border-accent">食譜</Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-bold text-text-primary line-clamp-2 group-hover:text-accent transition-colors">{n.title}</h3>
                    <p className="mt-1 text-xs text-text-muted line-clamp-2">{n.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EXPLORE MORE — tabs + horizontal list */}
      <section className="py-10 lg:py-14">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
            <div>
              <div className="section-title text-[11px] lg:text-xs">EXPLORE MORE</div>
              <h2 className="mt-2 font-display text-2xl lg:text-3xl font-extrabold text-text-primary">延伸探索</h2>
            </div>
            <div className="flex items-center gap-1.5">
              {(["商品", "新聞", "節氣"] as const).map((t) => (
                <button key={t} onClick={() => setExploreTab(t)} className={`h-8 px-3 rounded-full text-xs font-semibold border transition-colors ${exploreTab === t ? "bg-accent text-text-inverse border-accent" : "border-border text-text-secondary hover:text-text-primary"}`}>{t}</button>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-2 lg:gap-3 max-w-5xl mx-auto">
            {products.slice(0, 4).map((p) => (
              <Link key={p.id} href={`/shop/${p.id}`} className="group flex items-center gap-3 card p-3 hover:border-accent transition-colors">
                <div className="relative w-20 aspect-square shrink-0 overflow-hidden rounded-md bg-bg-deep">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.name} loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Badge variant="warm">商品</Badge>
                    <span className="text-[11px] text-text-muted">MAY 5, 2026</span>
                  </div>
                  <h4 className="mt-1 text-sm font-semibold text-text-primary line-clamp-1 group-hover:text-accent transition-colors">{p.name}</h4>
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

      {/* JOIN US! green banner with corner brackets */}
      <section className="py-10 lg:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 relative">
          <div className="absolute -top-3 -left-3 w-16 h-16 border-l-2 border-t-2 border-accent rounded-tl-2xl pointer-events-none" />
          <div className="absolute -top-3 -right-3 w-16 h-16 border-r-2 border-t-2 border-accent rounded-tr-2xl pointer-events-none" />
          <div className="absolute -bottom-3 -left-3 w-16 h-16 border-l-2 border-b-2 border-accent rounded-bl-2xl pointer-events-none" />
          <div className="absolute -bottom-3 -right-3 w-16 h-16 border-r-2 border-b-2 border-accent rounded-br-2xl pointer-events-none" />
          <div className="card p-10 lg:p-14 text-center bg-bg-elevated">
            <h2 className="font-display text-3xl lg:text-5xl font-extrabold text-accent">JOIN US!</h2>
            <p className="mt-3 text-text-secondary text-sm lg:text-base max-w-md mx-auto">
              加入會員，享有更多會員專屬內容，<br />
              將最新的內容信件第一時間送達。
            </p>
            <Button className="mt-6" size="lg" asChild>
              <Link href="/register">立即加入會員</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Bottom: more curations */}
      {moreList.length > 0 && (
        <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12 pb-12">
          <h3 className="font-display text-xl lg:text-2xl font-bold text-text-primary mb-4">同類型策展</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
            {moreList.map((m) => (
              <Link key={m.id} href={`/life/${m.slug}`} className="group card overflow-hidden hover:border-accent transition-colors">
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.cover} alt={m.title} loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
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
