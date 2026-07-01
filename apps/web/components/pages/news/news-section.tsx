import { getNews } from "@/lib/news";

import NewsSectionHeader from "./news-section-header";
import NewsCard from "./news-card/news-card";
import styles from "./news-section.module.scss";

export default async function NewsSection() {
  const articles = await getNews();

  return (
    <section className={styles.root} aria-label="Tech news">
      <NewsSectionHeader />

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
