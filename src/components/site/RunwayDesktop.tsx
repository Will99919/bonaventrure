"use client";

import { useEffect, useRef, useState } from "react";
import type { LookItem } from "./types";
import { RunwayFigure } from "./RunwayFigure";
import { RunwayCta } from "./RunwayCta";
import { DESKTOP_WIDTHS, RATIOS, patternIndex } from "./runwayPattern";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./RunwayDesktop.module.css";

export function RunwayDesktop({ looks }: { looks: LookItem[] }) {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorActive, setCursorActive] = useState(false);
  const [hoverCursor, setHoverCursor] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Synced from a browser-only media query; SSR always renders without the custom cursor.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHoverCursor(window.matchMedia("(hover: hover)").matches);
  }, []);

  useEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    const counter = counterRef.current;
    if (!pin || !track || !counter) return;

    let rafId: number;
    let lastProgress = -1;

    const tick = () => {
      const innerWidth = window.innerWidth;
      const innerHeight = window.innerHeight;
      const course = Math.max(track.scrollWidth - innerWidth, 0);

      const desiredHeight = innerHeight + course * 1.35;
      if (Math.abs(desiredHeight - pin.offsetHeight) > 2) {
        pin.style.height = `${desiredHeight}px`;
      }

      const rect = pin.getBoundingClientRect();
      const scrollable = pin.offsetHeight - innerHeight;
      const progress = scrollable > 0 ? clamp(-rect.top / scrollable, 0, 1) : 0;

      if (Math.abs(progress - lastProgress) > 0.0005) {
        lastProgress = progress;
        if (reducedMotion) {
          track.style.transform = "none";
        } else {
          track.style.transform = `translateX(${-progress * course}px)`;
        }
        const current = looks.length === 0 ? 0 : Math.min(Math.floor(progress * looks.length) + 1, looks.length);
        counter.textContent = `${pad(current)} / ${pad(looks.length)}`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [looks.length, reducedMotion]);

  useEffect(() => {
    if (!hoverCursor) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMove = (event: MouseEvent) => {
      cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [hoverCursor]);

  return (
    <section id="defile" ref={pinRef} className={styles.pin}>
      <div className={styles.sticky}>
        <div className={styles.infoBar}>
          <span>Le défilé — collections sur mesure</span>
          <span ref={counterRef}>{`${pad(looks.length > 0 ? 1 : 0)} / ${pad(looks.length)}`}</span>
        </div>

        <div
          ref={trackRef}
          className={styles.track}
          onMouseOver={(event) => {
            if ((event.target as HTMLElement).closest("figure")) setCursorActive(true);
          }}
          onMouseOut={(event) => {
            if ((event.target as HTMLElement).closest("figure")) setCursorActive(false);
          }}
        >
          {looks.map((look, index) => {
            const patternI = patternIndex(index);
            return (
              <RunwayFigure
                key={look.id}
                look={look}
                ratio={RATIOS[patternI]}
                placeholderAlt={index % 2 === 1}
                style={{ width: `${DESKTOP_WIDTHS[patternI]}vw` }}
                className={styles.figure}
              />
            );
          })}
          <RunwayCta />
        </div>

        {hoverCursor && (
          <div
            ref={cursorRef}
            className={styles.cursor}
            data-active={cursorActive || undefined}
            aria-hidden="true"
          >
            Voir
          </div>
        )}
      </div>
    </section>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}
