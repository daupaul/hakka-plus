"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Users, MapPin, Info } from "lucide-react";
import { useUi } from "@/lib/store/ui";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function VisitPage() {
  const toast = useUi((s) => s.toast);
  const [form, setForm] = useState({ org: "", contact: "", email: "", phone: "", visitors: 10, date: "", purpose: "" });

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
      <nav className="text-xs text-text-muted mb-4">
        <Link href="/about" className="hover:text-accent">關於客台</Link> / 參訪申請
      </nav>
      <Badge variant="default">SCHOOL VISIT</Badge>
      <h1 className="mt-3 font-display text-3xl lg:text-5xl font-extrabold text-text-primary">參訪申請</h1>
      <p className="mt-3 text-text-secondary text-base">
        歡迎學校、社團、學術機構申請參訪客家電視台。我們將安排專人導覽攝影棚、剪輯室、主控室。
      </p>

      <div className="mt-6 grid sm:grid-cols-3 gap-3 text-sm">
        <div className="card p-4">
          <Calendar className="size-5 text-accent mb-2" />
          <div className="font-semibold text-text-primary">參訪時段</div>
          <div className="text-text-secondary text-xs mt-1">週一至週五 10:00 / 14:00（每場 90 分鐘）</div>
        </div>
        <div className="card p-4">
          <Users className="size-5 text-accent mb-2" />
          <div className="font-semibold text-text-primary">人數限制</div>
          <div className="text-text-secondary text-xs mt-1">每場 10-40 人（含領隊）</div>
        </div>
        <div className="card p-4">
          <MapPin className="size-5 text-accent mb-2" />
          <div className="font-semibold text-text-primary">地點</div>
          <div className="text-text-secondary text-xs mt-1">台北市內湖區康寧路三段 75 巷 50 號</div>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast({ variant: "success", title: "申請已送出", description: `客台將於 5 個工作天內以 Email 回覆是否接受。預計參訪日：${form.date}` });
        }}
        className="mt-8 card p-6 space-y-5"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-text-secondary">機構名稱</label>
            <Input className="mt-1.5" required value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary">聯絡人</label>
            <Input className="mt-1.5" required value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary">Email</label>
            <Input className="mt-1.5" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary">電話</label>
            <Input className="mt-1.5" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary">參訪人數</label>
            <Input className="mt-1.5" type="number" min={10} max={40} required value={form.visitors} onChange={(e) => setForm({ ...form, visitors: Number(e.target.value) })} />
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary">預計日期</label>
            <Input className="mt-1.5" type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-text-secondary">參訪目的</label>
          <Textarea className="mt-1.5 min-h-[100px]" required value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} />
        </div>
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <Info className="size-3.5" /> 申請送出後不代表預約成功，客台將依場次空檔回覆。
        </div>
        <Button type="submit" size="lg" className="w-full">送出申請</Button>
      </form>
    </div>
  );
}
