// =============================================================================
// AURA LUMINA - ABAYA PRODUCTS DATA
// =============================================================================
// Centralized abaya product data
// Used in: Home page (Featured Abayas), Lookbooks page (Shop Our Favorites)
// =============================================================================

import { Abaya } from "./types";

// -----------------------------------------------------------------------------
// ALL ABAYAS
// -----------------------------------------------------------------------------

export const abayas: Abaya[] = [
  // Featured Abayas (Home Page + Lookbooks)
  {
    id: "abaya-001",
    slug: "jasmine-embroidered-abaya",
    titleKey: "abaya1",
    price: "1,850 MAD",
    image: "/images/abaya-1.svg",
    colors: ["Black", "Navy", "Burgundy"],
    badge: "new",
    filterCategory: "new",
    featured: true,
    lookbookFeatured: true,
    href: "/lookbooks",
  },
  {
    id: "abaya-002",
    slug: "pearl-silk-abaya",
    titleKey: "abaya2",
    price: "2,200 MAD",
    image: "/images/abaya-2.svg",
    colors: ["Dusty Rose", "Mauve", "Blush"],
    filterCategory: "formal",
    featured: true,
    lookbookFeatured: true,
    href: "/lookbooks",
  },
  {
    id: "abaya-003",
    slug: "classic-black-gold-trim",
    titleKey: "abaya3",
    price: "1,650 MAD",
    image: "/images/abaya-3.svg",
    colors: ["Black", "White", "Cream"],
    badge: "bestseller",
    filterCategory: "bestseller",
    featured: true,
    lookbookFeatured: true,
    href: "/lookbooks",
  },
  {
    id: "abaya-004",
    slug: "nour-collection-abaya",
    titleKey: "abaya4",
    price: "1,450 MAD",
    image: "/images/abaya-4.svg",
    colors: ["Emerald", "Ruby", "Sapphire"],
    badge: "new",
    filterCategory: "new",
    featured: true,
    lookbookFeatured: true,
    href: "/lookbooks",
  },
  // Additional Lookbook Abayas
  {
    id: "abaya-005",
    slug: "minimalist-linen-abaya",
    titleKey: "lbProd5Title",
    price: "1,250 MAD",
    image: "/images/abaya-5.svg",
    colors: ["Black"],
    filterCategory: "everyday",
    lookbookFeatured: true,
    href: "/lookbooks",
  },
  {
    id: "abaya-006",
    slug: "evening-velvet-abaya",
    titleKey: "lbProd6Title",
    price: "2,400 MAD",
    image: "/images/abaya-6.svg",
    colors: ["Black", "Navy"],
    filterCategory: "formal",
    lookbookFeatured: true,
    href: "/lookbooks",
  },
  // Sale item
  {
    id: "abaya-007",
    slug: "embroidered-everyday-abaya",
    titleKey: "lbProd1Title",
    price: "150 MAD",
    originalPrice: "200 MAD",
    image: "/images/abaya-1.svg",
    colors: ["Black", "Navy", "Burgundy"],
    badge: "sale",
    filterCategory: "sale",
    lookbookFeatured: true,
    href: "/lookbooks",
  },
];

// -----------------------------------------------------------------------------
// HELPER FUNCTIONS
// -----------------------------------------------------------------------------

/**
 * Get abayas for the home page "Featured Abaya Styles" section
 */
export const getFeaturedAbayas = () =>
  abayas.filter((a) => a.featured === true);

/**
 * Get abayas for the lookbook "Shop Our Favorites" section
 */
export const getLookbookFeaturedAbayas = () =>
  abayas.filter((a) => a.lookbookFeatured === true);
