import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  APP_LOCALE_CODES,
  PROFILE_LOCALE_STORAGE_KEY,
} from "@/components/layout/setting/translate/locale-constants";
import { PROFILE_DARK_MODE_STORAGE_KEY } from "@/components/theme/theme-constants";
import { AppShell } from "./app-shell";
import { AppProviders } from "./providers";
import "./globals.scss";

const themeAndLocaleInitScript = `(function(){try{var dk=${JSON.stringify(PROFILE_DARK_MODE_STORAGE_KEY)};var v=localStorage.getItem(dk)||"off";var dark=v==="on"||(v==="automatic"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.setAttribute("data-theme",dark?"dark":"light");var lk=${JSON.stringify(PROFILE_LOCALE_STORAGE_KEY)};var codes=${JSON.stringify([...APP_LOCALE_CODES])};var lr=localStorage.getItem(lk);if(lr&&codes.indexOf(lr)!==-1){document.documentElement.setAttribute("lang",lr);}}catch(e){}})();`;

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          id="theme-and-locale-init"
          dangerouslySetInnerHTML={{ __html: themeAndLocaleInitScript }}
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#5c5c5c" /> 
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="hieubdn" />
      </head>
      <body>
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
        <SpeedInsights />
      </body>
    </html>
  );
}