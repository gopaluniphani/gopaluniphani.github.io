import { CapabilityGroups } from "@/components/CapabilityGroups";
import { CaseStudies } from "@/components/CaseStudies";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { MotionProvider } from "@/components/MotionProvider";
import { Navigation } from "@/components/Navigation";
import { ProjectLab } from "@/components/ProjectLab";
import { ScrollBody } from "@/components/ScrollBody";
import { StoryTimeline } from "@/components/StoryTimeline";

export default function Home() {
  return (
    <MotionProvider>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navigation />
      <ScrollBody>
        <main id="main-content" className="intro-sequence" data-intro-sequence>
          <span className="section-anchor" data-section-anchor="top" aria-hidden="true" />
          <Hero />
          <span className="section-anchor" data-section-anchor="story" aria-hidden="true" />
          <StoryTimeline />
          <span className="section-anchor section-anchor--panel" data-section-anchor="work" aria-hidden="true" />
          <div className="chapter-panel chapter-panel--work"><CaseStudies /></div>
          <span className="section-anchor section-anchor--panel" data-section-anchor="range" aria-hidden="true" />
          <div className="chapter-panel chapter-panel--range"><CapabilityGroups /></div>
          <span className="section-anchor section-anchor--panel" data-section-anchor="lab" aria-hidden="true" />
          <div className="chapter-panel chapter-panel--lab"><ProjectLab /></div>
          <span className="section-anchor section-anchor--panel" data-section-anchor="contact" aria-hidden="true" />
          <div className="chapter-panel chapter-panel--contact"><Contact /></div>
        </main>
      </ScrollBody>
    </MotionProvider>
  );
}
