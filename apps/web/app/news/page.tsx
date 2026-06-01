import type { Metadata } from "next";

import NewsSection from "@/components/pages/news/news-section";
import styles from "@/app/page.module.scss";

export const metadata: Metadata = {
  title: "Tech News",
  description:
    "Latest tech articles curated from Dev.to, Hacker News, TechCrunch and InfoQ.",
};

export default function NewsPage() {
  return (
    <div className={styles.home}>
      <NewsSection />
    </div>
  );
}
