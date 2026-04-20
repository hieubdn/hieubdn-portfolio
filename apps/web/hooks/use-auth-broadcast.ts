"use client";

import { useEffect, useRef } from "react";

const CHANNEL_NAME = "profile-auth";

type AuthMessage = { type: "logout"; at: number };

function openChannel(): BroadcastChannel | null {
  if (typeof window === "undefined") return null;
  if (typeof BroadcastChannel === "undefined") return null;
  return new BroadcastChannel(CHANNEL_NAME);
}

async function purgeSensitiveCaches(): Promise<void> {
  if (typeof caches === "undefined") return;
  try {
    const names = await caches.keys();
    await Promise.all(
      names
        .filter((n) => /apis|pages-rsc|pages|next-data/.test(n))
        .map((n) => caches.delete(n)),
    );
  } catch {
    /* storage eviction or permission denied — ignore */
  }
}

export function broadcastLogout(): void {
  const ch = openChannel();
  if (!ch) return;
  const payload: AuthMessage = { type: "logout", at: Date.now() };
  try {
    ch.postMessage(payload);
  } finally {
    ch.close();
  }
}

export function useAuthBroadcast(onLogout: () => void): void {
  const handlerRef = useRef(onLogout);
  handlerRef.current = onLogout;

  useEffect(() => {
    const ch = openChannel();
    if (!ch) return;

    async function onMessage(ev: MessageEvent<AuthMessage>) {
      if (ev.data?.type !== "logout") return;
      await purgeSensitiveCaches();
      handlerRef.current();
    }

    ch.addEventListener("message", onMessage);
    return () => {
      ch.removeEventListener("message", onMessage);
      ch.close();
    };
  }, []);
}

export { purgeSensitiveCaches };
