"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import type { Abaya } from "@/lib/data/types";

interface ProductGridProps {
  products: Abaya[];
  translations: Record<string, string>;
  colorToHex: Record<string, string>;
}

export default function ProductGrid({
  products,
  translations,
  colorToHex,
}: ProductGridProps) {
  const searchParams = useSearchParams();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  const filteredProducts = useMemo(() => {
    const category = searchParams.get("category");

    if (!category) return products;
    return products.filter((p) => p.filterCategory === category);
  }, [products, searchParams]);

  const setSize = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-softBlack-500 text-lg">
          {translations["noProducts"] || "No products found for this filter."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredProducts.map((product) => {
        const productTitle = translations[product.titleKey] || product.titleKey;
        const selectedSize = selectedSizes[product.id] ?? product.sizes?.[0] ?? "";
        const params = new URLSearchParams({
          product: productTitle,
          price: product.price,
          image: product.image,
        });
        if (selectedSize) params.set("size", selectedSize);
        if (product.sizes?.length) params.set("sizes", product.sizes.join(","));
        const buyNowHref = `/contact?${params.toString()}`;

        return (
          <article key={product.id} className="group">
            <div className="card flex flex-col">
              <div className="relative aspect-[3/4] overflow-hidden bg-beige-100">
                <Image
                  src={product.image}
                  alt={productTitle}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.badge && (
                  <span
                    className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full ${
                      product.badge === "sale"
                        ? "bg-rose-500 text-white"
                        : product.badge === "new"
                        ? "bg-gold-500 text-softBlack-900"
                        : "bg-softBlack-900 text-white"
                    }`}
                  >
                    {translations[product.badge] || product.badge}
                  </span>
                )}
              </div>
              <div className="p-5 pb-2">
                <h3 className="text-lg font-medium text-softBlack-800 mb-2 group-hover:text-gold-600 transition-colors">
                  {productTitle}
                </h3>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-lg font-semibold text-gold-600">
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-softBlack-400 line-through">
                      {product.originalPrice}
                    </span>
                  )}
                </div>

                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-medium text-softBlack-600 mb-1.5">
                      {translations["selectSize"] || "Select Size"}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSize(product.id, size)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
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
                )}

                <div className="flex items-center gap-2">
                  {product.colors?.map((color) => (
                    <button
                      key={color}
                      type="button"
                      title={color}
                      className="w-6 h-6 rounded-full border-2 border-beige-200 hover:border-gold-500 transition-colors"
                      style={{
                        backgroundColor: colorToHex[color] ?? "#ddd",
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="px-5 pb-5 pt-2">
                <Link
                  href={buyNowHref}
                  className="w-full py-2.5 bg-gold-600 text-white text-sm font-medium rounded-full hover:bg-gold-700 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {translations["buyNow"] || "Buy Now"}
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
