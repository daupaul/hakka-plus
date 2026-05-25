import { HeroStack } from "@/components/front/home/hero-stack";
import { TimelineSignature } from "@/components/front/home/timeline-signature";
import { SectionFresh, SectionStories, SectionLifeWay, SectionHeadlines, SectionIntoLife } from "@/components/front/home/sections";

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
