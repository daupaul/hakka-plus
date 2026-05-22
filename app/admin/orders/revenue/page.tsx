"use client";

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

const MONTHLY = [
  { month: "11", subscription: 1820000, single: 240000, product: 110000 },
  { month: "12", subscription: 1920000, single: 280000, product: 140000 },
  { month: "1", subscription: 2010000, single: 310000, product: 180000 },
  { month: "2", subscription: 2150000, single: 290000, product: 210000 },
  { month: "3", subscription: 2310000, single: 350000, product: 230000 },
  { month: "4", subscription: 2480000, single: 380000, product: 260000 },
  { month: "5", subscription: 2620000, single: 420000, product: 320000 },
];

const COMPOSITION = [
  { name: "年費訂閱", value: 1840000, color: "#00ff94" },
  { name: "月費訂閱", value: 780000, color: "#00cc77" },
  { name: "單片購買", value: 420000, color: "#ffa94d" },
  { name: "選物商品", value: 320000, color: "#4dd0ff" },
];

const TOTAL = COMPOSITION.reduce((s, c) => s + c.value, 0);

export default function RevenueDashboard() {
  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">營收 Dashboard</h1>
        <p className="mt-1 text-sm text-text-secondary">2026 年度營收即時概覽。</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Stat label="本月營收" value={`NT$${(TOTAL / 1000).toFixed(0)}K`} delta="+8.2%" />
        <Stat label="活躍訂閱" value="8,432" delta="+218" />
        <Stat label="客單價" value="NT$486" delta="+12" />
        <Stat label="LTV (12 月)" value="NT$5,840" delta="+8.5%" />
      </div>

      <Card>
        <CardContent>
          <h2 className="font-display font-bold mb-4">近 7 個月營收趨勢</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" />
                <XAxis dataKey="month" stroke="#8a948f" tickFormatter={(m) => `${m} 月`} />
                <YAxis stroke="#8a948f" tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.1)" }} formatter={(v) => `NT$${Number(v).toLocaleString()}`} />
                <Legend />
                <Bar dataKey="subscription" stackId="a" fill="#006b3f" name="訂閱" />
                <Bar dataKey="single" stackId="a" fill="#ffa94d" name="單片" />
                <Bar dataKey="product" stackId="a" fill="#4dd0ff" name="選物" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="font-display font-bold mb-4">本月營收構成</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={COMPOSITION} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110}>
                  {COMPOSITION.map((c) => <Cell key={c.name} fill={c.color} />)}
                </Pie>
                <Tooltip formatter={(v) => `NT$${Number(v).toLocaleString()}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <Card><CardContent>
      <div className="text-xs uppercase tracking-wider text-text-muted">{label}</div>
      <div className="mt-2 font-display text-3xl font-extrabold text-text-primary">{value}</div>
      <div className="mt-1 text-xs text-success font-semibold">↑ {delta}</div>
    </CardContent></Card>
  );
}
