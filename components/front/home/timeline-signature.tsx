"use client";

import { useEffect, useMemo, useState } from "react";
import { useContent } from "@/lib/store/content";

/**
 * Style A 24hr 客語時段 Timeline — direct port of
 * /Users/paul/Downloads/Hakka_/components/TimelineSignature.jsx
 *
 * 顯示資料（label / description / 右側推薦清單）來自 Zustand store，
 * 後台 /admin/timeline 任何修改即時反映；MOODS 的 hour→mood mapping 仍
 * hardcoded（不開放從後台改 24hr 對應規則）。
 */

/** time = TimeSlot.time 的穩定鍵；label 給後台改也不影響配對 */
const MOODS = [
  { id: "zhao-chen", time: "06:00", label: "朝晨", en: "Dawn",       hours: [5, 6, 7, 8] },
  { id: "dang-zhou", time: "12:24", label: "當晝", en: "Midday",     hours: [9, 10, 11, 12] },
  { id: "zhou-bian", time: "15:00", label: "晝邊", en: "Afternoon",  hours: [13, 14, 15, 16] },
  { id: "an-bu",     time: "18:39", label: "暗哺", en: "Dusk",       hours: [17, 18] },
  { id: "an-ye",     time: "21:00", label: "暗夜", en: "Night",      hours: [19, 20, 21, 22] },
  { id: "ye-shen",   time: "03:00", label: "夜深", en: "Deep Night", hours: [23, 0, 1, 2, 3, 4] },
];

const TYPE_LABEL: Record<string, string> = {
  video: "戲劇",
  curation: "策展",
  news: "新聞",
  product: "選物",
};

