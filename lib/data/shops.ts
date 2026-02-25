// =============================================================================
// AURA LUMINA - SHOP PARTNERS DATA (fallback when Payload is not configured)
// =============================================================================
// With Payload CMS, shops come from the API. This file provides empty fallbacks.

import type { Shop, ShopListing, ShopProductListing } from "./types";

export const shops: Record<string, Shop> = {};

const shopListings: ShopListing[] = [];

const shopProductListings: ShopProductListing[] = [];

/** City filter options on Shops page */
export const cities = ["All Cities", "Casablanca", "Rabat", "Marrakech", "Fes"];

export const getAllShopSlugs = () => Object.keys(shops);
export const getAllShopListings = () => shopListings;
export const getShopProductListings = () => shopProductListings;
