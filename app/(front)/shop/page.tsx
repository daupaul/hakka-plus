"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useContent } from "@/lib/store/content";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ExternalLink } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const CATEGORIES = ["全部", "茶葉", "工藝品", "客語教材", "食品", "服飾"] as const;

export default function ShopPage() {
  const products = useContent((s) => s.products);
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("全部");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = products;
    if (category !== "全部") list = list.filter((p) => p.category === category);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q)));
    }
    return list;
  }, [products, category, query]);

  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
      <header className="mb-8 lg:mb-10">
        <div className="section-title text-xs">HAKKA SHOP</div>
        <h1 className="mt-2 font-display text-3xl lg:text-5xl font-extrabold tracking-tight text-text-primary">客家選物</h1>
        <p className="mt-3 text-text-secondary text-sm lg:text-base max-w-2xl">
          客台精選 {products.length} 件客家選物 — 茶葉、工藝品、客語教材、食品、服飾，跳轉合作電商完成購買。
        </p>
        <div className="mt-3 inline-flex items-center gap-2 text-xs text-text-muted">
          <ExternalLink className="size-3" /> 本站不處理交易，所有訂購跳轉合作平台（Shopee / PChome / 客家好物網）
        </div>
      </header>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-muted" />
          <Input type="search" placeholder="搜尋商品..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9" />
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`h-9 px-4 rounded-full text-sm font-semibold border transition-colors ${
                category === c
                  ? "bg-accent text-text-inverse border-accent"
                  : "border-border text-text-secondary hover:border-accent hover:text-accent"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5">
        {filtered.map((p) => (
          <Link key={p.id} href={`/shop/${p.id}`} className="group card overflow-hidden hover:border-accent transition-colors">
            <div className="relative aspect-square overflow-hidden bg-bg-deep">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.name} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <Badge variant="muted" className="absolute top-2 left-2">{p.externalPlatform}</Badge>
            </div>
            <div className="p-3 lg:p-4">
              <div className="text-[10px] uppercase text-text-muted tracking-wider">{p.category}</div>
              <h3 className="mt-1 text-sm lg:text-base font-semibold text-text-primary line-clamp-2 group-hover:text-accent">{p.name}</h3>
              <div className="mt-2 flex items-center justify-between">
                <div className="text-lg font-display font-bold text-accent">{formatCurrency(p.price)}</div>
                <div className="text-[11px] text-text-muted">{p.clickCount.toLocaleString()} 點擊</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
