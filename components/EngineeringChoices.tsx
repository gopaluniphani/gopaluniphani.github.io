"use client";

import { useState } from "react";
import { AnimatedDisclosure } from "./AnimatedDisclosure";
import styles from "./TempoForge.module.css";

type Decision = { number: string; title: string; problem: string; decision: string; learning: string };

export function EngineeringChoices({ decisions }: { decisions: Decision[] }) {
  const [expanded, setExpanded] = useState<string | null>(decisions[0]?.number ?? null);
  return <div className={styles.decisions}>
    {decisions.map((item) => <AnimatedDisclosure key={item.number} className={styles.decision}
      summaryClassName={styles.decisionSummary} contentClassName={styles.decisionBody}
      active={expanded === item.number} onExpandedChange={(next) => setExpanded(next ? item.number : null)}
      collapsibleQuery="(max-width: 900px)" contentId={`decision-${item.number}`} labelledBy={`decision-title-${item.number}`}
      summary={<><span className={styles.decisionNumber}>{item.number}</span><h3 id={`decision-title-${item.number}`}>{item.title}</h3><span className={styles.expandIcon} aria-hidden="true">+</span></>}>
      <p>{item.problem}</p><p>{item.decision}</p><p className={styles.takeaway}>{item.learning}</p>
    </AnimatedDisclosure>)}
  </div>;
}
