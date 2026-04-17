"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "profile_notifications_v1";

export type NotificationEntry = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
};

function readStored(): NotificationEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidEntry);
  } catch {
    return [];
  }
}

function isValidEntry(x: unknown): x is NotificationEntry {
  if (typeof x !== "object" || x === null) return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    typeof o.title === "string" &&
    typeof o.body === "string" &&
    typeof o.createdAt === "string"
  );
}

function writeStored(items: NotificationEntry[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return true;
  } catch {
    return false;
  }
}

type NotificationFeedContextValue = {
  items: NotificationEntry[];
  addNotification: (title: string, body: string) => boolean;
};

const NotificationFeedContext = createContext<NotificationFeedContextValue | null>(
  null,
);

export function useNotificationFeed() {
  const ctx = useContext(NotificationFeedContext);
  if (!ctx) {
    throw new Error("useNotificationFeed must be used within NotificationFeedProvider");
  }
  return ctx;
}

export function NotificationFeedProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<NotificationEntry[]>([]);

  useEffect(() => {
    setItems(readStored());
  }, []);

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key !== null && e.key !== STORAGE_KEY) return;
      setItems(readStored());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const addNotification = useCallback((title: string, body: string): boolean => {
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();
    if (!trimmedTitle && !trimmedBody) return false;
    const entry: NotificationEntry = {
      id: crypto.randomUUID(),
      title: trimmedTitle || "(Không tiêu đề)",
      body: trimmedBody,
      createdAt: new Date().toISOString(),
    };
    let persisted = false;
    setItems((prev) => {
      const next = [entry, ...prev];
      persisted = writeStored(next);
      return persisted ? next : prev;
    });
    return persisted;
  }, []);

  const value = useMemo(
    () => ({ items, addNotification }),
    [items, addNotification],
  );

  return (
    <NotificationFeedContext.Provider value={value}>
      {children}
    </NotificationFeedContext.Provider>
  );
}
