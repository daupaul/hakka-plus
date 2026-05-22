"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, MoreVertical } from "lucide-react";
import { useUi } from "@/lib/store/ui";

const USERS = [
  { id: "u1", name: "石展丞", email: "shi@hakka.tv", role: "超級管理員", active: true, lastLogin: "2026-05-21 09:30" },
  { id: "u2", name: "王小美", email: "wang@hakka.tv", role: "主編", active: true, lastLogin: "2026-05-21 10:15" },
  { id: "u3", name: "陳家瑀", email: "chen@hakka.tv", role: "編輯", active: true, lastLogin: "2026-05-21 11:00" },
  { id: "u4", name: "黃詩凡", email: "huang@hakka.tv", role: "編輯", active: true, lastLogin: "2026-05-20 18:00" },
  { id: "u5", name: "蔡岳廷", email: "tsai@hakka.tv", role: "行銷", active: true, lastLogin: "2026-05-21 14:00" },
  { id: "u6", name: "林雅婷", email: "lin@hakka.tv", role: "客服", active: true, lastLogin: "2026-05-21 08:30" },
  { id: "u7", name: "白家宇", email: "bai@hakka.tv", role: "超級管理員", active: true, lastLogin: "2026-05-21 10:24" },
  { id: "u8", name: "楊敍", email: "yang@hakka.tv", role: "主編", active: true, lastLogin: "2026-05-20 22:00" },
];

export default function UsersPage() {
  const toast = useUi((s) => s.toast);
  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">後台帳號管理</h1>
          <p className="mt-1 text-sm text-text-secondary">{USERS.length} 位後台用戶</p>
        </div>
        <Button onClick={() => toast({ variant: "default", title: "新增後台帳號" })}><Plus className="size-4" /> 新增帳號</Button>
      </div>

      <Card><CardContent className="p-0">
        <table className="w-full text-sm">
          <thead className="bg-bg-elevated border-b border-border"><tr>
            <th className="text-left p-3 text-xs text-text-muted">姓名</th>
            <th className="text-left p-3 text-xs text-text-muted">Email</th>
            <th className="text-left p-3 text-xs text-text-muted">角色</th>
            <th className="text-left p-3 text-xs text-text-muted">狀態</th>
            <th className="text-left p-3 text-xs text-text-muted">最近登入</th>
            <th />
          </tr></thead>
          <tbody>
            {USERS.map((u) => (
              <tr key={u.id} className="border-b border-border last:border-b-0 hover:bg-bg-elevated/40">
                <td className="p-3 font-semibold text-text-primary">{u.name}</td>
                <td className="p-3 text-text-secondary">{u.email}</td>
                <td className="p-3"><Badge variant={u.role === "超級管理員" ? "warm" : "default"}>{u.role}</Badge></td>
                <td className="p-3"><Badge variant={u.active ? "success" : "muted"}>{u.active ? "啟用" : "停用"}</Badge></td>
                <td className="p-3 text-xs text-text-muted">{u.lastLogin}</td>
                <td className="p-3 text-right"><Button size="sm" variant="ghost"><MoreVertical className="size-4" /></Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent></Card>
    </div>
  );
}
