"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUi } from "@/lib/store/ui";

const RULES = [
  { id: "r1", pattern: "/api/videos/*", ttl: 300, enabled: true },
  { id: "r2", pattern: "/api/news/*", ttl: 60, enabled: true },
  { id: "r3", pattern: "/images/*", ttl: 86400, enabled: true },
  { id: "r4", pattern: "/api/account/*", ttl: 0, enabled: true },
  { id: "r5", pattern: "/api/schedule/*", ttl: 1800, enabled: true },
];

export default function CachePage() {
  const toast = useUi((s) => s.toast);
  const [purgeUrl, setPurgeUrl] = useState("");

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">快取規則</h1>
        <p className="mt-1 text-sm text-text-secondary">CDN edge cache 規則編輯與清快取操作</p>
      </div>

      <Card><CardContent>
        <h2 className="font-display font-bold mb-3">清除指定 URL 快取</h2>
        <div className="flex gap-2">
          <Input className="flex-1" placeholder="https://hakka.tv/watch/stars-above-kuroshio" value={purgeUrl} onChange={(e) => setPurgeUrl(e.target.value)} />
          <Button onClick={() => { toast({ variant: "success", title: "已清除", description: purgeUrl || "全站快取" }); setPurgeUrl(""); }}>清快取</Button>
        </div>
      </CardContent></Card>

      <Card><CardContent>
        <h2 className="font-display font-bold mb-3">快取規則</h2>
        <div className="space-y-2">
          {RULES.map((r) => (
            <div key={r.id} className="card p-3 bg-bg-base flex items-center gap-3 flex-wrap">
              <code className="font-mono text-sm text-text-primary flex-1 min-w-[160px]">{r.pattern}</code>
              <Badge variant="muted">TTL: {r.ttl === 0 ? "no-cache" : r.ttl >= 86400 ? `${r.ttl / 86400} 天` : r.ttl >= 60 ? `${r.ttl / 60} 分鐘` : `${r.ttl} 秒`}</Badge>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked={r.enabled} className="size-4" />
                <span className="text-xs">啟用</span>
              </label>
            </div>
          ))}
        </div>
      </CardContent></Card>
    </div>
  );
}
