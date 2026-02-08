// =============================================================================
// AURA LUMINA - LOOKBOOKS DATA
// =============================================================================
// Centralized lookbook collection data
// Used in: Lookbooks page, Home page
// =============================================================================

import { Lookbook, LatestPost, ShopTheLook } from "./types";

// -----------------------------------------------------------------------------
// LOOKBOOK COLLECTIONS
// -----------------------------------------------------------------------------

export const lookbooks: Lookbook[] = [
  {
    id: 1,
    titleKey: "lb1Title",
    descKey: "lb1Desc",
    image: "/images/lookbook-1.svg",
    itemCount: 12,
    slug: "winter-elegance-2026",
  },
  {
    id: 2,
    titleKey: "lb2Title",
    descKey: "lb2Desc",
    image: "/images/lookbook-2.svg",
    itemCount: 18,
    slug: "everyday-essentials",
  },
  {
    id: 3,
    titleKey: "lb3Title",
    descKey: "lb3Desc",
    image: "/images/lookbook-3.svg",
    itemCount: 8,
    slug: "special-occasions",
  },
  {
    id: 4,
    titleKey: "lb4Title",
    descKey: "lb4Desc",
    image: "/images/lookbook-4.svg",
    itemCount: 15,
    slug: "spring-awakening",
  },
];

// -----------------------------------------------------------------------------
// CATEGORY FILTERS (for lookbook page)
// -----------------------------------------------------------------------------

export const lookbookCategories = [
  "catAll",
  "catNewArrivals",
  "catBestsellers",
  "catOnSale",
  "catEveryday",
  "catFormal",
] as const;

// -----------------------------------------------------------------------------
// LATEST BLOG POSTS (for Home page)
// -----------------------------------------------------------------------------

export const latestPosts: LatestPost[] = [
  {
    id: 1,
    titleKey: "post1Title",
    excerptKey: "post1Excerpt",
    image: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=800&h=600&fit=crop&q=80",
    date: "December 8, 2024",
    slug: "ultimate-guide-styling-abaya",
  },
  {
    id: 2,
    titleKey: "post2Title",
    excerptKey: "post2Excerpt",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=600&fit=crop&q=80",
    date: "December 5, 2024",
    slug: "modest-fashion-trends-2025",
  },
  {
    id: 3,
    titleKey: "post3Title",
    excerptKey: "post3Excerpt",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80",
    date: "December 1, 2024",
    slug: "capsule-modest-wardrobe",
  },
];

// -----------------------------------------------------------------------------
// SHOP THE LOOK (for Home page)
// -----------------------------------------------------------------------------

export const shopTheLook: ShopTheLook[] = [
  {
    id: 1,
    titleKey: "look1Title",
    itemKeys: ["look1Item1", "look1Item2", "look1Item3"] as const,
    image: "/images/look-1.svg",
    totalPrice: "$349",
  },
  {
    id: 2,
    titleKey: "look2Title",
    itemKeys: ["look2Item1", "look2Item2", "look2Item3"] as const,
    image: "/images/look-2.svg",
    totalPrice: "$425",
  },
];

// -----------------------------------------------------------------------------
// HELPER FUNCTIONS
// -----------------------------------------------------------------------------

/**
 * Get all lookbooks
 */
export const getAllLookbooks = () => lookbooks;

/**
 * Get latest blog posts for home page
 */
export const getLatestPosts = () => latestPosts;

/**
 * Get shop the look items
 */
export const getShopTheLook = () => shopTheLook;
