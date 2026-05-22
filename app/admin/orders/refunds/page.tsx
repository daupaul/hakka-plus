"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUi } from "@/lib/store/ui";

const PENDING = [
  { id: "rfd-001", orderId: "o006", member: "陳阿華", amount: 49, reason: "未觀看", submittedAt: "2026-05-21 08:30" },
  { id: "rfd-002", orderId: "o010", member: "黃志明", amount: 199, reason: "重複扣款", submittedAt: "2026-05-20 17:15" },
];
const HISTORY = [
  { id: "rfd-h1", orderId: "o005", member: "賴阿淑", amount: 1800, status: "approved", processedAt: "2026-04-23 15:00" },
  { id: "rfd-h2", orderId: "o020", member: "李大同", amount: 99, status: "approved", processedAt: "2026-04-15 11:00" },
  { id: "rfd-h3", orderId: "o030", member: "張小玲", amount: 199, status: "rejected", processedAt: "2026-04-10 16:30" },
];

export default function RefundsPage() {
  const toast = useUi((s) => s.toast);
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">退款管理</h1>
        <p className="mt-1 text-sm text-text-secondary">會員申請退款的審核與處理。</p>
      </div>

      <section>
        <h2 className="font-display text-lg font-bold text-text-primary mb-3">待處理 ({PENDING.length})</h2>
        <div className="space-y-3">
          {PENDING.map((r) => (
            <Card key={r.id}>
              <CardContent className="flex items-center gap-4 flex-wrap">
                <div className="flex-1 min-w-[200px]">
                  <Badge variant="warning">待審核</Badge>
                  <div className="mt-1 font-semibold text-text-primary">{r.member} · 訂單 #{r.orderId}</div>
                  <div className="text-xs text-text-muted">理由：{r.reason} · 申請於 {r.submittedAt}</div>
                </div>
                <div className="font-display text-2xl font-extrabold text-text-primary">NT${r.amount}</div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => toast({ variant: "success", title: "已核可退款", description: `將於 7 個工作天內退至 ${r.member}` })}>核可</Button>
                  <Button size="sm" variant="ghost" onClick={() => toast({ variant: "warning", title: "已駁回退款" })}>駁回</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold text-text-primary mb-3">處理歷史</h2>
        <Card><CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="bg-bg-elevated border-b border-border"><tr>
              <th className="text-left p-3 text-xs text-text-muted">退款編號</th>
              <th className="text-left p-3 text-xs text-text-muted">會員</th>
              <th className="text-left p-3 text-xs text-text-muted">金額</th>
              <th className="text-left p-3 text-xs text-text-muted">狀態</th>
              <th className="text-left p-3 text-xs text-text-muted">處理時間</th>
            </tr></thead>
            <tbody>
              {HISTORY.map((h) => (
                <tr key={h.id} className="border-b border-border last:border-b-0">
                  <td className="p-3 font-mono text-xs">{h.id}</td>
                  <td className="p-3">{h.member}</td>
                  <td className="p-3 font-bold">NT${h.amount}</td>
                  <td className="p-3"><Badge variant={h.status === "approved" ? "success" : "danger"}>{h.status === "approved" ? "已核可" : "已駁回"}</Badge></td>
                  <td className="p-3 text-xs text-text-muted">{h.processedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent></Card>
      </section>
    </div>
  );
}
