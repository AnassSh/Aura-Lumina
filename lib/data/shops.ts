// =============================================================================
// AURA LUMINA - SHOP PARTNERS DATA
// =============================================================================
// Centralized shop/partner data
// Used in: Home page (Partner Shops), Shops listing, Shop profile pages
// =============================================================================

import { Shop, ShopListing, ShopProductListing } from "./types";

// -----------------------------------------------------------------------------
// FULL SHOP DATA (for profile pages)
// -----------------------------------------------------------------------------

export const shops: Record<string, Shop> = {
  "dar-el-yasmine": {
    slug: "dar-el-yasmine",
    name: "Dar El Yasmine",
    tagline: "Where tradition meets modern elegance",
    location: {
      city: "Casablanca",
      neighborhood: "Maarif",
      address: "45 Rue Ibn Batouta, Maarif, Casablanca",
      mapUrl: "https://maps.google.com/?q=Maarif+Casablanca",
    },
    contact: {
      phone: "+212 522 123 456",
      whatsapp: "+212661234567",
      instagram: "darelysamine_casa",
    },
    story: `Dar El Yasmine was founded in 2015 by Fatima Bennani, a passionate artisan who learned the art of abaya-making from her grandmother in Fes. What started as a small corner in her family home has blossomed into one of Casablanca's most beloved modest fashion boutiques.

Every piece at Dar El Yasmine is crafted with intention. Fatima works directly with local seamstresses, ensuring fair wages and preserving traditional Moroccan embroidery techniques. Her philosophy is simple: "Elegance should never compromise comfort, and beauty should always tell a story."

When you visit Dar El Yasmine, you're not just shopping—you're becoming part of a community of women who value quality, craftsmanship, and timeless style.`,
    established: "2015",
    image: "/images/shop-hero-1.svg",
    gallery: [
      "/images/shop-gallery-1.svg",
      "/images/shop-gallery-2.svg",
      "/images/shop-gallery-3.svg",
    ],
    specialties: [
      "Handcrafted Abayas",
      "Bridal Collections",
      "Custom Embroidery",
      "Moroccan Kaftans",
    ],
    featuredProducts: [
      {
        id: 1,
        name: "Jasmine Embroidered Abaya",
        price: "1,850 MAD",
        image: "/images/abaya-1.svg",
        slug: "jasmine-embroidered-abaya",
      },
      {
        id: 2,
        name: "Pearl Silk Abaya",
        price: "2,200 MAD",
        image: "/images/abaya-2.svg",
        slug: "pearl-silk-abaya",
      },
      {
        id: 3,
        name: "Classic Black with Gold Trim",
        price: "1,650 MAD",
        image: "/images/abaya-3.svg",
        slug: "classic-black-gold-trim",
      },
    ],
    hours: {
      weekdays: "10:00 AM - 8:00 PM",
      saturday: "10:00 AM - 9:00 PM",
      sunday: "Closed",
    },
  },
  "atelier-nour": {
    slug: "atelier-nour",
    name: "Atelier Nour",
    tagline: "Light up your modesty",
    location: {
      city: "Rabat",
      neighborhood: "Agdal",
      address: "12 Avenue Fal Ould Oumeir, Agdal, Rabat",
      mapUrl: "https://maps.google.com/?q=Agdal+Rabat",
    },
    contact: {
      phone: "+212 537 654 321",
      whatsapp: "+212662345678",
      instagram: "ateliernour_rabat",
    },
    story: `Atelier Nour began as a dream shared between two sisters, Nadia and Salma, who wanted to create a space where Moroccan women could find modern modest wear that didn't sacrifice style for coverage.

After years of searching for abayas that felt both contemporary and appropriate, they decided to create their own. In 2018, Atelier Nour opened its doors in Rabat's trendy Agdal neighborhood.

The sisters believe that modesty is a personal journey, and their boutique reflects this philosophy. With a warm, welcoming atmosphere and personalized styling consultations, every woman who walks through their doors leaves feeling seen and celebrated.`,
    established: "2018",
    image: "/images/shop-hero-2.svg",
    gallery: [
      "/images/shop-gallery-4.svg",
      "/images/shop-gallery-5.svg",
      "/images/shop-gallery-6.svg",
    ],
    specialties: [
      "Contemporary Abayas",
      "Hijab Styling",
      "Ready-to-Wear",
      "Personal Consultations",
    ],
    featuredProducts: [
      {
        id: 1,
        name: "Nour Collection Abaya",
        price: "1,450 MAD",
        image: "/images/abaya-4.svg",
        slug: "nour-collection-abaya",
      },
      {
        id: 2,
        name: "Minimalist Linen Abaya",
        price: "1,250 MAD",
        image: "/images/abaya-5.svg",
        slug: "minimalist-linen-abaya",
      },
      {
        id: 3,
        name: "Evening Velvet Abaya",
        price: "2,400 MAD",
        image: "/images/abaya-6.svg",
        slug: "evening-velvet-abaya",
      },
    ],
    hours: {
      weekdays: "10:30 AM - 7:30 PM",
      saturday: "11:00 AM - 8:00 PM",
      sunday: "Closed",
    },
  },
};

