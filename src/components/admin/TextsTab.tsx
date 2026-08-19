"use client";

import { useState } from "react";
import { useDebouncedSave } from "@/hooks/useDebouncedSave";
import { adminFetch, jsonInit } from "@/lib/admin-fetch";
import styles from "./Admin.module.css";

type Texts = {
  heroTitle: string;
  heroIntro: string;
  manifeste: string;
  bio: string;
  citation: string;
  contact: string;
};

const FIELDS: Array<{ key: keyof Texts; label: string; hint: string; rows: number }> = [
  { key: "heroTitle", label: "Titre d'accueil", hint: "Grand titre animé du hero", rows: 1 },
  { key: "heroIntro", label: "Chapeau d'accueil", hint: "Deux lignes sous le titre", rows: 3 },
  { key: "manifeste", label: "Manifeste", hint: "Bloc éditorial en Bodoni", rows: 4 },
  { key: "bio", label: "Biographie", hint: "Section « La maison »", rows: 5 },
  { key: "citation", label: "Citation", hint: "Phrase en italique", rows: 2 },
  {
    key: "contact",
    label: "Coordonnées",
    hint: "Une information par ligne : Atelier / Horaires / Écrire / Appeler",
    rows: 4,
  },
];

export function TextsTab({ initial }: { initial: Texts }) {
  const [texts, setTexts] = useState(initial);

  useDebouncedSave(texts, async (value) => {
    await adminFetch("/api/admin/texts", jsonInit("PATCH", value));
  });

  return (
    <div>
      <h1 className={styles.pageTitle}>Textes de la page</h1>
      <p className={styles.pageHint}>Enregistrement automatique</p>

      {FIELDS.map((field) => (
        <div key={field.key} className={styles.field}>
          <label className={styles.fieldLabel} htmlFor={field.key}>
            {field.label}
            <span className={styles.fieldHint}>{field.hint}</span>
          </label>
          <textarea
            id={field.key}
            className={styles.textarea}
            rows={field.rows}
            value={texts[field.key]}
            onChange={(event) => setTexts((prev) => ({ ...prev, [field.key]: event.target.value }))}
          />
        </div>
      ))}
    </div>
  );
}
