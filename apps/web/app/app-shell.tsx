"use client";

import { type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/footer";
import MainContent from "@/components/layout/main-content/main-content";
import { PATH_URL } from "@/config/path";
import layoutStyles from "./layout.module.scss";

const HEADERLESS_PATHS: readonly string[] = [PATH_URL.ACADIFY];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideHeader = HEADERLESS_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  return (
    <div className={`${layoutStyles.shell} ${layoutStyles.mainApp}`}>
      {!hideHeader && <Header />}
      <MainContent className={layoutStyles.main}>{children}</MainContent>
      <Footer />
    </div>
  );
}
