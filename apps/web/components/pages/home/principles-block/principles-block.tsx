import Link from "next/link";

import { getNews } from "@/lib/news";
import { PATH_URL } from "@/config/path";

import styles from "./principles-block.module.scss";

const SOURCE_COLORS: Record<string, string> = {
  devto: "#0a0a0a",
  hackernews: "#ff6600",
  techcrunch: "#0f9d58",
  infoq: "#0072b8",
};

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3_600_000);
  if (h < 1) return "< 1h ago";
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export default async function PrinciplesBlock() {
  const articles = await getNews();
  const preview = articles.slice(0, 3);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <span className={styles.label}>Tech News</span>

      </div>

      <ul className={styles.list} role="list">
        {preview.length === 0 && (
          <li className={styles.empty}>No articles available.</li>
        )}
        {preview.map((article) => (
          <li key={article.id} className={styles.item}>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              <span
                className={styles.dot}
                style={{ background: SOURCE_COLORS[article.source] ?? "#888" }}
                aria-hidden
              />
              <span className={styles.title}>{article.title}</span>
              <span className={styles.time}>{relativeTime(article.publishedAt)}</span>
            </a>
          </li>
        ))}
      </ul>

        <Link href={PATH_URL.NEWS} className={styles.viewAll} prefetch={false}>
          View all →
        </Link>
    </div>
  );
}
