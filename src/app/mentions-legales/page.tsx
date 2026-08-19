import Link from "next/link";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Mentions légales — Bonaventure",
};

export default function MentionsLegales() {
  return (
    <main className={styles.page}>
      <Link href="/" className={styles.back}>
        ← Retour au site
      </Link>
      <h1 className={styles.title}>Mentions légales</h1>

      <section className={styles.section}>
        <h2>Éditeur du site</h2>
        <p>
          Hermide Bonaventure — Entreprise individuelle
          <br />
          Adresse à compléter, Lyon
          <br />
          SIRET à compléter
          <br />
          Contact : bonjour@bonaventure-couture.fr
        </p>
      </section>

      <section className={styles.section}>
        <h2>Directrice de la publication</h2>
        <p>Hermide Bonaventure</p>
      </section>

      <section className={styles.section}>
        <h2>Hébergement</h2>
        <p>Hébergeur à compléter</p>
      </section>

      <section className={styles.section}>
        <h2>Données personnelles</h2>
        <p>
          Les informations transmises via le formulaire de contact (nom, coordonnées, message)
          sont utilisées uniquement pour répondre à votre demande de rendez-vous et ne sont
          transmises à aucun tiers. Conformément au RGPD, vous disposez d&rsquo;un droit
          d&rsquo;accès, de rectification et de suppression de ces données en écrivant à
          l&rsquo;adresse ci-dessus.
        </p>
      </section>
    </main>
  );
}
