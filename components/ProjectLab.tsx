import { projectPlaceholders } from "@/content/portfolio";
import { SectionHeading } from "./SectionHeading";

export function ProjectLab() {
  return (
    <section className="lab section shell" id="lab" aria-labelledby="lab-title">
      <SectionHeading
        id="lab-title"
        eyebrow="04 / Builder mindset"
        title="A public lab, ready for real work."
        description="This section is intentionally honest: the workspace does not yet contain verified public repositories or demos. These slots show exactly what belongs here next."
      />
      <div className="project-grid" data-stagger>
        {projectPlaceholders.map((project) => (
          <article className="project-card" key={project.number}>
            <div className="project-card__topline">
              <span>{project.number}</span>
              <span>{project.label}</span>
            </div>
            <div>
              <p className="project-card__status"><span aria-hidden="true" /> Awaiting verified public link</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
            <span className="project-card__cta">Reserved project slot <span aria-hidden="true">↗</span></span>
          </article>
        ))}
      </div>
    </section>
  );
}
