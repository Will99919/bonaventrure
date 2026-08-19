"use client";

import { useState } from "react";
import { useDebouncedSave } from "@/hooks/useDebouncedSave";
import { ImageUploader } from "./ImageUploader";
import { useSaving } from "./SavingContext";
import { adminFetch, jsonInit } from "@/lib/admin-fetch";
import styles from "./Admin.module.css";

type PostRecord = { id: string; caption: string; image: string | null };

function PostCard({ post, onDelete }: { post: PostRecord; onDelete: (id: string) => void }) {
  const [caption, setCaption] = useState(post.caption);
  const [image, setImage] = useState(post.image);
  const { markSaving, markSaved, markError } = useSaving();

  useDebouncedSave(caption, async (value) => {
    await adminFetch(`/api/admin/posts/${post.id}`, jsonInit("PATCH", { caption: value }));
  });

  async function updateImage(url: string) {
    const previous = image;
    setImage(url);
    markSaving();
    try {
      await adminFetch(`/api/admin/posts/${post.id}`, jsonInit("PATCH", { image: url }));
      markSaved();
    } catch {
      setImage(previous);
      markError();
    }
  }

  return (
    <div className={styles.journalCard}>
      <ImageUploader image={image} folder="posts" onChange={updateImage} className={styles.journalMedia} />
      <input
        className={styles.underlineInput}
        value={caption}
        onChange={(event) => setCaption(event.target.value)}
        placeholder="Légende"
      />
      <button type="button" className={styles.deleteButton} onClick={() => onDelete(post.id)}>
        Supprimer
      </button>
    </div>
  );
}

export function JournalTab({ initial }: { initial: PostRecord[] }) {
  const [posts, setPosts] = useState(initial);
  const { markSaving, markSaved, markError } = useSaving();

  async function addPost() {
    markSaving();
    try {
      const response = await adminFetch("/api/admin/posts", jsonInit("POST", { caption: "" }));
      const created = await response.json();
      setPosts((prev) => [...prev, created]);
      markSaved();
    } catch {
      markError();
    }
  }

  async function deletePost(id: string) {
    if (!confirm("Supprimer cette image du journal ?")) return;
    markSaving();
    try {
      await adminFetch(`/api/admin/posts/${id}`, { method: "DELETE" });
      setPosts((prev) => prev.filter((item) => item.id !== id));
      markSaved();
    } catch {
      markError();
    }
  }

  return (
    <div>
      <h1 className={styles.pageTitle}>Journal</h1>
      <p className={styles.pageHint}>{posts.length} image(s)</p>

      <button type="button" className={styles.addButton} onClick={addPost}>
        + Ajouter une image
      </button>

      {posts.length === 0 ? (
        <div className={styles.emptyState}>Le journal est vide.</div>
      ) : (
        <div className={styles.journalGrid}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} onDelete={deletePost} />
          ))}
        </div>
      )}
    </div>
  );
}
