"use client";

import { useState } from "react";
import Link from "next/link";

import { Navigation } from "@/assets/svg";
import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import { PROJECTS_DATA } from "@/config/projects-data";
import styles from "./project-nav.module.scss";

type Props = { currentSlug: string };

export default function ProjectNav({ currentSlug }: Props) {
  const [open, setOpen] = useState(false);
  const { t } = useLocaleText();

  const currentIndex = PROJECTS_DATA.findIndex((p) => p.slug === currentSlug);
  const prev = currentIndex > 0 ? PROJECTS_DATA[currentIndex - 1] : null;
  const next = currentIndex < PROJECTS_DATA.length - 1 ? PROJECTS_DATA[currentIndex + 1] : null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOpen(false);
  };

  return (
    <div className={styles.root}>
      <div className={`${styles.panel} ${open ? styles.panelOpen : ""}`} aria-hidden={!open}>
        <button onClick={scrollToTop} className={styles.item}>
          <span className={styles.itemIcon}>↑</span>
          {t("project.scrollTop")}
        </button>

        {prev && (
          <Link href={`/projects/${prev.slug}`} className={styles.item} onClick={() => setOpen(false)}>
            <span className={styles.itemIcon}>←</span>
            {t("project.back")}
          </Link>
        )}

        {next && (
          <Link href={`/projects/${next.slug}`} className={styles.item} onClick={() => setOpen(false)}>
            {t("project.next")}
            <span className={styles.itemIcon}>→</span>
          </Link>
        )}
      </div>

      <div className={styles.triggerRow}>
        {!open && (
          <span className={styles.hint} aria-hidden="true">
            {t("project.scrollTop")}
          </span>
        )}
        <button
          className={`${styles.trigger} ${open ? styles.triggerOpen : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
        >
          <Navigation />
        </button>
      </div>
    </div>
  );
}
