import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Viewport } from "next";
import { cookies } from "next/headers";
import {
  DEFAULT_APP_LOCALE,
  isAppLocaleCode,
  PROFILE_LOCALE_STORAGE_KEY,
} from "@/components/layout/setting/translate/locale-constants";
import { loadLocaleMessages } from "@/lib/i18n/load-messages";
import { getSiteUrl } from "@/lib/site-url";
import { SOCIAL_LINKS } from "@/config/path";
import { AppShell } from "./app-shell";
import { AppProviders } from "./providers";
import "./globals.scss";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL(getSiteUrl()),
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
  // `en` is already in the client bundle as the fallback dictionary; only
  // inline the dictionary for non-default locales.
  const initialMessages =
    initialLocale === DEFAULT_APP_LOCALE
      ? undefined
      : await loadLocaleMessages(initialLocale);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Bùi Đỗ Ngọc Hiếu",
    alternateName: "hieubdn",
    jobTitle: "Software Engineer",
    url: getSiteUrl(),
    email: "mailto:hieubdn@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Da Nang",
      addressCountry: "VN",
    },
    sameAs: [
      SOCIAL_LINKS.GITHUB,
      SOCIAL_LINKS.LINKEDIN,
      SOCIAL_LINKS.INSTAGRAM,
      SOCIAL_LINKS.FACEBOOK,
    ],
  };

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <AppProviders
          initialLocale={initialLocale}
          initialMessages={initialMessages}
        >
          <AppShell>{children}</AppShell>
        </AppProviders>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}