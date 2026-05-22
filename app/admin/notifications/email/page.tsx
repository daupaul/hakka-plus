"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useUi } from "@/lib/store/ui";

export default function EmailPage() {
  const toast = useUi((s) => s.toast);
  const [form, setForm] = useState({ subject: "", from: "客+ 服務團隊 <service@hakka.tv>", body: "" });

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">Email 通知</h1>
        <p className="mt-1 text-sm text-text-secondary">透過 SendGrid SMTP 發送行銷與交易 Email。</p>
      </div>

      <Card><CardContent className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-text-secondary">寄件人</label>
          <Input className="mt-1.5" value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} />
        </div>
        <div>
          <label className="text-xs font-semibold text-text-secondary">主旨</label>
          <Input className="mt-1.5" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="本週客家文化精選" />
        </div>
        <div>
          <label className="text-xs font-semibold text-text-secondary">內容 (支援 HTML / Markdown)</label>
          <Textarea className="mt-1.5 min-h-[320px] font-mono text-xs" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} placeholder="親愛的客家朋友您好，..." />
        </div>
        <div className="flex gap-2">
          <Button onClick={() => toast({ variant: "success", title: "已寄送", description: "預計 10 分鐘內送達 8,421 個收件人" })}><Mail className="size-4" /> 寄送</Button>
          <Button variant="secondary">儲存草稿</Button>
          <Button variant="ghost">測試寄送</Button>
        </div>
      </CardContent></Card>
    </div>
  );
}
