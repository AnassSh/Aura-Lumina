/**
 * Payload CMS API client
 * Fetches products, shops, etc. from the Payload instance.
 */

const API_URL = process.env.PAYLOAD_API_URL || ""

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
    next: { revalidate: 60 },
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
