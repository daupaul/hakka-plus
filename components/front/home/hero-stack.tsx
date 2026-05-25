"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useContent } from "@/lib/store/content";

/**
 * Style A Hero — 3-card row with center mint-bordered poster.
 * Direct port of /Users/paul/Downloads/Hakka_/components/Hero.jsx
 */
export function HeroStack() {
  const videos = useContent((s) => s.videos);

  // Synthesize 3 hero slides from featured videos.
  const heroData = (() => {
    const feat = videos.filter((v) => v.featured).slice(0, 3);
    if (feat.length === 0) return [];
    while (feat.length < 3) feat.push(feat[0]);
    return feat.map((v, i) => ({
      id: `h-${v.id}`,
      title: v.title,
      en: v.titleEn ?? v.title,
      img: v.hero,
      kind: v.category,
      ep: `共 ${v.episodeCount} 集`,
      slug: v.slug,
      featured: i === 1,
    }));
  })();

  const [idx, setIdx] = useState(1);
  const total = heroData.length;

  useEffect(() => {
    if (total === 0) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % total), 8000);
    return () => clearInterval(t);
  }, [total]);

  if (heroData.length === 0) return null;

  const goPrev = () => setIdx((i) => (i - 1 + total) % total);
  const goNext = () => setIdx((i) => (i + 1) % total);

  const featured = heroData[idx];
  const prev = heroData[(idx - 1 + total) % total];
  const next = heroData[(idx + 1) % total];

  return (
    <section className="hero-section" aria-label="精選首播">
      <div className="hero-bg-tint" key={featured.id} />

      <div className="hero-stage">
        <button className="hero-side hero-side-prev" onClick={goPrev} aria-label={`上一部 — ${prev.title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={prev.img} alt="" />
          <span className="hero-side-tag">{prev.kind}</span>
          <span className="hero-side-title">{prev.title}</span>
        </button>

        <div className="hero-center" key={featured.id}>
          <Link href={`/watch/${featured.slug}`} className="hero-poster">
            <span className="hero-poster-tag">{featured.kind}</span>
            <h1 className="hero-poster-title">{featured.title}</h1>
            <div className="hero-poster-en">{featured.en}</div>

            <div className="hero-poster-thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={featured.img} alt="" />
              <div className="hero-poster-thumb-grad" />
            </div>

            <span className="hero-poster-play" aria-label={`播放 ${featured.title}`}>
              <svg width="28" height="28" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                <path d="M11 8l14 8-14 8V8z" />
              </svg>
            </span>
          </Link>
        </div>

        <button className="hero-side hero-side-next" onClick={goNext} aria-label={`下一部 — ${next.title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={next.img} alt="" />
          <span className="hero-side-tag">{next.kind}</span>
          <span className="hero-side-title">{next.title}</span>
        </button>
      </div>

      <div className="hero-strip">
        <div className="hero-strip-meta">
          <span className="hero-strip-ep">EP.07</span>
          <span className="hero-strip-dot" />
          <span className="hero-strip-season">{featured.ep}</span>
          <span className="hero-strip-dot" />
          <span className="hero-strip-counter">
            {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
        <Link href={`/watch/${featured.slug}`} className="hero-strip-cta">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M3 8h10m-4-4l4 4-4 4" />
          </svg>
          <span>立刻收看</span>
        </Link>
      </div>

      <style>{`
        .hero-section { position: relative; width: 100%; padding: 142px 0 60px; background: var(--bg-base); color: var(--text-primary); overflow: hidden; }
        .hero-bg-tint { position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); width: 1200px; height: 700px; border-radius: 50%; background: radial-gradient(ellipse, rgba(83,225,161,0.18) 0%, rgba(83,225,161,0) 70%); filter: blur(60px); pointer-events: none; animation: hero-tint-fade 1.2s var(--ease-out-expo); animation-fill-mode: both; }
        @keyframes hero-tint-fade { from { opacity: 0; } to { opacity: 1; } }
        .hero-stage { position: relative; width: 100%; height: 540px; display: grid; grid-template-columns: 1fr 440px 1fr; gap: 20px; align-items: center; padding: 0 32px; max-width: 1440px; margin: 0 auto; z-index: 2; }
        .hero-side { position: relative; height: 480px; max-width: 400px; justify-self: center; border-radius: 24px; overflow: hidden; padding: 0; color: #fff; cursor: pointer; background: rgb(36,42,40); transition: transform var(--dur-base) var(--ease-out-expo); opacity: 0.75; border: 0; }
        .hero-side-prev { justify-self: end; width: 320px; }
        .hero-side-next { justify-self: start; width: 400px; }
        .hero-side img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: saturate(0.95) contrast(0.95); }
        .hero-side::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.85) 100%); }
        .hero-side:hover { opacity: 1; transform: translateY(-2px); }
        .hero-side-tag { position: absolute; top: 20px; left: 20px; z-index: 2; padding: 5px 10px; background: rgba(0,0,0,0.5); backdrop-filter: blur(8px); font-family: var(--font-mono); font-size: 11px; font-weight: 700; letter-spacing: 0.14em; color: var(--accent-mint); border: 1px solid rgba(83,225,161,0.5); border-radius: 4px; }
        .hero-side-title { position: absolute; bottom: 24px; left: 24px; right: 24px; z-index: 2; font-family: var(--font-display); font-weight: 700; font-size: calc(22px * var(--type-scale)); line-height: 1.2; color: #fff; text-align: left; }
        .hero-center { width: 440px; height: 520px; justify-self: center; }
        .hero-poster { display: flex; position: relative; width: 100%; height: 100%; border-radius: 24px; background: var(--accent-mint); padding: 28px 32px; flex-direction: column; gap: 12px; overflow: hidden; box-shadow: 0 24px 60px rgba(83,225,161,0.25), 0 0 0 1px rgba(83,225,161,0.5); animation: hero-poster-in 800ms var(--ease-out-expo); animation-fill-mode: both; }
        @keyframes hero-poster-in { from { transform: translateY(12px) scale(0.98); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }
        .hero-poster-tag { align-self: center; padding: 6px 16px; font-family: var(--font-mono); font-weight: 500; font-size: 14px; letter-spacing: 0.06em; color: rgb(24,24,24); background: rgba(2,49,30,0.14); border-radius: 12px; }
        .hero-poster-title { margin: 0; font-family: var(--font-display); font-weight: 700; font-size: clamp(48px, 5vw, 72px); line-height: 1.05; letter-spacing: -0.02em; color: rgb(8,20,16); text-align: center; text-wrap: balance; }
        .hero-poster-en { font-family: var(--font-sans-display); font-size: 16px; font-weight: 400; letter-spacing: 0.04em; color: rgba(2,49,30,0.6); text-align: center; }
        .hero-poster-thumb { margin-top: auto; width: 100%; aspect-ratio: 16/9; overflow: hidden; border-radius: 12px; position: relative; background: rgb(8,20,16); }
        .hero-poster-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .hero-poster-thumb-grad { position: absolute; inset: 0; background: linear-gradient(to top, rgba(8,20,16,0.65) 0%, rgba(8,20,16,0) 60%); }
        .hero-poster-play { position: absolute; right: 24px; top: 24px; width: 56px; height: 56px; border-radius: 50%; background: rgb(8,20,16); color: var(--accent-mint); display: inline-flex; align-items: center; justify-content: center; transition: all var(--dur-fast) ease; z-index: 3; }
        .hero-poster-play:hover { background: #fff; color: rgb(8,20,16); transform: scale(1.08); }
        .hero-strip { margin: 40px auto 0; max-width: 1280px; padding: 0 32px; display: flex; justify-content: space-between; align-items: center; gap: 16px; position: relative; z-index: 2; }
        .hero-strip-meta { display: inline-flex; align-items: center; gap: 14px; font-family: var(--font-mono); font-size: 14px; color: rgba(255,255,255,0.7); }
        .hero-strip-ep { color: var(--accent-mint); font-weight: 600; }
        .hero-strip-season { color: rgba(255,255,255,0.75); }
        .hero-strip-counter { color: rgba(255,255,255,0.85); font-weight: 700; }
        .hero-strip-dot { width: 4px; height: 4px; border-radius: 50%; background: rgba(255,255,255,0.3); }
        .hero-strip-cta { display: inline-flex; align-items: center; gap: 8px; padding: 0 22px; min-height: 44px; border-radius: 999px; background: rgb(192,90,60); color: #fff; font-family: var(--font-display); font-weight: 500; font-size: calc(14px * var(--type-scale)); transition: all var(--dur-fast) ease; }
        .hero-strip-cta:hover { background: var(--accent-mint); color: rgb(8,20,16); }
        @media (max-width: 1100px) { .hero-stage { grid-template-columns: 1fr 360px 1fr; height: 480px; } .hero-center { width: 360px; height: 460px; } .hero-side-prev { width: 220px; height: 380px; } .hero-side-next { width: 260px; height: 380px; } .hero-poster-title { font-size: clamp(40px, 6vw, 56px); } }
        @media (max-width: 768px) { .hero-section { padding: 116px 0 32px; } .hero-stage { grid-template-columns: 1fr; height: auto; gap: 12px; padding: 0 16px; } .hero-side { display: none; } .hero-center { width: 100%; height: 460px; } .hero-strip { flex-direction: column; align-items: stretch; gap: 12px; padding: 0 16px; } }
      `}</style>
    </section>
  );
}
