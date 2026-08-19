"use client";

import { useState } from "react";
import { useDebouncedSave } from "@/hooks/useDebouncedSave";
import { useSaving } from "./SavingContext";
import { adminFetch, jsonInit } from "@/lib/admin-fetch";
import styles from "./Admin.module.css";

type FaqRecord = { id: string; question: string; answer: string };

function FaqRow({ faq, onDelete }: { faq: FaqRecord; onDelete: (id: string) => void }) {
  const [fields, setFields] = useState({ question: faq.question, answer: faq.answer });

  useDebouncedSave(fields, async (value) => {
    await adminFetch(`/api/admin/faqs/${faq.id}`, jsonInit("PATCH", value));
  });

  return (
    <div className={styles.card}>
      <div className={styles.cardFields}>
        <input
          className={styles.underlineInput}
          value={fields.question}
          onChange={(event) => setFields((prev) => ({ ...prev, question: event.target.value }))}
          placeholder="Question"
        />
        <textarea
          className={styles.textarea}
          rows={3}
          value={fields.answer}
          onChange={(event) => setFields((prev) => ({ ...prev, answer: event.target.value }))}
          placeholder="Réponse"
        />
      </div>
      <div className={styles.cardSide}>
        <button type="button" className={styles.deleteButton} onClick={() => onDelete(faq.id)}>
          Supprimer
        </button>
      </div>
    </div>
  );
}

export function FaqTab({ initial }: { initial: FaqRecord[] }) {
  const [faqs, setFaqs] = useState(initial);
  const { markSaving, markSaved, markError } = useSaving();

  async function addFaq() {
    markSaving();
    try {
      const response = await adminFetch(
        "/api/admin/faqs",
        jsonInit("POST", { question: "Nouvelle question", answer: "" })
      );
      const created = await response.json();
      setFaqs((prev) => [...prev, created]);
      markSaved();
    } catch {
      markError();
    }
  }

  async function deleteFaq(id: string) {
    if (!confirm("Supprimer cette question ?")) return;
    markSaving();
    try {
      await adminFetch(`/api/admin/faqs/${id}`, { method: "DELETE" });
      setFaqs((prev) => prev.filter((item) => item.id !== id));
      markSaved();
    } catch {
      markError();
    }
  }

  return (
    <div>
      <h1 className={styles.pageTitle}>Questions</h1>
      <p className={styles.pageHint}>{faqs.length} question(s)</p>

      <button type="button" className={styles.addButton} onClick={addFaq}>
        + Ajouter une question
      </button>

      {faqs.length === 0 ? (
        <div className={styles.emptyState}>Aucune question. Ajoutez-en une pour la faire apparaître dans la FAQ.</div>
      ) : (
        <div className={styles.cardsGrid}>
          {faqs.map((faq) => (
            <FaqRow key={faq.id} faq={faq} onDelete={deleteFaq} />
          ))}
        </div>
      )}
    </div>
  );
}
