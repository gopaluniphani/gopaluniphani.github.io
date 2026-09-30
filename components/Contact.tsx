import { ArrowUpRight, EnvelopeSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { profile } from "@/content/portfolio";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <footer className={`shell ${styles.contact}`} id="contact" aria-labelledby="contact-title">
      <p className="eyebrow">05 / What’s next</p>
      <div className={styles.layout} data-reveal>
        <div className={styles.copy}>
          <h2 id="contact-title">Let’s build<br /><em>what’s next.</em></h2>
          <p className={styles.intro}>I’m looking for a full-time software engineering role where I can build useful products and dependable systems.</p>
          <p className={styles.focus}>Full-stack · Backend · Platform engineering</p>
        </div>
        <div className={styles.actions}>
          <p className={styles.invitation}>Have a role or team in mind? Let’s talk.</p>
          <a className={styles.email} href={`mailto:${profile.email}`}>
            <EnvelopeSimple size={24} aria-hidden="true" />
            <span><strong>Email me</strong><span>{profile.email}</span></span>
            <ArrowUpRight className={styles.arrow} size={22} aria-hidden="true" />
          </a>
          <div className={styles.links}>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <LinkedinLogo size={20} aria-hidden="true" /><span>LinkedIn</span><ArrowUpRight className={styles.arrow} size={17} aria-hidden="true" />
            </a>
            <a href="https://github.com/gopaluniphani/gopaluniphani.github.io" target="_blank" rel="noreferrer">
              <GithubLogo size={20} aria-hidden="true" /><span>Portfolio source</span><ArrowUpRight className={styles.arrow} size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p>{profile.location}</p>
      </div>
    </footer>
  );
}
