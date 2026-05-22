"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { useContent } from "@/lib/store/content";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function SectionIntoLife() {
  const products = useContent((s) => s.products);
  const top = products.slice(0, 5);

  return (
    <section className="py-12 lg:py-20">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12">
        <div className="card overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-0">
            <div className="lg:col-span-5 p-6 lg:p-12 bg-gradient-to-br from-accent/12 via-bg-elevated to-bg-elevated relative">
              <Badge variant="warm">INTO HAKKA LIFE</Badge>
              <h2 className="mt-4 font-display text-3xl lg:text-5xl font-extrabold tracking-tight text-text-primary">
                把客家<br />帶進你的<span className="text-accent">日常</span>
              </h2>
              <p className="mt-4 text-text-secondary text-sm lg:text-base max-w-md">
                從一杯茶、一塊藍染、一本繪本開始 — 客家不只是看的，也是用的、吃的、穿的、學的。
              </p>
              <Button asChild className="mt-8" size="lg">
                <Link href="/shop">
                  逛逛客家選物 <ArrowRight className="size-4" />
                </Link>
              </Button>
              <div className="absolute -bottom-20 -right-20 size-72 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
              <div className="absolute top-4 right-4">
                <div className="size-24 lg:size-32 rounded-full bg-bg-deep text-accent flex flex-col items-center justify-center text-center font-display text-xs lg:text-sm font-bold border border-accent/30">
                  <Sparkles className="size-4 lg:size-5 mb-1" />
                  HAKKA<br />LIFE
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 p-6 lg:p-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 lg:gap-4">
              {top.map((p) => (
                <Link key={p.id} href={`/shop/${p.id}`} className="group card overflow-hidden bg-bg-card hover:border-accent transition-colors">
                  <div className="relative aspect-square overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.name} loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-2.5 lg:p-3">
                    <div className="text-[10px] uppercase tracking-wider text-text-muted">{p.category}</div>
                    <div className="mt-1 text-xs lg:text-sm font-semibold text-text-primary line-clamp-2 group-hover:text-accent">{p.name}</div>
                    <div className="mt-1.5 text-xs font-display font-bold text-accent">NT${p.price}</div>
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
