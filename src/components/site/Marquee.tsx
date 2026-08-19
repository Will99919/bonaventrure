import styles from "./Marquee.module.css";

const TEXT = "Mariée · Soirée · Vestiaire · Accessoires · ";

export function Marquee() {
  return (
    <div className={styles.wrap}>
      <div className={styles.track}>
        <span className={styles.repeat}>{TEXT.repeat(4)}</span>
        <span className={styles.repeat} aria-hidden="true">
          {TEXT.repeat(4)}
        </span>
      </div>
    </div>
  );
}
