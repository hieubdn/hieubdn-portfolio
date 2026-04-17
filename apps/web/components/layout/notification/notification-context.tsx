"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import { NotificationDrawer } from "./notification-drawer";

type NotificationContextValue = {
  openNotificationPanel: () => void;
  closeNotificationPanel: () => void;
};

const NotificationContext = createContext<NotificationContextValue | null>(null);

export function useNotificationPanel() {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error("useNotificationPanel must be used within NotificationProvider");
  }
  return ctx;
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [, startTransition] = useTransition();
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const openNotificationPanel = useCallback(() => {
    if (typeof document !== "undefined") {
      const active = document.activeElement;
      returnFocusRef.current = active instanceof HTMLElement ? active : null;
    }
    startTransition(() => setOpen(true));
  }, []);

  const closeNotificationPanel = useCallback(() => {
    startTransition(() => setOpen(false));
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (open) return;
    const el = returnFocusRef.current;
    returnFocusRef.current = null;
    if (el?.isConnected) el.focus();
  }, [open]);

  const value = useMemo(
    () => ({ openNotificationPanel, closeNotificationPanel }),
    [openNotificationPanel, closeNotificationPanel],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationDrawer open={open} onClose={closeNotificationPanel} />
    </NotificationContext.Provider>
  );
}
