"use client";

import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/footer";
import MainContent from "@/components/layout/main-content/main-content";
import AdminHeader from "@/components/pages/admin/header/adminHeader";
import { isAdminAppPath, PATH_URL } from "@/config/path";
import layoutStyles from "./layout.module.scss";

function isAdminPath(pathname: string | null): boolean {
  if (!pathname) return false;
  return (
    pathname === PATH_URL.ADMIN || pathname.startsWith(`${PATH_URL.ADMIN}/`)
  );
}

function showAdminHeader(pathname: string | null): boolean {
  return isAdminAppPath(pathname);
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideHeader = isAdminPath(pathname);

  return (
    <div className={`${layoutStyles.shell} ${layoutStyles.mainApp}`}>
      {!hideHeader ? <Header /> : null}
      {showAdminHeader(pathname) ? <AdminHeader /> : null}
      <MainContent className={layoutStyles.main}>{children}</MainContent>
      <Footer />
    </div>
  );
}
