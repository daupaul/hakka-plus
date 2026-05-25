import {
  Home,
  Film,
  Newspaper,
  PlaySquare,
  Sparkles,
  Radio,
  Info,
  Search,
  Bookmark,
  UserCircle,
  LayoutDashboard,
  Tags,
  Users,
  CreditCard,
  Bell,
  ShieldAlert,
  Cloud,
  Settings,
  ShoppingBag,
  CalendarDays,
  PenSquare,
  KeyRound,
  Globe,
  type LucideIcon,
} from "lucide-react";

export interface FrontNavItem {
  href: string;
  label: string;
  labelEn?: string;
  icon: LucideIcon;
  seniorVisible: boolean;
}

export const FRONT_NAV: FrontNavItem[] = [
  { href: "/", label: "首頁", labelEn: "Home", icon: Home, seniorVisible: true },
  { href: "/news", label: "新聞", labelEn: "News", icon: Newspaper, seniorVisible: true },
  { href: "/schedule", label: "節目表", labelEn: "Schedule", icon: CalendarDays, seniorVisible: true },
  { href: "/watch", label: "影視", labelEn: "Watch", icon: Film, seniorVisible: true },
  { href: "/shorts", label: "短影音", labelEn: "Shorts", icon: PlaySquare, seniorVisible: false },
  { href: "/life", label: "生活+", labelEn: "Life+", icon: Sparkles, seniorVisible: false },
  { href: "/live", label: "直播", labelEn: "Live", icon: Radio, seniorVisible: true },
  { href: "/themes", label: "主題訂閱", labelEn: "Themes", icon: Bookmark, seniorVisible: false },
  { href: "/about", label: "關於客台", labelEn: "About", icon: Info, seniorVisible: true },
];

export interface AdminNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  children?: AdminNavItem[];
  badge?: string;
}

export const ADMIN_NAV: AdminNavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  {
    href: "/admin/videos",
    label: "影音管理",
    icon: Film,
    children: [
      { href: "/admin/videos", label: "節目列表", icon: Film },
      { href: "/admin/videos/transcoding", label: "轉碼任務", icon: Cloud },
    ],
  },
  {
    href: "/admin/news",
    label: "新聞管理",
    icon: Newspaper,
    children: [
      { href: "/admin/news", label: "新聞列表", icon: Newspaper },
      { href: "/admin/news/inews", label: "iNews 匯入", icon: Cloud },
      { href: "/admin/news/review", label: "審核工作流", icon: PenSquare },
    ],
  },
  {
    href: "/admin/curations",
    label: "策展管理",
    icon: Sparkles,
  },
  {
    href: "/admin/schedule",
    label: "節目表 & 直播",
    icon: CalendarDays,
    children: [
      { href: "/admin/schedule", label: "週節目表", icon: CalendarDays },
      { href: "/admin/schedule/live", label: "直播設定", icon: Radio },
    ],
  },
  {
    href: "/admin/members",
    label: "會員管理",
    icon: Users,
    children: [
      { href: "/admin/members", label: "會員列表", icon: Users },
      { href: "/admin/members/segments", label: "TA 分群", icon: Users },
    ],
  },
  {
    href: "/admin/orders",
    label: "金流訂單",
    icon: CreditCard,
    children: [
      { href: "/admin/orders", label: "訂單列表", icon: CreditCard },
      { href: "/admin/orders/refunds", label: "退款", icon: CreditCard },
      { href: "/admin/orders/invoices", label: "發票", icon: CreditCard },
      { href: "/admin/orders/payment-methods", label: "付款方式", icon: CreditCard },
      { href: "/admin/orders/revenue", label: "營收 Dashboard", icon: CreditCard },
    ],
  },
  {
    href: "/admin/tags",
    label: "標籤 & 內容架構",
    icon: Tags,
    children: [
      { href: "/admin/tags", label: "標籤池", icon: Tags },
      { href: "/admin/tags/universe", label: "內容宇宙", icon: Tags },
      { href: "/admin/tags/recommendations", label: "推薦演算法", icon: Tags },
    ],
  },
  {
    href: "/admin/themes",
    label: "主題訂閱",
    icon: Bookmark,
  },
  {
    href: "/admin/timeline",
    label: "客家生活時間軸",
    icon: CalendarDays,
  },
  {
    href: "/admin/seo",
    label: "SEO",
    icon: Globe,
    children: [
      { href: "/admin/seo", label: "全站 SEO", icon: Globe },
      { href: "/admin/seo/pages", label: "頁面 Meta", icon: Globe },
      { href: "/admin/seo/structured-data", label: "結構化資料", icon: Globe },
    ],
  },
  {
    href: "/admin/roles",
    label: "權限角色",
    icon: KeyRound,
    children: [
      { href: "/admin/roles", label: "角色矩陣", icon: KeyRound },
      { href: "/admin/roles/users", label: "帳號管理", icon: Users },
      { href: "/admin/roles/audit", label: "稽核日誌", icon: ShieldAlert },
    ],
  },
  {
    href: "/admin/incidents",
    label: "危機處理",
    icon: ShieldAlert,
    children: [
      { href: "/admin/incidents", label: "事件單", icon: ShieldAlert },
      { href: "/admin/incidents/sla", label: "SLA 監控", icon: ShieldAlert },
      { href: "/admin/incidents/dr", label: "DR 演練", icon: ShieldAlert },
    ],
  },
  {
    href: "/admin/notifications",
    label: "推播 & 通知",
    icon: Bell,
    children: [
      { href: "/admin/notifications", label: "活動列表", icon: Bell },
      { href: "/admin/notifications/push", label: "推播", icon: Bell },
      { href: "/admin/notifications/email", label: "Email", icon: Bell },
      { href: "/admin/notifications/sms", label: "SMS", icon: Bell },
      { href: "/admin/notifications/templates", label: "模板庫", icon: Bell },
    ],
  },
  {
    href: "/admin/cdn",
    label: "CDN & 效能",
    icon: Cloud,
    children: [
      { href: "/admin/cdn", label: "節點配置", icon: Cloud },
      { href: "/admin/cdn/cache", label: "快取規則", icon: Cloud },
      { href: "/admin/cdn/r2", label: "R2 用量", icon: Cloud },
      { href: "/admin/cdn/performance", label: "Core Web Vitals", icon: Cloud },
    ],
  },
  {
    href: "/admin/shop",
    label: "導購商品",
    icon: ShoppingBag,
    children: [
      { href: "/admin/shop", label: "商品列表", icon: ShoppingBag },
      { href: "/admin/shop/affiliate", label: "導購統計", icon: ShoppingBag },
    ],
  },
  {
    href: "/admin/settings",
    label: "系統設定",
    icon: Settings,
    children: [
      { href: "/admin/settings", label: "基本資訊", icon: Settings },
      { href: "/admin/settings/integrations", label: "API 整合", icon: Settings },
      { href: "/admin/settings/backup", label: "備份排程", icon: Settings },
      { href: "/admin/settings/monitoring", label: "監控閾值", icon: Settings },
      { href: "/admin/settings/reset", label: "重置 Demo", icon: Settings },
    ],
  },
];

export const FRONT_ACCOUNT_NAV = [
  { href: "/account", label: "個人中心" },
  { href: "/account/subscription", label: "訂閱管理" },
  { href: "/account/history", label: "觀看紀錄" },
  { href: "/account/favorites", label: "我的收藏" },
  { href: "/account/notifications", label: "通知偏好" },
];
