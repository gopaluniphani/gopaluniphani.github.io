"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import styles from "./TempoForge.module.css";

const screens = [
  { file: "phone-review", title: "Prepare the session", copy: "Review and arrange a preset before starting. Reuse and share routines as JSON files.", alt: "Workout review screen with ordered exercises and workout settings" },
  { file: "phone-work", title: "Stay with the current step", copy: "See the exercise, interval, and what comes next, with coordinated controls on iPhone and Watch.", alt: "Active Goblet Squat workout timer on iPhone" },
  { file: "phone-log-last-set", title: "Record the work", copy: "Log reps and weight during recovery, then continue when ready for the next work step.", alt: "Log Last Set screen for recording completed exercise reps and weight" },
];

export function AppWalkthrough() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function goTo(index: number) {
    const container = track.current;
    const card = container?.children[index] as HTMLElement | undefined;
    if (!container || !card) return;
    container.scrollTo({
      left: container.scrollLeft + card.getBoundingClientRect().left - container.getBoundingClientRect().left,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  function syncPosition() {
    const container = track.current;
    if (!container || container.scrollWidth <= container.clientWidth) return;
    const left = container.getBoundingClientRect().left;
    const distances = Array.from(container.children, (card) => Math.abs(card.getBoundingClientRect().left - left));
    setActive(distances.indexOf(Math.min(...distances)));
  }

  return <div className={styles.walkthrough} role="region" aria-label="Tempo Forge app walkthrough">
    <div ref={track} id="app-walkthrough" className={styles.screens} tabIndex={0} aria-label="App screens. On mobile, swipe or use the arrow keys to explore." onScroll={syncPosition} onKeyDown={(event) => {
      if (event.target !== event.currentTarget || !window.matchMedia("(max-width: 640px)").matches) return;
      const next = event.key === "ArrowRight" ? Math.min(active + 1, screens.length - 1) : event.key === "ArrowLeft" ? Math.max(active - 1, 0) : event.key === "Home" ? 0 : event.key === "End" ? screens.length - 1 : null;
      if (next !== null) { event.preventDefault(); goTo(next); }
    }}>
      {screens.map((screen, i) => <figure key={screen.file} className={styles.screenCard} aria-label={`${i + 1} of ${screens.length}: ${screen.title}`}>
        <div className={styles.screenStage}><Image src={`/images/tempo-forge/${screen.file}.webp`} alt={screen.alt} width={720} height={1565} /></div>
        <figcaption><span>0{i + 1}</span><h3>{screen.title}</h3><p>{screen.copy}</p></figcaption>
      </figure>)}
    </div>
    <div className={styles.carouselControls}>
      <button type="button" aria-label="Previous app screen" aria-controls="app-walkthrough" disabled={active === 0} onClick={() => goTo(active - 1)}>←</button>
      <div className={styles.carouselProgress}>
        <span aria-live="polite" aria-atomic="true">0{active + 1} <span aria-hidden="true">/</span> 03</span>
        <div className={styles.carouselDots}>{screens.map((screen, index) => <button key={screen.file} type="button" aria-label={`Show ${screen.title}`} aria-controls="app-walkthrough" aria-current={index === active ? "true" : undefined} onClick={() => goTo(index)}><span /></button>)}</div>
      </div>
      <button type="button" aria-label="Next app screen" aria-controls="app-walkthrough" disabled={active === screens.length - 1} onClick={() => goTo(active + 1)}>→</button>
    </div>
  </div>;
}
