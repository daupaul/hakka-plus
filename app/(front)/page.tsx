import { HeroStack } from "@/components/front/home/hero-stack";
import { TimelineSignature } from "@/components/front/home/timeline-signature";
import { SectionFresh } from "@/components/front/home/section-fresh";
import { SectionStories } from "@/components/front/home/section-stories";
import { SectionHeadlines } from "@/components/front/home/section-headlines";
import { SectionLifeWay } from "@/components/front/home/section-life-way";
import { SectionIntoLife } from "@/components/front/home/section-into-life";

export default function HomePage() {
  return (
    <>
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
