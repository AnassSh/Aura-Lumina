// =============================================================================
// AURA LUMINA - BEAUTY PRODUCTS DATA
// =============================================================================
// Centralized beauty product data
// Used in: Beauty page (Editor's Picks), Home page (Beauty Tips)
// =============================================================================

import { BeautyProduct, BeautyTip } from "./types";

// -----------------------------------------------------------------------------
// EDITOR'S PICKS PRODUCTS
// -----------------------------------------------------------------------------

export const beautyProducts: BeautyProduct[] = [
  {
    id: 1,
    name: "Rose Water Toner",
    brand: "Pure Halal Beauty",
    price: "$24",
    image: "/images/product-1.svg",
    featured: true,
  },
  {
    id: 2,
    name: "Argan Oil Serum",
    brand: "Moroccan Gold",
    price: "$38",
    image: "/images/product-2.svg",
    featured: true,
  },
  {
    id: 3,
    name: "Honey Lip Balm Set",
    brand: "Natural Bee",
    price: "$16",
    image: "/images/product-3.svg",
    featured: true,
  },
  {
    id: 4,
    name: "Vitamin C Moisturizer",
    brand: "Glow Lab",
    price: "$42",
    image: "/images/product-4.svg",
    featured: true,
  },
  {
    id: 5,
    name: "Lavender Hydrating Toner",
    brand: "Calm Skin Co",
    price: "$22",
    image: "/images/product-1.svg",
    featured: true,
  },
  {
    id: 6,
    name: "Pomegranate Brightening Serum",
    brand: "Radiance Lab",
    price: "$36",
    image: "/images/product-2.svg",
    featured: true,
  },
  {
    id: 7,
    name: "Shea Butter Hand Cream",
    brand: "Hand Care",
    price: "$18",
    image: "/images/product-3.svg",
    featured: true,
  },
  {
    id: 8,
    name: "Orange Blossom Face Mist",
    brand: "Scent & Glow",
    price: "$20",
    image: "/images/product-4.svg",
    featured: true,
  },
];

// -----------------------------------------------------------------------------
// BEAUTY TIPS (for Home page)
// -----------------------------------------------------------------------------

export const beautyTips: BeautyTip[] = [
  {
    id: 1,
    titleKey: "beautyTip1Title",
    descKey: "beautyTip1Desc",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=450&fit=crop&q=80",
    categoryKey: "makeup",
    slug: "natural-glow-makeup-tutorial",
  },
  {
    id: 2,
    titleKey: "beautyTip2Title",
    descKey: "beautyTip2Desc",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=450&fit=crop&q=80",
    categoryKey: "skincare",
    slug: "halal-skincare-complete-guide",
  },
  {
    id: 3,
    titleKey: "beautyTip3Title",
    descKey: "beautyTip3Desc",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=450&fit=crop&q=80",
    categoryKey: "products",
    slug: "top-halal-beauty-brands",
  },
]

// -----------------------------------------------------------------------------
// QUICK TIPS (for Beauty page)
// -----------------------------------------------------------------------------

export const quickTips = [
  { icon: "💧", titleKey: "tip1Title", textKey: "tip1Text" },
  { icon: "🌙", titleKey: "tip2Title", textKey: "tip2Text" },
  { icon: "☀️", titleKey: "tip3Title", textKey: "tip3Text" },
  { icon: "🥗", titleKey: "tip4Title", textKey: "tip4Text" },
] as const;

// -----------------------------------------------------------------------------
// HELPER FUNCTIONS
// -----------------------------------------------------------------------------

/**
 * Get featured products for "Editor's Picks"
 */
export const getEditorsPicks = () =>
  beautyProducts.filter((p) => p.featured === true);

/**
 * Get beauty tips for home page
 */
export const getBeautyTips = () => beautyTips;
