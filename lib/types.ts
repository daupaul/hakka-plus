// ========== Domain entity 型別 ==========
// 統一定義所有 mock data 與 store 共用的型別

export type ContentStatus = "draft" | "review" | "published" | "archived";
export type Severity = "critical" | "high" | "medium" | "low";
export type MemberTier = "free" | "trial" | "monthly" | "annual";
export type Paywall = "free" | "subscriber" | "paid";

// ---------- 影視 / 短影音 ----------
export interface Episode {
  id: string;
  number: number;
  title: string;
  duration: string;
  poster: string;
  description: string;
  releasedAt: string;
}

export interface Video {
  id: string;
  slug: string;
  title: string;
  titleEn?: string;
  category: "戲劇" | "紀錄片" | "綜藝" | "兒少" | "電影" | "短影音";
  poster: string;        // 直式封面
  hero: string;          // 橫式劇照
  duration: string;
  episodeCount: number;
  episodes?: Episode[];
  tags: string[];
  description: string;
  year: number;
  rating?: string;
  director?: string;
  cast?: string[];
  subtitles: string[];
  paywall: Paywall;
  price?: number;
  publishedAt: string;
  status: ContentStatus;
  viewCount: number;
  likeCount: number;
  featured?: boolean;
}

export interface Short {
  id: string;
  title: string;
  description: string;
  poster: string;
  channelName: string;
  channelAvatar: string;
  duration: string;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  publishedAt: string;
  tags: string[];
  relatedVideoId?: string;
}

// ---------- 新聞 ----------
export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: "即時" | "客家文化" | "客語教育" | "生活" | "政策";
  image: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  excerpt: string;
  body: string;        // markdown
  tags: string[];
  status: ContentStatus;
  source: "inews" | "manual";
  featured: boolean;
  viewCount: number;
  commentEnabled: boolean;
  seo?: SeoMeta;
}

// ---------- 策展 / 生活+ ----------
export interface CurationSection {
  type: "paragraph" | "image" | "quote" | "heading";
  content: string;
  caption?: string;
}

export interface GeoPin {
  id: string;
  name: string;
  lat: number;
  lng: number;
  description?: string;
}

export interface Curation {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  cover: string;
  category: "旅遊" | "選物" | "節慶" | "工藝" | "飲食";
  summary: string;
  body: CurationSection[];
  relatedVideos: string[];
  relatedProducts: string[];
  relatedNews: string[];
  locations?: GeoPin[];
  tags: string[];
  status: ContentStatus;
  publishedAt: string;
  viewCount: number;
}

// ---------- 商品 / 導購 ----------
export interface Product {
  id: string;
  name: string;
  category: "茶葉" | "工藝品" | "客語教材" | "食品" | "服飾";
  image: string;
  price: number;
  description: string;
  externalUrl: string;     // 跳轉第三方電商
  externalPlatform: "Shopee" | "PChome" | "客家好物網" | "其他";
  tags: string[];
  clickCount: number;
  relatedCurations: string[];
}

// ---------- 客家生活時間軸 ----------
export interface TimeSlot {
  time: string;          // "06:00" / "12:24" 等
  label: string;         // 晨光 / 日午 / 午後 / 暗夜 / 夜深 / 凌晨
  description: string;
  recommendations: TimelineRecommendation[];
}

export interface TimelineRecommendation {
  id: string;
  type: "video" | "news" | "curation" | "product";
  refId: string;
  title: string;
  image: string;
  caption: string;
}

// ---------- 標籤 / 主題 ----------
export interface Tag {
  id: string;
  name: string;
  category: "影視" | "旅遊" | "工藝" | "飲食" | "節慶" | "人物" | "地點";
  synonyms: string[];
  relatedTagIds: string[];
  contentCount: number;
}

export interface Theme {
  id: string;
  slug: string;
  name: string;
  description: string;
  cover: string;
  tagIds: string[];
  subscriberCount: number;
}

// ---------- 節目表 / 直播 ----------
export interface ChannelProgram {
  id: string;
  channelId: string;
  startAt: string;       // ISO datetime
  endAt: string;
  title: string;
  category: string;
  poster?: string;
  description?: string;
  isLive?: boolean;
}

export interface Channel {
  id: string;
  name: string;
  number: string;
  logo: string;
  description: string;
}

export interface LiveStream {
  id: string;
  channelId: string;
  title: string;
  posterUrl: string;
  hostName: string;
  hostAvatar: string;
  viewerCount: number;
  startedAt: string;
  isLive: boolean;
}

// ---------- 會員 ----------
export interface Subscription {
  planId: string;
  planName: string;
  startedAt: string;
  renewAt?: string;
  autoRenew: boolean;
  status: "active" | "paused" | "cancelled";
  price: number;
}

export interface Member {
  id: string;
  email: string;
  name: string;
  phone?: string;
  gender?: "M" | "F" | "O";
  birthYear?: number;
  avatar: string;
  tier: MemberTier;
  segments: string[];      // TA 標籤
  joinedAt: string;
  lastActiveAt: string;
  subscription?: Subscription;
  watchHistoryIds: string[];
  favoriteVideoIds: string[];
  themeSubscriptionIds: string[];
  notificationPrefs: {
    push: boolean;
    email: boolean;
    sms: boolean;
  };
}

