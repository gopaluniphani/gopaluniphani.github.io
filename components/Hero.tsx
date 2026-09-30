"use client";

import { ArrowDown, ArrowRight, Circle } from "@phosphor-icons/react";
import { hero } from "@/content/portfolio";
import { scrollToSection } from "./sectionNavigation";
import styles from "./Hero.module.css";

function navigateToSection(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
  const target = document.getElementById(id);
  const scroller = document.querySelector<HTMLElement>("[data-scroll-wrapper]");
  if (!target || !scroller || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (!scrollToSection(scroller, id)) return;
  event.preventDefault();
  window.history.replaceState(null, "", `#${id}`);
  if (event.detail === 0) {
    const hadTabIndex = target.hasAttribute("tabindex");
    if (!hadTabIndex) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    if (!hadTabIndex) target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
  }
}

export function Hero() {
  return (
    <section className={styles.surface} id="top" data-hero aria-labelledby="hero-title">
      <div className={styles.stage}>
        <div className={styles.content} data-hero-content>
          <p className={styles.kicker} data-hero-reveal>{hero.kicker}</p>
          <h1 className={styles.title} id="hero-title" data-hero-reveal>
            <span>I build</span>{" "}
            <em>software systems</em>{" "}
            <span className={styles.lastLine}>that earn trust.</span>
          </h1>
          <p className={styles.intro} data-hero-reveal>{hero.introduction}</p>
          <div className={styles.actions} data-hero-reveal>
            <a className={styles.workButton} href="#work" onClick={(event) => navigateToSection(event, "work")}>
              <span className={styles.desktopButtonText}>Explore selected work</span>
              <span className={styles.mobileButtonText}>Explore work</span>
              <ArrowRight size={21} aria-hidden="true" />
            </a>
            <p className={styles.availability}><Circle size={15} weight="fill" aria-hidden="true" />{hero.availability}</p>
          </div>
          <p className={styles.motto} aria-label="Build, solve, improve, together">Build<br />Solve<br />Improve<br />Together</p>
        </div>
        <div className={styles.art} aria-hidden="true" data-hero-reveal>
          <picture data-hero-orbit>
            <source media="(max-width: 900px)" srcSet="/images/hero-orbit-mobile.webp" />
            {/* Art-directed sources avoid downloading desktop artwork on phones. */}
            <img src="/images/hero-orbit.webp" width="1000" height="1000" alt="" fetchPriority="high" />
          </picture>
        </div>
        <a className={styles.scrollCue} data-hero-scroll-cue aria-label="Explore my story" href="#story" onClick={(event) => navigateToSection(event, "story")}>
          <span>01</span><span className={styles.scrollLabel}>Scroll to explore <ArrowDown size={19} aria-hidden="true" /></span>
        </a>
      </div>
    </section>
  );
}
