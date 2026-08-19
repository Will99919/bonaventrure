"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Identifiants incorrects.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <span className={styles.brand}>Bonaventure</span>
        <h1 className={styles.title}>Administration</h1>

        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required autoComplete="username" />
        </div>
        <div className={styles.field}>
          <label htmlFor="password">Mot de passe</label>
          <input id="password" name="password" type="password" required autoComplete="current-password" />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.submit} disabled={loading}>
          {loading ? "Connexion…" : "Se connecter"}
        </button>
      </form>
    </main>
  );
}
