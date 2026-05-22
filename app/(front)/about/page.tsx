import Link from "next/link";
import { Building2, Users, FileText, Phone, HelpCircle, Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-12 py-10 lg:py-16">
      <Badge variant="default">關於客台</Badge>
      <h1 className="mt-3 font-display text-3xl lg:text-5xl font-extrabold tracking-tight text-text-primary">
        財團法人公共電視文化事業基金會 · 客家電視台
      </h1>
      <p className="mt-4 text-text-secondary text-base lg:text-lg leading-loose max-w-3xl">
        客家電視台成立於 2003 年 7 月 1 日，是全球唯一以客語發音、報導與製作的全方位頻道。
        二十多年來，客台堅持深耕客家文化、傳承客家語言、紀錄客庄生活，並致力於成為國際間客家影視內容的重要產製基地。
      </p>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-text-primary mb-4">核心價值</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { title: "文化深耕", desc: "守護客家語言與文化傳承" },
            { title: "公共媒體", desc: "獨立、多元、公正的公共媒體精神" },
            { title: "創新表達", desc: "結合當代影像技術與年輕世代美學" },
          ].map((v) => (
            <Card key={v.title}><CardContent>
              <div className="font-display font-bold text-text-primary">{v.title}</div>
              <div className="mt-2 text-sm text-text-secondary">{v.desc}</div>
            </CardContent></Card>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-text-primary mb-4">了解更多</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { href: "/about/governance", icon: <FileText className="size-5" />, title: "公開資訊", desc: "年度報告、財務、董事會、製播公約等" },
            { href: "/about/contact", icon: <Phone className="size-5" />, title: "聯絡 / 申訴", desc: "節目建議、廣告洽詢、內容申訴" },
            { href: "/about/faq", icon: <HelpCircle className="size-5" />, title: "常見問題", desc: "訂閱、技術、退款 等問題解答" },
            { href: "/about/visit", icon: <Calendar className="size-5" />, title: "參訪申請", desc: "學校、社團、學術研究參訪" },
          ].map((c) => (
            <Link key={c.href} href={c.href} className="card p-5 hover:border-accent transition-colors group">
              <div className="flex items-start gap-3">
                <div className="size-10 rounded-full bg-accent-soft text-accent inline-flex items-center justify-center shrink-0">{c.icon}</div>
                <div className="flex-1">
                  <div className="font-display font-bold text-text-primary group-hover:text-accent transition-colors">{c.title}</div>
                  <p className="mt-1 text-sm text-text-secondary">{c.desc}</p>
                </div>
                <ArrowRight className="size-4 text-text-muted group-hover:text-accent transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
