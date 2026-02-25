/**
 * Data layer with Payload CMS integration.
 * When PAYLOAD_API_URL is set, fetches from Payload. Otherwise uses static data.
 */

import { isPayloadConfigured } from "@/lib/payload"
import type { Abaya, BeautyProduct, Lookbook, Shop, ShopListing, ShopProductListing } from "./types"
import { getFeaturedAbayas, getLookbookFeaturedAbayas } from "./abayas"
import { shops, getAllShopSlugs, getAllShopListings, getShopProductListings } from "./shops"
import { getEditorsPicks } from "./beauty"
import { getAllLookbooks } from "./lookbooks"
import {
  getProductsFromPayload,
  getShopsFromPayload,
  getShopListingsFromPayload,
  getShopProductListingsFromPayload,
  getProductDetailFromPayload,
  getLookbooksFromPayload,
  getLookbookProductsFromPayload,
  getBeautyProductsFromPayload,
} from "./payload-data"
import type { ShopListing } from "./types"

/** Featured abayas – from Payload or static */
export async function getFeaturedAbayasAsync(): Promise<Abaya[]> {
  if (!isPayloadConfigured()) return getFeaturedAbayas()
  const products = await getProductsFromPayload()
  return products.filter((p) => p.featured)
}

/** Lookbook featured abayas – from Payload or static */
export async function getLookbookFeaturedAbayasAsync(): Promise<Abaya[]> {
  if (!isPayloadConfigured()) return getLookbookFeaturedAbayas()
  const products = await getProductsFromPayload()
  return products.filter((p) => p.lookbookFeatured)
}

/** All shops as Record<slug, Shop> – from Payload when configured, else static (no fallback to static when Payload is configured so Payload shops always show) */
export async function getShopsAsync(): Promise<Record<string, Shop>> {
  if (!isPayloadConfigured()) return shops
  return getShopsFromPayload()
}

/** Map a listing to a minimal Shop so profile can render when full Payload fetch fails */
function listingToMinimalShop(listing: ShopListing): Shop {
  return {
    slug: listing.slug,
    name: listing.name,
    tagline: listing.tagline,
    location: {
      city: listing.city,
      neighborhood: listing.neighborhood,
      address: "",
      mapUrl: "",
    },
    contact: { phone: "", whatsapp: "" },
    story: "",
    established: listing.established,
    image: listing.image,
    gallery: [listing.image],
    specialties: listing.specialties,
    featuredProducts: [],
    hours: { weekdays: "", saturday: "", sunday: "" },
  }
}

/** Single shop by slug – tries Payload again if not in main record; falls back to listing so profile still loads */
export async function getShopAsync(slug: string): Promise<Shop | null> {
  const all = await getShopsAsync()
  const found = all[slug]
  if (found) return found
  if (isPayloadConfigured()) {
    try {
      const payloadShops = await getShopsFromPayload()
      const fromPayload = payloadShops[slug] ?? null
      if (fromPayload) return fromPayload
    } catch {
      // continue to listings fallback
    }
  }
  // Fallback: slug might be from listings (e.g. list from Payload, full shop fetch failed on Vercel)
  const listings = await getAllShopListingsAsync()
  const listing = listings.find((l) => l.slug === slug)
  return listing ? listingToMinimalShop(listing) : null
}

/** All shop slugs – from Payload when configured, else static */
export async function getAllShopSlugsAsync(): Promise<string[]> {
  if (!isPayloadConfigured()) return getAllShopSlugs()
  const payloadShops = await getShopsFromPayload()
  return Object.keys(payloadShops)
}

/** Shop listings – from Payload when configured, else static (no fallback so Payload shops always show on main site) */
export async function getAllShopListingsAsync(): Promise<ShopListing[]> {
  if (!isPayloadConfigured()) return getAllShopListings()
  return getShopListingsFromPayload()
}

/** Shop product listings (home page) – from Payload when configured, else static */
export async function getShopProductListingsAsync(): Promise<ShopProductListing[]> {
  if (!isPayloadConfigured()) return getShopProductListings()
  return getShopProductListingsFromPayload()
}

/** Product detail by shop + product slug – from Payload when not in static mock */
export { getProductDetailFromPayload }

/** Lookbooks (Explore Lookbooks) – from Payload or static */
export async function getLookbooksAsync(): Promise<Lookbook[]> {
  if (!isPayloadConfigured()) return getAllLookbooks()
  const payload = await getLookbooksFromPayload()
  return payload.length > 0 ? payload : getAllLookbooks()
}

/** Products inside a lookbook collection – from Payload only (else empty) */
export async function getLookbookProductsAsync(lookbookSlug: string): Promise<Abaya[]> {
  if (!isPayloadConfigured()) return []
  return getLookbookProductsFromPayload(lookbookSlug)
}

/** Editor's Picks (beauty) – from Payload or static */
export async function getEditorsPicksAsync(): Promise<BeautyProduct[]> {
  if (!isPayloadConfigured()) return getEditorsPicks()
  const payload = await getBeautyProductsFromPayload()
  return payload.length > 0 ? payload : getEditorsPicks()
}
