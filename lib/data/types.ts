// =============================================================================
// AURA LUMINA - CENTRALIZED DATA TYPES
// =============================================================================
// All TypeScript interfaces for the data layer
// =============================================================================

// -----------------------------------------------------------------------------
// ABAYA / PRODUCT TYPES
// -----------------------------------------------------------------------------

export type BadgeType = "new" | "bestseller" | "sale";
export type FilterCategory = "all" | "new" | "bestseller" | "sale" | "everyday" | "formal";

export interface Abaya {
  id: string;
  slug: string;
  titleKey: string;
  price: string;
  originalPrice?: string;
  image: string;
  colors?: string[];
  sizes?: string[];
  badge?: BadgeType;
  featured?: boolean;
  lookbookFeatured?: boolean;
  filterCategory?: FilterCategory;
  href?: string;
}

// -----------------------------------------------------------------------------
// SHOP / PARTNER TYPES
// -----------------------------------------------------------------------------

export interface ShopLocation {
  city: string;
  neighborhood: string;
  address: string;
  mapUrl: string;
}

export interface ShopContact {
  phone: string;
  whatsapp: string;
  instagram?: string;
}

export interface ShopHours {
  weekdays: string;
  saturday: string;
  sunday: string;
}

export interface ShopProduct {
  id: number;
  name: string;
  price: string;
  image: string;
  slug: string;
}

export interface Shop {
  slug: string;
  name: string;
  tagline: string;
  location: ShopLocation;
  contact: ShopContact;
  story: string;
  established: string;
  image: string;
  gallery: string[];
  specialties: string[];
  featuredProducts: ShopProduct[];
  hours: ShopHours;
}

export interface ShopListing {
  slug: string;
  name: string;
  tagline: string;
  city: string;
  neighborhood: string;
  image: string;
  specialties: string[];
  established: string;
}

export interface ShopProductListing {
  id: number;
  name: string;
  price: string;
  image: string;
  shopName: string;
  shopSlug: string;
  productSlug: string;
  city: string;
}

// -----------------------------------------------------------------------------
// BEAUTY TYPES
// -----------------------------------------------------------------------------

export interface BeautyProduct {
  id: number;
  name: string;
  brand: string;
  price: string;
  image: string;
  featured?: boolean;
}

export interface BeautyTip {
  id: number;
  titleKey: string;
  descKey: string;
  image: string;
  categoryKey: string;
  slug: string;
}

// -----------------------------------------------------------------------------
// LOOKBOOK TYPES
// -----------------------------------------------------------------------------

export interface Lookbook {
  id: number;
  titleKey: string;
  descKey: string;
  image: string;
  itemCount: number;
  slug: string;
}

export interface LatestPost {
  id: number;
  titleKey: string;
  excerptKey: string;
  image: string;
  date: string;
  slug: string;
}

export interface ShopTheLook {
  id: number;
  titleKey: string;
  itemKeys: readonly string[];
  image: string;
  totalPrice: string;
}

// -----------------------------------------------------------------------------
// COLOR UTILITIES
// -----------------------------------------------------------------------------

export const COLOR_HEX_MAP: Record<string, string> = {
  Black: "#1a1a1a",
  Blue: "#2563eb",
  Navy: "#1e3a5f",
  Burgundy: "#722f37",
  Grey: "#6b7280",
  Gray: "#6b7280",
  "Dusty Rose": "#dcae96",
  Mauve: "#915f6d",
  Blush: "#de98ab",
  White: "#ffffff",
  Cream: "#fffdd0",
  Ivory: "#fffff0",
  Champagne: "#f7e7ce",
  Emerald: "#50c878",
  Ruby: "#e0115f",
  Sapphire: "#0f52ba",
  Brown: "#8b4513",
  Beige: "#f5f5dc",
  Gold: "#d4af37",
  Silver: "#c0c0c0",
  Red: "#dc2626",
  Green: "#16a34a",
  Pink: "#ec4899",
};
