"use client";

import { useReveal } from "@/hooks/useReveal";
import { LetterReveal } from "./LetterReveal";
import styles from "./Contact.module.css";

export function ContactTitle() {
  const { ref, visible } = useReveal<HTMLHeadingElement>();

  return (
    <div ref={ref}>
      <LetterReveal as="h2" text="Écrivez-nous" active={visible} className={styles.title} />
    </div>
  );
}
