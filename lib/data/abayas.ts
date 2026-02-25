// =============================================================================
// AURA LUMINA - ABAYA PRODUCTS DATA (fallback when Payload is not configured)
// =============================================================================
// With Payload CMS, featured/lookbook abayas come from the API. This file provides empty fallbacks.

import type { Abaya } from "./types";

export const abayas: Abaya[] = [];

export const getFeaturedAbayas = () => abayas.filter((a) => a.featured === true);
export const getLookbookFeaturedAbayas = () =>
  abayas.filter((a) => a.lookbookFeatured === true);
