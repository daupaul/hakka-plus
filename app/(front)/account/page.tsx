"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/store/auth";
import { useContent } from "@/lib/store/content";
import { Crown, History, Heart, Bell, ArrowRight, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import membersSeed from "@/lib/mock/members.json";
import type { Member } from "@/lib/types";

const MEMBERS = membersSeed as unknown as Member[];

export default function AccountPage() {
  const router = useRouter();
  const memberLoggedIn = useAuth((s) => s.memberLoggedIn);
  const memberId = useAuth((s) => s.memberId);
  const logout = useAuth((s) => s.logoutMember);
  const videos = useContent((s) => s.videos);

  useEffect(() => {
    if (!memberLoggedIn) {
      router.replace("/login?next=/account");
    }
  }, [memberLoggedIn, router]);

  const me = MEMBERS.find((m) => m.id === memberId) ?? MEMBERS[0];
  const history = videos.filter((v) => me?.watchHistoryIds.includes(v.id)).slice(0, 4);

  if (!memberLoggedIn) return null;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
      <div className="flex flex-wrap items-start gap-6">
        <div className="size-20 lg:size-24 rounded-full overflow-hidden border-2 border-accent">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={me.avatar} alt={me.name} className="size-full" />
        </div>
        <div className="flex-1 min-w-[200px]">
          <Badge variant={me.tier === "annual" ? "warm" : me.tier === "monthly" ? "default" : "outline"}>
            {me.tier === "annual" ? "年費會員" : me.tier === "monthly" ? "月費會員" : me.tier === "trial" ? "試用中" : "免費會員"}
          </Badge>
          <h1 className="mt-2 font-display text-2xl lg:text-3xl font-extrabold text-text-primary">{me.name}</h1>
          <div className="mt-1 text-sm text-text-muted">{me.email} · 加入於 {new Date(me.joinedAt).getFullYear()}</div>
        </div>
        <Button variant="ghost" onClick={() => { logout(); router.replace("/"); }}>
          <LogOut className="size-4" /> 登出
        </Button>
      </div>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { href: "/account/subscription", icon: <Crown className="size-5" />, label: "訂閱管理" },
          { href: "/account/history", icon: <History className="size-5" />, label: "觀看紀錄" },
          { href: "/account/favorites", icon: <Heart className="size-5" />, label: "我的收藏" },
          { href: "/account/notifications", icon: <Bell className="size-5" />, label: "通知偏好" },
        ].map((s) => (
          <Link key={s.href} href={s.href}>
            <Card className="hover:border-accent transition-colors group">
              <CardContent>
                <div className="text-accent">{s.icon}</div>
                <div className="mt-3 font-display font-bold text-text-primary group-hover:text-accent">{s.label}</div>
                <ArrowRight className="size-4 text-text-muted group-hover:text-accent mt-2" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {me.subscription && (
        <Card className="mt-8">
          <CardContent>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <Badge variant="warm">當前訂閱</Badge>
                <h2 className="mt-2 font-display text-xl font-bold text-text-primary">{me.subscription.planName}</h2>
                <p className="mt-1 text-sm text-text-secondary">
                  起算 {new Date(me.subscription.startedAt).toLocaleDateString("zh-TW")} ·
                  續約 {new Date(me.subscription.renewAt!).toLocaleDateString("zh-TW")}
                </p>
              </div>
              <Button variant="secondary" asChild>
                <Link href="/account/subscription">管理訂閱</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {history.length > 0 && (
        <section className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-bold text-text-primary">最近觀看</h2>
            <Link href="/account/history" className="text-sm text-accent">查看全部</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {history.map((v) => (
              <Link key={v.id} href={`/watch/${v.slug}`} className="card overflow-hidden hover:border-accent group">
                <div className="aspect-[3/4] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={v.poster} alt={v.title} className="size-full object-cover" />
                </div>
                <div className="p-2.5">
                  <div className="text-xs text-text-muted">{v.category}</div>
                  <div className="text-sm font-semibold text-text-primary line-clamp-2 group-hover:text-accent">{v.title}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
