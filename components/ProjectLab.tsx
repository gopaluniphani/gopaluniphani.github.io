import { MagnifyingGlass, Flask, GitPullRequest } from "@phosphor-icons/react/dist/ssr";
import styles from "./ProjectLab.module.css";

const chapters = [
  {
    label: "Understand",
    title: "Find the real problem.",
    story: "A slow diagnostics screen led me to rethink what users needed first—not just how much data I could load.",
    lesson: "Start with the workflow.",
    Icon: MagnifyingGlass,
  },
  {
    label: "Experiment",
    title: "Test before committing.",
    story: "In recommendation work, I compared models and refined the inputs before turning the rankings into a repeatable product output.",
    lesson: "Let evidence shape the approach.",
    Icon: Flask,
  },
  {
    label: "Improve",
    title: "Make good work repeatable.",
    story: "I bring that same mindset to reusable AI-assisted workflows and mentoring: clear steps, reviewable decisions, and human judgment.",
    lesson: "Help the next person build with confidence.",
    Icon: GitPullRequest,
  },
];

export function ProjectLab() {
  return (
    <section className={`lab section shell ${styles.lab}`} id="lab" aria-labelledby="lab-title">
      <header className={styles.header}>
        <p className="eyebrow">04 / Builder mindset</p>
        <div className={styles.intro}>
          <h2 id="lab-title">Stay curious.<br /><em>Build with intent.</em></h2>
          <p>My work has moved from interfaces to ML and platforms. The habit stays the same: understand, experiment, improve.</p>
        </div>
      </header>
      <ol className={styles.chapters} data-stagger aria-label="How I approach building">
        {chapters.map(({ label, title, story, lesson, Icon }) => (
          <li className={styles.chapter} key={label}>
            <div className={styles.chapterTop}>
              <span className={styles.icon}><Icon size={25} weight="regular" aria-hidden="true" /></span>
              <p className={styles.label}>{label}</p>
            </div>
            <h3>{title}</h3>
            <p className={styles.story}>{story}</p>
            <p className={styles.lesson}>{lesson}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
