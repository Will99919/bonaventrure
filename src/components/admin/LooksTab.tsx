"use client";

import { useState } from "react";
import { LookCard, type LookRecord } from "./LookCard";
import { useSaving } from "./SavingContext";
import { adminFetch, jsonInit } from "@/lib/admin-fetch";
import styles from "./Admin.module.css";

function swap(list: LookRecord[], id: string, direction: "up" | "down") {
  const index = list.findIndex((item) => item.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || swapIndex < 0 || swapIndex >= list.length) return list;
  const next = [...list];
  [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  return next;
}

export function LooksTab({ initial }: { initial: LookRecord[] }) {
  const [looks, setLooks] = useState(initial);
  const { markSaving, markSaved, markError } = useSaving();

  async function addLook() {
    markSaving();
    try {
      const response = await adminFetch(
        "/api/admin/looks",
        jsonInit("POST", { name: "Nouvelle silhouette", category: "Vestiaire", year: "", note: "" })
      );
      const created = await response.json();
      setLooks((prev) => [...prev, created]);
      markSaved();
    } catch {
      markError();
    }
  }

  async function moveLook(id: string, direction: "up" | "down") {
    setLooks((prev) => swap(prev, id, direction));
    markSaving();
    try {
      await adminFetch(`/api/admin/looks/${id}`, jsonInit("PATCH", { move: direction }));
      markSaved();
    } catch {
      // La direction opposée annule l'échange optimiste précédent.
      setLooks((prev) => swap(prev, id, direction === "up" ? "down" : "up"));
      markError();
    }
  }

  async function deleteLook(id: string) {
    if (!confirm("Supprimer cette silhouette ?")) return;
    markSaving();
    try {
      await adminFetch(`/api/admin/looks/${id}`, { method: "DELETE" });
      setLooks((prev) => prev.filter((item) => item.id !== id));
      markSaved();
    } catch {
      markError();
    }
  }

  return (
    <div>
      <h1 className={styles.pageTitle}>Défilé</h1>
      <p className={styles.pageHint}>{looks.length} silhouette(s)</p>

      <button type="button" className={styles.addButton} onClick={addLook}>
        + Ajouter une silhouette
      </button>

      {looks.length === 0 ? (
        <div className={styles.emptyState}>
          Aucune silhouette. Ajoutez-en une pour la faire apparaître dans le défilé.
        </div>
      ) : (
        <div className={styles.cardsGrid}>
          {looks.map((look, index) => (
            <LookCard
              key={look.id}
              look={look}
              order={index}
              total={looks.length}
              onMove={moveLook}
              onDelete={deleteLook}
            />
          ))}
        </div>
      )}
    </div>
  );
}
