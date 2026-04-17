"use client";

import { usePathname } from "next/navigation";
import { forwardRef, useEffect, useRef, useState, type FormEvent } from "react";
import { isAdminAppPath } from "@/config/path";
import { SuccessIcon, FailIcon } from "@/assets/svg";
import { useNotificationFeed } from "./notification-feed-context";
import styles from "./styles.module.scss";

type NotificationPanelProps = {
  open: boolean;
  onClose: () => void;
};

export const NotificationPanel = forwardRef<HTMLElement, NotificationPanelProps>(
  function NotificationPanel({ open, onClose }, forwardedRef) {
    const pathname = usePathname();
    const isAdmin = isAdminAppPath(pathname);
    const { items, addNotification } = useNotificationFeed();
    const closeRef = useRef<HTMLButtonElement>(null);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [sentHint, setSentHint] = useState(false);
    const [sendError, setSendError] = useState<string | null>(null);
    const hintHideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
      if (open) closeRef.current?.focus();
    }, [open]);

    useEffect(() => {
      return () => {
        if (hintHideTimeoutRef.current) {
          clearTimeout(hintHideTimeoutRef.current);
          hintHideTimeoutRef.current = null;
        }
      };
    }, []);

    useEffect(() => {
      if (!open) {
        if (hintHideTimeoutRef.current) {
          clearTimeout(hintHideTimeoutRef.current);
          hintHideTimeoutRef.current = null;
        }
        setSentHint(false);
        setSendError(null);
      }
    }, [open]);

    function handleSend(e: FormEvent) {
      e.preventDefault();
      if (hintHideTimeoutRef.current) {
        clearTimeout(hintHideTimeoutRef.current);
        hintHideTimeoutRef.current = null;
      }
      setSentHint(false);
      setSendError(null);
      const trimmedTitle = title.trim();
      const trimmedBody = body.trim();
      if (!trimmedTitle && !trimmedBody) {
        setSendError("Enter a title or content.");
        return;
      }
      const ok = addNotification(title, body);
      if (!ok) {
        setSendError("Could not save. Storage may be full or disabled.");
        return;
      }
      setTitle("");
      setBody("");
      if (hintHideTimeoutRef.current) {
        clearTimeout(hintHideTimeoutRef.current);
      }
      setSentHint(true);
      hintHideTimeoutRef.current = setTimeout(() => {
        setSentHint(false);
        hintHideTimeoutRef.current = null;
      }, 5000);
    }

    const panelTitle = isAdmin ? "Send Notification" : "Notification";

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
          <h2 id="notification-panel-title" className={styles.panelTitle}>
            {panelTitle}
          </h2>
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
          {isAdmin ? (
            <form className={styles.composeForm} onSubmit={handleSend}>
              <label className={styles.fieldLabel} htmlFor="notification-title">
                Title Notification
              </label>
              <input
                id="notification-title"
                className={styles.textInput}
                type="text"
                name="title"
                autoComplete="off"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title Notification"
              />
              <label className={`${styles.fieldLabel} ${styles.contentNotificationLabel}`} htmlFor="notification-body">
                Content Notification
              </label>
              <textarea
                id="notification-body"
                className={styles.textArea}
                name="body"
                rows={5}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Content Notification"
              />
              <button type="submit" className={styles.sendButton}>
                Send Notification
              </button>
              {sendError ? (
                <p className={styles.errorText} role="alert">
                  <FailIcon />{sendError}
                </p>
              ) : null}
              {sentHint ? (
                <p className={styles.hint} role="status">
                  <SuccessIcon />
                  Saved. The guest will see this notification in the Notification section on the home page.
                </p>
              ) : null}
            </form>
          ) : items.length === 0 ? (
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
