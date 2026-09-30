"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUp, Plus } from "@phosphor-icons/react";
import { caseStudies } from "@/content/portfolio";
import styles from "./CaseStudies.module.css";

const slideDuration = 450;

function CaseStudy({ study, active, onSelect }: {
  study: (typeof caseStudies)[number];
  active: boolean;
  onSelect: (number: string | null) => void;
}) {
  const disclosure = useRef<HTMLDetailsElement>(null);

  const animation = useRef<Animation | null>(null);
  const returnFocus = useRef(false);

  useEffect(() => () => animation.current?.cancel(), []);

  const setExpanded = useCallback((next: boolean, focusTitle = false) => {
    const element = disclosure.current;
    const summary = element?.querySelector("summary");
    const content = element?.querySelector<HTMLElement>("[data-case-content]");
    if (!element || !summary || !content) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Read the visible height before cancelling so rapid taps reverse smoothly.
    const startHeight = element.getBoundingClientRect().height;
    animation.current?.cancel();
    animation.current = null;
    if (!next && !element.open) return;
    element.open = true;
    element.toggleAttribute("data-closing", !next);
    summary.setAttribute("aria-expanded", String(next));
    content.inert = !next;

    if (focusTitle) {
      summary.focus({ preventScroll: true });
      summary.scrollIntoView({ block: "nearest", behavior: reducedMotion ? "instant" : "smooth" });
    }

    const border = parseFloat(getComputedStyle(element).borderBottomWidth) || 0;
    const endHeight = summary.getBoundingClientRect().height + border
      + (next ? content.getBoundingClientRect().height : 0);

    function finish() {
      element!.open = next;
      element!.removeAttribute("data-closing");
      element!.style.removeProperty("height");
      element!.style.removeProperty("overflow");
      animation.current?.cancel();
      animation.current = null;
    }

    if (reducedMotion) {
      finish();
      return;
    }

    element.style.overflow = "clip";
    animation.current = element.animate(
      { height: [`${startHeight}px`, `${endHeight}px`] },
      { duration: slideDuration, easing: "cubic-bezier(0.4, 0, 0.2, 1)", fill: "both" },
    );
    animation.current.onfinish = finish;
  }, []);

  useEffect(() => {
    setExpanded(active, returnFocus.current);
    returnFocus.current = false;
  }, [active, setExpanded]);

  function closeStudy() {
    returnFocus.current = true;
    onSelect(null);
  }

  return (
    <li>
      <details className={styles.study} ref={disclosure}>
        <summary className={styles.summary} onClick={(event) => {
          event.preventDefault();
          onSelect(active ? null : study.number);
        }}>
          <span className={styles.number} aria-hidden="true">{study.number}</span>
          <span className={styles.summaryCopy}>
            <span className={styles.theme}>{study.theme}</span>
            <h3 id={`study-title-${study.number}`}>{study.title}</h3>
          </span>
          <span className={styles.toggle} aria-hidden="true">
            <Plus size={22} weight="regular" />
          </span>
        </summary>
        <div className={styles.detail} data-case-content role="region" aria-labelledby={`study-title-${study.number}`}>
          <div className={styles.detailGrid}>
            <div><h4>The problem</h4><p>{study.context}</p></div>
            <div><h4>My contribution</h4><p>{study.role}</p></div>
            <div className={styles.approach}><h4>The approach</h4><p>{study.approach}</p></div>
            <div className={styles.outcome}><h4>The outcome</h4><p>{study.outcome}</p></div>
          </div>
          <ul className={styles.tags} aria-label="Skills used">
            {study.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
          </ul>
          <button className={styles.close} type="button" onClick={closeStudy}>
            Close case study <ArrowUp size={16} aria-hidden="true" />
          </button>
        </div>
      </details>
    </li>
  );
}

export function CaseStudies() {
  const work = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const stopAnchoring = useRef<(() => void) | null>(null);

  useEffect(() => () => stopAnchoring.current?.(), []);

  useEffect(() => {
    const section = work.current;
    const scroller = section?.closest<HTMLElement>("[data-scroll-wrapper]");
    const artwork = section?.querySelector<HTMLElement>("[data-work-art]");
    if (!section || !scroller || !artwork) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const viewport = scroller.getBoundingClientRect();
      const anchor = document.querySelector<HTMLElement>('[data-section-anchor="work"]');
      if (!anchor) return;
      const nextAnchor = document.querySelector<HTMLElement>('[data-section-anchor="range"]');
      if (!nextAnchor) return;
      const start = anchor.getBoundingClientRect().top;
      const distance = Math.max(1, nextAnchor.getBoundingClientRect().top - start);
      // Complete a full turn between Work's navigation target and Technical Range.
      const progress = Math.max(0, Math.min(1, (viewport.top - start) / distance));
      // A single 2D transform; CSS owns positioning, independently of disclosure height.
      if (!section.hasAttribute("data-reading") || reducedMotion.matches) {
        const turn = reducedMotion.matches ? 0 : progress * 360;
        artwork.style.setProperty("--art-turn", `${turn.toFixed(2)}deg`);
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const resize = new ResizeObserver(schedule);
    resize.observe(scroller);
    scroller.addEventListener("scroll", schedule, { passive: true });
    reducedMotion.addEventListener("change", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      scroller.removeEventListener("scroll", schedule);
      reducedMotion.removeEventListener("change", schedule);
    };
  }, []);

  const selectCase = useCallback((number: string | null) => {
    stopAnchoring.current?.();
    const summary = number
      ? document.getElementById(`study-title-${number}`)?.closest("summary")
      : null;
    const scroller = summary?.closest<HTMLElement>("[data-scroll-wrapper]");

    if (summary && scroller) {
      // Keep the chosen title in view while a preceding case loses height.
      // User scrolling immediately takes control back from this short anchor.
      const bounds = scroller.getBoundingClientRect();
      const titleBounds = summary.getBoundingClientRect();
      const targetTop = Math.max(bounds.top + 12,
        Math.min(titleBounds.top, bounds.bottom - titleBounds.height - 100));
      const previousAnchor = scroller.style.overflowAnchor;
      scroller.style.overflowAnchor = "none";
      let frame = 0;
      const started = performance.now();
      const stop = () => {
        cancelAnimationFrame(frame);
        scroller.style.overflowAnchor = previousAnchor;
        scroller.removeEventListener("wheel", stop);
        scroller.removeEventListener("touchstart", stop);
        scroller.removeEventListener("keydown", stop);
        stopAnchoring.current = null;
      };
      const keepTitleVisible = () => {
        scroller.scrollTop += summary.getBoundingClientRect().top - targetTop;
        if (performance.now() - started < slideDuration + 100) {
          frame = requestAnimationFrame(keepTitleVisible);
        } else {
          stop();
        }
      };
      stopAnchoring.current = stop;
      scroller.addEventListener("wheel", stop, { passive: true });
      scroller.addEventListener("touchstart", stop, { passive: true });
      scroller.addEventListener("keydown", stop);
      frame = requestAnimationFrame(keepTitleVisible);
    }
    setActive(number);
  }, []);

  return (
    <section className={`work section ${styles.work}`} id="work" aria-labelledby="work-title" ref={work} data-reading={active !== null ? "" : undefined}>
      <div className={styles.artRail} aria-hidden="true">
        <div className={styles.art} data-work-art>
        <Image src="/images/work-assembly.webp" alt="" width={379} height={600} sizes="(max-width: 768px) 80vw, 42vw" />
        </div>
      </div>
      <div className={`shell ${styles.foreground}`}>
        <header className={styles.header}>
          <p className={`eyebrow ${styles.eyebrow}`}>02 / Selected work</p>
          <div className={styles.intro}>
            <h2 id="work-title">Engineering<br /><em>in practice.</em></h2>
            <p className={styles.description}>Selected projects across responsive interfaces, secure products, and production ML. What I built, the decisions I made, and where the work landed.</p>

          </div>
        </header>
        <div className={styles.listHeading}>
          <p>{String(caseStudies.length).padStart(2, "0")} case studies</p>
          <p>Choose a case to explore</p>
        </div>
        <ol className={styles.list} aria-label="Selected case studies">
          {caseStudies.map((study) => <CaseStudy study={study} active={active === study.number} onSelect={selectCase} key={study.number} />)}
        </ol>
      </div>
    </section>
  );
}
