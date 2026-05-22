# 客+ Hakka TV POC v2

公視客家電視台 2027 客+ 網站建置與維護案 (RY2500187) — Clickable Prototype v2，對應企劃書 v2 全部 22 個 L1 模組與 ~470 個 L3 功能點。

## 🎯 設計目標

- **核心論述**：「日常有客，讓文化成為生活的一部分」
- **設計風格**：Style A「自信當代」— 深色 + 螢光綠 + 24hr 生活時間軸
- **v2 必殺技**：直接回應評委 14 項 feedback
  - **長輩友善模式 (Q3/M3)** — Header 一鍵切換淺底大字、字級 +20%、按鈕 ≥48pt
  - **新聞模組獨立規劃 (Q10/M4)** — 6+6 功能、iNews 匯入、審核工作流
  - **危機處理 (Q5)** — Event log + SLA + DR 演練 + Postmortem

## 🚀 執行

```bash
npm install      # 第一次安裝
npm run dev      # 開發模式 — http://localhost:3000
npm run build    # 正式建置
npm start        # 啟動 production server
```

## 📐 技術棧

| 層 | 選擇 |
|---|---|
| Framework | **Next.js 16** (App Router) + TypeScript + Turbopack |
| Styling | **Tailwind v4** + CSS variables (三套 design tokens：前台深色 / 後台亮色 / 長輩友善) |
| UI | shadcn 風格 + lucide-react + framer-motion |
| Charts | recharts |
| State | **Zustand** + `persist` (localStorage) — 全前後台共用，CRUD 立即反映 |
| Forms | react-hook-form + zod |
| Markdown | react-markdown |
| Mock 資料 | TypeScript / JSON fixtures，無 API、無 DB |

## 📂 結構

```
poc-v2/
├── app/
│   ├── (front)/         # 前台 11 個 L1 模組（28+ 路由）
│   ├── admin/           # 後台 14 個 CMS 模組（57+ 路由）
│   ├── login/ register/ forgot-password/
│   └── globals.css      # @theme 設計 tokens
├── components/
│   ├── front/           # 前台元件
│   ├── admin/           # 後台元件（含通用 DataTable / EntityForm）
│   └── ui/              # 共用基礎元件（Button / Card / Input / Badge / etc）
├── lib/
│   ├── mock/            # 全部 seed JSON
│   ├── store/           # Zustand stores
│   ├── types.ts         # 30+ entity 型別
│   ├── nav.ts           # 前後台 nav 結構
│   └── utils.ts
└── public/              # 預留
```

## 🗺️ 模組清單

### 前台 11 個 L1
| 路由 | 模組 |
|---|---|
| `/` | Home — Hero 3 卡 + 24hr 大時鐘 + 4 情境分區 + 客家生活時間軸 |
| `/watch` `/watch/[slug]` | 影視 / 節目 — 列表 + 細節頁（hero / 集數 / Information） |
| `/news` `/news/[slug]` | 新聞 — 列表 6 分區 + 細節頁 |
| `/shorts` | 短影音 Shorts — 垂直全螢幕 feed |
| `/life` `/life/[slug]` | 生活+ 策展 — 長文 storytelling |
| `/shop` `/shop/[id]` | 客家選物 — 商品列表 + 外連電商 |
| `/live` | 直播 — 4 頻道直播 + 觀眾數 |
| `/schedule` | 節目表 — 24hr × 4 頻道 |
| `/about/*` | 關於客台 — 簡介 / 公開資訊 / 聯絡 / FAQ / 參訪申請 |
| `/search` | 全站搜尋 — 跨類型 + 熱門詞 |
| `/themes` `/themes/[slug]` | 主題訂閱 — 15 個主題 |
| `/account/*` | 會員中心 — 個人 / 訂閱 / 歷史 / 收藏 / 通知偏好 |

