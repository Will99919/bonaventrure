"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { LetterReveal } from "./LetterReveal";
import styles from "./Hero.module.css";

export function Hero({ title, intro }: { title: string; intro: string }) {
  const [active, setActive] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      // Synced from a browser-only media query; SSR always renders the animated default.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActive(true);
      return;
    }
    const timer = setTimeout(() => setActive(true), 650);
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  return (
    <section id="top" className={styles.hero}>
      <span className={styles.vertical} aria-hidden="true">
        Lyon — pièces uniques
      </span>
      <span className={styles.placeholderTag} aria-hidden="true">
        film / photo d&rsquo;ouverture plein écran
      </span>

      <LetterReveal as="h1" text={title} active={active} className={styles.title} />
      <p className={styles.intro}>{intro}</p>

      <div className={styles.scrollCue}>
        <span>Faire défiler</span>
        <span className={styles.line} />
      </div>
    </section>
  );
}
