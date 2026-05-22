"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Crown, History, Bell } from "lucide-react";
import membersSeed from "@/lib/mock/members.json";
import type { Member } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUi } from "@/lib/store/ui";
import { formatDate } from "@/lib/utils";

const MEMBERS = membersSeed as unknown as Member[];

export default function MemberDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const toast = useUi((s) => s.toast);
  const member = MEMBERS.find((m) => m.id === id) ?? MEMBERS[0];

  return (
    <div className="space-y-6 max-w-5xl">
      <Link href="/admin/members" className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-accent">
        <ArrowLeft className="size-4" /> 回會員列表
      </Link>

      <div className="flex items-start gap-6 flex-wrap">
        <div className="size-24 rounded-full overflow-hidden border-2 border-accent">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={member.avatar} alt={member.name} className="size-full" />
        </div>
        <div className="flex-1 min-w-[200px]">
          <Badge variant={member.tier === "annual" ? "warm" : member.tier === "monthly" ? "default" : "outline"}>
            {member.tier === "annual" ? "年費會員" : member.tier === "monthly" ? "月費會員" : member.tier === "trial" ? "試用中" : "免費"}
          </Badge>
          <h1 className="mt-2 font-display text-2xl lg:text-3xl font-extrabold text-text-primary">{member.name}</h1>
          <div className="mt-1 text-sm text-text-muted">{member.email}{member.phone && ` · ${member.phone}`}</div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button size="sm" variant="secondary" onClick={() => toast({ variant: "default", title: "已寄出訊息" })}><Mail className="size-4" /> 傳訊</Button>
            <Button size="sm" variant="ghost" onClick={() => toast({ variant: "warning", title: "已暫停帳號" })}>暫停帳號</Button>
            <Button size="sm" variant="ghost" onClick={() => toast({ variant: "success", title: "已升級為年費會員" })}>升級會員</Button>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Stat icon={<Crown className="size-4" />} label="會員等級" value={member.tier} />
        <Stat icon={<History className="size-4" />} label="加入日期" value={formatDate(member.joinedAt)} />
        <Stat icon={<History className="size-4" />} label="最近活動" value={formatDate(member.lastActiveAt)} />
        <Stat icon={<Bell className="size-4" />} label="通知設定" value={`${member.notificationPrefs.push ? "推播 " : ""}${member.notificationPrefs.email ? "Email " : ""}${member.notificationPrefs.sms ? "SMS" : ""}`} />
      </div>

      {member.subscription && (
        <Card>
          <CardContent>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">當前訂閱</h2>
            <div className="grid sm:grid-cols-4 gap-4 text-sm">
              <Field label="方案" value={member.subscription.planName} />
              <Field label="起算" value={formatDate(member.subscription.startedAt)} />
              <Field label="續約" value={member.subscription.renewAt ? formatDate(member.subscription.renewAt) : "—"} />
              <Field label="自動續約" value={member.subscription.autoRenew ? "啟用" : "停用"} />
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent>
          <h2 className="font-display text-lg font-bold text-text-primary mb-3">TA 分群標籤</h2>
          {member.segments.length === 0 ? (
            <div className="text-sm text-text-muted">尚未分群</div>
          ) : (
            <div className="flex flex-wrap gap-2">{member.segments.map((s) => <Badge key={s} variant="warm">{s}</Badge>)}</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Card><CardContent>
      <div className="text-xs uppercase tracking-wider text-text-muted flex items-center gap-1.5">
        <span className="text-accent">{icon}</span>{label}
      </div>
      <div className="mt-2 font-display font-bold text-text-primary">{value}</div>
    </CardContent></Card>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-text-muted">{label}</div>
      <div className="mt-1 font-semibold text-text-primary">{value}</div>
    </div>
  );
}
