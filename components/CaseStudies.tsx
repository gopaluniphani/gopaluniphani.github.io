"use client";

import { useState } from "react";
import { caseStudies } from "@/content/portfolio";
import { SectionHeading } from "./SectionHeading";

export function CaseStudies() {
  const [active, setActive] = useState(0);
  const study = caseStudies[active];

  function moveTab(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = caseStudies.length - 1;
    let next = index;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = index === last ? 0 : index + 1;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === index && !["Home", "End"].includes(event.key)) return;

    event.preventDefault();
    setActive(next);
    const tabs = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>("[role='tab']");
    tabs?.[next]?.focus();
  }

  return (
    <section className="work section" id="work" aria-labelledby="work-title">
      <div className="shell">
        <SectionHeading
          id="work-title"
          eyebrow="02 / Selected work"
          title="Evidence, without the proprietary details."
          description="Five sanitized capability studies from reliability-sensitive environments. The names and internal architecture stay private; the engineering judgment remains visible."
          inverted
        />

        <div className="case-layout" data-reveal>
          <div className="case-index" role="tablist" aria-label="Select a capability study">
            {caseStudies.map((item, index) => (
              <button
                type="button"
                role="tab"
                id={`case-tab-${index}`}
                aria-controls={`case-panel-${index}`}
                aria-selected={active === index}
                tabIndex={active === index ? 0 : -1}
                className={active === index ? "case-index__button case-index__button--active" : "case-index__button"}
                onClick={() => setActive(index)}
                onKeyDown={(event) => moveTab(event, index)}
                key={item.number}
              >
                <span>{item.number}</span>
                <span>{item.theme}</span>
              </button>
            ))}
          </div>

          <article
            className="case-panel"
            id={`case-panel-${active}`}
            role="tabpanel"
            aria-labelledby={`case-tab-${active}`}
            key={study.number}
          >
            <p className="case-panel__number">Case study / {study.number}</p>
            <h3>{study.title}</h3>
            <div className="case-panel__grid">
              <div>
                <p className="case-panel__label">Context</p>
                <p>{study.context}</p>
              </div>
              <div>
                <p className="case-panel__label">Role</p>
                <p>{study.role}</p>
              </div>
              <div>
                <p className="case-panel__label">Approach</p>
                <p>{study.approach}</p>
              </div>
              <div className="case-panel__outcome">
                <p className="case-panel__label">Safe outcome</p>
                <p>{study.outcome}</p>
              </div>
            </div>
            <ul className="tag-list tag-list--dark" aria-label="Case study capabilities">
              {study.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
