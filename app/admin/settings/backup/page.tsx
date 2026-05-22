"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Database, CheckCircle2 } from "lucide-react";
import { useUi } from "@/lib/store/ui";

const HISTORY = [
  { date: "2026-05-21 02:00", size: "12.4 GB", status: "success", duration: "8 分鐘" },
  { date: "2026-05-20 02:00", size: "12.3 GB", status: "success", duration: "8 分鐘" },
  { date: "2026-05-19 02:00", size: "12.3 GB", status: "success", duration: "8 分鐘" },
  { date: "2026-05-18 02:00", size: "12.2 GB", status: "success", duration: "8 分鐘" },
  { date: "2026-05-17 02:00", size: "12.1 GB", status: "success", duration: "7 分鐘" },
];

export default function BackupPage() {
  const toast = useUi((s) => s.toast);
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">備份排程</h1>
        <p className="mt-1 text-sm text-text-secondary">每日自動備份 DB + Object Storage，保留 30 天</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <Card><CardContent>
          <div className="flex items-center gap-2"><Database className="size-5 text-accent" /><span className="text-xs uppercase tracking-wider text-text-muted">最後備份</span></div>
          <div className="mt-2 font-display font-bold text-text-primary">今日 02:00</div>
          <div className="text-xs text-success mt-1 inline-flex items-center gap-1"><CheckCircle2 className="size-3" /> 成功</div>
        </CardContent></Card>
        <Card><CardContent>
          <div className="text-xs uppercase tracking-wider text-text-muted">備份策略</div>
          <div className="mt-2 font-display font-bold text-text-primary">每日 02:00</div>
          <div className="text-xs text-text-muted mt-1">保留 30 天</div>
        </CardContent></Card>
        <Card><CardContent>
          <div className="text-xs uppercase tracking-wider text-text-muted">儲存位置</div>
          <div className="mt-2 font-display font-bold text-text-primary">R2 + 高雄機房</div>
          <div className="text-xs text-text-muted mt-1">3-2-1 備份原則</div>
        </CardContent></Card>
      </div>

      <Card><CardContent>
        <h2 className="font-display font-bold mb-3">設定</h2>
        <div className="space-y-3 text-sm">
          <Row label="備份頻率"><select className="h-10 rounded-lg border border-border bg-bg-elevated px-3 text-sm"><option>每小時</option><option selected>每日</option><option>每週</option></select></Row>
          <Row label="備份時間"><input type="time" defaultValue="02:00" className="h-10 rounded-lg border border-border bg-bg-elevated px-3 text-sm" /></Row>
          <Row label="保留天數"><input type="number" defaultValue={30} className="h-10 w-24 rounded-lg border border-border bg-bg-elevated px-3 text-sm" /></Row>
          <Row label="加密"><label className="inline-flex items-center gap-2"><input type="checkbox" defaultChecked className="size-4" /> AES-256-GCM</label></Row>
        </div>
        <div className="mt-4 flex gap-2">
          <Button onClick={() => toast({ variant: "success", title: "已觸發手動備份", description: "預計 8 分鐘內完成" })}>立即備份</Button>
          <Button variant="secondary" onClick={() => toast({ variant: "default", title: "已儲存備份設定" })}>儲存設定</Button>
        </div>
      </CardContent></Card>

      <Card><CardContent>
        <h2 className="font-display font-bold mb-3">最近 5 次備份</h2>
        <table className="w-full text-sm">
          <thead className="bg-bg-elevated border-b border-border"><tr>
            <th className="text-left p-3 text-xs text-text-muted">時間</th>
            <th className="text-left p-3 text-xs text-text-muted">大小</th>
            <th className="text-left p-3 text-xs text-text-muted">耗時</th>
            <th className="text-left p-3 text-xs text-text-muted">狀態</th>
            <th />
          </tr></thead>
          <tbody>
            {HISTORY.map((h) => (
              <tr key={h.date} className="border-b border-border last:border-b-0">
                <td className="p-3 font-mono text-xs">{h.date}</td>
                <td className="p-3">{h.size}</td>
                <td className="p-3 text-xs text-text-muted">{h.duration}</td>
                <td className="p-3"><Badge variant="success">成功</Badge></td>
                <td className="p-3 text-right"><Button size="sm" variant="ghost">下載</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent></Card>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="grid grid-cols-2 items-center gap-3"><label className="text-xs font-semibold text-text-secondary">{label}</label>{children}</div>;
}
