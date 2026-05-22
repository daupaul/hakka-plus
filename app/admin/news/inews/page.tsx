"use client";

import { Cloud, CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUi } from "@/lib/store/ui";
import { relativeTime } from "@/lib/utils";

const IMPORTS = [
  { id: "i1", fetchedAt: "2026-05-21T10:00:00+08:00", filename: "20260521-0001.nsml", status: "imported", detail: "義民祭 120 週年" },
  { id: "i2", fetchedAt: "2026-05-21T09:00:00+08:00", filename: "20260521-0002.nsml", status: "imported", detail: "客家青年返鄉專題" },
  { id: "i3", fetchedAt: "2026-05-21T08:00:00+08:00", filename: "20260521-0003.nsml", status: "duplicated", detail: "與 n01 標題相似，已合併" },
  { id: "i4", fetchedAt: "2026-05-20T22:00:00+08:00", filename: "20260520-0042.nsml", status: "imported", detail: "教育部客語調查報告" },
  { id: "i5", fetchedAt: "2026-05-20T18:00:00+08:00", filename: "20260520-0041.nsml", status: "rejected", detail: "內容不符客家頻道屬性" },
];

export default function INewsImportPage() {
  const toast = useUi((s) => s.toast);

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">iNews FTP 匯入紀錄</h1>
        <p className="mt-1 text-sm text-text-secondary">每 30 分鐘從 iNews FTP 自動拉取 NSML 檔案，經內容解析後送入新聞系統。</p>
      </div>

      <div className="grid sm:grid-cols-4 gap-3">
        <Stat label="今日已匯入" value="14" tone="good" />
        <Stat label="重複過濾" value="3" tone="warning" />
        <Stat label="今日駁回" value="2" tone="bad" />
        <Stat label="連線狀態" value="正常" tone="good" />
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={() => toast({ variant: "success", title: "已手動觸發拉取", description: "預計 30 秒內完成。" })}>
          <Cloud className="size-4" /> 立即拉取
        </Button>
        <Button variant="secondary">設定 FTP 帳號</Button>
      </div>

      <Card>
        <CardContent>
          <h2 className="font-display font-bold mb-3">最近匯入紀錄</h2>
          <ul className="divide-y divide-border">
            {IMPORTS.map((imp) => (
              <li key={imp.id} className="py-3 flex items-center gap-3">
                <div className={`size-9 rounded-full inline-flex items-center justify-center ${imp.status === "imported" ? "bg-success/15 text-success" : imp.status === "duplicated" ? "bg-warning/15 text-warning" : "bg-danger/15 text-danger"}`}>
                  {imp.status === "imported" ? <CheckCircle2 className="size-4" /> : imp.status === "duplicated" ? <AlertCircle className="size-4" /> : <XCircle className="size-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-text-primary text-sm font-mono">{imp.filename}</div>
                  <div className="text-xs text-text-muted">{imp.detail}</div>
                </div>
                <Badge variant={imp.status === "imported" ? "success" : imp.status === "duplicated" ? "warning" : "danger"}>
                  {imp.status === "imported" ? "已匯入" : imp.status === "duplicated" ? "重複" : "駁回"}
                </Badge>
                <div className="text-xs text-text-muted w-24 text-right">{relativeTime(imp.fetchedAt)}</div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: "good" | "warning" | "bad" }) {
  return (
    <Card>
      <CardContent>
        <div className="text-xs uppercase tracking-wider text-text-muted">{label}</div>
        <div className={`mt-2 font-display text-3xl font-extrabold ${tone === "good" ? "text-success" : tone === "warning" ? "text-warning" : "text-danger"}`}>{value}</div>
      </CardContent>
    </Card>
  );
}
