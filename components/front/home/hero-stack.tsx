"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Play } from "lucide-react";
import { useContent } from "@/lib/store/content";
import { ClockDisplay } from "@/components/ui/clock-display";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroStack() {
  const videos = useContent((s) => s.videos);
  const featured = videos.filter((v) => v.featured).slice(0, 3);
  const [time, setTime] = useState<{ hhmm: string; ss: string }>({ hhmm: "12:24", ss: "00" });
  const [now, setNow] = useState<Date>(new Date(2026, 4, 21, 12, 24, 0));

  // Live ticking clock — updates every second.
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setNow(d);
      setTime({
        hhmm: `${pad(d.getHours())}:${pad(d.getMinutes())}`,
        ss: pad(d.getSeconds()),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const slot = currentSlot(now.getHours());

  if (featured.length === 0) {
    return null;
  }

  return (
    <section className="relative pt-6 sm:pt-10 lg:pt-12 pb-12 lg:pb-20">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12">
        {/* Desktop: 3 video cards in row */}
        <div className="grid grid-cols-3 gap-3 lg:gap-4 mb-6 lg:mb-10">
          {featured.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              className="group relative"
            >
              <Link href={`/watch/${v.slug}`} className="block card overflow-hidden">
                <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[16/10] overflow-hidden bg-bg-deep">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={v.hero}
                    alt={v.title}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/30 to-transparent" />

                  {/* First card (NO.1) gets larger label */}
                  <div className="absolute inset-x-3 bottom-3 lg:inset-x-5 lg:bottom-5">
                    <div className="flex items-center gap-2 text-text-secondary text-[10px] lg:text-xs">
                      <Badge variant={i === 0 ? "default" : "outline"}>
                        {i === 0 ? "NOW PLAYING" : `NO.${i + 1}`}
                      </Badge>
                    </div>
                    <h3 className="mt-2 font-display text-base sm:text-lg lg:text-2xl font-bold text-text-primary line-clamp-2">
                      {v.title}
                    </h3>
                    {v.titleEn && (
                      <p className="hidden lg:block text-xs text-text-muted uppercase tracking-wider mt-1 line-clamp-1">
                        {v.titleEn}
                      </p>
                    )}
                  </div>

                  {/* Play icon */}
                  <div className="absolute top-3 right-3 size-9 lg:size-12 rounded-full bg-bg-deep/70 backdrop-blur-sm flex items-center justify-center opacity-100 group-hover:bg-accent group-hover:text-text-inverse transition-colors">
                    <Play className="size-3.5 lg:size-5 ml-0.5" fill="currentColor" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Live clock band */}
        <div className="card border-border-strong p-5 sm:p-6 lg:p-10">
          <div className="grid items-center gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="text-[10px] sm:text-xs section-title">客家生活時間軸 · LIVE</div>
              <div className="mt-4 flex items-baseline gap-4">
                <ClockDisplay time={time.hhmm} label={slot.label} size="xl" />
                <span className="hidden sm:inline clock-numerals text-text-muted text-base sm:text-lg lg:text-xl">
                  :{time.ss}
                </span>
              </div>
              <p className="mt-4 text-text-secondary text-sm sm:text-base max-w-xl">
                {slot.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/watch">
                    <Play className="size-4" fill="currentColor" /> 開始觀看
                  </Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href="/themes">設定我的客家日常</Link>
                </Button>
              </div>
            </div>
            <div className="lg:col-span-5">
              <ul className="grid grid-cols-2 gap-3">
                {slot.recommendations.slice(0, 4).map((r) => (
                  <li key={r.id} className="card overflow-hidden bg-bg-elevated">
                    <div className="relative aspect-[5/3] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={r.image} alt={r.title} className="size-full object-cover" />
                    </div>
                    <div className="p-2.5">
                      <div className="text-[10px] text-text-muted uppercase tracking-wide">{r.caption}</div>
                      <div className="mt-1 text-xs lg:text-sm font-semibold text-text-primary line-clamp-2">{r.title}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

interface Slot {
  label: string;
  description: string;
  recommendations: { id: string; title: string; image: string; caption: string }[];
}

function currentSlot(hour: number): Slot {
  // Read from store synchronously can't; use simplified mapping that mirrors timeline.json labels.
  if (hour >= 5 && hour < 11) return { label: "晨光", description: "客家庄的早晨從晒穀場與菜園開始。", recommendations: defaultRecs("dawn") };
  if (hour >= 11 && hour < 14) return { label: "日午", description: "高山雲海剛散開，午後的客庄一片靜謐。", recommendations: defaultRecs("noon") };
  if (hour >= 14 && hour < 17) return { label: "午後", description: "午後三點，伯公樹下的搖椅、阿婆的擂茶碗。", recommendations: defaultRecs("aft") };
  if (hour >= 17 && hour < 20) return { label: "暗夜", description: "夕陽剛落，客家庄的廚房升起炊煙。", recommendations: defaultRecs("dusk") };
  if (hour >= 20 && hour < 23) return { label: "夜深", description: "晚飯後的客家八音、慢轉的廣播、漸暗的廳堂。", recommendations: defaultRecs("night") };
  return { label: "凌晨", description: "客庄最寂靜的時刻，伯公樹下、夥房瓦上、田埂遠處的犬吠。", recommendations: defaultRecs("pre") };
}

function defaultRecs(seed: string) {
  return [
    { id: `r-${seed}-1`, title: "本時段精選一", image: `https://picsum.photos/seed/${seed}-1/800/600`, caption: "節目推薦" },
    { id: `r-${seed}-2`, title: "本時段精選二", image: `https://picsum.photos/seed/${seed}-2/800/600`, caption: "新聞時刻" },
    { id: `r-${seed}-3`, title: "本時段精選三", image: `https://picsum.photos/seed/${seed}-3/800/600`, caption: "策展推薦" },
    { id: `r-${seed}-4`, title: "本時段精選四", image: `https://picsum.photos/seed/${seed}-4/800/600`, caption: "生活提案" },
  ];
}

export const useHasMounted = () => {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
};
