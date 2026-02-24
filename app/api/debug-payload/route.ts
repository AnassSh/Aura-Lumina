/**
 * Debug endpoint to verify Payload CMS connectivity.
 * Visit /api/debug-payload on your deployed site to diagnose issues.
 * Remove or protect this route in production.
 */
import { NextResponse } from "next/server";

const API_URL = process.env.PAYLOAD_API_URL || "";

export const dynamic = "force-dynamic";

export async function GET() {
  const payloadConfigured = Boolean(API_URL);

  if (!payloadConfigured) {
    return NextResponse.json({
      ok: false,
      payloadConfigured: false,
      error: "PAYLOAD_API_URL is not set in environment variables",
      hint: "Add PAYLOAD_API_URL to your main site's Vercel env vars (e.g. https://aura-lumina-cms.vercel.app/api)",
    });
  }

  try {
    const url = `${API_URL}/shops?limit=5&depth=1`;
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({
        ok: false,
        payloadConfigured: true,
        fetchStatus: res.status,
        fetchStatusText: res.statusText,
        error: `Payload API returned ${res.status}. Check that the CMS URL is correct and the API is accessible.`,
      });
    }

    const data = await res.json();
    const docs = data?.docs ?? [];
    const shopNames = docs.map((s: { name?: string }) => s.name);

    return NextResponse.json({
      ok: true,
      payloadConfigured: true,
      shopsCount: docs.length,
      shopNames,
      message:
        docs.length > 0
          ? "Payload is connected. Shop data should appear on the site."
          : "Payload is connected but returned no shops. Add shops in the CMS admin.",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({
      ok: false,
      payloadConfigured: true,
      error: `Fetch failed: ${message}`,
      hint: "Check network connectivity, CORS, and that the Payload CMS is deployed and running.",
    });
  }
}
