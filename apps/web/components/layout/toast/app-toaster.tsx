"use client";

import { type CSSProperties } from "react";
import { Toaster } from "sonner";

import "sonner/dist/styles.css";
import styles from "./app-toaster.module.scss";

export function AppToaster() {
  return (
    <Toaster
      className={styles.toaster}
      theme="dark"
      position="top-center"
      richColors
      closeButton
      duration={5000}
      style={{ "--width": "min(500px, calc(100vw - 32px))" } as CSSProperties}
      toastOptions={{
        classNames: {
          toast: styles.toast,
          title: styles.toastTitle,
          description: styles.toastDescription,
        },
      }}
    />
  );
}
