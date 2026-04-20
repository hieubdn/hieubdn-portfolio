"use client";

import { useSyncExternalStore } from "react";

function subscribe(notify: () => void): () => void {
  window.addEventListener("online", notify);
  window.addEventListener("offline", notify);
  return () => {
    window.removeEventListener("online", notify);
    window.removeEventListener("offline", notify);
  };
}

function getClientSnapshot(): boolean {
  return navigator.onLine;
}

// During SSR we cannot know the user's connectivity; assume online so the
// first client render matches the server and hydration succeeds. The real
// value is read from `navigator.onLine` immediately after mount via the
// `online`/`offline` events.
function getServerSnapshot(): boolean {
  return true;
}

export function useOnlineStatus(): boolean {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}
