"use client";

import Link from "next/link";
import { useContent } from "@/lib/store/content";

export function SectionIntoLife() {
  const curations = useContent((s) => s.curations);
  const collage = curations.slice(0, 3);

  if (collage.length < 3) return null;

  return (
    <section className="py-12 lg:py-20">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12">
        <div className="relative card overflow-hidden border-border-strong">
          {/* Soft green corner glows */}
          <div className="absolute -top-20 -left-20 size-60 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 size-60 rounded-full bg-accent/15 blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-0">
            {/* Left: HAKKA LIFE white solid circle badge + vertical tag list */}
            <div className="lg:col-span-4 p-6 lg:p-10 flex flex-col items-center lg:items-start justify-center gap-6 relative">
              <div className="size-32 lg:size-44 rounded-full bg-white text-[#0a0f0d] flex flex-col items-center justify-center font-display font-extrabold leading-tight shadow-[0_0_60px_-12px_rgba(255,255,255,0.4)]">
                <span className="text-xl lg:text-3xl tracking-tight">HAKKA</span>
                <span className="text-xl lg:text-3xl tracking-tight">LIFE</span>
              </div>
              <ul className="space-y-1.5 lg:space-y-2 text-text-secondary text-sm lg:text-base">
                <li className="inline-flex items-center gap-2"><span className="text-accent">#</span> 旅遊探索</li>
                <li className="inline-flex items-center gap-2"><span className="text-accent">#</span> 在地文化</li>
                <li className="inline-flex items-center gap-2"><span className="text-accent">#</span> 深度體驗</li>
              </ul>
            </div>

            {/* Right: 3 image collage with title overlay */}
            <div className="lg:col-span-8 grid grid-cols-3 gap-1.5 lg:gap-3 p-3 lg:p-6">
              {collage.map((c) => (
                <Link key={c.id} href={`/life/${c.slug}`} className="group block relative overflow-hidden rounded-lg lg:rounded-xl aspect-[3/4] bg-bg-deep">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.cover} alt={c.title} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/20 to-transparent" />
                  <div className="absolute inset-x-2 bottom-2 lg:inset-x-3 lg:bottom-3">
                    <div className="font-display font-bold text-text-primary text-xs sm:text-sm lg:text-base line-clamp-2 group-hover:text-accent transition-colors">
                      {c.title}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
