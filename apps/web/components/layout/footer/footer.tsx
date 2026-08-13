"use client";

import Link from "next/link";

import { PATH_URL } from "@/config/path";
import { useMainScreen } from "@/components/layout/main-screen/main-screen-context";
import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";

import styles from "./footer.module.scss";

export default function Footer() {
  const { showRouteView } = useMainScreen();
  const { t } = useLocaleText();
  const nav = [
    { href: PATH_URL.ROOT, label: t("nav.home") },
    { href: PATH_URL.ABOUT, label: t("nav.about") },
    { href: PATH_URL.PROJECTS, label: t("nav.projects") },
    { href: PATH_URL.CONTACT, label: t("nav.contact") },
  ] as const;

  return (
    <footer className={styles.footer}>
      <nav className={styles.links} aria-label={t("aria.nav")}>
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={styles.link}
            onClick={() => showRouteView()}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className={styles.inner}>
        <p className={styles.copy}>
         Copyright © {new Date().getFullYear()} ◦ All rights reserved.
        </p>
      </div>
    </footer>
  );
}
