import Image from "next/image";
import styles from "./TempoForge.module.css";
export function TempoForgeDevices({ priority = false, showOrbit = true }: { priority?: boolean; showOrbit?: boolean }) {
  return <div className={styles.devices}>
    {showOrbit && <div className={styles.orbit} aria-hidden="true" />}
    <div className={styles.phone}><Image src="/images/tempo-forge/phone-work.webp" alt="Tempo Forge on iPhone showing a Goblet Squat interval with work, recovery, and workout controls" width={720} height={1565} priority={priority} /></div>
    <div className={styles.watch}><Image src="/images/tempo-forge/watch-02-active-workout.webp" alt="Tempo Forge Apple Watch companion showing the active workout and pause, skip, and finish controls" width={416} height={496} priority={priority} /></div>
  </div>;
}
