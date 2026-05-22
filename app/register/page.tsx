"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/store/auth";
import { useUi } from "@/lib/store/ui";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const router = useRouter();
  const login = useAuth((s) => s.loginMember);
  const toast = useUi((s) => s.toast);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-bg-base">
      <div className="w-full max-w-md card p-8 space-y-6">
        <div>
          <Link href="/" className="font-display text-2xl font-extrabold text-text-primary">
            Hakka<span className="text-accent">+</span>
          </Link>
          <h1 className="mt-4 font-display text-2xl font-bold text-text-primary">建立新帳號</h1>
          <p className="mt-2 text-sm text-text-secondary">免費註冊享 7 天試用，無限觀看非付費內容。</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login("m003");
            toast({ variant: "success", title: "註冊成功", description: "歡迎加入客+，已自動開啟 7 天試用！" });
            router.replace("/account");
          }}
          className="space-y-4"
        >
          <div>
            <label className="text-xs font-semibold text-text-secondary">姓名</label>
            <Input className="mt-1.5" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary">Email</label>
            <Input className="mt-1.5" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary">密碼</label>
            <Input className="mt-1.5" type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          <Button type="submit" className="w-full" size="lg">建立帳號</Button>
        </form>
        <div className="text-center text-sm text-text-muted">
          已有帳號？ <Link href="/login" className="text-accent hover:underline">登入</Link>
        </div>
      </div>
    </div>
  );
}
