"use client";

import {
  createContext,
  useContext,
  useEffect,
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

type NotificationFeedContextValue = {
  items: NotificationEntry[];
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

  return (
    <NotificationFeedContext.Provider value={{ items }}>
      {children}
    </NotificationFeedContext.Provider>
  );
}
