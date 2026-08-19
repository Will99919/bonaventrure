import type { LookItem } from "./types";
import styles from "./RunwayFigure.module.css";

const CATEGORY_LABELS: Record<string, string> = {
  Mariee: "Mariée",
  Soiree: "Soirée",
  Vestiaire: "Vestiaire",
  Accessoire: "Accessoire",
};

export function RunwayFigure({
  look,
  ratio,
  placeholderAlt,
  style,
  className,
}: {
  look: LookItem;
  ratio: string;
  placeholderAlt?: boolean;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <figure className={[styles.figure, className].filter(Boolean).join(" ")} style={style}>
      <div
        className={styles.imageZone}
        style={{
          aspectRatio: ratio,
          background: placeholderAlt ? "var(--placeholder-b)" : "var(--placeholder-a)",
        }}
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
    </figure>
  );
}
