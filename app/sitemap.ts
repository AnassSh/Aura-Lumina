import type { MetadataRoute } from "next";
import { getAllShopSlugsAsync, getShopProductListingsAsync } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://auralumina.com";

  const staticPages = ["", "/blog", "/beauty", "/lookbooks", "/shops"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })
  );

  const blogPosts = [
    "ultimate-guide-styling-abaya",
    "halal-skincare-complete-guide",
  ].map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const shopSlugs = await getAllShopSlugsAsync();
  const shops = shopSlugs.map((slug) => ({
    url: `${baseUrl}/shops/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const shopProducts = shopSlugs.map((slug) => ({
    url: `${baseUrl}/shops/${slug}/products`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const listings = await getShopProductListingsAsync();
  const products = listings.map(
    (l) => ({
      url: `${baseUrl}/shops/${l.shopSlug}/products/${l.productSlug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })
  );

  return [...staticPages, ...blogPosts, ...shops, ...shopProducts, ...products];
}