export function TimelineSignature() {
  const [now, setNow] = useState<Date | null>(null);
  const [forcedHour, setForcedHour] = useState<number | null>(null);
  const timeline = useContent((s) => s.timeline);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const hour = forcedHour ?? now?.getHours() ?? 12;
  const minute = now?.getMinutes() ?? 0;
  const currentMood = useMemo(() => MOODS.find((m) => m.hours.includes(hour)) ?? MOODS[2], [hour]);
  // 用 time（穩定 key）對應 store；label / hours 可以給後台改不影響配對
  const moodIdxStable = MOODS.indexOf(currentMood);
  const slot = useMemo(
    () =>
      timeline.find((t) => t.time === currentMood.time) ??
      timeline.find((t) => t.label === currentMood.label) ??
      timeline[moodIdxStable],
    [timeline, currentMood, moodIdxStable],
  );
  const moodLabel = slot?.label ?? currentMood.label;
  const recommendations = slot?.recommendations ?? [];

  if (!now) return <section className="ts-section" />;

  const hh = String(hour).padStart(2, "0");
  const mm = String(minute).padStart(2, "0");
  const moodIdx = MOODS.indexOf(currentMood);
  const playingIdx = recommendations.length > 0 ? hour % recommendations.length : 0;

  const cycleMood = (delta: number) => {
    const next = MOODS[(moodIdx + delta + MOODS.length) % MOODS.length];
    setForcedHour(next.hours[0]);
  };

  return (
    <section className="ts-section" aria-label="24 小時客語時段">
      <div className="ts-frame">
        <div className={`ts-mood ts-mood--${currentMood.id}`} key={currentMood.id} />
        <div className="ts-mood-scrim" />
        <div className="ts-glow" aria-hidden="true" />

        <div className="ts-grid">
          <div className="ts-left">
            <div className="ts-eyebrow-block">
              <div className="ts-eyebrow-en">24-hour Hakka rhythm</div>
              <h2 className="ts-eyebrow-cn">客家日常 · 一日六時</h2>
            </div>

            <div className="ts-clock">
              <span className="ts-digit">{hh[0]}</span>
              <span className="ts-digit">{hh[1]}</span>
              <span className="ts-colon">:</span>
              <span className="ts-digit">{mm[0]}</span>
              <span className="ts-digit" key={mm[1]}>{mm[1]}</span>
            </div>

            <div className="ts-mood-label">
              <div className="ts-mood-cn">{moodLabel}</div>
              <div className="ts-mood-en">
                {currentMood.en.toUpperCase()} · {currentMood.hours[0]}:00 — {(currentMood.hours[currentMood.hours.length - 1] + 1) % 24}:00
              </div>
              {slot?.description ? (
                <div className="ts-mood-desc">{slot.description}</div>
              ) : null}
            </div>

            <div className="ts-mood-pips" role="tablist" aria-label="客語時段切換">
              {MOODS.map((m, i) => (
                <button
                  key={m.id}
                  className={`ts-pip ${i === moodIdx ? "is-on" : ""}`}
                  onClick={() => setForcedHour(m.hours[0])}
                  role="tab"
                  aria-selected={i === moodIdx}
                  title={`切換到 ${m.label}`}
                >
                  <span className="ts-pip-dot" />
                  <span className="ts-pip-label">{m.label}</span>
                </button>
              ))}
            </div>

            <div className="ts-nav">
              <button className="ts-nav-btn" onClick={() => cycleMood(-1)} aria-label="上一個時段">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M13 4L7 10l6 6" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
              <button className="ts-nav-btn" onClick={() => cycleMood(1)} aria-label="下一個時段">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
            </div>
          </div>

          <div className="ts-right">
            <div className="ts-right-header">
              <span className="ts-on-air">
                <span className="ts-on-air-dot" /> ON AIR · CH 17
              </span>
              <span className="ts-right-meta">{moodLabel}時段推薦</span>
            </div>
            <ul className="ts-list">
              {recommendations.length === 0 ? (
                <li className="ts-item-empty">此時段尚未編排內容</li>
              ) : (
                recommendations.map((r, i) => (
                  <li key={r.id} className={`ts-item ${i === playingIdx ? "is-playing" : ""}`}>
                    <div className="ts-item-thumb">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={r.image} alt="" />
                      {i === playingIdx && (
                        <span className="ts-item-now">
                          <span className="ts-now-dot" /> NOW
                        </span>
                      )}
                    </div>
                    <div className="ts-item-meta">
                      <div className="ts-item-tag">
                        <span className="ts-item-kind">{TYPE_LABEL[r.type] ?? r.type}</span>
                        <span className="ts-item-bullet">·</span>
                        <span className="ts-item-date">{r.caption}</span>
                      </div>
                      <div className="ts-item-title">{r.title}</div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        .ts-section { background: var(--bg-base); padding: 32px; }
        .ts-frame { position: relative; max-width: var(--max-w); margin: 0 auto; min-height: 800px; border-radius: var(--r-3xl); background: var(--bg-elevated); overflow: hidden; }
        .ts-mood { position: absolute; inset: 0; opacity: 0.85; transition: opacity 800ms ease; animation: ts-mood-fade 1.2s var(--ease-out-expo); animation-fill-mode: both; }
        .ts-mood--zhao-chen { background: linear-gradient(160deg, #f7d089 0%, #e58c5e 38%, #6a3a2e 100%); }
        .ts-mood--dang-zhou { background: linear-gradient(160deg, #6db9f5 0%, #2867a8 50%, #0c2e4f 100%); }
        .ts-mood--zhou-bian { background: linear-gradient(160deg, #7fd6a5 0%, #1a8a5c 50%, #0a3b27 100%); }
        .ts-mood--an-bu     { background: linear-gradient(160deg, #f08c5a 0%, #c4502f 45%, #5c1d12 100%); }
        .ts-mood--an-ye     { background: linear-gradient(160deg, #6b4f9c 0%, #2c1e54 55%, #0d0822 100%); }
        .ts-mood--ye-shen   { background: linear-gradient(160deg, #1f3a52 0%, #0a1626 60%, #000408 100%); }
        @keyframes ts-mood-fade { from { opacity: 0; } to { opacity: 0.85; } }
        .ts-mood-scrim { position: absolute; inset: 0; background: radial-gradient(ellipse 80% 70% at 65% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 100%), linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%); }
        .ts-glow { position: absolute; left: -15%; top: -25%; width: 70%; height: 90%; border-radius: 50%; background: radial-gradient(ellipse, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 65%); filter: blur(40px); pointer-events: none; }
        .ts-grid { position: relative; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; padding: 56px 56px 48px; min-height: 800px; z-index: 2; }
        .ts-left { display: flex; flex-direction: column; justify-content: space-between; color: #fff; gap: 24px; }
        .ts-eyebrow-block { display: flex; flex-direction: column; gap: 6px; }
        .ts-eyebrow-en { font-family: var(--font-sans-display); font-size: calc(13px * var(--type-scale)); letter-spacing: 0.18em; color: var(--accent-mint); text-transform: uppercase; }
        .ts-eyebrow-cn { margin: 0; font-family: var(--font-display); font-weight: 700; font-size: calc(28px * var(--type-scale)); color: #fff; }
        .ts-clock { display: flex; align-items: baseline; gap: 4px; font-family: var(--font-condensed); font-weight: 700; font-size: var(--t-clock-mega); line-height: 0.85; letter-spacing: -0.04em; color: #fff; text-shadow: 0 4px 80px rgba(0,0,0,0.5); margin-top: 8px; font-variant-numeric: tabular-nums; }
        .ts-digit { display: inline-block; min-width: 0.55em; text-align: center; animation: ts-digit-in 380ms var(--ease-out-expo); animation-fill-mode: both; }
        @keyframes ts-digit-in { from { transform: translateY(0.12em); opacity: 0.3; } to { transform: translateY(0); opacity: 1; } }
        .ts-colon { opacity: 0.5; padding: 0 0.04em; animation: ts-colon-blink 1.4s steps(2) infinite; }
        @keyframes ts-colon-blink { 50% { opacity: 0.15; } }
        .ts-mood-label { display: flex; flex-direction: column; gap: 6px; }
        .ts-mood-cn { font-family: var(--font-mono); font-weight: 500; font-size: calc(36px * var(--type-scale)); letter-spacing: 0.15em; color: #fff; }
        .ts-mood-en { font-family: var(--font-mono); font-size: calc(13px * var(--type-scale)); letter-spacing: 0.16em; color: rgba(255,255,255,0.55); }
        .ts-mood-desc { font-family: var(--font-cn); font-size: calc(14px * var(--type-scale)); line-height: 1.55; color: rgba(255,255,255,0.78); max-width: 480px; margin-top: 6px; }
        .ts-item-empty { padding: 24px 0; color: rgba(255,255,255,0.5); font-family: var(--font-cn); }
        .ts-mood-pips { display: flex; gap: 4px; margin-top: 4px; flex-wrap: wrap; }
        .ts-pip { display: inline-flex; align-items: center; gap: 8px; padding: 8px 12px 8px 10px; min-height: var(--tap-min); background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 999px; font-family: var(--font-mono); font-size: calc(13px * var(--type-scale)); color: rgba(255,255,255,0.6); transition: all var(--dur-fast) ease; cursor: pointer; }
        .ts-pip-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.3); }
        .ts-pip:hover { color: #fff; border-color: rgba(255,255,255,0.3); }
        .ts-pip.is-on { background: rgba(83,225,161,0.18); border-color: var(--accent-mint); color: #fff; }
        .ts-pip.is-on .ts-pip-dot { background: var(--accent-mint); box-shadow: 0 0 10px var(--accent-mint); }
        .ts-nav { display: flex; gap: 12px; }
        .ts-nav-btn { width: 64px; height: 64px; min-width: var(--tap-min); min-height: var(--tap-min); border-radius: 50%; background: rgba(255,255,255,0.12); color: #fff; display: inline-flex; align-items: center; justify-content: center; transition: all var(--dur-fast) ease; border: 0; cursor: pointer; }
        .ts-nav-btn:hover { background: #fff; color: rgb(8,20,16); transform: scale(1.05); }
        .ts-right { display: flex; flex-direction: column; gap: 16px; padding-top: 60px; color: #fff; align-self: flex-end; width: 100%; }
        .ts-right-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.15); gap: 12px; }
        .ts-on-air { display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: calc(13px * var(--type-scale)); font-weight: 600; letter-spacing: 0.12em; color: #fff; white-space: nowrap; }
        .ts-on-air-dot { width: 8px; height: 8px; border-radius: 50%; background: #ff4444; box-shadow: 0 0 8px #ff4444; animation: ts-air-pulse 1.5s ease-in-out infinite; }
        @keyframes ts-air-pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.85); } }
        .ts-right-meta { font-family: var(--font-cn); font-size: calc(13px * var(--type-scale)); color: rgba(255,255,255,0.55); white-space: nowrap; }
        .ts-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
        .ts-item { display: grid; grid-template-columns: 100px 1fr; gap: 20px; padding: 18px 0; border-bottom: 1px solid rgba(255,255,255,0.08); align-items: center; transition: transform var(--dur-fast) ease; }
        .ts-item:last-child { border-bottom: none; }
        .ts-item:hover { transform: translateX(6px); }
        .ts-item-thumb { position: relative; width: 100px; aspect-ratio: 1; overflow: hidden; border-radius: 4px; background: #222; }
        .ts-item-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .ts-item.is-playing .ts-item-thumb { outline: 2px solid var(--accent-mint); outline-offset: 2px; }
        .ts-item-now { position: absolute; left: 4px; top: 4px; display: inline-flex; align-items: center; gap: 4px; background: rgba(0,0,0,0.7); padding: 3px 6px; font-family: var(--font-mono); font-size: 9px; font-weight: 700; letter-spacing: 0.1em; color: var(--accent-mint); }
        .ts-now-dot { width: 5px; height: 5px; background: var(--accent-mint); border-radius: 50%; animation: ts-air-pulse 1.5s infinite; }
        .ts-item-meta { display: flex; flex-direction: column; gap: 8px; min-width: 0; }
        .ts-item-tag { display: flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: calc(12px * var(--type-scale)); color: var(--text-dim, rgb(81,94,94)); font-weight: 700; white-space: nowrap; }
        .ts-item-bullet { opacity: 0.5; }
        .ts-item-date { font-weight: 500; }
        .ts-item-title { font-family: var(--font-display); font-weight: 500; font-size: calc(18px * var(--type-scale)); color: #fff; line-height: 1.3; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
        .ts-item.is-playing .ts-item-title { color: var(--accent-mint); }
        @media (max-width: 1200px) { .ts-grid { grid-template-columns: 1fr; gap: 32px; padding: 40px 32px; } .ts-clock { font-size: 180px; } .ts-right { padding-top: 8px; align-self: stretch; } .ts-right-header { padding-bottom: 8px; } .ts-frame { min-height: 0; } .ts-glow { display: none; } }
        @media (max-width: 900px) { .ts-section { padding: 16px; } .ts-frame { min-height: 0; border-radius: 24px; } .ts-grid { grid-template-columns: 1fr; gap: 24px; padding: 28px 20px; } .ts-clock { font-size: 130px; } .ts-mood-cn { font-size: 28px; } .ts-right { padding-top: 16px; } }
      `}</style>
    </section>
  );
}
