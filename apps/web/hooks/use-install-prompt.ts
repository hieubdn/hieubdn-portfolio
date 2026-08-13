"use client";

import { useCallback, useEffect, useState } from "react";

type InstallPromptOutcome = "accepted" | "dismissed";

type BeforeInstallPromptEventLike = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: InstallPromptOutcome }>;
};

export function useInstallPrompt(): {
  canInstall: boolean;
  promptInstall: () => Promise<void>;
} {
  const [deferred, setDeferred] =
    useState<BeforeInstallPromptEventLike | null>(null);

  useEffect(() => {
    function onBeforeInstall(e: Event) {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEventLike);
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    return () =>
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);

  const promptInstall = useCallback(async () => {
    if (!deferred) return;
    await deferred.prompt().catch(() => undefined);
    await deferred.userChoice.catch(() => undefined);
    setDeferred(null);
  }, [deferred]);

  return {
    canInstall: deferred !== null,
    promptInstall,
  };
}
