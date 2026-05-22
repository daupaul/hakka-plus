"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContent } from "@/lib/store/content";
import { ClockDisplay } from "@/components/ui/clock-display";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function TimelineClock() {
  const timeline = useContent((s) => s.timeline);
  const [activeIdx, setActiveIdx] = useState(3); // default to 暗夜 18:39

  if (!timeline.length) return null;
  const active = timeline[activeIdx];

  const next = () => setActiveIdx((i) => (i + 1) % timeline.length);
  const prev = () => setActiveIdx((i) => (i - 1 + timeline.length) % timeline.length);

  return (
    <section className="py-16 lg:py-28 bg-bg-deep relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-base via-bg-deep to-bg-deep" />
        <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 size-[120%] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left — big clock */}
          <div className="lg:col-span-6">
            <div className="section-title text-xs">客家生活時間軸 · TIMELINE</div>
            <h2 className="mt-2 font-display text-3xl lg:text-5xl font-extrabold tracking-tight text-text-primary">
              一天的客家庄，從晨光到凌晨
            </h2>
            <div className="mt-8 lg:mt-12">
              <ClockDisplay time={active.time} label={active.label} size="xl" />
            </div>
            <p className="mt-6 max-w-md text-text-secondary text-sm lg:text-base">
              {active.description}
            </p>
            <div className="mt-8 flex items-center gap-3">
              <button
                onClick={prev}
                aria-label="上一個時段"
                className="size-12 rounded-full border border-border text-text-secondary hover:border-accent hover:text-accent transition-colors inline-flex items-center justify-center"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                onClick={next}
                aria-label="下一個時段"
                className="size-12 rounded-full border border-border text-text-secondary hover:border-accent hover:text-accent transition-colors inline-flex items-center justify-center"
              >
                <ChevronRight className="size-5" />
              </button>
              <div className="ml-4 flex items-center gap-1.5">
                {timeline.map((t, i) => (
                  <button
                    key={t.time}
                    onClick={() => setActiveIdx(i)}
                    aria-label={`切換到 ${t.label} ${t.time}`}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      i === activeIdx ? "w-8 bg-accent" : "w-4 bg-border",
                    )}
                  />
                ))}
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {timeline.map((t, i) => (
                <button
                  key={t.time}
                  onClick={() => setActiveIdx(i)}
                  className={cn(
                    "px-3 h-8 rounded-full text-xs font-semibold transition-colors border",
                    i === activeIdx
                      ? "border-accent bg-accent text-text-inverse"
                      : "border-border text-text-secondary hover:text-text-primary",
                  )}
                >
                  {t.label} · {t.time}
                </button>
              ))}
            </div>
          </div>

          {/* Right — recommendations carousel */}
          <div className="lg:col-span-6 relative">
            <AnimatePresence mode="popLayout">
              <motion.ul
                key={active.time}
                initial={{ opacity: 0, x: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -30, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                className="grid gap-3"
              >
                {active.recommendations.map((r, i) => (
                  <li key={r.id} className="card overflow-hidden hover:border-accent transition-colors group">
                    <Link
                      href={getRefHref(r.type, r.refId)}
                      className="flex items-center gap-4 p-3 lg:p-4"
                    >
                      <div className="relative aspect-[4/3] w-28 sm:w-36 lg:w-44 shrink-0 overflow-hidden rounded-lg bg-bg-deep">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={r.image}
                          alt={r.title}
                          loading="lazy"
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Badge variant="outline">{typeLabel(r.type)}</Badge>
                        <h4 className="mt-2 font-display font-bold text-text-primary text-base lg:text-lg line-clamp-2 group-hover:text-accent transition-colors">
                          {r.title}
                        </h4>
                        <p className="mt-1 text-xs lg:text-sm text-text-muted line-clamp-2">{r.caption}</p>
                      </div>
                      <span className="hidden lg:inline-flex text-text-muted group-hover:text-accent transition-colors">
                        <ChevronRight className="size-5" />
                      </span>
                    </Link>
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function typeLabel(t: string) {
  switch (t) {
    case "video": return "影視";
    case "news": return "新聞";
    case "curation": return "策展";
    case "product": return "選物";
    default: return t;
  }
}

function getRefHref(t: string, id: string) {
  switch (t) {
    case "video": return `/watch/${id}`;
    case "news": return `/news/${id}`;
    case "curation": return `/life/${id}`;
    case "product": return `/shop/${id}`;
    default: return "/";
  }
}
