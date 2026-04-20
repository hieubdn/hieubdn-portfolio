"use client";

import { useEffect, useState } from "react";
import { useInstallPrompt } from "@/hooks/use-install-prompt";
import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import styles from "./install-prompt.module.scss";

const DISMISSED_KEY = "pwa-install-dismissed";

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  if ((window.navigator as Navigator & { standalone?: boolean }).standalone) {
    return true;
  }
  return window.matchMedia("(display-mode: standalone)").matches;
}

function isIOSSafari(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const iOS = /iPad|iPhone|iPod/.test(ua) && !("MSStream" in window);
  const safari = /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS/.test(ua);
  return iOS && safari;
}

function readDismissed(): boolean {
  try {
    return localStorage.getItem(DISMISSED_KEY) === "1";
  } catch {
    return false;
  }
}

function writeDismissed(): void {
  try {
    localStorage.setItem(DISMISSED_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function InstallPrompt() {
  const { t } = useLocaleText();
  const { canInstall, promptInstall } = useInstallPrompt();
  const [hydrated, setHydrated] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);

  useEffect(() => {
    setHydrated(true);
    setDismissed(readDismissed());
    if (!isStandalone() && isIOSSafari()) {
      setShowIosGuide(!readDismissed());
    }
  }, []);

  if (!hydrated || dismissed) return null;
  if (isStandalone()) return null;

  function dismiss() {
    writeDismissed();
    setDismissed(true);
  }

  async function install() {
    await promptInstall();
    dismiss();
  }

  if (canInstall) {
    return (
      <div className={styles.card} role="dialog" aria-live="polite">
        <p className={styles.message}>{t("pwa.install.prompt")}</p>
        <div className={styles.actions}>
          <button type="button" className={styles.secondary} onClick={dismiss}>
            {t("pwa.install.later")}
          </button>
          <button type="button" className={styles.primary} onClick={install}>
            {t("pwa.install.action")}
          </button>
        </div>
      </div>
    );
  }

  if (showIosGuide) {
    return (
      <div className={styles.card} role="dialog" aria-live="polite">
        <p className={styles.message}>{t("pwa.install.iosGuide")}</p>
        <div className={styles.actions}>
          <button type="button" className={styles.primary} onClick={dismiss}>
            {t("pwa.install.gotIt")}
          </button>
        </div>
      </div>
    );
  }

  return null;
}
