"use client";

import Link from "next/link";
import styles from "./header.module.scss";
import gaStyles from "@/components/layout/global-actions/global-actions.module.scss";
import { GitHub } from "@/assets/svg";
import { PATH_URL, SOCIAL_LINKS } from "@/config/path";
import { GlobalActionsMenu } from "@/components/layout/global-actions/global-actions-menu";
import { useMainScreen } from "@/components/layout/main-screen/main-screen-context";
import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import { useInstallPrompt } from "@/hooks/use-install-prompt";

function openGitHubProfile() {
  window.open(SOCIAL_LINKS.GITHUB, "_blank", "noopener,noreferrer");
}

export default function Header() {
  const { showRouteView } = useMainScreen();
  const { t } = useLocaleText();
  const { canInstall, promptInstall } = useInstallPrompt();
  const nav = [
    { href: PATH_URL.ROOT, label: t("navBar.home") },
    { href: PATH_URL.ABOUT, label: t("navBar.about") },
    { href: PATH_URL.PROJECTS, label: t("navBar.projects") },
    { href: PATH_URL.NEWS, label: t("navBar.news") },
    { href: PATH_URL.CONTACT, label: t("navBar.contact") },
  ] as const;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link
          href={PATH_URL.ROOT}
          className={styles.brand}
          onClick={() => showRouteView()}
        >
          Hello World!
        </Link>
        <nav className={styles.nav} aria-label={t("aria.header.nav")}>
          <div className={styles.navInline}>
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={styles.navLink}
                onClick={() => showRouteView()}
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              className={styles.social}
              onClick={openGitHubProfile}
              aria-label={t("aria.header.github")}
            >
              <GitHub />
            </button>
          </div>
          <GlobalActionsMenu
            installAction={
              canInstall
                ? {
                    label: t("pwa.installApp"),
                    onSelect: () => {
                      void promptInstall();
                    },
                  }
                : null
            }
            menuLeading={(closeMenu) => (
              <>
                {nav.map((item) => (
                  <li key={item.href} className={gaStyles.leadingItem}>
                    <Link
                      href={item.href}
                      className={gaStyles.popoverItem}
                      onClick={() => {
                        closeMenu();
                        showRouteView();
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className={gaStyles.leadingItem}>
                  <button
                    type="button"
                    className={gaStyles.popoverItem}
                    onClick={() => {
                      closeMenu();
                      openGitHubProfile();
                    }}
                    aria-label={t("aria.header.github")}
                  >
                    <GitHub />
                    {t("popover.github")}
                  </button>
                </li>
              </>
            )}
          />
        </nav>
      </div>
    </header>
  );
}
