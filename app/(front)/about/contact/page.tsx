"use client";

import { useState } from "react";
import Link from "next/link";
import { useUi } from "@/lib/store/ui";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const TYPES = ["一般聯絡", "節目建議", "內容申訴", "廣告洽詢"];

export default function ContactPage() {
  const toast = useUi((s) => s.toast);
  const [type, setType] = useState("一般聯絡");
  const [form, setForm] = useState({ name: "", email: "", subject: "", body: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ variant: "success", title: "已送出表單", description: "客台將於 3 個工作天內回覆。" });
    setForm({ name: "", email: "", subject: "", body: "" });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
      <nav className="text-xs text-text-muted mb-4">
        <Link href="/about" className="hover:text-accent">關於客台</Link> / 聯絡 / 申訴
      </nav>
      <Badge variant="default">CONTACT</Badge>
      <h1 className="mt-3 font-display text-3xl lg:text-5xl font-extrabold text-text-primary">聯絡 / 申訴</h1>
      <p className="mt-3 text-text-secondary">
        我們重視每一則來自觀眾的回應。請選擇對應類別並填寫表單，客服團隊將於 3 個工作天內回覆。
      </p>

      <form onSubmit={submit} className="mt-8 card p-6 space-y-5">
        <div>
          <label className="text-xs font-semibold text-text-secondary">聯絡類別</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`h-9 px-4 rounded-full text-sm font-semibold border transition-colors ${
                  type === t ? "bg-accent text-text-inverse border-accent" : "border-border text-text-secondary"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-text-secondary">姓名</label>
            <Input className="mt-1.5" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary">Email</label>
            <Input className="mt-1.5" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-text-secondary">主旨</label>
          <Input className="mt-1.5" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
        </div>
        <div>
          <label className="text-xs font-semibold text-text-secondary">內容</label>
          <Textarea className="mt-1.5 min-h-[140px]" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} required />
        </div>
        <Button type="submit" size="lg" className="w-full">送出</Button>
      </form>

      <div className="mt-8 grid sm:grid-cols-2 gap-3 text-sm">
        <div className="card p-5">
          <div className="text-xs text-text-muted">客服電話</div>
          <div className="mt-1 font-display font-bold text-text-primary text-lg">(02) 2633-8200</div>
          <div className="mt-1 text-xs text-text-secondary">週一至週五 09:00-18:00</div>
        </div>
        <div className="card p-5">
          <div className="text-xs text-text-muted">客服 Email</div>
          <div className="mt-1 font-display font-bold text-text-primary text-lg">service@hakka.tv</div>
        </div>
      </div>
    </div>
  );
}
