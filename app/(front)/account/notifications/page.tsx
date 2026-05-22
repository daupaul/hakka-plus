"use client";

import Link from "next/link";
import { useState } from "react";
import { useUi } from "@/lib/store/ui";
import { Bell, Mail, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NotificationsPage() {
  const toast = useUi((s) => s.toast);
  const [prefs, setPrefs] = useState({
    push: true,
    email: true,
    sms: false,
    newContent: true,
    promo: false,
    weekly: true,
  });

  const toggle = (k: keyof typeof prefs) => setPrefs((p) => ({ ...p, [k]: !p[k] }));

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
      <nav className="text-xs text-text-muted mb-4">
        <Link href="/account" className="hover:text-accent">會員中心</Link> / 通知偏好
      </nav>
      <h1 className="font-display text-3xl lg:text-5xl font-extrabold text-text-primary">通知偏好</h1>
      <p className="mt-3 text-text-secondary">設定你希望接收的通知管道與內容。</p>

      <Card className="mt-8">
        <CardContent>
          <h2 className="font-display text-lg font-bold text-text-primary mb-4">通知管道</h2>
          <div className="space-y-3">
            <Toggle icon={<Bell className="size-5" />} label="推播通知" desc="開啟後在 Web、App 收到即時推播" value={prefs.push} onChange={() => toggle("push")} />
            <Toggle icon={<Mail className="size-5" />} label="Email 通知" desc="每週日寄出客台週報" value={prefs.email} onChange={() => toggle("email")} />
            <Toggle icon={<MessageCircle className="size-5" />} label="SMS 簡訊" desc="僅針對訂閱續約 / 重要帳務通知" value={prefs.sms} onChange={() => toggle("sms")} />
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardContent>
          <h2 className="font-display text-lg font-bold text-text-primary mb-4">通知內容</h2>
          <div className="space-y-3">
            <Toggle label="新內容上架" desc="關注的主題、影集有新一集" value={prefs.newContent} onChange={() => toggle("newContent")} />
            <Toggle label="優惠活動" desc="會員獨家優惠、活動邀請" value={prefs.promo} onChange={() => toggle("promo")} />
            <Toggle label="每週重點" desc="每週日寄出本週客家文化精選" value={prefs.weekly} onChange={() => toggle("weekly")} />
          </div>
        </CardContent>
      </Card>

      <Button
        size="lg"
        className="mt-8 w-full"
        onClick={() => toast({ variant: "success", title: "已儲存通知偏好", description: "新設定立即生效。" })}
      >
        儲存設定
      </Button>
    </div>
  );
}

function Toggle({ label, desc, value, onChange, icon }: { label: string; desc: string; value: boolean; onChange: () => void; icon?: React.ReactNode }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      {icon && <div className="size-10 rounded-full bg-accent-soft text-accent inline-flex items-center justify-center shrink-0">{icon}</div>}
      <div className="flex-1">
        <div className="font-semibold text-text-primary text-sm">{label}</div>
        <div className="text-xs text-text-muted">{desc}</div>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        onClick={onChange}
        className={`relative h-6 w-11 rounded-full transition-colors shrink-0 ${value ? "bg-accent" : "bg-border"}`}
      >
        <span className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-bg-elevated transition-transform ${value ? "translate-x-5" : ""}`} />
      </button>
    </label>
  );
}
