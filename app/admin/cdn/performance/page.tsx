"use client";

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, Legend } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

const CWV = [
  { date: "5/15", lcp: 1.8, inp: 145, cls: 0.04 },
  { date: "5/16", lcp: 1.7, inp: 138, cls: 0.05 },
  { date: "5/17", lcp: 1.9, inp: 152, cls: 0.04 },
  { date: "5/18", lcp: 1.6, inp: 132, cls: 0.03 },
  { date: "5/19", lcp: 1.8, inp: 148, cls: 0.05 },
  { date: "5/20", lcp: 1.7, inp: 142, cls: 0.04 },
  { date: "5/21", lcp: 1.6, inp: 128, cls: 0.03 },
];

export default function PerformancePage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">Core Web Vitals 監控</h1>
        <p className="mt-1 text-sm text-text-secondary">Google CrUX 75th percentile，影響 SEO 與用戶體驗</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <Metric name="LCP" value="1.7s" target="< 2.5s" tone="good" desc="Largest Contentful Paint" />
        <Metric name="INP" value="142ms" target="< 200ms" tone="good" desc="Interaction to Next Paint" />
        <Metric name="CLS" value="0.04" target="< 0.1" tone="good" desc="Cumulative Layout Shift" />
      </div>

      <Card><CardContent>
        <h2 className="font-display font-bold mb-4">7 日 CWV 趨勢</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={CWV}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" />
              <XAxis dataKey="date" stroke="#8a948f" />
              <YAxis stroke="#8a948f" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="lcp" stroke="#006b3f" strokeWidth={2} name="LCP (s)" />
              <Line type="monotone" dataKey="inp" stroke="#ffa94d" strokeWidth={2} name="INP (ms)" yAxisId="right" />
              <YAxis yAxisId="right" orientation="right" stroke="#ffa94d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent></Card>
    </div>
  );
}

function Metric({ name, value, target, tone, desc }: { name: string; value: string; target: string; tone: "good" | "warning" | "bad"; desc: string }) {
  return <Card><CardContent>
    <div className="flex items-center justify-between">
      <span className="text-2xl font-display font-extrabold text-text-primary">{name}</span>
      <span className={`size-3 rounded-full ${tone === "good" ? "bg-success" : tone === "warning" ? "bg-warning" : "bg-danger"}`} />
    </div>
    <div className={`mt-2 font-display text-4xl font-extrabold ${tone === "good" ? "text-success" : tone === "warning" ? "text-warning" : "text-danger"}`}>{value}</div>
    <div className="text-xs text-text-muted mt-1">{desc}</div>
    <div className="text-xs text-text-secondary mt-2">目標 {target}</div>
  </CardContent></Card>;
}
