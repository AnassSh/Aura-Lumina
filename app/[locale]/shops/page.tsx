import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import SectionHeader from "@/components/ui/SectionHeader";

// Import from centralized data layer
import { getAllShopListings, cities } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "shops" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      images: ["/images/og-image.svg"],
    },
  };
}

// Get data from centralized data layer
const shops = getAllShopListings();

export default async function ShopsPage() {
  const t = await getTranslations("shops");

  return (
    <div className="pt-24 pb-20">
      <section className="relative py-20 bg-gradient-to-br from-beige-100 via-rose-50 to-gold-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-200 rounded-full opacity-30 blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-200 rounded-full opacity-30 blur-3xl transform -translate-x-1/2 translate-y-1/2" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-gold-100 text-gold-700 rounded-full text-sm font-medium mb-6">
              {t("badge")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-softBlack-900 mb-6">
              {t("heroTitle1")}
              <span className="block text-gold-600">{t("heroTitle2")}</span>
            </h1>
            <p className="text-lg text-softBlack-600 mb-8">
              {t("heroDesc")}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-beige-200 sticky top-20 z-30">
        <div className="container-custom py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {cities.map((city) => (
                <button
                  key={city}
                  type="button"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    city === "All Cities"
                      ? "bg-softBlack-900 text-beige-50"
                      : "bg-beige-100 text-softBlack-700 hover:bg-beige-200"
                  }`}
                >
                  {city === "All Cities" ? t("allCities") : city}
                </button>
              ))}
            </div>
            <p className="text-softBlack-500 text-sm">
              {t("partnerShopsCount", { count: shops.length })}
            </p>
          </div>
        </div>
      </section>

      <section className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {shops.map((shop) => (
            <Link
              key={shop.slug}
              href={`/shops/${shop.slug}`}
              className="group block"
            >
              <article className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={shop.image}
                    alt={`${shop.name} boutique in ${shop.city}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-softBlack-900/70 via-transparent to-transparent" />

                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-softBlack-800 flex items-center gap-1.5">
                    <svg
                      className="w-4 h-4 text-gold-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {shop.city}
                  </div>

                  <div className="absolute top-4 right-4 px-3 py-1.5 bg-gold-500 rounded-full text-xs font-semibold text-softBlack-900">
                    {t("est")} {shop.established}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="text-2xl font-serif font-bold text-white mb-1 group-hover:text-gold-300 transition-colors">
                      {shop.name}
                    </h2>
                    <p className="text-beige-200 text-sm mb-3">{shop.tagline}</p>
                    <div className="flex flex-wrap gap-2">
                      {shop.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-softBlack-500">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-sm">
                      {shop.neighborhood}, {shop.city}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-gold-600 font-medium text-sm group-hover:gap-2 transition-all">
                    {t("visitShop")}
                    <svg
                      className="w-4 h-4"
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

      <section className="bg-beige-50 py-16">
        <div className="container-custom">
          <SectionHeader
            title={t("whyShopLocal")}
            subtitle={t("whyShopLocalDesc")}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gold-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-softBlack-900 mb-2">
                {t("verifiedQuality")}
              </h3>
              <p className="text-softBlack-500 text-sm">
                {t("verifiedQualityDesc")}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-rose-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-softBlack-900 mb-2">
                {t("supportArtisans")}
              </h3>
              <p className="text-softBlack-500 text-sm">
                {t("supportArtisansDesc")}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-beige-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-beige-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-softBlack-900 mb-2">
                {t("personalService")}
              </h3>
              <p className="text-softBlack-500 text-sm">
                {t("personalServiceDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-softBlack-900 to-softBlack-800 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
              {t("ctaTitle")}
            </h2>
            <p className="text-beige-300 mb-8 max-w-xl mx-auto">
              {t("ctaDesc")}
            </p>
            <Link
              href="/contact?inquiry=partner"
              className="inline-flex items-center px-6 py-3 bg-gold-500 text-softBlack-900 font-medium rounded-full hover:bg-gold-400 transition-colors"
            >
              {t("becomePartner")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
