"use client";

import { useEffect, useRef } from "react";
import { useSaving } from "@/components/admin/SavingContext";

export function useDebouncedSave<T>(value: T, save: (value: T) => Promise<void>, delay = 500) {
  const { markSaving, markSaved, markError } = useSaving();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRun = useRef(true);
  const savedRef = useRef(save);

  useEffect(() => {
    savedRef.current = save;
  }, [save]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    markSaving();
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      savedRef.current(value).then(markSaved).catch(markError);
    }, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
}
