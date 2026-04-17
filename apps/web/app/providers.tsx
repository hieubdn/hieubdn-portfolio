"use client";

import { type ReactNode } from "react";
import { MainScreenProvider } from "@/components/layout/main-screen/main-screen-context";
import { NotificationFeedProvider } from "@/components/layout/notification/notification-feed-context";
import { NotificationProvider } from "@/components/layout/notification/notification-context";
import { LocaleProvider } from "@/components/layout/setting/translate/locale-provider";
import { AppToaster } from "@/components/layout/toast/app-toaster";
import { ThemePreferenceProvider } from "@/components/theme/theme-preference-provider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemePreferenceProvider>
      <LocaleProvider>
        <NotificationFeedProvider>
          <NotificationProvider>
            <MainScreenProvider>{children}</MainScreenProvider>
          </NotificationProvider>
        </NotificationFeedProvider>
      </LocaleProvider>
      <AppToaster />
    </ThemePreferenceProvider>
  );
}
