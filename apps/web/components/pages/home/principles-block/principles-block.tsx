import { getNews } from "@/lib/news";

import PrinciplesBlockView from "./principles-block-view";

export default async function PrinciplesBlock() {
  const articles = await getNews();
  return <PrinciplesBlockView articles={articles.slice(0, 3)} />;
}
