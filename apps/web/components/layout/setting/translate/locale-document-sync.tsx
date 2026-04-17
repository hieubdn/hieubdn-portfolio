"use client";

import { useLayoutEffect, type ReactNode } from "react";

import { readStoredLocale } from "./locale-constants";

export function LocaleDocumentSync({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    document.documentElement.lang = readStoredLocale();
  }, []);

  return children;
}
