import type { ComponentType } from "react";

import type { AppLocaleCode } from "./locale-constants";

type FlagProps = {
  className?: string;
};

/** 5-point star polygon, used for the China flag. */
function starPoints(cx: number, cy: number, outerR: number, innerR: number): string {
  const points: string[] = [];
  for (let i = 0; i < 10; i += 1) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    points.push(`${(cx + r * Math.cos(angle)).toFixed(2)},${(cy + r * Math.sin(angle)).toFixed(2)}`);
  }
  return points.join(" ");
}

function FlagEN({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 24 16" className={className} aria-hidden="true">
      <rect width="24" height="16" fill="#B22234" />
      <g fill="#fff">
        <rect y="1.23" width="24" height="1.23" />
        <rect y="3.69" width="24" height="1.23" />
        <rect y="6.15" width="24" height="1.23" />
        <rect y="8.61" width="24" height="1.23" />
        <rect y="11.08" width="24" height="1.23" />
        <rect y="13.54" width="24" height="1.23" />
      </g>
      <rect width="10.8" height="8.62" fill="#3C3B6E" />
    </svg>
  );
}

function FlagVI({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 24 16" className={className} aria-hidden="true">
      <rect width="24" height="16" fill="#DA251D" />
      <polygon points={starPoints(12, 8, 3.4, 1.3)} fill="#FFCD00" />
    </svg>
  );
}

function FlagJA({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 24 16" className={className} aria-hidden="true">
      <rect width="24" height="16" fill="#fff" />
      <circle cx="12" cy="8" r="4.4" fill="#BC002D" />
    </svg>
  );
}

function FlagKO({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 24 16" className={className} aria-hidden="true">
      <rect width="24" height="16" fill="#fff" />
      <circle cx="12" cy="8" r="3.4" fill="#CD2E3A" />
      <path
        d="M12 4.6a3.4 3.4 0 0 1 0 6.8 1.7 1.7 0 0 1 0-3.4 1.7 1.7 0 0 0 0-3.4Z"
        fill="#0047A0"
      />
      <g stroke="#111" strokeWidth="0.4">
        <line x1="3.4" y1="3.3" x2="6" y2="3.3" />
        <line x1="3.4" y1="4.1" x2="6" y2="4.1" />
        <line x1="3.4" y1="4.9" x2="6" y2="4.9" />

        <line x1="18" y1="11.1" x2="20.6" y2="11.1" />
        <line x1="18" y1="11.9" x2="20.6" y2="11.9" />
        <line x1="18" y1="12.7" x2="20.6" y2="12.7" />

        <line x1="18" y1="3.3" x2="19.1" y2="3.3" />
        <line x1="19.9" y1="3.3" x2="20.6" y2="3.3" />
        <line x1="18" y1="4.1" x2="19.1" y2="4.1" />
        <line x1="19.9" y1="4.1" x2="20.6" y2="4.1" />
        <line x1="18" y1="4.9" x2="19.1" y2="4.9" />
        <line x1="19.9" y1="4.9" x2="20.6" y2="4.9" />

        <line x1="3.4" y1="11.1" x2="4.5" y2="11.1" />
        <line x1="5.3" y1="11.1" x2="6" y2="11.1" />
        <line x1="3.4" y1="12.7" x2="4.5" y2="12.7" />
        <line x1="5.3" y1="12.7" x2="6" y2="12.7" />
        <line x1="3.4" y1="11.9" x2="6" y2="11.9" />
      </g>
    </svg>
  );
}

function FlagDE({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 24 16" className={className} aria-hidden="true">
      <rect width="24" height="16" fill="#FFCE00" />
      <rect width="24" height="5.33" fill="#000" />
      <rect y="5.33" width="24" height="5.34" fill="#DD0000" />
    </svg>
  );
}

function FlagZhCN({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 24 16" className={className} aria-hidden="true">
      <rect width="24" height="16" fill="#DE2910" />
      <polygon points={starPoints(5, 4.4, 2, 0.78)} fill="#FFDE00" />
      <polygon points={starPoints(8.9, 2.1, 0.66, 0.25)} fill="#FFDE00" />
      <polygon points={starPoints(10.3, 3.9, 0.66, 0.25)} fill="#FFDE00" />
      <polygon points={starPoints(10.1, 6, 0.66, 0.25)} fill="#FFDE00" />
      <polygon points={starPoints(8.6, 7.5, 0.66, 0.25)} fill="#FFDE00" />
    </svg>
  );
}

function FlagFR({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 24 16" className={className} aria-hidden="true">
      <rect width="8" height="16" fill="#002395" />
      <rect x="8" width="8" height="16" fill="#fff" />
      <rect x="16" width="8" height="16" fill="#ED2939" />
    </svg>
  );
}

export const LOCALE_FLAGS: Record<AppLocaleCode, ComponentType<FlagProps>> = {
  en: FlagEN,
  vi: FlagVI,
  ja: FlagJA,
  ko: FlagKO,
  de: FlagDE,
  "zh-CN": FlagZhCN,
  fr: FlagFR,
};
