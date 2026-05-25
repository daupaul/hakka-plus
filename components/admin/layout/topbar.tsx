"use client";

import { usePathname } from "next/navigation";

const CRUMB_LABEL: Record<string, string> = {
  "/admin": "總覽 Dashboard",
  "/admin/videos": "影音管理",
  "/admin/news": "新聞管理",
  "/admin/curations": "策展管理",
  "/admin/members": "會員管理",
  "/admin/orders": "金流管理",
  "/admin/roles": "編輯 / 權限",
  "/admin/cdn": "數據分析",
  "/admin/service": "支援 / 客服",
  "/admin/tags": "標籤管理",
  "/admin/themes": "主題訂閱",
  "/admin/timeline": "時間軸",
  "/admin/seo": "SEO 設定",
  "/admin/incidents": "事件監控",
  "/admin/notifications": "推播通知",
  "/admin/shop": "商城",
  "/admin/schedule": "節目表",
  "/admin/settings": "系統設定",
};

function currentLabel(pathname: string) {
  if (CRUMB_LABEL[pathname]) return CRUMB_LABEL[pathname];
  // Walk up paths
  const segs = pathname.split("/");
  while (segs.length > 0) {
    segs.pop();
    const path = segs.join("/") || "/admin";
    if (CRUMB_LABEL[path]) return CRUMB_LABEL[path];
  }
  return "Admin";
}

export function AdminTopbar() {
  const pathname = usePathname();
  const label = currentLabel(pathname);

  return (
    <div className="adm-topbar">
      <div className="adm-crumbs">
        <a href="/admin">CMS</a>
        <span className="sep">/</span>
        <span className="current">{label}</span>
      </div>
      <div className="adm-search">
        <span className="adm-search-icon">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="9" cy="9" r="6" />
            <path d="m17 17-3.5-3.5" />
          </svg>
        </span>
        <input placeholder="搜尋影片 / 文章 / 會員 / 訂單 ID …" />
      </div>
      <div className="adm-top-actions">
        <button className="adm-icon-btn" aria-label="通知">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M5 8a5 5 0 0 1 10 0c0 4 2 5 2 5H3s2-1 2-5z" />
            <path d="M8 16a2 2 0 0 0 4 0" />
          </svg>
          <span className="dot" />
        </button>
        <button className="adm-icon-btn" aria-label="設定">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="10" cy="10" r="2.5" />
            <path d="M10 1.5v3M10 15.5v3M3.6 3.6l2 2M14.4 14.4l2 2M1.5 10h3M15.5 10h3M3.6 16.4l2-2M14.4 5.6l2-2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
