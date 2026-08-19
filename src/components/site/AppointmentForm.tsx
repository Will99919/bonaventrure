"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import styles from "./Contact.module.css";

type Status = "idle" | "sending" | "sent" | "error";

export function AppointmentForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          contact: data.get("contact"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error ?? "Une erreur est survenue.");
      }

      setStatus("sent");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Une erreur est survenue.");
    }
  }

  if (status === "sent") {
    return <p className={styles.formSuccess}>Votre demande a bien été envoyée. Réponse sous quelques jours.</p>;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formRow}>
        <label htmlFor="name">Nom</label>
        <input id="name" name="name" type="text" required minLength={2} />
      </div>
      <div className={styles.formRow}>
        <label htmlFor="contact">Email ou téléphone</label>
        <input id="contact" name="contact" type="text" required minLength={3} />
      </div>
      <div className={styles.formRow}>
        <label htmlFor="message">Votre demande</label>
        <textarea id="message" name="message" rows={4} required minLength={5} />
      </div>

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className={styles.honeypot}
        aria-hidden="true"
      />

      <button type="submit" className={styles.formButton} disabled={status === "sending"}>
        {status === "sending" ? "Envoi…" : "Demander un rendez-vous"}
      </button>

      {status === "error" && <p className={styles.formError}>{errorMessage}</p>}
    </form>
  );
}
