"use client";

import { useState, useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface ProductActionsProps {
  product: {
    slug: string;
    name: string;
    price: string;
    colors: { name: string; hex: string }[];
    sizes: string[];
    images: string[];
  };
  shop: {
    slug: string;
    phone: string;
    whatsapp: string;
  };
}

export default function ProductActions({
  product,
  shop,
}: ProductActionsProps) {
  const t = useTranslations("product");
  const router = useRouter();

  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.name || ""
  );
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Restore persisted selections from sessionStorage
  useEffect(() => {
    const key = `order_${product.slug}`;
    const stored = sessionStorage.getItem(key);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (data.size) setSelectedSize(data.size);
        if (data.quantity) setQuantity(data.quantity);
        if (data.color) setSelectedColor(data.color);
      } catch {
        // ignore
      }
    }
  }, [product.slug]);

  // Persist selections to sessionStorage
  useEffect(() => {
    const key = `order_${product.slug}`;
    sessionStorage.setItem(
      key,
      JSON.stringify({ size: selectedSize, quantity, color: selectedColor })
    );
  }, [selectedSize, quantity, selectedColor, product.slug]);

  const handleBuyNow = () => {
    const params = new URLSearchParams({
      product: product.name,
      price: product.price,
      image: product.images[0] || "",
      shopSlug: shop.slug,
      productSlug: product.slug,
      quantity: String(quantity),
    });
    if (selectedSize) params.set("size", selectedSize);
    if (product.sizes.length > 0) params.set("sizes", product.sizes.join(","));
    if (selectedColor) params.set("color", selectedColor);

    router.push(`/contact?${params.toString()}`);
  };

  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in the "${product.name}" (${product.price}) I saw on Aura Lumina. Is it available?`
  );

  return (
    <>
      {/* Colors */}
      <div className="mb-6">
        <p className="text-sm font-medium text-softBlack-800 mb-3">
          {t("availableColors")}
          {selectedColor && (
            <span className="ml-2 text-softBlack-500 font-normal">
              — {selectedColor}
            </span>
          )}
        </p>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {product.colors.map((color) => (
            <button
              key={color.name}
              type="button"
              title={color.name}
              onClick={() => setSelectedColor(color.name)}
              className={`min-w-[2.5rem] min-h-[2.5rem] w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 transition-colors relative group flex-shrink-0 ${
                selectedColor === color.name
                  ? "border-gold-500 ring-2 ring-gold-200"
                  : "border-beige-200 hover:border-gold-500"
              }`}
              style={{ backgroundColor: color.hex }}
            >
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-softBlack-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {color.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-6">
        <p className="text-sm font-medium text-softBlack-800 mb-3">
          {t("selectSize")}
        </p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`min-h-[2.5rem] px-3 py-2 sm:px-4 border rounded-full text-xs sm:text-sm font-medium transition-colors ${
                selectedSize === size
                  ? "bg-softBlack-900 text-white border-softBlack-900"
                  : "border-beige-200 text-softBlack-700 hover:border-gold-500"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="mb-8">
        <p className="text-sm font-medium text-softBlack-800 mb-3">
          {t("quantity")}
        </p>
        <div className="inline-flex items-center border border-beige-200 rounded-xl">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-3 text-softBlack-600 hover:text-softBlack-900 transition-colors"
          >
            −
          </button>
          <span className="px-4 py-3 text-sm font-semibold min-w-[3rem] text-center border-x border-beige-200">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-3 text-softBlack-600 hover:text-softBlack-900 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* CTAs */}
      <div className="space-y-3 mb-8">
        {/* Buy Now */}
        <button
          type="button"
          onClick={handleBuyNow}
          className="w-full py-4 bg-gold-600 text-white font-medium rounded-full hover:bg-gold-700 transition-colors flex items-center justify-center gap-3"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          {t("buyNow")}
        </button>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${shop.whatsapp}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 transition-colors flex items-center justify-center gap-3"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          {t("inquireWhatsApp")}
        </a>

        {/* Call */}
        <a
          href={`tel:${shop.phone}`}
          className="w-full py-4 border-2 border-softBlack-900 text-softBlack-900 font-medium rounded-full hover:bg-softBlack-900 hover:text-white transition-colors flex items-center justify-center gap-3"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          {t("call")} {shop.phone}
        </a>
      </div>
    </>
  );
}
