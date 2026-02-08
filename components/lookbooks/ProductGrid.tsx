"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useMemo } from "react";
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
  
  const filteredProducts = useMemo(() => {
    const category = searchParams.get("category");
    
    // No category filter = show all
    if (!category) return products;
    
    // Filter by category only
    return products.filter((p) => p.filterCategory === category);
  }, [products, searchParams]);

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
      {filteredProducts.map((product) => (
        <article key={product.id} className="group">
          <div className="card">
            <div className="relative aspect-[3/4] overflow-hidden bg-beige-100">
              <Image
                src={product.image}
                alt={translations[product.titleKey] || product.titleKey}
                fill
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

              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  type="button"
                  className="w-full py-3 bg-white text-softBlack-900 font-medium rounded-full hover:bg-softBlack-900 hover:text-white transition-colors shadow-lg"
                >
                  {translations["quickView"] || "Quick View"}
                </button>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-medium text-softBlack-800 mb-2 group-hover:text-gold-600 transition-colors">
                {translations[product.titleKey] || product.titleKey}
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
          </div>
        </article>
      ))}
    </div>
  );
}
