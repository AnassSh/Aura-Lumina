import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://auralumina.com";

  // Static pages
  const staticPages = [
    "",
    "/blog",
    "/beauty",
    "/lookbooks",
    "/shops",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Blog posts
  const blogPosts = [
    "ultimate-guide-styling-abaya",
    "halal-skincare-complete-guide",
  ].map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Shop profiles
  const shops = ["dar-el-yasmine", "atelier-nour"].map((slug) => ({
    url: `${baseUrl}/shops/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Shop product listings
  const shopProducts = ["dar-el-yasmine", "atelier-nour"].map((slug) => ({
    url: `${baseUrl}/shops/${slug}/products`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Individual products
  const products = [
    { shop: "dar-el-yasmine", product: "jasmine-embroidered-abaya" },
    { shop: "dar-el-yasmine", product: "pearl-silk-abaya" },
    { shop: "dar-el-yasmine", product: "classic-black-gold-trim" },
    { shop: "atelier-nour", product: "nour-collection-abaya" },
    { shop: "atelier-nour", product: "minimalist-linen-abaya" },
    { shop: "atelier-nour", product: "evening-velvet-abaya" },
  ].map(({ shop, product }) => ({
    url: `${baseUrl}/shops/${shop}/products/${product}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPosts, ...shops, ...shopProducts, ...products];
}

