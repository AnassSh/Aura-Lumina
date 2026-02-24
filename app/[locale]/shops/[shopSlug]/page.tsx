import type { Metadata } from "next";
import Image from "next/image";

export const dynamic = "force-dynamic";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

// Import from centralized data layer
import { getShopsAsync, getAllShopSlugsAsync } from "@/lib/data";

// Static generation for all shop pages (per locale)
export async function generateStaticParams() {
  const slugs = await getAllShopSlugsAsync();
  return routing.locales.flatMap((locale) =>
    slugs.map((shopSlug) => ({ locale, shopSlug }))
  );
}

// Dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; shopSlug: string }>;
}): Promise<Metadata> {
  const { shopSlug } = await params;
  const shopsData = await getShopsAsync();
  const shop = shopsData[shopSlug];

  if (!shop) {
    return { title: "Shop Not Found" };
  }

  return {
    title: `${shop.name} | Local Modest Fashion Shop in ${shop.location.city}`,
    description: `Visit ${shop.name} in ${shop.location.neighborhood}, ${shop.location.city}. ${shop.tagline}. Specializing in ${shop.specialties.slice(0, 2).join(" and ")}. Established ${shop.established}.`,
    keywords: [
      shop.name,
      "modest fashion",
      "abayas",
      shop.location.city,
      shop.location.neighborhood,
      "local shop",
      "Moroccan fashion",
      ...shop.specialties,
    ],
    openGraph: {
      title: `${shop.name} | ${shop.tagline}`,
      description: `Discover ${shop.name} in ${shop.location.city}. ${shop.specialties.join(", ")}.`,
      images: [shop.image],
      type: "website",
      locale: "en_US",
    },
  };
}

export default async function ShopProfilePage({
  params,
}: {
  params: Promise<{ locale: string; shopSlug: string }>;
}) {
  const { shopSlug } = await params;
  const shopsData = await getShopsAsync();
  const shop = shopsData[shopSlug];
  const t = await getTranslations("shops");

  if (!shop) {
    return (
      <div className="pt-32 pb-20 text-center">
        <div className="container-custom">
          <h1 className="text-4xl font-serif font-bold text-softBlack-900 mb-4">
            {t("shopNotFound")}
          </h1>
          <p className="text-softBlack-500 mb-8">
            {t("shopNotFoundDesc")}
          </p>
          <Link href="/shops" className="btn-primary">
            {t("browseAllShops")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      {/* JSON-LD Structured Data for Local Business */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: shop.name,
            description: shop.tagline,
            image: `https://auralumina.com${shop.image}`,
            address: {
              "@type": "PostalAddress",
              streetAddress: shop.location.address,
              addressLocality: shop.location.city,
              addressCountry: "MA",
            },
            telephone: shop.contact.phone,
            openingHours: ["Mo-Fr 10:00-20:00", "Sa 10:00-21:00"],
            priceRange: "$$",
            sameAs: shop.contact.instagram
              ? [`https://instagram.com/${shop.contact.instagram}`]
              : [],
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[50vh] min-h-[400px]">
          <Image
            src={shop.image}
            alt={`${shop.name} boutique in ${shop.location.city}`}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-softBlack-900/80 via-softBlack-900/40 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <div className="container-custom pb-12">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 bg-gold-500 text-softBlack-900 text-sm font-medium rounded-full mb-4">
                Est. {shop.established}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-3">
                {shop.name}
              </h1>
              <p className="text-xl text-beige-200 mb-4">{shop.tagline}</p>
              <div className="flex items-center gap-2 text-beige-300">
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>
                  {shop.location.neighborhood}, {shop.location.city}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-beige-50 border-b border-beige-200">
        <div className="container-custom py-6">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {shop.specialties.map((specialty, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gold-500 rounded-full" />
                <span className="text-softBlack-700 font-medium">
                  {specialty}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-custom py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Story & Gallery */}
          <div className="lg:col-span-2 space-y-12">
            {/* Our Story */}
            <section>
              <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-gold-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-gold-600"
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
                </span>
                {t("ourStory")}
              </h2>
              <div className="prose prose-lg max-w-none text-softBlack-600 leading-relaxed">
                {shop.story.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            {/* Gallery */}
            <section>
              <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-6">
                {t("insideBoutique")}
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {shop.gallery.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-2xl overflow-hidden"
                  >
                    <Image
                      src={image}
                      alt={`${shop.name} boutique interior ${index + 1}`}
                      fill
                      loading="lazy"
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Featured Products */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-serif font-semibold text-softBlack-900">
                  {t("featuredPieces")}
                </h2>
                <Link
                  href={`/shops/${shopSlug}/products`}
                  className="text-gold-600 font-medium hover:underline text-sm"
                >
                  {t("viewAllProducts")}
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {shop.featuredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/shops/${shopSlug}/products/${product.slug}`}
                    className="group block"
                  >
                    <article>
                      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-beige-100 mb-4">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          loading="lazy"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <h3 className="font-medium text-softBlack-800 mb-1 group-hover:text-gold-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gold-600 font-semibold">
                        {product.price}
                      </p>
                    </article>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link
                  href={`/shops/${shopSlug}/products`}
                  className="btn-secondary"
                >
                  {t("browseAllProducts")}
                </Link>
              </div>
            </section>
          </div>

          {/* Right Column - Contact & Info */}
          <aside className="space-y-8">
            {/* Contact Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-28">
              <h3 className="text-xl font-serif font-semibold text-softBlack-900 mb-6">
                {t("visitUs")}
              </h3>

              {/* Address */}
              <div className="mb-6">
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-10 h-10 bg-beige-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-softBlack-600"
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
                  </div>
                  <div>
                    <p className="font-medium text-softBlack-800">{t("address")}</p>
                    <p className="text-softBlack-500 text-sm">
                      {shop.location.address}
                    </p>
                  </div>
                </div>
                <a
                  href={shop.location.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-600 text-sm hover:underline ml-13"
                >
                  {t("getDirections")}
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 mb-6">
                <div className="w-10 h-10 bg-beige-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-softBlack-600"
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
                </div>
                <div>
                  <p className="font-medium text-softBlack-800">{t("phone")}</p>
                  <a
                    href={`tel:${shop.contact.phone}`}
                    className="text-softBlack-500 text-sm hover:text-gold-600"
                  >
                    {shop.contact.phone}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3 mb-8">
                <div className="w-10 h-10 bg-beige-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-softBlack-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-softBlack-800 mb-1">{t("hours")}</p>
                  <div className="text-softBlack-500 text-sm space-y-1">
                    <p>{t("monFri")} {shop.hours.weekdays}</p>
                    <p>{t("saturday")} {shop.hours.saturday}</p>
                    <p>{t("sunday")} {shop.hours.sunday}</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <a
                  href={`https://wa.me/${shop.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {t("chatWhatsApp")}
                </a>

                {shop.contact.instagram && (
                  <a
                    href={`https://instagram.com/${shop.contact.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 border-2 border-softBlack-900 text-softBlack-900 font-medium rounded-full hover:bg-softBlack-900 hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                    </svg>
                    Instagram
                  </a>
                )}
              </div>

              {/* Trust Badge */}
              <div className="mt-8 pt-6 border-t border-beige-200 text-center">
                <p className="text-sm text-softBlack-500">
                  ✨ Verified Aura Lumina Partner
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Back to All Shops */}
      <section className="bg-beige-50 py-12">
        <div className="container-custom text-center">
          <Link href="/shops" className="btn-secondary">
            {t("backToShops")}
          </Link>
        </div>
      </section>
    </div>
  );
}

