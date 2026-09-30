import Image from "next/image";
import { Database, PlugsConnected, GitBranch, TreeStructure } from "@phosphor-icons/react/dist/ssr";
import { capabilityGroups } from "@/content/portfolio";
import styles from "./CapabilityGroups.module.css";

const logos: Record<string, string> = {
  JavaScript: "javascript", "Next.js": "nextdotjs", Java: "java", Express: "express",
  "Ray Serve": "ray", MongoDB: "mongodb", "Cloud Foundry": "cloudfoundry", NGINX: "nginx",
  React: "react", TypeScript: "typescript", "Redux Toolkit": "redux",
  "Spring Boot": "springboot", Python: "python", FastAPI: "fastapi",
  PostgreSQL: "postgresql", Kafka: "apachekafka", BigQuery: "googlebigquery",
  Docker: "docker", "GitHub Actions": "githubactions", Kubernetes: "kubernetes",
};

const symbols = { SQL: Database, "REST APIs": PlugsConnected, "CI/CD": GitBranch, XGBoost: TreeStructure };

function TechnologyIcon({ name }: { name: string }) {
  if (logos[name]) return <Image className={styles.logo} src={`/images/technology/${logos[name]}.svg`} alt="" width={18} height={18} />;
  const Icon = symbols[name as keyof typeof symbols];
  return Icon ? <Icon className={styles.symbol} size={18} aria-hidden="true" /> : null;
}

export function CapabilityGroups() {
  return (
    <section className={`range section shell ${styles.range}`} id="range" aria-labelledby="range-title">
      <header className={styles.header}>
        <p className="eyebrow">03 / Technical range</p>
        <div className={styles.intro}>
          <h2 id="range-title">Across the stack.<br /><em>Into production.</em></h2>
          <p>Full-stack engineering with depth in backend systems and applied ML. These are the tools I use—and the work I use them for.</p>
        </div>
      </header>
      <div className={styles.grid} data-stagger>
        {capabilityGroups.map((group) => (
          <article className={styles.card} key={group.number}>
            <div className={styles.cardHeading}>
              <h3>{group.title}</h3>
            </div>
            <p className={styles.description}>{group.thesis}</p>
            <ul className={styles.tools} aria-label={`${group.title} technologies`}>
              {group.technologies.map((technology) => (
                <li key={technology}>
                  <TechnologyIcon name={technology} />
                  {technology}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className={styles.practice} data-reveal>
        <p className="eyebrow">How I work</p>
        <p>Clear system boundaries. Reviewable decisions. Verification before release.</p>
      </div>
    </section>
  );
}
