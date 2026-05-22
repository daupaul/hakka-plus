"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Smartphone, Building2, Store } from "lucide-react";
import { useUi } from "@/lib/store/ui";

const METHODS = [
  { id: "credit-card", name: "信用卡", icon: <CreditCard className="size-5" />, enabled: true, fee: "2.8%", desc: "Visa / Master / JCB · ECPay 處理" },
  { id: "apple-pay", name: "Apple Pay", icon: <Smartphone className="size-5" />, enabled: true, fee: "2.8%", desc: "iOS / macOS Safari" },
  { id: "google-pay", name: "Google Pay", icon: <Smartphone className="size-5" />, enabled: true, fee: "2.8%", desc: "Android / Chrome" },
  { id: "atm", name: "ATM 轉帳", icon: <Building2 className="size-5" />, enabled: true, fee: "NT$15", desc: "全行庫網路 ATM" },
  { id: "cvs", name: "超商代碼", icon: <Store className="size-5" />, enabled: true, fee: "NT$30", desc: "7-11 / 全家 / 萊爾富 / OK" },
  { id: "linepay", name: "LINE Pay", icon: <Smartphone className="size-5" />, enabled: false, fee: "2.5%", desc: "(尚未啟用)" },
];

export default function PaymentMethodsPage() {
  const toast = useUi((s) => s.toast);
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">付款方式設定</h1>
        <p className="mt-1 text-sm text-text-secondary">設定可用的金流付款方式與手續費率。</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {METHODS.map((m) => (
          <Card key={m.id}>
            <CardContent>
              <div className="flex items-start gap-3">
                <div className={`size-12 rounded-xl inline-flex items-center justify-center ${m.enabled ? "bg-accent-soft text-accent" : "bg-bg-base text-text-muted"}`}>{m.icon}</div>
                <div className="flex-1">
                  <div className="font-display font-bold text-text-primary flex items-center gap-2">
                    {m.name}
                    {m.enabled ? <Badge variant="success">啟用中</Badge> : <Badge variant="muted">已停用</Badge>}
                  </div>
                  <div className="mt-1 text-xs text-text-muted">{m.desc}</div>
                  <div className="mt-2 text-xs">手續費：<span className="font-bold text-text-primary">{m.fee}</span></div>
                </div>
                <label className="inline-flex cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={m.enabled}
                    onChange={() => toast({ variant: m.enabled ? "warning" : "success", title: m.enabled ? `已停用 ${m.name}` : `已啟用 ${m.name}` })}
                    className="size-5"
                  />
                </label>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
