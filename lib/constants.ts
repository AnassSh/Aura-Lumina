export const SITE_CONFIG = {
  name: "Aura Lumina",
  description: "Modest Fashion & Beauty",
  url: "https://auralumina.com",
  ogImage: "/images/og-image.jpg",
  links: {
    instagram: "https://instagram.com/auralumina",
    pinterest: "https://pinterest.com/auralumina",
    tiktok: "https://tiktok.com/@auralumina",
    youtube: "https://youtube.com/@auralumina",
  },
};

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Abayas", href: "/lookbooks" },
  { name: "Modest Fashion", href: "/lookbooks" },
  { name: "Beauty", href: "/beauty" },
  { name: "Blog", href: "/blog" },
] as const;

export const CATEGORIES = {
  fashion: ["Abayas", "Modest Dresses", "Everyday", "Formal", "Accessories"],
  beauty: ["Skincare", "Makeup", "Hair Care", "Wellness", "DIY"],
  blog: ["Style Guide", "Trends", "Beauty", "Wardrobe", "Occasions"],
} as const;