### 後台 14 個 CMS
| 路由 | 模組 | v2 重點 |
|---|---|---|
| `/admin` | Dashboard | 統計卡 / 活動 / 系統健康度 |
| `/admin/videos/*` | 影音管理 | CRUD + 轉碼任務 |
| `/admin/news/*` | 新聞管理 ★ | CRUD + iNews 匯入 + 審核工作流 |
| `/admin/curations/*` | 策展管理 | CRUD + 段落編輯 |
| `/admin/schedule/*` | 節目表 & 直播 | 週 grid + 直播設定 |
| `/admin/members/*` | 會員管理 | 列表 + 詳情 + 分群 |
| `/admin/orders/*` | 金流訂單 | 訂單 / 退款 / 發票 / 付款方式 / 營收 dashboard |
| `/admin/tags/*` | 標籤 & 內容架構 | 池 / 內容宇宙視覺化 / 推薦演算法 |
| `/admin/seo/*` | SEO | 頁面 Meta / 結構化資料 |
| `/admin/roles/*` | 權限角色 | 矩陣 / 帳號 / 稽核日誌 |
| `/admin/incidents/*` | 危機處理 ★ | Event log + SLA + DR 演練 + Postmortem |
| `/admin/notifications/*` | 推播 & 通知 | 推播 / Email / SMS / 模板 |
| `/admin/cdn/*` | CDN & 效能 | 節點 / 快取 / R2 用量 / CWV |
| `/admin/shop/*` | 導購商品 | 商品 CMS + 導購統計 |
| `/admin/settings/*` | 系統設定 | 基本 / 整合 / 備份 / 監控 / **重置 Demo** |

★ v2 必殺技

## 🎬 Demo Script（面報用）

1. **開首頁** → 講「日常有客」核心、24hr 大時鐘
2. **滾到「客家生活時間軸」** → 切「暗夜 18:39」demonstrate 內容隨時段變
3. **點 Header 「長輩友善」toggle** → 整站翻成淺底大字、按鈕變大 → **直接回應評委 M3**
4. **進 `/news`** → 講 6 分區規劃 + 點任一新聞進詳情 → **直接回應評委 Q10/M4**
5. **點 footer「後台 CMS」連結** 或前往 `/admin`，任意輸入登入
6. **進 Dashboard** → 介紹 14 個 CMS 模組
7. **進影音管理** → 列表 → 新增 → 填表 → 發布 → 回前台 `/watch` 看新影片 → **後台改前台立即反映**
8. **進危機處理** → 講 SLA 四級承諾、DR 演練實績 → **直接回應評委 Q5**
9. **進 CDN R2 用量** → 講「B5 創新：R2 自建省 30%+ 流量」
10. **進系統設定 → 重置 Demo** → 一鍵還原 seed 資料

## 🔄 資料一致性

- 後台所有 CRUD 操作均寫入 Zustand store + localStorage
- 前後台共用同一 store — 後台改影片、新聞、策展、商品、設定 → 前台立即反映
- 重整頁面後狀態保留
- `/admin/settings/reset` 可一鍵還原所有資料為初始 seed

## 🚫 不做（Out of Scope）

- 真實 HLS 播放（用 play icon + 截圖）
- 真實檔案上傳（FileReader → URL string）
- 真實金流（按鈕跳 toast）
- 真實搜尋引擎（client-side filter）
- 真實電商（跳外連 placeholder）
- 真實 Auth（任意輸入即進）
- Style B mockup
- 多語言切換
- PWA / Service Worker
- Supabase / 任何雲端 DB

## 📚 Mockup 對照

設計來源：`../_files/mockup/v2/style A/`

- `H.png` + `H-mobile.png` — Home 設計稿
- `H_客家生活時間軸切換示意.png` — 時間軸大時鐘
- `H-影視細節頁.png` + `-mobile.png` — 影視細節
- `H-策展細節頁.png` + `-mobile.png` — 策展細節
- `H-新聞列表頁.png` + `-mobile.png` — 新聞列表
- `Design Goals.png` — 風格論述

## 🔗 對應企劃書

- 提案 v2 PDF：`../_files/簡報版本/proposal/RY2500187_service_proposal_v2_260519.pdf`
- 核心論述：`../POSITIONING.md` — 「日常有客」

---

**作者**：八拍子有限公司 Rytass · DS 部門
**版本**：v2 POC · 2026-05-21
**狀態**：clickable prototype，所有寫入操作儲存於 localStorage
