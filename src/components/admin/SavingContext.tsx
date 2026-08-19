"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import type { ReactNode } from "react";

type SaveStatus = "idle" | "saving" | "saved" | "error";

const SavingContext = createContext<{
  status: SaveStatus;
  markSaving: () => void;
  markSaved: () => void;
  markError: () => void;
} | null>(null);

export function SavingProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<SaveStatus>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const markSaving = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setStatus("saving");
  }, []);

  const markSaved = useCallback(() => {
    setStatus("saved");
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const markError = useCallback(() => {
    setStatus("error");
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  return (
    <SavingContext.Provider value={{ status, markSaving, markSaved, markError }}>
      {children}
    </SavingContext.Provider>
  );
}

export function useSaving() {
  const ctx = useContext(SavingContext);
  if (!ctx) throw new Error("useSaving must be used within SavingProvider");
  return ctx;
}
