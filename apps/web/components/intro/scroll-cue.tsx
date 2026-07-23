"use client";

import styles from "./intro-overlay.module.scss";

type ScrollCueProps = {
  label: string;
  onClick?: () => void;
  className?: string;
};

export function ScrollCue({ label, onClick, className = "" }: ScrollCueProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.scrollCue} ${className}`}
      aria-label={label}
    >
      <span className={styles.scrollCueMouse} aria-hidden="true">
        <span className={styles.scrollCueDot} />
      </span>
      <span className={styles.scrollCueLabel} suppressHydrationWarning>
        {label}
      </span>
      <span className={styles.scrollCueChevron} aria-hidden="true" />
    </button>
  );
}
