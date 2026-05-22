"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useContent } from "@/lib/store/content";
import { useSeniorMode } from "@/lib/store/senior-mode";
import { useAuth } from "@/lib/store/auth";
import { useUi } from "@/lib/store/ui";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function ResetPage() {
  const router = useRouter();
  const reset = useContent((s) => s.reset);
  const setSenior = useSeniorMode((s) => s.setEnabled);
  const logoutAdmin = useAuth((s) => s.logoutAdmin);
  const logoutMember = useAuth((s) => s.logoutMember);
  const toast = useUi((s) => s.toast);
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">重置 Demo 資料</h1>
        <p className="mt-1 text-sm text-text-secondary">將所有 CRUD 操作的結果還原為初始 seed 資料，前端 localStorage 將被清空。</p>
      </div>

      <Card className="border-warning/40 bg-warning/5"><CardContent>
        <div className="flex items-start gap-3">
          <AlertTriangle className="size-6 text-warning shrink-0" />
          <div>
            <h2 className="font-bold text-text-primary">將會還原以下資料</h2>
            <ul className="mt-2 text-sm text-text-secondary space-y-1 list-disc list-inside">
              <li>影片、新聞、策展、商品 — 還原為初始 seed</li>
              <li>所有後台改動 (CRUD) 將消失</li>
              <li>會員登入狀態、後台登入狀態</li>
              <li>長輩友善模式偏好</li>
              <li>網站設定、API 整合 mock keys</li>
            </ul>
            <p className="mt-3 text-xs text-text-muted">此操作僅影響本機 localStorage，不會影響線上版本（如有部署）。</p>
          </div>
        </div>
      </CardContent></Card>

      {!confirming ? (
        <Button variant="danger" size="lg" onClick={() => setConfirming(true)}>
          開始重置流程
        </Button>
      ) : (
        <Card><CardContent>
          <h3 className="font-display font-bold text-text-primary mb-2">⚠ 最後確認</h3>
          <p className="text-sm text-text-secondary mb-4">所有 demo 改動將永久消失，無法復原。</p>
          <div className="flex gap-2">
            <Button
              variant="danger"
              size="lg"
              onClick={() => {
                reset();
                setSenior(false);
                logoutAdmin();
                logoutMember();
                toast({ variant: "success", title: "已重置為初始狀態", description: "已清除所有 localStorage" });
                setTimeout(() => router.replace("/admin/login"), 1000);
              }}
            >
              是的，重置全部
            </Button>
            <Button variant="ghost" size="lg" onClick={() => setConfirming(false)}>取消</Button>
          </div>
        </CardContent></Card>
      )}
    </div>
  );
}
