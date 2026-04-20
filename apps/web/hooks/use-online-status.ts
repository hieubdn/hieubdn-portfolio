"use client";

import { useEffect, useState } from "react";

const PROBE_URL = "/manifest.json";
const PROBE_TIMEOUT_MS = 3000;

// SSR and the first client render must agree, so we always start as "online".
// Node's global `navigator.onLine` is `false`, which would otherwise cause a
// hydration mismatch against the browser where `navigator.onLine` is usually `true`.
async function probeConnectivity(): Promise<boolean> {
  if (typeof fetch === "undefined") return navigator.onLine;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), PROBE_TIMEOUT_MS);
  try {
    const res = await fetch(`${PROBE_URL}?_=${Date.now()}`, {
      method: "HEAD",
      cache: "no-store",
      signal: controller.signal,
    });
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

export function useOnlineStatus(): boolean {
  const [online, setOnline] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;

    function setIfMounted(next: boolean) {
      if (!cancelled) setOnline(next);
    }

    setIfMounted(navigator.onLine);

    function handleOffline() {
      setIfMounted(false);
    }

    async function handleOnline() {
      setIfMounted(true);
      const real = await probeConnectivity();
      setIfMounted(real);
    }

    function handleFocus() {
      if (!navigator.onLine) {
        setIfMounted(false);
        return;
      }
      void probeConnectivity().then(setIfMounted);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("focus", handleFocus);
    return () => {
      cancelled = true;
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return online;
}
