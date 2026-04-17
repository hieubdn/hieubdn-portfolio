"use client";

import { useEffect } from "react";
import styles from "./error.module.scss";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>Something went wrong</h1>
      <button type="button" className={styles.retry} onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
