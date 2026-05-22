"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, Heart, Share2, ChevronRight } from "lucide-react";
import { useContent } from "@/lib/store/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

export default function ShopDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const products = useContent((s) => s.products);
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
      <nav className="text-xs text-text-muted mb-4">
        <Link href="/shop" className="hover:text-accent">客家選物</Link>
        <span className="mx-2">/</span>
        <span>{product.category}</span>
      </nav>

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-7">
          <div className="card overflow-hidden">
            <div className="relative aspect-square overflow-hidden bg-bg-deep">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.image} alt={product.name} className="size-full object-cover" />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square card overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://picsum.photos/seed/${product.id}-${i}/400/400`} alt={`縮圖 ${i}`} className="size-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <Badge variant="warm">{product.category}</Badge>
          <h1 className="mt-3 font-display text-2xl lg:text-4xl font-extrabold text-text-primary">{product.name}</h1>
          <p className="mt-3 text-text-secondary text-base">{product.description}</p>
          <div className="mt-6 text-4xl lg:text-5xl font-display font-black text-accent">{formatCurrency(product.price)}</div>
          <div className="mt-2 text-xs text-text-muted">合作電商：{product.externalPlatform}</div>

          <div className="mt-8 space-y-3">
            <Button asChild size="lg" className="w-full">
              <a href={product.externalUrl} target="_blank" rel="noopener noreferrer">
                前往 {product.externalPlatform} 購買 <ExternalLink className="size-4" />
              </a>
            </Button>
            <div className="flex gap-2">
              <Button variant="secondary" className="flex-1"><Heart className="size-4" /> 加入收藏</Button>
              <Button variant="ghost" className="flex-1"><Share2 className="size-4" /> 分享</Button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <h2 className="text-sm font-semibold text-text-primary mb-2">商品標籤</h2>
            <div className="flex flex-wrap gap-1.5">
              {product.tags.map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-bg-elevated border border-border text-text-secondary">#{t}</span>
              ))}
            </div>
          </div>

          <div className="mt-8 card p-5 bg-bg-elevated border-warning/30">
            <div className="text-xs font-semibold text-warning mb-2">⚠ POC 說明</div>
            <p className="text-xs text-text-secondary">
              本平台不直接處理金流與庫存。點擊購買會跳轉至合作電商完成下單。對應企劃書 §二(二)7「暫不串接內外部電商平台功能」。
            </p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-12 lg:mt-16">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="section-title text-xs">RELATED</div>
              <h2 className="mt-2 font-display text-2xl lg:text-3xl font-extrabold text-text-primary">同類選物</h2>
            </div>
            <Link href="/shop" className="text-sm text-text-secondary hover:text-accent inline-flex items-center gap-1">
              更多選物 <ChevronRight className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-5">
            {related.map((p) => (
              <Link key={p.id} href={`/shop/${p.id}`} className="group card overflow-hidden hover:border-accent transition-colors">
                <div className="relative aspect-square overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.name} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-text-primary line-clamp-2">{p.name}</h3>
                  <div className="mt-1 text-sm font-display font-bold text-accent">{formatCurrency(p.price)}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
