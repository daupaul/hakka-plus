import type { Metadata } from "next";
import { Noto_Sans_TC, Inter } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/providers/site-shell";

const notoSansTC = Noto_Sans_TC({
  variable: "--font-sans-tc",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const inter = Inter({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "客+｜日常有客",
    template: "%s｜客+",
  },
  description: "公視客家電視台 2027 客+ 平台 — 日常有客，讓文化成為生活的一部分。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant" className={`${notoSansTC.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full font-sans bg-bg-base text-text-primary">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
