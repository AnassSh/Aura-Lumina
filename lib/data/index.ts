// =============================================================================
// AURA LUMINA - CENTRALIZED DATA LAYER
// =============================================================================
// Single import point for all data
// Payload CMS: when PAYLOAD_API_URL is set, products & shops come from Payload.
// Otherwise, static data is used.
// =============================================================================

// Types
export * from "./types";

// Abayas (sync – static only)
export { getFeaturedAbayas, getLookbookFeaturedAbayas } from "./abayas";

// Shops (sync – static only)
export {
  shops,
  cities,
  getAllShopSlugs,
  getAllShopListings,
  getShopProductListings,
} from "./shops";

// Beauty
export { getEditorsPicks, quickTips, getBeautyTips } from "./beauty";

// Lookbooks
export {
  lookbooks,
  lookbookCategories,
  getAllLookbooks,
  getLatestPosts,
  getShopTheLook,
} from "./lookbooks";

// Async data (Payload or static fallback)
export {
  getFeaturedAbayasAsync,
  getLookbookFeaturedAbayasAsync,
  getShopsAsync,
  getShopAsync,
  getAllShopSlugsAsync,
  getAllShopListingsAsync,
  getShopProductListingsAsync,
  getProductDetailFromPayload,
  getLookbooksAsync,
  getLookbookProductsAsync,
  getEditorsPicksAsync,
} from "./data-with-payload";
