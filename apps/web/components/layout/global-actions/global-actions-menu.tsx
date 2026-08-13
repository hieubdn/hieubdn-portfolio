"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { GlobalActions } from "@/assets/svg";
import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import styles from "./global-actions.module.scss";

export type GlobalActionsMenuProps = {
  menuLeading?: (closeMenu: () => void) => ReactNode;
  installAction?: {
    label: string;
    onSelect: () => void;
  } | null;
};

export function GlobalActionsMenu({
  menuLeading,
  installAction,
}: GlobalActionsMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const { t } = useLocaleText();

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      const el = rootRef.current;
      if (el && !el.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className={styles.globalActions} ref={rootRef}>
      <button
        type="button"
        className={styles.globalActionsTrigger}
        aria-label={t("aria.globalActions")}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        <GlobalActions />
      </button>
      {open ? (
        <div className={styles.popover} aria-label={t("aria.globalActions")}>
          <div className={styles.popoverInner}>
            <ul className={styles.popoverList}>
              {menuLeading ? menuLeading(() => setOpen(false)) : null}
              {installAction ? (
                <li>
                  <button
                    type="button"
                    className={styles.popoverItem}
                    onClick={() => {
                      setOpen(false);
                      installAction.onSelect();
                    }}
                  >
                    {installAction.label}
                  </button>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
