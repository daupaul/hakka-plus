"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/store/auth";
import { useUi } from "@/lib/store/ui";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/account";
  const login = useAuth((s) => s.loginMember);
  const toast = useUi((s) => s.toast);
  const [email, setEmail] = useState("ahua@example.com");
  const [password, setPassword] = useState("demo");

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-bg-base">
      <div className="w-full max-w-md card p-8 space-y-6">
        <div>
          <Link href="/" className="font-display text-2xl font-extrabold text-text-primary">
            Hakka<span className="text-accent">+</span>
          </Link>
          <h1 className="mt-4 font-display text-2xl font-bold text-text-primary">會員登入</h1>
          <p className="mt-2 text-sm text-text-secondary">POC 階段任意輸入即可登入。</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login("m001");
            toast({ variant: "success", title: "已登入", description: `Welcome back, ${email}` });
            router.replace(next);
          }}
          className="space-y-4"
        >
          <div>
            <label className="text-xs font-semibold text-text-secondary">Email</label>
            <Input className="mt-1.5" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary">密碼</label>
            <Input className="mt-1.5" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full" size="lg">登入</Button>
        </form>
        <div className="text-center text-sm text-text-muted">
          <Link href="/forgot-password" className="hover:text-accent">忘記密碼？</Link>
          <span className="mx-2">·</span>
          <Link href="/register" className="hover:text-accent">建立新帳號</Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}
