"use client";

import { useState } from "react";
import { useContent } from "@/lib/store/content";
import { useUi } from "@/lib/store/ui";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function IntegrationsPage() {
  const settings = useContent((s) => s.settings);
  const updateSettings = useContent((s) => s.updateSettings);
  const toast = useUi((s) => s.toast);
  const [data, setData] = useState(settings.integrations);

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">API 整合設定</h1>
        <p className="mt-1 text-sm text-text-secondary">第三方服務 API 金鑰與連線設定（敏感資料以 **** 顯示）</p>
      </div>

      <Card><CardContent className="space-y-5">
        <Group title="公視節目表 API">
          <Field label="Endpoint" value={data.publicTvScheduleApi} onChange={(v) => setData({ ...data, publicTvScheduleApi: v })} />
        </Group>

        <Group title="iNews FTP">
          <Field label="Host" value={data.inewsFtpHost} onChange={(v) => setData({ ...data, inewsFtpHost: v })} />
          <Field label="Username" value={data.inewsFtpUser} onChange={(v) => setData({ ...data, inewsFtpUser: v })} />
          <Field label="Password" type="password" value="****" onChange={() => {}} />
        </Group>

        <Group title="ECPay 金流">
          <Field label="商店代號" value={data.ecpayMerchantId} onChange={(v) => setData({ ...data, ecpayMerchantId: v })} />
          <Field label="HashKey" type="password" value="****" onChange={() => {}} />
          <Field label="HashIV" type="password" value="****" onChange={() => {}} />
        </Group>

        <Group title="Google Analytics 4">
          <Field label="Measurement ID" value={data.googleAnalyticsId} onChange={(v) => setData({ ...data, googleAnalyticsId: v })} />
        </Group>

        <Group title="Meta Pixel">
          <Field label="Pixel ID" value={data.metaPixelId} onChange={(v) => setData({ ...data, metaPixelId: v })} />
        </Group>

        <Group title="Firebase Cloud Messaging">
          <Field label="Server Key" type="password" value="****" onChange={() => {}} />
        </Group>

        <Group title="SendGrid SMTP">
          <Field label="Host" value={data.smtpHost} onChange={(v) => setData({ ...data, smtpHost: v })} />
          <Field label="Username" value={data.smtpUser} onChange={(v) => setData({ ...data, smtpUser: v })} />
          <Field label="API Key" type="password" value="****" onChange={() => {}} />
        </Group>

        <Group title="Mitake SMS">
          <Field label="Provider" value={data.smsProvider} onChange={(v) => setData({ ...data, smsProvider: v })} />
          <Field label="Account" type="password" value="****" onChange={() => {}} />
        </Group>

        <Group title="Cloudflare R2 / CDN">
          <Field label="API Token" type="password" value="****" onChange={() => {}} />
          <Field label="Account ID" value={data.cdnApiKey} onChange={(v) => setData({ ...data, cdnApiKey: v })} />
        </Group>

        <Button className="w-full" onClick={() => { updateSettings({ integrations: data }); toast({ variant: "success", title: "已儲存整合設定" }); }}>儲存所有設定</Button>
      </CardContent></Card>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-border last:border-b-0 pb-4 last:pb-0">
      <h3 className="font-display font-bold text-text-primary mb-3">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div className="grid sm:grid-cols-3 items-center gap-3">
      <label className="text-xs font-semibold text-text-secondary">{label}</label>
      <div className="sm:col-span-2">
        <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
    </div>
  );
}
