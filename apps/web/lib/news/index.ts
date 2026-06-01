import { unstable_cache } from "next/cache";

import {
  fetchDevTo,
  fetchHackerNews,
  fetchInfoQ,
  fetchTechCrunch,
} from "./fetchers";
import type { NewsArticle } from "./types";

const MAX_ARTICLES = 10;

async function fetchAllNews(): Promise<NewsArticle[]> {
  const results = await Promise.allSettled([
    fetchDevTo(),
    fetchHackerNews(),
    fetchTechCrunch(),
    fetchInfoQ(),
  ]);

  const articles: NewsArticle[] = results
    .filter(
      (r): r is PromiseFulfilledResult<NewsArticle[]> =>
        r.status === "fulfilled",
    )
    .flatMap((r) => r.value);

  const seen = new Set<string>();
  const deduped = articles.filter((a) => {
    if (seen.has(a.url)) return false;
    seen.add(a.url);
    return true;
  });

  return deduped
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, MAX_ARTICLES);
}

export const getNews = unstable_cache(fetchAllNews, ["news-articles"], {
  revalidate: 900,
});

export type { NewsArticle, NewsSource } from "./types";
