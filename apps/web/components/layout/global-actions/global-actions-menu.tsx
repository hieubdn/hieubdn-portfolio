"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { GlobalActions, Notification, Setting } from "@/assets/svg";
import { useMainScreen } from "@/components/layout/main-screen/main-screen-context";
import { useNotificationPanel } from "@/components/layout/notification/notification-context";
import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import styles from "./styles.module.scss";

export type GlobalActionsMenuProps = {
  thirdItem: {
    label: string;
    icon: ReactNode;
    onSelect: () => void;
  };
  menuLeading?: (closeMenu: () => void) => ReactNode;
  installAction?: {
    label: string;
    onSelect: () => void;
  } | null;
};

export function GlobalActionsMenu({
  thirdItem,
  menuLeading,
  installAction,
}: GlobalActionsMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const { openNotificationPanel } = useNotificationPanel();
  const { openSettingView } = useMainScreen();
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
        aria-label="Global actions"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        <GlobalActions />
      </button>
      {open ? (
        <div className={styles.popover} aria-label="Global actions">
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
              <li>
                <button
                  type="button"
                  className={styles.popoverItem}
                  onClick={() => {
                    setOpen(false);
                    openNotificationPanel();
                  }}
                >
                  <Notification /> {t("popover.notification")}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={styles.popoverItem}
                  onClick={() => {
                    setOpen(false);
                    openSettingView();
                  }}
                >
                  <Setting /> {t("popover.setting")}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={styles.popoverItem}
                  onClick={() => {
                    setOpen(false);
                    thirdItem.onSelect();
                  }}
                >
                  {thirdItem.icon}
                  {thirdItem.label}
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
