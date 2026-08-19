import { Reveal } from "./Reveal";
import styles from "./Maison.module.css";

export function Maison({
  bio,
  citation,
  portraitImage,
}: {
  bio: string;
  citation: string;
  portraitImage: string | null;
}) {
  return (
    <section id="maison" className={styles.section}>
      <div className={styles.portrait}>
        {portraitImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={portraitImage} alt="Hermide Bonaventure à l’atelier" className={styles.portraitImage} />
        ) : (
          <span className={styles.placeholderCaption}>Portrait d&rsquo;Hermide à l&rsquo;atelier</span>
        )}
      </div>

      <Reveal as="div" className={styles.content}>
        <span className={styles.overline}>La maison — 03</span>
        <h2 className={styles.title}>
          Hermide
          <br />
          Bonaventure
        </h2>
        <p className={styles.bio}>{bio}</p>
        <p className={styles.citation}>{citation}</p>
      </Reveal>
    </section>
  );
}
