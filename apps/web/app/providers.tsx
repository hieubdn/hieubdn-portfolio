"use client";

import { type ReactNode } from "react";
import { MainScreenProvider } from "@/components/layout/main-screen/main-screen-context";
import { NotificationFeedProvider } from "@/components/layout/notification/notification-feed-context";
import { NotificationProvider } from "@/components/layout/notification/notification-context";
import { LocaleProvider } from "@/components/layout/setting/translate/locale-provider";
import type { AppLocaleCode } from "@/components/layout/setting/translate/locale-constants";
import { AppToaster } from "@/components/layout/toast/app-toaster";
import { InstallPrompt } from "@/components/pwa/install-prompt";
import { OfflineBanner } from "@/components/pwa/offline-banner";
import { ServiceWorkerUpdateNotifier } from "@/components/pwa/sw-update-notifier";
import { StandaloneViewportLock } from "@/components/pwa/standalone-viewport-lock";

export function AppProviders({
  children,
  initialLocale,
  initialMessages,
}: {
  children: ReactNode;
  initialLocale: AppLocaleCode;
  initialMessages?: Record<string, string>;
}) {
  return (
    <>
      <StandaloneViewportLock />
      <LocaleProvider
        initialLocale={initialLocale}
        initialMessages={initialMessages}
      >
        <OfflineBanner />
        <NotificationFeedProvider>
          <NotificationProvider>
            <MainScreenProvider>{children}</MainScreenProvider>
          </NotificationProvider>
        </NotificationFeedProvider>
        <InstallPrompt />
        <ServiceWorkerUpdateNotifier />
      </LocaleProvider>
      <AppToaster />
    </>
  );
}
