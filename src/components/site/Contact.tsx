import Link from "next/link";
import { ContactTitle } from "./ContactTitle";
import { AppointmentForm } from "./AppointmentForm";
import styles from "./Contact.module.css";

const LABELS = ["Atelier", "Horaires", "Écrire", "Appeler"];

export function Contact({ contact }: { contact: string }) {
  const lines = contact
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const year = new Date().getFullYear();

  return (
    <section id="rdv" className={styles.section}>
      <ContactTitle />

      <div className={styles.grid}>
        {LABELS.map((label, index) => (
          <div key={label} className={styles.entry}>
            <span className={styles.entryLabel}>{label}</span>
            <span className={styles.entryValue}>{lines[index] ?? "à compléter"}</span>
          </div>
        ))}
      </div>

      <AppointmentForm />

      <footer className={styles.footer}>
        <span className={styles.brand}>Bonaventure</span>
        <span className={styles.copyright}>
          © {year} Bonaventure —{" "}
          <Link href="/mentions-legales" className={styles.legalLink}>
            Mentions légales
          </Link>{" "}
          — <Link href="/admin">Administration</Link>
        </span>
      </footer>
    </section>
  );
}
