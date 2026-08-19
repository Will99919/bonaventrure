import { Reveal } from "./Reveal";
import { RunwayCta } from "./RunwayCta";
import type { LookItem } from "./types";
import styles from "./RunwayCompact.module.css";

const CATEGORY_LABELS: Record<string, string> = {
  Mariee: "Mariée",
  Soiree: "Soirée",
  Vestiaire: "Vestiaire",
  Accessoire: "Accessoire",
};

export function RunwayCompact({ looks }: { looks: LookItem[] }) {
  return (
    <section id="defile" className={styles.section}>
      <div className={styles.header}>
        <span>Le défilé — collections sur mesure</span>
        <span>{looks.length} silhouettes</span>
      </div>

      <div className={styles.column}>
        {looks.map((look, index) => (
          <Reveal key={look.id} as="figure" className={styles.figure}>
            <div
              className={styles.imageZone}
              style={{ background: index % 2 === 1 ? "var(--placeholder-b)" : "var(--placeholder-a)" }}
            >
              {look.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={look.image} alt={look.note || look.name} className={styles.image} />
              ) : (
                <span className={styles.placeholderCaption}>{look.note || look.name}</span>
              )}
            </div>
            <figcaption className={styles.caption}>
              <span className={styles.name}>{look.name}</span>
              <span className={styles.meta}>
                {(CATEGORY_LABELS[look.category] ?? look.category)} · {look.year}
              </span>
            </figcaption>
          </Reveal>
        ))}

        <RunwayCta compact />
      </div>
    </section>
  );
}
