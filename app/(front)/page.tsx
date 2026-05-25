import { HeroStack } from "@/components/front/home/hero-stack";
import { TimelineSignature } from "@/components/front/home/timeline-signature";
import { SeniorPriority } from "@/components/front/home/senior-priority";
import { SectionFresh, SectionStories, SectionLifeWay, SectionHeadlines, SectionIntoLife } from "@/components/front/home/sections";

export default function HomePage() {
  return (
    <>
      {/* Senior mode 啟用時，此區會插入；標準模式時為 null */}
      <SeniorPriority />

      {/* 標準模式區塊 — senior mode 透過 CSS 隱藏 */}
      <HeroStack />
      <TimelineSignature />
      <SectionFresh />
      <SectionStories />
      <SectionHeadlines />
      <SectionLifeWay />
      <SectionIntoLife />
    </>
  );
}
