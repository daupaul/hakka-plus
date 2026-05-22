"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Database, ShieldCheck, Clock } from "lucide-react";
import { useUi } from "@/lib/store/ui";

const DRILLS = [
  { id: "dr1", scenario: "主機房 (台北) 全斷電", scheduledAt: "2026-04-15", performedAt: "2026-04-15", result: "passed", rto: 245, rpo: 18, notes: "切換至高雄備援機房，RTO 達標 (S1 < 4hr)。BGP 切換 4 分鐘，DB 復原 25 分鐘，全鏈路驗證 25 分鐘。" },
  { id: "dr2", scenario: "資料庫主節點崩潰", scheduledAt: "2026-03-20", performedAt: "2026-03-20", result: "passed", rto: 12, rpo: 0, notes: "故障切換至 standby 復本，自動完成。WAL streaming 確保 RPO ~0。" },
  { id: "dr3", scenario: "Cloudflare R2 storage 區域失效", scheduledAt: "2026-02-15", performedAt: "2026-02-15", result: "passed", rto: 35, rpo: 0, notes: "切換至備援 R2 bucket，影片連結自動更新。" },
  { id: "dr4", scenario: "ECPay 金流服務中斷", scheduledAt: "2026-06-15", result: "pending", rto: 0, rpo: 0, notes: "下一次預定演練" },
];

export default function DrPage() {
  const toast = useUi((s) => s.toast);
  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">DR 災難復原演練</h1>
          <p className="mt-1 text-sm text-text-secondary">每季一次的災難復原演練紀錄與 RTO / RPO 監控</p>
        </div>
        <Button onClick={() => toast({ variant: "default", title: "新增演練計畫" })}>新增演練</Button>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <Card><CardContent>
          <div className="flex items-center gap-2"><ShieldCheck className="size-5 text-success" /><span className="text-xs uppercase tracking-wider text-text-muted">本年通過</span></div>
          <div className="mt-2 font-display text-3xl font-extrabold text-success">3 / 3</div>
        </CardContent></Card>
        <Card><CardContent>
          <div className="flex items-center gap-2"><Clock className="size-5 text-accent" /><span className="text-xs uppercase tracking-wider text-text-muted">平均 RTO</span></div>
          <div className="mt-2 font-display text-3xl font-extrabold text-text-primary">97 分</div>
          <div className="text-xs text-text-muted">承諾 S1 ≤ 4hr</div>
        </CardContent></Card>
        <Card><CardContent>
          <div className="flex items-center gap-2"><Database className="size-5 text-accent" /><span className="text-xs uppercase tracking-wider text-text-muted">平均 RPO</span></div>
          <div className="mt-2 font-display text-3xl font-extrabold text-text-primary">6 分</div>
          <div className="text-xs text-text-muted">承諾 ≤ 1hr</div>
        </CardContent></Card>
      </div>

      <Card><CardContent>
        <h2 className="font-display font-bold mb-3">演練紀錄</h2>
        <div className="space-y-3">
          {DRILLS.map((d) => (
            <div key={d.id} className="card p-4 bg-bg-base">
              <div className="flex items-start justify-between flex-wrap gap-3 mb-2">
                <div className="flex-1 min-w-[200px]">
                  <div className="font-display font-bold text-text-primary">{d.scenario}</div>
                  <div className="text-xs text-text-muted mt-1">演練日：{d.performedAt ?? d.scheduledAt}</div>
                </div>
                <Badge variant={d.result === "passed" ? "success" : d.result === "failed" ? "danger" : "warning"}>
                  {d.result === "passed" ? "通過" : d.result === "failed" ? "失敗" : "排程中"}
                </Badge>
              </div>
              {d.result !== "pending" && (
                <div className="grid sm:grid-cols-2 gap-3 mt-3 text-sm">
                  <div>
                    <div className="text-xs text-text-muted">實際 RTO</div>
                    <div className="font-display font-bold text-text-primary">{d.rto} 分鐘</div>
                  </div>
                  <div>
                    <div className="text-xs text-text-muted">資料損失 (RPO)</div>
                    <div className="font-display font-bold text-text-primary">{d.rpo} 分鐘</div>
                  </div>
                </div>
              )}
              <p className="mt-3 text-sm text-text-secondary">{d.notes}</p>
            </div>
          ))}
        </div>
      </CardContent></Card>
    </div>
  );
}
