"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import styles from "./template.module.scss";

// App Router remounts the template on every navigation, so only the enter
// animation ever plays — a CSS animation keyed by pathname matches the
// previous framer-motion behavior without shipping the library.
export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className={styles.pageEnter}>
      {children}
    </div>
  );
}
