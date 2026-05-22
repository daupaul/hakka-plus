"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useContent } from "@/lib/store/content";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/utils";

const CLICK_TREND = [
  { date: "5/15", clicks: 832 }, { date: "5/16", clicks: 921 }, { date: "5/17", clicks: 1042 },
  { date: "5/18", clicks: 982 }, { date: "5/19", clicks: 1124 }, { date: "5/20", clicks: 1234 }, { date: "5/21", clicks: 821 },
];

export default function AffiliatePage() {
  const products = useContent((s) => s.products);
  const top = [...products].sort((a, b) => b.clickCount - a.clickCount).slice(0, 10);
  const totalClicks = products.reduce((s, p) => s + p.clickCount, 0);

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">導購統計</h1>
        <p className="mt-1 text-sm text-text-secondary">內容植入商品標籤的點擊與外連轉導追蹤</p>
      </div>

      <Card className="border-warning/40 bg-warning/5"><CardContent>
        <div className="text-xs font-semibold text-warning mb-1">⚠ 統計範圍說明（依 RFP §二(二)7）</div>
        <p className="text-sm text-text-secondary">
          本平台不串接內外部電商，僅追蹤<span className="text-text-primary font-semibold">點擊</span>與<span className="text-text-primary font-semibold">外連轉導</span>。
          交易成功率無法追蹤（隱私考量），由合作電商管理。
        </p>
      </CardContent></Card>

      <div className="grid sm:grid-cols-4 gap-3">
        <Stat label="累計點擊" value={formatNumber(totalClicks)} />
        <Stat label="本月點擊" value={formatNumber(28421)} />
        <Stat label="平均 CTR" value="3.8%" />
        <Stat label="活躍商品" value={String(products.length)} />
      </div>

      <Card><CardContent>
        <h2 className="font-display font-bold mb-4">近 7 日點擊趨勢</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={CLICK_TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" />
              <XAxis dataKey="date" stroke="#8a948f" />
              <YAxis stroke="#8a948f" />
              <Tooltip />
              <Line type="monotone" dataKey="clicks" stroke="#006b3f" strokeWidth={2.5} dot={{ fill: "#006b3f", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent></Card>

      <Card><CardContent>
        <h2 className="font-display font-bold mb-3">Top 10 商品 (依點擊)</h2>
        <div className="space-y-2">
          {top.map((p, i) => (
            <div key={p.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-bg-base">
              <div className="size-6 rounded-full bg-accent-soft text-accent inline-flex items-center justify-center font-bold text-xs">{i + 1}</div>
              <div className="size-10 rounded-md overflow-hidden bg-bg-deep">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.name} className="size-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-text-primary text-sm line-clamp-1">{p.name}</div>
                <div className="text-xs text-text-muted">{p.externalPlatform}</div>
              </div>
              <div className="text-right">
                <div className="font-display font-bold text-accent">{formatNumber(p.clickCount)}</div>
                <div className="text-[10px] text-text-muted">點擊</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent></Card>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <Card><CardContent>
      <div className="text-xs uppercase tracking-wider text-text-muted">{label}</div>
      <div className="mt-2 font-display text-3xl font-extrabold text-text-primary">{value}</div>
    </CardContent></Card>
  );
}
