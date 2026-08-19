"use client";

import { useBreakpoint, isCompact } from "@/hooks/useBreakpoint";
import { RunwayDesktop } from "./RunwayDesktop";
import { RunwayCompact } from "./RunwayCompact";
import type { LookItem } from "./types";

export function Runway({ looks }: { looks: LookItem[] }) {
  const bp = useBreakpoint();
  return isCompact(bp) ? <RunwayCompact looks={looks} /> : <RunwayDesktop looks={looks} />;
}
