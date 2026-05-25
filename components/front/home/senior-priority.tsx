"use client";

import Link from "next/link";
import { useContent } from "@/lib/store/content";
import { useSeniorMode } from "@/lib/store/senior-mode";

/**
 * 長輩友善模式首頁優先版位 — 對應提案 §1.5 L1-J 第 3、4 項規格：
 * 「節目表 + 新聞優先 / 凸顯主功能 / 隱藏複雜推薦區」。
 * Only renders when senior mode is enabled.
 */
const SCHEDULE_TODAY = [
  { time: "19:00", title: "客家新聞 整點", channel: "CH 17" },
  { time: "20:00", title: "蒼蠅歌手 EP.07", channel: "CH 17" },
  { time: "21:00", title: "鬧熱打擂台", channel: "CH 17" },
  { time: "22:00", title: "客家樂事 — 一日客庄滿月圓", channel: "CH 17" },
];

export function SeniorPriority() {
  const senior = useSeniorMode((s) => s.enabled);
  const news = useContent((s) => s.news);
  if (!senior) return null;

  const top = [...news]
    .filter((n) => n.status === "published")
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  return (
    <section className="sp-section" aria-label="長輩友善 — 節目表與新聞優先">
      <div className="sp-wrap">
        {/* TOP — Today's schedule */}
        <div className="sp-card">
          <header className="sp-card-head">
            <span className="sp-badge">即時 · 客家電視</span>
            <h2 className="sp-card-title">今日節目表</h2>
            <Link href="/schedule" className="sp-more">完整節目表 →</Link>
          </header>
          <ul className="sp-list">
            {SCHEDULE_TODAY.map((p, i) => (
              <li key={i} className="sp-row">
                <span className="sp-time">{p.time}</span>
                <span className="sp-title">{p.title}</span>
                <span className="sp-channel">{p.channel}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* BOTTOM — Latest news */}
        <div className="sp-card">
          <header className="sp-card-head">
            <span className="sp-badge">最新</span>
            <h2 className="sp-card-title">客家新聞</h2>
            <Link href="/news" className="sp-more">所有新聞 →</Link>
          </header>
          <ul className="sp-list">
            {top.map((n) => (
              <li key={n.id} className="sp-row">
                <span className="sp-bullet">●</span>
                <Link href={`/news/${n.slug}`} className="sp-title sp-link">{n.title}</Link>
                <span className="sp-channel">{n.category}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        .sp-section { padding: 100px 32px 24px; background: var(--bg-base); }
        .sp-wrap { max-width: var(--max-w, 1376px); margin: 0 auto; display: grid; grid-template-columns: 1fr; gap: 20px; }
        @media (min-width: 900px) { .sp-wrap { grid-template-columns: 1fr 1fr; gap: 32px; } }

        .sp-card {
          background: #ffffff;
          border: 2px solid #14181a;
          border-radius: 16px;
          padding: 24px 28px;
          box-shadow: 0 4px 0 #14181a;
        }
        .sp-card-head {
          display: flex; align-items: baseline; gap: 12px;
          flex-wrap: wrap;
          padding-bottom: 16px;
          border-bottom: 2px solid #14181a;
          margin-bottom: 16px;
        }
        .sp-badge {
          font-family: var(--font-mono);
          font-size: calc(13px * var(--type-scale));
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #fff;
          background: #00703c;
          padding: 4px 10px;
          border-radius: 4px;
        }
        .sp-card-title {
          margin: 0;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: calc(28px * var(--type-scale));
          color: #14181a;
        }
        .sp-more {
          margin-left: auto;
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: calc(15px * var(--type-scale));
          color: #00703c;
          min-height: var(--tap-min);
          display: inline-flex;
          align-items: center;
          text-decoration: underline;
        }
        .sp-more:hover { color: #005a30; }
        .sp-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; }
        .sp-row {
          display: grid;
          grid-template-columns: 80px 1fr auto;
          gap: 16px;
          align-items: center;
          padding: 14px 0;
          border-bottom: 1px solid rgba(20,24,26,0.12);
          font-size: calc(17px * var(--type-scale));
          color: #14181a;
        }
        .sp-row:last-child { border-bottom: 0; }
        .sp-time {
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: calc(20px * var(--type-scale));
          color: #00703c;
        }
        .sp-bullet { color: #00703c; font-size: calc(14px * var(--type-scale)); }
        .sp-title { font-weight: 500; line-height: 1.4; }
        .sp-link { text-decoration: underline; color: #14181a; min-height: var(--tap-min); display: inline-flex; align-items: center; }
        .sp-link:hover { color: #00703c; }
        .sp-channel {
          font-family: var(--font-mono);
          font-size: calc(13px * var(--type-scale));
          color: rgba(20,24,26,0.55);
          white-space: nowrap;
        }
        @media (max-width: 600px) {
          .sp-row { grid-template-columns: 60px 1fr; }
          .sp-channel { display: none; }
        }
      `}</style>
    </section>
  );
}
