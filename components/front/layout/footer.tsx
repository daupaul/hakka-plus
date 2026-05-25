"use client";

import Link from "next/link";

const NAV = ["首頁", "影視", "新聞", "短影音", "生活+", "直播", "節目表", "主題訂閱"];
const LEGAL = ["隱私權政策", "服務條款", "Cookie 設定", "客台簡介"];

export function Footer() {
  return (
    <footer className="ft-section">
      <div className="ft-orb ft-orb-green" aria-hidden="true" />
      <div className="ft-orb ft-orb-amber" aria-hidden="true" />

      <div className="ft-top">
        <div className="footer-wordmark">HAKKA+</div>
        <div className="ft-cols">
          <div className="ft-col">
            <div className="ft-col-head">Menu</div>
            <ul>{NAV.map((n) => <li key={n}><Link href="/">{n}</Link></li>)}</ul>
          </div>
          <div className="ft-col">
            <div className="ft-col-head">Links</div>
            <ul>
              <li><a href="#">YouTube</a></li>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </div>
          <div className="ft-col">
            <div className="ft-col-head">Legal</div>
            <ul>
              {LEGAL.map((n) => <li key={n}><a href="#">{n}</a></li>)}
              <li><Link href="/account/subscription">訂閱方案</Link></li>
              <li><Link href="/admin" style={{ opacity: 0.5 }}>CMS 後台</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="ft-bottom">
        <span className="ft-copy">© 2026 Hakka TV, Hakka Affairs Council. All rights reserved.</span>
        <span className="ft-recaptcha">本站採用 reCAPTCHA 保護機制</span>
      </div>

      <style>{`
        .ft-section { position: relative; background: var(--bg-base); padding: 64px 52px 32px; overflow: hidden; }
        .ft-orb { position: absolute; border-radius: 50%; pointer-events: none; filter: blur(60px); z-index: 0; }
        .ft-orb-green { right: -240px; top: -160px; width: 880px; height: 880px; background: radial-gradient(circle, rgba(34, 130, 80, 0.72) 0%, rgba(34, 130, 80, 0.25) 45%, rgba(34, 130, 80, 0) 75%); }
        .ft-orb-amber { left: -180px; bottom: -240px; width: 720px; height: 720px; background: radial-gradient(circle, rgba(218, 156, 70, 0.55) 0%, rgba(218, 156, 70, 0.18) 45%, rgba(218, 156, 70, 0) 75%); }
        .ft-top { position: relative; z-index: 1; max-width: var(--max-w); margin: 0 auto; display: grid; grid-template-columns: 1fr auto; gap: 110px; padding-bottom: 160px; align-items: flex-start; }
        .footer-wordmark { font-family: var(--font-condensed); font-weight: 700; font-size: clamp(96px, 14vw, 120px); line-height: 1; letter-spacing: -2px; color: var(--accent-mint); white-space: nowrap; }
        .ft-cols { display: grid; grid-template-columns: repeat(3, 71px); gap: 110px; padding-top: 32px; }
        .ft-col-head { font-family: "Helvetica", sans-serif; font-size: 12px; letter-spacing: 0.2px; color: rgba(83, 225, 161, 0.5); margin-bottom: 16px; }
        .ft-col ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 14px; }
        .ft-col a { font-family: var(--font-mono); font-size: calc(14px * var(--type-scale)); color: var(--accent-mint); letter-spacing: 0.2px; white-space: nowrap; display: inline-flex; min-height: var(--tap-min); align-items: center; transition: opacity var(--dur-fast) ease; text-decoration: none; }
        .ft-col a:hover { opacity: 0.7; }
        .ft-bottom { position: relative; z-index: 1; max-width: var(--max-w); margin: 0 auto; display: flex; justify-content: space-between; align-items: center; font-family: "Helvetica", sans-serif; font-size: calc(14px * var(--type-scale)); letter-spacing: 0.2px; color: var(--accent-mint); gap: 16px; }
        @media (max-width: 900px) { .ft-section { padding: 48px 20px 24px; } .ft-top { grid-template-columns: 1fr; gap: 48px; padding-bottom: 48px; } .ft-cols { grid-template-columns: repeat(3, 1fr); gap: 24px; padding-top: 0; } .ft-bottom { flex-direction: column; align-items: flex-start; gap: 8px; } }
      `}</style>
    </footer>
  );
}