// -----------------------------------------------------------------------------
// SHOP LISTINGS (for shops page)
// -----------------------------------------------------------------------------

const shopListings: ShopListing[] = Object.values(shops).map((shop) => ({
  slug: shop.slug,
  name: shop.name,
  tagline: shop.tagline,
  city: shop.location.city,
  neighborhood: shop.location.neighborhood,
  image: shop.image,
  specialties: shop.specialties,
  established: shop.established,
}));

// -----------------------------------------------------------------------------
// SHOP PRODUCTS FOR HOME PAGE
// -----------------------------------------------------------------------------

const shopProductListings: ShopProductListing[] = [
  {
    id: 1,
    name: "Jasmine Embroidered Abaya",
    price: "1,850 MAD",
    image: "/images/abaya-1.svg",
    shopName: "Dar El Yasmine",
    shopSlug: "dar-el-yasmine",
    productSlug: "jasmine-embroidered-abaya",
    city: "Casablanca",
  },
  {
    id: 2,
    name: "Pearl Silk Abaya",
    price: "2,200 MAD",
    image: "/images/abaya-2.svg",
    shopName: "Dar El Yasmine",
    shopSlug: "dar-el-yasmine",
    productSlug: "pearl-silk-abaya",
    city: "Casablanca",
  },
  {
    id: 3,
    name: "Nour Collection Abaya",
    price: "1,450 MAD",
    image: "/images/abaya-4.svg",
    shopName: "Atelier Nour",
    shopSlug: "atelier-nour",
    productSlug: "nour-collection-abaya",
    city: "Rabat",
  },
  {
    id: 4,
    name: "Minimalist Linen Abaya",
    price: "1,250 MAD",
    image: "/images/abaya-5.svg",
    shopName: "Atelier Nour",
    shopSlug: "atelier-nour",
    productSlug: "minimalist-linen-abaya",
    city: "Rabat",
  },
  {
    id: 5,
    name: "Classic Black with Gold Trim",
    price: "1,650 MAD",
    image: "/images/abaya-3.svg",
    shopName: "Dar El Yasmine",
    shopSlug: "dar-el-yasmine",
    productSlug: "classic-black-gold-trim",
    city: "Casablanca",
  },
  {
    id: 6,
    name: "Evening Velvet Abaya",
    price: "2,400 MAD",
    image: "/images/abaya-6.svg",
    shopName: "Atelier Nour",
    shopSlug: "atelier-nour",
    productSlug: "evening-velvet-abaya",
    city: "Rabat",
  },
];

// -----------------------------------------------------------------------------
// AVAILABLE CITIES
// -----------------------------------------------------------------------------

export const cities = ["All Cities", "Casablanca", "Rabat", "Marrakech", "Fes"];

// -----------------------------------------------------------------------------
// HELPER FUNCTIONS
// -----------------------------------------------------------------------------

/**
 * Get all shop slugs (for static generation)
 */
export const getAllShopSlugs = () => Object.keys(shops);

/**
 * Get all shop listings
 */
export const getAllShopListings = () => shopListings;

/**
 * Get shop products for home page
 */
export const getShopProductListings = () => shopProductListings;
