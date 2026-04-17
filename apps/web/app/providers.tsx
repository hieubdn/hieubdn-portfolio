"use client";

import { type ReactNode } from "react";
import { MainScreenProvider } from "@/components/layout/main-screen/main-screen-context";
import { NotificationFeedProvider } from "@/components/layout/notification/notification-feed-context";
import { NotificationProvider } from "@/components/layout/notification/notification-context";
import { LocaleProvider } from "@/components/layout/setting/translate/locale-provider";
import type { AppLocaleCode } from "@/components/layout/setting/translate/locale-constants";
import { AppToaster } from "@/components/layout/toast/app-toaster";
import { OfflineBanner } from "@/components/pwa/offline-banner";
import { ThemePreferenceProvider } from "@/components/theme/theme-preference-provider";
import { ThemeInitScript } from "./theme-init-script";

export function AppProviders({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale: AppLocaleCode;
}) {
  return (
    <>
      <ThemeInitScript />
      <ThemePreferenceProvider>
        <LocaleProvider initialLocale={initialLocale}>
          <OfflineBanner />
          <NotificationFeedProvider>
            <NotificationProvider>
              <MainScreenProvider>{children}</MainScreenProvider>
            </NotificationProvider>
          </NotificationFeedProvider>
        </LocaleProvider>
        <AppToaster />
      </ThemePreferenceProvider>
    </>
  );
}
