import type { Metadata } from "next";

import styles from "./page.module.scss";
import HomeSection from "@/components/pages/home/home";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className={styles.home}>
      <HomeSection />
    </div>
  );
}