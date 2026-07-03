"use client";

import { forwardRef, useEffect, useRef } from "react";
import { Notification } from "@/assets/svg";
import { useNotificationFeed } from "./notification-feed-context";
import styles from "./styles.module.scss";

type NotificationPanelProps = {
  open: boolean;
  onClose: () => void;
};

export const NotificationPanel = forwardRef<HTMLElement, NotificationPanelProps>(
  function NotificationPanel({ open, onClose }, forwardedRef) {
    const { items } = useNotificationFeed();
    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      if (open) closeRef.current?.focus();
    }, [open]);

    return (
      <aside
        ref={forwardedRef}
        className={styles.panel}
        data-open={open ? "true" : "false"}
        role="dialog"
        aria-modal={open}
        aria-labelledby="notification-panel-title"
        aria-hidden={!open}
      >
        <div className={styles.panelHeader}>
          <div className={styles.panelTitleWrapper}>
            <Notification />
            <h2 id="notification-panel-title" className={styles.panelTitle}>
              Notification
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            className={styles.close}
            aria-label="Close"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className={styles.panelBody}>
          {items.length === 0 ? (
            <p className={styles.empty}>No notifications yet.</p>
          ) : (
            <ul className={styles.list}>
              {items.map((n) => (
                <li key={n.id} className={styles.listItem}>
                  <p className={styles.listTitle}>{n.title}</p>
                  {n.body ? <p className={styles.listBody}>{n.body}</p> : null}
                  <time className={styles.listTime} dateTime={n.createdAt}>
                    {new Date(n.createdAt).toLocaleString()}
                  </time>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    );
  },
);
