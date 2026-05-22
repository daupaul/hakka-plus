"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cloud, Globe, Activity } from "lucide-react";
import { useUi } from "@/lib/store/ui";

const REGIONS = [
  { name: "台北 (TPE)", latency: 18, requests: "8.2M", status: "healthy" },
  { name: "東京 (NRT)", latency: 32, requests: "1.8M", status: "healthy" },
  { name: "新加坡 (SIN)", latency: 58, requests: "421K", status: "healthy" },
  { name: "舊金山 (SFO)", latency: 142, requests: "112K", status: "healthy" },
  { name: "法蘭克福 (FRA)", latency: 218, requests: "42K", status: "healthy" },
  { name: "雪梨 (SYD)", latency: 162, requests: "28K", status: "healthy" },
];

export default function CdnPage() {
  const toast = useUi((s) => s.toast);
  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">CDN & 效能</h1>
        <p className="mt-1 text-sm text-text-secondary">Cloudflare R2 + Cloudflare CDN 全球邊緣節點管理</p>
      </div>

      <div className="grid sm:grid-cols-4 gap-3">
        <Stat label="可用度 (30 日)" value="99.98%" tone="good" />
        <Stat label="總請求 (24h)" value="10.6M" />
        <Stat label="快取命中率" value="94.2%" tone="good" />
        <Stat label="平均延遲" value="38ms" tone="good" />
      </div>

      <Card><CardContent>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold">邊緣節點分布</h2>
          <Badge variant="success">{REGIONS.length} 個區域全部健康</Badge>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {REGIONS.map((r) => (
            <div key={r.name} className="card p-3 bg-bg-base">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-text-primary text-sm">{r.name}</div>
                <span className="size-2 rounded-full bg-success" />
              </div>
              <div className="mt-2 text-xs text-text-muted">延遲：<span className="text-text-primary font-bold">{r.latency}ms</span></div>
              <div className="text-xs text-text-muted">24h 請求：<span className="text-text-primary font-bold">{r.requests}</span></div>
            </div>
          ))}
        </div>
      </CardContent></Card>

      <Card><CardContent>
        <h2 className="font-display font-bold mb-3">快速操作</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          <Button variant="secondary" onClick={() => toast({ variant: "success", title: "已清除全站快取", description: "預計 30 秒生效" })}>
            <Activity className="size-4" /> 清除全站快取
          </Button>
          <Button variant="ghost" onClick={() => toast({ variant: "default", title: "已開啟 DNS 設定" })}><Globe className="size-4" /> DNS 設定</Button>
          <Button variant="ghost" onClick={() => toast({ variant: "default", title: "已開啟 SSL 憑證" })}>SSL 憑證</Button>
        </div>
      </CardContent></Card>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "good" | "warning" | "bad" }) {
  return <Card><CardContent>
    <div className="text-xs uppercase tracking-wider text-text-muted">{label}</div>
    <div className={`mt-2 font-display text-3xl font-extrabold ${tone === "good" ? "text-success" : tone === "warning" ? "text-warning" : tone === "bad" ? "text-danger" : "text-text-primary"}`}>{value}</div>
  </CardContent></Card>;
}
