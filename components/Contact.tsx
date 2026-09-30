import { profile } from "@/content/portfolio";

export function Contact() {
  return (
    <footer className="contact" id="contact">
      <div className="shell contact__inner">
        <p className="eyebrow">05 / What’s next</p>
        <div className="contact__layout" data-reveal>
          <div>
            <h2>Let’s build work that matters—and holds up.</h2>
            <p className="contact__intro">
              I’m interested in high-impact engineering work with strong product and technology organizations, especially where software quality, systems thinking, and AI-enabled delivery meet.
            </p>
          </div>
          <div className="contact__actions">
            <a className="button button--light" href={`mailto:${profile.email}`}>Email me <span aria-hidden="true">↗</span></a>
            <a className="contact__link" href={profile.linkedin} target="_blank" rel="noreferrer">
              <span>LinkedIn</span><span aria-hidden="true">↗</span>
            </a>
            <div className="contact__link contact__link--pending" aria-label="GitHub link pending">
              <span>GitHub</span><span>Link pending</span>
            </div>
          </div>
        </div>
        <div className="contact__footer">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p>{profile.location} · Built with Next.js</p>
        </div>
      </div>
    </footer>
  );
}
