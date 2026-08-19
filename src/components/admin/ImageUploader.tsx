"use client";

import { useRef, useState } from "react";
import type { DragEvent } from "react";
import styles from "./Admin.module.css";
import uploaderStyles from "./ImageUploader.module.css";

export function ImageUploader({
  image,
  folder,
  onChange,
  className,
}: {
  image: string | null;
  folder: "looks" | "posts" | "maison";
  onChange: (url: string) => void;
  className?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    setUploading(true);
    setError("");
    try {
      const dataUrl = await fileToDataUrl(file);
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dataUrl, folder }),
      });
      if (!response.ok) throw new Error("Échec de l'envoi");
      const body = await response.json();
      onChange(body.url);
    } catch {
      setError("Échec de l'envoi de l'image.");
    } finally {
      setUploading(false);
    }
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) upload(file);
  }

  return (
    <div
      className={[styles.cardMedia, className].filter(Boolean).join(" ")}
      onDrop={onDrop}
      onDragOver={(event) => event.preventDefault()}
      style={{
        backgroundImage: image ? `url(${image})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={uploaderStyles.overlay} data-has-image={Boolean(image) || undefined}>
        <span>{uploading ? "Envoi…" : "Glisser une photo"}</span>
        <button type="button" onClick={() => inputRef.current?.click()} className={uploaderStyles.browse}>
          ou parcourir
        </button>
        {error && <span className={uploaderStyles.error}>{error}</span>}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className={uploaderStyles.hiddenInput}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) upload(file);
        }}
      />
    </div>
  );
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
