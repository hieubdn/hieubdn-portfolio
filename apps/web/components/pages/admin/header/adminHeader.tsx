"use client";

import { useState } from "react";
import { AdminLogin } from "@/assets/svg";
import { PATH_URL } from "@/config/path";
import { GlobalActionsMenu } from "@/components/layout/global-actions/global-actions-menu";
import { signOut } from "next-auth/react";
import styles from "./styles.module.scss";

export default function AdminHeader() {
  const [logoutError, setLogoutError] = useState<string | null>(null);

  async function handleLogout() {
    setLogoutError(null);
    try {
      await signOut({ callbackUrl: PATH_URL.ADMIN_LOGIN });
    } catch {
      setLogoutError("Could not sign out. Try again.");
    }
  }

  return (
    <header className={styles.adminHeader}>
      <div className={styles.inner}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>Admin</h1>
          {logoutError ? (
            <p className={styles.logoutError} role="alert">
              {logoutError}
            </p>
          ) : null}
        </div>
        <GlobalActionsMenu
          thirdItem={{
            label: "Logout",
            icon: <AdminLogin />,
            onSelect: () => {
              void handleLogout();
            },
          }}
        />
      </div>
    </header>
  );
}
