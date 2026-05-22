"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useContent } from "@/lib/store/content";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AdminShopDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const products = useContent((s) => s.products);
  const p = products.find((x) => x.id === id);
  if (!p) notFound();

  return (
    <div className="space-y-6 max-w-4xl">
      <Link href="/admin/shop" className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-accent"><ArrowLeft className="size-4" /> 回商品列表</Link>

      <div className="flex items-start gap-6 flex-wrap">
        <div className="size-32 rounded-xl overflow-hidden border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image} alt={p.name} className="size-full object-cover" />
        </div>
        <div className="flex-1 min-w-[200px]">
          <Badge variant="warm">{p.category}</Badge>
          <h1 className="mt-2 font-display text-2xl lg:text-3xl font-extrabold text-text-primary">{p.name}</h1>
          <div className="mt-2 text-sm text-text-secondary">{p.description}</div>
          <div className="mt-3 font-display text-3xl font-extrabold text-accent">NT${p.price}</div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <Card><CardContent>
          <div className="text-xs text-text-muted">合作電商</div>
          <Badge variant="muted" className="mt-1">{p.externalPlatform}</Badge>
          <div className="mt-3">
            <a href={p.externalUrl} target="_blank" rel="noreferrer" className="text-sm text-accent hover:underline inline-flex items-center gap-1">
              {p.externalUrl} <ExternalLink className="size-3" />
            </a>
          </div>
        </CardContent></Card>
        <Card><CardContent>
          <div className="text-xs text-text-muted">點擊統計</div>
          <div className="mt-1 font-display text-3xl font-extrabold text-text-primary">{p.clickCount.toLocaleString()}</div>
          <div className="text-xs text-text-muted">累計點擊</div>
        </CardContent></Card>
      </div>

      <Card><CardContent>
        <h2 className="font-display font-bold mb-3">商品標籤</h2>
        <div className="flex flex-wrap gap-1.5">
          {p.tags.map((t) => <Badge key={t} variant="outline">#{t}</Badge>)}
        </div>
      </CardContent></Card>

      <Card><CardContent>
        <h2 className="font-display font-bold mb-3">關聯內容</h2>
        <div className="text-sm text-text-secondary">關聯策展：{p.relatedCurations.length} 篇</div>
      </CardContent></Card>
    </div>
  );
}
