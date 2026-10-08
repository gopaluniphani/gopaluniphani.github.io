import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TempoForgeDevices } from "@/components/TempoForgeDevices";
import { EngineeringChoices } from "@/components/EngineeringChoices";
import { AppWalkthrough } from "@/components/AppWalkthrough";
import { ProjectMotion } from "@/components/ProjectMotion";
import styles from "@/components/TempoForge.module.css";

export const metadata: Metadata = {
  title: "Tempo Forge — A personal build by Phani Gopaluni",
  description: "An enterprise engineer’s exploration of native app development: building an iPhone and Apple Watch workout timer with Codex, SwiftUI, and Xcode.",
};
const decisions = [
  { number: "01", title: "Two screens. One clock.", problem: "A phone and a Watch can disagree when messages arrive late or a device reconnects.", decision: "When the companion joins, the Watch owns the workout clock. Both screens calculate time from the same phase end date; command identifiers and revisions help reject duplicate actions and stale updates.", learning: "Distributed-systems thinking, on your wrist." },
  { number: "02", title: "AI helps plan. The app validates.", problem: "A generated routine still needs to be valid to import and predictable to run.", decision: "ChatGPT assists with workout JSON. The user reviews and imports it, and Tempo Forge validates the structure before saving. Planning stays separate from control over app data.", learning: "A clear boundary between generated content and application state." },
  { number: "03", title: "Recovery is part of the experience.", problem: "A workout should account for delayed Watch startup, interrupted connections, and the time needed to log a set.", decision: "Paired starts use a readiness handshake. Phone fallback is explicit when Watch confirmation is uncertain. Recovery keeps counting while a set is logged; the next work step waits until the user is ready.", learning: "Failure states and small interaction details deserve the same attention." },
];
export default function TempoForgePage() {
  return <>
    <a className="skip-link" href="#project-content">Skip to content</a>
    <header className={styles.header}><Link href="/" className={styles.brand}>Phani Gopaluni</Link><div className={styles.headerActions}><Link href="/#projects">← Back to portfolio</Link><ThemeToggle /></div></header>
    <ProjectMotion>
      <div className={styles.sequence}>
        <div className={styles.heroPanel} data-project-panel><div className={styles.wrap}>
        <section className={styles.hero} aria-labelledby="project-title">
          <div className={styles.heroCopy} data-project-reveal>
            <p className={styles.kicker}>The personal lab / 01</p>
            <div className={styles.projectName}><Image src="/images/tempo-forge/icon.webp" width={44} height={44} alt="" /><span>Tempo Forge</span></div>
            <h1 id="project-title">Built out of<br /><em>curiosity.</em><br />Shaped by engineering.</h1>
            <p className={styles.heroLead}>A personal workout app. A hands-on exploration of native development, connected devices, and building with AI.</p>
            <p className={styles.heroNote}>My professional focus is enterprise software. Tempo Forge is where I stretch into a new platform, bringing the same care for system design, review, and delivery to a hobby project.</p>
            <a className={styles.primaryLink} href="#engineering">Inside the engineering <span aria-hidden="true">↓</span></a>
          </div>
          <div className={styles.heroVisual}><TempoForgeDevices priority showOrbit={false} /><p className={styles.visualCaption}>TempoForge on iPhone & Apple Watch<br /><span>Actual app captures · Version 2.0</span></p></div>
        </section>
        <dl className={styles.facts} data-project-reveal><div><dt>Context</dt><dd>Independent personal project</dd></div><div><dt>Built with</dt><dd>Codex + Xcode</dd></div><div><dt>Platform</dt><dd>SwiftUI · iOS · watchOS</dd></div><div><dt>Milestone</dt><dd>Version 2.0 · October 2026</dd></div></dl>
        </div></div>
        <div className={`${styles.panel} ${styles.alternate}`} data-project-panel><div className={styles.wrap}>
        <section className={styles.section} aria-labelledby="product-title">
          <div className={styles.sectionIntro} data-project-reveal><p className={styles.kicker}>01 / The app</p><h2 id="product-title">Make the routine repeatable.<br /><em>Keep the workout clear.</em></h2><p>Tempo Forge is a guided interval timer for building presets, moving through work and recovery, and reviewing what was completed. The interesting work lives in the details between those steps.</p></div>
          <AppWalkthrough />
        </section>
        </div></div>
        <span id="engineering" className={styles.panelAnchor} aria-hidden="true" />
        <div className={styles.panel} data-project-panel><div className={styles.wrap}>
        <section className={styles.section} aria-labelledby="engineering-title">
          <div className={styles.sectionIntro} data-project-reveal><p className={styles.kicker}>02 / Engineering choices</p><h2 id="engineering-title">A small app.<br /><em>Real systems questions.</em></h2><p>The platform was new territory. The questions were familiar: who owns state, which inputs can be trusted, and what happens when the expected path breaks?</p></div>
          <EngineeringChoices decisions={decisions} />
        </section>
        </div></div>
        <div className={`${styles.panel} ${styles.alternate}`} data-project-panel><div className={styles.wrap}>
        <section className={styles.workflow} aria-labelledby="workflow-title">
          <div data-project-reveal><p className={styles.kicker}>03 / Working with AI</p><h2 id="workflow-title">Codex in the workflow.<br /><em>Engineering judgment throughout.</em></h2><p>I built Tempo Forge with Codex and Xcode to explore how AI fits into a complete development cycle: defining behavior, implementing changes, testing on devices, and preparing a release.</p></div>
          <ol className={styles.steps} data-project-reveal>
            <li><span>01</span><div><h3>Make the intent reviewable</h3><p>Feature documents bring requirements, interface states, design decisions, and test plans into one working record.</p></div></li>
            <li><span>02</span><div><h3>Build, inspect, iterate</h3><p>Use Codex alongside Xcode, with scoped issues and reviewable changes. Check the experience in the simulator and on physical devices.</p></div></li>
            <li><span>03</span><div><h3>Carry it through delivery</h3><p>Unit and UI tests, Xcode Cloud builds, TestFlight checks, and device acceptance support the release process.</p></div></li>
          </ol>
        </section>
        </div></div>
        <div className={styles.panel} data-project-panel><div className={styles.wrap}>
        <section className={styles.closing} aria-labelledby="learning-title"><p className={styles.kicker}>04 / Still learning</p><h2 id="learning-title">New tools.<br /><em>A broader engineering perspective.</em></h2><p>SwiftUI state, Watch connectivity, local persistence, and Apple’s release process gave me new problems to work through. Tempo Forge is an ongoing personal project—a way to stay curious, test ideas, and bring a wider perspective back to my enterprise work.</p><div className={styles.tags}><span>SwiftUI</span><span>SwiftData</span><span>CloudKit</span><span>WatchConnectivity</span><span>HealthKit</span><span>Xcode Cloud</span></div><p className={styles.releaseNote}>Version 2.0 was approved by Apple and manually released on October 3, 2026. The release record also keeps deferred work visible, including broader connectivity fault testing and performance diagnostics.</p><Link href="/#work" className={styles.primaryLink}>Explore my enterprise work <span aria-hidden="true">↗</span></Link></section>
        <footer className={styles.footer}><span>Phani Gopaluni · Personal lab</span><Link href="/#projects">Back to portfolio ↑</Link></footer>
        </div></div>
      </div>
    </ProjectMotion>
  </>;
}
