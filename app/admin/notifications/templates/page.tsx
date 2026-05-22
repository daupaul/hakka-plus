"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Edit } from "lucide-react";
import { useUi } from "@/lib/store/ui";

const TEMPLATES = [
  { id: "t1", name: "新內容上架", channel: "push", lastUsed: "2026-05-20" },
  { id: "t2", name: "訂閱續約提醒 7 天前", channel: "email", lastUsed: "2026-05-20" },
  { id: "t3", name: "訂閱續約提醒 1 天前", channel: "email", lastUsed: "2026-05-18" },
  { id: "t4", name: "扣款失敗通知", channel: "sms", lastUsed: "2026-05-15" },
  { id: "t5", name: "歡迎信", channel: "email", lastUsed: "2026-05-21" },
  { id: "t6", name: "週末精選", channel: "push", lastUsed: "2026-05-18" },
  { id: "t7", name: "退款通知", channel: "email", lastUsed: "2026-04-23" },
  { id: "t8", name: "主題訂閱新內容", channel: "push", lastUsed: "2026-05-21" },
  { id: "t9", name: "節目開播提醒", channel: "push", lastUsed: "2026-05-21" },
  { id: "t10", name: "客服回覆通知", channel: "email", lastUsed: "2026-05-19" },
  { id: "t11", name: "密碼重設", channel: "email", lastUsed: "2026-05-15" },
  { id: "t12", name: "帳號異常登入", channel: "sms", lastUsed: "2026-05-10" },
];

export default function TemplatesPage() {
  const toast = useUi((s) => s.toast);
  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">通知模板庫</h1>
          <p className="mt-1 text-sm text-text-secondary">12 個常用通知模板，支援變數替換 (例：{`{{name}}`}、{`{{expires_at}}`})</p>
        </div>
        <Button onClick={() => toast({ variant: "default", title: "新建模板" })}><Plus className="size-4" /> 新增模板</Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {TEMPLATES.map((t) => (
          <Card key={t.id} className="hover:border-accent transition-colors">
            <CardContent>
              <div className="flex items-start justify-between mb-2">
                <FileText className="size-5 text-accent" />
                <Badge variant={t.channel === "push" ? "default" : t.channel === "email" ? "warm" : "muted"}>
                  {t.channel === "push" ? "推播" : t.channel === "email" ? "Email" : "SMS"}
                </Badge>
              </div>
              <div className="font-display font-bold text-text-primary">{t.name}</div>
              <div className="mt-1 text-xs text-text-muted">上次使用：{t.lastUsed}</div>
              <Button size="sm" variant="secondary" className="mt-3 w-full" onClick={() => toast({ variant: "default", title: `編輯：${t.name}` })}>
                <Edit className="size-3.5" /> 編輯
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
