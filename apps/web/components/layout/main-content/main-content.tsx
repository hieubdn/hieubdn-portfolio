"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import Setting from "@/components/layout/setting/setting";
import { useMainScreen } from "@/components/layout/main-screen/main-screen-context";

type MainContentProps = {
  children: ReactNode;
  className?: string;
};

export default function MainContent({ children, className = "" }: MainContentProps) {
  const pathname = usePathname();
  const { view, showRouteView } = useMainScreen();
  const prevPathname = useRef<string | null>(null);

  useEffect(() => {
    if (prevPathname.current === null) {
      prevPathname.current = pathname;
      return;
    }
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      showRouteView();
    }
  }, [pathname, showRouteView]);

  return (
    <main className={className}>
      {view === "setting" ? <Setting /> : children}
    </main>
  );
}
