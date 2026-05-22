"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle } from "lucide-react";
import { useUi } from "@/lib/store/ui";

export default function SmsPage() {
  const toast = useUi((s) => s.toast);
  const [body, setBody] = useState("");
  const cost = Math.ceil(body.length / 70) * 1.2; // NT$1.2 per SMS

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">SMS 簡訊</h1>
        <p className="mt-1 text-sm text-text-secondary">透過 Mitake 三竹簡訊發送系統，僅用於交易性通知（扣款失敗、訂閱續約提醒）。</p>
      </div>

      <Card><CardContent className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-text-secondary">訊息內容</label>
          <Textarea className="mt-1.5" maxLength={70 * 3} value={body} onChange={(e) => setBody(e.target.value)} placeholder="【客+】您的訂閱將於 5/27 到期，續訂連結：https://hakka.tv/r/x" />
          <div className="mt-1 flex items-center justify-between text-xs text-text-muted">
            <span>{body.length} / 210 字元 ({Math.ceil(body.length / 70)} 則簡訊)</span>
            <Badge variant="warm">預估費用 NT${cost.toFixed(1)}</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => toast({ variant: "success", title: "已發送", description: `已送至 421 名收件人` })}><MessageCircle className="size-4" /> 發送</Button>
          <Button variant="ghost">測試送出</Button>
        </div>
      </CardContent></Card>

      <Card className="border-warning/40 bg-warning/5"><CardContent>
        <div className="text-xs font-semibold text-warning mb-1">SMS 發送原則</div>
        <ul className="text-sm text-text-secondary space-y-1 list-disc list-inside">
          <li>僅用於交易性通知，不發送行銷簡訊</li>
          <li>收件人需先同意接收 SMS 通知</li>
          <li>每月 SMS 預算上限：NT$ 50,000</li>
        </ul>
      </CardContent></Card>
    </div>
  );
}
