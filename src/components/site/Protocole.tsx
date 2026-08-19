import { Reveal } from "./Reveal";
import styles from "./Protocole.module.css";

const STEPS = [
  {
    number: "01",
    title: "Consultation",
    text: "L'occasion, votre garde-robe, ce dans quoi vous vous sentez juste. Croquis à la main, devant vous.",
    meta: "Une heure — offerte",
  },
  {
    number: "02",
    title: "Mesures & matière",
    text: "24 mesures relevées, puis le choix du tissu parmi les coupons de l'atelier : soies, laines froides, lins.",
    meta: "45 minutes",
  },
  {
    number: "03",
    title: "Toile & essayages",
    text: "Une toile d'essai avant de couper le tissu définitif, puis deux essayages d'ajustement au millimètre.",
    meta: "Deux rendez-vous",
  },
  {
    number: "04",
    title: "Livraison",
    text: "La pièce, sa housse et son carnet d'entretien. Les retouches de la première année restent offertes.",
    meta: "3 à 6 semaines",
  },
];

export function Protocole() {
  return (
    <section id="mesure" className={styles.section}>
      <aside className={styles.aside}>
        <span className={styles.overline}>Le protocole — 02</span>
        <h2 className={styles.title}>
          Quatre
          <br />
          rendez-vous
        </h2>
        <p className={styles.description}>
          Chaque pièce naît d&rsquo;un même déroulé, en quatre temps, du premier croquis à la
          livraison.
        </p>
      </aside>

      <div className={styles.steps}>
        {STEPS.map((step) => (
          <Reveal key={step.number} as="div" className={styles.step}>
            <span className={styles.number}>{step.number}</span>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepText}>{step.text}</p>
            <span className={styles.meta}>{step.meta}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
