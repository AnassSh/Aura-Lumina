"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface LookbookFiltersProps {
  categories: readonly string[];
  translations: Record<string, string>;
  currentCategory: string;
}

export default function LookbookFilters({
  categories,
  translations,
  currentCategory,
}: LookbookFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterClick = useCallback(
    (categoryKey: string) => {
      const params = new URLSearchParams(searchParams.toString());
      
      // Remove collection filter when changing category
      params.delete("collection");
      
      if (categoryKey === "catAll") {
        params.delete("category");
      } else {
        // Map translation key to filter value
        const filterMap: Record<string, string> = {
          catNewArrivals: "new",
          catBestsellers: "bestseller",
          catOnSale: "sale",
          catEveryday: "everyday",
          catFormal: "formal",
        };
        params.set("category", filterMap[categoryKey] || categoryKey);
      }
      
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  // Determine active category based on URL
  const getActiveCategory = () => {
    const categoryParam = searchParams.get("category");
    if (!categoryParam) return "catAll";
    
    const reverseMap: Record<string, string> = {
      new: "catNewArrivals",
      bestseller: "catBestsellers",
      sale: "catOnSale",
      everyday: "catEveryday",
      formal: "catFormal",
    };
    
    return reverseMap[categoryParam] || "catAll";
  };

  const activeCategory = getActiveCategory();

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => handleFilterClick(key)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === key
              ? "bg-softBlack-900 text-beige-50"
              : "bg-beige-100 text-softBlack-700 hover:bg-beige-200"
          }`}
        >
          {translations[key]}
        </button>
      ))}
    </div>
  );
}
