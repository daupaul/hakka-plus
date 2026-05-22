"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Mail, MessageCircle, FileText, ArrowRight } from "lucide-react";

const CAMPAIGNS = [
  { id: "c1", template: "週末客家旅遊推薦", channel: "push", audience: "25-40 文化愛好者", scheduled: "2026-05-22 18:00", status: "scheduled", sent: 0, opened: 0, clicked: 0 },
  { id: "c2", template: "新一集《茶山書簡》上架", channel: "email", audience: "茶宇宙訂閱者", scheduled: "2026-05-20 10:00", status: "sent", sent: 8421, opened: 4231, clicked: 1832 },
  { id: "c3", template: "義民祭 120 週年特別企劃", channel: "push", audience: "全用戶", scheduled: "2026-05-19 16:00", status: "sent", sent: 12842, opened: 7211, clicked: 3201 },
  { id: "c4", template: "訂閱續約提醒 7 天前", channel: "email", audience: "5/27 到期會員", scheduled: "2026-05-20 09:00", status: "sent", sent: 421, opened: 312, clicked: 89 },
  { id: "c5", template: "扣款失敗通知", channel: "sms", audience: "扣款失敗會員", scheduled: "—", status: "draft", sent: 0, opened: 0, clicked: 0 },
];

export default function NotificationsPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">推播 & 通知</h1>
          <p className="mt-1 text-sm text-text-secondary">推播、Email、SMS 三大通道整合管理</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-3">
        <Link href="/admin/notifications/push"><Card className="hover:border-accent transition-colors">
          <CardContent><div className="text-accent"><Bell className="size-5" /></div><div className="mt-2 font-display font-bold text-text-primary">推播通知</div><div className="text-xs text-text-muted mt-1">FCM / APNs</div><ArrowRight className="size-3 mt-3 text-text-muted" /></CardContent>
        </Card></Link>
        <Link href="/admin/notifications/email"><Card className="hover:border-accent transition-colors">
          <CardContent><div className="text-accent"><Mail className="size-5" /></div><div className="mt-2 font-display font-bold text-text-primary">Email 通知</div><div className="text-xs text-text-muted mt-1">SendGrid SMTP</div><ArrowRight className="size-3 mt-3 text-text-muted" /></CardContent>
        </Card></Link>
        <Link href="/admin/notifications/sms"><Card className="hover:border-accent transition-colors">
          <CardContent><div className="text-accent"><MessageCircle className="size-5" /></div><div className="mt-2 font-display font-bold text-text-primary">SMS 簡訊</div><div className="text-xs text-text-muted mt-1">Mitake</div><ArrowRight className="size-3 mt-3 text-text-muted" /></CardContent>
        </Card></Link>
        <Link href="/admin/notifications/templates"><Card className="hover:border-accent transition-colors">
          <CardContent><div className="text-accent"><FileText className="size-5" /></div><div className="mt-2 font-display font-bold text-text-primary">模板庫</div><div className="text-xs text-text-muted mt-1">12 個模板</div><ArrowRight className="size-3 mt-3 text-text-muted" /></CardContent>
        </Card></Link>
      </div>

      <Card><CardContent>
        <h2 className="font-display font-bold mb-3">近期活動</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-bg-elevated border-b border-border"><tr>
              <th className="text-left p-3 text-xs text-text-muted">活動名稱</th>
              <th className="text-left p-3 text-xs text-text-muted">通道</th>
              <th className="text-left p-3 text-xs text-text-muted">受眾</th>
              <th className="text-left p-3 text-xs text-text-muted">時間</th>
              <th className="text-left p-3 text-xs text-text-muted">狀態</th>
              <th className="text-left p-3 text-xs text-text-muted">送達 / 開信 / 點擊</th>
            </tr></thead>
            <tbody>
              {CAMPAIGNS.map((c) => (
                <tr key={c.id} className="border-b border-border last:border-b-0">
                  <td className="p-3"><div className="font-semibold text-text-primary">{c.template}</div></td>
                  <td className="p-3"><Badge variant={c.channel === "push" ? "default" : c.channel === "email" ? "warm" : "muted"}>{c.channel === "push" ? "推播" : c.channel === "email" ? "Email" : "SMS"}</Badge></td>
                  <td className="p-3 text-xs">{c.audience}</td>
                  <td className="p-3 text-xs text-text-muted">{c.scheduled}</td>
                  <td className="p-3"><Badge variant={c.status === "sent" ? "success" : c.status === "scheduled" ? "warning" : "muted"}>{c.status === "sent" ? "已發送" : c.status === "scheduled" ? "排程" : "草稿"}</Badge></td>
                  <td className="p-3 text-xs">{c.sent.toLocaleString()} / {c.opened.toLocaleString()} / {c.clicked.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent></Card>
    </div>
  );
}
