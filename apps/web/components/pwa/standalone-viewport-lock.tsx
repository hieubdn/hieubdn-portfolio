"use client";

import { useInsertionEffect } from "react";

const LOCKED_VIEWPORT =
  "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";

function isStandaloneDisplay(): boolean {
  const iosStandalone = (window.navigator as Navigator & { standalone?: boolean })
    .standalone;
  if (iosStandalone === true) return true;
  return window.matchMedia("(display-mode: standalone)").matches;
}

export function StandaloneViewportLock() {
  useInsertionEffect(() => {
    if (typeof document === "undefined") return;
    if (!isStandaloneDisplay()) return;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="viewport"]');
    if (!meta) return;
    meta.setAttribute("content", LOCKED_VIEWPORT);
  }, []);

  return null;
}
