"use client";

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const STORAGE = [
  { month: "11/2025", used: 412, total: 1000 },
  { month: "12/2025", used: 487, total: 1000 },
  { month: "1/2026", used: 521, total: 1000 },
  { month: "2/2026", used: 568, total: 1000 },
  { month: "3/2026", used: 612, total: 1000 },
  { month: "4/2026", used: 682, total: 1000 },
  { month: "5/2026", used: 731, total: 1000 },
];

const BANDWIDTH = [
  { date: "5/15", egress: 124 }, { date: "5/16", egress: 142 }, { date: "5/17", egress: 168 },
  { date: "5/18", egress: 152 }, { date: "5/19", egress: 184 }, { date: "5/20", egress: 192 }, { date: "5/21", egress: 88 },
];

export default function R2Page() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">Cloudflare R2 用量</h1>
        <p className="mt-1 text-sm text-text-secondary">企劃書 B5 創新點：R2 自建省 30%+ 流量費用</p>
      </div>

      <div className="grid sm:grid-cols-4 gap-3">
        <Stat label="儲存量" value="731 GB" sub="/ 1 TB 配額" />
        <Stat label="本月 egress" value="1,150 GB" sub="$0 (R2 免費)" tone="good" />
        <Stat label="若用 AWS S3" value="NT$ 32,800" sub="本月可省" tone="warning" />
        <Stat label="物件數" value="48.2K" sub="影片 / 圖片" />
      </div>

      <Card><CardContent>
        <h2 className="font-display font-bold mb-4">儲存使用趨勢</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={STORAGE}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" />
              <XAxis dataKey="month" stroke="#8a948f" />
              <YAxis stroke="#8a948f" />
              <Tooltip formatter={(v) => `${v} GB`} />
              <Line type="monotone" dataKey="used" stroke="#006b3f" strokeWidth={2.5} dot />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent></Card>

      <Card><CardContent>
        <h2 className="font-display font-bold mb-4">近 7 日流量 (Egress)</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={BANDWIDTH}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" />
              <XAxis dataKey="date" stroke="#8a948f" />
              <YAxis stroke="#8a948f" />
              <Tooltip formatter={(v) => `${v} GB`} />
              <Line type="monotone" dataKey="egress" stroke="#ffa94d" strokeWidth={2.5} dot />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent></Card>

      <Card className="border-success/40 bg-success/5"><CardContent>
        <div className="text-xs font-semibold text-success mb-1">💚 成本優勢</div>
        <p className="text-sm text-text-secondary">
          R2 對 egress 完全免費，相較於 AWS S3 $0.09/GB，每月可節省約 NT$32,800。
          800 TB 年度 egress 預估可省 NT$ 380,000。本年累計節省 NT$ 192,500。
        </p>
      </CardContent></Card>
    </div>
  );
}

function Stat({ label, value, sub, tone }: { label: string; value: string; sub?: string; tone?: "good" | "warning" }) {
  return <Card><CardContent>
    <div className="text-xs uppercase tracking-wider text-text-muted">{label}</div>
    <div className={`mt-2 font-display text-2xl font-extrabold ${tone === "good" ? "text-success" : tone === "warning" ? "text-warning" : "text-text-primary"}`}>{value}</div>
    {sub && <div className="mt-1 text-xs text-text-muted">{sub}</div>}
  </CardContent></Card>;
}
