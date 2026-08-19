"use client";

import { signOut } from "next-auth/react";
import { useSaving } from "./SavingContext";
import styles from "./Admin.module.css";

export type AdminTab = "textes" | "maison" | "defile" | "journal" | "questions" | "rdv";

const NAV: Array<{ id: AdminTab; label: string }> = [
  { id: "textes", label: "Textes" },
  { id: "maison", label: "La maison" },
  { id: "defile", label: "Défilé" },
  { id: "journal", label: "Journal" },
  { id: "questions", label: "Questions" },
  { id: "rdv", label: "Rendez-vous" },
];

const SAVE_LABEL: Record<string, string> = {
  idle: "Aucune modification",
  saving: "Enregistrement…",
  saved: "Modifications enregistrées",
  error: "Échec de l'enregistrement — réessayez",
};

export function Sidebar({
  active,
  onChange,
  counts,
}: {
  active: AdminTab;
  onChange: (tab: AdminTab) => void;
  counts: Record<AdminTab, number>;
}) {
  const { status } = useSaving();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brandBlock}>
        <span className={styles.brand}>Bonaventure</span>
        <span className={styles.brandSub}>Administration</span>
      </div>

      <nav className={styles.nav}>
        {NAV.map((item) => (
          <button
            key={item.id}
            type="button"
            className={styles.navItem}
            data-active={active === item.id || undefined}
            onClick={() => onChange(item.id)}
          >
            <span>{item.label}</span>
            <span className={styles.navCount}>{counts[item.id]}</span>
          </button>
        ))}
      </nav>

      <div className={styles.footerBlock}>
        <span className={styles.saveStatus} data-error={status === "error" || undefined}>
          {SAVE_LABEL[status]}
        </span>
        <a href="/" target="_blank" rel="noreferrer" className={styles.linkButton}>
          Voir le site
        </a>
        <div className={styles.signOutRow}>
          <button type="button" className={styles.signOut} onClick={() => signOut({ callbackUrl: "/admin/login" })}>
            Se déconnecter
          </button>
        </div>
      </div>
    </aside>
  );
}
