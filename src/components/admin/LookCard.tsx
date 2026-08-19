"use client";

import { useState } from "react";
import { useDebouncedSave } from "@/hooks/useDebouncedSave";
import { ImageUploader } from "./ImageUploader";
import { useSaving } from "./SavingContext";
import { adminFetch, jsonInit } from "@/lib/admin-fetch";
import styles from "./Admin.module.css";

export type LookRecord = {
  id: string;
  name: string;
  category: string;
  year: string;
  note: string;
  image: string | null;
};

const CATEGORIES = ["Mariee", "Soiree", "Vestiaire", "Accessoire"];
const CATEGORY_LABELS: Record<string, string> = {
  Mariee: "Mariée",
  Soiree: "Soirée",
  Vestiaire: "Vestiaire",
  Accessoire: "Accessoire",
};

export function LookCard({
  look,
  order,
  total,
  onMove,
  onDelete,
}: {
  look: LookRecord;
  order: number;
  total: number;
  onMove: (id: string, direction: "up" | "down") => void;
  onDelete: (id: string) => void;
}) {
  const [fields, setFields] = useState({ name: look.name, year: look.year, note: look.note });
  const [category, setCategory] = useState(look.category);
  const [image, setImage] = useState(look.image);
  const { markSaving, markSaved, markError } = useSaving();

  useDebouncedSave(fields, async (value) => {
    await adminFetch(`/api/admin/looks/${look.id}`, jsonInit("PATCH", value));
  });

  async function updateImmediate(data: Record<string, string>) {
    markSaving();
    try {
      await adminFetch(`/api/admin/looks/${look.id}`, jsonInit("PATCH", data));
      markSaved();
      return true;
    } catch {
      markError();
      return false;
    }
  }

  return (
    <div className={styles.card}>
      <ImageUploader
        image={image}
        folder="looks"
        onChange={async (url) => {
          const previous = image;
          setImage(url);
          const ok = await updateImmediate({ image: url });
          if (!ok) setImage(previous);
        }}
      />

      <div className={styles.cardFields}>
        <input
          className={styles.underlineInput}
          value={fields.name}
          onChange={(event) => setFields((prev) => ({ ...prev, name: event.target.value }))}
          placeholder="Nom de la pièce"
        />
        <select
          className={styles.select}
          value={category}
          onChange={async (event) => {
            const previous = category;
            const next = event.target.value;
            setCategory(next);
            const ok = await updateImmediate({ category: next });
            if (!ok) setCategory(previous);
          }}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {CATEGORY_LABELS[cat]}
            </option>
          ))}
        </select>
        <input
          className={styles.input}
          value={fields.year}
          onChange={(event) => setFields((prev) => ({ ...prev, year: event.target.value }))}
          placeholder="Année"
        />
        <textarea
          className={styles.textarea}
          rows={2}
          value={fields.note}
          onChange={(event) => setFields((prev) => ({ ...prev, note: event.target.value }))}
          placeholder="Description"
        />
      </div>

      <div className={styles.cardSide}>
        <span className={styles.orderNumber}>{String(order + 1).padStart(2, "0")}</span>
        <div className={styles.orderButtons}>
          <button
            type="button"
            className={styles.orderButton}
            disabled={order === 0}
            onClick={() => onMove(look.id, "up")}
          >
            ↑
          </button>
          <button
            type="button"
            className={styles.orderButton}
            disabled={order === total - 1}
            onClick={() => onMove(look.id, "down")}
          >
            ↓
          </button>
        </div>
        <button type="button" className={styles.deleteButton} onClick={() => onDelete(look.id)}>
          Supprimer
        </button>
      </div>
    </div>
  );
}
