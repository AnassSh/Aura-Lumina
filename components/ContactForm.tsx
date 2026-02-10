"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useState, useCallback, useEffect, Suspense } from "react";
import Image from "next/image";

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

  const hasProduct = !!productName;

  const [inquiryType, setInquiryType] = useState(
    hasProduct ? "inquiryClientForm" : ""
  );
  const [phone, setPhone] = useState("");
  const [selectedSize, setSelectedSize] = useState(initialSize);
  const [quantity, setQuantity] = useState(initialQuantity);

  const isClientForm = inquiryType === "inquiryClientForm";

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

  const handleCancelOrder = useCallback(() => {
    // Clear persisted data
    if (productSlug) {
      sessionStorage.removeItem(`order_${productSlug}`);
    }
    // Navigate to clean contact page (no product params)
    router.push("/contact");
  }, [productSlug, router]);

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
      <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-6">
        {hasProduct ? t("orderFormTitle") : t("formTitle")}
      </h2>

      {/* Product Preview */}
      {hasProduct && (
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

              {/* Size selector */}
              {productSizes.length > 0 && (
                <div className="mt-2">
                  <label className="text-xs font-medium text-softBlack-600">
                    {t("size")}
                  </label>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {productSizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1 text-xs rounded-full border transition-colors ${
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

      <form className="space-y-6">
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
            required={false}    // optional field so no required
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
            <input
              type="hidden"
              name="productPrice"
              value={productPrice || ""}
            />
            <input type="hidden" name="selectedSize" value={selectedSize} />
            <input type="hidden" name="quantity" value={quantity} />
            <input type="hidden" name="shopSlug" value={shopSlug} />
            <input type="hidden" name="productSlug" value={productSlug} />
          </>
        )}

        <button
          type="submit"
          className="w-full py-4 bg-softBlack-900 text-white font-medium rounded-full hover:bg-softBlack-800 transition-colors"
        >
          {hasProduct ? t("submitOrder") : t("send")}
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
