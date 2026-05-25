"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useContent } from "@/lib/store/content";

/* ─────────────────────────────────────────────────────────────
   Reusable SectionTitle
   ───────────────────────────────────────────────────────────── */
function SectionTitle({ en, cn, align = "center" }: { en: string; cn: string; align?: "center" | "left" }) {
  return (
    <div className={`section-header${align === "left" ? " section-header-left" : ""}`}>
      <h2 className="eyebrow" style={{ whiteSpace: "pre-line" }}>{en}</h2>
      <div className="section-title-cn">{cn}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   FRESH CONTENTS — 熱門精選 (5 mint poster cards)
   ───────────────────────────────────────────────────────────── */
export function SectionFresh() {
  const videos = useContent((s) => s.videos);
  const items = videos.slice(0, 5).map((v) => ({
    title: v.title,
    views: `${(v.viewCount / 1000).toFixed(1)}K views`,
    kind: v.category,
    img: v.hero,
    slug: v.slug,
  }));

  return (
    <section className="fc-section">
      <div className="fc-wrap">
        <SectionTitle en={"FRESH\nCONTENTS"} cn="熱門精選" />

        <div className="fc-row">
          {items.map((it, i) => (
            <Link href={`/watch/${it.slug}`} className="fc-card" key={i}>
              <div className="fc-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.img} alt="" />
              </div>
              <div className="fc-card-meta">
                <div className="fc-card-title">{it.title}</div>
                <div className="fc-card-views">{it.views}</div>
                <span className="fc-card-tag">{it.kind}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="fc-nav">
          <button className="circle-nav" aria-label="上一頁">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <button className="circle-nav" aria-label="下一頁">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      <style>{`
        .fc-section { padding: 180px 32px; background: var(--bg-base); }
        .fc-wrap { max-width: var(--max-w); margin: 0 auto; display: flex; flex-direction: column; gap: 60px; align-items: center; }
        .fc-row { width: 100%; display: flex; gap: 20px; overflow-x: auto; padding: 0 24px; scroll-snap-type: x mandatory; scrollbar-width: none; }
        .fc-row::-webkit-scrollbar { display: none; }
        .fc-card { flex: 0 0 280px; aspect-ratio: 280 / 380; border-radius: 24px; background: var(--accent-mint); padding: 8px; display: flex; flex-direction: column; gap: 16px; color: rgb(2, 39, 24); scroll-snap-align: start; transition: transform var(--dur-base) var(--ease-out-expo); text-decoration: none; }
        .fc-card:hover { transform: translateY(-4px); }
        .fc-img { width: 100%; aspect-ratio: 4/3; overflow: hidden; border-radius: 16px; background: rgba(2,39,24,0.15); }
        .fc-img img { width: 100%; height: 100%; object-fit: cover; }
        .fc-card-meta { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 4px 8px 8px; text-align: center; }
        .fc-card-title { font-family: var(--font-mono); font-weight: 700; font-size: calc(22px * var(--type-scale)); letter-spacing: 1px; color: rgb(2, 39, 24); line-height: 1.15; }
        .fc-card-views { font-family: var(--font-condensed); font-size: 14px; color: rgba(2, 39, 24, 0.7); }
        .fc-card-tag { margin-top: auto; padding: 6px 14px; border: 1px solid rgba(2, 39, 24, 0.4); border-radius: 999px; font-family: var(--font-mono); font-weight: 700; font-size: 13px; letter-spacing: 0.5px; color: rgb(2, 39, 24); }
        .fc-nav { display: flex; gap: 12px; }
        @media (max-width: 900px) { .fc-section { padding: 80px 0; } .fc-card { flex-basis: 220px; } .fc-card-title { font-size: 18px; } }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Reusable poster card row (used for Stories + Headlines)
   ───────────────────────────────────────────────────────────── */
function PosterRow({ items, label, hrefBase = "/watch" }: { items: { title: string; img: string; slug?: string }[]; label: string; hrefBase?: string }) {
  const railRef = useRef<HTMLDivElement>(null);
  const scroll = (dx: number) => railRef.current?.scrollBy({ left: dx, behavior: "smooth" });

  return (
    <div className="poster-row-wrap" aria-label={label}>
      <div className="poster-row" ref={railRef}>
        {items.map((it, i) => (
          <Link className="poster-card" href={it.slug ? `${hrefBase}/${it.slug}` : hrefBase} key={i}>
            <div className="poster-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={it.img} alt="" />
            </div>
            <div className="poster-title">{it.title}</div>
          </Link>
        ))}
      </div>
      <button className="poster-nav poster-nav-prev" onClick={() => scroll(-280)} aria-label="向左">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M15 5l-7 7 7 7" /></svg>
      </button>
      <button className="poster-nav poster-nav-next" onClick={() => scroll(280)} aria-label="向右">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M9 5l7 7-7 7" /></svg>
      </button>
      <style>{`
        .poster-row-wrap { position: relative; width: 100%; }
        .poster-row { display: flex; gap: 20px; padding: 0 60px; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; }
        .poster-row::-webkit-scrollbar { display: none; }
        .poster-card { flex: 0 0 240px; display: flex; flex-direction: column; gap: 12px; scroll-snap-align: start; color: inherit; transition: transform var(--dur-base) var(--ease-out-expo); text-decoration: none; }
        .poster-card:hover { transform: translateY(-4px); }
        .poster-img { aspect-ratio: 3/4; overflow: hidden; border-radius: 8px; background: var(--bg-elevated); position: relative; }
        .poster-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 600ms var(--ease-out-expo); }
        .poster-card:hover .poster-img img { transform: scale(1.06); }
        .poster-title { font-family: var(--font-mono); font-weight: 700; font-size: calc(18px * var(--type-scale)); letter-spacing: 1px; color: var(--text-primary); text-align: center; line-height: 1.2; }
        .poster-nav { position: absolute; top: 50%; transform: translateY(-50%); width: 64px; height: 64px; border-radius: 50%; background: rgba(83,225,161,0.2); color: #fff; display: inline-flex; align-items: center; justify-content: center; transition: all var(--dur-fast) ease; z-index: 2; border: 0; cursor: pointer; }
        .poster-nav:hover { background: var(--accent-mint); color: rgb(8,20,16); }
        .poster-nav-prev { left: -8px; }
        .poster-nav-next { right: -8px; }
        @media (max-width: 900px) { .poster-row { padding: 0 20px; } .poster-card { flex-basis: 160px; } .poster-nav { width: 44px; height: 44px; } }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   STORIES WORTH STAYING FOR — 值得你留下來的故事
   ───────────────────────────────────────────────────────────── */
export function SectionStories() {
  const videos = useContent((s) => s.videos);
  const items = videos.filter((v) => v.category === "戲劇" || v.category === "紀錄片").slice(0, 7)
    .map((v) => ({ title: v.title, img: v.poster, slug: v.slug }));

  return (
    <section className="st-section">
      <SectionTitle en="STORIES WORTH STAYING FOR" cn="值得你留下來的故事" />
      <PosterRow items={items} label="值得你留下來的故事" hrefBase="/watch" />
      <style>{`
        .st-section { padding: 120px 40px; background: var(--bg-base); display: flex; flex-direction: column; gap: 60px; align-items: center; }
        @media (max-width: 900px) { .st-section { padding: 64px 0; gap: 36px; } }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   LIVE THE HAKKA WAY — 跟著客家過生活
   ───────────────────────────────────────────────────────────── */
export function SectionLifeWay() {
  const curations = useContent((s) => s.curations);
  const tabs = ["全部", "旅遊", "節慶", "工藝", "飲食"] as const;
  const [tab, setTab] = useState<(typeof tabs)[number]>("全部");

  const items = (tab === "全部" ? curations : curations.filter((c) => c.category === tab))
    .slice(0, 3)
    .map((c, i) => ({ tag: c.category, title: c.title, img: c.cover, slug: c.slug, idx: i }));

  return (
    <section className="hw-section">
      <div className="hw-wrap">
        <div className="hw-left">
          <SectionTitle en="LIVE THE HAKKA WAY" cn="跟著客家過生活" align="left" />
          <div className="hw-nav-row">
            <button className="circle-nav" aria-label="上一頁">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M15 5l-7 7 7 7" /></svg>
            </button>
            <button className="circle-nav" aria-label="下一頁">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
        <div className="hw-right">
          <div className="hw-tabs" role="tablist">
            {tabs.map((t) => (
              <button key={t} className={`hw-tab ${t === tab ? "is-on" : ""}`} role="tab" aria-selected={t === tab} onClick={() => setTab(t)}>{t}</button>
            ))}
          </div>
          <ul className="hw-list" key={tab}>
            {items.map((it, i) => (
              <li key={i} className="hw-item">
                <Link className="hw-item-link" href={`/life/${it.slug}`}>
                  <div className="hw-item-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={it.img} alt="" />
                  </div>
                  <div className="hw-item-meta">
                    <div className="hw-item-tag-row">
                      <span className="hw-item-tag">{it.tag}</span>
                      <span className="hw-item-dot">·</span>
                      <span className="hw-item-date">FEB {1 + i * 4}, 2026</span>
                    </div>
                    <div className="hw-item-title">{it.title}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        .hw-section { padding: 64px 40px; background: var(--bg-base); }
        .hw-wrap { max-width: var(--max-w); margin: 0 auto; display: grid; grid-template-columns: 1fr 1.2fr; gap: 64px; padding: 40px; border-radius: 32px; border: 1px solid rgba(83,225,161,0.5); align-items: stretch; }
        .hw-left { display: flex; flex-direction: column; justify-content: space-between; gap: 32px; }
        .hw-nav-row { display: flex; gap: 12px; }
        .hw-right { display: flex; flex-direction: column; gap: 28px; }
        .hw-tabs { display: inline-flex; gap: 12px; align-self: center; }
        .hw-tab { padding: 9px 22px; min-height: var(--tap-min); border-radius: 999px; background: transparent; color: var(--text-secondary); font-family: var(--font-display); font-weight: 500; font-size: calc(15px * var(--type-scale)); transition: all var(--dur-fast) ease; border: 0; cursor: pointer; }
        .hw-tab:hover { color: var(--text-primary); background: rgba(255,255,255,0.04); }
        .hw-tab.is-on { background: var(--accent-mint); color: rgb(8,20,16); font-weight: 700; }
        .hw-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; animation: hw-fade 400ms var(--ease-out-expo); }
        @keyframes hw-fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .hw-item { border-bottom: 1px solid rgba(255,255,255,0.1); }
        .hw-item:last-child { border-bottom: 0; }
        .hw-item-link { display: grid; grid-template-columns: 120px 1fr; gap: 20px; padding: 18px 0; align-items: center; color: inherit; transition: transform var(--dur-fast) ease; text-decoration: none; }
        .hw-item-link:hover { transform: translateX(6px); }
        .hw-item-thumb { width: 120px; aspect-ratio: 1; overflow: hidden; border-radius: 8px; background: var(--bg-elevated); }
        .hw-item-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .hw-item-meta { display: flex; flex-direction: column; gap: 10px; min-width: 0; }
        .hw-item-tag-row { display: flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 13px; color: var(--text-muted); }
        .hw-item-tag { color: rgba(83, 225, 161, 0.9); font-weight: 700; }
        .hw-item-dot { opacity: 0.4; }
        .hw-item-title { font-family: var(--font-mono); font-weight: 700; font-size: calc(18px * var(--type-scale)); color: var(--text-primary); line-height: 1.35; letter-spacing: 0.5px; }
        @media (max-width: 900px) { .hw-section { padding: 32px 16px; } .hw-wrap { grid-template-columns: 1fr; gap: 32px; padding: 24px; border-radius: 20px; } .hw-item-link { grid-template-columns: 88px 1fr; gap: 14px; padding: 14px 0; } .hw-item-thumb { width: 88px; } .hw-item-title { font-size: 15px; } }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   HAKKA HEADLINES — 客庄大小事
   ───────────────────────────────────────────────────────────── */
export function SectionHeadlines() {
  const news = useContent((s) => s.news);
  const cards = news.slice(0, 7).map((n) => ({ title: n.title, img: n.image, slug: n.slug }));
  while (cards.length < 7 && cards.length > 0) cards.push(cards[cards.length % news.length]);

  return (
    <section className="hd-section">
      <SectionTitle en="HAKKA HEADLINES" cn="客庄大小事" />
      <PosterRow items={cards.slice(0, 7)} label="客庄大小事" hrefBase="/news" />
      <style>{`
        .hd-section { padding: 120px 40px; background: var(--bg-base); display: flex; flex-direction: column; gap: 60px; align-items: center; }
        @media (max-width: 900px) { .hd-section { padding: 64px 0; gap: 36px; } }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   HAKKA LIFE — mint background + spinning white circle + 3 reels
   ───────────────────────────────────────────────────────────── */
export function SectionIntoLife() {
  const curations = useContent((s) => s.curations);
  const reels = curations.slice(0, 3).map((c) => ({ title: c.title, img: c.cover, slug: c.slug }));

  if (reels.length < 3) return null;

  return (
    <section className="hl-section">
      <div className="hl-wrap">
        <div className="hl-left">
          <div className="hl-circle">
            <span className="hl-circle-title">HAKKA<br />LIFE</span>
          </div>
          <div className="hl-tags">
            <Link className="hl-tag" href="/life"># 旅遊探索</Link>
            <Link className="hl-tag" href="/life"># 在地文化</Link>
            <Link className="hl-tag" href="/life"># 深度體驗</Link>
          </div>
        </div>

        <div className="hl-reels">
          {reels.map((r, i) => (
            <Link className="hl-reel" href={`/life/${r.slug}`} key={i}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.img} alt="" />
              <div className="hl-reel-overlay">
                <span className="hl-reel-tag">SHORTS · 60s</span>
                <div className="hl-reel-title">{r.title}</div>
              </div>
              <span className="hl-reel-play" aria-label="播放">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5l12 7-12 7V5z" /></svg>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .hl-section { background: var(--accent-mint); padding: 120px 40px; overflow: hidden; }
        .hl-wrap { max-width: 1440px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        .hl-left { display: flex; flex-direction: column; align-items: center; gap: 40px; }
        .hl-circle { width: 360px; height: 360px; border-radius: 50%; background: #fff; display: flex; align-items: center; justify-content: center; position: relative; box-shadow: 0 24px 60px rgba(0,0,0,0.15); animation: hl-circle-rotate 16s linear infinite; }
        @keyframes hl-circle-rotate { from { transform: rotate(-15deg); } 50% { transform: rotate(5deg); } to { transform: rotate(-15deg); } }
        .hl-circle-title { font-family: var(--font-condensed); font-weight: 700; font-size: 80px; line-height: 0.85; letter-spacing: -0.01em; color: rgb(8, 20, 16); text-align: center; transform: rotate(15deg); }
        .hl-tags { display: inline-flex; gap: 18px; flex-wrap: wrap; justify-content: center; }
        .hl-tag { font-family: var(--font-mono); font-weight: 700; font-size: calc(16px * var(--type-scale)); color: rgb(8, 20, 16); transition: opacity var(--dur-fast) ease; text-decoration: none; }
        .hl-tag:hover { opacity: 0.6; }
        .hl-reels { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; height: 560px; align-items: center; }
        .hl-reel { position: relative; height: 100%; aspect-ratio: 9/16; max-height: 560px; border-radius: 16px; overflow: hidden; background: rgb(8,20,16); color: #fff; transition: transform var(--dur-base) var(--ease-out-expo); text-decoration: none; }
        .hl-reel:nth-child(2) { transform: translateY(-12px); }
        .hl-reel:hover { transform: translateY(-6px); }
        .hl-reel:nth-child(2):hover { transform: translateY(-18px); }
        .hl-reel img { width: 100%; height: 100%; object-fit: cover; }
        .hl-reel-overlay { position: absolute; left: 0; right: 0; bottom: 0; padding: 16px; background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 100%); display: flex; flex-direction: column; gap: 6px; }
        .hl-reel-tag { font-family: var(--font-mono); font-size: 10px; font-weight: 700; letter-spacing: 0.14em; color: var(--accent-mint); }
        .hl-reel-title { font-family: var(--font-mono); font-weight: 700; font-size: 14px; color: #fff; }
        .hl-reel-play { position: absolute; right: 12px; top: 12px; width: 36px; height: 36px; border-radius: 50%; background: rgba(0,0,0,0.4); backdrop-filter: blur(8px); color: #fff; display: inline-flex; align-items: center; justify-content: center; transition: all var(--dur-fast) ease; }
        .hl-reel-play:hover { background: var(--accent-mint); color: rgb(8,20,16); }
        @media (max-width: 900px) { .hl-section { padding: 64px 16px; } .hl-wrap { grid-template-columns: 1fr; gap: 40px; } .hl-circle { width: 220px; height: 220px; } .hl-circle-title { font-size: 52px; } .hl-reels { grid-template-columns: repeat(3, 1fr); gap: 8px; height: 360px; } }
      `}</style>
    </section>
  );
}
