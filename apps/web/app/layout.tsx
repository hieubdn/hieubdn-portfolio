import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Viewport } from "next";
import { cookies } from "next/headers";
import {
  DEFAULT_APP_LOCALE,
  isAppLocaleCode,
  PROFILE_LOCALE_STORAGE_KEY,
} from "@/components/layout/setting/translate/locale-constants";
import { AppShell } from "./app-shell";
import { AppProviders } from "./providers";
import "./globals.scss";

function resolveMetadataBaseUrl(): string {
  const site = process.env.NEXT_SITE_URL?.trim();
  if (site) {
    return /^https?:\/\//i.test(site) ? site : `https://${site}`;
  }
  if (process.env.VERCEL_URL != null) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL(resolveMetadataBaseUrl()),
  title: 'hieubdn - Portfolio',
  description: 'Bùi Đỗ Ngọc Hiếu portfolio - Full Stack Developer',
  openGraph: {
    title: 'hieubdn - Portfolio',
    description: 'Bùi Đỗ Ngọc Hiếu portfolio - Full Stack Developer',
    url: process.env.NEXT_SITE_URL,
    siteName: 'hieubdn',
    type: 'website',
    images: [
      {
        url: '/icons/icon-192.png',
        width: 192,
        height: 192,
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'hieubdn - Portfolio',
    description: 'Bùi Đỗ Ngọc Hiếu portfolio - Full Stack Developer',
    images: ['/icons/icon-192.png'],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const raw = cookieStore.get(PROFILE_LOCALE_STORAGE_KEY)?.value;
  const initialLocale =
    raw && isAppLocaleCode(raw) ? raw : DEFAULT_APP_LOCALE;

  return (
    <html lang={initialLocale} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="hieubdn" />
      </head>
      <body>
        <AppProviders initialLocale={initialLocale}>
          <AppShell>{children}</AppShell>
        </AppProviders>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}