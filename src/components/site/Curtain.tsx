"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./Curtain.module.css";

export function Curtain() {
  const reducedMotion = useReducedMotion();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      // Synced from a browser-only media query; SSR always renders the animated default.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHidden(true);
      return;
    }
    const timer = setTimeout(() => setHidden(true), 2100);
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  if (hidden) return null;

  return (
    <div className={styles.overlay} aria-hidden="true">
      <div className={styles.half} data-side="top" />
      <div className={styles.half} data-side="bottom" />
      <div className={styles.word}>Bonaventure</div>
    </div>
  );
}
