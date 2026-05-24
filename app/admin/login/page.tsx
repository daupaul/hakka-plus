"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/store/auth";
import { useUi } from "@/lib/store/ui";
import { HakkaLogo } from "@/components/front/layout/logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const login = useAuth((s) => s.loginAsAdmin);
  const toast = useUi((s) => s.toast);
  const [email, setEmail] = useState("editor@hakka.tv");
  const [password, setPassword] = useState("demo");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    toast({ variant: "success", title: "已登入後台", description: `Welcome, ${email}` });
    router.replace("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-bg-base">
      <div className="w-full max-w-md card p-8 space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <HakkaLogo size="lg" invert />
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-accent-soft text-accent">Admin</span>
          </div>
          <p className="mt-3 text-sm text-text-secondary">
            POC 階段假登入 — 隨便輸入 email 與密碼即可進入後台。
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-secondary">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-secondary">密碼</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full" size="lg">
            登入
          </Button>
        </form>
        <p className="text-xs text-text-muted text-center">
          全部介面以 mock data 呈現，所有寫入均儲存於 localStorage。
        </p>
      </div>
    </div>
  );
}
