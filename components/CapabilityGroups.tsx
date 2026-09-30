import { capabilityGroups, principles } from "@/content/portfolio";
import { SectionHeading } from "./SectionHeading";

export function CapabilityGroups() {
  return (
    <section className="range section shell" id="range" aria-labelledby="range-title">
      <SectionHeading
        id="range-title"
        eyebrow="03 / Technical range"
        title="The stack is a set of decisions, not a collection of logos."
        description="I choose tools in context: around the shape of the problem, the operating constraints, and the people who will maintain the result."
      />

      <div className="capability-grid" data-stagger>
        {capabilityGroups.map((group) => (
          <article className="capability-card" key={group.number}>
            <p className="capability-card__number">{group.number}</p>
            <h3>{group.title}</h3>
            <p>{group.thesis}</p>
            <ul>
              {group.technologies.map((technology) => <li key={technology}>{technology}</li>)}
            </ul>
          </article>
        ))}
      </div>

      <div className="principles" data-reveal>
        <p className="eyebrow">Working principles</p>
        <div className="principles__list">
          {principles.map(([number, title, description]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
