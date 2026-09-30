import { timeline } from "@/content/portfolio";
import Image from "next/image";
import styles from "./Hero.module.css";

export function StoryTimeline() {
  return (
    <section className="story" id="story" aria-labelledby="story-title">
      <header className={`${styles.surface} ${styles.nextChapter}`}>
        <span className={styles.chapterIndex}><span>Story</span><strong>01</strong></span>
        <div className={styles.chapterCopy}>
          <span className={styles.mobileNext}>01 / Story</span>
          <h2 id="story-title">My Story</h2>
          <span>How each chapter shaped the engineer I am today.</span>
        </div>
        <Image className={styles.mountain} src="/images/story-mountain-v2.webp" alt="" width={1200} height={500} sizes="(max-width: 900px) 70vw, (max-width: 1600px) 52vw, 832px" />
        <span className={styles.chapterNote} aria-hidden="true">Curiosity<br />builds<br />better<br />systems</span>
      </header>
      <div className="shell story__content">
        <p className="story__introduction">I started with security and machine learning, then moved into backend services, full-stack products, and enterprise platforms. Along the way, my focus expanded from individual features to the systems and workflows around them.</p>

      <div className="timeline" data-timeline>
        <div className="timeline__line" aria-hidden="true"><span data-timeline-progress /></div>
        {timeline.map((entry) => (
          <article className="timeline__item" key={entry.period} data-reveal>
            <div className="timeline__marker" aria-hidden="true" />
            <p className="timeline__period">{entry.period}</p>
            <div className="timeline__main">
              <p className="timeline__chapter">{entry.chapter}</p>
              <h3>{entry.role}</h3>
              <p className="timeline__organization">{entry.organization}</p>
              <p className="timeline__summary">{entry.summary}</p>
              <ul className="tag-list" aria-label={`${entry.chapter} capabilities`}>
                {entry.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </div>
      </div>
    </section>
  );
}
