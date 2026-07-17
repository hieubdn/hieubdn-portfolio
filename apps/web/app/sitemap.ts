import type { MetadataRoute } from "next";

import { PATH_URL } from "@/config/path";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const routes = Array.from(new Set(Object.values(PATH_URL)));

  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === PATH_URL.ROOT ? 1 : 0.7,
  }));
}
