"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useContent } from "@/lib/store/content";
import { useUi } from "@/lib/store/ui";

export default function MonitoringPage() {
  const settings = useContent((s) => s.settings);
  const toast = useUi((s) => s.toast);

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">監控閾值</h1>
        <p className="mt-1 text-sm text-text-secondary">超過閾值自動建立事件單並通知 on-call</p>
      </div>

      <Card><CardContent>
        <h2 className="font-display font-bold mb-4">系統監控</h2>
        <div className="space-y-4">
          <Slider label="CPU 使用率" value={settings.monitoring.cpuThreshold} max={100} unit="%" />
          <Slider label="記憶體使用率" value={settings.monitoring.memoryThreshold} max={100} unit="%" />
          <Slider label="磁碟使用率" value={settings.monitoring.diskThreshold} max={100} unit="%" />
        </div>
      </CardContent></Card>

      <Card><CardContent>
        <h2 className="font-display font-bold mb-4">告警通道</h2>
        <div className="space-y-3 text-sm">
          <Row label="PagerDuty" status="已連結" account="hakka-tv-oncall" />
          <Row label="Slack #ops-alerts" status="已連結" account="@channel" />
          <Row label="Email" status="已連結" account="ops@hakka.tv" />
          <Row label="SMS" status="已連結" account="on-call 輪值表" />
        </div>
      </CardContent></Card>

      <Button className="w-full" onClick={() => toast({ variant: "success", title: "已儲存監控設定" })}>儲存設定</Button>
    </div>
  );
}

function Slider({ label, value, max, unit }: { label: string; value: number; max: number; unit: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="font-semibold text-text-primary text-sm">{label}</span>
        <span className="font-display font-bold text-accent">{value}{unit}</span>
      </div>
      <input type="range" min={0} max={max} defaultValue={value} className="w-full accent-accent" />
    </div>
  );
}

function Row({ label, status, account }: { label: string; status: string; account: string }) {
  return (
    <div className="flex items-center gap-3 py-2 border-b border-border last:border-b-0">
      <div className="flex-1">
        <div className="font-semibold text-text-primary">{label}</div>
        <div className="text-xs text-text-muted">{account}</div>
      </div>
      <Badge variant="success">{status}</Badge>
    </div>
  );
}
