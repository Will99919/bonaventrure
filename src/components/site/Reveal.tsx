"use client";

import type { ElementType, ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";
import styles from "./Reveal.module.css";

export function Reveal({
  children,
  as: As = "div",
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <As
      ref={ref}
      className={[styles.rise, visible ? styles.in : "", className].filter(Boolean).join(" ")}
    >
      {children}
    </As>
  );
}
