"use client";

import Link from "next/link";
import { ShieldAlert, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUi } from "@/lib/store/ui";
import { relativeTime } from "@/lib/utils";

const INCIDENTS = [
  { id: "INC-2026-0142", title: "API 502 偶發異常", severity: "high", category: "技術", status: "open", openedAt: "2026-05-21T10:24:00+08:00", assignee: "SRE 白家宇" },
  { id: "INC-2026-0141", title: "iNews FTP 連線中斷", severity: "medium", category: "外部", status: "responded", openedAt: "2026-05-21T08:12:00+08:00", assignee: "技術部 鍾政翰" },
  { id: "INC-2026-0140", title: "ECPay 退款回呼延遲", severity: "low", category: "金流", status: "resolved", openedAt: "2026-05-20T18:30:00+08:00", assignee: "金流組 陳家瑀" },
  { id: "INC-2026-0139", title: "新聞編輯誤刪歷史報導", severity: "critical", category: "內容", status: "closed", openedAt: "2026-05-19T11:20:00+08:00", assignee: "編輯部 王小美" },
  { id: "INC-2026-0138", title: "短影音轉碼工作站 #3 離線", severity: "medium", category: "技術", status: "closed", openedAt: "2026-05-18T14:00:00+08:00", assignee: "SRE 白家宇" },
  { id: "INC-2026-0137", title: "DDoS 攻擊嘗試", severity: "high", category: "安全", status: "resolved", openedAt: "2026-05-17T03:00:00+08:00", assignee: "資安組 楊敍" },
];

export default function IncidentsPage() {
  const toast = useUi((s) => s.toast);
  const open = INCIDENTS.filter((i) => i.status === "open" || i.status === "responded").length;
  const critical = INCIDENTS.filter((i) => i.severity === "critical" && (i.status === "open" || i.status === "responded")).length;

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">事件單管理</h1>
          <p className="mt-1 text-sm text-text-secondary">對應 v2 評委 Q5「後台管理與危機處理」補強 — Log + SLA + DR 三軸並行</p>
        </div>
        <Button onClick={() => toast({ variant: "default", title: "建立新事件單" })}><Plus className="size-4" /> 新增事件</Button>
      </div>

      <div className="grid sm:grid-cols-4 gap-3">
        <Stat label="進行中" value={String(open)} tone="warning" />
        <Stat label="嚴重 (S1)" value={String(critical)} tone={critical > 0 ? "bad" : "good"} />
        <Stat label="本月平均回應" value="12 分" tone="good" />
        <Stat label="可用度 (30 日)" value="99.98%" tone="good" />
      </div>

      <Card><CardContent className="p-0">
        <table className="w-full text-sm">
          <thead className="bg-bg-elevated border-b border-border"><tr>
            <th className="text-left p-3 text-xs text-text-muted">事件 ID</th>
            <th className="text-left p-3 text-xs text-text-muted">嚴重度</th>
            <th className="text-left p-3 text-xs text-text-muted">標題</th>
            <th className="text-left p-3 text-xs text-text-muted">類別</th>
            <th className="text-left p-3 text-xs text-text-muted">負責人</th>
            <th className="text-left p-3 text-xs text-text-muted">狀態</th>
            <th className="text-left p-3 text-xs text-text-muted">開立時間</th>
          </tr></thead>
          <tbody>
            {INCIDENTS.map((i) => (
              <tr key={i.id} className="border-b border-border last:border-b-0 hover:bg-bg-elevated/50 cursor-pointer" onClick={() => toast({ variant: "default", title: `事件單 ${i.id}` })}>
                <td className="p-3 font-mono text-xs">{i.id}</td>
                <td className="p-3"><Badge variant={i.severity === "critical" ? "danger" : i.severity === "high" ? "warning" : i.severity === "medium" ? "warm" : "muted"}>{i.severity === "critical" ? "S1 嚴重" : i.severity === "high" ? "S2 高" : i.severity === "medium" ? "S3 中" : "S4 低"}</Badge></td>
                <td className="p-3 font-semibold text-text-primary">{i.title}</td>
                <td className="p-3"><Badge variant="outline">{i.category}</Badge></td>
                <td className="p-3 text-xs">{i.assignee}</td>
                <td className="p-3"><Badge variant={i.status === "open" ? "danger" : i.status === "responded" ? "warning" : i.status === "resolved" ? "success" : "muted"}>{i.status === "open" ? "未處理" : i.status === "responded" ? "回應中" : i.status === "resolved" ? "已解決" : "已結案"}</Badge></td>
                <td className="p-3 text-xs text-text-muted">{relativeTime(i.openedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent></Card>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: "good" | "warning" | "bad" }) {
  return <Card><CardContent>
    <div className="text-xs uppercase tracking-wider text-text-muted">{label}</div>
    <div className={`mt-2 font-display text-3xl font-extrabold ${tone === "good" ? "text-success" : tone === "warning" ? "text-warning" : "text-danger"}`}>{value}</div>
  </CardContent></Card>;
}
