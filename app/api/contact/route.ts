/**
 * Contact API – CRM + automation ready
 *
 * Handles two form types:
 * - order: Client product order (confirm order + client info) → n8n → Telegram / Payload CMS
 * - partner: Shop partnership application → n8n → Telegram / Payload CMS
 *
 * Optional: set N8N_WEBHOOK_URL_ORDER, N8N_WEBHOOK_URL_PARTNER, N8N_WEBHOOK_URL_GENERAL
 * to forward payloads to self-hosted n8n (e.g. Telegram notifications, Payload CMS).
 */

import { NextRequest, NextResponse } from "next/server";

// -----------------------------------------------------------------------------
// Types (n8n / Strapi-friendly payloads)
// -----------------------------------------------------------------------------

export type ContactFormType = "order" | "partner" | "general";

export interface ContactBasePayload {
  formType: ContactFormType;
  firstName: string;
  lastName: string;
  email: string;
  message?: string;
  newsletter?: boolean;
  locale?: string;
  submittedAt: string; // ISO
}

export interface OrderPayload extends ContactBasePayload {
  formType: "order";
  productName?: string;
  productPrice?: string;
  productImage?: string;
  selectedSize?: string;
  quantity?: number;
  shopSlug?: string;
  productSlug?: string;
  address?: string;
  phone?: string; // full e.g. +212 6XX-XXXXXX
  instagram?: string;
  facebook?: string;
}

export interface PartnerPayload extends ContactBasePayload {
  formType: "partner";
  shopName: string;
  shopCity: string;
  shopNeighborhood?: string;
  shopAddress?: string;
  shopPhone?: string;
  shopWhatsapp?: string;
  shopInstagram?: string;
  shopWebsite?: string;
  shopDescription?: string;
}

export interface GeneralPayload extends ContactBasePayload {
  formType: "general";
}

export type ContactPayload = OrderPayload | PartnerPayload | GeneralPayload;

// -----------------------------------------------------------------------------
// Validation (use unknown so type predicates are valid)
// -----------------------------------------------------------------------------

function validateOrder(body: unknown): body is OrderPayload {
  const b = body as Record<string, unknown>;
  return (
    typeof b?.firstName === "string" &&
    b.firstName.trim().length > 0 &&
    typeof b?.lastName === "string" &&
    b.lastName.trim().length > 0 &&
    typeof b?.email === "string" &&
    b.email.trim().length > 0
  );
}

function validatePartner(body: unknown): body is PartnerPayload {
  const b = body as Record<string, unknown>;
  return (
    typeof b?.firstName === "string" &&
    b.firstName.trim().length > 0 &&
    typeof b?.lastName === "string" &&
    b.lastName.trim().length > 0 &&
    typeof b?.email === "string" &&
    b.email.trim().length > 0 &&
    typeof b?.shopName === "string" &&
    b.shopName.trim().length > 0 &&
    typeof b?.shopCity === "string" &&
    b.shopCity.trim().length > 0
  );
}

function validateGeneral(body: unknown): body is GeneralPayload {
  const b = body as Record<string, unknown>;
  return (
    typeof b?.firstName === "string" &&
    b.firstName.trim().length > 0 &&
    typeof b?.lastName === "string" &&
    b.lastName.trim().length > 0 &&
    typeof b?.email === "string" &&
    b.email.trim().length > 0
  );
}

// -----------------------------------------------------------------------------
// Optional n8n webhook forward (set env in Vercel / .env.local)
// -----------------------------------------------------------------------------

async function forwardToN8n(formType: ContactFormType, payload: ContactPayload) {
  const url =
    formType === "order"
      ? process.env.N8N_WEBHOOK_URL_ORDER
      : formType === "partner"
        ? process.env.N8N_WEBHOOK_URL_PARTNER
        : process.env.N8N_WEBHOOK_URL_GENERAL;

  if (!url) return;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error("[contact API] n8n webhook failed:", res.status, await res.text());
    }
  } catch (err) {
    console.error("[contact API] n8n webhook error:", err);
  }
}

// -----------------------------------------------------------------------------
// POST /api/contact
// -----------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    const formType = body.formType as ContactFormType | undefined;
    if (!formType || !["order", "partner", "general"].includes(formType)) {
      return NextResponse.json(
        { error: "Invalid or missing formType. Use: order | partner | general" },
        { status: 400 }
      );
    }

    const base = {
      formType,
      firstName: String(body.firstName ?? "").trim(),
      lastName: String(body.lastName ?? "").trim(),
      email: String(body.email ?? "").trim(),
      message: body.message != null ? String(body.message).trim() : undefined,
      newsletter: Boolean(body.newsletter),
      locale: body.locale != null ? String(body.locale) : undefined,
      submittedAt: new Date().toISOString(),
    };

    let payload: ContactPayload;

    if (formType === "order") {
      if (!validateOrder(body)) {
        return NextResponse.json(
          { error: "Order form requires firstName, lastName, and email." },
          { status: 400 }
        );
      }
      payload = {
        ...base,
        formType: "order",
        productName: body.productName != null ? String(body.productName) : undefined,
        productPrice: body.productPrice != null ? String(body.productPrice) : undefined,
        productImage: body.productImage != null ? String(body.productImage) : undefined,
        selectedSize: body.selectedSize != null ? String(body.selectedSize) : undefined,
        quantity: body.quantity != null ? Number(body.quantity) : undefined,
        shopSlug: body.shopSlug != null ? String(body.shopSlug) : undefined,
        productSlug: body.productSlug != null ? String(body.productSlug) : undefined,
        address: body.address != null ? String(body.address) : undefined,
        phone: body.phone != null ? String(body.phone) : undefined,
        instagram: body.instagram != null ? String(body.instagram) : undefined,
        facebook: body.facebook != null ? String(body.facebook) : undefined,
      };
    } else if (formType === "partner") {
      if (!validatePartner(body)) {
        return NextResponse.json(
          { error: "Partner form requires firstName, lastName, email, shopName, and shopCity." },
          { status: 400 }
        );
      }
      payload = {
        ...base,
        formType: "partner",
        shopName: String(body.shopName).trim(),
        shopCity: String(body.shopCity).trim(),
        shopNeighborhood: body.shopNeighborhood != null ? String(body.shopNeighborhood) : undefined,
        shopAddress: body.shopAddress != null ? String(body.shopAddress) : undefined,
        shopPhone: body.shopPhone != null ? String(body.shopPhone) : undefined,
        shopWhatsapp: body.shopWhatsapp != null ? String(body.shopWhatsapp) : undefined,
        shopInstagram: body.shopInstagram != null ? String(body.shopInstagram) : undefined,
        shopWebsite: body.shopWebsite != null ? String(body.shopWebsite) : undefined,
        shopDescription: body.shopDescription != null ? String(body.shopDescription) : undefined,
      };
    } else {
      if (!validateGeneral(body)) {
        return NextResponse.json(
          { error: "General form requires firstName, lastName, and email." },
          { status: 400 }
        );
      }
      payload = { ...base, formType: "general" };
    }

    // Optional: forward to n8n for WhatsApp / CRM automation
    await forwardToN8n(formType, payload);

    // 201 + payload (you can later add Strapi create here or in n8n)
    return NextResponse.json(
      { success: true, formType: payload.formType, submittedAt: payload.submittedAt },
      { status: 201 }
    );
  } catch (e) {
    console.error("[contact API] Error:", e);
    return NextResponse.json(
      { error: "Invalid request body or server error." },
      { status: 500 }
    );
  }
}
