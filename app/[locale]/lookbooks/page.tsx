import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

// Import from centralized data layer
import {
  getAllLookbooks,
  getLookbookFeaturedAbayasAsync,
  lookbookCategories,
  COLOR_HEX_MAP,
} from "@/lib/data";

// Import client components
import { LookbookFilters, ProductGrid, CollectionModal } from "@/components/lookbooks";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "lookbooks" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

// Get data from centralized data layer
const lookbooksConfig = getAllLookbooks();
const categoryKeys = lookbookCategories;
const colorToHex = COLOR_HEX_MAP;

export default async function LookbooksPage() {
  const featuredProductsConfig = await getLookbookFeaturedAbayasAsync();
  const t = await getTranslations("lookbooks");
  const tProduct = await getTranslations("product");

  // Build translations object for client components
  const translations: Record<string, string> = {
    // Buy Now & Size
    buyNow: tProduct("buyNow"),
    selectSize: tProduct("selectSize"),
    // Categories
    catAll: t("catAll"),
    catNewArrivals: t("catNewArrivals"),
    catBestsellers: t("catBestsellers"),
    catOnSale: t("catOnSale"),
    catEveryday: t("catEveryday"),
    catFormal: t("catFormal"),
    // Badges
    new: t("new"),
    bestseller: t("bestseller"),
    sale: t("sale"),
    // UI
    noProducts: t("noProducts"),
    pieces: t("pieces"),
    item: t("item"),
    close: t("close"),
    comingSoon: t("comingSoon"),
    // Lookbook titles
    lb1Title: t("lb1Title"),
    lb2Title: t("lb2Title"),
    lb3Title: t("lb3Title"),
    lb4Title: t("lb4Title"),
    // Product titles
    abaya1: t("abaya1"),
    abaya2: t("abaya2"),
    abaya3: t("abaya3"),
    abaya4: t("abaya4"),
    lbProd1Title: t("lbProd1Title"),
    lbProd2Title: t("lbProd2Title"),
    lbProd3Title: t("lbProd3Title"),
    lbProd4Title: t("lbProd4Title"),
    lbProd5Title: t("lbProd5Title"),
    lbProd6Title: t("lbProd6Title"),
  };

  return (
    <div className="pt-24 pb-20">
      <section className="relative py-20 bg-gradient-to-br from-beige-100 via-rose-50 to-gold-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-200 rounded-full opacity-30 blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-200 rounded-full opacity-30 blur-3xl transform -translate-x-1/2 translate-y-1/2" />

        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-softBlack-900 mb-4">
              {t("title")}
            </h1>
            <p className="text-lg md:text-xl text-softBlack-500">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </section>

      <section className="container-custom py-16">
        <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-8">
          {t("exploreLookbooks")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {lookbooksConfig.map((lookbook) => (
            <Link
              key={lookbook.id}
              href={`/lookbooks?collection=${lookbook.slug}`}
              className="group block"
            >
              <article className="relative rounded-3xl overflow-hidden">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={lookbook.image}
                    alt={t(lookbook.titleKey)}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-softBlack-900/80 via-softBlack-900/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="inline-block px-3 py-1 bg-gold-500 text-softBlack-900 text-xs font-semibold rounded-full mb-4">
                    {lookbook.itemCount} {t("pieces")}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
                    {t(lookbook.titleKey)}
                  </h3>
                  <p className="text-beige-200 max-w-xl mb-4">
                    {t(lookbook.descKey)}
                  </p>
                  <span className="inline-flex items-center gap-2 text-white font-medium group-hover:text-gold-400 transition-colors">
                    {t("exploreCollection")}
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <section id="shop-favorites" className="bg-white py-16">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-4 md:mb-0">
              {t("shopFavorites")}
            </h2>

            <LookbookFilters
              categories={categoryKeys}
              translations={translations}
              currentCategory="catAll"
            />
          </div>

          <ProductGrid
            products={featuredProductsConfig}
            translations={translations}
            colorToHex={colorToHex}
          />

          <div className="text-center mt-12">
            <button type="button" className="btn-secondary">
              {t("loadMore")}
            </button>
          </div>
        </div>
      </section>

      <section className="container-custom py-12">
        <div className="bg-gradient-to-r from-gold-100 via-beige-100 to-rose-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="w-full md:max-w-xl">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-softBlack-900 mb-2">
                {t("findFit")}
              </h3>
              <p className="text-softBlack-600">
                {t("findFitDesc")}
              </p>
            </div>
            <Link href="/size-guide" className="w-full sm:w-auto btn-primary whitespace-nowrap text-center">
              {t("viewSizeGuide")}
            </Link>
          </div>
        </div>
      </section>

      {/* Collection Modal - shows when ?collection=slug is in URL */}
      <CollectionModal
        lookbooks={lookbooksConfig}
        translations={translations}
        colorToHex={colorToHex}
      />
    </div>
  );
}
