"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Clock } from "lucide-react";

const TIERS = [
  { tier: "S1 (Critical)", response: 15, resolve: 4, unit: { response: "分鐘", resolve: "小時" }, current: "100%", current30d: "100%", color: "danger" },
  { tier: "S2 (High)", response: 1, resolve: 24, unit: { response: "小時", resolve: "小時" }, current: "98%", current30d: "99%", color: "warning" },
  { tier: "S3 (Medium)", response: 4, resolve: 72, unit: { response: "小時", resolve: "小時" }, current: "100%", current30d: "100%", color: "warm" },
  { tier: "S4 (Low)", response: 1, resolve: 0, unit: { response: "工作日", resolve: "" }, current: "100%", current30d: "100%", color: "muted" },
];

export default function SlaPage() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">SLA 監控</h1>
        <p className="mt-1 text-sm text-text-secondary">服務等級協議達成率 — 對應 v2 評委 Q5 提問的「事件回應 / 修復時間」承諾</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Stat label="本月達成率" value="99%" icon={<CheckCircle2 className="size-5 text-success" />} />
        <Stat label="近 30 日達成" value="99.5%" icon={<CheckCircle2 className="size-5 text-success" />} />
        <Stat label="目前未達" value="0" icon={<AlertCircle className="size-5 text-text-muted" />} />
        <Stat label="本月事件數" value="6" icon={<Clock className="size-5 text-text-muted" />} />
      </div>

      <Card><CardContent>
        <h2 className="font-display font-bold mb-4">四級 SLA 承諾</h2>
        <div className="space-y-3">
          {TIERS.map((t) => (
            <div key={t.tier} className="card p-4 bg-bg-base">
              <div className="flex items-center justify-between mb-3">
                <Badge variant={t.color as "danger" | "warning" | "warm" | "muted"}>{t.tier}</Badge>
                <div className="flex items-center gap-3 text-xs">
                  <span>本月：<span className="font-bold text-success">{t.current}</span></span>
                  <span>30 日：<span className="font-bold text-success">{t.current30d}</span></span>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-xs text-text-muted">承諾回應時間</div>
                  <div className="font-display font-bold text-text-primary">{t.response} {t.unit.response}內</div>
                </div>
                {t.resolve > 0 && (
                  <div>
                    <div className="text-xs text-text-muted">承諾修復時間</div>
                    <div className="font-display font-bold text-text-primary">{t.resolve} {t.unit.resolve}內</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent></Card>
    </div>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return <Card><CardContent>
    <div className="flex items-center gap-2">{icon}<span className="text-xs uppercase tracking-wider text-text-muted">{label}</span></div>
    <div className="mt-2 font-display text-3xl font-extrabold text-text-primary">{value}</div>
  </CardContent></Card>;
}
