/**
 * Data layer with Payload CMS integration.
 * When PAYLOAD_API_URL is set, fetches from Payload. Otherwise uses static data.
 */

import { isPayloadConfigured } from "@/lib/payload"
import type { Abaya, Shop, ShopListing, ShopProductListing } from "./types"
import { getFeaturedAbayas, getLookbookFeaturedAbayas } from "./abayas"
import { shops, getAllShopSlugs, getAllShopListings, getShopProductListings } from "./shops"
import {
  getProductsFromPayload,
  getShopsFromPayload,
  getShopListingsFromPayload,
  getShopProductListingsFromPayload,
} from "./payload-data"

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

/** All shops as Record<slug, Shop> – from Payload or static */
export async function getShopsAsync(): Promise<Record<string, Shop>> {
  if (!isPayloadConfigured()) return shops
  const payloadShops = await getShopsFromPayload()
  return Object.keys(payloadShops).length > 0 ? payloadShops : shops
}

/** Single shop by slug */
export async function getShopAsync(slug: string): Promise<Shop | null> {
  const all = await getShopsAsync()
  return all[slug] ?? null
}

/** All shop slugs – for static params */
export async function getAllShopSlugsAsync(): Promise<string[]> {
  if (!isPayloadConfigured()) return getAllShopSlugs()
  const payloadShops = await getShopsFromPayload()
  return Object.keys(payloadShops).length > 0 ? Object.keys(payloadShops) : getAllShopSlugs()
}

/** Shop listings – from Payload or static */
export async function getAllShopListingsAsync(): Promise<ShopListing[]> {
  if (!isPayloadConfigured()) return getAllShopListings()
  const payload = await getShopListingsFromPayload()
  return payload.length > 0 ? payload : getAllShopListings()
}

/** Shop product listings (home page) – from Payload or static */
export async function getShopProductListingsAsync(): Promise<ShopProductListing[]> {
  if (!isPayloadConfigured()) return getShopProductListings()
  const payload = await getShopProductListingsFromPayload()
  return payload.length > 0 ? payload : getShopProductListings()
}
