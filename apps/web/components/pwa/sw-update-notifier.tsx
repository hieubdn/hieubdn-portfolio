"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";

const TOAST_ID = "pwa-update";

export function ServiceWorkerUpdateNotifier() {
  const { t } = useLocaleText();
  const tRef = useRef(t);
  tRef.current = t;

  useEffect(() => {
    if (typeof navigator === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    let hadController = Boolean(navigator.serviceWorker.controller);

    function notify() {
      toast(tRef.current("pwa.update.title"), {
        id: TOAST_ID,
        description: tRef.current("pwa.update.description"),
        duration: Infinity,
        action: {
          label: tRef.current("pwa.update.refresh"),
          onClick: () => window.location.reload(),
        },
      });
    }

    function onControllerChange() {
      if (!hadController) {
        hadController = true;
        return;
      }
      notify();
    }

    async function checkWaiting() {
      try {
        const reg = await navigator.serviceWorker.getRegistration();
        if (reg?.waiting) notify();
      } catch {
        /* registration unavailable */
      }
    }

    navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);
    void checkWaiting();

    return () => {
      navigator.serviceWorker.removeEventListener(
        "controllerchange",
        onControllerChange,
      );
    };
  }, []);

  return null;
}
