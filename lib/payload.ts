/**
 * Payload CMS API client
 * Fetches products, shops, etc. from the Payload instance.
 */

// PAYLOAD_API_URL or NEXT_PUBLIC_PAYLOAD_API_URL (use NEXT_PUBLIC_ on Vercel for reliability)
const API_URL = process.env.PAYLOAD_API_URL || process.env.NEXT_PUBLIC_PAYLOAD_API_URL || ""

export function isPayloadConfigured(): boolean {
  return Boolean(API_URL)
}

function getBaseUrl(): string {
  return API_URL.replace(/\/api\/?$/, "")
}

/** Resolve media URL (Payload returns /media/... relative path) */
export function getMediaUrl(media: { url?: string } | string | null | undefined): string {
  if (!media) return ""
  if (typeof media === "string") return media.startsWith("http") ? media : `${getBaseUrl()}${media}`
  const url = media?.url
  if (!url) return ""
  return url.startsWith("http") ? url : `${getBaseUrl()}${url}`
}

/** Fetch from Payload REST API */
async function fetchPayload<T>(path: string, depth = 2): Promise<T> {
  if (!API_URL) throw new Error("PAYLOAD_API_URL is not set")
  const url = `${API_URL}${path}${path.includes("?") ? "&" : "?"}depth=${depth}`
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 0 },
  })
  if (!res.ok) throw new Error(`Payload fetch failed: ${res.status} ${res.statusText}`)
  return res.json()
}

export interface PayloadProduct {
  id: string
  slug: string
  name: string
  price: string
  originalPrice?: string | null
  image?: { url?: string } | number | null
  imageUrl?: string | null
  colors?: Array<{ color?: string }>
  sizes?: Array<{ size?: string }>
  badge?: "new" | "bestseller" | "sale" | null
  featured?: boolean
  lookbookFeatured?: boolean
  filterCategory?: string | null
  shop?: { slug?: string; name?: string } | number | null
}

export interface PayloadShop {
  id: string
  slug: string
  name: string
  tagline?: string | null
  location?: {
    city?: string
    neighborhood?: string
    address?: string
    mapUrl?: string
  }
  contact?: {
    phone?: string
    whatsapp?: string
    instagram?: string
    facebook?: string
  }
  story?: string | null
  established?: string | null
  image?: { url?: string } | number | null
  imageUrl?: string | null
  gallery?: Array<{ image?: { url?: string } | number }>
  specialties?: Array<{ label?: string }>
  featuredProducts?: Array<PayloadProduct | number>
  hours?: {
    weekdays?: string
    saturday?: string
    sunday?: string
  }
}

export interface PayloadDocsResponse<T> {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
}

export interface PayloadLookbook {
  id: string
  slug: string
  titleKey: string
  descKey: string
  image?: { url?: string } | number | null
  imageUrl?: string | null
  order?: number
}

export interface PayloadLookbookProduct {
  id: string
  lookbook?: { slug?: string } | number | null
  name: string
  price: string
  image?: { url?: string } | number | null
  imageUrl?: string | null
  sizes?: Array<{ size?: string }>
  colors?: Array<{ color?: string }>
  badge?: "none" | "new" | "bestseller" | "sale" | null
  order?: number
}

export interface PayloadBeautyProduct {
  id: string
  name: string
  brand: string
  price: string
  image?: { url?: string } | number | null
  imageUrl?: string | null
  featured?: boolean
  order?: number
}

/** Fetch all products */
export async function fetchProducts(): Promise<PayloadProduct[]> {
  const data = await fetchPayload<PayloadDocsResponse<PayloadProduct>>("/products?limit=100")
  return data.docs || []
}

/** Fetch all shops */
export async function fetchShops(): Promise<PayloadShop[]> {
  const data = await fetchPayload<PayloadDocsResponse<PayloadShop>>("/shops?limit=100")
  return data.docs || []
}

/** Fetch all lookbooks (Explore Lookbooks collections) */
export async function fetchLookbooks(): Promise<PayloadLookbook[]> {
  const data = await fetchPayload<PayloadDocsResponse<PayloadLookbook>>("/lookbooks?limit=50&sort=order")
  return data.docs || []
}

/** Fetch lookbook products for a collection by slug */
export async function fetchLookbookProducts(lookbookSlug: string): Promise<PayloadLookbookProduct[]> {
  try {
    const lookbooks = await fetchLookbooks()
    const lookbook = lookbooks.find((lb) => lb.slug === lookbookSlug)
    if (!lookbook) return []
    const data = await fetchPayload<PayloadDocsResponse<PayloadLookbookProduct>>(
      `/lookbook-products?where[lookbook][equals]=${encodeURIComponent(lookbook.id)}&limit=50&sort=order&depth=1`
    )
    return data.docs || []
  } catch {
    return []
  }
}

/** Fetch beauty products (Editor's Picks – featured only) */
export async function fetchBeautyProducts(): Promise<PayloadBeautyProduct[]> {
  const data = await fetchPayload<PayloadDocsResponse<PayloadBeautyProduct>>(
    "/beauty-products?where[featured][equals]=true&limit=50&sort=order"
  )
  return data.docs || []
}

/** Fetch all lookbook products (for counting per collection) */
export async function fetchAllLookbookProducts(): Promise<PayloadLookbookProduct[]> {
  const data = await fetchPayload<PayloadDocsResponse<PayloadLookbookProduct>>(
    "/lookbook-products?limit=500&depth=1"
  )
  return data.docs || []
}
