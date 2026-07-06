import { getNews } from "@/lib/news";

import NewsSectionHeader from "./news-section-header";
import NewsCard from "./news-card/news-card";
import { Reveal } from "@/components/ui/reveal";
import styles from "./news-section.module.scss";

const CARD_REVEAL_STAGGER_MS = 50;

export default async function NewsSection() {
  const articles = await getNews();

  return (
    <section className={styles.root} aria-label="Tech news">
      <NewsSectionHeader />

      {articles.length === 0 ? (
        <p className={styles.empty}>Unable to load articles right now.</p>
      ) : (
        <ul className={styles.grid} role="list">
          {articles.map((article, index) => (
            <Reveal
              as="li"
              key={article.id}
              delayMs={(index % 6) * CARD_REVEAL_STAGGER_MS}
            >
              <NewsCard article={article} />
            </Reveal>
          ))}
        </ul>
      )}
    </section>
  );
}
