import { TempoForgeFeature } from "./TempoForgeFeature";
import styles from "./PersonalProjects.module.css";

export function PersonalProjects() {
  return <section className={`section shell ${styles.projects}`} id="projects" aria-labelledby="projects-title">
    <header className={styles.header}>
      <p className="eyebrow">05 / Personal projects</p>
      <div className={styles.intro}>
        <h2 id="projects-title">Curiosity,<br /><em>put into practice.</em></h2>
        <p>Enterprise engineering is my foundation. Outside work, I build personal apps to explore new platforms, experiment with AI, and keep learning by shipping.</p>
      </div>
    </header>
    <div className={styles.cards} aria-label="Personal projects">
      <TempoForgeFeature />
    </div>
  </section>;
}
