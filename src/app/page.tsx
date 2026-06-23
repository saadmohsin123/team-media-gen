import { SiteShell } from "@/components/layout/site-shell";
import { CtaSection } from "@/components/templates/cta-section";
import { FeatureCards } from "@/components/templates/feature-cards";
import { HeroSection } from "@/components/templates/hero-section";
import { StatsSection } from "@/components/templates/stats-section";

export default function Home() {
  return (
    <SiteShell>
      <HeroSection />
      <StatsSection />
      <FeatureCards />
      <CtaSection />
    </SiteShell>
  );
}
