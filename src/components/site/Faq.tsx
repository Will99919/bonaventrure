"use client";

import { useState } from "react";
import type { FaqItem } from "./types";
import styles from "./Faq.module.css";

export function Faq({ faqs }: { faqs: FaqItem[] }) {
  const [open, setOpen] = useState(0);

  return (
    <section id="questions" className={styles.section}>
      <span className={styles.label}>Questions — 04</span>

      <div className={styles.accordion}>
        {faqs.map((faq, index) => {
          const isOpen = open === index;
          return (
            <div key={faq.id} className={styles.item}>
              <button
                type="button"
                className={styles.header}
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : index)}
              >
                <span className={styles.question}>{faq.question}</span>
                <span className={styles.sign} aria-hidden="true">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen && <p className={styles.answer}>{faq.answer}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
