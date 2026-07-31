"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, type ReactNode } from "react";

import styles from "./template.module.scss";

// App Router remounts the template on every navigation, so only the enter
// animation ever plays — a CSS animation keyed by pathname matches the
// previous framer-motion behavior without shipping the library.
export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // The browser keeps the previous page's scroll offset across navigations
  // (clamping it if the new page is shorter), so a nav to a shorter page can
  // land mid-page/at the footer instead of the top. Reset it on every route
  // change, before paint, to avoid a visible jump.
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div key={pathname} className={styles.pageEnter}>
      {children}
    </div>
  );
}
