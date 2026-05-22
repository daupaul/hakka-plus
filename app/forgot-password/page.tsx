"use client";

import { useState } from "react";
import Link from "next/link";
import { useUi } from "@/lib/store/ui";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const toast = useUi((s) => s.toast);
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-bg-base">
      <div className="w-full max-w-md card p-8 space-y-6">
        <div>
          <Link href="/" className="font-display text-2xl font-extrabold text-text-primary">
            Hakka<span className="text-accent">+</span>
          </Link>
          <h1 className="mt-4 font-display text-2xl font-bold text-text-primary">忘記密碼</h1>
          <p className="mt-2 text-sm text-text-secondary">輸入註冊的 Email，我們會寄送重設密碼連結。</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast({ variant: "success", title: "已寄出重設密碼信", description: `若 ${email} 為註冊帳號，請至信箱完成密碼重設。` });
          }}
          className="space-y-4"
        >
          <div>
            <label className="text-xs font-semibold text-text-secondary">Email</label>
            <Input className="mt-1.5" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <Button type="submit" className="w-full" size="lg">寄出重設信</Button>
        </form>
        <div className="text-center text-sm text-text-muted">
          <Link href="/login" className="text-accent hover:underline">回登入頁</Link>
        </div>
      </div>
    </div>
  );
}
