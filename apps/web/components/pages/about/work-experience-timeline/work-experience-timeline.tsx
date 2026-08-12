"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import CompanyExperience from "../company-experience/company-experience";
import type { DetailedCompanyExperience } from "../company-experience/company-experience-data";
import styles from "./work-experience-timeline.module.scss";

type WorkExperienceTimelineProps = {
  companies: readonly DetailedCompanyExperience[];
  accentColor?: string;
  traceColor?: string;
};

type Rect = { x: number; y: number; width: number; height: number };

type Connector = {
  key: string;
  d: string;
  tipX: number;
  tipY: number;
  angle: number;
  delayMs: number;
};

const GAP = 12;
const CORNER_RADIUS = 18;
const AXIS_TOLERANCE = 32;
const CONNECTOR_DELAY_MS = 240;

function route(a: Rect, b: Rect): { d: string; tipX: number; tipY: number; angle: number } {
  const aRight = a.x + a.width;
  const aBottom = a.y + a.height;
  const bRight = b.x + b.width;
  const bBottom = b.y + b.height;
  const aCx = a.x + a.width / 2;
  const aCy = a.y + a.height / 2;
  const bCx = b.x + b.width / 2;
  const bCy = b.y + b.height / 2;
  const dx = bCx - aCx;
  const dy = bCy - aCy;

  if (Math.abs(dy) < AXIS_TOLERANCE) {
    const y = (aCy + bCy) / 2;
    const forward = dx >= 0;
    const x1 = forward ? aRight + GAP : a.x - GAP;
    const x2 = forward ? b.x - GAP : bRight + GAP;
    return { d: `M ${x1} ${y} L ${x2} ${y}`, tipX: x2, tipY: y, angle: forward ? 0 : 180 };
  }

  if (Math.abs(dx) < AXIS_TOLERANCE) {
    const x = (aCx + bCx) / 2;
    const forward = dy >= 0;
    const y1 = forward ? aBottom + GAP : a.y - GAP;
    const y2 = forward ? b.y - GAP : bBottom + GAP;
    return { d: `M ${x} ${y1} L ${x} ${y2}`, tipX: x, tipY: y2, angle: forward ? 90 : -90 };
  }

  const goRight = dx >= 0;
  const x1 = goRight ? aRight + GAP : a.x - GAP;
  const y1 = aCy;
  const cx = bCx;
  const goDown = dy >= 0;
  const y2 = goDown ? b.y - GAP : bBottom + GAP;

  const dxSign = Math.sign(cx - x1) || 1;
  const dySign = Math.sign(y2 - y1) || 1;
  const r = Math.min(CORNER_RADIUS, Math.abs(cx - x1), Math.abs(y2 - y1));
  const cornerEnterX = cx - dxSign * r;
  const cornerExitY = y1 + dySign * r;

  const d = `M ${x1} ${y1} L ${cornerEnterX} ${y1} Q ${cx} ${y1} ${cx} ${cornerExitY} L ${cx} ${y2}`;
  return { d, tipX: cx, tipY: y2, angle: dySign > 0 ? 90 : -90 };
}

export default function WorkExperienceTimeline({
  companies,
  accentColor = "#e5e2e9",
  traceColor = "#0b1529",
}: WorkExperienceTimelineProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Map<string, HTMLLIElement>>(new Map());
  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [drawn, setDrawn] = useState(false);
  const [running, setRunning] = useState(false);

  const registerCardRef = useCallback(
    (key: string) => (el: HTMLLIElement | null) => {
      if (el) cardRefs.current.set(key, el);
      else cardRefs.current.delete(key);
    },
    [],
  );

  const measure = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const rects = new Map<string, Rect>();
    for (const company of companies) {
      const el = cardRefs.current.get(company.keyPrefix);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      rects.set(company.keyPrefix, {
        x: r.left - wrapperRect.left,
        y: r.top - wrapperRect.top,
        width: r.width,
        height: r.height,
      });
    }

    const chronological = [...companies].reverse();
    const next: Connector[] = [];
    for (let i = 0; i < chronological.length - 1; i++) {
      const from = chronological[i];
      const to = chronological[i + 1];
      if (!from || !to) continue;
      const a = rects.get(from.keyPrefix);
      const b = rects.get(to.keyPrefix);
      if (!a || !b) continue;
      const { d, tipX, tipY, angle } = route(a, b);
      next.push({
        key: `${from.keyPrefix}->${to.keyPrefix}`,
        d,
        tipX,
        tipY,
        angle,
        delayMs: i * CONNECTOR_DELAY_MS,
      });
    }
    setConnectors(next);
  }, [companies]);

  useEffect(() => {
    measure();

    let raf = 0;
    const scheduleMeasure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    const resizeObserver = new ResizeObserver(scheduleMeasure);
    if (wrapperRef.current) resizeObserver.observe(wrapperRef.current);
    cardRefs.current.forEach((el) => resizeObserver.observe(el));

    document.fonts?.ready?.then(scheduleMeasure);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
    };
  }, [measure]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setDrawn(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          setDrawn(true);
          setRunning(true);
        } else {
          setRunning(false);
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <ol className={styles.grid}>
        {companies.map((company) => (
          <li
            key={company.keyPrefix}
            ref={registerCardRef(company.keyPrefix)}
            className={styles.item}
          >
            <CompanyExperience company={company} />
          </li>
        ))}
      </ol>
      <svg className={styles.overlay} overflow="visible" aria-hidden="true" focusable="false">
        {connectors.map((connector) => (
          <g
            key={connector.key}
            className={[
              styles.connector,
              drawn ? styles.isDrawn : "",
              running ? styles.isRunning : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={{ ["--wxt-delay" as string]: `${connector.delayMs}ms` }}
          >
            <path d={connector.d} className={styles.trace} style={{ stroke: traceColor }} pathLength={1} />
            <path d={connector.d} className={styles.flow} style={{ stroke: accentColor }} />
            <path
              d="M-11 -6L0 0L-11 6"
              className={styles.tip}
              style={{ stroke: accentColor }}
              transform={`translate(${connector.tipX} ${connector.tipY}) rotate(${connector.angle})`}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
