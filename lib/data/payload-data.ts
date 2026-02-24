/**
 * Payload CMS data layer – maps Payload API to Aura Lumina types
 * Used when PAYLOAD_API_URL is set. Falls back to static data otherwise.
 */

import {
  fetchProducts,
  fetchShops,
  fetchLookbooks,
  fetchLookbookProducts,
  fetchAllLookbookProducts,
  fetchBeautyProducts,
  getMediaUrl,
  isPayloadConfigured,
  type PayloadProduct,
  type PayloadShop,
  type PayloadLookbook,
  type PayloadLookbookProduct,
  type PayloadBeautyProduct,
} from "@/lib/payload"
import type { Abaya, BadgeType, BeautyProduct, FilterCategory, Lookbook, Shop, ShopListing, ShopProductListing } from "./types"
import { COLOR_HEX_MAP } from "./types"

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
  const shop = s as PayloadShop & { featuredProducts?: Array<PayloadProduct | { id: string }>; imageUrl?: string }
  const image =
    typeof shop.image === "object" && shop.image ? getMediaUrl(shop.image as { url?: string }) : shop.imageUrl || ""
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
    image: image || shop.imageUrl || "/images/shop-hero-1.svg",
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
  const shopWithUrl = s as PayloadShop & { imageUrl?: string }
  const image =
    typeof s.image === "object" && s.image ? getMediaUrl(s.image as { url?: string }) : shopWithUrl.imageUrl || ""
  return {
    slug: s.slug,
    name: s.name,
    tagline: s.tagline || "",
    city: s.location?.city || "",
    neighborhood: s.location?.neighborhood || "",
    image: image || "/images/shop-hero-1.svg",
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

/** Product detail shape for the product detail page (with colors as { name, hex }[]) */
export interface ProductDetailForPage {
  slug: string
  name: string
  price: string
  description: string
  details: string[]
  images: string[]
  colors: { name: string; hex: string }[]
  sizes: string[]
  category: string
  fabric: string
  care: string[]
}

/** Shop minimal shape for product detail page */
export interface ShopMinimalForPage {
  slug: string
  name: string
  city: string
  neighborhood: string
  phone: string
  whatsapp: string
  instagram?: string
}

/** Get a single product by slug from Payload for the product detail page */
export async function getProductDetailFromPayload(
  _shopSlug: string,
  productSlug: string
): Promise<{ product: ProductDetailForPage; shop: ShopMinimalForPage } | null> {
  if (!isPayloadConfigured()) return null
  try {
    const [products, shops] = await Promise.all([fetchProducts(), fetchShops()])
    const product = products.find((p) => p.slug === productSlug)
    if (!product) return null
    const shopRef = product.shop
    const shopSlug = typeof shopRef === "object" && shopRef && "slug" in shopRef ? (shopRef as { slug?: string }).slug : null
    const shopDoc = shopSlug ? shops.find((s) => s.slug === shopSlug) : null
    const image =
      typeof product.image === "object" && product.image
        ? getMediaUrl(product.image as { url?: string })
        : product.imageUrl || ""
    const colorNames = (product.colors || []).map((c) => c.color).filter(Boolean) as string[]
    const colorsWithHex = colorNames.map((name) => ({
      name,
      hex: COLOR_HEX_MAP[name] ?? "#9ca3af",
    }))
    const sizes = (product.sizes || []).map((s) => s.size).filter(Boolean) as string[]
    return {
      product: {
        slug: product.slug,
        name: product.name,
        price: product.price,
        description: "",
        details: [],
        images: image ? [image] : ["/images/abaya-1.svg"],
        colors: colorsWithHex,
        sizes,
        category: "",
        fabric: "",
        care: [],
      },
      shop: shopDoc
        ? {
            slug: shopDoc.slug,
            name: shopDoc.name,
            city: shopDoc.location?.city ?? "",
            neighborhood: shopDoc.location?.neighborhood ?? "",
            phone: shopDoc.contact?.phone ?? "",
            whatsapp: shopDoc.contact?.whatsapp ?? "",
            instagram: shopDoc.contact?.instagram,
          }
        : {
            slug: _shopSlug,
            name: "",
            city: "",
            neighborhood: "",
            phone: "",
            whatsapp: "",
          },
    }
  } catch {
    return null
  }
}

// -----------------------------------------------------------------------------
// Lookbooks (Explore Lookbooks collections)
// -----------------------------------------------------------------------------

function mapPayloadLookbookToLookbook(p: PayloadLookbook, itemCount: number): Lookbook {
  const image =
    typeof p.image === "object" && p.image ? getMediaUrl(p.image as { url?: string }) : p.imageUrl || ""
  return {
    id: parseInt(p.id, 10) || 0,
    titleKey: p.titleKey,
    descKey: p.descKey,
    image: image || "/images/lookbook-1.svg",
    itemCount,
    slug: p.slug,
  }
}

/** Fetch lookbooks from Payload; itemCount is set from product counts */
export async function getLookbooksFromPayload(): Promise<Lookbook[]> {
  if (!isPayloadConfigured()) return []
  try {
    const [lookbooks, allProducts] = await Promise.all([
      fetchLookbooks(),
      fetchAllLookbookProducts().catch(() => []),
    ])
    const countBySlug: Record<string, number> = {}
    for (const doc of allProducts) {
      const slug = typeof doc.lookbook === "object" && doc.lookbook && "slug" in doc.lookbook
        ? (doc.lookbook as { slug?: string }).slug
        : null
      if (slug) countBySlug[slug] = (countBySlug[slug] || 0) + 1
    }
    return lookbooks
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((lb) => mapPayloadLookbookToLookbook(lb, countBySlug[lb.slug] ?? 0))
  } catch {
    return []
  }
}

/** Fetch lookbook products for one collection by slug; returns Abaya-like for ProductGrid/CollectionModal */
export async function getLookbookProductsFromPayload(lookbookSlug: string): Promise<Abaya[]> {
  if (!isPayloadConfigured()) return []
  try {
    const docs = await fetchLookbookProducts(lookbookSlug)
    return docs
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((p) => {
        const image =
          typeof p.image === "object" && p.image ? getMediaUrl(p.image as { url?: string }) : p.imageUrl || ""
        const badge = p.badge && p.badge !== "none" ? p.badge : undefined
        return {
          id: p.id,
          slug: p.id,
          titleKey: p.name,
          price: p.price,
          image: image || "/images/abaya-1.svg",
          colors: (p.colors || []).map((c) => c.color).filter(Boolean) as string[],
          sizes: (p.sizes || []).map((s) => s.size).filter(Boolean) as string[],
          badge: badge as BadgeType | undefined,
          filterCategory: undefined,
          href: "/lookbooks",
        }
      })
  } catch {
    return []
  }
}

// -----------------------------------------------------------------------------
// Beauty products (Editor's Picks)
// -----------------------------------------------------------------------------

function mapPayloadBeautyProductToBeautyProduct(p: PayloadBeautyProduct): BeautyProduct {
  const image =
    typeof p.image === "object" && p.image ? getMediaUrl(p.image as { url?: string }) : p.imageUrl || ""
  return {
    id: parseInt(p.id, 10) || 0,
    name: p.name,
    brand: p.brand,
    price: p.price,
    image: image || "/images/product-1.svg",
    featured: p.featured ?? true,
  }
}

/** Fetch Editor's Picks (featured beauty products) from Payload */
export async function getBeautyProductsFromPayload(): Promise<BeautyProduct[]> {
  if (!isPayloadConfigured()) return []
  try {
    const docs = await fetchBeautyProducts()
    return docs.map(mapPayloadBeautyProductToBeautyProduct)
  } catch {
    return []
  }
}
