"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/lib/store/auth";
import { useUi } from "@/lib/store/ui";

/**
 * Admin Login — 後台淺色系 (cream paper) + 深綠 mint accent button
 * Self-contained styling (inline) so it can't be polluted by globals.
 */
export default function AdminLoginPage() {
  const router = useRouter();
  const login = useAuth((s) => s.loginAsAdmin);
  const toast = useUi((s) => s.toast);
  const [email, setEmail] = useState("editor@hakka.tv");
  const [password, setPassword] = useState("demo");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    toast({ variant: "success", title: "已登入後台", description: `Welcome, ${email}` });
    router.replace("/admin");
  };

  return (
    <div className="admlogin-root">
      <div className="admlogin-orb admlogin-orb-1" aria-hidden="true" />
      <div className="admlogin-orb admlogin-orb-2" aria-hidden="true" />

      <div className="admlogin-card">
        <div className="admlogin-head">
          <Image src="/hakka-logo-dark.png" alt="HakkaTV" width={160} height={40} priority style={{ height: "auto" }} />
          <span className="admlogin-pill">CMS · ADMIN</span>
        </div>
        <p className="admlogin-intro">
          POC 階段假登入 — 任意輸入 email 與密碼即可進入後台。
        </p>

        <form onSubmit={handleSubmit} className="admlogin-form">
          <label className="admlogin-field">
            <span className="admlogin-label">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="admlogin-input"
              autoComplete="email"
            />
          </label>
          <label className="admlogin-field">
            <span className="admlogin-label">密碼</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admlogin-input"
              autoComplete="current-password"
            />
          </label>
          <button type="submit" className="admlogin-submit">
            登入
          </button>
        </form>

        <p className="admlogin-foot">
          全部介面以 mock data 呈現，所有寫入均儲存於 localStorage。
        </p>
      </div>

      <style>{`
        .admlogin-root {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 24px;
          background: #f6f4ef;
          color: #1a1f1d;
          font-family: "Noto Sans TC", "PingFang TC", system-ui, sans-serif;
          overflow: hidden;
        }
        .admlogin-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .admlogin-orb-1 {
          top: -200px; left: -200px;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(83, 225, 161, 0.28) 0%, rgba(83, 225, 161, 0) 75%);
        }
        .admlogin-orb-2 {
          bottom: -200px; right: -200px;
          width: 540px; height: 540px;
          background: radial-gradient(circle, rgba(218, 156, 70, 0.18) 0%, rgba(218, 156, 70, 0) 75%);
        }

        .admlogin-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 440px;
          background: #ffffff;
          border-radius: 24px;
          padding: 40px 36px;
          box-shadow: 0 1px 2px rgba(26,31,29,0.04), 0 12px 40px rgba(26,31,29,0.08);
          border: 1px solid rgba(26,31,29,0.06);
        }
        .admlogin-head {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
          flex-wrap: wrap;
        }
        .admlogin-pill {
          font-family: "IBM Plex Mono", monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          color: #00A150;
          background: #d4ecd9;
          padding: 5px 10px;
          border-radius: 999px;
        }
        .admlogin-intro {
          margin: 0 0 28px;
          font-size: 14px;
          line-height: 1.6;
          color: rgba(26, 31, 29, 0.7);
        }

        .admlogin-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .admlogin-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .admlogin-label {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: rgba(26, 31, 29, 0.7);
        }
        .admlogin-input {
          height: 48px;
          padding: 0 14px;
          border-radius: 10px;
          border: 1px solid rgba(26,31,29,0.18);
          background: #ffffff;
          color: #1a1f1d;
          font-size: 15px;
          font-family: inherit;
          transition: all 180ms ease;
        }
        .admlogin-input:hover { border-color: rgba(26,31,29,0.4); }
        .admlogin-input:focus {
          outline: none;
          border-color: #00A150;
          box-shadow: 0 0 0 3px rgba(0, 161, 80, 0.15);
        }

        .admlogin-submit {
          margin-top: 8px;
          height: 52px;
          border-radius: 999px;
          border: 0;
          background: #00A150;
          color: #ffffff;
          font-family: inherit;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: all 180ms ease;
          box-shadow: 0 4px 12px rgba(0, 161, 80, 0.25);
        }
        .admlogin-submit:hover {
          background: #008f44;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(0, 161, 80, 0.35);
        }
        .admlogin-submit:active { transform: translateY(0); }

        .admlogin-foot {
          margin: 28px 0 0;
          font-size: 12px;
          color: rgba(26, 31, 29, 0.45);
          text-align: center;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
}
