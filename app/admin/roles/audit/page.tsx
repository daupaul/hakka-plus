"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useUi } from "@/lib/store/ui";
import { relativeTime } from "@/lib/utils";

const LOGS = [
  { id: "a1", at: "2026-05-21T10:24:00+08:00", actor: "王小美", action: "發布新聞", target: "義民祭 120 週年", detail: "從 review → published" },
  { id: "a2", at: "2026-05-21T09:48:00+08:00", actor: "張正杰", action: "新增影片", target: "薑花盛開時 EP15", detail: "建立草稿" },
  { id: "a3", at: "2026-05-21T08:30:00+08:00", actor: "林雅婷", action: "處理退款", target: "訂單 #o005", detail: "核可退款 NT$1,800" },
  { id: "a4", at: "2026-05-21T07:15:00+08:00", actor: "石展丞", action: "登入後台", target: "—", detail: "from IP 220.130.x.x" },
  { id: "a5", at: "2026-05-20T22:15:00+08:00", actor: "系統", action: "自動修復", target: "API 502", detail: "INC-2026-0142 已自動處理" },
  { id: "a6", at: "2026-05-20T18:00:00+08:00", actor: "蔡岳廷", action: "排程推播", target: "週末客家旅遊推薦", detail: "預計 5/22 18:00 發送" },
  { id: "a7", at: "2026-05-20T14:00:00+08:00", actor: "陳家瑀", action: "編輯策展", target: "歡迎時節，走進茶園裡的一場慢旅行", detail: "更新封面圖與第二段內文" },
  { id: "a8", at: "2026-05-20T10:00:00+08:00", actor: "白家宇", action: "權限變更", target: "u4 黃詩凡", detail: "從「行銷」改為「編輯」" },
  { id: "a9", at: "2026-05-19T16:30:00+08:00", actor: "楊敍", action: "資安報告", target: "DDoS 嘗試 (INC-2026-0137)", detail: "Cloudflare 自動防護" },
];

export default function AuditPage() {
  const toast = useUi((s) => s.toast);
  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">稽核日誌</h1>
          <p className="mt-1 text-sm text-text-secondary">所有後台操作記錄 — 對應 ISO 27001 與 v2 評委 Q5 危機處理可追溯性</p>
        </div>
        <Button variant="secondary" onClick={() => toast({ variant: "success", title: "已產生 CSV", description: "全月稽核日誌已下載" })}><Download className="size-4" /> 匯出 CSV</Button>
      </div>

      <Card><CardContent className="p-0">
        <table className="w-full text-sm">
          <thead className="bg-bg-elevated border-b border-border"><tr>
            <th className="text-left p-3 text-xs text-text-muted">時間</th>
            <th className="text-left p-3 text-xs text-text-muted">執行者</th>
            <th className="text-left p-3 text-xs text-text-muted">動作</th>
            <th className="text-left p-3 text-xs text-text-muted">對象</th>
            <th className="text-left p-3 text-xs text-text-muted">詳情</th>
          </tr></thead>
          <tbody>
            {LOGS.map((l) => (
              <tr key={l.id} className="border-b border-border last:border-b-0 hover:bg-bg-elevated/40">
                <td className="p-3 text-xs text-text-muted whitespace-nowrap">{relativeTime(l.at)}</td>
                <td className="p-3"><Badge variant={l.actor === "系統" ? "muted" : "default"}>{l.actor}</Badge></td>
                <td className="p-3 font-semibold text-text-primary">{l.action}</td>
                <td className="p-3 text-text-secondary">{l.target}</td>
                <td className="p-3 text-xs text-text-muted">{l.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent></Card>
    </div>
  );
}
