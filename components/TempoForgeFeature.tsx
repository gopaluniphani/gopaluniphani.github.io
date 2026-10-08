import Link from "next/link";
import Image from "next/image";
import { TempoForgeDevices } from "./TempoForgeDevices";
import styles from "./TempoForge.module.css";

export function TempoForgeFeature() {
  return (
      <article className={styles.feature} data-reveal aria-labelledby="tempo-forge-title">
        <div className={styles.featureCopy}>
          <p className={styles.kicker}>Personal project · iPhone + Apple Watch</p>
          <div className={styles.identity}><Image src="/images/tempo-forge/icon.webp" width={56} height={56} alt="" /><h3 id="tempo-forge-title">Tempo Forge</h3></div>
          <p className={styles.featureLead}>A workout timer.<br />A new platform to learn.</p>
          <Link className={styles.primaryLink} href="/projects/tempo-forge/">Explore the build <span aria-hidden="true">↗</span></Link>
          <p>Built with Codex and Xcode, Tempo Forge turns repeatable routines into guided workouts. Behind the timer: native interfaces, coordinated devices, and the discipline of taking a personal idea through release.</p>
          <div className={styles.tags}><span>SwiftUI</span><span>watchOS</span><span>AI-assisted development</span></div>
          <p className={styles.small}>Version 2.0 released · October 2026</p>
        </div>
        <div className={styles.featureVisual}><TempoForgeDevices showOrbit={false} /><p className={styles.visualCaption}>One workout, across two screens.</p></div>
      </article>
  );
}
