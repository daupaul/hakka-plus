"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/store/auth";

interface Route {
  id: string;
  href: string;
  label: string;
  badge?: string;
  icon: React.ReactNode;
  section: "overview" | "cms";
}

// Inline SVG icons that match the design (simple, monochrome, currentColor)
const Icons = {
  dashboard: <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2.5" y="2.5" width="6.5" height="6.5" rx="1.5" /><rect x="11" y="2.5" width="6.5" height="6.5" rx="1.5" /><rect x="2.5" y="11" width="6.5" height="6.5" rx="1.5" /><rect x="11" y="11" width="6.5" height="6.5" rx="1.5" /></svg>,
  video: <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="4" width="13" height="12" rx="1.5" /><path d="M15 8l3-2v8l-3-2" /></svg>,
  content: <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 2.5h12M4 7h12M4 11.5h12M4 16h8" /></svg>,
  members: <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="10" cy="7" r="3" /><path d="M3 17c0-3.5 3-6 7-6s7 2.5 7 6" /></svg>,
  orders: <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2.5" y="5" width="15" height="11" rx="1.5" /><path d="M2.5 9h15M5 13h3" /></svg>,
  access: <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="10" cy="8" r="3.5" /><path d="M10 11.5v6M7 14.5h6" /></svg>,
  analytics: <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 17V3M3 17h14M6 14V9M10 14V6M14 14v-4" /></svg>,
  service: <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3.5 16c0-3.5 2.5-6 6.5-6s6.5 2.5 6.5 6" /><circle cx="10" cy="6" r="3" /><path d="M14.5 5.5l2-2" /></svg>,
  logout: <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M8 4H4v12h4M13 7l3 3-3 3M16 10H8" /></svg>,
};

const ROUTES: Route[] = [
  { id: "dashboard", href: "/admin",            label: "總覽 Dashboard", icon: Icons.dashboard, section: "overview" },
  { id: "videos",    href: "/admin/videos",     label: "影音管理",       icon: Icons.video,    section: "cms", badge: "8" },
  { id: "news",      href: "/admin/news",       label: "新聞管理",       icon: Icons.content,  section: "cms", badge: "12" },
  { id: "curations", href: "/admin/curations",  label: "策展管理",       icon: Icons.content,  section: "cms" },
  { id: "members",   href: "/admin/members",    label: "會員管理",       icon: Icons.members,  section: "cms" },
  { id: "orders",    href: "/admin/orders",     label: "金流管理",       icon: Icons.orders,   section: "cms", badge: "1" },
  { id: "access",    href: "/admin/roles",      label: "編輯 / 權限",    icon: Icons.access,   section: "cms" },
  { id: "analytics", href: "/admin/cdn",        label: "數據分析",       icon: Icons.analytics, section: "cms" },
  { id: "service",   href: "/admin/service",    label: "支援 / 客服",    icon: Icons.service,  section: "cms", badge: "2" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const admin = useAuth((s) => s.admin);
  const logout = useAuth((s) => s.logoutAdmin);

  return (
    <aside className="adm-sidebar">
      <Link className="adm-brand" href="/admin">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <g transform="translate(12,12)">
            <circle cx="0" cy="0" r="10" fill="none" stroke="currentColor" strokeWidth="1.6" />
            {[0, 72, 144, 216, 288].map((d, i) => (
              <ellipse key={i} cx="0" cy="-5" rx="2.6" ry="4.2" fill="currentColor" transform={`rotate(${d})`} />
            ))}
            <circle cx="0" cy="0" r="1.5" fill="currentColor" />
          </g>
        </svg>
        <div className="adm-brand-text">
          HAKKA+<small>CMS · ADMIN</small>
        </div>
      </Link>

      <nav className="adm-nav" aria-label="後台導覽">
        <div className="adm-nav-sect">Overview</div>
        {ROUTES.filter((r) => r.section === "overview").map((r) => {
          const active = pathname === r.href;
          return (
            <Link key={r.id} className={`adm-nav-item ${active ? "is-on" : ""}`} href={r.href}>
              {r.icon}
              <span>{r.label}</span>
            </Link>
          );
        })}

        <div className="adm-nav-sect">CMS · 7 大類</div>
        {ROUTES.filter((r) => r.section === "cms").map((r) => {
          const active = pathname === r.href || pathname.startsWith(r.href + "/");
          return (
            <Link key={r.id} className={`adm-nav-item ${active ? "is-on" : ""}`} href={r.href}>
              {r.icon}
              <span>{r.label}</span>
              {r.badge ? <span className="adm-nav-badge">{r.badge}</span> : null}
            </Link>
          );
        })}
      </nav>

      <div className="adm-sidebar-footer">
        <span className="adm-avatar">{admin?.name?.charAt(0) ?? "張"}</span>
        <div className="adm-user-info">
          <span className="adm-user-name">{admin?.name ?? "張家瑋"}</span>
          <span className="adm-user-role">{admin?.role === "superadmin" ? "總編" : "編輯"} · UID 7102</span>
        </div>
        <button
          className="adm-icon-btn"
          aria-label="登出"
          style={{ color: "rgba(255,255,255,0.6)" }}
          onClick={() => { logout(); router.replace("/admin/login"); }}
        >
          {Icons.logout}
        </button>
      </div>
    </aside>
  );
}
