"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Mirrors the prototype's `[data-rise]` behavior: reveal once the element's
 * top crosses ~92% of the viewport height, scrolling up or down, and also
 * reveal immediately if the element is already past that line on mount
 * (direct anchor navigation, restored scroll position).
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      // Synced from a browser-only media query; SSR always renders the hidden default.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const alreadyPast = el.getBoundingClientRect().top < window.innerHeight * 0.92;
    if (alreadyPast) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return { ref, visible };
}
