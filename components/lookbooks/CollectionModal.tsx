"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { Link } from "@/i18n/navigation";
import type { Lookbook } from "@/lib/data/types";

interface CollectionModalProps {
  lookbooks: Lookbook[];
  translations: Record<string, string>;
  colorToHex: Record<string, string>;
}

// Placeholder images for collection items
const placeholderImages = [
  "/images/abaya-1.svg",
  "/images/abaya-2.svg",
  "/images/abaya-3.svg",
  "/images/abaya-4.svg",
  "/images/abaya-5.svg",
  "/images/abaya-6.svg",
];

// Placeholder colors
const placeholderColors = [
  ["Black", "Navy"],
  ["Dusty Rose", "Mauve"],
  ["Black", "White", "Cream"],
  ["Emerald", "Ruby"],
  ["Black"],
  ["Navy", "Burgundy"],
];

// Placeholder prices
const placeholderPrices = [
  "1,250 MAD",
  "1,450 MAD",
  "1,650 MAD",
  "1,850 MAD",
  "2,200 MAD",
  "2,400 MAD",
];

export default function CollectionModal({
  lookbooks,
  translations,
  colorToHex,
}: CollectionModalProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const collectionSlug = searchParams.get("collection");

  // Find the selected lookbook
  const selectedLookbook = useMemo(() => {
    if (!collectionSlug) return null;
    return lookbooks.find((lb) => lb.slug === collectionSlug) || null;
  }, [collectionSlug, lookbooks]);

  // Generate placeholder products
  const placeholderProducts = useMemo(() => {
    if (!selectedLookbook) return [];
    
    return Array.from({ length: selectedLookbook.itemCount }, (_, i) => ({
      id: `placeholder-${i}`,
      image: placeholderImages[i % placeholderImages.length],
      price: placeholderPrices[i % placeholderPrices.length],
      colors: placeholderColors[i % placeholderColors.length],
      badge: i < 2 ? "new" : i === 3 ? "bestseller" : null,
    }));
  }, [selectedLookbook]);

  // Close modal function
  const closeModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("collection");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && collectionSlug) {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [collectionSlug]);

  // Don't render if no collection selected
  if (!selectedLookbook) return null;

  const collectionTitle = translations[selectedLookbook.titleKey] || selectedLookbook.titleKey;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="collection-modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-softBlack-900/60 backdrop-blur-sm transition-opacity"
        onClick={closeModal}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-beige-200 px-6 py-4 flex items-center justify-between z-10">
            <div>
              <h2 
                id="collection-modal-title" 
                className="text-2xl font-serif font-bold text-softBlack-900"
              >
                {collectionTitle}
              </h2>
              <p className="text-softBlack-500 text-sm">
                {selectedLookbook.itemCount} {translations["pieces"] || "Pieces"}
              </p>
            </div>
            <button
              onClick={closeModal}
              className="w-10 h-10 rounded-full bg-beige-100 hover:bg-beige-200 flex items-center justify-center transition-colors"
              aria-label={translations["close"] || "Close"}
            >
              <svg className="w-5 h-5 text-softBlack-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Products Grid */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {placeholderProducts.map((product, index) => {
                const itemName = `${collectionTitle} - ${translations["item"] || "Item"} ${index + 1}`;
                const buyNowHref = `/contact?product=${encodeURIComponent(itemName)}&price=${encodeURIComponent(product.price)}&image=${encodeURIComponent(product.image)}`;

                return (
                  <article key={product.id} className="group">
                    <div className="bg-beige-50 rounded-2xl overflow-hidden flex flex-col">
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <Image
                          src={product.image}
                          alt={itemName}
                          fill
                          loading="lazy"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {product.badge && (
                          <span
                            className={`absolute top-3 right-3 px-2 py-1 text-xs font-semibold rounded-full ${
                              product.badge === "new"
                                ? "bg-gold-500 text-softBlack-900"
                                : "bg-softBlack-900 text-white"
                            }`}
                          >
                            {translations[product.badge] || product.badge}
                          </span>
                        )}
                      </div>
                      <div className="p-4 pb-2">
                        <h3 className="text-sm font-medium text-softBlack-800 mb-1 group-hover:text-gold-600 transition-colors">
                          {itemName}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-gold-600">
                            {product.price}
                          </span>
                          <div className="flex items-center gap-1">
                            {product.colors.map((color) => (
                              <span
                                key={color}
                                title={color}
                                className="w-4 h-4 rounded-full border border-beige-200"
                                style={{
                                  backgroundColor: colorToHex[color] ?? "#ddd",
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="px-4 pb-4 pt-1">
                        <Link
                          href={buyNowHref}
                          className="w-full py-2 bg-gold-600 text-white text-xs font-medium rounded-full hover:bg-gold-700 transition-colors flex items-center justify-center gap-1.5"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

            {/* Coming Soon Notice */}
            <div className="mt-8 text-center p-6 bg-beige-50 rounded-2xl">
              <p className="text-softBlack-500 italic">
                {translations["comingSoon"] || "Full collection coming soon. These are placeholder items."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
