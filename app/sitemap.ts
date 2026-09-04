import type { MetadataRoute } from "next";

const siteUrl = "https://kyounoun.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/love", "/about", "/privacy", "/contact"];
  const dailyRoutes = new Set(["", "/love"]);
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: dailyRoutes.has(route) ? "daily" : "monthly",
    priority: route === "" ? 1 : dailyRoutes.has(route) ? 0.8 : 0.5,
  }));
}
