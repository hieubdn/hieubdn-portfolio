"use client";

import { useInsertionEffect } from "react";

const THEME_INIT_SRC = "/theme-init.js";
const THEME_INIT_ID = "theme-and-locale-init";

/**
 * Loads public/theme-init.js without a script element in the React tree
 * (React 19 warns on that). Inserts a classic script via the DOM API.
 */
export function ThemeInitScript() {
  useInsertionEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById(THEME_INIT_ID)) return;
    const el = document.createElement("script");
    el.id = THEME_INIT_ID;
    el.async = false;
    el.src = THEME_INIT_SRC;
    document.head.prepend(el);
  }, []);

  return null;
}
