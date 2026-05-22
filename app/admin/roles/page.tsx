"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

const ROLES = ["超級管理員", "主編", "編輯", "行銷", "客服", "Viewer"];
const PERMISSIONS = [
  { area: "影音", actions: ["檢視", "新增", "編輯", "發布", "刪除"] },
  { area: "新聞", actions: ["檢視", "新增", "編輯", "送審", "核可", "刪除"] },
  { area: "策展", actions: ["檢視", "編輯", "發布"] },
  { area: "會員", actions: ["檢視", "編輯", "暫停"] },
  { area: "金流", actions: ["檢視", "退款", "對帳"] },
  { area: "推播", actions: ["檢視", "發送", "排程"] },
  { area: "系統設定", actions: ["檢視", "編輯", "重置"] },
  { area: "權限管理", actions: ["檢視", "編輯"] },
];

// Permission matrix: index 0 = 超級管理員 (all), then progressively less
const MATRIX: Record<string, boolean[][]> = {
  "影音": [[true, true, true, true, true], [true, true, true, true, false], [true, true, true, false, false], [true, false, false, false, false], [true, false, false, false, false], [true, false, false, false, false]],
  "新聞": [[true, true, true, true, true, true], [true, true, true, true, true, true], [true, true, true, true, false, false], [true, false, false, false, false, false], [true, false, false, false, false, false], [true, false, false, false, false, false]],
  "策展": [[true, true, true], [true, true, true], [true, true, false], [true, true, false], [true, false, false], [true, false, false]],
  "會員": [[true, true, true], [true, true, false], [true, false, false], [true, false, false], [true, true, true], [true, false, false]],
  "金流": [[true, true, true], [true, false, false], [true, false, false], [true, false, false], [true, true, false], [true, false, false]],
  "推播": [[true, true, true], [true, true, true], [true, false, false], [true, true, true], [true, false, false], [true, false, false]],
  "系統設定": [[true, true, true], [true, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false]],
  "權限管理": [[true, true], [false, false], [false, false], [false, false], [false, false], [false, false]],
};

export default function RolesPage() {
  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">角色權限矩陣</h1>
        <p className="mt-1 text-sm text-text-secondary">6 個內建角色 × 8 個功能領域 × 細粒度動作權限</p>
      </div>

      <Card><CardContent className="p-0 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-bg-elevated border-b border-border"><tr>
            <th className="text-left p-3 text-xs text-text-muted w-32">功能領域</th>
            <th className="text-left p-3 text-xs text-text-muted w-24">動作</th>
            {ROLES.map((r) => <th key={r} className="text-center p-3 text-xs text-text-muted">{r}</th>)}
          </tr></thead>
          <tbody>
            {PERMISSIONS.map((p, pi) => p.actions.map((action, ai) => (
              <tr key={`${pi}-${ai}`} className="border-b border-border last:border-b-0">
                {ai === 0 && <td className="p-3 font-display font-bold text-text-primary align-top" rowSpan={p.actions.length}>{p.area}</td>}
                <td className="p-3 text-text-secondary">{action}</td>
                {ROLES.map((_, ri) => (
                  <td key={ri} className="p-3 text-center">
                    {MATRIX[p.area]?.[ri]?.[ai] ? <Check className="size-4 text-success mx-auto" /> : <X className="size-4 text-text-muted mx-auto" />}
                  </td>
                ))}
              </tr>
            )))}
          </tbody>
        </table>
      </CardContent></Card>
    </div>
  );
}
