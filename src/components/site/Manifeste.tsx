import { Reveal } from "./Reveal";
import styles from "./Manifeste.module.css";

export function Manifeste({ text }: { text: string }) {
  return (
    <section className={styles.section}>
      <span className={styles.label}>Manifeste — 01</span>
      <Reveal as="p" className={styles.text}>
        {text}
      </Reveal>
    </section>
  );
}
