"use client";

import { useBreakpoint, isCompact } from "@/hooks/useBreakpoint";
import styles from "./Header.module.css";

export function Header() {
  const bp = useBreakpoint();
  const compact = isCompact(bp);

  return (
    <header className={styles.header} data-compact={compact || undefined}>
      <a href="#top" className={styles.mark}>
        Bonaventure
      </a>
      <a href="#rdv" className={styles.rdvLink}>
        Rendez-vous
      </a>
    </header>
  );
}
