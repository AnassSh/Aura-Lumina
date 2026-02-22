/**
 * Payload CMS data layer – maps Payload API to Aura Lumina types
 * Used when PAYLOAD_API_URL is set. Falls back to static data otherwise.
 */

import {
  fetchProducts,
  fetchShops,
  getMediaUrl,
  isPayloadConfigured,
  type PayloadProduct,
  type PayloadShop,
} from "@/lib/payload"
import type { Abaya, BadgeType, FilterCategory, Shop, ShopListing, ShopProductListing } from "./types"

function mapPayloadProductToAbaya(p: PayloadProduct): Abaya {
  const image =
    typeof p.image === "object" && p.image ? getMediaUrl(p.image as { url?: string }) : p.imageUrl || ""
  return {
    id: p.id,
    slug: p.slug,
    titleKey: p.name,
    price: p.price,
    originalPrice: p.originalPrice || undefined,
    image: image || "/images/abaya-1.svg",
    colors: (p.colors || []).map((c) => c.color).filter(Boolean) as string[],
    sizes: (p.sizes || []).map((s) => s.size).filter(Boolean) as string[],
    badge: (p.badge as BadgeType) || undefined,
    featured: p.featured ?? false,
    lookbookFeatured: p.lookbookFeatured ?? false,
    filterCategory: (p.filterCategory as FilterCategory) || undefined,
    href: "/lookbooks",
  }
}

function mapPayloadShopToShop(s: PayloadShop): Shop {
  const shop = s as PayloadShop & { featuredProducts?: Array<PayloadProduct | { id: string }> }
  const image =
    typeof shop.image === "object" && shop.image ? getMediaUrl(shop.image as { url?: string }) : ""
  const gallery =
    (shop.gallery || [])
      .map((g) => (typeof g.image === "object" && g.image ? getMediaUrl(g.image as { url?: string }) : ""))
      .filter(Boolean) || []
  const featuredProducts = (shop.featuredProducts || [])
    .filter((fp): fp is PayloadProduct => typeof fp === "object" && "slug" in fp)
    .map((fp) => ({
      id: parseInt(fp.id, 10) || 0,
      name: fp.name,
      price: fp.price,
      image:
        typeof fp.image === "object" && fp.image
          ? getMediaUrl(fp.image as { url?: string })
          : fp.imageUrl || "",
      slug: fp.slug,
    }))

  return {
    slug: shop.slug,
    name: shop.name,
    tagline: shop.tagline || "",
    location: {
      city: shop.location?.city || "",
      neighborhood: shop.location?.neighborhood || "",
      address: shop.location?.address || "",
      mapUrl: shop.location?.mapUrl || "",
    },
    contact: {
      phone: shop.contact?.phone || "",
      whatsapp: shop.contact?.whatsapp || "",
      instagram: shop.contact?.instagram,
    },
    story: shop.story || "",
    established: shop.established || "",
    image: image || "/images/shop-hero-1.svg",
    gallery: gallery.length ? gallery : ["/images/shop-gallery-1.svg"],
    specialties: (shop.specialties || []).map((s) => s.label).filter(Boolean) as string[],
    featuredProducts,
    hours: {
      weekdays: shop.hours?.weekdays || "",
      saturday: shop.hours?.saturday || "",
      sunday: shop.hours?.sunday || "",
    },
  }
}

function mapPayloadShopToShopListing(s: PayloadShop): ShopListing {
  return {
    slug: s.slug,
    name: s.name,
    tagline: s.tagline || "",
    city: s.location?.city || "",
    neighborhood: s.location?.neighborhood || "",
    image:
      typeof s.image === "object" && s.image ? getMediaUrl(s.image as { url?: string }) : "",
    specialties: (s.specialties || []).map((sp) => sp.label).filter(Boolean) as string[],
    established: s.established || "",
  }
}

/** Fetch products from Payload and map to Abaya[] */
export async function getProductsFromPayload(): Promise<Abaya[]> {
  if (!isPayloadConfigured()) return []
  try {
    const docs = await fetchProducts()
    return docs.map(mapPayloadProductToAbaya)
  } catch {
    return []
  }
}

/** Fetch shops from Payload and map to Record<slug, Shop> */
export async function getShopsFromPayload(): Promise<Record<string, Shop>> {
  if (!isPayloadConfigured()) return {}
  try {
    const docs = await fetchShops()
    const record: Record<string, Shop> = {}
    for (const s of docs) record[s.slug] = mapPayloadShopToShop(s)
    return record
  } catch {
    return {}
  }
}

/** Fetch shop listings from Payload */
export async function getShopListingsFromPayload(): Promise<ShopListing[]> {
  if (!isPayloadConfigured()) return []
  try {
    const docs = await fetchShops()
    return docs.map(mapPayloadShopToShopListing)
  } catch {
    return []
  }
}

/** Build shop product listings from Payload (for home page) */
export async function getShopProductListingsFromPayload(): Promise<ShopProductListing[]> {
  if (!isPayloadConfigured()) return []
  try {
    const [products, shops] = await Promise.all([fetchProducts(), fetchShops()])
    const shopMap = Object.fromEntries(shops.map((s) => [s.slug, s]))
    const listings: ShopProductListing[] = []
    let id = 1
    for (const p of products) {
      const shopSlug = typeof p.shop === "object" && p.shop ? (p.shop as { slug?: string }).slug : null
      const shop = shopSlug ? shopMap[shopSlug] : null
      const image =
        typeof p.image === "object" && p.image ? getMediaUrl(p.image as { url?: string }) : p.imageUrl || ""
      listings.push({
        id: id++,
        name: p.name,
        price: p.price,
        image: image || "/images/abaya-1.svg",
        shopName: shop?.name || "",
        shopSlug: shopSlug || "",
        productSlug: p.slug,
        city: shop?.location?.city || "",
      })
    }
    return listings
  } catch {
    return []
  }
}
