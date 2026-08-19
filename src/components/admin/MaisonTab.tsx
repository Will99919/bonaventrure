"use client";

import { useState } from "react";
import { ImageUploader } from "./ImageUploader";
import { useSaving } from "./SavingContext";
import { adminFetch, jsonInit } from "@/lib/admin-fetch";
import styles from "./Admin.module.css";

export function MaisonTab({ initial }: { initial: { portraitImage: string | null } }) {
  const [portraitImage, setPortraitImage] = useState(initial.portraitImage);
  const { markSaving, markSaved, markError } = useSaving();

  async function updateImage(url: string) {
    const previous = portraitImage;
    setPortraitImage(url);
    markSaving();
    try {
      await adminFetch("/api/admin/texts", jsonInit("PATCH", { portraitImage: url }));
      markSaved();
    } catch {
      setPortraitImage(previous);
      markError();
    }
  }

  return (
    <div>
      <h1 className={styles.pageTitle}>La maison</h1>
      <p className={styles.pageHint}>Portrait d&rsquo;Hermide à l&rsquo;atelier</p>

      <div className={styles.field}>
        <label className={styles.fieldLabel}>
          Portrait
          <span className={styles.fieldHint}>
            Photo affichée dans la section « La maison » du site (format portrait, ratio 4/5)
          </span>
        </label>
        <ImageUploader
          image={portraitImage}
          folder="maison"
          onChange={updateImage}
          className={styles.portraitMedia}
        />
      </div>
    </div>
  );
}
