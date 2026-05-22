"use client";

import Link from "next/link";
import { useContent } from "@/lib/store/content";
import { Badge } from "@/components/ui/badge";
import { SectionShell } from "./section-shell";
import { cn } from "@/lib/utils";

export function SectionLifeWay() {
  const curations = useContent((s) => s.curations);
  const top = curations.slice(0, 5);

  return (
    <SectionShell eyebrow="LIVE THE HAKKA WAY" title="把客家活進日常" href="/life">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
        {top.map((c, i) => (
          <Link
            key={c.id}
            href={`/life/${c.slug}`}
            className={cn(
              "group block card overflow-hidden transition-all hover:border-accent",
              i === 0 && "sm:col-span-2 lg:col-span-2 lg:row-span-2",
            )}
          >
            <div className={cn("relative w-full overflow-hidden bg-bg-deep", i === 0 ? "aspect-[16/10] lg:aspect-[4/3]" : "aspect-[16/10]")}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.cover}
                alt={c.title}
                loading="lazy"
                className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/40 to-transparent" />
              <div className="absolute top-3 left-3"><Badge variant="warm">{c.category}</Badge></div>
              <div className="absolute inset-x-3 bottom-3 lg:inset-x-5 lg:bottom-5">
                <h3
                  className={cn(
                    "font-display font-bold text-text-primary group-hover:text-accent transition-colors line-clamp-2",
                    i === 0 ? "text-lg lg:text-3xl" : "text-base lg:text-lg",
                  )}
                >
                  {c.title}
                </h3>
                {i === 0 && c.summary && (
                  <p className="mt-2 text-sm text-text-secondary line-clamp-2 hidden lg:block">{c.summary}</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </SectionShell>
  );
}
