"use client";

import { useState } from "react";
import { useSaving } from "./SavingContext";
import { adminFetch, jsonInit } from "@/lib/admin-fetch";
import styles from "./Admin.module.css";

type AppointmentRecord = {
  id: string;
  name: string;
  contact: string;
  message: string;
  status: string;
  createdAt: string;
};

const STATUSES = ["Nouvelle", "Traitee", "Archivee"];
const STATUS_LABELS: Record<string, string> = {
  Nouvelle: "Nouvelle",
  Traitee: "Traitée",
  Archivee: "Archivée",
};

export function AppointmentsTab({ initial }: { initial: AppointmentRecord[] }) {
  const [appointments, setAppointments] = useState(initial);
  const { markSaving, markSaved, markError } = useSaving();

  async function updateStatus(id: string, status: string) {
    const previous = appointments.find((item) => item.id === id)?.status;
    setAppointments((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
    markSaving();
    try {
      await adminFetch(`/api/admin/appointments/${id}`, jsonInit("PATCH", { status }));
      markSaved();
    } catch {
      if (previous) {
        setAppointments((prev) => prev.map((item) => (item.id === id ? { ...item, status: previous } : item)));
      }
      markError();
    }
  }

  async function remove(id: string) {
    if (!confirm("Supprimer cette demande ?")) return;
    markSaving();
    try {
      await adminFetch(`/api/admin/appointments/${id}`, { method: "DELETE" });
      setAppointments((prev) => prev.filter((item) => item.id !== id));
      markSaved();
    } catch {
      markError();
    }
  }

  return (
    <div>
      <h1 className={styles.pageTitle}>Demandes de rendez-vous</h1>
      <p className={styles.pageHint}>{appointments.length} demande(s)</p>

      {appointments.length === 0 ? (
        <div className={styles.emptyState}>Aucune demande pour le moment.</div>
      ) : (
        appointments.map((appointment) => (
          <div key={appointment.id} className={styles.appointmentRow}>
            <div>
              <p className={styles.appointmentName}>{appointment.name}</p>
              <p className={styles.appointmentMeta}>{appointment.contact}</p>
              <p className={styles.appointmentMeta}>{appointment.message}</p>
              <p className={styles.appointmentMeta}>
                {new Date(appointment.createdAt).toLocaleString("fr-FR")}
              </p>
            </div>
            <select
              className={styles.select}
              value={appointment.status}
              onChange={(event) => updateStatus(appointment.id, event.target.value)}
            >
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {STATUS_LABELS[status]}
                </option>
              ))}
            </select>
            <button type="button" className={styles.deleteButton} onClick={() => remove(appointment.id)}>
              Supprimer
            </button>
          </div>
        ))
      )}
    </div>
  );
}
