"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Radio, Users, Video, Settings2 } from "lucide-react";
import { useUi } from "@/lib/store/ui";

const STREAMS = [
  { id: "ch1", name: "客家電視 主台", rtmp: "rtmp://live.hakka.tv/main", hls: "https://cdn.hakka.tv/main.m3u8", viewers: 4231, active: true, recording: true },
  { id: "ch2", name: "HAKKA+ HD", rtmp: "rtmp://live.hakka.tv/plus", hls: "https://cdn.hakka.tv/plus.m3u8", viewers: 1832, active: true, recording: true },
  { id: "ch3", name: "客家國際", rtmp: "rtmp://live.hakka.tv/intl", hls: "https://cdn.hakka.tv/intl.m3u8", viewers: 921, active: true, recording: false },
  { id: "ch4", name: "小客家兒童", rtmp: "rtmp://live.hakka.tv/kids", hls: "https://cdn.hakka.tv/kids.m3u8", viewers: 612, active: true, recording: true },
];

export default function LiveSettingsPage() {
  const toast = useUi((s) => s.toast);
  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">直播設定</h1>
        <p className="mt-1 text-sm text-text-secondary">4 個頻道直播串流配置、側錄、聊天室管理。</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {STREAMS.map((s) => (
          <Card key={s.id}>
            <CardContent>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-display font-bold text-text-primary flex items-center gap-2">
                    {s.name}
                    {s.active && <Badge variant="danger" className="bg-danger text-white"><Radio className="size-2.5 animate-pulse" /> LIVE</Badge>}
                  </div>
                  <div className="text-xs text-text-muted mt-0.5 inline-flex items-center gap-1">
                    <Users className="size-3" /> {s.viewers.toLocaleString()} 觀眾
                  </div>
                </div>
                <Button size="sm" variant="ghost" onClick={() => toast({ variant: "default", title: "已開啟頻道設定", description: s.name })}>
                  <Settings2 className="size-4" />
                </Button>
              </div>
              <div className="space-y-2 text-xs">
                <Row label="RTMP 來源">
                  <Input value={s.rtmp} readOnly className="h-8 text-xs font-mono" />
                </Row>
                <Row label="HLS 輸出">
                  <Input value={s.hls} readOnly className="h-8 text-xs font-mono" />
                </Row>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <label className="inline-flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" defaultChecked={s.recording} className="size-4" />
                    自動側錄
                  </label>
                  <Button size="sm" variant="secondary">
                    <Video className="size-3.5" /> 查看回放
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs text-text-muted mb-1">{label}</div>
      {children}
    </div>
  );
}
