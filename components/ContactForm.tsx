"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useState, useCallback, useEffect, Suspense } from "react";
import Image from "next/image";
import type { ContactFormType } from "@/app/api/contact/route";
import { COLOR_HEX_MAP } from "@/lib/data/types";

const inquiryTypeKeys = [
  "inquiryClientForm",
  "inquiryPartnership",
  "inquiryGeneral",
] as const;

function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 3) return digits;
  if (digits.length <= 9) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 9)}`;
}

function ContactFormInner() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read product context from URL params
  const productName = searchParams.get("product");
  const productPrice = searchParams.get("price");
  const productImage = searchParams.get("image");
  const productSizesParam = searchParams.get("sizes");
  const productSizes = productSizesParam ? productSizesParam.split(",") : [];
  const initialSize = searchParams.get("size") || "";
  const initialQuantity = parseInt(searchParams.get("quantity") || "1", 10);
  const shopSlug = searchParams.get("shopSlug") || "";
  const productSlug = searchParams.get("productSlug") || "";
  const productColor = searchParams.get("color") || "";
  const inquiryParam = searchParams.get("inquiry");

  const hasProduct = !!productName;

  const [inquiryType, setInquiryType] = useState(() => {
    if (inquiryParam === "partner") return "inquiryPartnership";
    if (hasProduct) return "inquiryClientForm";
    return "";
  });
  const [phone, setPhone] = useState("");
  const [shopPhone, setShopPhone] = useState("");
  const [shopWhatsapp, setShopWhatsapp] = useState("");
  const [selectedSize, setSelectedSize] = useState(initialSize);
  const [quantity, setQuantity] = useState(initialQuantity);

  const isClientForm = inquiryType === "inquiryClientForm";
  const isPartnerForm = inquiryType === "inquiryPartnership";

  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  // When URL has ?inquiry=partner, keep inquiry type set to Partner (e.g. after client nav)
  useEffect(() => {
    if (inquiryParam === "partner") setInquiryType("inquiryPartnership");
  }, [inquiryParam]);

  // Persist size/quantity in sessionStorage
  useEffect(() => {
    if (hasProduct && productSlug) {
      const key = `order_${productSlug}`;
      const stored = sessionStorage.getItem(key);
      if (stored) {
        try {
          const data = JSON.parse(stored);
          if (!initialSize && data.size) setSelectedSize(data.size);
          if (data.quantity) setQuantity(data.quantity);
        } catch {
          // ignore
        }
      }
    }
  }, [hasProduct, productSlug, initialSize]);

  useEffect(() => {
    if (hasProduct && productSlug) {
      const key = `order_${productSlug}`;
      sessionStorage.setItem(
        key,
        JSON.stringify({ size: selectedSize, quantity })
      );
    }
  }, [selectedSize, quantity, hasProduct, productSlug]);

  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatPhoneNumber(e.target.value);
      setPhone(formatted);
    },
    []
  );

  const handleShopPhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setShopPhone(formatPhoneNumber(e.target.value));
    },
    []
  );
  const handleShopWhatsappChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setShopWhatsapp(formatPhoneNumber(e.target.value));
    },
    []
  );

  const handleCancelOrder = useCallback(() => {
    // Clear persisted data
    if (productSlug) {
      sessionStorage.removeItem(`order_${productSlug}`);
    }
    // Navigate to clean contact page (no product params)
    router.push("/contact");
  }, [productSlug, router]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmitError(null);
      setSubmitStatus("loading");

      const form = e.currentTarget;
      const fd = new FormData(form);

      // Use the form's submitted inquiry type (not state) so formType is always correct
      const submittedInquiryType = (fd.get("inquiryType") as string) || "";
      const formType: ContactFormType =
        submittedInquiryType === "inquiryClientForm"
          ? "order"
          : submittedInquiryType === "inquiryPartnership"
            ? "partner"
            : "general";

      const payload: Record<string, unknown> = {
        formType,
        firstName: (fd.get("firstName") as string)?.trim() || "",
        lastName: (fd.get("lastName") as string)?.trim() || "",
        email: (fd.get("email") as string)?.trim() || "",
        message: (fd.get("message") as string)?.trim() || undefined,
        newsletter: fd.get("newsletter") === "on",
        locale,
        submittedAt: new Date().toISOString(),
      };

      if (formType === "order") {
        payload.address = (fd.get("address") as string)?.trim();
        payload.phone = fd.get("phone") ? `+212 ${(fd.get("phone") as string).replace(/\D/g, "").trim()}` : undefined;
        payload.instagram = (fd.get("instagram") as string)?.trim() || undefined;
        payload.facebook = (fd.get("facebook") as string)?.trim() || undefined;
        payload.productName = (fd.get("productName") as string) || undefined;
        payload.productPrice = (fd.get("productPrice") as string) || undefined;
        payload.productImage = (fd.get("productImage") as string) || undefined;
        payload.selectedSize = (fd.get("selectedSize") as string) || undefined;
        payload.selectedColor = (fd.get("selectedColor") as string) || undefined;
        payload.quantity = fd.get("quantity") ? parseInt(String(fd.get("quantity")), 10) : undefined;
        payload.shopSlug = (fd.get("shopSlug") as string) || undefined;
        payload.productSlug = (fd.get("productSlug") as string) || undefined;
      }

      if (formType === "partner") {
        payload.shopName = (fd.get("shopName") as string)?.trim() || "";
        payload.shopCity = (fd.get("shopCity") as string)?.trim() || "";
        payload.shopNeighborhood = (fd.get("shopNeighborhood") as string)?.trim() || undefined;
        payload.shopAddress = (fd.get("shopAddress") as string)?.trim() || undefined;
        const shopPhoneRaw = (fd.get("shopPhone") as string)?.trim() || "";
        const shopWhatsappRaw = (fd.get("shopWhatsapp") as string)?.trim() || "";
        payload.shopPhone = shopPhoneRaw ? `+212 ${shopPhoneRaw.replace(/\D/g, "")}` : undefined;
        payload.shopWhatsapp = shopWhatsappRaw ? `+212 ${shopWhatsappRaw.replace(/\D/g, "")}` : undefined;
        payload.shopInstagram = (fd.get("shopInstagram") as string)?.trim() || undefined;
        payload.shopWebsite = (fd.get("shopWebsite") as string)?.trim() || undefined;
        payload.shopDescription = (fd.get("shopDescription") as string)?.trim() || undefined;
      }

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          setSubmitError((data.error as string) || t("errorGeneric"));
          setSubmitStatus("error");
          return;
        }
        setSubmitStatus("success");
        form.reset();
        setInquiryType("");
        setPhone("");
        setShopPhone("");
        setShopWhatsapp("");
        setSelectedSize(initialSize);
        setQuantity(initialQuantity);
        // Clear product from URL after order submit so product preview disappears
        if (formType === "order") {
          router.push("/contact");
        }
      } catch {
        setSubmitError(t("errorGeneric"));
        setSubmitStatus("error");
      }
    },
    [locale, initialSize, initialQuantity, t, router]
  );

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
      <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-6">
        {hasProduct && isClientForm ? t("orderFormTitle") : t("formTitle")}
      </h2>

      {/* Product Preview – only when Product Order is selected */}
      {hasProduct && isClientForm && (
        <div className="mb-8 p-4 bg-beige-50 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-softBlack-500">
              {t("productOrder")}
            </h3>
            <button
              type="button"
              onClick={handleCancelOrder}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-full transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              {t("cancelOrder")}
            </button>
          </div>
          <div className="flex gap-4">
            {productImage && (
              <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-beige-100 flex-shrink-0">
                <Image
                  src={productImage}
                  alt={productName || ""}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-softBlack-900 truncate">
                {productName}
              </p>
              {productPrice && (
                <p className="text-gold-600 font-semibold text-sm">
                  {productPrice}
                </p>
              )}

              {/* Chosen color */}
              {productColor && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs font-medium text-softBlack-600">
                    {t("color")}:
                  </span>
                  <span
                    className="inline-block w-4 h-4 rounded-full border border-beige-300 flex-shrink-0"
                    style={{
                      backgroundColor: COLOR_HEX_MAP[productColor] ?? "#9ca3af",
                    }}
                    aria-hidden
                  />
                  <span className="text-sm text-softBlack-800">{productColor}</span>
                </div>
              )}

              {/* Size selector */}
              {productSizes.length > 0 && (
                <div className="mt-2">
                  <label className="text-xs font-medium text-softBlack-600">
                    {t("size")}
                  </label>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-1">
                    {productSizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`min-h-[2.25rem] px-3 py-1.5 sm:py-2 text-xs rounded-full border transition-colors ${
                          selectedSize === size
                            ? "bg-softBlack-900 text-white border-softBlack-900"
                            : "border-beige-300 text-softBlack-600 hover:border-gold-500"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mt-2 flex items-center gap-2">
                <label className="text-xs font-medium text-softBlack-600">
                  {t("quantity")}
                </label>
                <div className="flex items-center border border-beige-200 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-1 text-softBlack-600 hover:text-softBlack-900"
                  >
                    −
                  </button>
                  <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2.5 py-1 text-softBlack-600 hover:text-softBlack-900"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Name fields */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-softBlack-700 mb-2"
            >
              {t("firstName")}
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              autoComplete="given-name"
              required
              className="w-full px-4 py-3 border border-beige-200 rounded-xl focus:outline-none focus:border-gold-500 transition-colors"
              placeholder={t("firstNamePlaceholder")}
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-softBlack-700 mb-2"
            >
              {t("lastName")}
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              autoComplete="family-name"
              required
              className="w-full px-4 py-3 border border-beige-200 rounded-xl focus:outline-none focus:border-gold-500 transition-colors"
              placeholder={t("lastNamePlaceholder")}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-softBlack-700 mb-2"
          >
            {t("email")}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            required
            className="w-full px-4 py-3 border border-beige-200 rounded-xl focus:outline-none focus:border-gold-500 transition-colors"
            placeholder={t("emailPlaceholder")}
          />
        </div>

        {/* Inquiry Type */}
        <div>
          <label
            htmlFor="inquiryType"
            className="block text-sm font-medium text-softBlack-700 mb-2"
          >
            {t("inquiryType")}
          </label>
          <select
            id="inquiryType"
            name="inquiryType"
            required
            value={inquiryType}
            onChange={(e) => setInquiryType(e.target.value)}
            className="w-full px-4 py-3 border border-beige-200 rounded-xl focus:outline-none focus:border-gold-500 transition-colors text-softBlack-700"
          >
            <option value="">{t("selectOption")}</option>
            {inquiryTypeKeys.map((key) => (
              <option key={key} value={key}>
                {t(key)}
              </option>
            ))}
          </select>
        </div>

        {/* Client Form Extra Fields */}
        {isClientForm && (
          <div className="space-y-6 p-6 bg-beige-50/70 rounded-2xl border border-beige-200">
            <p className="text-sm font-semibold text-softBlack-800">
              {t("clientInfoTitle")}
            </p>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-softBlack-700 mb-2"
              >
                {t("addressLabel")}
              </label>
              <input
                type="text"
                id="address"
                name="address"
                autoComplete="street-address"
                required
                className="w-full px-4 py-3 border border-beige-200 rounded-xl focus:outline-none focus:border-gold-500 transition-colors bg-white"
                placeholder={t("addressPlaceholder")}
              />
            </div>

            {/* Instagram & Facebook (optional) */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="instagram"
                  className="block text-sm font-medium text-softBlack-700 mb-2"
                >
                  {t("instagramHandle")}
                </label>
                <input
                  type="text"
                  id="instagram"
                  name="instagram"
                  className="w-full px-4 py-3 border border-beige-200 rounded-xl focus:outline-none focus:border-gold-500 transition-colors bg-white"
                  placeholder={t("instagramPlaceholder")}
                />
              </div>
              <div>
                <label
                  htmlFor="facebook"
                  className="block text-sm font-medium text-softBlack-700 mb-2"
                >
                  {t("facebookProfile")}
                </label>
                <input
                  type="text"
                  id="facebook"
                  name="facebook"
                  className="w-full px-4 py-3 border border-beige-200 rounded-xl focus:outline-none focus:border-gold-500 transition-colors bg-white"
                  placeholder={t("facebookPlaceholder")}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-softBlack-700 mb-2"
              >
                {t("phoneNumber")}
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-4 py-3 bg-beige-100 border border-r-0 border-beige-200 rounded-l-xl text-softBlack-700 text-sm font-medium select-none">
                  +212
                </span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={phone}
                  onChange={handlePhoneChange}
                  maxLength={10}
                  className="w-full px-4 py-3 border border-beige-200 rounded-r-xl focus:outline-none focus:border-gold-500 transition-colors bg-white"
                  placeholder={t("phonePlaceholder")}
                />
              </div>
              <p className="text-xs text-softBlack-400 mt-1">
                {t("phoneFormat")}
              </p>
            </div>
          </div>
        )}

        {/* Partner Form Extra Fields */}
        {isPartnerForm && (
          <div className="space-y-6 p-6 bg-gold-50/50 rounded-2xl border border-gold-200">
            <p className="text-sm font-semibold text-softBlack-800">
              {t("partnerInfoTitle")}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="shopName" className="block text-sm font-medium text-softBlack-700 mb-2">
                  {t("shopName")} *
                </label>
                <input
                  type="text"
                  id="shopName"
                  name="shopName"
                  required
                  className="w-full px-4 py-3 border border-beige-200 rounded-xl focus:outline-none focus:border-gold-500 transition-colors bg-white"
                  placeholder={t("shopNamePlaceholder")}
                />
              </div>
              <div>
                <label htmlFor="shopCity" className="block text-sm font-medium text-softBlack-700 mb-2">
                  {t("shopCity")} *
                </label>
                <input
                  type="text"
                  id="shopCity"
                  name="shopCity"
                  required
                  className="w-full px-4 py-3 border border-beige-200 rounded-xl focus:outline-none focus:border-gold-500 transition-colors bg-white"
                  placeholder={t("shopCityPlaceholder")}
                />
              </div>
            </div>
            <div>
              <label htmlFor="shopNeighborhood" className="block text-sm font-medium text-softBlack-700 mb-2">
                {t("shopNeighborhood")}
              </label>
              <input
                type="text"
                id="shopNeighborhood"
                name="shopNeighborhood"
                className="w-full px-4 py-3 border border-beige-200 rounded-xl focus:outline-none focus:border-gold-500 transition-colors bg-white"
                placeholder={t("shopNeighborhoodPlaceholder")}
              />
            </div>
            <div>
              <label htmlFor="shopAddress" className="block text-sm font-medium text-softBlack-700 mb-2">
                {t("shopAddress")}
              </label>
              <input
                type="text"
                id="shopAddress"
                name="shopAddress"
                className="w-full px-4 py-3 border border-beige-200 rounded-xl focus:outline-none focus:border-gold-500 transition-colors bg-white"
                placeholder={t("shopAddressPlaceholder")}
              />
            </div>
            <div>
              <label htmlFor="shopPhone" className="block text-sm font-medium text-softBlack-700 mb-2">
                {t("shopPhone")}
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-4 py-3 bg-beige-100 border border-r-0 border-beige-200 rounded-l-xl text-softBlack-700 text-sm font-medium select-none">
                  +212
                </span>
                <input
                  type="tel"
                  id="shopPhone"
                  name="shopPhone"
                  value={shopPhone}
                  onChange={handleShopPhoneChange}
                  maxLength={10}
                  className="w-full px-4 py-3 border border-beige-200 rounded-r-xl focus:outline-none focus:border-gold-500 transition-colors bg-white"
                  placeholder={t("phonePlaceholder")}
                />
              </div>
              <p className="text-xs text-softBlack-400 mt-1">
                {t("phoneFormat")}
              </p>
            </div>
            <div>
              <label htmlFor="shopWhatsapp" className="block text-sm font-medium text-softBlack-700 mb-2">
                {t("shopWhatsapp")}
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-4 py-3 bg-beige-100 border border-r-0 border-beige-200 rounded-l-xl text-softBlack-700 text-sm font-medium select-none">
                  +212
                </span>
                <input
                  type="tel"
                  id="shopWhatsapp"
                  name="shopWhatsapp"
                  value={shopWhatsapp}
                  onChange={handleShopWhatsappChange}
                  maxLength={10}
                  className="w-full px-4 py-3 border border-beige-200 rounded-r-xl focus:outline-none focus:border-gold-500 transition-colors bg-white"
                  placeholder={t("phonePlaceholder")}
                />
              </div>
              <p className="text-xs text-softBlack-400 mt-1">
                {t("phoneFormat")}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="shopInstagram" className="block text-sm font-medium text-softBlack-700 mb-2">
                  {t("shopInstagram")}
                </label>
                <input
                  type="text"
                  id="shopInstagram"
                  name="shopInstagram"
                  className="w-full px-4 py-3 border border-beige-200 rounded-xl focus:outline-none focus:border-gold-500 transition-colors bg-white"
                  placeholder={t("shopInstagramPlaceholder")}
                />
              </div>
              <div>
                <label htmlFor="shopWebsite" className="block text-sm font-medium text-softBlack-700 mb-2">
                  {t("shopWebsite")}
                </label>
                <input
                  type="url"
                  id="shopWebsite"
                  name="shopWebsite"
                  className="w-full px-4 py-3 border border-beige-200 rounded-xl focus:outline-none focus:border-gold-500 transition-colors bg-white"
                  placeholder={t("shopWebsitePlaceholder")}
                />
              </div>
            </div>
            <div>
              <label htmlFor="shopDescription" className="block text-sm font-medium text-softBlack-700 mb-2">
                {t("shopDescription")}
              </label>
              <textarea
                id="shopDescription"
                name="shopDescription"
                rows={3}
                className="w-full px-4 py-3 border border-beige-200 rounded-xl focus:outline-none focus:border-gold-500 transition-colors bg-white resize-none"
                placeholder={t("shopDescriptionPlaceholder")}
              />
            </div>
          </div>
        )}

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-softBlack-700 mb-2"
          >
            {t("message")}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required={false}
            className="w-full px-4 py-3 border border-beige-200 rounded-xl focus:outline-none focus:border-gold-500 transition-colors resize-none"
            placeholder={t("messagePlaceholder")}
          />
        </div>

        {/* Newsletter */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="newsletter"
            name="newsletter"
            className="mt-1 w-4 h-4 text-gold-600 border-beige-300 rounded focus:ring-gold-500"
          />
          <label htmlFor="newsletter" className="text-sm text-softBlack-600">
            {t("newsletterLabel")}
          </label>
        </div>

        {/* Hidden product data */}
        {hasProduct && (
          <>
            <input type="hidden" name="productName" value={productName || ""} />
            <input type="hidden" name="productPrice" value={productPrice || ""} />
            <input type="hidden" name="productImage" value={productImage || ""} />
            <input type="hidden" name="selectedSize" value={selectedSize} />
            <input type="hidden" name="selectedColor" value={productColor} />
            <input type="hidden" name="quantity" value={String(quantity)} />
            <input type="hidden" name="shopSlug" value={shopSlug} />
            <input type="hidden" name="productSlug" value={productSlug} />
          </>
        )}

        {submitStatus === "success" && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">
            {t("successMessage")}
          </div>
        )}
        {submitStatus === "error" && submitError && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm">
            {submitError}
          </div>
        )}

        <button
          type="submit"
          disabled={submitStatus === "loading"}
          className="w-full py-4 bg-softBlack-900 text-white font-medium rounded-full hover:bg-softBlack-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitStatus === "loading" ? t("sending") : hasProduct && isClientForm ? t("submitOrder") : t("send")}
        </button>
      </form>
    </div>
  );
}

export default function ContactForm() {
  return (
    <Suspense
      fallback={
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 animate-pulse min-h-[400px]" />
      }
    >
      <ContactFormInner />
    </Suspense>
  );
}
