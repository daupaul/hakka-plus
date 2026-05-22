"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUi } from "@/lib/store/ui";

export default function IncidentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const toast = useUi((s) => s.toast);

  return (
    <div className="space-y-6 max-w-4xl">
      <Link href="/admin/incidents" className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-accent"><ArrowLeft className="size-4" /> 回事件列表</Link>

      <div>
        <Badge variant="warning">S2 High</Badge>
        <h1 className="mt-2 font-display text-2xl lg:text-3xl font-extrabold text-text-primary">{id}: API 502 偶發異常</h1>
        <div className="mt-2 text-sm text-text-muted">開立於 2026-05-21 10:24 · 負責 SRE 白家宇</div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <Stat label="SLA 回應" value="12 分" tone="good" hint="承諾 1hr 內" />
        <Stat label="SLA 修復" value="進行中" tone="warning" hint="目標 24hr" />
        <Stat label="影響範圍" value="2.1%" tone="warning" hint="API 用戶比例" />
      </div>

      <Card><CardContent>
        <h2 className="font-display font-bold mb-3">事件時序軸</h2>
        <ol className="space-y-3 relative pl-6 border-l-2 border-border">
          {[
            { at: "10:24", actor: "監控系統", text: "Datadog 告警：API gateway 502 錯誤率 > 5%" },
            { at: "10:26", actor: "PagerDuty", text: "On-call 通知白家宇" },
            { at: "10:36", actor: "白家宇", text: "確認問題，初步診斷為 upstream 連線超時" },
            { at: "10:48", actor: "白家宇", text: "重啟其中一個 worker 後錯誤率降至 1%" },
            { at: "11:02", actor: "白家宇", text: "持續監控中，等待確認穩定" },
          ].map((e, i) => (
            <li key={i} className="relative">
              <div className="absolute -left-7 size-3 rounded-full bg-accent" />
              <div className="text-xs font-mono text-text-muted">{e.at}</div>
              <div className="font-semibold text-text-primary text-sm">{e.actor}</div>
              <div className="text-sm text-text-secondary mt-0.5">{e.text}</div>
            </li>
          ))}
        </ol>
      </CardContent></Card>

      <Card><CardContent>
        <h2 className="font-display font-bold mb-3">Postmortem (事後檢討)</h2>
        <p className="text-sm text-text-secondary">事件解決後，由負責人填寫 5 Why 分析、改善行動項與後續預防。</p>
        <Button className="mt-4" onClick={() => toast({ variant: "default", title: "開啟 Postmortem 編輯器" })}>編輯 Postmortem</Button>
      </CardContent></Card>
    </div>
  );
}

function Stat({ label, value, tone, hint }: { label: string; value: string; tone: "good" | "warning" | "bad"; hint?: string }) {
  return <Card><CardContent>
    <div className="text-xs uppercase tracking-wider text-text-muted">{label}</div>
    <div className={`mt-2 font-display text-2xl font-extrabold ${tone === "good" ? "text-success" : tone === "warning" ? "text-warning" : "text-danger"}`}>{value}</div>
    {hint && <div className="mt-1 text-xs text-text-muted">{hint}</div>}
  </CardContent></Card>;
}
