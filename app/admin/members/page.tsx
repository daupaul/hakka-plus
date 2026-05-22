"use client";

import { useRouter } from "next/navigation";
import membersSeed from "@/lib/mock/members.json";
import type { Member } from "@/lib/types";
import { DataTable, Edit } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

// Generate extra mock members up to 80
const NAMES = ["陳", "黃", "鍾", "彭", "賴", "邱", "羅", "曾", "張", "彭", "詹", "范", "鄒", "吳", "李", "林"];
const FIRST_NAMES = ["阿華", "阿公", "阿美", "阿寶", "阿淑", "美琴", "正杰", "詩慧", "凱莉", "秀梅", "家瑀"];
const TIERS = ["annual", "monthly", "trial", "free"] as const;

const additional: Member[] = Array.from({ length: 75 }, (_, i) => ({
  id: `m${String(i + 6).padStart(3, "0")}`,
  email: `member${i + 6}@example.com`,
  name: `${NAMES[i % NAMES.length]}${FIRST_NAMES[i % FIRST_NAMES.length]}${i}`,
  avatar: `https://api.dicebear.com/9.x/personas/svg?seed=m${i + 6}`,
  tier: TIERS[i % TIERS.length],
  segments: [],
  joinedAt: new Date(2025, i % 12, (i % 28) + 1).toISOString(),
  lastActiveAt: new Date(2026, 4, 21 - (i % 20)).toISOString(),
  watchHistoryIds: [], favoriteVideoIds: [], themeSubscriptionIds: [],
  notificationPrefs: { push: true, email: true, sms: false },
}));

const MEMBERS = [...(membersSeed as unknown as Member[]), ...additional];

export default function AdminMembersPage() {
  const router = useRouter();
  return (
    <DataTable<Member>
      title="會員管理"
      description={`${MEMBERS.length.toLocaleString()} 位會員，含試用、月費、年費、免費四級`}
      data={MEMBERS}
      searchKeys={["name", "email"] as (keyof Member)[]}
      searchPlaceholder="搜尋會員姓名 / Email..."
      filters={[
        {
          key: "tier",
          label: "等級",
          values: [
            { value: "annual", label: "年費" },
            { value: "monthly", label: "月費" },
            { value: "trial", label: "試用" },
            { value: "free", label: "免費" },
          ],
          filter: (m, v) => m.tier === v,
        },
      ]}
      columns={[
        {
          key: "name",
          header: "會員",
          cell: (m) => (
            <div className="flex items-center gap-3 min-w-[240px]">
              <div className="size-9 rounded-full overflow-hidden bg-bg-deep shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.avatar} alt={m.name} className="size-full" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-text-primary">{m.name}</div>
                <div className="text-xs text-text-muted">{m.email}</div>
              </div>
            </div>
          ),
        },
        { key: "tier", header: "等級", cell: (m) => <Badge variant={m.tier === "annual" ? "warm" : m.tier === "monthly" ? "default" : m.tier === "trial" ? "warning" : "muted"}>{m.tier === "annual" ? "年費" : m.tier === "monthly" ? "月費" : m.tier === "trial" ? "試用" : "免費"}</Badge> },
        { key: "joinedAt", header: "加入日", sortable: true, sortValue: (m) => m.joinedAt, cell: (m) => formatDate(m.joinedAt) },
        { key: "lastActive", header: "最近活動", sortable: true, sortValue: (m) => m.lastActiveAt, cell: (m) => formatDate(m.lastActiveAt) },
        { key: "subscription", header: "訂閱狀態", cell: (m) => m.subscription ? <Badge variant="success">使用中</Badge> : <Badge variant="muted">無</Badge> },
      ]}
      actions={[
        { label: "查看詳情", icon: <Edit className="size-4" />, onClick: (m) => router.push(`/admin/members/${m.id}`) },
      ]}
    />
  );
}