// ---------- 訂單 / 金流 ----------
export interface Order {
  id: string;
  memberId: string;
  memberName: string;
  type: "subscription" | "single-purchase" | "product";
  itemName: string;
  amount: number;
  status: "pending" | "paid" | "completed" | "refunded" | "failed";
  paymentMethod: "credit-card" | "atm" | "convenience-store" | "apple-pay" | "google-pay";
  createdAt: string;
  paidAt?: string;
  refundedAt?: string;
  invoiceNo?: string;
}

export interface Invoice {
  id: string;
  invoiceNo: string;
  orderId: string;
  memberName: string;
  amount: number;
  taxId?: string;
  issuedAt: string;
  status: "issued" | "voided";
}

// ---------- 危機處理 / Incident ----------
export interface SlaConfig {
  responseMinutes: number;
  resolveHours: number;
  responsedAt?: string;
  resolvedAt?: string;
  responseDue: string;
  resolveDue: string;
}

export interface IncidentEvent {
  at: string;
  actor: string;
  text: string;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  category: "技術" | "內容" | "安全" | "金流" | "外部";
  status: "open" | "responded" | "resolved" | "closed";
  openedAt: string;
  closedAt?: string;
  assignee: string;
  sla: SlaConfig;
  events: IncidentEvent[];
  postmortem?: string;
}

export interface DrDrill {
  id: string;
  scenario: string;
  scheduledAt: string;
  performedAt?: string;
  result: "passed" | "failed" | "pending";
  rto: number;             // 分鐘
  rpo: number;             // 分鐘
  notes: string;
}

// ---------- 推播 / 通知 ----------
export interface NotificationTemplate {
  id: string;
  name: string;
  channel: "push" | "email" | "sms";
  subject?: string;
  body: string;
}

export interface NotificationCampaign {
  id: string;
  templateId: string;
  templateName: string;
  channel: "push" | "email" | "sms";
  audience: string;
  scheduledAt: string;
  sentAt?: string;
  sentCount: number;
  openCount: number;
  clickCount: number;
  status: "scheduled" | "sent" | "draft" | "cancelled";
}

// ---------- 角色 / 帳號 / 稽核 ----------
export type Role = "superadmin" | "editor-in-chief" | "editor" | "marketing" | "customer-service" | "viewer";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatar: string;
  lastLoginAt: string;
  active: boolean;
}

export interface AuditLog {
  id: string;
  at: string;
  actor: string;
  action: string;
  target: string;
  detail?: string;
}

// ---------- CDN / 效能 ----------
export interface CacheRule {
  id: string;
  pattern: string;       // "/api/videos/*"
  ttl: number;           // 秒
  enabled: boolean;
}

export interface CwvMetric {
  date: string;
  lcp: number;
  inp: number;
  cls: number;
  ttfb: number;
}

// ---------- 轉碼任務 ----------
export interface TranscodingJob {
  id: string;
  videoId: string;
  videoTitle: string;
  status: "queued" | "processing" | "completed" | "failed";
  startedAt: string;
  completedAt?: string;
  progress: number;
  presets: string[];     // ["720p", "1080p", "4K"]
}

// ---------- iNews 匯入 ----------
export interface INewsImport {
  id: string;
  fetchedAt: string;
  filename: string;
  status: "imported" | "duplicated" | "rejected";
  newsId?: string;
  detail?: string;
}

// ---------- SEO ----------
export interface SeoMeta {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
}

export interface SeoPageConfig {
  id: string;
  path: string;
  meta: SeoMeta;
}

// ---------- 系統設定 ----------
export interface SiteSettings {
  siteName: string;
  siteTagline: string;
  contactEmail: string;
  contactPhone: string;
  socialLinks: { facebook?: string; instagram?: string; youtube?: string; line?: string };
  appLinks: { ios?: string; android?: string };
  integrations: {
    publicTvScheduleApi: string;
    inewsFtpHost: string;
    inewsFtpUser: string;
    ecpayMerchantId: string;
    googleAnalyticsId: string;
    metaPixelId: string;
    fcmServerKey: string;
    smtpHost: string;
    smtpUser: string;
    smsProvider: string;
    cdnApiKey: string;
  };
  backup: {
    schedule: "hourly" | "daily" | "weekly";
    retentionDays: number;
    lastBackupAt: string;
  };
  monitoring: {
    cpuThreshold: number;
    memoryThreshold: number;
    diskThreshold: number;
  };
}

// ---------- 活動 log（Dashboard 用） ----------
export interface ActivityItem {
  id: string;
  at: string;
  actor: string;
  category: "content" | "member" | "incident" | "order" | "system";
  action: string;
  target?: string;
}

// ---------- 公開資訊（關於客台） ----------
export interface GovernanceDoc {
  id: string;
  title: string;
  category: "年度報告" | "財務" | "董事會" | "製播公約" | "資訊公開" | "新聞稿";
  publishedAt: string;
  fileUrl: string;
  description?: string;
}

// ---------- FAQ ----------
export interface FaqItem {
  id: string;
  category: "訂閱" | "技術" | "內容" | "退款" | "其他";
  question: string;
  answer: string;
}

// ---------- 申訴 / 聯絡表單（mock 收件） ----------
export interface ContactSubmission {
  id: string;
  type: "general" | "complaint" | "advertising" | "suggestion";
  name: string;
  email: string;
  subject: string;
  body: string;
  submittedAt: string;
  status: "new" | "in-progress" | "closed";
}

// ---------- 營收（月度報表） ----------
export interface MonthlyRevenue {
  month: string;          // 2026-04
  subscription: number;
  singlePurchase: number;
  product: number;
  total: number;
}
