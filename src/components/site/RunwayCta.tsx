import styles from "./RunwayCta.module.css";

export function RunwayCta({ compact }: { compact?: boolean }) {
  return (
    <div className={[styles.cta, compact ? styles.compact : ""].join(" ")}>
      <p className={styles.text}>
        Et la vôtre,
        <br />
        <em>encore à dessiner.</em>
      </p>
      <a href="#rdv" className={styles.button}>
        Demander un rendez-vous
      </a>
    </div>
  );
}
