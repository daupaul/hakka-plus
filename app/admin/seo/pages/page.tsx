"use client";

import { useState } from "react";
import { useContent } from "@/lib/store/content";
import { useUi } from "@/lib/store/ui";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const STATIC_PAGES = [
  { path: "/", title: "客+｜日常有客", description: "公視客家電視台 2027 客+ 平台 — 日常有客，讓文化成為生活的一部分。" },
  { path: "/watch", title: "影視 / 節目｜客+", description: "客家自製戲劇、紀錄片、綜藝節目線上看。" },
  { path: "/news", title: "新聞｜客+", description: "客家文化、客語教育、生活與政策新聞。" },
  { path: "/life", title: "生活+｜客+", description: "客家文化深度策展 — 旅遊、選物、節慶、工藝、飲食。" },
  { path: "/shop", title: "客家選物｜客+", description: "客台精選茶葉、工藝品、客語教材、食品、服飾。" },
];

export default function SeoPagesPage() {
  const toast = useUi((s) => s.toast);
  const settings = useContent((s) => s.settings);
  const [selected, setSelected] = useState(STATIC_PAGES[0]);

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">頁面 Meta 編輯</h1>
        <p className="mt-1 text-sm text-text-secondary">逐頁設定 title、description、Open Graph 與 canonical。</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        <aside className="lg:col-span-4">
          <div className="text-xs text-text-muted mb-2 px-1">頁面列表</div>
          <ul className="space-y-1">
            {STATIC_PAGES.map((p) => (
              <li key={p.path}>
                <button onClick={() => setSelected(p)} className={`w-full text-left card p-3 hover:border-accent transition-colors ${selected.path === p.path ? "border-accent" : ""}`}>
                  <code className="text-xs text-text-muted">{p.path}</code>
                  <div className="mt-1 font-semibold text-text-primary text-sm line-clamp-1">{p.title}</div>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="lg:col-span-8 space-y-4">
          <Card><CardContent className="space-y-4">
            <div>
              <div className="text-xs text-text-muted">編輯路徑</div>
              <code className="font-mono text-text-primary">{selected.path}</code>
            </div>
            <div>
              <label className="text-xs font-semibold text-text-secondary">Meta Title</label>
              <Input className="mt-1.5" value={selected.title} onChange={(e) => setSelected({ ...selected, title: e.target.value })} />
              <div className="mt-1 text-xs text-text-muted">{selected.title.length} / 70 字元</div>
            </div>
            <div>
              <label className="text-xs font-semibold text-text-secondary">Meta Description</label>
              <Textarea className="mt-1.5" value={selected.description} onChange={(e) => setSelected({ ...selected, description: e.target.value })} />
              <div className="mt-1 text-xs text-text-muted">{selected.description.length} / 160 字元</div>
            </div>
            <Button className="w-full" onClick={() => toast({ variant: "success", title: "已儲存 SEO 設定", description: selected.path })}>儲存</Button>
          </CardContent></Card>

          <Card><CardContent>
            <div className="text-xs text-text-muted mb-2">SERP 預覽</div>
            <div className="p-4 bg-white text-black rounded-lg">
              <div className="text-xs text-green-700">https://hakka.tv{selected.path}</div>
              <div className="text-xl text-blue-800 mt-1 font-medium">{selected.title}</div>
              <div className="text-sm text-gray-700 mt-1">{selected.description}</div>
            </div>
          </CardContent></Card>

          <Card><CardContent>
            <div className="text-xs text-text-muted mb-3">Open Graph 預覽 (社群分享)</div>
            <div className="card p-3 bg-bg-base">
              <div className="aspect-[1.91/1] bg-bg-deep rounded-lg mb-3 flex items-center justify-center text-text-muted text-xs">
                og-image.png (1200×630)
              </div>
              <div className="text-xs text-text-muted">{settings.siteName}</div>
              <div className="font-display font-bold text-text-primary">{selected.title}</div>
              <div className="text-sm text-text-secondary mt-1">{selected.description}</div>
            </div>
          </CardContent></Card>
        </div>
      </div>
    </div>
  );
}
