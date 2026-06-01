import { getNews } from "@/lib/news";

import NewsCard from "./news-card/news-card";
import styles from "./news-section.module.scss";

export default async function NewsSection() {
  const articles = await getNews();

  return (
    <section className={styles.root} aria-label="Tech news">
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>Curated from Dev.to, Hacker News, TechCrunch &amp; InfoQ</p>
          <h1 className={styles.heading}>Tech News</h1>
        </div>
        <p className={styles.subtitle}>
          Latest {articles.length} articles · refreshed every 15 min
        </p>
      </header>

      {articles.length === 0 ? (
        <p className={styles.empty}>Unable to load articles right now.</p>
      ) : (
        <ul className={styles.grid} role="list">
          {articles.map((article) => (
            <li key={article.id}>
              <NewsCard article={article} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
