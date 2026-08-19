"use client";

import { useEffect, useState } from "react";

export type Breakpoint = "phone" | "tablet" | "desktop";

function computeBreakpoint(width: number): Breakpoint {
  if (width < 700) return "phone";
  if (width < 1024) return "tablet";
  return "desktop";
}

export function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>("desktop");

  useEffect(() => {
    const update = () => setBp(computeBreakpoint(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return bp;
}

export function isCompact(bp: Breakpoint): boolean {
  return bp === "phone" || bp === "tablet";
}
